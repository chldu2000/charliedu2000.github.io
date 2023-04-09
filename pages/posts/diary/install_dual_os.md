---
title: "一时兴起给电脑安装双系统"
categories: [ "奇怪的知识增加了" ]
tags: [ "双系统","Linux","Manjaro" ]
draft: false
slug: "51"
date: "2020-11-20 00:16:00"
---

>记事性质，并不是安装攻略哦……
>已经换Arch了（2021.4）

本着闲着没事就爱做些乱七八糟的事情的原则，也是在对Linux的好奇心的驱使下，我在笔记本上折腾了双系统。
不过说来也有些矛盾，虽然我十分想探索Linux这块对我来说还是未知的领域，但是我却害怕把电脑搞坏掉……为了减少翻车的机率，我提前做了很多调查（其实就是在贴吧、知乎等网站上面看文章），发现Manjaro可能装起来比较省心，于是我就下手了。

<!-- more -->

### 安装前的准备
由于一些学习生活上的需要（一些专业软件、游戏什么的……大家都懂）以及我对Linux的陌生，完全脱离Windows显然是不可能的，那么双系统就是一个非常好的选择（虚拟机太卡了，WSL跟我的目标还是有点差距）。C盘空间不够就装在D盘，我从D盘分了100多G给Manjaro，毕竟不算是主力，多少给点就行吧……然后是下载镜像、用Rufus制作U盘启动盘,这一步有几个坑，包括要用旧版软件的才能用DD模式烧录等等……这些做完了之后我就关掉电脑的快速启动（Win 10的设置）和安全启动（要进BIOS），开始安装。

### 安装Manjaro
这个过程我没有留什么图片，所以只能就这样写下来。要操作的地方并不算多，主要是设置语言、时区等等。要注意的地方可能就是分区和显卡驱动，我给swap分了8G，再分出boot和efi，剩下的全丢给了/目录（简单粗暴），显卡驱动方面Manjaro做得挺省心的，装闭源驱动也能直接用。

### 安装各种软件
作为Arch的衍生发行版，Manjaro自然也获得了aur这么一个方便的东西，装好yay以后想要什么软件直接yay一个基本都会有，像VS Code、PyCharm这些基本都可以一键直达，使用体验极其舒爽。另外，网易云音乐、WPS这些软件都有Linux版本，给好评，同时我要再吐槽一下QQ和微信，快点做个正常的Linux版吧……

### 日常使用的感受
用了这么一段时间下来，我对Manjaro的印象还不错，除了开机慢了一点其他都好（应该是因为装在了机械盘里）。Manjaro基本可以满足我日常的需求，写文档、敲代码基本用不到Windows了。使用时可能碰到一些小问题，不过也不是很难解决。每天滚动更新、想要什么东西就去yay或者直接从源代码编译的感觉着实微妙，有点上头。