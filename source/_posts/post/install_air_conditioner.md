---
title: "夏天到了，开个空调"
categories: [ "奇怪的知识增加了" ]
tags: [ "玩具" ]
draft: false
slug: "75"
date: "2021-05-15 00:12:00"
---

## 这里是空调房

这个空调来自这里：[云游君的小站-便携小空调](https://www.yunyoujun.cn/posts/air-conditioner/)。

看起来蛮有趣的，~~空调房最适合摸鱼了~~。

<iframe height=800 src="https://ac.yunyoujun.cn"></iframe>

## 空调维修

事情是这样的，之前搬文章的时候先用了下Hugo，然后我发现小空调不见了……不见了……

![完蛋](https://i.loli.net/2021/06/27/3iDmAFlU8eZkhRV.jpg)

本着偷懒的原则，我想去当时用的主题的说明文档里面找找看有没有关于这个问题的解答。结果显而易见，没有。~~不然我也不用写这么个维修记录了。~~

那就自己动手，丰衣足食。所以我打开了万能的搜索引擎。~~（自己动手，大嘘）~~，输入“Hugo”和“iframe”这么两个关键字，找到了三四篇相关的文章。

简单来说，就是Hugo似乎不支持在Markdown中直接插入iframe标签。但是，Hugo有一个shortcode机制可以完成这个目的。

那么维修方法就是：在`layouts/shortcodes`目录下面新建一个html文件（小空调要用到的属性只有高度和地址，就草率地把这个文件命名为`height_and_src.html`）：

```html
<iframe
    height="{{.Get 0 }}"
    src="https://{{.Get 1 }}"
>
</iframe>
```

要让小空调工作，只需要在Markdown里加上这么一行：

```html
{{< height_and_src 800 ac.yunyoujun.cn >}}
```

~~打开空调，睡觉。~~

当然，Hexo支持iframe，这个问题就抛到脑后吧。

