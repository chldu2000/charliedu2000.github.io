---
title: "3.程序的机器级表示"
categories: [ "快去学习" ]
tags: [  ]
draft: false
slug: "60"
date: "2021-04-26 20:29:35"
---

# 程序的机器级表示

2020-2021-2 计算机系统

## 控制

### 处理器状态

+ 当前运行运行程序的相关信息：
  + 临时数据（%eax等通用寄存器）；
  + 运行栈帧的地址（%ebp，%esp）；
  + 即将要执行的指令地址（%eip……）；
  + 标志位（CF、ZF、SF、OF）。

### 条件码

+ 每个条件码占一个bit：
  + CF：最高位产生进位、无符号操作数的溢出；
  + SF：符号标志，操作结果为负数（有符号数a - b < 0）；
  + ZF：零标志；
  + OF：有符号数溢出。

通过条件码可以确定状态。

### 跳转指令

| jx      | 条件         | 描述                 |
| :------ | ------------ | -------------------- |
| jmp     | 1            | 无条件跳转           |
| je/jz   | ZF           | 相等/结果为0         |
| jne/jnz | ~ZF          | 不相等/结果非零      |
| js      | SF           | 负数                 |
| jns     | ~SF          | 非负数               |
| jg      | ~(SF^OF)&~ZF | 大于（有符号数）     |
| jge     | ~(SF^OF)     | 大于等于（有符号数） |
| jl      | (SF^OF)      | 小于（有符号数）     |
| jle     | ~(SF^OF)\|ZF | 小于等于（有符号数） |
| ja      | ~CF&~ZF      | 大于（无符号数）     |
| jb      | CF           | 小于（无符号数）     |

### 条件跳转

```assembly
cmp	a, b
jx	xxx
```

C语言的goto与之类似。

### 分支跳转

### 条件传送

先计算一个条件操作的两个结果，然后根据条件选择某一个。

#### 与条件跳转比较

C Code：

```c
int comvdiff(int x, int y)
{
  int tval = y-x;
  int rval = x-y;
  int test = x < y;
  if (test) rval = tval;
  result rval;
}
```

条件传送：

```assembly
comvdiff:
movl	8(%ebp), %ecx
movl	12(%ebp), %edx
movl	%edx, %ebx
subl	%ecx, %ebx
movl	%ecx, %eax
subl	%edx, %eax
cmpl	%edx, %ecx
cmovl	%ebx, %eax
```

条件跳转：

```assembly
absdiff:
pushl	%ebp
movl	%esp, %ebp
movl	8(%ebp), %edx
movl	12(%ebp), %eax
cmpl	%eax, %edx
jle 	.L6
subl	%eax, %edx
movl	%edx, %eax
jmp 	.L7
.L6:
subl	%edx, %eax
.L7:
popl	%ebp
ret
```

避免了跳转指令，CPU无需做分支预测，避免预测错误的代价；流水线效率更高。（优化编译）

#### 注意

1. 计算代价
   + 两个计算过程都要执行；
   + 一般只有当两个计算过程都比较简单的时候才能发挥优势；
   + `val = Test(x)? Hard1(x) : Hard2(x);`
2. 非法操作
   + 在p为0的时候，仍然会去引用 *p，从而产生非法操作；
   + `val = p? *p : 0;`
3. 副作用
   + 两个表达式都进行了计算；
   + 产生了意料之外的赋值过程。
   + `val= x > 0? x*=7 : x+=3;`

### do-while循环

例：

```c
int pcount_do(unsigned x) {
  int result = 0;
  do {
    result += x & 0x1;
    x >>= 1;
  } while (x);
  return result;
}
```

```assembly
movl	$0,%ecx		# result = 0
.L2:				# loop
movl	%edx,%eax
andl	$1,%eax		# t = x & 1
addl	%eax,%ecx	# result += t
shrl	%edx		# x >> 1
jne		.L2			# if !0, goto loop
```

### while循环

while和do-while：

+ 都是条件测试失败退出循环
+ do-while循环至少执行一次循环体

### for循环

### switch语句与跳转表

switch-case

当case数大于4且case间间隔小于13时会使用跳转表，否则使用cmp-jmp式的跳转。

跳转表例：

```assembly
.section .rodata
.align 4
.L4:
.long .L8
.long .L3
.long .L5
.long .L9
.long .L8
.long .L7
.long .L7
```

该跳转表基址为.L4，在汇编代码中跳转的指令是这样的：`jmp *.L4(,%eax,4)`，每个地址占4个字节。

## 过程

### 栈帧

> 机器用栈来**传递过程参数、存储返回信息、保存寄存器用于以后恢复，以及本地存储**。而为单个过程分配的那部分栈称为栈帧（stack frame）。
> 
> 每一个函数或过程在执行时，都需要在内存中分配一个空间来保存运行时数据，这个空间由于是采用栈的方式进行操作，所以也称为栈帧。

+ 当前函数或过程的栈顶地址保存在 %esp 中，栈底地址保存在 %ebp 中；
+ 栈是向“下”增长的，或者说是向地址 0x0 处增加的，因此 %esp 中的值小于或等于 %ebp
  中的值；
+ 栈帧是内存中一段连续的内存空间；
+ 被调用者的栈帧紧挨着调用者的栈帧；
+ 待补充。

## 数据

### 数组

T A[L]

+ type L，length L；
+ 在内存中连续分配 L*sizeof(T) 个字节；
+ 标识符 A可用于表示数组的首地址，也可以通过 Type T*转换成数组首地址。

连续声明的数组一般也是连续分配。

结构、联合



