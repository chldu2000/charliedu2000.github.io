import{_ as u}from"./ValaxyMain.vue_vue_type_style_index_0_lang-40050c3d.js";import{_ as h,c,w as l,o as m,b as e,d as a,e as s,r as o,f as p,p as f}from"./app-025bdceb.js";import"./YunFooter.vue_vue_type_script_setup_true_lang-dd4500d1.js";import"./YunCard.vue_vue_type_style_index_0_lang-c0980680.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-870a2da2.js";const J=JSON.parse('{"title":"hello-valaxy","description":"","frontmatter":{"layout":"post","title":"hello-valaxy","date":"2023-04-10T00:29:43.000Z","updated":"2023-04-10T00:29:43.000Z","tags":["valaxy"],"categories":["站点里程碑"]},"headers":[{"level":2,"title":"为什么用 valaxy","slug":"为什么用-valaxy","link":"#为什么用-valaxy","children":[]},{"level":2,"title":"整理 Blog 之后发现的问题","slug":"整理-blog-之后发现的问题","link":"#整理-blog-之后发现的问题","children":[]},{"level":2,"title":"嗯……","slug":"嗯","link":"#嗯","children":[]}],"relativePath":"pages/posts/log/hello-valaxy.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/log/hello-valaxy.md","lastUpdated":1699970883000}'),r=JSON.parse('{"title":"hello-valaxy","description":"","frontmatter":{"layout":"post","title":"hello-valaxy","date":"2023-04-10T00:29:43.000Z","updated":"2023-04-10T00:29:43.000Z","tags":["valaxy"],"categories":["站点里程碑"]},"headers":[{"level":2,"title":"为什么用 valaxy","slug":"为什么用-valaxy","link":"#为什么用-valaxy","children":[]},{"level":2,"title":"整理 Blog 之后发现的问题","slug":"整理-blog-之后发现的问题","link":"#整理-blog-之后发现的问题","children":[]},{"level":2,"title":"嗯……","slug":"嗯","link":"#嗯","children":[]}],"relativePath":"pages/posts/log/hello-valaxy.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/log/hello-valaxy.md","lastUpdated":1699970883000}'),v={name:"pages/posts/log/hello-valaxy.md",data(){return{data:r,frontmatter:r.frontmatter}},setup(){f("pageData",r)}},g={id:"为什么用-valaxy",tabindex:"-1"},y=e("ul",null,[e("li",null,"快，想在本地看到效果的话比 hexo 快太多了。yyj 赛高！"),e("li",null,[a("部署更方便，自带 workflow，只要更新源文件就能自动在指定分支生成页面文件。懒人福音。"),e("s",null,"（这个人竟然已经懒到连 workflow 都不愿意自己写了。）")])],-1),_=e("p",null,[e("s",null,[a("不过博客迁移太多次了很多地方变得比较混乱，比方说你可以在源文件中看到不同格式的文件名和 "),e("code",null,"frontmatter"),a("，这都是 typecho、hexo 和 valaxy 留下的岁月痕迹（确信）。")])],-1),x={id:"整理-blog-之后发现的问题",tabindex:"-1"},k=e("ul",null,[e("li",null,[a("如果文章的 "),e("code",null,"frontmatter"),a(" 里没有 "),e("code",null,"updated"),a("，valaxy 会把生成页面的时间当作文章最后一次更新的时间，而每 push 一次都会重新生成所有的页面。所以一定要写 "),e("code",null,"updated"),a("，否则你有可能看到“今天上传了一点更新，结果所有文章的更新时间都变成了今天”这样的场景。")]),e("li",null,"我的 twikoo 数据库似乎在某一次更新部署的时候刷新了，以前的评论都看不到了，只得手动导入。另外云函数部署在 vercel 上，但是默认的域名貌似被屏蔽了，不用科学手段根本看不了评论，遂在自己的域名上加一条 CNAME 解析，目前评论加载速度还可以。"),e("li",null,[a("valaxy 的默认主题用 "),e("code",null,'<YunLinks :links="frontmatter.links" :random="frontmatter.random" />'),a(" 的方式（是主题定义的吧）来在页面中插入友链，之前用 hexo 把友链写在 "),e("code",null,"frontmatter"),a(" 里的形式失效。把友链内容放到一个 "),e("code",null,"json"),a(" 文件扔到 "),e("code",null,"public"),a(" 下面，在 "),e("code",null,"frontmatter"),a(" 里面加上 "),e("code",null,"links"),a(" 属性引用一下完事。"),e("s",null,"虽然我到目前为止只交换过一次友链……")])],-1),b=e("p",null,[e("s",null,"或许之后自己给 valaxy 写个主题？")],-1),$={id:"嗯",tabindex:"-1"},w=e("p",null,"好久没写东西了，找个时间闲聊一下吧……",-1);function B(t,N,T,V,i,Z){const n=p,d=u;return m(),c(d,{frontmatter:i.frontmatter,data:i.data},{"main-content-md":l(()=>[e("h2",g,[a("为什么用 valaxy "),s(n,{class:"header-anchor",href:"#为什么用-valaxy","aria-hidden":"true"},{default:l(()=>[a("#")]),_:1})]),y,_,e("h2",x,[a("整理 Blog 之后发现的问题 "),s(n,{class:"header-anchor",href:"#整理-blog-之后发现的问题","aria-hidden":"true"},{default:l(()=>[a("#")]),_:1})]),k,b,e("h2",$,[a("嗯…… "),s(n,{class:"header-anchor",href:"#嗯","aria-hidden":"true"},{default:l(()=>[a("#")]),_:1})]),w]),"main-header":l(()=>[o(t.$slots,"main-header")]),"main-header-after":l(()=>[o(t.$slots,"main-header-after")]),"main-nav":l(()=>[o(t.$slots,"main-nav")]),"main-content":l(()=>[o(t.$slots,"main-content")]),"main-content-after":l(()=>[o(t.$slots,"main-content-after")]),"main-nav-before":l(()=>[o(t.$slots,"main-nav-before")]),"main-nav-after":l(()=>[o(t.$slots,"main-nav-after")]),comment:l(()=>[o(t.$slots,"comment")]),footer:l(()=>[o(t.$slots,"footer")]),aside:l(()=>[o(t.$slots,"aside")]),"aside-custom":l(()=>[o(t.$slots,"aside-custom")]),default:l(()=>[o(t.$slots,"default")]),_:3},8,["frontmatter","data"])}const L=h(v,[["render",B]]);export{J as __pageData,L as default};
