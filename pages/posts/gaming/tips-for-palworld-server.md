---
layout: post
title: 幻兽帕鲁服务器踩坑
date: 2024-04-07 16:35:10
updated: 2024-04-07 16:35:10
categories:
  - 玩玩游戏
tags:
  - Linux
  - PalWorld
  - Server
---

## 更新游戏

更新游戏的时候要用 `steam` 用户运行 `steamcmd`，脚本里面需要 `su steam -c` 把后续的命令执行者变为 `steam`，执行完毕后切换回原来的用户。不加 `-c` 的话你会发现 `su` 之后脚本就停了，`exit` 之后才会以原来的用户继续执行，但这跟我们预期的效果不一样。

可以参考的升级脚本：

```bash
#!/bin/bash
echo “Stop Pal-World service”
systemctl stop palworld

echo "Backup savings"
cp -rv /home/steam/Steam/steamapps/common/PalServer/Pal/Saved /home/steam/PalBackup/ 

echo "Update game"
su steam -c '/home/steam/steamcmd +login anonymous +app_update 2394010 validate +quit'

echo "Start Pal-World service"
systemctl start palworld
```

里面的 service 和 app id 可以换成别的，可以用于更新其他游戏。

## 连接超时、连上一会儿就掉线

参考[这篇文章](https://developer.aliyun.com/article/1429510)，把存档文件夹转移给 `steam` 用户，这样服务器程序就能写入文件：

```bash
pwd
/home/steam

chown -R steam:steam Steam/steamapps/common/PalServer/Pal/Saved
chmod -R 755 Steam/steamapps/common/PalServer/Pal/Saved
```
