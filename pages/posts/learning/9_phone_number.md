---
title: "9.电话号码"
categories: [ "快去学习" ]
tags: [ "C++" ]
draft: false
slug: "11"
date: "2020-08-25 20:55:00"
---

>个人思路仅供参考，如有不足欢迎交流。

## 【问题描述】

Vasya有几本电话簿，记录了他的朋友们的电话号码，每一个朋友都可以有一或几个电话号码。

Vasya决定整理关于朋友电话号码的信息。给定n个字符串，来自于Vasya的电话簿中的条目。每一条都以朋友的姓名开头，然后跟着当前条目中的电话号码个数，然后是本人的电话号码。有可能几个相同的电话被记录在同一个记录中。

Vasya还认为，如果电话号码a是电话号码b的后缀（也就是说，号码b以a结尾），这两个号码被当作同一个电话号码，那么a被认为是无城市代码，它不应该被考虑。

输出整理后Vasya朋友的电话号码信息。有可能两个不同的人有相同的号码。如果一个人有两个电话号码x和y，x是y的后缀（即y以x结尾），则不输出x。 

如果Vasya的电话簿中的某些朋友记录了几次，那么只需要记录一次。 

<!-- more -->

## 【输入形式】

输入第一行一个整数n(1<=n<=20)，Vasya的电话簿上的条目数。

以下n行后面是描述中的格式记录。 朋友的姓名中不包含空字符，长度不超过10位，由小写英文字母组成。电话号码个数在1~10之间。每个电话号码的长度范围在1~10之间，可以包含前导0。

## 【输出形式】

输出Vasya的朋友的电话号码的有序信息。首先输出电话簿中的朋友数目m。

接下来的m行，包含以格式“姓名 电话号码个数 电话号码1 ... 电话号码k"的条目，号码间以空格分隔。每个记录包含当前朋友的所有电话号码。

每个条目输出按照姓名字母序进行排序，电话号码按照从小到大的顺序排列（注意电话号码："1"<"01"、"12"<"012"，依此类推）

## 【样例输入】

```cpp
4
ivan 3 123 123 456
ivan 2 456 456
ivan 8 789 3 23 6 56 9 89 2
dasha 2 23 789
```

## 【样例输出】

```cpp
2
dasha 2 23 789 
ivan 4 2 123 456 789
```

## 【提交代码】
(10/10分，C++)

```cpp
//9.电话号码
#include <iostream>
#include <algorithm>
#include <string>
#include <vector>
#include <map>
#include <set>

using namespace std;

bool cmp(const string &a, const string &b)
{
    if (a.length() == b.length()) //a、b长度相同则按号码大小顺序
    {
        return a < b;
    }
    return a.length() < b.length(); //优先按照号码长度排序
}

int main()
{
    int n, num;                       //条目数、条目中号码数量
    string name, phNumber;            //条目中朋友的名字、号码
    map<string, set<string> > phBook; //电话簿，set<string>后面没有空格的话在CG系统上会编译错误，36行同理，但是在VS Code、Dev C++上没有空格也不会出错
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> name >> num;
        for (int j = 0; j < num; j++)
        {
            cin >> phNumber;
            phBook[name].insert(phNumber);
        }
    }
    cout << phBook.size() << endl; //人数
    map<string, set<string> >::iterator it;
    for (it = phBook.begin(); it != phBook.end(); it++)
    {
        //map按key值升序排列，也就是说循环的顺序就是姓名字母序
        vector<string> phB_temp; //保存挑选出的号码
        set<string>::iterator its, itt;
        string numberA, numberB;
        for (its = it->second.begin(); its != it->second.end(); its++)
        {
            bool flag = false; //numberA是不是numberB的后缀
            numberA = *its;
            for (itt = it->second.begin(); itt != it->second.end(); itt++)
            {
                numberB = *itt;
                if (numberA == numberB)
                {
                    continue;
                }
                else if (numberB.length() > numberA.length() && numberB.substr(numberB.length() - numberA.length(), numberA.length()) == numberA)
                {
                    flag = true; //numberA是numberB的后缀
                    break;
                }
            }
            if (flag == false)
            {
                phB_temp.push_back(numberA); //A不是其他号码的后缀就存进去
            }
        }
        sort(phB_temp.begin(), phB_temp.end(), cmp);        //排序
        cout << it->first << ' ' << phB_temp.size() << ' '; //名字、号码数
        for (unsigned i = 0; i < phB_temp.size(); i++)
        {
            cout << phB_temp[i] << ' '; //输出号码
        }
        cout << endl;
    }
    return 0;
}
```

