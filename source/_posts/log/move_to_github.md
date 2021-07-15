---
title: "把站点迁移到GitHub"
categories: [ "往事如烟" ]
tags: [ "blog" ]
date: 2021-05-23T22:57:20+08:00
draft: false
slug: "move_to_github"
---

## 起因

原因很简单，为了节省服务器经费~~（钱包空空）~~，服务器摆在那里，资源也没有充分利用起来。

<!-- more -->

## 导出

把文章从Typecho导出到Hugo主要是通过这个插件来完成的：[Typecho 博客文章导出至 Hugo 插件](https://github.com/lizheming/typecho-export-hugo)。

然而我得到的zip文件老是无法解压，看了[issue](https://github.com/lizheming/typecho-export-hugo/issues/2)之后去`/tmp/Export2Hugo`下面找才找到导出的文件。把导出的content文件夹扔到Hugo的目录下面，嗯，最基本的部分就完成了。

### 然而

经过一番折腾还是换了Hexo，不过之前导出的文件倒是可以直接用。

有一说一，就生成文章的速度来看，还是Hugo更胜一筹。

## 主题和配置

使用了云游君大佬的[Yun](https://github.com/YunYouJun/hexo-theme-yun)主题。

在`source`目录下面新建目录`_data`，新建一个`yun.yml`，按照主题说明文档来改就可以。

安装的必要插件和额外依赖库：

```shell
# 渲染器
npm install hexo-render-pug hexo-renderer-stylus --save
# 标签
npm install hexo-generator-tag
# 分类
npm install hexo-generator-category
# 部署
npm install hexo-deployer-git
# 字数统计
npm install hexo-wordcount
# RSS
npm install hexo-generator-feed --save
```

暂时就这些，要用到别的以后还可以再配嘛。

## 启用GitHub Pages

这个就不多说了，建仓库开Pages服务还有域名解析。域名解析记录可以直接用**CNAME**指向GitHub给的默认域名。

## 图床

使用了**SM.MS**免费版和**PicGo**的组合，先这样吧~~（钱包空空）~~。

## 今后的打算

之前发的那些题解水文就不删了，~~不然没有内容，~~今后题解水文如果发也可能只有一些思路，更具体的应该会放到CSDN上吧。学习笔记什么的会用语雀之类的平台。用主题提供的post type做成外部链接也不错。

还是希望这里能够成为更个性化的空间。
