---
title: 深度学习入门：与学习相关的技巧
tags:
  - 深度学习
categories:
  - 快去学习
date: 2022-11-04 23:36:13
katex: true
---

**施工中**

内容参考：

- 《深度学习入门：基于 Python 的理论与实现》(斋藤康毅)
- [上述书籍作者提供的代码](https://github.com/oreilly-japan/deep-learning-from-scratch)

## 参数的更新

实际问题中参数空间可能非常复杂，很难快速找到最优解。

### SGD

SGD 的策略很好理解，就是沿着梯度方向更新参数，寻找使损失函数值尽可能小的参数。可以写成如下式子：

$$ \boldsymbol{W} \leftarrow \boldsymbol{W} - \eta \frac{\partial L}{\partial \boldsymbol{W}} $$

其中 $\boldsymbol{W}$ 表示要更新的权重参数，$\frac{\partial L}{\partial \boldsymbol{W}}$ 是损失函数关于 $\boldsymbol{W}$ 的梯度，$\eta$ 表示学习率（一般取0.1或0.01等事先确定的值）。

将 SGD 的方法用类的形式实现：
```python
class SGD:
    def __init__(self, lr=0.01):
        self.lr = lr  # 学习率

    def update(self, params, grads):
        for key in params.keys():
            params[key] -= self.lr * grads[key]
```

`SGD` 可以作为代码中的 `optimizer` 来进行参数更新。只要不同的最优化方法都实现 `update(params, grads)`，就可以用 `optimizer.update(params, grads)` 的形式在代码中完成更新参数的步骤。

从上面可以看出，SGD 的实现也很简单。然而在某些情况下（比如梯度并没有指向最小值的方向），SGD 的效率并不理想。例如，对于函数 $f(x, y) = \frac{1}{20} x^2 + y^2$，它的函数图形和等高线如图所示：

![f(x, y) 的图像和等高线](https://s2.loli.net/2022/11/05/1cVihLHDPk8z3K2.png)

梯度如图所示：

![f(x, y) 的梯度](https://s2.loli.net/2022/11/05/Cdzb3iq8xgp4m9M.png)

显然函数在 $(x, y) = (0, 0)$ 处取得最小值，但是在很多地方，梯度并不指向 $(0, 0)$。对这个函数使用 SGD，比方说从 $(x, y) = (-7.0, -2.0)$ 处开始搜索，更新路径会像这样：

![更新路径](https://s2.loli.net/2022/11/05/7NsIKoBmYT4R6x2.png)

由于很多地方的梯度不指向 $(0, 0)$，这个更新路径呈“之”字形，显然不是很理想，效率不高。所以我们需要其他的更新方法。

### Momentum

Momentum 方法引入了“速度”，“速度”的更新可以看作物体在梯度方向上受力：

$$ \boldsymbol{v} \leftarrow \alpha \boldsymbol{v} - \eta \frac{\partial L}{\partial \boldsymbol{W}} $$

$$ \boldsymbol{W} \leftarrow \boldsymbol{W} + \boldsymbol{v} $$

$\alpha \boldsymbol{v}$ 在物体不受力时会使速度衰减（$\alpha$ 一般取零点几的值），可以看作空气等带来的阻力。

Momentum 方法的代码实现：

```python
class Momentum:
    def __init__(self, lr=0.01, momentum=0.9):
        self.lr = lr
        self.momentum = momentum
        self.v = None

    def update(self, params, grads):
        if self.v is None:
            self.v = {}
            for key, val in params.items():
                self.v[key] = np.zeros_like(val)  # “速度”的形状与参数相同

        for key in params.keys:
            self.v[key] = self.momentum * self.v[key] - self.lr * grads[key]
            params[key] += self.v[key]
```

对于之前的问题，Momentum 方法的更新路径：

![Momentum 方法的更新路径](https://s2.loli.net/2022/11/05/AT4OMalyiK5mEJ3.png)

### AdaGrad

AdaGrad 方法基于“学习率衰减”的想法：随着学习的进行，使学习率逐渐减小。实际上，AdaGrad 方法在学习过程中会为参数的每个元素调整学习率。

$$ \boldsymbol{h} \leftarrow \boldsymbol{h} + \frac{\partial L}{\partial \boldsymbol{W}} \odot \frac{\partial L}{\partial \boldsymbol{W}} $$

$$ \boldsymbol{W} \leftarrow \boldsymbol{W} - \eta \frac{1}{\sqrt{\boldsymbol{h}}} \frac{\partial L}{\partial \boldsymbol{W}} $$

$\odot$ 表示对应矩阵元素的乘法，$\boldsymbol{h}$ 表示以前所有梯度值的平方和。显然参数中变动较大的元素的学习率会变得更小（准确地说是学习率会被乘以一个更小的因数）。

实现过程：

```python
class AdaGrad:
    def __init__(self, lr=0.01):
        self.lr = lr
        self.h = None

    def update(self, params, grads):
        if self.h is None:
            self.h = {}
            for key, val in params.items():
                self.h[key] = np.zeros_like(val)

        for key in params.keys():
            self.h[key] += grads[key] * grads[key]
            params[key] -= self.lr * grads[key] / (np.sqrt(self.h[key]) + 1e-7)  # 1e-7避免将0用作除数
```

这个方法在 $f(x, y)$ 中的更新路径：

![AdaGrad 方法的更新路径](https://s2.loli.net/2022/11/05/4dN1YzWqM8vLkyn.png)

因为 `y` 方向的更新幅度较大，在这个方向上的学习率衰减也就更明显。

当然还有别的方法，比如融合了 Momentum 和 AdaGrad 的 Adam 方法，就不再说明了。~~（因为原书中也只给了相关论文和代码实现。）~~

使用不同的方法可以得到不同的更新路径，对于前面的问题来说 AdaGrad 能得到比较理想的路径，但如果换一个问题，可能其他方法会有更好的结果。~~（那是自然。）~~

## 权重的初始值

### 初始值可以为0吗

**权值衰减**是一种抑制过拟合的技巧，它以减小权重参数的值为目的进行学习。如果想减小权重，最好的方法是一开始就把权重设定为较小的值。那把权重的初始值设为0（说到更普遍的情况，其实是把权重初始值设置为一样的值）呢？

考虑误差反向传播就可以发现，将权重初始值设置为一样的值，反向传播时也会被更新为一样的值。都是一样的值的话神经网络为什么要有许多权重呢？

~~原来如此，所以必须随机生成初始值！~~
