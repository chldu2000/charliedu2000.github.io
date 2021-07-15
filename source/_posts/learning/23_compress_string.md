---
title: "23.字符串压缩"
categories: [ "快去学习" ]
tags: [ "C++" ]
draft: false
slug: "10"
date: "2020-08-25 14:23:33"
---

>个人思路仅供参考，如有不足欢迎交流。

## 【问题描述】

给定一个由n个小写字母组成的字符串s，需要使用最少数量的钱币来压缩它。

   压缩该字符串，必须将s表示为多个相互连接的非空字符串: s=t1t2...tk，其中第 i 个字符串按照下列两种方法之一编码：

如果|ti|=1，也就是说 ti为单个字符组成的字符串，编码时需要支付a个钱币

如果ti是t1t2...ti-1的子串，编码时需要支付b个钱币

 你的任务是计算压缩给定的字符串需要花费的最小钱币数。

<!-- more -->

## 【输入形式】

 输入的第一行包含3个用空格分隔的正整数：n、a和b(1≤n、a、b≤5000)，第二行为一个长度为n的小写字符串。

## 【输出形式】

  输出一个整数，表示你需要为压缩s所需要支付的最小钱币数。

## 【样例】
### 【样例输入1】

```cpp
3 3 1
aba
```

### 【样例输出1】

```cpp
7
```

### 【样例输入2】

```cpp
4 1 1
abcd
```

### 【样例输出2】

```cpp
4
```

### 【样例输入3】

```cpp
4 10 1
aaaa
```

### 【样例输出3】

```cpp
12
```

## 【提交代码】

（10/10分，C++）

```cpp
//23.字符串压缩
#include <iostream>
#include <string>

using namespace std;

int main()
{
    int n, a, b;//字符串长度、a、b
    string str, sa = "", sb = "";//字符串、t(1)t(2)……t(i-1)、t(i)
    int sumMin = 0;//所用最少钱币数
    cin >> n >> a >> b;
    cin >> str;

    sumMin += a;//第一个字母一定要用a个钱币
    for (int k = 1; k < n; k++)
    {
        bool flag = false;//t(i)是否能作为t(1)t(2)……t(i-1)的子串
        sa = str.substr(0, k);//获取sa：t(1)t(2)……t(i-1)
        for (int j = 1; j < n; j++)
        {
            sb = str.substr(k, n - j);//sb：t(i)从最长的可能情况开始
            if (sa.find(sb) != string::npos)//sb是sa的子串
            {
                int len = sb.length();
                if (len >= b / a)//保证将sb作为一个字符串所用钱币比拆成单个所用钱币少
                {
                    sumMin += b;
                    flag = true;
                    k += (n - j - 1);//t(1)t(2)……t(i-1)的长度加上t(i)的长度，k++之后还会+1，所以在这里提前-1
                    break;
                }
            }
        }
        if (flag == false)
        {
            sumMin += a;
        }
    }
    cout << sumMin << endl;
    return 0;
}
```
