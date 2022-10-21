---
title: 深度学习入门：误差反向传播法
tags:
  - 深度学习
categories:
  - 快去学习
date: 2022-10-17 23:06:12
katex: true
---

**施工中**

内容参考：

- 《深度学习入门：基于 Python 的理论与实现》(斋藤康毅)
- [上述书籍作者提供的代码](https://github.com/oreilly-japan/deep-learning-from-scratch)

之前成功实现了一个神经网络的学习过程，但是实际开始计算就会发现整个过程实在是太慢了……对所有参数都要计算梯度，而且要计算很多遍，显然我们需要一种能更快地计算出权重参数梯度的方法。

## 关于计算图

计算图能够将计算过程用图形（数据结构图，用多个节点和边表示）表示出来。

### 计算图与反向传播

使用计算图是为了直观理解反向传播法，那至少应该能先看懂计算图才行。

书上的例题1：太郎在超市买了2个100日元一个的苹果，消费税是10%，请计算支付金额。过程很简单，先算出2个苹果的价格，再算出加上消费税之后的花销。用图表示：

![基于计算图的答案](https://s2.loli.net/2022/10/18/4hJ7QlSEdDjKzn3.png)

在这张图中，苹果单价流到“$\times 2$”节点，又被传递给“$\times 1.1$”节点，得出最后的价格。图中“$\times 2$”和“$\times 1.1$”是作为一个运算的整体，也可以只用 $\circ$ 表示乘法，将“2”和“1.1”等作为变量标在外面：

![基于计算图的答案-将“苹果的个数”和“消费税”标在外面](https://s2.loli.net/2022/10/18/iW1Ge4oqmv9Pb27.png)

依此类推，其他问题也可以用这个方法表示，比方说太郎再买若干橘子，可以把橘子个数和单价传给乘法的节点，再把算出的橘子价格和苹果价格都传到一个加法节点，将总的价格拿去算消费税。用计算图解题的步骤可以归纳为：

1. 构建计算图；
2. 在计算图上从左到右进行计算。

上面“从左到右进行计算”的过程就是所谓**正向传播**，那么从图上从右向左就是**反向传播**。

### 局部计算与其他

尽管问题的全局可能非常复杂，但是计算图能够分节点将整个计算过程分解成简单的计算。

此外，可以借助计算图反向传播高效计算导数。比方说前面计算了购买2个苹果时加上消费税最终需要支付的金额，如果想知道道苹果价格的上涨会在多大程度上影响最终的支付金额（即支付金额关于苹果价格的导数），可以看这张图：

![基于反向传播的导数的传递](https://s2.loli.net/2022/10/20/RlpfhqoJxEeiCaH.png)

反向传播传递“局部导数”，在这个例子中反向传播从右向左传递导数的值（1、1.1、2.2），由此可知支付金额关于苹果价格的导数值是2.2。

使用这种方法，中间求得的导数结果可以被共享，从而提升计算效率。

## 链式法则

反向传播传递局部导数的原理是基于**链式法则**的，它如何对应计算图上的反向传播呢？

### 计算图的反向传播

假设有 $y=f(x)$，它的反向传播：

![计算图的反向传播-沿着反方向乘上局部导数](https://s2.loli.net/2022/10/20/QnoPifB5gbxHaW1.png)

如图所示，反向传播的计算顺序是将上游传过来的值（信号 $E$）乘以节点的局部导数（这里是 $y$ 关于 $x$ 的导数 $\frac{\partial y}{\partial x}$）再传给下一个节点。

### 链式法则的原理

链式法则要先从复合函数说起，复合函数就是由多个函数构成的函数。例如 $z = (x+y)^2$ 是由下面两个式子构成的：

$$ z = t^2 $$

$$ t = x + y $$

链式法则的定义：*如果某个函数由复合函数表示，则该复合函数的导数可以用构成复合函数的各个函数的导数的乘积表示*。也就是说，对于上面的复合函数，有：

$$ \frac{\partial z}{\partial x} = \frac{\partial z}{\partial t} \frac{\partial t}{\partial x} $$

尝试使用链式法则求 $\frac{\partial z}{\partial x}$，有：

$$ \frac{\partial z}{\partial t} = 2 t $$

$$ \frac{\partial t}{\partial x} = 1 $$

那么：

$$ \frac{\partial z}{\partial x} = \frac{\partial z}{\partial t} \frac{\partial t}{\partial x} = 2t \cdot 1 = 2 (x + y) $$

### 链式法则和计算图

用计算图表示上面的计算过程：

![计算图表示链式法则的计算过程，**2表示平方](https://s2.loli.net/2022/10/20/a6QUWR3ypTjJqDm.png)

以“**2”节点为例，正向传播时输入为 $t$，输出为 $z$，所以局部导数为 $\frac{\partial z}{\partial t}$，反向传播时的输入为 $\frac{\partial z}{\partial z}$（1），将其乘以局部导数再传给下一个节点。最终代入各个局部导数可以得到结果。

## 反向传播

### 加法节点的反向传播

以 $z = x + y$ 为例，它的导数：

$$ \frac{\partial z}{\partial x} = 1 $$

$$ \frac{\partial z}{\partial y} = 1 $$

用计算图表示（$\frac{\partial L}{\partial z}$ 表示反向传播时上游传过来的导数）：

![加法节点的反向传播](https://s2.loli.net/2022/10/20/EM6uPf52a3kHmCc.png)

在本例中，因为 $\frac{\partial z}{\partial x}$ 和 $\frac{\partial z}{\partial y}$ 都是1，加法节点就是把上游传过来的导数乘以1再传给下一个节点。

### 乘法节点的反向传播

以 $z = x y$ 为例，它的导数：

$$ \frac{\partial z}{\partial x} = y $$

$$ \frac{\partial z}{\partial y} = x $$

画出计算图：

![乘法节点的反向传播](https://s2.loli.net/2022/10/20/5Qo7dfV9tECyL1M.png)

如果正向的时候信号是 $x$，反向的时候局部导数就是 $y$；正向的时候信号是 $y$，反向的时候局部导数就是 $x$。表现为一种“翻转”的关系。乘法节点需要保留正向传播时传入的参数信息。

## 简单层的实现

知道了反向传播是怎么回事，不妨再来看看怎么用代码实现相关的乘法和加法节点（“层”）。

### 乘法层的实现

对于 $z = x y$，有实现：

```python
class MulLayer:
    def __init__(self) -> None:
        self.x = None
        self.y = None

    def forward(self, x, y):
        self.x = x
        self.y = y
        out = x * y
        return out

    def backward(self, dout):
        dx = dout * self.y  # 翻转 x 和 y
        dy = dout * self.x
        return dx, dy
```

用这个乘法层实现最开始说的买苹果的问题，计算图如下：

![买两个苹果](https://s2.loli.net/2022/10/20/IJtF3jzyrCfnOQ9.png)

正向传播的计算过程：

```python
apple = 100
apple_num = 2
tax = 1.1

mul_apple_layer = MulLayer()
mul_tax_layer = MulLayer()

# 正向传播过程
apple_price = mul_apple_layer.forward(apple, apple_num)
price = mul_tax_layer.forward(apple_price, tax)

print(price)  # 结果是220.00000000000003
```

反向传播求过程中各个变量的导数：

```python
# 反向传播过程
dprice = 1
dapple_price, dtax = mul_tax_layer.backward(dprice)
dapple, dapple_num = mul_apple_layer.backward(dapple_price)
print(dapple, dapple_num, dtax)  # 结果是 2.2 110.00000000000001 200
```

### 加法层的实现

对于 $z = x + y$，加法层有实现如下：

```python
class AddLayer:
    def __init__(self) -> None:
        pass

    def forward(self, x, y):
        out = x + y
        return out
 
    def backward(self, dout):
        dx = dout * 1
        dy = dout * 1
        return dx, dy
```

要解决的问题是买2个苹果和3个橘子，计算图如下：

![买2个苹果和3个橘子](https://s2.loli.net/2022/10/21/KieElhcZmUMOJCQ.png)

正向传播和反向传播的过程：

```python
apple = 100
apple_num = 2
orange = 150
orange_num = 3
tax = 1.1

mul_apple_layer = MulLayer()
mul_orange_layer = MulLayer()
add_apple_orange_layer = AddLayer()
mul_tax_layer = MulLayer()

# 前向传播过程
apple_price = mul_apple_layer.forward(apple, apple_num)  #(1)
orange_price = mul_orange_layer.forward(orange, orange_num)  #(2)
all_price = add_apple_orange_layer.forward(apple_price, orange_price)  #(3)
price = mul_tax_layer.forward(all_price, tax)  #(4)

# 反向传播过程，要注意与正向传播的计算顺序相反
dprice = 1
dall_price, dtax = mul_tax_layer.backward(dprice)  #(4)
dapple_price, dorange_price = add_apple_orange_layer.backward(dall_price)  #(3)
dorange, dorange_num = mul_orange_layer.backward(dorange_price)  #(2)
dapple, dapple_num = mul_apple_layer.backward(dapple_price)  #(1)

print(price)  # 结果是715.0000000000001
print(dapple_num, dapple, dorange, dorange_num,
      dtax)  # 结果是110.00000000000001 2.2 3.3000000000000003 165.0 650
```

与计算图对照，显然能得到正确结果。

## 激活函数层的实现

既然简单的乘法加法等节点能用代码以层的形式实现，那么神经网络中的节点应该也可以，毕竟也没有复杂太多。把构成神经网络的层实现为一个类。先来实现激活函数的 ReLU 层和 Sigmoid 层。

### ReLU 层

ReLU 函数：

$$ y = \begin{cases} x & (x \gt 0) \\\ 0 & (x \le 0) \end{cases} $$

$y$ 关于 $x$ 的导数：

$$ \frac{\partial y}{\partial x} = \begin{cases} 1 & (x \gt 0) \\\ 0 & (x \le 0) \end{cases} $$

那么，ReLU 层的计算图：

![ReLU 层的计算图](https://s2.loli.net/2022/10/21/LCrvOc4AmQhdpgz.png)

代码实现：

```python
class Relu:
    def __init__(self):
        self.mask = None

    def forward(self, x):
        self.mask = (x <= 0)  # mask 是由 bool 值组成的 numpy 数组
        out = x.copy()
        out[self.mask] = 0  # 小于等于0的项置0
        return out

    def backward(self, dout):
        dout[self.mask] = 0  # 正向传播时输入小于等于0的项对应导数是0
        dx = dout
        return dx
```

### Sigmoid 层

Sigmoid 函数：

$$ y = \frac{1}{1 + exp(-x)} $$

用计算图表示正向传播过程：

![Sigmoid 函数的正向传播](https://s2.loli.net/2022/10/21/TZjQGdIFMoLEUvO.png)

Sigmoid 函数的计算过程中出现了新的节点，需要看一看它们如何进行反向传播。

最后的“/”节点表示 $y = \frac{1}{x}$，它的导数可以解析性地表示为：

$$ \begin{aligned} \frac{\partial y}{\partial x} &= - \frac{1}{x^2} \\\ &= - y^2 \end{aligned} $$

也就是说，反向传播时会将上游传过来的值乘以 $-y^2$（$y$ 是正向传播时该节点的输出）再传给下游。