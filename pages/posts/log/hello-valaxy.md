---
layout: post
title: hello-valaxy
date: 2023-04-10 00:29:43
updated: 2023-04-10 00:29:43
tags:
  - valaxy
categories:
  - 站点里程碑
---

## 为什么用 valaxy

- 快，想在本地看到效果的话比 hexo 快太多了。yyj 赛高！
- 部署更方便，自带 workflow，只要更新源文件就能自动在指定分支生成页面文件。懒人福音。~~（这个人竟然已经懒到连 workflow 都不愿意自己写了。）~~

## 整理 Blog 之后发现的问题

- 如果文章的 `frontmatter` 里没有 `updated`，valaxy 会把生成页面的时间当作文章最后一次更新的时间，而每 push 一次都会重新生成所有的页面。所以一定要写 `updated`，否则你有可能看到“今天上传了一点更新，结果所有文章的更新时间都变成了今天”这样的场景。
- 我的 twikoo 数据库似乎在某一次更新部署的时候刷新了，以前的评论都看不到了，只得手动导入。另外云函数部署在 vercel 上，但是默认的域名貌似被屏蔽了，不用科学手段根本看不了评论，遂在自己的域名上加一条 CNAME 解析，目前评论加载速度还可以。
- valaxy 的默认主题用 `<YunLinks :links="frontmatter.links" :random="frontmatter.random" />` 的方式（是主题定义的吧）来在页面中插入友链，之前用 hexo 把友链写在 `frontmatter` 里的形式失效。把友链内容放到一个 `json` 文件扔到 `public` 下面，在 `frontmatter` 里面加上 `links` 属性引用一下完事。~~虽然我到目前为止只交换过一次友链……~~

~~或许之后自己给 valaxy 写个主题？~~

## 嗯……

好久没写东西了，找个时间闲聊一下吧……