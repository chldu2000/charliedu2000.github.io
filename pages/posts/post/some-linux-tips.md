---
title: some-linux-tips
tags:
  - Linux
  - Unix
categories:
  - 奇怪的知识增加了
date: 2022-08-23 11:09:33
---

这里放一些有关 Linux 的东西，有一些日常使用的感受，还有一些通过选修课等方式学到的、或多或少会用到的技巧。

*正在施工中，可以查看大体框架的准备情况。*

<!-- more -->

## 各发行版之间最浅显的区别

我自己用过一段时间的 Arch Linux，最近因为搞比赛要用到 ROS，顺手也用上了 Ubuntu。除此之外，我也因为课程、个人兴趣等原因多多少少接触过 OpenSUSE 和 CentOS 等发行版。

要说各个发行版之间最明显的区别，我觉得应该是它们的包管理器。使用 Linux 发行版免不了用包管理器安装、更新软件，这方面的体验很可能会影响用户对发行版的第一印象。包管理带来的问题，比如依赖管理、版本冲突和更新发行方式等会直接影响整个 OS 环境的稳定性（再比方说发布式版本更新、滚动更新乃至像 `Nix` 这样的原子更新方式之间的区别对设置开发环境的体验影响还是很大的）。

与包管理联系紧密的因素之一是发行版的软件源。很多发行版都会标榜自己拥有多少多少软件包，如果官方软件源的覆盖范围足够广（哪怕官方软件源没有但是第三方提供支持也好），那这个发行版的推广难度就会小很多。很多第三方软件都只有 deb 和 rpm 包，虽然重新打包应该不算很难，但是对于更“初级”的用户（比如大多数非计算机行业的用户）来说，某个发行版没有自己常用的第三方软件（比如说 QQ 和微信😓️）就足以构成他们拒绝这个发行版的理由了。

## 之前上过的 Unix 选修课

*虽然我当时选这门课的时候课程名称里是 Unix，老师也发了以前用的 Unix 教材（基于 IBM AIX），但是实际上课的时候就直接按 Linux 的内容来讲了，当时的实验统一用了 CentOS。*

### 从文件开始

日常使用 Linux 肯定免不了跟它的文件系统打交道，其中最显而易见的几个要素大概就是 `ls` 时看到的那些，像这样：

```shell
❯ ls -l
total 12
-rw-r--r-- 1 chldu chldu  259 Aug 18 00:22 Cargo.toml
-rw-r--r-- 1 chldu chldu 2698 Aug 18 00:22 README.md
drwxr-xr-x 2 chldu chldu 4096 Aug 18 00:22 src
```

这里加上了 `-l` 来查看文件的详细信息，其它选项像常用的 `-a` 等就不赘述了，用 `--help` 就可以看到详细的解释。

### 我是谁？我在哪？

*如 pwd 等*

*which 和 whereis 等*

### 积木 OR 砖瓦

*“玩具”性质和“工具”性质*

*其他常用命令和技巧*

*grep* -> *管道*……

*shell 脚本相关*

## 一些奇怪的小知识

关于显卡驱动：其实现在在 Linux 下安装显卡驱动也算不上一件太难的事，需要注意的就是如果系统的内核是 `zen` 等定制内核，nvidia 显卡就要用 `dkms` 驱动。

## 如果是 WSL……

WSL2 甚至不用另外装显卡驱动，只要 Windows 的驱动支持 WSL，装上 X 就可以直接用 Linux 下的 GUI 应用。（Wow!）

## 使用之后的感受

*一些个人的感受，优点和缺点*