---
layout: post
title: 幻兽帕鲁服务器踩坑
date: 2024-04-07 16:35:10
update: 2024-04-07 16:35:10
categories:
  - 玩玩游戏
tags:
  - Linux
  - PalWorld
  - Server
---

## 更新游戏

更新游戏的时候要用 `steam` 用户运行 `steamcmd`，脚本里面需要 `su steam -c` 可以把后续的命令执行者变为 `steam`，不加 `-c` 的话切换用户之后命令无法直接生效。

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

里面的 app id 可以换成别的，可以用于更新其他游戏。

## 连接超时、连上一会儿就掉线

参考[这篇文章](https://developer.aliyun.com/article/1429510)，把存档文件夹转移给 `steam` 用户，这样服务器程序就能写入文件：

```bash
pwd
/home/steam

chown -R steam:steam Steam/steamapps/common/PalServer/Pal/Saved
chmod -R 755 Steam/steamapps/common/PalServer/Pal/Saved
```
