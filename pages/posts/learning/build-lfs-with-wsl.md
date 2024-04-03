---
layout: post
title: 在 WSL 上构建 LFS
date: 2024-04-04 00:23:38
updated: 2024-04-04 00:23:38
tags:
  - Linux
  - LFS
categories:
  - 快去学习
excerpt_type: html
---

**In progress**

<!-- more -->

## 参考

[Stable LFS](https://www.linuxfromscratch.org/lfs/view/stable/)

[Linux From Scratch (LFS) 编译记录 – Vinfall@Geekademy](https://blog.vinfall.com/posts/2022/09/lfs/)

[适用于 Linux 的 Windows 子系统文档](https://learn.microsoft.com/zh-cn/windows/wsl/)

## 准备

4 核 8G 的硬件应该不是问题吧（笑）。

### 软件依赖

LFS 的软件依赖在[Chapter 2.2](https://www.linuxfromscratch.org/lfs/view/stable/chapter02/hostreqs.html)，可以用文档中提供的脚本快速检查。

我的 WSL 是 [Arch](https://github.com/yuk7/ArchWSL)，我记得装上后没有进行别的操作，安装 `base-devel` 和 `python` 之后就满足要求了。不过别的发行版软件包组名字可能不同，你也可以直接安装脚本提示缺少的包。

```bash
 ./version-check.sh
OK:    Coreutils 9.4    >= 8.1
OK:    Bash      5.2.26 >= 3.2
ERROR: Cannot find ld (Binutils)
ERROR: Cannot find bison (Bison)
ERROR: Cannot find diff (Diffutils)
OK:    Findutils 4.9.0  >= 4.2.31
OK:    Gawk      5.3.0  >= 4.0.1
ERROR: Cannot find gcc (GCC)
ERROR: Cannot find g++ (GCC (C++))
OK:    Grep      3.11   >= 2.5.1a
OK:    Gzip      1.13   >= 1.3.12
ERROR: Cannot find m4 (M4)
ERROR: Cannot find make (Make)
ERROR: Cannot find patch (Patch)
ERROR: Cannot find perl (Perl)
ERROR: Cannot find python3 (Python)
OK:    Sed       4.9    >= 4.1.5
OK:    Tar       1.35   >= 1.22
ERROR: Cannot find texi2any (Texinfo)
OK:    Xz        5.6.0  >= 5.0.0
OK:    Linux Kernel 5.15.146.1 >= 4.19
OK:    Linux Kernel supports UNIX 98 PTY
Aliases:
OK:    awk  is GNU
ERROR: yacc is NOT Bison
OK:    sh   is Bash
Compiler check:
version-check.sh: line 81: g++: command not found
ERROR: g++ does NOT work
OK: nproc reports 12 logical cores are available

 sudo pacman -S base-devel python
```

### 分区

根据 [Chapter 2.4](https://www.linuxfromscratch.org/lfs/view/stable/chapter02/creatingpartition.html)，LFS 需要单独的分区，而且比较好的方法是用空的分区或者新建一个分区。WSL 的虚拟磁盘不方便再分，就新建一个虚拟磁盘再分区好了。

*我试了在 WSL 原先的虚拟磁盘上直接分区，`fdisk` 提示我最好别这么干。*

首先打开 Windows 的计算机管理 -> 存储 -> 磁盘管理，在右侧找到更多操作 -> 创建 VHD，按照 LFS 文档的说明决定虚拟磁盘的大小，我这里创建了最大 15 GB、动态增长的 VHDX。

接下来要挂载这块虚拟磁盘，按照[在 WSL 中装载 VHD](https://learn.microsoft.com/zh-cn/windows/wsl/wsl2-mount-disk#mount-a-vhd-in-wsl) 的说明，用管理员权限操作，然后我蒙了：

```powershell
 wsl --shutdown
 Write-Output "\\.\PhysicalDrive$((Mount-VHD -Path ./lfs.vhdx -PassThru | Get-Disk).Number)"
Mount-VHD : 无法将“Mount-VHD”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确
保路径正确，然后再试一次。
所在位置 行:1 字符: 35
+ Write-Output "\\.\PhysicalDrive$((Mount-VHD -Path ./lfs.vhdx -PassThr ...
+                                   ~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (Mount-VHD:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

\\.\PhysicalDrive
```

[Mount-VHD](https://learn.microsoft.com/zh-cn/powershell/module/hyper-v/mount-vhd?view=windowsserver2022-ps) 是 Hyper-V 的命令，我就去看了我电脑上是不是打开了 Hyper-V（启用或关闭 Windows 功能），结果没打开，没打开……连 WSL 都没勾选…，只选了一个虚拟机平台……那我是怎么装上这个 ArchWSL 的？

暂时抛下这些问题，打开 Hyper-V 和 WSL，重启电脑，再用管理员权限执行命令：

```powershell
# 从微软商店获取的 WSL 可以直接装在 VHD，不过我这里好像不行
 Write-Output "\\.\PhysicalDrive$((Mount-VHD -Path ./lfs.vhdx -PassThru | Get-Disk).Number)"
\\.\PhysicalDrive1
 wsl --mount \\.\PhysicalDrive1 --bare
操作成功完成。                          
```

*创建 VHD 的时候它是磁盘几大概就是 PhysicalDrive 几了吧。*

在 WSL 中：

```bash
 sudo fdisk -l
Disk /dev/sdc: 15 GiB, 16106127360 bytes, 31457280 sectors
Disk model: Virtual Disk
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
```

新挂载的虚拟磁盘是 `/dev/sdc`，接下来可以用 `fdisk` 分区，但我对 `fdisk`，不是很熟悉，每一步都得看帮助，所以我用了 `cfdisk`——有简单的 UI，操作更方便一点。

```bash
 sudo cfdisk /dev/sdc
[sudo] password for chldu:

Syncing disks.

 sudo fdisk -l
Disk /dev/sdc: 15 GiB, 16106127360 bytes, 31457280 sectors
Disk model: Virtual Disk
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: F9B7AD82-F824-44FC-9F7B-E65DBF08727F

Device     Start      End  Sectors Size Type
/dev/sdc1   2048 31455231 31453184  15G Linux filesystem
```

接下来就是在新分区上创建文件系统，把它挂载到指定目录：

```bash
 sudo mkfs -v -t ext4 /dev/sdc1
 mkdir /mnt/wsl/vhd-sdc1
 sudo mount /dev/sdc1 /mnt/wsl/vhd-sdc1/
```

创建 LFS 环境变量的时候要用自己的挂载目录，我这里就是在 `root` 和普通用户的 `bashrc` 里面加上 `export LFS=/mnt/wsl/vhd-sdc1`。

Linux 重启（当然对于 WSL 来说就是 Windows 重启）之后需要重新挂载分区，编辑 `/etc/fstab` 实现自动挂载的方法在 WSL 上不生效，正在尝试其他办法……
