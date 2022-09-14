---
title: java-interface
tags:
  - Java
categories:
  - 快去学习
date: 2021-08-06 13:44:25
---

## 接口是什么

**Java接口**是一系列方法的声明，是一些方法特征的集合，一个**接口**只有方法的特征没有方法的实现，这些方法可以在不同的地方被不同的类实现，而这些实现可以具有不同的行为。

从定义可以看出接口中的方法应该都是抽象方法，事实上接口中的方法会被隐式地指定为`public abstract`。

接口中可以有属性变量，但这些变量会被隐性地指定为`public static final`变量。

### 接口与类

从上面可以看出，接口与类最明显的区别在于接口的方法没有方法体，因此接口不能被实例化。除此之外，类之间不支持多继承，而接口之间可以多继承。

除了普通的类，还有一种类是抽象类。抽象类介于类和接口之间，其内部的方法可以有具体实现，成员变量类型不限。一个类只能继承一个抽象类，但可以实现多个接口。

> 在 JDK 1.8 之后，接口中可以有静态方法和方法体，可以有实现了的默认方法（用default修饰）。

### 使用接口的基本格式

声明：

```java
interface Name1 {
    ...
}
interface Name2 {
    ...
}
```

实现：

```java
class ClassName implements Name1, Name2 {
    ...
    // 需要实现接口的所有抽象方法
}
```

## 为什么要使用接口

关于这个问题，动动小手在网上搜一下就可以得到从各种角度阐述的答案。总的来说，接口的意义在于它的**抽象性**。借助接口可以实现调用与实现解耦，增强系统灵活性，也使得各个层次能够同时开发。

举个例子，我们用代码来描述乐器。乐器当然是可以用来演奏的，但是具体到各种乐器，它们的演奏方法又不一样，如果在一个乐器的类中写下所有的演奏方法未免显得太过臃肿，对每个实例判断乐器类型选择方法也会很麻烦。在这种情况下，就可以将乐器写成接口，只提供演奏的抽象方法，方法的实现就交给具体的类。就像这样：

```java
interface Instruments {
    void play();
}
class Wind implements Instruments {
    public void play() {
        System.out.println("Wind:Play");
    }
}
class Stringed implements Instruments {
    public void play() {
        System.out.println("Stringed:Play");
    }
}
...
```

## 使用接口的实例

用代码来表示乐队的一些行为。

首先定义乐器和歌手的接口，有一些简单的方法：

```java
// Instruments.java
package band;

public interface Instruments {
	default void ready() {
		System.out.println(this.getClass().getName() + ": ready.");
	}
	void play();
}
```

```java
// Singers.java
package band;

public interface Singers {
	static void hello() {
		System.out.println("Say \"Hello!\".");
	}
    void sing();
}
```

这里`Instruments`中有一个默认方法，`Singers`中有一个静态方法。

乐器的实现：

```java
// Guitar.java
package band;

public class Guitar implements Instruments {
    public void play() {
    	System.out.println("Playing guitar~");
    }
}
```

```java
// Bass.java
package band;

public class Bass implements Instruments {
    public void play() {
    	System.out.println("Playing bass~");
    }
}
```

```java
// Drums.java
package band;

public class Drums implements Instruments {
    public void play() {
    	System.out.println("Playing drums~");
    }
}
```

```java
// Keyboard.java
package band;

public class Keyboard implements Instruments {
    public void play() {
    	System.out.println("Playing keyboard~");
    }
}
```

可以发现接口中的默认方法就不用另写实现了。

歌手的实现：

```java
// Solo.java
package band;

public class Solo implements Singers {
    public void sing() {
    	System.out.println("Solo singer: start.");
    }
}
```

有了上面这些定义和实现，我们就可以简单地描述一支乐队的行为：

```java
// Band.java
package band;

public class Band {
	
	private Instruments[] insts;
	private Singers[] sings;
	
	public Band(Instruments[] i, Singers[] s) {
		this.insts = i;
		this.sings = s;
	}
	
	public void getReady() {
        // 直接通过接口名调用静态方法
		Singers.hello();
        // 调用接口中已经实现的默认方法
		for(Instruments i : insts) {
			i.ready();
		}
	}
	
	public void startPlay() {
		for(Instruments i : insts) {
			i.play();
		}
		for(Singers s : sings) {
			s.sing();
		}
	}

	public static void main(String[] args) {
		Instruments[] i = {
				new Guitar(),
				new Bass(),
				new Drums(),
				new Keyboard()
		};
		Singers[] s = {
				new Solo()
		};
        
		Band newBand = new Band(i, s);
		newBand.getReady();
		newBand.startPlay();
	}
}
```

乐队的成员包括一些乐器~~乐手们对不起~~和歌手，这里定义乐队的行为：准备和开始演奏。程序的运行结果如下：

```text
Say "Hello!".
band.Guitar: ready.
band.Bass: ready.
band.Drums: ready.
band.Keyboard: ready.
Playing guitar~
Playing bass~
Playing drums~
Playing keyboard~
Solo singer: start.
```

嗯嗯，就是这样。
