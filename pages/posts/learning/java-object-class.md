---
title: 对 Object 类的不完全解析
tags:
  - Java
categories:
  - 快去学习
date: 2021-08-13 14:42:55
---

## Object 类是什么

~~众所周知，~~`Object` 是 Java 中所有类的父类。当我们定义类的时候如果没有指定这个类继承的父类，默认父类就是 `Object` 。所以

```java
class aClass {...}
```

等价于

```java
class aClass extends Object {...}
```

## 一些有用没用的东西

+ `Object` 是所有类的父类，那么我们可以把任何类型的对象赋给 `Object` 型的变量。

### Object 的几个常用方法

#### toString()

`Object` 中 `toString` 方法如下：

```java
public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```

显然，这个方法的返回值是一个字符串，字符串的内容很简单，是“一个对象的运行时类名@对象的十六进制散列码值”。这个字符串表示了对象的一些信息。

使用示例：

```java
package ex081001;

class Demo {
	
}

public class TempObject {

	public static void main(String[] args) {
		Demo demo = new Demo();
		System.out.println(demo);
		System.out.println(demo.toString());
	}
}
```

运行结果：

```txt
ex081001.Demo@27973e9b
ex081001.Demo@27973e9b
```

可以看到在这种情况下直接输出 `demo` 和使用 `toString()` 方法再输出的结果是一样的，只要输出对象就会调用 `Object` 中的  `toString()` 方法。

当然，可以重写这个方法来取得对象的更多信息。例如：

```java
package ex081001;

public class Person {
	
	private String name;
	private Integer age;
	
	public Person(String name, Integer age) {
		this.name = name;
		this.age = age;
	}
	
	public String toString() {
		return "Name: " + this.name + "\nAge: " + age;
	}

	public static void main(String[] args) {
		Person p = new Person("Peter", 33);
		System.out.println(p);
	}
}
```

运行结果：

```java
Name: Peter
Age: 33
```

#### hashCode() 和 equals()

`hashCode()` 会给每个对象计算一个 hash 值，这个值在进行比较、查找的时候很有用。

需要注意：

+ 两个相同的对象的 hash 值一定相同。
+ 两个不同的对象 hash 值也可能相同，可以使用双重散列等方法来减少这种情况带来的错误。

至于 `equals()`，~~从字面上看就能看出来~~它是用来比较两个对象是否相同的，如果一个类没有重写这个方法，在调用它的时候就会自动调用 `Object` 中实现的方法：

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

在 `Object` 中实现的 `equals()` 是直接把两个对象进行比较，看它们的内容是否相同。这样做非常简单并且容易理解，却会带来一个问题。

举个例子来说明这个问题：200等于200.0吗？

~~这么简单的问题？肯定有鬼，我选择不等于。~~

当然是等于（笑），但是看看下面这段代码：

```java
package ex081001;

public class Numbers {

	public static void main(String[] args) {
		int a = 200;
		double b = 200.0;
		Integer i = a;
		Double d = b;
		System.out.println("a == b: " + (a == b));
		System.out.println("i == d: " + i.equals(d));
	}
}
```

让 `int` 型的 `200` 和 `double` 型的 `200.0` 作比较，结果当然是相等，那么把同样的值放到分别 `Integer` 和 `Double` 这两个包装类中也应该是一样的结果吧……

运行结果：

```txt
a == b: true
i == d: false
```

被打脸了，说好的200等于200.0，怎么放到包装类中变成对象就不一样了呢？问题的关键就在于这里其实是调用了 `Object` 中的 `equals()` ，直接把`double` 的 `b` 和 `Integer` 的 `i`进行比较，两个对象甚至都不是同一类，结果自然会是 `false`。

还有一种情况，像下面这样，我们假定名字和年龄相同的两个人就是同一个人：

```java
package ex081001;

public class Person {
	
	private String name;
	private Integer age;
	
	public Person(String name, Integer age) {
		this.name = name;
		this.age = age;
	}
	
	public String toString() {
		return "Name: " + this.name + "\nAge: " + age;
	}

	public static void main(String[] args) {
		Person p1 = new Person("Peter", 33);
		Person p2 = new Person("Peter", 33);
		System.out.println("p1:\n" + p1 + '\n');
		System.out.println("p2:\n" + p2 + '\n');
		System.out.println("p1.equals(p2): " + p1.equals(p2));
	}
}
```

运行结果：

```java
p:
Name: Peter
Age: 33

p2:
Name: Peter
Age: 33

p.equals(p2): false
```

这就更奇怪了，两个同类的对象，属性也是一样的，`equals` 给出的结果还是 `false`。这是因为 `Object` 中的 `equals()` 用 `==` 来比较两个对象，其实是**比较两个对象的内存地址**。上面的 `p1` 和 `p2` 两个对象的地址当然是不同的，所以我们得到了这样的结果。

要解决我们遇到的这些问题，就要重写 `equals()`。

##### 数之间的比较

对数进行比较的话我们可以先看看 `Java` 中的基本数据类型，这里不再细说。`Java` 中数形式的数据对应的包装类包括：

+ Byte
+ Short
+ Integer
+ Long
+ Float
+ Double

这些类都继承了 `Number`，所以在比较时可以让它们都转型成 `Number` 再比较。同时，为了不丢失精度，避免出现123等于123.1的情况，都用它们的 `doubleValue()` 来比较。像这样：

