---
title: "56.相等的多项式"
categories: [ "快去学习" ]
tags: [ "C++" ]
draft: false
slug: "19"
date: "2020-08-27 14:05:00"
---

> 个人思路仅供参考，如有不足欢迎交流。

## 问题描述

小明现在在学习多项式的展开：就是把一个形如

（x+a1） （x+a2） ... （x+an）

展开成如下形式：

x^n + b1x^(n-1) + b2x^(n-2) + ... + bn-1^x + bn

比如 （x+1）（x+2）=x^2 + 3x + 2

(x+1)^3 = x^3 +3x^2 +3x + 1

小明做了很多练习，但是不知道对错，现在请求你的帮助，判断小明的展开式是否正确。

<!-- more -->

## 输入格式

有多组测试数据。

每组测试数据有三行，第一行是一个正整数N，表示多项式最高指数。N=0表示输入结束，并且不需要处理。

第二行N个整数ai，用空格隔开，i=1，...,N(-100≤ai≤100)

第三行N个整数bi，用空格隔开，i=1，...,N，(-10^9≤bi≤10^9)

40%的测试数据 1 ≤ N < 5；

30%的测试数据 5 ≤ N < 10；

20%的测试数据10 ≤ N < 15；

10%的测试数据 15 ≤N≤ 20；

## 输出格式

　　对于每组测试数据，输出一行一个字符‘Y'如果展开式是正确的，输出‘N’如果展开式错误。

## 样例输入
```cpp
2
1 2
3 2
3
1 1 1
3 3 1
4
0 0 0 1
0 0 0 1
0
```
## 样例输出
```cpp
Y
Y
N
```
## 思路和做法

+ 题目中已经说明了输入的ai、bi的含义，可以直接模拟多项式的乘法；
+ 提交代码如下（10/10分，C++）：

```cpp
//56.相等的多项式
#include <iostream>
#include <vector>
#include <map>

using namespace std;

int main()
{
    int n;                      //多项式最高次数
    vector<int> ai;             //多项式a
    map<int, int> bi, aiExband; //多项式b、多项式a的展开
    //map<次数,对应项的系数>
    while (cin >> n && n != 0)
    {
        int temp;
        ai.clear(), bi.clear(), aiExband.clear();
        for (int i = 0; i < n; i++)
        {
            cin >> temp;
            ai.push_back(temp);
        }
        bi[n] = 1;
        for (int i = n - 1; i >= 0; i--)
        {
            cin >> temp;
            bi[i] = temp;
        }

        //多项式a的展开
        aiExband[0] = ai[0], aiExband[1] = 1;
        for (int i = 2; i <= n; i++)
        {
            for (int j = i; j >= 0; j--)
            {
                if (j != i && j != 0)
                {
                    aiExband[j] = aiExband[j] * ai[i - 1] + aiExband[j - 1];
                }
                else if (j == i) //当前最高次数项的系数一定是1
                {
                    aiExband[j] = 1;
                }
                else //j=0
                {
                    aiExband[j] *= ai[i - 1];
                }
            }
        }
        if (bi == aiExband)
        {
            cout << 'Y' << endl;
        }
        else
        {
            cout << 'N' << endl;
        }
    }
    return 0;
}
```
