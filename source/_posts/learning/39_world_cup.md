---
title: "39.世界杯来了"
categories: [ "快去学习" ]
tags: [ "C++" ]
draft: false
slug: "31"
date: "2020-08-31 16:17:07"
---

>个人思路仅供参考，如有不足欢迎指出。
>更正：代码156、167行“+=”改为“-=”，另外比赛场次可以用n*(n-1)/2而不用C(n,2)，题目有提到……
## 【问题描述】
 2018年俄罗斯世界杯结束了，法国获得冠军，全世界球迷度过了一个非常愉快的夏天。作为中国球迷，不能总是看别人踢球，这不福利来了，根据FIFA（国际足联）及全体成员协会的一致决定，2118年世界杯将在中国举办，作为东道主，中国队将无需参加预选赛而直接参加决赛阶段的比赛。

   比赛规则如下：

总共n（n为偶数）个球队参加比赛

按照分组赛积分排名，前n/2的球队进入淘汰赛

积分排名的规则如下：球队获胜得3分，平局得1分，失利得0分，按照积分递减、净胜球递减以及进球数递减方式排名

编写一个程序，根据给出的参赛队伍名单和所有比赛的结果，找出成功进入淘汰赛阶段的球队名单。

## 【输入形式】

   

第一行输入包含唯一整数n(1<=n<=50)，参加世界杯决赛的球队数量。接下来的n行是各球队的名字，为长度不超过30个字符的英文字符。接下来的n*(n-1)/2行，每行格式name1-name2 num1:num2（0<=num1, num2<=100），表示对阵球队及比分. 

## 【输出形式】

   

输入n/2行，表示进入淘汰赛阶段的球队，按照字典序进行排列，每个球队名字占一行。

## 【样例输入】

```cpp
4
A
B
C
D
A-B 1:1
A-C 2:2
A-D 1:0
B-C 1:0
B-D 0:3
C-D 0:3
```

## 【样例输出】

```cpp
A
D
```
## 【思路和做法】
+ 主要是使用结构体存储各个球队的信息，用自定义函数来实现比赛信息的统计；
+ 提交代码如下（10/10分，C++）：


```cpp
 //39.世界杯来了
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>

using namespace std;

struct team
{
    string t_name; //队伍名
    int score_sum; //积分
    int goals;     //进球数
    int goals_n;   //净胜球数
    team(string name)
    {
        this->t_name = name;
        this->score_sum = 0;
        this->goals = 0;
        this->goals_n = 0;
    }
};

int n;        //有几支队伍
int num_cmpt; //一共几场比赛
string name;  //队伍名称

vector<team> teams;           //参赛队伍
vector<team>::iterator it;    //迭代器it
vector<string> teams_vic;     //进入淘汰赛的球队
vector<string>::iterator t_v; //迭代器t_v
vector<string> teams_cmpt;    //某场比赛的两支队伍
string cmpt;                  //某场比赛的两支队伍
int goal_1, goal_2;           //两支队伍得分
char chr;                     //占位

bool cmp(const team &a, const team &b); //对球队进行排序
vector<string> theTeams(string cmpt);   //参加比赛的两支队伍分别是哪两支
int factorial(int num);                 //计算num的阶乘
vector<team> competition(vector<team> teams, vector<string> teams_cmpt, int goal_1, int goal_2);
//competition进行比赛

int main()
{
    cin >> n;
    num_cmpt = factorial(n) / (factorial(n - 2) * 2); //每两支队伍比一场，场数为 C(n,2)
    for (int i = 0; i < n; i++)                       //输入各个队伍名称
    {
        cin >> name;
        teams.push_back(team(name));
    }
    for (int i = 0; i < num_cmpt; i++)
    {
        cin >> cmpt >> goal_1 >> chr >> goal_2;                 //本场比赛详情
        teams_cmpt = theTeams(cmpt);                            //获取本场比赛的两支队伍
        teams = competition(teams, teams_cmpt, goal_1, goal_2); //比分变动
    }
    sort(teams.begin(), teams.end(), cmp); //对所有队伍排序
    it = teams.begin();
    for (int i = 0; i < n / 2; i++)
    {
        teams_vic.push_back(it->t_name); //获取进入淘汰赛的队伍
        it++;
    }
    sort(teams_vic.begin(), teams_vic.end()); //按字典序排序
    for (t_v = teams_vic.begin(); t_v != teams_vic.end(); t_v++)
    {
        cout << *t_v << endl; //输出结果
    }
    return 0;
}

bool cmp(const team &a, const team &b) //对球队进行排序
{
    if (a.score_sum == b.score_sum)
    {
        if (a.goals_n == b.goals_n)
        {
            return a.goals > b.goals;
        }
        else
        {
            return a.goals_n > b.goals_n;
        }
    }
    else
    {
        return a.score_sum > b.score_sum;
    }
}

vector<string> theTeams(string cmpt) //参加比赛的两支队伍分别是哪两支
{
    vector<string> res;
    string::size_type _find;
    string team1 = "", team2 = "";
    unsigned len = cmpt.length(); //用unsigned消除警告信息
    _find = cmpt.find('-');
    for (unsigned i = 0; i < _find; i++)
    {
        team1 += cmpt[i];
    }
    for (unsigned i = _find + 1; i < len; i++)
    {
        team2 += cmpt[i];
    }
    res.push_back(team1);
    res.push_back(team2);
    return res;
}

int factorial(int num) //计算num的阶乘
{
    if (num == 0)
    {
        return 1;
    }
    else
    {
        return num * factorial(num - 1);
    }
}

vector<team> competition(vector<team> teams, vector<string> teams_cmpt, int goal_1, int goal_2)
{
    vector<team>::iterator temp;
    if (goal_1 == goal_2) //两队进球数相同，都得1分
    {
        for (temp = teams.begin(); temp != teams.end(); temp++)
        {
            if (temp->t_name == teams_cmpt[0]) //第一队
            {
                temp->score_sum += 1;
                temp->goals += goal_1;
            }
            else if (temp->t_name == teams_cmpt[1]) //第二队
            {
                temp->score_sum += 1;
                temp->goals += goal_2;
            }
        }
    }
    else if (goal_1 > goal_2) //第一队获胜，第一队得三分
    {
        for (temp = teams.begin(); temp != teams.end(); temp++)
        {
            if (temp->t_name == teams_cmpt[0]) //第一队
            {
                temp->score_sum += 3;
                temp->goals += goal_1;
                temp->goals_n += (goal_1 - goal_2); //净胜球数
            }
            else if (temp->t_name == teams_cmpt[1]) //第二队
            {
                temp->goals += goal_2;
                temp->goals_n -= (goal_1 - goal_2);
            }
        }
    }
    else //第二队获胜，第二队得三分
    {
        for (temp = teams.begin(); temp != teams.end(); temp++)
        {
            if (temp->t_name == teams_cmpt[0]) //第一队
            {
                temp->goals += goal_1;
                temp->goals_n -= (goal_2 - goal_1);
            }
            else if (temp->t_name == teams_cmpt[1]) //第二队
            {
                temp->score_sum += 3;
                temp->goals += goal_2;
                temp->goals_n += (goal_2 - goal_1); //净胜球数
            }
        }
    }
    return teams;
}
```
