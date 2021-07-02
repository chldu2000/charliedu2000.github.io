---
title: "1.汇编初步"
categories: [ "快去学习" ]
tags: [ "学习笔记","汇编" ]
draft: false
slug: "56"
date: "2021-03-10 15:26:00"
---

# 2020-2021-2 计算机系统

2020-2021学年第二学期 计算机系统

基于32位系统

随上课进度更新

## 汇编初步

### 机器指令

```text
00000000 <_start>:
   0:   90
   1:   ……
```

地址：指令数

一行对应一条指令

### 通用寄存器

|%eax|%ax|%ah|%al|
|:----:|:---:|:---:|:---:|
|31-0|15-0|15-8|7-0|

（命名方式与发展过程相关）

### AT&T汇编代码

```assembly
格式：指令 源操作数,目的操作数
示例：movl $8,%eax0
```

+ 操作数
  + 立即数
  + 寄存器
  + 存储器

#### 汇编示例

```assembly
 .section .text

 .global _start
 _start:
     nop
     mov $0x4, %eax
     sarl %eax
     movw $1, %bx
     movb $0xff65, %dh
     movl $13, %edx


     movl $1, %eax
     movl $0, %ebx
     int $0x80
```

##### Tip：gcc编译

+ 预处理

    `gcc -E main.c -o main.i`

+ 编译

    `gcc -S main.i -o main.s`

+ 汇编

    `gcc -c main.s -o main.o`

+ 链接

    `gcc main.o -o main`

##### Tip：gdb调试相关

[参考简书Adam_0的文章](https://www.jianshu.com/p/589308dd36dc)

+ 启动gdb

  ```shell
  gdb xxx
  可以通过--silent、-q和--quiet选项取消输出免责条款
  ```

+ 常用命令

  ```text
  编译程序时需要加上-g，之后才能用gdb进行调试：gcc -g main.c -o main

  gdb中命令：

  回车键：重复上一命令

  （gdb）help：查看命令帮助，具体命令查询在gdb中输入help + 命令，简写h

  （gdb）run：重新开始运行文件（run-text：加载文本文件，run-bin：加载二进制文件），简写r

  （gdb）start：单步执行，运行程序，停在第一执行语句

  （gdb）list：查看原代码（list-n,从第n行开始查看代码。list+ 函数名：查看具体函数），简写l

  （gdb）set：设置变量的值

  （gdb）next：单步调试（逐过程，函数直接执行），简写n

  （gdb）step：单步调试（逐语句：跳入自定义函数内部执行），简写s

  （gdb）backtrace：查看函数的调用的栈帧和层级关系，简写bt

  （gdb）frame：切换函数的栈帧，简写f

  （gdb）info：查看函数内部局部变量的数值，简写i

  （gdb）finish：结束当前函数，返回到函数调用点

  （gdb）continue：继续运行，简写c

  （gdb）print：打印值及地址，简写p

  （gdb）quit：退出gdb，简写q

  （gdb）break+num：在第num行设置断点，简写b

  （gdb）info breakpoints：查看当前设置的所有断点

  （gdb）delete breakpoints num：删除第num个断点，简写d

  （gdb）display：追踪查看具体变量值

  （gdb）undisplay：取消追踪观察变量

  （gdb）watch：被设置观察点的变量发生修改时，打印显示

  （gdb）i watch：显示观察点

  （gdb）enable breakpoints：启用断点

  （gdb）disable breakpoints：禁用断点

  （gdb）x：查看内存x/20xw 显示20个单元，16进制，4字节每单元

  （gdb）run argv[1] argv[2]：调试时命令行传参

  （gdb）set follow-fork-mode child#Makefile项目管理：选择跟踪父子进程（fork()）

  core文件：先用$ ulimit -c 1024 开启core，当程序出错会自动生成core文件。调试时 gdb a.out core

  ctrl+c：退出输入

  ```

+ gdb的examine命令：

  ```text
  x/<n/f/u>  <addr>

  n:是正整数，表示需要显示的内存单元的个数，即从当前地址向后显示n个内存单元的内容，
  一个内存单元的大小由第三个参数u定义。

   f:表示addr指向的内存内容的输出格式，s对应输出字符串，此处需特别注意输出整型数据的格式：
    x 按十六进制格式显示变量；
    d 按十进制格式显示变量；
    u 按十进制格式显示无符号整型；
    o 按八进制格式显示变量；
    t 按二进制格式显示变量；
    a 按十六进制格式显示变量；
    c 按字符格式显示变量；
    f 按浮点数格式显示变量。

  u:就是指以多少个字节作为一个内存单元-unit,默认为4。u还可以用被一些字符表示:
    如b=1 byte, h=2 bytes,w=4 bytes,g=8 bytes。

  <addr>:表示内存地址。

  ```

##### Tip：objdump反汇编

```shell
objdump -d xxx
将代码段反汇编
```

[可参考这篇文章](https://blog.csdn.net/wwchao2012/article/details/79980514)

#### 数据传送

+ movl 32位 (4字节)
+ movw 16位
+ movb 8位

#### 寻址方式

+ 立即数寻址
  
  ```assambly
  movl $1,%eax
  
  将1传给%eax
  ```

+ 寄存器寻址
  
  ```assembly
  movl %ebx,%eax

  将%ebx的内容传给%eax
  ```

+ 绝对寻址
  
  ```assembly
  movl 0x08048054,%eax`

  以地址0x08048054访问内存，将对应内容传给%eax
  ```

+ 间接寻址
  
  ```assembly
  movl (%ebx),%eax
  
  以%ebx的内容作为地址访问内存，将内存对应内容传给%eax
  ```

+ 基址偏移量寻址
  
  ```assembly
  0x8(%ebx),%eax

  %ebx的内容+8作为地址
  ```

+ 变址寻址
  
  ```assembly
  (%ebx,%edx),%eax
  
  %ebx、%edx内容相加作为地址
  ```

+ 变址基址寻址
  
  ```assembly
  movl 0x8(%ebx,%edx),%eax
  
  %ebx、%edx内容相加再+8作为地址
  ```

+ 比例变址寻址
  
  ```assembly
  (%ebx,%ecx,0x2),%eax
  
  %ecx、0x2相乘再与%ebx相加作为地址
  ```

+ 比例变址基址寻址
  
  ```assembly
  movl 0x8(%ebx,%ecx,0x2),%eax
  
  %ecx、0x2相乘再与%ebx相加，再加8作为地址
  ```

+ 总结
  
  ```assembly
  D(rb, ri, S) 
  
  mem[Reg[rb]+Reg[ri]*S+D]
  ```

#### lea指令

lea：Load Effective Address

可以用来将一个内存地址直接赋给目的操作数

#### 栈

先进后出；

向“下”（低地址方向）增长；

栈顶指针保存在%esp中 指示最新的数据；

P115
