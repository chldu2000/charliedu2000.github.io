---
layout: post
title: 在 WSL 上构建 LFS
date: 2024-04-04 00:23:38
updated: 2024-04-10 00:23:38
tags:
  - Linux
  - LFS
  - WSL
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

4 核 8G 的硬件应该不是问题吧（笑）。我是 i5-12400F + 16G DDR4 3200MHz。

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

`MAKEFLAGS` 里面用的核数先设了 `-j6`，其实直接 `-j$(nproc)` 用上所有核也行。后面 `chroot` 之后用了所有核，但还是前后统一比较好衡量自己实际用的 `SBU`。

## Toolchain

这里就开始用 lfs 用户了。

以编译 `binutils` 为例：

```bash
# 最好检查一下变量
echo $LFS

# 注意“编译过程的一般说明”，先解压源码，再到源码目录下构建
tar xf binutils-2.42.tar.xz
cd binutils-2.42

mkdir -v build
cd build/

# binutils 2.42 pass 1
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
# 讲道理应该连 configure 和 make install 一起计时的
time { make; }

real    5m29.212s
user    25m52.521s
sys     1m20.544s
```

后面的编译步骤按文档上面的来就行。

## Chroot 环境

这里需要用 `root` 用户。接着按照[文档](https://www.linuxfromscratch.org/lfs/view/stable/chapter07/changingowner.html)把 `$LFS` 下面的一堆目录转移给 `root`，准备 `chroot` 环境需要的虚拟内核文件系统。

进入 `chroot` 环境！

```bash
chroot "$LFS" /usr/bin/env -i   \
    HOME=/root                  \
    TERM="$TERM"                \
    PS1='(lfs chroot) \u:\w\$ ' \
    PATH=/usr/bin:/usr/sbin     \
    MAKEFLAGS="-j$(nproc)"      \
    TESTSUITEFLAGS="-j$(nproc)" \
    /bin/bash --login
(lfs chroot) I have no name!:/#
```

`bash` 的提示符显示 `I have no name!`，这是因为新的环境里面还没有 `/etc/passwd`，找不到 `uid` 对应的名字。（所以 `uid` 才是决定用户身份的东西。）

另外，在 `chroot` 环境编译的时候中就不用管 `$LFS` 了，因为根目录已经成了之前 `$LFS` 指定的位置，不会再涉及宿主系统的文件了。

### 清理和备份

清理主要是去掉一些不需要的文档和库，此外 `/tools` 也可以删掉，见 [Chapter 7.13](https://www.linuxfromscratch.org/lfs/view/stable/chapter07/cleanup.html)。

```bash
rm -rf /usr/share/{info,man,doc}/*
find /usr/{lib,libexec} -name \*.la -delete
rm -rf /tools
```
退出 `chroot` 环境，卸载虚拟文件系统：

```bash
exit
logout

# root，现在最好检查下 $LFS
echo $LFS
/mnt/wsl/vhd-lfs

mountpoint -q $LFS/dev/shm && umount $LFS/dev/shm
umount $LFS/dev/pts
umount $LFS/{sys,proc,run,dev}
```

备份：

```bash
cd $LFS
tar -cJpf /mnt/c/Users/charl/MyTools/ArchWSL/lfs-temp-tools-12.1.tar.xz .
```

压缩文件用了两三分钟。想更快的话，可以参考 [Vinfall 的笔记](https://blog.vinfall.com/posts/2022/09/lfs/#%E5%A4%87%E4%BB%BD)。

如果需要还原，一定要注意，别把宿主系统给删掉了。

## 构建 LFS

由于之前备份系统退出了 `chroot`，现在需要重新挂载虚拟文件系统并进入 `chroot`：

```bash
mount -v --bind /dev $LFS/dev

mount -vt devpts devpts -o gid=5,mode=0620 $LFS/dev/pts
mount -vt proc proc $LFS/proc
mount -vt sysfs sysfs $LFS/sys
mount -vt tmpfs tmpfs $LFS/run

if [ -h $LFS/dev/shm ]; then
  install -v -d -m 1777 $LFS$(realpath /dev/shm)
else
  mount -vt tmpfs -o nosuid,nodev tmpfs $LFS/dev/shm
fi

chroot "$LFS" /usr/bin/env -i   \
    HOME=/root                  \
    TERM="$TERM"                \
    PS1='(lfs chroot) \u:\w\$ ' \
    PATH=/usr/bin:/usr/sbin     \
    MAKEFLAGS="-j$(nproc)"      \
    TESTSUITEFLAGS="-j$(nproc)" \
    /bin/bash --login
```

有一些软件文档会提示最好不要跳过测试步骤，记得注意一下。

解压的时候注意大小写，比如 `python` 的包名就是 `Python-3.12.2.tar.xz`，我用小写找了半天只能找到文档……

安装 `glibc` 的时候需要时区数据，创建 `/etc/localtime` 的时候，北京时间就直接用 `Asia/Shanghai`：

```bash
ln -sfv /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

WSL 并不依靠 `grub` 来启动，应该可以跳过。

### 测试相关

安装 `binutils` 的时候下面的错误可以忽略：

```bash
make -k check

grep '^FAIL:' $(find -name '*.log')
./gold/testsuite/test-suite.log:FAIL: weak_undef_test
./gold/testsuite/test-suite.log:FAIL: initpri3a
./gold/testsuite/test-suite.log:FAIL: script_test_1
./gold/testsuite/test-suite.log:FAIL: script_test_2
./gold/testsuite/test-suite.log:FAIL: justsyms
./gold/testsuite/test-suite.log:FAIL: justsyms_exec
./gold/testsuite/test-suite.log:FAIL: binary_test
./gold/testsuite/test-suite.log:FAIL: script_test_3
./gold/testsuite/test-suite.log:FAIL: tls_phdrs_script_test
./gold/testsuite/test-suite.log:FAIL: script_test_12i
./gold/testsuite/test-suite.log:FAIL: incremental_test_2
./gold/testsuite/test-suite.log:FAIL: incremental_test_5
```

`gcc` 的测试的确是地狱级别，用 `su tester -c "PATH=$PATH make -k -j12 check"` 跑了 50 分钟……还好测试结果和文档里写的一样，那就没什么问题。

> Eight gcc tests (out of over 185,000): `pr56837.c` and seven tests in the `analyzer` directory are known to fail. One libstdc++ test (out of over 15000), `copy.cc`, is known to fail. For g++, 21 tests (out of approximately 250,000): 14 “AddressSanitizer*” tests and 7 `interception-malloc-test-1.C` tests, are known to fail. Additionally, several tests in the `vect` directory are known to fail if the hardware does not support AVX.
> 
> A few unexpected failures cannot always be avoided. The GCC developers are usually aware of these issues, but have not resolved them yet. Unless the test results are vastly different from those at the above URL, it is safe to continue.

```bash
(lfs chroot) root:/sources/gcc-13.2.0/build# ../contrib/test_summary
cat <<'EOF' |
LAST_UPDATED: Obtained from git: releases/gcc-13.2.0 revision c891d8dc23e1a46ad9f3e757d09e57b500d40044

Native configuration is x86_64-pc-linux-gnu

                === g++ tests ===


Running target unix
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtollOOBTest Strtol(array + 3, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtollOOBTest Strtol(array - 1, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtollOOBTest Strtol(array, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtollOOBTest Strtol(array, NULL, 36) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtollOOBTest Strtol(array, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtollOOBTest Strtol(array, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtollOOBTest Strtol(array, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtolOOBTest Strtol(array + 3, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtolOOBTest Strtol(array - 1, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtolOOBTest Strtol(array, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtolOOBTest Strtol(array, NULL, 36) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtolOOBTest Strtol(array, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtolOOBTest Strtol(array, NULL, 0) execution test
FAIL: g++.dg/asan/asan_test.C   -O2  AddressSanitizer_StrtolOOBTest Strtol(array, NULL, 0) execution test
FAIL: g++.dg/asan/interception-malloc-test-1.C   -O0  execution test
FAIL: g++.dg/asan/interception-malloc-test-1.C   -O1  execution test
FAIL: g++.dg/asan/interception-malloc-test-1.C   -O2  execution test
FAIL: g++.dg/asan/interception-malloc-test-1.C   -O3 -g  execution test
FAIL: g++.dg/asan/interception-malloc-test-1.C   -Os  execution test
FAIL: g++.dg/asan/interception-malloc-test-1.C   -O2 -flto -fno-use-linker-plugin -flto-partition=none  execution test
FAIL: g++.dg/asan/interception-malloc-test-1.C   -O2 -flto -fuse-linker-plugin -fno-fat-lto-objects  execution test

                === g++ Summary ===

# of expected passes            237387
# of unexpected failures        21
# of expected failures          2071
# of unsupported tests          10456
/sources/gcc-13.2.0/build/gcc/xg++  version 13.2.0 (GCC)

                === gcc tests ===


Running target unix
FAIL: gcc.dg/analyzer/data-model-4.c (test for excess errors)
FAIL: gcc.dg/analyzer/torture/conftest-1.c   -O0  (test for excess errors)
FAIL: gcc.dg/analyzer/torture/conftest-1.c   -O1  (test for excess errors)
FAIL: gcc.dg/analyzer/torture/conftest-1.c   -O2  (test for excess errors)
FAIL: gcc.dg/analyzer/torture/conftest-1.c   -O3 -g  (test for excess errors)
FAIL: gcc.dg/analyzer/torture/conftest-1.c   -Os  (test for excess errors)
FAIL: gcc.dg/analyzer/torture/conftest-1.c   -O2 -flto -fno-use-linker-plugin -flto-partition=none  (test for excess errors)
FAIL: gcc.dg/pr56837.c scan-tree-dump-times optimized "memset ..c, 68, 16384.;" 1

                === gcc Summary ===

# of expected passes            184920
# of unexpected failures        8
# of expected failures          1436
# of unsupported tests          2461
/sources/gcc-13.2.0/build/gcc/xgcc  version 13.2.0 (GCC)

                === libatomic tests ===


Running target unix

                === libatomic Summary ===

# of expected passes            54
                === libgomp tests ===


Running target unix

                === libgomp Summary ===

# of expected passes            5118
# of expected failures          32
# of unsupported tests          355
                === libitm tests ===


Running target unix

                === libitm Summary ===

# of expected passes            44
# of expected failures          3
# of unsupported tests          1
                === libstdc++ tests ===


Running target unix
FAIL: 23_containers/vector/bool/allocator/copy.cc (test for excess errors)

                === libstdc++ Summary ===

# of expected passes            15673
# of unexpected failures        1
# of expected failures          106
# of unsupported tests          383

Compiler version: 13.2.0 (GCC)
Platform: x86_64-pc-linux-gnu
configure flags: --prefix=/usr LD=ld --enable-languages=c,c++ --enable-default-pie --enable-default-ssp --disable-multilib --disable-bootstrap --disable-fixincludes --with-system-zlib
EOF
Mail -s "Results for 13.2.0 (GCC) testsuite on x86_64-pc-linux-gnu" gcc-testresults@gcc.gnu.org &&
mv /sources/gcc-13.2.0/build/./gcc/testsuite/g++/g++.sum /sources/gcc-13.2.0/build/./gcc/testsuite/g++/g++.sum.sent &&
mv /sources/gcc-13.2.0/build/./gcc/testsuite/gcc/gcc.sum /sources/gcc-13.2.0/build/./gcc/testsuite/gcc/gcc.sum.sent &&
mv /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libatomic/testsuite/libatomic.sum /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libatomic/testsuite/libatomic.sum.sent &&
mv /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libgomp/testsuite/libgomp.sum /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libgomp/testsuite/libgomp.sum.sent &&
mv /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libitm/testsuite/libitm.sum /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libitm/testsuite/libitm.sum.sent &&
mv /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libstdc++-v3/testsuite/libstdc++.sum /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libstdc++-v3/testsuite/libstdc++.sum.sent &&
mv /sources/gcc-13.2.0/build/./gcc/testsuite/g++/g++.log /sources/gcc-13.2.0/build/./gcc/testsuite/g++/g++.log.sent &&
mv /sources/gcc-13.2.0/build/./gcc/testsuite/gcc/gcc.log /sources/gcc-13.2.0/build/./gcc/testsuite/gcc/gcc.log.sent &&
mv /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libatomic/testsuite/libatomic.log /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libatomic/testsuite/libatomic.log.sent &&
mv /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libgomp/testsuite/libgomp.log /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libgomp/testsuite/libgomp.log.sent &&
mv /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libitm/testsuite/libitm.log /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libitm/testsuite/libitm.log.sent &&
mv /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libstdc++-v3/testsuite/libstdc++.log /sources/gcc-13.2.0/build/./x86_64-pc-linux-gnu/libstdc++-v3/testsuite/libstdc++.log.sent &&
true
```

中间还有一些软件可能出现零星的测试失败，参考 LFS 文档里面对应的部分，如果文档提到了就可以忽略，否则就得再想办法补救了。
