---
title: 使用自定义域名的电子邮件
tags:
  - DNS
  - Domain
categories:
  - 有趣的东西
date: 2025-09-23 11:09:33
updated: 2025-09-23 11:09:33
excerpt_type: html
---

由于种种原因，我最近需要更新简历。在往简历上写邮箱的时候，我突然觉得自己现在的邮箱没有辨识度，要么是 `一串数字@qq.com`，要么是名字全拼/首字母被占用而被迫注册的 `拼音+数字@xxxmail.com`。如果我想让自己的邮箱地址更独特一些，有什么办法呢？最简单的方案就是去 QQ 邮箱的账号设置那里申请英文邮箱或者 foxmail 邮箱。如果是 Outlook，也可以为邮箱设置一个别名。

这时你可能会问：这样还是避免不了名字被占用啊，有没有更“极客”的方法能让我随意自定义邮箱名字呢？当然有的。

<!-- more -->

## 前提条件

首先，我们需要注册一个域名，去各大云厂商那里看看应该都可以买到，我的域名是在阿里云买的。自然，这样还是有可能遇到名字被占用的情况，但是我们可以避开 `.com`、`.cn` 等常见顶级域名，从而在很大程度上规避这个风险。~~据说像 `.top` 这样的域名很容易被识别成垃圾邮件，在选择的时候需要考虑一下。~~

然后，为了少折腾，最好选择支持添加别名、在国内能正常访问的邮件服务——我选 Outlook。我们下面要做的就是给这个邮箱“套个壳”。

## 用自己的域名接收邮件

目前我在用 Cloudflare 托管自己的域名。在 Cloudflare 的域名控制台里可以找到“电子邮件”菜单：

![cloudflare-domain-dashboard.png](https://s2.loli.net/2025/09/23/seNYRIJZGrW59U7.png)

然后在“电子邮件路由”中创建一个自定义地址：

![email-routing.png](https://s2.loli.net/2025/09/23/ni3aOYNsWyQhoe8.png)

“自定义地址”就是你想要的邮箱地址，我现在用的是 `chldu@afool.top`；“操作”选“发送到电子邮件”就行；“目标”就是你本来那个不怎么酷的邮箱地址。

![customize-email-address.png](https://s2.loli.net/2025/09/23/kZ3xCaMwIy7KpbR.png)

创建好之后，跟着 Cloudflare 的提示，给自己的域名添加几条 `MX` 类型的 DNS 记录，接着验证一下目标地址（我这里是验证完的状态）：

![verify-target-address.png](https://s2.loli.net/2025/09/23/wx5bKrgka3P1dfE.png)

你的邮箱会收到一封来自 Cloudflare 的邮件，点击里面的按钮/链接完成验证。现在，往自己的域名发邮件，Outlook 邮箱就能收到了。

## 用自己的域名发送邮件

想用自己的域名发邮件，就要用到 Outlook 的别名了。其他邮件服务都有类似的功能，只是配置方法和限制不尽相同。

在微软账户“您的信息”中找到“账户信息”，点击“编辑账户信息”：

![outlook-account-info.png](https://s2.loli.net/2025/09/23/o4VYz8rHtXEvZsd.png)

在“账户用户名”一栏下点击“添加电子邮件”：

![outlook-account-usernames.png](https://s2.loli.net/2025/09/23/rq5QxLKua1IkRfU.png)

选择“将现有电子邮件地址添加为 Microsoft 账户用户名”，输入前面你自己想的那个邮箱地址：

![outlook-add-username.png](https://s2.loli.net/2025/09/23/wePAMbSfJ1I9ZqK.png)

添加完后回到“账户用户名”，新添加的邮箱地址需要验证。因为我们前面已经配置了邮件路由，所以发往自定义邮箱的验证邮件会出现在 Outlook 邮箱中。验证完之后，发送邮件时，我们就可以使用自定义的邮箱地址了：

![sent-email.png](https://s2.loli.net/2025/09/23/kTUOnzLRQcuMgW5.png)

下班收工！
