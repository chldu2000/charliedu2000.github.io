---
title: 有关Java中类继承的二三事
date: 2021-08-04 17:00:21
tags:
  - Java
categories:
  - 快去学习
---

> 不问不知道，一问才发现之前学得实在太水，好多东西都没怎么搞明白。

## 继承是什么

继承是面向对象的三个基本特征之一，它使得子类具有父类的属性和方法或者重新定义、追加属性和方法等。

<!-- more -->

Java 不支持多继承。

### 类继承的格式

在 Java 中类继承的一般格式如下：

```java
public class 父类 {
    ...
}
public class 子类 extends 父类 {
    ...
}
```

实现接口时使用`implements`关键字，可以变相实现多继承：

```java
public interface A {
    ...
}
public interface B {
    ...
}
public class C implements A,B {
    ...
}
```

## 为什么要继承

这里我们用一个例子来说明。

假设要开发学生类，学生分别有大学生、中学生和小学生，属性都包括姓名、ID 和年龄，都有一个考试方法。如果不利用继承，就可能需要写这样的代码：

```java
// 大学生
public class UniStudent {
    private String name;
    private int id;
    private int age;
    public UniStudent(String n, int i, int a) {
        name = n;
        id = i;
        age = a;
    }
    public void exam(){
        System.out.println("考试");
    }
}
```

```java
// 中学生
public class MidStudent {
    private String name;
    private int id;
    private int age;
    public MidStudent(String n, int i, int a) {
        name = n;
        id = i;
        age = a;
    }
    public void exam(){
        System.out.println("考试");
    }
}
```

```java
// 小学生
public class PriStudent {
    private String name;
    private int id;
    private int age;
    public PriStudent(String n, int i, int a) {
        name = n;
        id = i;
        age = a;
    }
    public void exam(){
        System.out.println("考试");
    }
}
```

很容易看出来上面的代码存在很多重复的地方，而且要修改的时候也会很麻烦。要解决这些问题就要用到继承：

```java
// 学生父类
public class Student {
    private String name;
    private int id;
    private int age;
    public Student(String n, int i, int a) {
        name = n;
        id = i;
        age = a;
    }
    public void exam(){
        System.out.println("考试");
    }
}
```

```java
// 大学生
public class UniStudent extends Student {
    public UniStudent(String n, int i, int a) {
        super(n, i, a);
    }
}
```

```java
// 中学生
public class MidStudent extends Student {
    public MidStudent(String n, int i, int a) {
        super(n, i, a);
    }
}
```

```java
// 小学生
public class PriStudent extends Student {
    public PriStudent(String n, int i, int a) {
        super(n, i, a);
    }
}
```

把相同的部分放到父类，这样就减少了重复的代码，也就是提高了**复用性**。同时，继承也使类的等级层次更加清晰。

## 继承的特性

### 子类继承了父类的哪些东西

> 这题我知道，非私有的！
>
> （其实并不是，子类继承了父类所有的属性与方法。）

比方说，我们知道子类不能直接调用父类私有的属性和方法，那么到底有没有继承呢？还是通过例子来说明：

```java
class Student {
    private String name;
    private int id;
    private int age;
    
    public void exam(){
        System.out.println("考试");
    }
}
class UniStudent extends Student {
    public void printID() {
        System.out.println("ID:" + id);
    }
}
```

这样当然是不可以的，就好像`UniStudent`没有`id`这个属性一样。

但是如果是这样：

```java
class Student {
    private String name;
    private int id;
    private int age;
    
    public void exam(){
        System.out.println("考试");
    }
    public void setID(int myID) {
    	this.id = myID;
    }
    public int getID() {
    	return this.id;
    }
}
class UniStudent extends Student {
    public void printID() {
        System.out.println("ID:" + getID());
    }
}
```

显然`UniStudent`也可以获取`id`并且在屏幕上打印出来。所以尽管`id`是`Student`私有的，`UniStudent`还是能够继承它，只是不能直接调用，需要借助构造方法和不受访问权限限制的其他方法。

既然子类继承了父类所有的属性与方法，那么新的问题就出现了：

### 子类和子类对象可以调用继承到的哪些属性与方法

子类能够调用的属性和方法与访问权限修饰符有关。

| 作用域    | 当前类 | 同一包中 | 其他包的子类 | 其他包非子类 |
| --------- | ------ | -------- | ------------ | ------------ |
| public    | √      | √        | √            | √            |
| protected | √      | √        | √            | ×            |
| default   | √      | √        | ×            | ×            |
| private   | √      | ×        | ×            | ×            |

## 方法重写

子类可以对父类允许访问的方法进行重新编写，根据需要实现父类的方法。

重写后的方法被子类优先调用，可以使用`super`关键字调用父类中被重写的方法。

举例：

```java
class Student {
    protected void exam() {
        System.out.println("考试");
    }
}
class UniStudent extends Student {
    public void exam() {
    	super.exam();
        System.out.println("大学生考试");
    }
}
public class Manage {
    public static void main(String args[]) {
        Student stu = new Student();
        UniStudent unistu = new UniStudent();
        stu.exam();
        unistu.exam();
    }
}
```

运行结果：

```text
考试
考试
大学生考试
```

### 注意

一般情况下重写方法时除了方法体之外的其他部分都应该与父类的方法一致，但情况不总是这样。

在重写方法时，参数列表必须保持一致，但是访问权限修饰符和返回值类型可以修改。

+ 返回值类型可以不同，但必须是父类对应方法返回值的派生类。
+ 访问权限不能比父类中对应方法的访问权限更低。比如父类中的`public`方法，在子类中重写该方法时就不能声明为`protected`。

## 转型

简单来说，就是父类引用指向子类对象。

```java
Father f1 = new Son();
```

### 向上转型

例：

```java
class Student {
    protected void exam() {
        System.out.println("考试");
    }
}
class UniStudent extends Student {
    public void exam() {
        System.out.println("大学生考试");
    }
}
public class Manage {
    public static void main(String args[]) {
        Student stu = new Student();
        Student unistu = new UniStudent(); // 向上转型，大学生是学生
        stu.exam();
        unistu.exam();
    }
}
```

在这里，`Student unistu = new UniStudent();`就是向上转型，不需要强制转型。

### 向下转型

```java
Father f2 = new Son(); // 向上转型
Son s2 = (Son)f2; // 向下转型，需要强制转型
```

因为这里的`f2`实际上指向的是子类的对象，向下转型不会出错。

如果是这样：

```java
Father f3 = new Father();
Son s3 = (Son)f3; // 编译不会出错但运行时会出错
```

会出现运行时错误。

向下转型时要注意对象原本是什么类型的实例。

