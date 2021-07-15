---
title: "CCF201609-2 火车购票"
categories: [ "快去学习" ]
tags: [ "C++" ]
draft: false
slug: "32"
date: "2020-09-03 15:40:00"
---

## 问题描述

　　请实现一个铁路购票系统的简单座位分配算法，来处理一节车厢的座位分配。
　　假设一节车厢有20排、每一排5个座位。为方便起见，我们用1到100来给所有的座位编号，第一排是1到5号，第二排是6到10号，依次类推，第20排是96到100号。
　　购票时，一个人可能购一张或多张票，最多不超过5张。如果这几张票可以安排在同一排编号相邻的座位，则应该安排在编号最小的相邻座位。否则应该安排在编号最小的几个空座位中（不考虑是否相邻）。
　　假设初始时车票全部未被购买，现在给了一些购票指令，请你处理这些指令。

<!-- more -->

## 输入格式

　　输入的第一行包含一个整数n，表示购票指令的数量。
　　第二行包含n个整数，每个整数p在1到5之间，表示要购入的票数，相邻的两个数之间使用一个空格分隔。
## 输出格式

　　输出n行，每行对应一条指令的处理结果。
　　对于购票指令p，输出p张车票的编号，按从小到大排序。
## 样例输入
```cpp
4
2 5 4 2
```
## 样例输出
```cpp
1 2
6 7 8 9 10
11 12 13 14
3 4
```
## 样例说明

　　1) 购2张票，得到座位1、2。
　　2) 购5张票，得到座位6至10。
　　3) 购4张票，得到座位11至14。
　　4) 购2张票，得到座位3、4。
## 评测用例规模与约定

　　对于所有评测用例，1 ≤ n ≤ 100，所有购票数量之和不超过100。
## 提交代码

这个题好像对时间什么的要求不严（其实我也还不怎么懂这些，苦笑），像下面这样循环是可以的。

```cpp
//201609-2火车购票
#include <iostream>

using namespace std;

struct row
{
	int numRemaining = 5; //这一排剩余空闲座位数
	int minNumRemain = 1; //从第几个座位开始是空闲的
};
row rows[20]; //一共20排
int main()
{
	int n;
	cin >> n;
	for (int i = 0; i < n; i++)
	{
		int num;
		cin >> num;
		bool flag = false; //能否在一排之内找到连续的座位
		for (int j = 0; j < 20; j++)
		{
			if (rows[j].numRemaining >= num) //这一排剩余座位足够
			{
				for (int k = 0; k < num; k++)
				{
					cout << j * 5 + rows[j].minNumRemain + k << ' '; //依次输出
				}
				cout << endl;
				rows[j].minNumRemain += num; //更新本排空闲座位起始位置
				rows[j].numRemaining -= num; //空闲座位数量减少
				flag = true;				 //能在一排之内找到连续的座位
				break;
			}
		}
		if (flag == false) //如果不能在一排之内找到连续的座位
		{
			for (int j = 0; j < 20; j++)
			{
				if (rows[j].numRemaining > 0)
				{
					while (num > 0 && rows[j].numRemaining > 0) //当要买的座位还没有全部买到或本排座位有剩余
					{
						cout << j * 5 + rows[j].minNumRemain << ' '; //输出座位号
						num -= 1;									 //买到一个
						rows[j].numRemaining -= 1;					 //本排剩余座位-1
						rows[j].minNumRemain += 1;					 //更新本排空闲座位起始位置
					}
				}
				if (num == 0) //要买的都买到了
				{
					cout << endl;
					break;
				}
			}
		}
	}
	return 0;
}

```
