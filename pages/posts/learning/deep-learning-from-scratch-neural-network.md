---
title: 深度学习入门：神经网络
tags:
  - 深度学习
  - 神经网络
categories:
  - 快去学习
date: 2022-10-05 21:17:12
updated: 2022-10-05 21:17:12
katex: true
---

内容参考：

- 《深度学习入门：基于 Python 的理论与实现》(斋藤康毅)
- [上述书籍作者提供的代码](https://github.com/oreilly-japan/deep-learning-from-scratch)

代码中如果出现 `np`，应该都是因为忽略了 `import numpy as np`，请不要在意。

## 从感知机到神经网络

通过前面学的内容可以看出来感知机也能表示复杂的内容，但显然确定权重是个麻烦事。好消息是，现在有神经网络这个东西能自动从数据中学习到合适的权重参数。那就看看吧。

用图表示神经网络：

![神经网络的基本结构](https://s2.loli.net/2022/10/06/56M1dzptNKeiXIq.png)

中间层有时也被称为**隐藏层**（“肉眼看不见”）。

从图中可以看出，神经网络的形状和感知机很像。*实际上，就神经元的连接方式而言，与感知机并没有任何差异*。既然如此，它们有什么区别呢？就从信号的传递方式入手吧。

在探究神经网络之前，需要再看一下感知机，这是感知机的网络结构（这个图并没有表示出偏置，要体现偏置的话需要再加一个表示偏置的输入信号）：

![感知机的结构](https://s2.loli.net/2022/10/06/9bpEaniNYfl7eq3.png)

用数学式表示这个感知机：

$$ y = \begin{cases} 0 & (b + w_1 x_1 + w_2 x_2 \le 0) \\\ 1 & (b + w_1 x_1 + w_2 x_2 \gt 0) \end{cases} $$

这个数学式可以改写成：

$$ y = h(b + w_1 x_1 + w_2 x_2) $$

其中：

$$ h(x) = \begin{cases} 0 & (x \le 0) \\\ 1 & (x \gt 0) \end{cases} $$

输入信号的总和被函数 $h(x)$ 转换之后才是输出 $y$。

### 轮到激活函数上场……

上面的 $h(x)$ 通常被称为**激活函数**，它决定如何激活输入信号的总和。那么上面的式子也可以表示为：

$$ a = b + w_1 x_1 + w_2 x_2 \\\ y = h(a) $$

也就是说，计算输出的过程可以分为：计算输入信号的总和、用激活函数转换这一总和。在神经元中明确表示出激活函数的计算过程（下图包含偏置）：

![明确表示出激活函数的计算过程](https://s2.loli.net/2022/10/06/sFzIqrO1hoN926V.png)

#### 常用的激活函数

- 阶跃函数
  - 输入不超过0时输出0，超过0时输出1。
  - ![阶跃函数的图形](https://s2.loli.net/2022/10/06/fhCzFJSnbaIRpym.png)
- sigmoid 函数
  - $h(x) = \frac{1}{1 + exp(-x)}$，其中 $exp(-x)$ 表示 $e^{-x}$
  - ![sigmoid 函数的图形](https://s2.loli.net/2022/10/06/hNPZtR67nGjQyBq.png)

可行的实现：

```python
# 阶跃函数，支持 numpy 数组的实现
def step_function(x):
    y = x > 0  # 对 numpy 数组进行不等号运算后，数组中的各个元素都会进行相应运算，生成一个布尔型数组
    return y.astype(np.int32)  # 将布尔型数组转换为 int32

def sigmoid(x):
    return 1 / (1 + np.exp(-x))  # 由于 numpy 的广播功能，该实现可以支持 numpy 数组
```

显然：

- sigmoid 函数图像是一条平滑曲线，阶跃函数以0为界，输出发生急剧变化；
- 阶跃函数只返回0或1，sigmoid 函数返回连续的实数值；
- 两者形状相似，且都是非线性函数；

> 激活函数必须使用非线性函数，为什么？
> 
> 线性函数的问题在于，不管如何加深层数，总是存在与之等效的“无隐藏层的神经网络”。为了具体地（稍微直观地）理解这一点，我们来思考下面这个简单的例子。这里我们考虑把线性函数 $h(x) = cx$ 作为激活函数，把 $y(x) = h(h(h(x)))$ 的运算对应3层神经网络A。这个运算会进行 $y(x) = c × c × c × x$ 的乘法运算，但是同样的处理可以由 $y(x) = ax$（注意，$a = c^3$）这一次乘法运算（即没有隐藏层的神经网络）来表示。如本例所示，使用线性函数时，无法发挥多层网络带来的优势。因此，为了发挥叠加层所带来的优势，激活函数必须使用非线性函数。

据书上所说，最近使用 **ReLU** 函数的更多。这个函数很简单，输入大于0时直接输出该值，输入不大于0时输出0。

ReLU 函数的一种实现：

```python
def relu(x):
    return np.maximum(0, x)
```

## 多维数组的运算

可以直接用 `numpy.array()` 来生成多维数组，比如：

```python
x = np.array([-1, 1, 0])
y = np.array([[1, 2], [3, 4]])
```

可以用 `numpy.ndim()` 获取数组的维数，用数组实例的属性变量 `shape` （元组类型）获取其形状。

我们最常用的多维数组的运算应该是矩阵（二维数组）乘法了（我猜）。矩阵乘法怎么算就不说了，左边列数等于右边行数就行，在代码中可以用 `numpy.dot()` 来完成。矩阵乘法的例子：

```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print(np.dot(A, B))

A = np.array([[1,2], [3, 4], [5,6]])
B = np.array([7,8])
print(np.dot(A, B))
```

输出：

```bash
[[19 22]
 [43 50]]
[23 53 83]
```

### 神经网络的内积

矩阵乘法又和神经网络有什么关系呢？看这个网络：

![神经网络和矩阵乘法](https://s2.loli.net/2022/10/06/GSolM6v7B3AcWDd.png)

从图上可以看出，这个神经网络的计算相当于 X 矩阵点乘 W 矩阵，可以用矩阵运算一次性算出结果：

```python
x = np.array([1, 2])  # x1 x2
w = np.array([[1, 3, 5], [2, 4, 6]])  # 权重
print(x)
print(x.shape)
print(w)
print(w.shape)
print(np.dot(x, w))
```

输出结果：

```bash
[1 2]
(2,)
[[1 3 5]
 [2 4 6]]
(2, 3)
[ 5 11 17]
```

所以我们就可以用矩阵运算简化信号传递的过程，可喜可贺。

## 神经网络的实现

![要实现的神经网络](https://s2.loli.net/2022/10/06/vbICLGd341DRlnz.png)

实现该神经网络。其中：

- 输入层（0）2个神经元；
- 第一个隐藏层（1）3个神经元，第二个隐藏层（2）2个神经元；
- 输出层（3）2个神经元。

书中给我们定义了符号来表示神经元和信号，以权重的符号为例：

![权重的符号](https://s2.loli.net/2022/10/06/p8sriFWC2tVNb1O.png)

### 信号传递

示例，从输入层到第1层的信号传递，考虑偏置：

![输入层到第1层的信号传递](https://s2.loli.net/2022/10/06/GkWuzmDV1QCqM2E.png)

可以用数学式来表示 $a_1^{(1)}$：

$$ a_1^{(1)} = w_{1 1}^{(1)}x_1 + w_{1 2}^{(1)}x_2 + b_1^{(1)} $$

如果使用矩阵乘法，可以将第1层的加权和表示为如下形式：

$$ \boldsymbol{A}^{(1)} = \boldsymbol{X}\boldsymbol{W}^{(1)} + \boldsymbol{B}^{(1)} $$

其中：

$$ \boldsymbol{A}^{(1)} = \begin{pmatrix} a_1^{(1)} & a_2^{(1)} & a_3^{(1)} \end{pmatrix} \\\ \boldsymbol{X} = \begin{pmatrix} x_1 & x_2 \end{pmatrix} \\\ \boldsymbol{B}^{(1)} = \begin{pmatrix} b_1^{(1)} & b_2^{(1)} & b_3^{(1)} \end{pmatrix} \\\ \boldsymbol{W}^{(1)} =  \begin{pmatrix} w_{1 1}^{(1)} & w_{2 1}^{(1)} & w_{3 1}^{(1)} \\\ w_{1 2}^{(1)} & w_{2 2}^{(1)} & w_{3 2}^{(1)} \end{pmatrix} $$

写成 Python 实现（手动指定权重和偏置）：

```python
X = np.array([1.0, 0.5])  # shape: (2, 3)
W1 = np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]])  # shape: (2,)
B1 = np.array([0.1, 0.2, 0.3])  # shape: (3,)
A1 = np.dot(X, W1) + B1
```

考虑激活函数，那么第1层的计算过程就是：

![输入层到第1层的信号传递2](https://s2.loli.net/2022/10/06/T3uDapWMw1eK9Xq.png)

上图中隐藏层的加权和（加权信号与偏置的和）用 $a$ 表示，被激活函数转换后的信号用 $z$ 表示。$h()$ 表示激活函数，如果使用 sigmoid 函数作为激活函数，$z$ 的计算方法就是 `Z1 = sigmoid(A1)`。

用同样的方法可以实现第1层到第2层的信号传递：

![第1层到第2层的信号传递](https://s2.loli.net/2022/10/06/Q8c1eOVod6WFSZu.png)

```python
W2 = np.array([[0.1, 0.4], [0.2, 0.5], [0.3, 0.6]])
B2 = np.array([0.1, 0.2])
A2 = np.dot(Z1, W2) + B2  # 第1层的输出是第2层的输入
Z2 = sigmoid(A2)
```

从第2层到输出层的实现与上面也基本一致，将恒等函数作为激活函数（输出层的激活函数用 $\sigma()$ 表示）：

```python
def identity_function(x):
    return x

W3 = np.array([[0.1, 0.3], [0.2, 0.4]])
B3 = np.array([0.1, 0.2])
A3 = np.dot(Z2, W3) + B3
Y = identity_function(A3)  # 或者Y = A3
```

整理上面的实现：

```python
# 把权重记为大写字母，其他如偏置和中间结果等记为小写字母
def init_network():
    network = {}
    network['W1'] = np.array([[0.1, 0.3, 0.5], [0.2, 0.4, 0.6]])
    network['b1'] = np.array([0.1, 0.2, 0.3])
    network['W2'] = np.array([[0.1, 0.4], [0.2, 0.5], [0.3, 0.6]])
    network['b2'] = np.array([0.1, 0.2])
    network['W3'] = np.array([[0.1, 0.3], [0.2, 0.4]])
    network['b3'] = np.array([0.1, 0.2])
    return network

# 将输入信号转化为输出信号的过程（前向传播？）
def forward(network, x):
    W1, W2, W3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']
    a1 = np.dot(x, W1) + b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, W3) + b3
    y = identity_function(a3)
    return y

network = init_network()
x = np.array([1.0, 0.5])
y = forward(network, x)
print(y)  # [0.31682708 0.69627909]
```

## 输出层的设计

神经网络可以用在分类问题和回归问题上，要根据情况改变使用的激活函数，一般回归问题用恒等函数，分类问题用 softmax 函数。softmax 函数可以用如下式子表示：

$$ y_k = \frac{exp(a_k)}{\sum\limits_{i=1}^{n}exp(a_i)} $$

其中 $exp()$ 是表示 $e^x$ 的指数函数。该式子假设输出层共有 $n$ 个神经元，计算第 $k$ 个神经元的输出 $y_k$。softmax 函数的分子是输入信号 $a_k$ 的指数函数，分母是所有输入信号的指数函数的和。

从上面可以看出输出层的各个神经元都受到所有输入信号的影响。用图表示这个函数，它的输出与所有的输入信号相连：

![softmax 函数](https://s2.loli.net/2022/10/06/hANMxfLWD6pBvl5.png)

### softmax 函数

直接实现 softmax 函数：

```python
def softmax(a):
    exp_a = np.exp(a)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y
```

这个实现有缺陷，主要问题出在 `exp()` 上。`exp(x)` 表示 $e^x$，当 x 比较大的时候，结果很容易溢出（可以自行算一下，`int` 类型根本不够用）。书的作者介绍了一种常用的优化方法，首先看这个式子：

$$ \begin{aligned} y_k &= \frac{exp(a_k)}{\sum \limits_{i = 1}^n exp(a_i)} \\\ &= \frac{C exp(a_k)}{C \sum \limits_{i = 1}^n exp(a_i)} \\\ &= \frac{exp(a_k + \log C)}{\sum \limits_{i = 1}^n exp(a_i + \log C)} \\\ &= \frac{exp(a_k + C')}{\sum \limits_{i = 1}^n exp(a_i + C')} \end{aligned} $$

从这个式子可以看出，计算时在指数上加减任意常数都不会改变运算结果。为了防止溢出，一般是减去输入信号中的最大值。作者给出的例子：

```pycon
>>> a = np.array([1010, 1000, 990])
>>> np.exp(a) / np.sum(np.exp(a))  # softmax函数的运算
array([ nan, nan, nan])  # 溢出
>>>
>>> c = np.max(a) # 1010
>>> a - c
array([ 0, -10, -20])
>>>
>>> np.exp(a - c) / np.sum(np.exp(a - c))
array([ 9.99954600e-01, 4.53978686e-05, 2.06106005e-09])
```

所以 softmax 函数的实现就可以改成：

```python
def softmax(a):
    c = np.max(a)  # 输入信号的最大值
    exp_a = np.exp(a - c)  # 溢出对策
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y
```

softmax 函数的输出是0.0到1.0之间的实数，输出值的总和是1，所以 softmax 函数的输出也可以被解释为概，也因为这样，softmax 函数适用于分类问题。

由于 softmax 函数不会改变各个元素之间的大小关系（因为指数函数是单调递增的），如果只需要知道输出值最大的神经元对应的类别，可以忽略输出层的 softmax 函数以减少运算量。

### 输出层的神经元数量

输出层的神经元数量取决于待解决的问题。对于分类问题，一般把输出层神经元数量设定为类别的数量。

## 实际问题：手写数字识别

对于这个问题，书的作者提供了可以直接使用的学习结果，只需要实现神经网络的推理处理过程（前向传播）就可以了。

> 使用 MNIST 数据集。该数据集由0到9的数字图像构成，训练图像6万张，测试图像1万张。先用训练图像进行学习，再用学习到的模型度量能在多大程度上对测试图像进行正确的分类。
>
> MNIST的图像数据是28像素 × 28像素的灰度图像（1通道），各个像素的取值在0到255之间。每个图像数据都相应地标有“7”、“2”、“1”等标签。

下载、加载数据集等需要提前准备的代码作者也给出来了，在[这里](https://github.com/oreilly-japan/deep-learning-from-scratch/blob/master/dataset/mnist.py)。

需要实现的神经网络输入层有784个神经元（每张图片784像素），输出层有10个神经元（10个数字分类）。按照作者的提示，设置两个隐藏层，第一个隐藏层有50个神经元，第二个隐藏层有100个神经元。

```python
import sys, os
sys.path.append(os.curdir)
print(sys.path)
from dataset.mnist import load_mnist
import pickle
import numpy as np

# 实现 sigmoid 函数
# 当然像这种通用的函数最好特意找个地方写实现，不要写得到处都是……
def sigmoid(x):
    return 1 / (1 + np.exp(-x))  # 由于 numpy 的广播功能，该实现可以支持 numpy 数组

def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c) # 溢出对策
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y

# 获取测试数据
# 对数据进行了正规化处理（属于预处理），使数据的值在0.0～1.0的范围内
def get_data():
    (x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, flatten=True, one_hot_label=False)
    return x_test, t_test

# 读入学习到的权重参数
def init_network():
    # rb, read as text, binary
    with open("ch0203/sample_weight.pkl", 'rb') as f:
        network = pickle.load(f)
    return network

# 前向传播推理过程
def predict(network, x):
    w1, w2, w3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']

    a1 = np.dot(x, w1) + b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, w2) + b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, w3) + b3
    y = softmax(a3)
    return y

x, t = get_data()
network = init_network()
accuracy_cnt = 0  # 识别精度
for i in range(len(x)):
    y = predict(network, x[i])
    p = np.argmax(y)  # 取概率最高的元素的索引
    if p == t[i]:
        accuracy_cnt += 1

print("Accuracy: " + str(float(accuracy_cnt) / len(x)))
```

PS：如果去看作者给的[实现代码](https://github.com/oreilly-japan/deep-learning-from-scratch/blob/master/ch03/neuralnet_mnist.py)，会发现最开始添加路径，作者添加了 `pardir`，我这里添加的是 `curdir`，读取权重时的文件路径也不太一样。这是因为我打开项目时的工作目录在 `ch0203`（相当于作者的 `ch03`）上面一层，而作者设定的工作目录就是 `ch03`……嗯，应该是这个原因吧，我还搜了挺长一段时间……😢

### 批处理

观察一下神经网络各层权重的形状：

```pycon
>>> x, _ = get_data()
>>> network = init_network()
>>> W1, W2, W3 = network['W1'], network['W2'], network['W3']
>>>
>>> x.shape
(10000, 784)
>>> x[0].shape
(784,)
>>> W1.shape
(784, 50)
>>> W2.shape
(50, 100)
>>> W3.shape
(100, 10)
```

~~显然符合矩阵运算的要求。~~多维数组形状变化过程如图（$X$ 的形状也可以表示为 $1 \times 784$，同理 $Y$ 的形状也可以表示为 $1 \times 10$）：

![数组形状的变化](https://s2.loli.net/2022/10/07/l25NM8BjZ3ohcfg.png)

从整体的流程来看，输入一个由784个元素构成的一维数组后，输出一个有10个元素的一维数组。考虑一次性处理100张图片，那么输入数组的形状可以改成 $100 \times 784$，此时多维数组/矩阵形状的变化过程就会是：

![批处理中数组形状的变化](https://s2.loli.net/2022/10/07/3eWDaKFkYHp6riU.png)

这样输出数据的形状就是 $100 \times 10$。*这表示输入的100张图像的结果被一次性输出了。比如，`x[0]`和`y[0]`中保存了第0张图像及其推理结果，x[1]和y[1]中保存了第1张图像及其推理结果，等等。* 

*这种打包式的输入数据被称为批（batch）。*

批处理的实现：

```python
import sys, os
sys.path.append(os.curdir)
print(sys.path)
from dataset.mnist import load_mnist
import pickle
import numpy as np

# 实现 sigmoid 函数
# 当然像这种通用的函数最好特意找个地方写实现，不要写得到处都是……
def sigmoid(x):
    return 1 / (1 + np.exp(-x))  # 由于 numpy 的广播功能，该实现可以支持 numpy 数组

def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c) # 溢出对策
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y

# 获取测试数据
# 对数据进行了正规化处理（属于预处理），使数据的值在0.0～1.0的范围内
def get_data():
    (x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, flatten=True, one_hot_label=False)
    return x_test, t_test

# 读入学习到的权重参数
def init_network():
    # rb, read as text, binary
    with open("ch0203/sample_weight.pkl", 'rb') as f:
        network = pickle.load(f)
    return network

# 前向传播推理过程
def predict(network, x):
    w1, w2, w3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']

    a1 = np.dot(x, w1) + b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, w2) + b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, w3) + b3
    y = softmax(a3)
    return y

x, t = get_data()
network = init_network()

batch_size = 100  # “一批”的大小
accuracy_cnt = 0  # 识别精度

for i in range(0, len(x), batch_size):  # range(start, end, step)
    x_batch = x[i:i+batch_size]  # 按批取出数据
    y_batch = predict(network, x_batch)
    p = np.argmax(y_batch, axis=1)  # 在100*10的数组中，沿着第1维（从0开始数）方向找到值最大的元素的索引
    accuracy_cnt += np.sum(p == t[i:i+batch_size])  # 使用比较运算符会生成布尔值数组，sum 会计算 True 的个数

print("Accuracy: " + str(float(accuracy_cnt) / len(x)))
```

*大多数处理数值计算的库都进行了能够高效处理大型数组运算的最优化*，而且批处理可以减少读取数据方面的开销，所以批处理计算大型数组比分开计算各个小数组速度快。

PPS：这一部分说是神经网络，其实应该说是神经网络的前向传播咯……那就先到这里。