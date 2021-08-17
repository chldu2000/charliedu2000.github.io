---
title: 如何实现一个 Array List
tags:
  - Java
categories:
  - 快去学习
date: 2021-08-16 14:37:32
---

`ArrayList` 是一种常用的数据结构，经常被拿来和 `LinkedList` 等进行对比。跟单纯的数组比起来，`ArrayList` 拥有许多使用方便的方法~~，可谓居家旅行摸鱼 coding 必备之利器~~。

~~虽然还没有多少实战经验，~~我们还是来尝试实现一个具有增删改查等基本功能的 `ArrayList` 吧。

![菜狗](https://i.loli.net/2021/08/17/1f8iAd2xUr9BcNR.jpg)

<!-- more -->

## MyList 接口

不管是哪种类型的 `List` 一些基本的方法声明都是一样的，所以我们先定义一个 `MyList` 接口，提供一些方法的抽象。（万一之后还能再用呢？）

```java
package ex081401;

public interface MyList<E> {
	/**
	 * 
	 * @return 返回列表当前的大小
	 */
	int size();
	
	/**
	 * 在列表末尾添加一个元素
	 * @param value 要添加的元素
	 */
	void add(E value);
	
	/**
	 * 将此列表与另一个列表合并
	 * @param list 要合并的列表
	 */
	void addAll(MyList<E> list);
	
	/**
	 * 把一个数组合并进列表
	 * @param list 要合并的数组
	 */
	void addAll(E[] list);
	
	/**
	 * 将一个元素插入列表的指定下标处
	 * @param index 要插入位置对应的下标
	 * @param value 被插入的元素
	 */
	void insert(int index, E value);
	
	/**
	 * 将指定下标处的元素删除
	 * @param index 要删除元素的下标
	 */
	void remove(int index);
	
	/**
	 * 将指定元素删除
	 * @param value 要删除的元素
	 */
	void remove(E value);
	
	/**
	 * 清除所有元素
	 */
	void removeAll();
	
	/**
	 * 获取指定下标处的元素
	 * @param index 目标元素的下标
	 * @return 获取到的元素对象
	 */
	E get(int index);
	
	/**
	 * 获取指定元素的下标数组
	 * @param value 目标元素
	 * @return 获取到的元素下标数组
	 */
	int[] get(E value);
	
	/**
	 * 修改指定下标处的元素
	 * @param index 目标元素的下标
	 * @param value 修改后的元素
	 */
	void set(int index, E value);
	
	/**
	 * 修改指定元素
	 * @param target 目标元素
	 * @param value 修改后的元素
	 */
	void set(E target, E value);
	
	/**
	 * 将列表中的元素按 hashcode 排序
	 */
	void sort();

}
```

## MyArrayList

有了接口，我们现在可以来实现一个 `ArrayList`。

顾名思义，`ArrayList` 就是应该用数组来存储数据。嗯，没错！

那我们给一个数组，顺便用几个数分别表示数组中非空部分的大小、总长度和允许的最大最小长度。

```java
public class MyArrayList<E> implements MyList<E> {
	
	private int size;
	private int length;
	public final int MIN_LENGTH = 10;
	public final int MAX_LENGTH = Integer.MAX_VALUE;
	
	private Object[] values;
}
```

我们重新写一个构造方法，在创建 `MyArrayList` 的时候就做必要的初始化：

```java
public MyArrayList(int arrLength) {
	if(arrLength < MIN_LENGTH) {
		arrLength = MIN_LENGTH;
	}
	Object[] newValues = new Object[arrLength];
	length = arrLength;
	size = 0;	
	values = newValues;
}
```

在这里如果初始化时指定的数组长度太小或者是负数，我就直接把长度改成了允许的最小长度。其他情况下这个长度值不小于 `10` 且在 `int` 的范围内，可以直接用。~~一般情况下应该不会用到那么长的**数组**吧……~~

既然要实现接口，就要把接口中的抽象方法都实现。最简单的一个，返回数组中的元素个数：

```java
@Override
public int size() {
	return this.size;
}
```

### 增加

添加单个元素：

```java
@Override
public void add(E value) {
	if(size >= length) {
		int newLength = (length >> 1) + length;
		if(newLength < 0) {
			newLength = Integer.MAX_VALUE;
		}
		Object[] newValues = new Object[newLength];
		for(int i = 0; i < length; i ++) {
			newValues[i] = values[i];
		}
		length = newLength;
		values = newValues;
	}
	values[size++] = value;
}
```

显然，如果数组已经被放满了就必须扩容。新建一个长度为原数组长度1.5倍的数组，把原来的数组元素都放进去，更新长度再替换原来的数组。`if(newLength < 0)` 这里是对新长度溢出的一个简单处理。

把两个队列合并：

```java
@Override
public void addAll(MyList<E> list) {
	int aSize = this.size;
	int bSize = list.size();
	int newSize = aSize + bSize;
	if(newSize < 0) {
		newSize = MAX_LENGTH;
	}
	Object[] newValues = new Object[newSize];
	for(int i = 0; i < aSize; i ++) {
		newValues[i] = this.values[i]; 
	}
	for(int i = aSize; i < newSize; i ++) {
		newValues[i] = list.get(i - aSize);
	}
	this.length = newSize;
	this.size = newSize;
	this.values = newValues;
}
```

如果 `newSize < 0` 就表示两个队列元素个数之和溢出，这里做了一个~~不负责任的~~处理：新的数组长度改成 `int` 的最大值，只把这个数组装满。这样会有一部分元素装不下。也可以输出提示信息并且做其他处理。

把队列和一个数组合并，和上一个方法类似：

```java
@Override
public void addAll(E[] list) {
	int aSize = this.size;
	int bSize = list.length;
	int newSize = aSize + bSize;
	if(newSize < 0) {
		newSize = MAX_LENGTH;
	}
	Object[] newValues = new Object[newSize];
	for(int i = 0; i < aSize; i ++) {
		newValues[i] = this.values[i]; 
	}
	for(int i = aSize; i < newSize; i ++) {
		newValues[i] = list[i - aSize];
	}
	this.length = newSize;
	this.size = newSize;
	this.values = newValues;
}
```

在指定位置插入元素：

```java
@Override
public void insert(int index, E value) {
	if(index < 0 || index >= size) {
		System.out.println("插入位置对应的的下标不在允许范围内。");
	}
	else {
		add(null);
		for(int i = size - 1;i > index; i --) {
			values[i] = values[i - 1];
		}
		values[index] = value;
	}
}
```

如果指定的位置有误就输出一条提示，不进行其他操作。

### 删除

删除指定位置的元素：

```java
@Override
public void remove(int index) {
	if(index < 0 || index >= size) {
		System.out.println("删除位置对应的的下标不在允许范围内。");
	}
	else {
		for(int i = index;i < size - 1; i ++) {
			values[i] = values[i + 1];
		}
		values[size - 1] = null;
		size -= 1;
	}
}
```

如果指定的位置有误就输出一条提示，不进行其他操作。

删除指定元素：

```java
@Override
public void remove(E value) {
	for(int i = 0; i < size; i ++) {
		if(values[i].equals(value)) {
			remove(i--);
		}
	}
}
```

删除所有元素：

```java
@Override
public void removeAll() {
	Object[] newValues = new Object[length];
	values = newValues;
	size = 0;
}
```

### 查询

查询指定位置的元素：

```java
@Override
public E get(int index) {
	if(index < 0 || index >= size) {
		return null;
	}
	return (E)values[index];
}
```

查询指定元素的下标：

```java
@Override
public int[] get(E value) {
	int[] index = {};
	for(int i = 0; i < size; i ++) {
		if(this.get(i).equals(value)) {
			index = Arrays.copyOf(index, index.length+1);
			index[index.length-1] = i;
		}
	}
	return index;
}
```

### 修改

修改指定位置的元素：

```java
@Override
public void set(int index, E value) {
	if(index < 0) {
		System.out.println("指定的下标太小。");
	}
	else if(index >= size) {
		System.out.println("指定的下标太大。");
	}
	else {
		values[index] = value;
	}
}
```

指定的下标有误时根据大小输出一条提示，不做其他处理。

修改指定元素：

```java
@Override
public void set(E target, E value) {
	for(int i = 0; i < size; i ++) {
		if(values[i].equals(target)) {
			values[i] = value;
		}
	}
}
```

#### 排序

根据对象元素的 `hashCode` 来排序：

```java
@Override
public void sort() {
	int theSize = this.size;
	Integer[] hashCodes = new Integer[theSize];
	for(int i = 0; i < theSize; i ++) {
		hashCodes[i] = values[i].hashCode();
	}
	int temp = 0;
	Object tempObject;
	for(int i = 1; i < theSize; i ++) {
		for(int j = 0; j < theSize - i; j ++) {
			if(hashCodes[j] > hashCodes[j+1]) {
				temp = hashCodes[j];
				hashCodes[j] = hashCodes[j+1];
				hashCodes[j+1] = temp;
				tempObject = this.values[j];
				this.values[j] = this.values[j+1];
				this.values[j+1] = tempObject;
			}
		}
	}
}
```

用了简单的冒泡排序，当然其他排序方法也可以。没有借助 `Map` 一类的结构，因为它们似乎都不支持重复的 `key`。

### 其他

不重写 `toString()` 的话直接输出队列只能看到一行对人来说十分抽象的东西，所以还是重写一下：

```java
public String toString() {
	String res = "[";
	for(int i = 0; i < size; i ++) {
		res += values[i];
		if(i < size - 1) {
			res += ", ";
		}
		if(i % 5 == 4) {
			res += "\n";
		}
	}
	res += "]";
	return res;
}
```

### 验证

简单验证一下各个方法的功能：

```java
public static void main(String[] args) {
	MyArrayList<String> list = new MyArrayList<String>(1);
	for(int i = 0; i < 10; i ++) {
	list.add("i = " + i);
	}
	System.out.println("10个对象：");
	System.out.println(list.size());
	System.out.println(list);
	list.add("10!!");
	System.out.println("\n添加1个对象：");
	System.out.println(list.size());
	System.out.println(list);
	list.addAll(list);
	System.out.println("\n与自己合并：");
	System.out.println(list.size());
	System.out.println(list);
	String[] a = {"123", "214"};
	list.addAll(a);
	System.out.println("\n与 {“123”， “214”} 合并：");
	System.out.println(list.size());
	System.out.println(list);
	list.remove(1);
	System.out.println("\n删除第2个对象");
	System.out.println(list.size());
	System.out.println(list);
	list.remove("10!!");
	System.out.println("\n删除 “10!!” ");
	System.out.println(list.size());
	System.out.println(list);
	list.insert(1, "One");;
	System.out.println("\n在第2个位置插入 “One” ");
	System.out.println(list.size());
	System.out.println(list);
	list.set(0, "zero");
	System.out.println("\n把第1个改成 “zero” ");
	System.out.println(list.size());
	System.out.println(list);
	list.set("zero", "Zero");
	System.out.println("\n把 “zero” 改成 “Zero” ");
	System.out.println(list.size());
	System.out.println(list);
	list.set("i = 2", "Two");
	System.out.println("\n把 “i= 2” 改成 “Two” ");
	System.out.println(list.size());
	System.out.println(list);
	System.out.println("\n输出第14个对象");
	System.out.println(list.get(13));
	System.out.println("\n输出 “Two” 的下标数组");
	System.out.println(Arrays.toString(list.get("Two")));
	list.sort();
	System.out.println("\n按 hash 值排序");
	System.out.println(list.size());
	System.out.println(list);
	list.removeAll();
	System.out.println("\n清空");
	System.out.println(list.size());
	System.out.println(list);
}
```

运行结果：

```text
10个对象：
10
[i = 0, i = 1, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9
]

添加1个对象：
11
[i = 0, i = 1, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
10!!]

与自己合并：
22
[i = 0, i = 1, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
10!!, i = 0, i = 1, i = 2, i = 3, 
i = 4, i = 5, i = 6, i = 7, i = 8, 
i = 9, 10!!]

与 {“123”， “214”} 合并：
24
[i = 0, i = 1, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
10!!, i = 0, i = 1, i = 2, i = 3, 
i = 4, i = 5, i = 6, i = 7, i = 8, 
i = 9, 10!!, 123, 214]

删除第2个对象
23
[i = 0, i = 2, i = 3, i = 4, i = 5, 
i = 6, i = 7, i = 8, i = 9, 10!!, 
i = 0, i = 1, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
10!!, 123, 214]

删除 “10!!” 
21
[i = 0, i = 2, i = 3, i = 4, i = 5, 
i = 6, i = 7, i = 8, i = 9, i = 0, 
i = 1, i = 2, i = 3, i = 4, i = 5, 
i = 6, i = 7, i = 8, i = 9, 123, 
214]

在第2个位置插入 “One” 
22
[i = 0, One, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
i = 0, i = 1, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
123, 214]

把第1个改成 “zero” 
22
[zero, One, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
i = 0, i = 1, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
123, 214]

把 “zero” 改成 “Zero” 
22
[Zero, One, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
i = 0, i = 1, i = 2, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
123, 214]

把 “i= 2” 改成 “Two” 
22
[Zero, One, Two, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
i = 0, i = 1, Two, i = 3, i = 4, 
i = 5, i = 6, i = 7, i = 8, i = 9, 
123, 214]

输出第14个对象
i = 3

输出 “Two” 的下标数组
[2, 12]

按 hash 值排序
22
[123, 214, One, Two, Two, 
Zero, i = 0, i = 1, i = 3, i = 3, 
i = 4, i = 4, i = 5, i = 5, i = 6, 
i = 6, i = 7, i = 7, i = 8, i = 8, 
i = 9, i = 9]

清空
0
[]
```

`MyArrayList` 的功能基本正常，那就算成功了罢。一些地方可能还不够合理，不过能实现总是好的。

![一条咸鱼](https://i.loli.net/2021/08/17/h5LYZmp2adNPVv6.jpg)

