---
title: 深度学习入门：神经网络的学习
tags:
  - 神经网络
  - 深度学习
categories:
  - 快去学习
date: 2022-10-07 23:18:35
updated: 2022-10-07 23:18:35
katex: true
---

内容参考：

- 《深度学习入门：基于 Python 的理论与实现》(斋藤康毅)
- [上述书籍作者提供的代码](https://github.com/oreilly-japan/deep-learning-from-scratch)

之前实现了神经网络的前向传播过程，但是用到的权重参数是预先准备好的，那么接下来的目标自然就是“学习”——从训练数据中自动获取最优权重参数。

## 从数据中学习

机器学习是以数据为核心的，尝试从数据中发现答案和模式。*神经网络或深度学习则比以往的机器学习方法更能避免人为介入*。

要理解上面这些描述还是要从具体的问题开始，比如要实现数字“5”的识别该用什么算法呢？人很容易认出来眼前的是不是5，这可以说是基于经验和某些规律得出的结果，但是机器怎么知道这些经验或者规律是什么呢？与其想办法用算法表示这些规律（显然很难），不如想办法让机器从数据中直接获取需要的“规律”。现有的一种方案是先从图像中提取**特征量**，再用机器学习来学习这些特征量的模式。

> 这里所说的“特征量”是指可以从输入数据（输入图像）中准确地提取本质数据（重要的数据）的转换器。图像的特征量通常表示为向量的形式。在计算机视觉领域，常用的特征量包括SIFT、SURF和HOG等。使用这些特征量将图像数据转换为向量，然后对转换后的向量使用机器学习中的SVM、KNN等分类器进行学习。

在上面所说的方法中，将图像转换为向量时所用的特征量仍是人为设计的，对于不同的问题需要考虑不同的特征量。在深度学习中，这里所说的特征量也是由机器来学习的。

![从人工设计规则转变为由机器从数据中学习](https://s2.loli.net/2022/10/08/jr6XuH83fihJRdU.png)

书上给出的这幅图说明了识别的方法，从这里也能看出所谓“机器学习”和“深度学习”之间的一些区别。

> 深度学习有时也称为端到端机器学习（end-to-end machine learning）。这里所说的端到端是指从一端到另一端的意思，也就是从原始数据（输入）中获得目标结果（输出）的意思。

~~就是说中间的过程不需要人为干预吗……~~

### 一些注意事项： 训练数据和测试数据

很明显，**训练数据**就是用来学习、寻找最优参数所用的那部分数据，而**测试数据**（监督数据）的作用是评价模型的泛化能力，自然不可缺少。如果只用已有的数据来学习和评价，可能会造成模型无法正确处理其他数据集，也就是出现**过拟合**现象。

## 损失函数

**损失函数**可以表示神经网络的“状态”，神经网络就参考这个状态指标来寻找最优权重参数。这里说的损失函数表示的“状态”是指当前神经网络神经网络对监督数据在多大程度上不拟合、不一致，或者说性能有多坏（当然，为损失函数乘上一个负值就可以表示性能有多好）。损失函数一般用均方误差和交叉熵误差等。

### 均方误差

均方误差的公式如下：

$$ E = \frac{1}{2} \sum \limits_k (y_k - t_k)^2 $$

其中 $y_k$ 表示神经网络的输出，$t_k$ 表示监督数据，$k$ 表示数据的维数。比方说在之前的手写数字识别的例子中，$y_k$、$t_k$ 就是由10个元素构成的数据：

```pycon
>>> y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0]
>>> t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
```

`y` 是 `softmax` 函数的输出，`t` 是监督数据的独热编码形式，均方误差会计算 `y` 和 `t` 的各个对应元素之差的平方，再求总和。实现方式可以是：

```python
# 均方误差
def mean_squared_error(y, t):
    return 0.5 * np.sum((y - t) ** 2)
```

均方误差得出的结果越小，说明结果与监督数据之间的误差越小。

### 交叉熵误差

公式如下：

$$ E = - \sum \limits_k t_k \log y_k $$

其中 $\log$ 表示 $\log_e$，$y_k$ 是神经网络的输出，$t_k$ 是正确解的标签（独热编码）。显然上式只会计算正确解标签的输出的自然对数（因为只有正确解标签的索引为1），也就是说交叉熵误差的值是由正确解标签所对应的输出结果决定的。

自然对数 $y = \log x$ 的图像如下：

![自然对数 y = log x 的图像](https://s2.loli.net/2022/10/09/3dHoWFkPCrpvBGh.png)

那么可以看出正确解标签对应的输出为1时，交叉熵误差的输出为0，输出越小，交叉熵误差的结果越大。

实现方式：

```python
# 交叉熵误差
def cross_entropy_error(y, t):
    delta = 1e-7
    return -np.sum(t * np.log(y + delta))  # 防止出现 log(0) 无限大
```

计算例子：

```pycon
>>> t = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
>>> y = [0.1, 0.05, 0.6, 0.0, 0.05, 0.1, 0.0, 0.1, 0.0, 0.0]
>>> cross_entropy_error(np.array(y), np.array(t))
0.51082545709933802
>>>
>>> y = [0.1, 0.05, 0.1, 0.0, 0.05, 0.1, 0.0, 0.6, 0.0, 0.0]
>>> cross_entropy_error(np.array(y), np.array(t))
2.3025840929945458
```

### mini-batch 学习

所谓使用训练数据进行学习，就是针对训练数据计算损失函数的值，找出使该值尽可能小的参数。计算损失函数时必须将所有的训练数据作为对象，考虑所有训练数据的损失函数的总和。

以交叉熵误差为例，如果要计算所有训练数据的损失函数的总和，可以这样：

$$ E = - \frac{1}{N} \sum \limits_n \sum \limits_k t_{nk} \log y_{nk} $$

N 自然是数据个数，$y_{nk}$ 是神经网络的输出中第 n 个数据的第 k 个元素的值，$t_{nk}$ 则是对应的监督数据。观察可以发现这里其实就是把单个数据的损失函数的公式扩大到了 N 个数据，随后除以 N 正规化处理。这个式子也可以说是“平均损失函数”。

在数据集比较大的情况下（比如之前用到的 MNIST 数据集，训练数据就有60000个），根据所有的训练数据来算损失函数的和代价就太大了。实际操作中一般是从全部数据中选出一部分作为全部数据的“近似”（**mini-batch**），用这些数据进行学习（mini-batch 学习）。比方说从60000个训练数据中随机选择100笔，在用这100笔数据进行学习。

（按我的理解，书上这里的说法应该是用样本代表整体。搜到的比较多的说法是将一批所有数据再分成若干份，称作 mini-batch，训练时一次更新一个 mini-batch，整个数据集会更新多次，最终还是使用了所有数据。）

随机抽取数据时可以利用 `np.random.choice()`，像这样：

```python
train_size = x_train.shape[0]  # 对于 MNIST 的训练数据，是60000
batch_size = 10
batch_mask = np.random.choice(train_size, batch_size)  # 在0到59999之间随机选择10个数，得到包含被选数据的索引的数组
x_batch = x_train[batch_mask]  # 被选测试数据
t_batch = t_train[batch_mask]  # 被选测试数据的标签
```

如果要实现 mini-batch 的交叉熵误差，可以这样：

```python
def cross_entropy_error(y, t):
    # 只有一个数据的时候改变数据形状
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)
 
    batch_size = y.shape[0]
    # 如果监督数据不是独热形式而是正常的标签表示
    # return -np.sum(np.log(y[np.arange(batch_size), t] + 1e-7)) / batch_size
    return -np.sum(t * np.log(y + 1e-7)) / batch_size
```

应该可以根据独热编码1值的索引拿到对应标签，这样不论监督数据是哪种形式都可以写在一个实现里。

### 为什么需要损失函数

按说学习的目标是使神经网络的识别精度足够高，那么用识别精度作为评判标准就好了，为什么还需要损失函数呢？

从前面的内容可以看出，寻找最优参数其实也是寻找使损失函数值尽可能小的参数的过程，为了找到损失函数的“最低点”，需要算出参数的导数（准确地说是梯度），根据导数反映出的变化趋势继续更新参数（对权重参数的损失函数求导，就表示如果稍微改变权重参数，损失函数将如何变化）。而识别精度很明显是离散值，很多时候微调参数后识别精度也不变化，这就导致在很多地方参数的导数会变为0，无法反映识别精度的变化趋势，也就无法继续进行神经网络的学习。

在激活函数上也是同样的道理，阶跃函数只在某个地方突变，其他地方导数都是0，无法体现参数改变带来的变化。而 sigmoid 函数的输出和曲线斜率（导数）都是连续变化的（且导数始终不为0），能保证神经网络的学习正确进行。

~~暂且记下，更“深”的理解可能还要我接着学吧……~~

## 数值微分

~~这里引入数值微分的方法，用它计算导数和偏导数。~~

### 导数

导数的概念应该不用多说，就算高数渣如我也应该有所认识……简单来说就是“瞬间的变化量”。

求函数的导数：

```python
def numerical_diff(f, x):
    h = 1e-4 # 0.0001，避免使用过小的值
    return (f(x+h) - f(x-h)) / (2*h) # 使用中心差分来计算
```

使用例，有函数 $f(x) = 0.01 x^2 + 0.1 x$：

```python
def function_1(x):
    return 0.01*x**2 + 0.1*x  # 0.01x^2 + 0.1x
```

求其在 $x=x_0$ 处的导数：

```pycon
>>> numerical_diff(function_1, x0)
```

> 利用微小的差分求导数的过程称为数值微分，而基于数学式的推导求导数的过程，则用“解析性”（analytic）一词，称为“解析性求解”或者“解析性求导”。

### 偏导数

一个多变量的函数，关于其中一个变量求导数，其他变量恒定。~~应该不用再解释……~~

计算偏导的例子，有函数 $f(x_0, x_1) = x_0^2 + x_1^2$：

```python
def function_2(x):
    return np.sum(x**2)
```

求 $x_0 = 3$，$x_1 = 4$ 时，关于 $x_0$ 的偏导数 $\frac{\partial f}{\partial x_0}$：

```pycon
>>> def function_tmp1(x0):
...     return x0*x0 + 4.0**2.0
...
>>> numerical_diff(function_tmp1, 3.0)
```

~~求关于 $x_1$ 的偏导数也是差不多的方法。~~

## 梯度

前面按变量分别求偏导，如果把全部变量的偏导数汇总成向量，就是**梯度**。求梯度的实现方法可以是这样，非批处理：

```python
# 求梯度
def numerical_gradient(f, x):
    h = 1e-4  # 0.0001
    grad = np.zeros_like(x)  # 生成和 x 形状相同、元素都为0的数组

    for idx in range(x.size):
        tmp_val = x[idx]
        # 计算 f(x+h)
        x[idx] = tmp_val + h
        fxh1 = f(x)

        # 计算 f(x-h)
        x[idx] = tmp_val - h
        fxh2 = f(x)

        # 算出偏导，还原 x
        grad[idx] = (fxh1 - fxh2) / (2*h)
        x[idx] = tmp_val

    return grad
```

这里求梯度用的方法其实和前面求单个变量的数值微分所用的方法没有什么区别……按照[作者给出的方法](https://github.com/oreilly-japan/deep-learning-from-scratch/blob/master/ch04/gradient_2d.py)（里面实现了批处理计算梯度）可以画出 $f(x_0, x_1) = x_0^2 + x_1^2$ 的负梯度：

![函数的负梯度](https://s2.loli.net/2022/10/14/XjxmfqakndbtHrc.png)

~~函数图像可看做下凹的曲面，负梯度会指向最低点，更好理解梯度在这里的作用吧……~~在这个图中，离函数最小值越远，梯度向量的模就越大（变化越快），且向量都指向了“最低处”。而一般来说，“梯度”指向该点处函数值减小最多的方向。

### 梯度法

神经网络需要在学习过程中找到最优参数（权重和偏置），也就是使损失函数取最小值时的参数。损失函数很复杂的时候就难以找到最小值所在的“点”，但是可以根据梯度表示的“变化快慢”来寻找尽可能小的值。不过梯度反映的是各点处函数值减小最多的方向，并不一定能找到最小值：梯度为0的点除了最小值还有极小值和鞍点。尽管如此，沿着梯度方向也能最大限度地减小函数值，所以可以沿着梯度方向寻找尽可能小的值。

> 在梯度法中，函数的取值从当前位置沿着梯度方向前进一定距离，然后在新的地方重新求梯度，再沿着新梯度方向前进，如此反复，不断地沿梯度方向前进。像这样，通过不断地沿梯度方向前进，逐渐减小函数值的过程就是**梯度法**（gradient method）。梯度法是解决机器学习中最优化问题的常用方法，特别是在神经网络的学习中经常被使用。

寻找最小值的梯度法叫做梯度下降法，寻找最大值的梯度法叫做梯度上升法。反转损失函数的符号，两类问题就可以互相转化。在神经网络中，梯度法主要指梯度下降法。

对于函数 $f(x_0, x_1) = x_0^2 + x_1^2$，用数学式表示梯度法：

$$ x_0 = x_0 - \eta \frac{\partial f}{\partial x_0} \\\ \\\ x_1 = x_1 - \eta \frac{\partial f}{\partial x_1} $$

上式中 $\eta$ 表示更新量（**学习率**），它决定了在一次学习中应该学习多少以及应该在多大程度上更新参数。这组式子表示更新一次，学习时反复执行这个步骤减小函数值。变量数量增加后方法也是类似的。

学习率需要事先确定，过大或过小都无法取得理想的结果。在学习过程中一般会一边改变学习率，一边观察学习是否正确进行。

使用梯度下降法的例子（`numerical_gradient` 的实现参考[这里](https://github.com/oreilly-japan/deep-learning-from-scratch/blob/master/ch04/gradient_2d.py)）：

```python
import numpy as np
import sys
import os

sys.path.append(os.curdir)

from ch04.gradient_2d import numerical_gradient


def function_2(x):
    return x[0]**2 + x[1]**2


# f: 函数
# init_x: 初始值
# lr: 学习率
# step_num： 梯度法重复次数
def gradient_descent(f, init_x, lr=0.01, step_num=100):
    x = init_x

    for i in range(step_num):  # 反复执行更新
        grad = numerical_gradient(f, x)
        x -= lr * grad

    return x


init_x = np.array([-3.0, 4.0])
print(gradient_descent(function_2, init_x=init_x, lr=0.1, step_num=100))
```

输出：

```bash
[-6.11110793e-10  8.14814391e-10]
```

上面设初始值为 `(-3.0, 4.0)`，用梯度法寻找最小值，得到的结果很接近函数的最小值点 `(0, 0)`。如果学习率不合适，得到的结果就会偏离更远。事实上，学习率过大时结果会过度发散，学习率太小时参数更新幅度太小，也很难得到合适的结果。

> 像学习率这样的参数称为超参数。这是一种和神经网络的参数（权重和偏置）性质不同的参数。相对于神经网络的权重参数是通过训练数据和学习算法自动获得的，学习率这样的超参数则是人工设定的。一般来说，超参数需要尝试多个值，以便找到一种可以使学习顺利进行的设定。

### 神经网络的梯度

神经网络的学习需要用到损失函数关于权重参数的梯度。~~在一定的输入下权重参数确实就是变量呢……数学渣的小心确认……~~参考书上举的例子的话，对于一个只有一个形状为 $2 \times 3$ 的权重 $\boldsymbol{W}$ 的神经网络，损失函数用 $L$ 表示，梯度就可以用 $\frac{\partial L}{\partial \boldsymbol{W}}$ 表示。数学式如下：

$$ \boldsymbol{W} = \begin{pmatrix} w_{1 1} & w_{1 2} & w_{1 3} \\\ w_{2 1} & w_{2 2} & w_{2 3} \end{pmatrix} $$

$$ \frac{\partial L}{\partial \boldsymbol{W}} = \begin{pmatrix} \frac{\partial L}{\partial w_{1 1}} & \frac{\partial L}{\partial w_{1 2}} & \frac{\partial L}{\partial w_{1 3}} \\\ \frac{\partial L}{\partial w_{2 1}} & \frac{\partial L}{\partial w_{2 2}} & \frac{\partial L}{\partial w_{2 3}} \end{pmatrix} $$

$\frac{\partial L}{\partial \boldsymbol{W}}$ 的元素由各个元素对应的偏导数构成，形状与 $\boldsymbol{W}$ 相同。

就以这样一个神经网络为例，实现求梯度：

```python
import sys, os
import numpy as np

sys.path.append(os.curdir)

from common.func import softmax, cross_entropy_error
from common.gradient import numerical_gradient


class simpleNet:
    def __init__(self) -> None:
        self.W = np.random.randn(2, 3)  # 利用高斯分布随机生成0到1之间的数，填充指定形状的多维数组

    def predict(self, x):
        return np.dot(x, self.W)

    def loss(self, x, t):
        z = self.predict(x)
        y = softmax(z)
        loss = cross_entropy_error(y, t)

        return loss


net = simpleNet()
print('net.W:\n', net.W)  # net 的权重参数

x = np.array([0.6, 0.9])
p = net.predict(x)
print('predict x:\n', p)  # 输出
print('index of max value:\n', np.argmax(p))  # 最大值索引

t = np.array([0, 0, 1])
print('net.loss:\n', net.loss(x, t))  # 计算交叉熵损失

# W 是伪参数，计算梯度时会执行 f，用到的是 net 内的 W
# def f(W):
#     return net.loss(x, t)
# 也可以用 lambda 表达式
f = lambda w: net.loss(x, t)

dW = numerical_gradient(f, net.W)  # 求关于权重的梯度，权重自然是 f 的参数
print('dW:\n', dW)
```

某一次运行上面代码的输出：

```bash
net.W:
 [[ 0.03900802 -0.24126244 -1.60380801]
 [-0.94332177  1.36421781 -1.05313682]]
predict x:
 [-0.82558478  1.08303856 -1.91010794]
index of max value:
 1
net.loss:
 3.174142995517425
dW:
 [[ 0.07424015  0.50066058 -0.57490072]
 [ 0.11136022  0.75099087 -0.86235108]]
```

计算 `dW` 得到的结果是与 `W` 形状一致的二维数组。看结果的话，例如 $\frac{\partial L}{\partial w_{1 2}}$ 的值约为 $0.5$，表示如果 $w_{1 2}$ 增加 $h$，损失函数的值会增加 $0.5 h$；再比方说 $\frac{\partial L}{\partial w_{2 3}}$ 的值约为 $-0.86$，表示如果 $w_{2 3}$ 增加 $h$，损失函数的值会减小 $0.86 h$。因为要减小损失函数的值，所以 $w_{1 2}$ 应该往负方向更新，$w_{2 3}$ 应该往正方向更新，且更新 $w_{2 3}$ 比更新 $w_{1 2}$ 效果更明显。

## 实现学习算法

> 神经网络的学习步骤如下所示。
> - **前提**
>   - 神经网络存在合适的权重和偏置，调整权重和偏置以便拟合训练数据的过程称为“学习”。神经网络的学习分成下面4个步骤。
> - **步骤1（mini-batch）**
>   - 从训练数据中随机选出一部分数据，这部分数据称为 mini-batch。我们的目标是减小 mini-batch 的损失函数的值。
> - **步骤2（计算梯度）**
>   - 为了减小 mini-batch 的损失函数的值，需要求出各个权重参数的梯度。梯度表示损失函数的值减小最多的方向。
> - **步骤3（更新参数）**
>   - 将权重参数沿梯度方向进行微小更新。
> - **步骤4（重复）**
>   - 重复步骤1、步骤2、步骤3

上面的方法通过梯度下降更新参数，因为使用了随机选择的 mini-batch，所以又叫做**随机梯度下降法**（stochastic gradient descent，SGD）。

下面跟着书上的指导实现手写数字识别的神经网络。以2层神经网络（有1层隐藏层）为对象，使用 MNIST 数据集进行学习。

### 2层神经网络的类

为2层神经网络实现一个类，如下所示：

```python
import sys, os
import numpy as np

sys.path.append(os.curdir)

from common.func import *
from common.gradient import numerical_gradient


class TwoLayerNet:
    def __init__(self,
                 input_size,
                 hidden_size,
                 output_size,
                 weight_init_std=0.01):
        # 初始化权重偏置，注意各层参数的形状
        self.params = {}
        self.params['W1'] = weight_init_std * np.random.randn(
            input_size, hidden_size)
        self.params['b1'] = np.zeros(hidden_size)
        self.params['W2'] = weight_init_std * np.random.randn(
            hidden_size, output_size)
        self.params['b2'] = np.zeros(output_size)

    # 推理过程
    def predict(self, x):
        W1, W2 = self.params['W1'], self.params['W2']
        b1, b2 = self.params['b1'], self.params['b2']

        a1 = np.dot(x, W1) + b1
        z1 = sigmoid(a1)
        a2 = np.dot(z1, W2) + b2
        y = softmax(a2)

        return y

    # 计算损失函数的值
    # x 是输入数据，t 是监督数据
    def loss(self, x, t):
        y = self.predict(x)

        return cross_entropy_error(y, t)

    # 计算识别精度
    # x 是输入数据，t 是监督数据
    def accuracy(self, x, t):
        y = self.predict(x)  # 获得输出
        y = np.argmax(y, axis=1)  # 取得输出最大值对应索引（标签）
        t = np.argmax(t, axis=1)

        accuracy = np.sum(y == t) / float(x.shape[0])
        return accuracy

    # 求梯度
    # x 是输入数据，t 是监督数据
    def numerical_gradient(self, x, t):
        loss_W = lambda W: self.loss(x, t)

        # 对每层的参数求梯度
        grads = {}
        grads['W1'] = numerical_gradient(loss_W, self.params['W1'])
        grads['b1'] = numerical_gradient(loss_W, self.params['b1'])
        grads['W2'] = numerical_gradient(loss_W, self.params['W2'])
        grads['b2'] = numerical_gradient(loss_W, self.params['b2'])

        return grads
```

（`weight_init_std` 似乎是为了解决激活后分布集中在0和1附近？）

之前也提到过，根据数据集和要识别的目标，`input_size` 就是`784`，`output_size` 是`10`。这里的隐藏层神经元个数设置为一个合理的值就行。

### mini-batch 的实现

实现过程如下：

```python
import sys, os
import numpy as np

sys.path.append(os.curdir)

from ch04.two_layer_net import TwoLayerNet
from dataset.mnist import load_mnist

print('Load mnist dataset...')
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True,
                                                  one_hot_label=True)

train_loss_list = []

# 超参数
iters_num = 10000  # 梯度法更新次数
train_size = x_train.shape[0]  # 训练集大小
batch_size = 100  # batch 大小
learning_rate = 0.1  # 学习率

print('Initialize network...')
network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

for i in range(iters_num):
    # 从训练数据中随机获取 mini-batch
    print(i, ': choose mini-batch...')
    batch_mask = np.random.choice(train_size, batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    # 计算梯度
    print(i, ': calculate grads...')
    grad = network.numerical_gradient(x_batch, t_batch)

    # 更新参数
    print(i, ': update params...')
    for key in ('W1', 'b1', 'W2', 'b2'):
        network.params[key] -= learning_rate * grad[key]

    # 记录学习过程
    loss = network.loss(x_batch, t_batch)
    train_loss_list.append(loss)
```

上面的学习过程应该算很清楚了，共更新10000次参数，会记录每一次训练后的损失函数值。

### 基于测试数据的评价

上面的学习过程得到的损失函数值其实是对训练数据的某个 mini-batch 的损失函数值，这个值减小说明学习过程确实在正常进行，但是不能保证神经网络能正确识别训练集以外的数据。要评价神经网络的泛化能力，就要使用不在训练集中的数据。

这里就涉及了 **epoch**（之前做比赛看队友的代码里出现过这个东西，不过当时不知道具体表示什么意思），一个 epoch 表示学习中所有训练数据均被使用过一次时的更新次数。比如对于10000笔训练数据，如果 mini-batch 的大小是100，那么重复梯度下降100次，所有的训练数据就都被使用过一次，此时100次就是一个 epoch。（一般的做法是把训练数据打乱，根据指定的批大小生成 mini-batch，遍历所有 mini-batch 完成一个 epoch。像前面直接每次随机选择不能保证每个数据都被用到。）

在学习过程中需要定期对训练数据和测试数据记录识别精度，这里每经过一个 epoch 就记录一次：

```python
import sys, os
import numpy as np

sys.path.append(os.curdir)

from ch04.two_layer_net import TwoLayerNet
from dataset.mnist import load_mnist

print('Load mnist dataset...')
(x_train, t_train), (x_test, t_test) = load_mnist(normalize=True,
                                                  one_hot_label=True)

print('Initialize network...')
network = TwoLayerNet(input_size=784, hidden_size=50, output_size=10)

# 超参数
iters_num = 10000  # 梯度法更新次数
train_size = x_train.shape[0]  # 训练集大小
batch_size = 100  # batch 大小
learning_rate = 0.1  # 学习率

train_loss_list = []
train_acc_list = []
test_acc_list = []

# 平均每个 epoch 的重复次数
iter_per_epoch = max(train_size / batch_size, 1)

for i in range(iters_num):
    # 获取 mini-batch
    batch_mask = np.random.choice(train_size, batch_size)
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    # 计算梯度
    grad = network.numerical_gradient(x_batch, t_batch)

    # 更新参数
    for key in ('W1', 'b1', 'W2', 'b2'):
        network.params[key] -= learning_rate * grad[key]

    # 记录学习过程
    loss = network.loss(x_batch, t_batch)
    train_loss_list.append(loss)

    # 每个 epoch 完成后计算识别精度
    if i % iter_per_epoch == 0:
        train_acc = network.accuracy(x_train, t_train)
        test_acc = network.accuracy(x_test, t_test)
        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)
        print('Train acc, test acc | ' + str(train_acc) + ',' + str(test_acc))
```

画出识别精度关于 epoch 的曲线：

![识别精度](https://s2.loli.net/2022/10/15/jE2J9w5pGhmbWfX.png)

随着学习进行，使用训练数据和测试数据评价的识别精度都在提高，两者几乎没有差距，没有发生过拟合。

~~这一部分就到这里……~~

之前写过的 softmax 函数似乎要换成这样的实现，可能和多维数组有关（具体到这里就是二维的吧，因为数据都是 mini-batch 了，max 和 sum 都需要沿着第2维），不过是不是我还得想想……

```python
def softmax(x):
    x = x - np.max(x, axis=-1, keepdims=True)  # 防止 exp() 溢出
    return np.exp(x) / np.sum(np.exp(x), axis=-1, keepdims=True)
```
