---
title: 深度学习入门：神经网络
tags:
  - 深度学习
  - 神经网络
categories:
  - 快去学习
date: 2022-10-05 21:17:12
katex: true
---

内容参考：

- 《深度学习入门：基于 Python 的理论与实现》(斋藤康毅)

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


