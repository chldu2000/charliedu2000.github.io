---
layout: post
title: 在 WSL 上构建 LFS
date: 2024-04-04 00:23:38
updated: 2024-04-05 00:23:38
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

[Stable LFS（12.1）](https://www.linuxfromscratch.org/lfs/view/stable/)

[LFS 12.1 中文翻译](https://lfs.xry111.site/zh_CN/12.1/index.html)

[Linux From Scratch (LFS) 编译记录 – Vinfall@Geekademy](https://blog.vinfall.com/posts/2022/09/lfs/)

[适用于 Linux 的 Windows 子系统文档](https://learn.microsoft.com/zh-cn/windows/wsl/)

[LFS Packages Mirror](https://iso.mirrors.ustc.edu.cn/lfs/lfs-packages/lfs-packages-12.1.tar)

## 准备构建

### 宿主系统

LFS 对宿主系统的要求在[Chapter 2.2](https://www.linuxfromscratch.org/lfs/view/stable/chapter02/hostreqs.html)。

4 核 8G 的硬件应该不是问题吧（笑）。

可以用文档中提供的脚本快速检查软件需求。我用的发行版是 [Arch](https://github.com/yuk7/ArchWSL)，我记得装上后没有进行别的操作，安装 `base-devel` 和 `python` 之后就满足要求了。不过别的发行版软件包组名字可能不同，你也可以直接安装脚本提示缺少的包。

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

[Mount-VHD](https://learn.microsoft.com/zh-cn/powershell/module/hyper-v/mount-vhd?view=windowsserver2022-ps) 是 Hyper-V 的命令，我就去看了我电脑上是不是打开了 Hyper-V（启用或关闭 Windows 功能），结果没打开，没打开……连 WSL 都没勾选，只选了一个虚拟机平台……那我是怎么装上这个 ArchWSL 的？

暂时抛下这些问题，打开 Hyper-V 和 WSL，重启电脑，再用管理员权限执行命令：

```powershell
# wsl --mount "\\.\PhysicalDrive$((Mount-VHD -Path ./lfs.vhdx -PassThru | Get-Disk).Number)" --bare 也行
# 后面折腾的时候发现微软商店装的 WSL 可以直接：wsl --mount --vhd <path-to-vhd-file> --bare
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

新挂载的虚拟磁盘是 `/dev/sdc`。接下来可以用 `fdisk` 分区，但我对 `fdisk` 不是很熟悉，每一步都得看帮助，所以我用了 `cfdisk`——有简单的 UI，操作更方便一点。

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
 mkdir /mnt/wsl/vhd-lfs
 sudo mount /dev/sdc1 /mnt/wsl/vhd-lfs/
```

创建 LFS 环境变量的时候要用自己的挂载目录，我这里就是在 `root` 和普通用户的 `.bashrc` 里面加上 `export LFS=/mnt/wsl/vhd-lfs`。

#### 自动挂载

Linux 重启（当然对于 WSL 来说就是 Windows 重启）之后需要重新挂载分区，更糟的是，在 WSL 中，自己创建的挂载点重启后会消失，所以编辑 `/etc/fstab` 实现自动挂载的方法就不能用了。

另外，Windows 重启之后还会分离 VHD，需要到磁盘管理再附加上去才能拿到磁盘标识并挂载。幸好我的 WSL（不是指发行版）是在微软商店装的，可以直接挂载 VHD 文件：

```powershell
# 已经分区的磁盘需要指定要挂载的分区，我只有一个分区，就指定 1
 wsl --mount --vhd C:\Users\charl\MyTools\ArchWSL\lfs.vhdx -p 1 --name vhd-lfs
已成功将磁盘装载为“/mnt/wsl/vhd-lfs”。
注意： 如果已修改 /etc/wsl.conf 中的 automount.root 设置，则位置将不同。
若要卸载和分离磁盘，请运行“wsl.exe --unmount \\?\C:\Users\charl\MyTools\ArchWSL\lfs.vhdx”。
```

那自动挂载的方案就呼之欲出了，就是在重启之后自动执行上面这条命令。我找到的方法是把这条命令写进 `ps1` 脚本，创建一个计划任务，当我登录的时候让 PowerShell 用最高权限执行脚本。

### 软件、“lfs” 用户和其他

按照文档上给的步骤操作就行，需要注意的就是给 lfs 用户创建 `.bashrc` 的时候 `LFS` 变量值要换成自己的挂载点。

`MAKEFLAGS` 里面用的核数先设了 `-j6`。

## Toolchain

这里就开始用 lfs 用户了。以编译 `binutils` 为例：

```bash
# 最好检查一下变量
echo $LFS

# 注意“编译过程的一般说明”，先解压源码，再到源码目录下构建
tar xf binutils-2.42.tar.xz
cd binutils-2.42

mkdir -v build
cd build/

time { \
../configure --prefix=$LFS/tools \
             --with-sysroot=$LFS \
             --target=$LFS_TGT   \
             --disable-nls       \
             --enable-gprofng=no \
             --disable-werror    \
             --enable-default-hash-style=gnu && \
make && make install; }

real    0m34.804s
user    1m48.477s
sys     0m9.644s

# 结束后清理目录
cd $LFS/sources/
rm -rf binutils-2.42
```

[Vinfall 的记录](https://blog.vinfall.com/posts/2022/09/lfs/#%E6%9E%84%E5%BB%BA-toolchain-%E5%92%8C-chroot-%E7%8E%AF%E5%A2%83)提到了第一次编译 `gcc` 时目录的坑，我做的时候 [LFS 文档](https://www.linuxfromscratch.org/lfs/view/stable/chapter05/gcc-pass1.html)里面已经有了关于这点的提示。

编译 `gcc` 用的时间比我预想得短一些：

```bash
# gcc 13.2.0, pass 1
time { make; }

real    5m29.212s
user    25m52.521s
sys     1m20.544s
```
