---
title: "19.Engine-字符串"
categories: [ "快去学习" ]
tags: [ "C++" ]
draft: false
slug: "5"
date: "2020-08-22 22:58:00"
---

## 【问题描述】
谷歌、百度等搜索引擎已经成为了互连网中不可或缺的一部分。在本题中，你的任务也是设计一个搜索论文的搜索引擎，当然，本题的要求比起实际的需求要少了许多。

本题的输入将首先给出一系列的论文，对于每篇论文首先给出标题，然后给出它被引用的次数。然后会有一系列的搜索询问，询问标题中包含特定关键词的论文有哪些。

每一个询问可能包含多个关键词，你需要找出标题包含所有关键词的论文。“包含”必须是标题中有一个词正好是给定的关键词，不区分大小写。

对每个询问，都按被引用的次数从多到少输出满足条件的论文的标题。如果有被引用的次数相同的论文，则按照论文在输入中的顺序排列，先给出的论文排在前面。

<!-- more -->

## 【输入形式】
输入包含多组数据。

每组数据首先有一行包含一个整数N(1<=N<=1000)，表示论文的数目，N=0表示输入结束。每组论文的信息第一行是论文的标题，由字母（大小写均可）和空格组成，不超过10个词，每个词不超过20个字符，标题总共不超过250个字符。第二行是一个整数K(0<=K&lt;=108)，表示它被引用的次数。在论文信息结束以后，有一行包含一个整数M(1<=M<=100)，表示询问的数目。接下来有M行，每行是一个询问，由L(1<=L<=10)个空格分开的词构成，每个词不超过20个字符。

## 【输出形式】
对每个询问，按照题目给定的顺序输出满足条件的论文的标题；如果没有满足条件的论文，就不输出。在每组询问的输出之后输出一行“***”，在每组数据的输出之后输出一行“---”。
## 【测试样例】
### 【样例输入1】

```cpp
6
Finding the Shortest Path
120
Finding the k Shortest Path
80
Find Augmenting Path in General Graph
80
Matching in Bipartite Graph
200
Finding kth Shortest Path
50
Graph Theory and its Applications
40
6
shortest path
k shortest path
graph
path
find
application
0
```

### 【样例输出1】

```cpp
Finding the Shortest Path
Finding the k Shortest Path
Finding kth Shortest Path
***
Finding the k Shortest Path
***
Matching in Bipartite Graph
Find Augmenting Path in General Graph
Graph Theory and its Applications
***
Finding the Shortest Path
Finding the k Shortest Path
Find Augmenting Path in General Graph
Finding kth Shortest Path
***
Find Augmenting Path in General Graph
***
***
---
```

### 【样例输入2】

```cpp
1
Finding the Shortest Path
120
2
Path
Pat
0
```

### 【样例输出2】

```cpp
Finding the Shortest Path
***
***
---
```
## 【思路与做法】
+ 需要注意的是查询的时候要把输入的关键词中的词语分割开一个一个查询，而不是作为一个整体，例如：输入的是shortest path，应该分别查找shortest和path，某个题目里面两者都存在则输出该题目；
+ 将每个论文题目的字母全部转成小写另外存储，将要查询的关键词也转成小写再查找；
+ 提交代码（10/10分，C++）：

```cpp
//19.Engine-字符串
#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
#include <cstdio>

using namespace std;

struct article
{
    string title;
    string title_l; //转小写后的标题
    int times_ref;  //被引用次数
    article(string t, string tl, int num)
    {
        this->title = t;
        this->title_l = tl;
        this->times_ref = num;
    }
};

bool cmp(const article &a, const article &b);           //按被引用次数进行排序
string string2lstring(string str);                      //大写转小写
void inquire(vector<string> obj, vector<article> arts); //查询
vector<string> split(string str);                       //将str中的词分割开

int main()
{
    int n, n_search, times; //论文数目、查询次数、被引用次数
    vector<article> arts;   //所有论文
    vector<string> words;
    string str, str_l; //标题、转小写的标题

    while (cin >> n && n > 0) //论文数目
    {
        arts.clear(); //arts清空
        for (int i = 0; i < n; i++)
        {
            getchar();
            getline(cin, str);                          //论文题目
            cin >> times;                               //被引用次数
            str_l = string2lstring(str);                //题目转小写
            arts.push_back(article(str, str_l, times)); //存入arts
        }
        sort(arts.begin(), arts.end(), cmp); //排序

        cin >> n_search; //查询次数
        getchar();
        for (int i = 0; i < n_search; i++)
        {
            words.clear();               //words清空
            getline(cin, str);           //查询的关键词
            str_l = string2lstring(str); //关键词转小写
            words = split(str_l);        //关键词存入words
            inquire(words, arts);        //查询
        }
        cout << "---" << endl;
    }
    return 0;
}

bool cmp(const article &a, const article &b) //按被引用次数进行排序
{
    return a.times_ref > b.times_ref;
}

string string2lstring(string str) //大写转小写
{
    int len = str.length();
    for (int i = 0; i < len; i++)
    {
        if (str[i] >= 'A' && str[i] <= 'Z')
        {
            str[i] += 32;
        }
    }
    return str;
}

void inquire(vector<string> obj, vector<article> arts) //查询
{
    int num_words = obj.size();       //输入了几个词
    int num_words_found;              //查找到了几个词
    int len_o;                        //关键词的长度
    vector<article>::iterator it;     //迭代器it，指向文章
    vector<string>::iterator theWord; //迭代器theWord指向某一关键词
    string::size_type findWord;

    for (it = arts.begin(); it != arts.end(); it++)
    {
        num_words_found = 0; //查找到的词数初始化
        for (theWord = obj.begin(); theWord != obj.end(); theWord++)
        {
            len_o = theWord->length();
            findWord = it->title_l.find(*theWord); //在标题中寻找关键词
            if (findWord != string::npos)          //能找到词
            {
                if (findWord == 0 && it->title_l[findWord + len_o] == ' ') //关键词在开头，关键词后对应空格
                {
                    num_words_found += 1;
                }
                else if (it->title_l[findWord - 1] == ' ' && (it->title_l[findWord + len_o] == ' ' || it->title_l[findWord + len_o] == '\0'))
                {
                    //关键词前对应空格，后对应空格或结尾
                    num_words_found += 1;
                }
            }
        }
        if (num_words_found == num_words) //输入的词全部找到
        {
            cout << it->title << endl;
        }
    }
    cout << "***" << endl;
}

vector<string> split(string str) //将str中的词分割开
{
    vector<string> words_s; //分割好的词
    unsigned head_w = 0;    //词的开头位置

    for (unsigned i = 0; i < str.length(); i++)
    {
        if (str[i] == ' ') //当前位置是空格
        {
            words_s.push_back(str.substr(head_w, i - head_w)); //从head_w到i之前的字符组成一个词，substr(起始位置,截取长度)
            head_w = i + 1;                                    //开头位置变为i+1
        }
    }
    words_s.push_back(str.substr(head_w)); //当前head_w为最后一个空格位置+1（没有出现空格则为0），从该位置到末尾组成一个词
    return words_s;
}
```