```java
package ex081001;

public class Numbers {
	
//	public static boolean equals(Object obj,Object anObj) {
//	    if(obj == null || anObj == null) return false;
//		if(obj == anObj) return true;
//		if(obj instanceof Number && anObj instanceof Number) {
//			return ((Number)obj).doubleValue() == ((Number)anObj).doubleValue();
//		}
//		return false;
//    }

	public static boolean equals(Number num, Number anNum) {
		if(num == null || anNum == null) return false;
		if(num == anNum) return true;
		return num.doubleValue() == anNum.doubleValue();
    }
	
	public static void main(String[] args) {
		Byte b = 123;
		Short s = 123;
		Integer i = 123;
		Long l = 123L;
		Float f = 123.1f;
		Double d = 123.0;
//		Byte one = 1;
//		Character charOne = '1';
        
		System.out.println("Byte " + b + " and Short " + s + ": " + equals(b, s));
		System.out.println("Byte " + b + " and Integer " + i + ": " + equals(b, i));
		System.out.println("Byte " + b + " and Long " + l + ": " + equals(b, l));
		System.out.println("Byte " + b + " and Float " + f + ": " + equals(b, f));
		System.out.println("Byte " + b + " and Double " + d + ": " + equals(b, d));
//		System.out.println();
//		System.out.println("Byte " + one + " and Character " + charOne + ": " + equals(one, charOne));
	}
}
```

运行结果：

```txt
Byte 123 and Short 123: true
Byte 123 and Integer 123: true
Byte 123 and Long 123: true
Byte 123 and Float 123.1: false
Byte 123 and Double 123.0: true
```

现在123和123.0相等了。

##### 某一个类的对象之间的比较

就用上面的 `Person` 类来举例说明。要想让 `equals()` 把两个属性相同的 `Person` 对象判断成相同的，可以重写成这样：

```java
package ex081001;

import java.util.HashMap;

public class Person {
	
	private String name;
	private Integer age;
	
	public Person(String name, Integer age) {
		this.name = name;
		this.age = age;
	}
	
	public String toString() {
		return "Name: " + this.name + "\nAge: " + age;
	}
	
	public boolean equals(Object obj) {
		if(this == obj) return true;
		if(obj == null || this.getClass() != obj.getClass()) return false;
		Person person = (Person)obj;
		return this.name.equals(person.name) && this.age.equals(person.age);
	}

	public static void main(String[] args) {
		Person p1 = new Person("Peter", 33);
		Person p2 = new Person("Peter", 33);
		System.out.println("p1:\n" + p1 + '\n');
		System.out.println("p2:\n" + p2 + '\n');
		System.out.println("p1.equals(p2): " + p1.equals(p2));
		
		HashMap<Person, Integer> table = new HashMap<Person, Integer>();
		table.put(p1, 0);
		System.out.println("p2 在 table 中的 value: " + table.get(p2));
	}
}
```

运行结果：

```txt
p1:
Name: Peter
Age: 33

p2:
Name: Peter
Age: 33

p1.equals(p2): true
p2 在 table 中的 value: null
```

虽然在直接比较的时候 `equals()` 返回了 `true`，但是我们把 `p1` 放到 `HashMap` 中，用和它相等的 `p2` 去查询 `value` 却找不到结果。`p1` 和 `p2` 明明是一样的，为什么会出现这种结果？按照我们的规定，`p1` 和 `p2`  既然是同一个人，最后应该能输出 `0` 才对。

问题的关键在于重写 `equals()` 的时候没有把 `hashCode()` 也进行重写。我们用 `equals()` 判断 `p1` 和 `p2` 确实是得到了想要的结果，但是 `HashMap` 是根据对象的 hash 值来判断有没有包含这个对象的，而在默认情况下，`hashCode()` 是将对象的存储地址进行映射，`p1` 和 `p2` 的地址不同，它们的 hash 值就不一样。正因如此，我们现在不能用 `p2` 获取 `p1` 在 `HashMap` 对应的 `value`。

如果想得到这个 `value` 值，只需要重写 `hashCode()`：

```java
package ex081001;

import java.util.HashMap;

public class Person {
	
	private String name;
	private Integer age;
	
	public Person(String name, Integer age) {
		this.name = name;
		this.age = age;
	}
	
	public String toString() {
		return "Name: " + this.name + "\nAge: " + age;
	}
	
	public boolean equals(Object obj) {
		if(this == obj) return true;
		if(obj == null || this.getClass() != obj.getClass()) return false;
		Person person = (Person)obj;
		return this.name.equals(person.name) && this.age.equals(person.age);
	}
	
	public int hashCode() {
		return 41 * (this.age.hashCode() + this.name.hashCode());
	}

	public static void main(String[] args) {
		Person p1 = new Person("Peter", 33);
		Person p2 = new Person("Peter", 33);
		System.out.println("p1:\n" + p1 + '\n');
		System.out.println("p2:\n" + p2 + '\n');
		System.out.println("p1.equals(p2): " + p1.equals(p2));
		
		HashMap<Person, Integer> table = new HashMap<Person, Integer>();
		table.put(p1, 0);
		System.out.println("p2 在 table 中的 value: " + table.get(p2));
	}
}
```

运行结果：

```java
p1:
Name: Peter
Age: 33

p2:
Name: Peter
Age: 33

p1.equals(p2): true
p2 在 table 中的 value: 0
```

现在用 `p2` 也能获取 `p1` 的 `value`，这意味着就算用 hash 值校验，`p1` 和 `p2` 也是相同的。换句话说，重写 `equals()` 时也要重写 `hashCode()`，这样才能保持逻辑上的一致。
