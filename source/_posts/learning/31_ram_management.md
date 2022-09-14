---
title: "31.内存管理"
categories: [ "快去学习" ]
tags: [ "C++" ]
draft: false
slug: "9"
date: "2020-08-25 00:08:00"
---

>个人思路仅供参考，如有不足欢迎交流。
## 【问题描述】

离第一个操作系统HNU-OS发布已经没有多少时间了，但它的一些组件还没有完成，内存管理器就是其中之一。根据开发人员的计划，在第一个版本中，内存管理器将非常简单和直观。它将支持三个操作：

<!-- more -->

alloc n —— 分配n个字节内存，返回已分配块的正整数标识符x(x初始值为0，每次分配增长1)

erase x —— 删除标识符x所在的块

defragment —— 整理空余内存碎片，将所有块尽量靠近内存的开始位置，并保持各自的顺序

   在此情况下，内存模型非常简单，它是一个m字节的序列，为了方便起见，从第一个字节到第m字节进行编号。

   第一个操作alloc n有一个参数n，表示被分配的内存块大小。在处理此操作时，内存中将分配n个连续字节的空闲块。 如果这些块的数量超过一个，则优先选择最接近内存开始(即第一个字节)的块。 所有这些字节都被标记为非空闲，内存管理器返回一个32位整数数字令牌，代表该块的标识符。 如果不可能分配这样大小的空闲块，则返回NULL。

   第二个操作erase x以x为参数，表示某个块的标识符。此操作释放系统内存，将此块的字节标记为空闲以供进一步使用。 如果此标识符没有指向先前分配的块(该块尚未被释放)，则返回ILLEGAL_ERASE_ARGUMENT。

   最后一个操作defragment没有任何参数，只会使占用的内存部分更接近内存的开始，而不会更改它们各自的顺序。 

   在当前的实现中，将使用从1开始的连续整数作为标识符。每个成功的alloc操作过程都应该返回接下来的编号。不成功的alloc操作不影响计数。 

   编写内存管理器的实现，为每个alloc命令输出返回的值，为所有失败的erase命令输出ILLEGAL_ERASE_ARGUMENT。 

## 【输入形式】

输入数据的第一行包含两个正整数t和m（1<=t<=500, 1<=m<=105)，其中t表示需要内存管理器来处理的操作个数，m表示有效的内存字节大小。接下来的t行每一行代表一个操作。

## 【输出形式】

  输出有多行，每行或者是alloc操作的结果，或者是失败的erase操作的结果ILLEGAL_ERASE_ARGUMENT。其顺序与输入的操作次序一致。

## 【样例输入】

```cpp
6 10
alloc 5
alloc 3
erase 1
alloc 6
defragment
alloc 6
```
## 【样例输出】

```cpp
1
2
NULL
3
```
## 【提交代码】
（10/10分，C++）

```cpp
// 31.内存管理
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct memory //内存块
{
    int mark;    //标识符
    int length;  //所占长度
    bool usable; //true(1)可用，false(0)不可用
    memory(int mark_t, int len, bool usea)
    {
        this->mark = mark_t;
        this->length = len;
        this->usable = usea;
    }
};

bool cmp(const memory &a, const memory &b)
{
    if (a.usable == b.usable)
    {
        return a.mark < b.mark;
    }
    return a.usable < b.usable; //（已被占用）不可用false（0）<（未被占用）可用true（1）
}

int main()
{
    vector<memory> mms;
    vector<memory>::iterator it;

    string opet;           //具体操作
    int t, m, size_usable; //操作个数、有效内存字节大小、剩余可用内存字节大小
    int number;            //操作后接的数
    int mark = 1;          //标识符
    cin >> t >> m;
    size_usable = m;

    for (int i = 0; i < t; i++)
    {
        cin >> opet;
        if (opet != "defragment") //需要输入数
        {
            cin >> number;
            if (opet == "alloc") //分配number个字节内存
            {
                if (size_usable >= number) //剩余空间足够
                {
                    bool succ = false; //命令是否执行成功（是否有之前被释放的块满足要求）
                    //这个判断方法可能还是不完全正确，但是在系统里已经能得满分……
                    for (it = mms.begin(); it != mms.end(); it++)
                    {
                        if (it->usable == true && it->length >= number) //it可用且it的长度>=number
                        {
                            cout << mark << endl;
                            int temp = it->length;
                            it->mark = mark;                                         //标上标识符
                            it->usable = false;                                      //标为不可用
                            it->length = number;                                     //变更长度
                            mms.insert(it + 1, memory(-1, temp - it->length, true)); //在后面插入空闲块
                            size_usable -= number;                                   //可用内存减少
                            mark += 1;                                               //标识符
                            succ = true;
                            break;
                        }
                    }
                    if (succ == false)
                    {
                        int sum = 0; //不能分配的内存字节数（已被占用或者不够长）
                        for (it = mms.begin(); it != mms.end(); it++)
                        {
                            sum += it->length;
                        }
                        if ((m - sum) >= number) //末尾剩余空闲内存字节数>=number
                        {
                            cout << mark << endl;
                            mms.push_back(memory(mark, number, false)); //标识，长度，不可用
                            size_usable -= number;                      //可用内存减少
                            mark += 1;                                  //标识符+1
                        }
                        else
                        {
                            cout << "NULL" << endl;
                        }
                    }
                }
                else
                {
                    cout << "NULL" << endl;
                }
            }
            else //删除标识符number所在的块
            {
                bool eff = false; //命令是否有效
                for (it = mms.begin(); it != mms.end(); it++)
                {
                    if (it->mark == number) //it的标识符就是操作指定的标识符
                    {
                        size_usable += it->length; //可用内存增加
                        it->usable = true;         //it标为空闲
                        it->mark = -1;             //删去it的标识符
                        eff = true;                //命令有效
                        break;
                    }
                }
                if (eff == false) //若命令无效
                {
                    cout << "ILLEGAL_ERASE_ARGUMENT" << endl;
                }
            }
        }
        else //是defragment，不需要数字
        {
            sort(mms.begin(), mms.end(), cmp);
            for (unsigned j = 0; j < mms.size(); j++)
            {
                if (mms[j].usable == true)
                {
                    it = mms.begin() + j;
                    mms.erase(it);
                }
            }
        }
    }
    return 0;
}
```
