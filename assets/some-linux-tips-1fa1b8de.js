import{_ as d}from"./ValaxyMain.vue_vue_type_style_index_0_lang-40050c3d.js";import{_ as p,c as u,w as s,o as h,a as C,b as l,d as e,e as a,r as t,f as m,p as _}from"./app-025bdceb.js";import"./YunFooter.vue_vue_type_script_setup_true_lang-dd4500d1.js";import"./YunCard.vue_vue_type_style_index_0_lang-c0980680.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-870a2da2.js";const el=JSON.parse('{"title":"some-linux-tips","description":"","frontmatter":{"title":"some-linux-tips","tags":["Linux","Unix"],"categories":["奇怪的知识增加了"],"date":"2022-08-23T11:09:33.000Z","updated":"2022-08-23T11:09:33.000Z"},"headers":[{"level":2,"title":"各发行版之间最浅显的区别","slug":"各发行版之间最浅显的区别","link":"#各发行版之间最浅显的区别","children":[]},{"level":2,"title":"之前上过的 Unix 选修课","slug":"之前上过的-unix-选修课","link":"#之前上过的-unix-选修课","children":[{"level":3,"title":"从文件开始","slug":"从文件开始","link":"#从文件开始","children":[]},{"level":3,"title":"我是谁？我在哪？","slug":"我是谁？我在哪？","link":"#我是谁？我在哪？","children":[]},{"level":3,"title":"积木 OR 砖瓦","slug":"积木-or-砖瓦","link":"#积木-or-砖瓦","children":[]}]},{"level":2,"title":"一些奇怪的小知识","slug":"一些奇怪的小知识","link":"#一些奇怪的小知识","children":[]},{"level":2,"title":"如果是 WSL……","slug":"如果是-wsl","link":"#如果是-wsl","children":[]},{"level":2,"title":"使用之后的感受","slug":"使用之后的感受","link":"#使用之后的感受","children":[]}],"relativePath":"pages/posts/things/some-linux-tips.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/things/some-linux-tips.md","lastUpdated":1699970883000}'),i=JSON.parse('{"title":"some-linux-tips","description":"","frontmatter":{"title":"some-linux-tips","tags":["Linux","Unix"],"categories":["奇怪的知识增加了"],"date":"2022-08-23T11:09:33.000Z","updated":"2022-08-23T11:09:33.000Z"},"headers":[{"level":2,"title":"各发行版之间最浅显的区别","slug":"各发行版之间最浅显的区别","link":"#各发行版之间最浅显的区别","children":[]},{"level":2,"title":"之前上过的 Unix 选修课","slug":"之前上过的-unix-选修课","link":"#之前上过的-unix-选修课","children":[{"level":3,"title":"从文件开始","slug":"从文件开始","link":"#从文件开始","children":[]},{"level":3,"title":"我是谁？我在哪？","slug":"我是谁？我在哪？","link":"#我是谁？我在哪？","children":[]},{"level":3,"title":"积木 OR 砖瓦","slug":"积木-or-砖瓦","link":"#积木-or-砖瓦","children":[]}]},{"level":2,"title":"一些奇怪的小知识","slug":"一些奇怪的小知识","link":"#一些奇怪的小知识","children":[]},{"level":2,"title":"如果是 WSL……","slug":"如果是-wsl","link":"#如果是-wsl","children":[]},{"level":2,"title":"使用之后的感受","slug":"使用之后的感受","link":"#使用之后的感受","children":[]}],"relativePath":"pages/posts/things/some-linux-tips.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/things/some-linux-tips.md","lastUpdated":1699970883000}'),y={name:"pages/posts/things/some-linux-tips.md",data(){return{data:i,frontmatter:i.frontmatter}},setup(){_("pageData",i)}},A=l("p",null,"这里放一些有关 Linux 的东西，有一些日常使用的感受，还有一些通过选修课等方式学到的、或多或少会用到的技巧。",-1),D=l("p",null,[l("em",null,"正在施工中，可以查看大体框架的准备情况。")],-1),f={id:"各发行版之间最浅显的区别",tabindex:"-1"},g=l("p",null,"我自己用过一段时间的 Arch Linux，最近因为搞比赛要用到 ROS，顺手也用上了 Ubuntu。除此之外，我也因为课程、个人兴趣等原因多多少少接触过 OpenSUSE 和 CentOS 等发行版。",-1),x=l("p",null,[e("要说各个发行版之间最明显的区别，我觉得应该是它们的包管理器。使用 Linux 发行版免不了用包管理器安装、更新软件，这方面的体验很可能会影响用户对发行版的第一印象。包管理带来的问题，比如依赖管理、版本冲突和更新发行方式等会直接影响整个 OS 环境的稳定性（再比方说发布式版本更新、滚动更新乃至像 "),l("code",null,"Nix"),e(" 这样的原子更新方式之间的区别对设置开发环境的体验影响还是很大的）。")],-1),v=l("p",null,"与包管理联系紧密的因素之一是发行版的软件源。很多发行版都会标榜自己拥有多少多少软件包，如果官方软件源的覆盖范围足够广（哪怕官方软件源没有但是第三方提供支持也好），那这个发行版的推广难度就会小很多。很多第三方软件都只有 deb 和 rpm 包，虽然重新打包应该不算很难，但是对于更“初级”的用户（比如大多数非计算机行业的用户）来说，某个发行版没有自己常用的第三方软件（比如说 QQ 和微信😓️）就足以构成他们拒绝这个发行版的理由了。",-1),F=l("p",null,[l("s",null,"主要是在使用桌面端的时候。")],-1),k={id:"之前上过的-unix-选修课",tabindex:"-1"},E=l("p",null,[l("em",null,"虽然我当时选这门课的时候课程名称里是 Unix，老师也发了以前用的 Unix 教材（基于 IBM AIX），但是实际上课的时候就直接按 Linux 的内容来讲了，当时的实验统一用了 CentOS。")],-1),b={id:"从文件开始",tabindex:"-1"},w=l("p",null,[e("日常使用 Linux 肯定免不了跟它的文件系统打交道，其中最显而易见的几个要素大概就是 "),l("code",null,"ls"),e(" 时看到的那些，像这样：")],-1),L=l("div",{class:"language-shell"},[l("span",{class:"copy"}),l("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[l("code",null,[l("span",{class:"line"},[l("span",{style:{color:"#FFCB6B"}},"❯"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"ls"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"-l")]),e(`
`),l("span",{class:"line"},[l("span",{style:{color:"#FFCB6B"}},"total"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"12")]),e(`
`),l("span",{class:"line"},[l("span",{style:{color:"#FFCB6B"}},"-rw-r--r--"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"1"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"chldu"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"chldu"),l("span",{style:{color:"#A6ACCD"}},"  "),l("span",{style:{color:"#F78C6C"}},"259"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"Aug"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"18"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"00"),l("span",{style:{color:"#C3E88D"}},":"),l("span",{style:{color:"#F78C6C"}},"22"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"Cargo.toml")]),e(`
`),l("span",{class:"line"},[l("span",{style:{color:"#FFCB6B"}},"-rw-r--r--"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"1"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"chldu"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"chldu"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"2698"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"Aug"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"18"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"00"),l("span",{style:{color:"#C3E88D"}},":"),l("span",{style:{color:"#F78C6C"}},"22"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"README.md")]),e(`
`),l("span",{class:"line"},[l("span",{style:{color:"#FFCB6B"}},"drwxr-xr-x"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"2"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"chldu"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"chldu"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"4096"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"Aug"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"18"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#F78C6C"}},"00"),l("span",{style:{color:"#C3E88D"}},":"),l("span",{style:{color:"#F78C6C"}},"22"),l("span",{style:{color:"#A6ACCD"}}," "),l("span",{style:{color:"#C3E88D"}},"src")]),e(`
`),l("span",{class:"line"})])])],-1),$=l("p",null,[e("这里加上了 "),l("code",null,"-l"),e(" 来查看文件的详细信息，其它选项像常用的 "),l("code",null,"-a"),e(" 等就不赘述了，用 "),l("code",null,"--help"),e(" 就可以看到详细的解释。")],-1),B={id:"我是谁？我在哪？",tabindex:"-1"},S=l("p",null,[l("em",null,"如 pwd 等")],-1),U=l("p",null,[l("em",null,"which 和 whereis 等")],-1),O={id:"积木-or-砖瓦",tabindex:"-1"},N=l("p",null,[l("em",null,"“玩具”性质和“工具”性质")],-1),W=l("p",null,[l("em",null,"其他常用命令和技巧")],-1),T=l("p",null,[l("em",null,"grep"),e(" -> "),l("em",null,"管道"),e("……")],-1),R=l("p",null,[l("em",null,"shell 脚本相关")],-1),V={id:"一些奇怪的小知识",tabindex:"-1"},Z=l("p",null,[e("关于显卡驱动：其实现在在 Linux 下安装显卡驱动也算不上一件太难的事，需要注意的就是如果系统的内核是 "),l("code",null,"zen"),e(" 等定制内核，nvidia 显卡就要用 "),l("code",null,"dkms"),e(" 驱动。")],-1),I={id:"如果是-wsl",tabindex:"-1"},M=l("p",null,"WSL2 甚至不用另外装显卡驱动，只要 Windows 的驱动支持 WSL，装上 X 就可以直接用 Linux 下的 GUI 应用。（Wow!）",-1),J={id:"使用之后的感受",tabindex:"-1"},P=l("p",null,[l("em",null,"一些个人的感受，优点和缺点")],-1);function Q(n,X,z,G,r,j){const o=m,c=d;return h(),u(c,{frontmatter:r.frontmatter,data:r.data},{"main-content-md":s(()=>[A,D,C(" more "),l("h2",f,[e("各发行版之间最浅显的区别 "),a(o,{class:"header-anchor",href:"#各发行版之间最浅显的区别","aria-hidden":"true"},{default:s(()=>[e("#")]),_:1})]),g,x,v,F,l("h2",k,[e("之前上过的 Unix 选修课 "),a(o,{class:"header-anchor",href:"#之前上过的-unix-选修课","aria-hidden":"true"},{default:s(()=>[e("#")]),_:1})]),E,l("h3",b,[e("从文件开始 "),a(o,{class:"header-anchor",href:"#从文件开始","aria-hidden":"true"},{default:s(()=>[e("#")]),_:1})]),w,L,$,l("h3",B,[e("我是谁？我在哪？ "),a(o,{class:"header-anchor",href:"#我是谁？我在哪？","aria-hidden":"true"},{default:s(()=>[e("#")]),_:1})]),S,U,l("h3",O,[e("积木 OR 砖瓦 "),a(o,{class:"header-anchor",href:"#积木-or-砖瓦","aria-hidden":"true"},{default:s(()=>[e("#")]),_:1})]),N,W,T,R,l("h2",V,[e("一些奇怪的小知识 "),a(o,{class:"header-anchor",href:"#一些奇怪的小知识","aria-hidden":"true"},{default:s(()=>[e("#")]),_:1})]),Z,l("h2",I,[e("如果是 WSL…… "),a(o,{class:"header-anchor",href:"#如果是-wsl","aria-hidden":"true"},{default:s(()=>[e("#")]),_:1})]),M,l("h2",J,[e("使用之后的感受 "),a(o,{class:"header-anchor",href:"#使用之后的感受","aria-hidden":"true"},{default:s(()=>[e("#")]),_:1})]),P]),"main-header":s(()=>[t(n.$slots,"main-header")]),"main-header-after":s(()=>[t(n.$slots,"main-header-after")]),"main-nav":s(()=>[t(n.$slots,"main-nav")]),"main-content":s(()=>[t(n.$slots,"main-content")]),"main-content-after":s(()=>[t(n.$slots,"main-content-after")]),"main-nav-before":s(()=>[t(n.$slots,"main-nav-before")]),"main-nav-after":s(()=>[t(n.$slots,"main-nav-after")]),comment:s(()=>[t(n.$slots,"comment")]),footer:s(()=>[t(n.$slots,"footer")]),aside:s(()=>[t(n.$slots,"aside")]),"aside-custom":s(()=>[t(n.$slots,"aside-custom")]),default:s(()=>[t(n.$slots,"default")]),_:3},8,["frontmatter","data"])}const sl=p(y,[["render",Q]]);export{el as __pageData,sl as default};
