import{_ as d}from"./ValaxyMain.vue_vue_type_style_index_0_lang-40050c3d.js";import{_ as p,c as h,w as l,o as u,b as e,d as t,e as n,a as g,r as o,f as _,p as m}from"./app-025bdceb.js";import"./YunFooter.vue_vue_type_script_setup_true_lang-dd4500d1.js";import"./YunCard.vue_vue_type_style_index_0_lang-c0980680.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-870a2da2.js";const j=JSON.parse('{"title":"把站点迁移到GitHub","description":"","frontmatter":{"title":"把站点迁移到GitHub","categories":["站点里程碑"],"tags":["blog"],"date":"2021-05-23T14:57:20.000Z","updated":"2021-05-23T14:57:20.000Z","draft":false,"slug":"move_to_github"},"headers":[{"level":2,"title":"起因","slug":"起因","link":"#起因","children":[]},{"level":2,"title":"导出","slug":"导出","link":"#导出","children":[{"level":3,"title":"然而","slug":"然而","link":"#然而","children":[]}]},{"level":2,"title":"主题和配置","slug":"主题和配置","link":"#主题和配置","children":[]},{"level":2,"title":"启用GitHub Pages","slug":"启用github-pages","link":"#启用github-pages","children":[]},{"level":2,"title":"图床","slug":"图床","link":"#图床","children":[]},{"level":2,"title":"今后的打算","slug":"今后的打算","link":"#今后的打算","children":[]}],"relativePath":"pages/posts/log/move_to_github.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/log/move_to_github.md","lastUpdated":1699970883000}'),r=JSON.parse('{"title":"把站点迁移到GitHub","description":"","frontmatter":{"title":"把站点迁移到GitHub","categories":["站点里程碑"],"tags":["blog"],"date":"2021-05-23T14:57:20.000Z","updated":"2021-05-23T14:57:20.000Z","draft":false,"slug":"move_to_github"},"headers":[{"level":2,"title":"起因","slug":"起因","link":"#起因","children":[]},{"level":2,"title":"导出","slug":"导出","link":"#导出","children":[{"level":3,"title":"然而","slug":"然而","link":"#然而","children":[]}]},{"level":2,"title":"主题和配置","slug":"主题和配置","link":"#主题和配置","children":[]},{"level":2,"title":"启用GitHub Pages","slug":"启用github-pages","link":"#启用github-pages","children":[]},{"level":2,"title":"图床","slug":"图床","link":"#图床","children":[]},{"level":2,"title":"今后的打算","slug":"今后的打算","link":"#今后的打算","children":[]}],"relativePath":"pages/posts/log/move_to_github.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/log/move_to_github.md","lastUpdated":1699970883000}'),f={name:"pages/posts/log/move_to_github.md",data(){return{data:r,frontmatter:r.frontmatter}},setup(){m("pageData",r)}},y={id:"起因",tabindex:"-1"},C=e("p",null,"原因很简单，为了节省服务器经费~~（钱包空空）~~，服务器摆在那里，资源也没有充分利用起来。",-1),b={id:"导出",tabindex:"-1"},v=e("code",null,"/tmp/Export2Hugo",-1),D={id:"然而",tabindex:"-1"},A=e("p",null,"经过一番折腾还是换了Hexo，不过之前导出的文件倒是可以直接用。",-1),k=e("p",null,"有一说一，就生成文章的速度来看，还是Hugo更胜一筹。",-1),E={id:"主题和配置",tabindex:"-1"},$=e("p",null,[t("在"),e("code",null,"source"),t("目录下面新建目录"),e("code",null,"_data"),t("，新建一个"),e("code",null,"yun.yml"),t("，按照主题说明文档来改就可以。")],-1),B=e("p",null,"安装的必要插件和额外依赖库：",-1),x=e("div",{class:"language-shell"},[e("span",{class:"copy"}),e("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{color:"#676E95","font-style":"italic"}},"# 渲染器")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#FFCB6B"}},"npm"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"install"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"hexo-render-pug"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"hexo-renderer-stylus"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"--save")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#676E95","font-style":"italic"}},"# 标签")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#FFCB6B"}},"npm"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"install"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"hexo-generator-tag")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#676E95","font-style":"italic"}},"# 分类")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#FFCB6B"}},"npm"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"install"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"hexo-generator-category")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#676E95","font-style":"italic"}},"# 部署")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#FFCB6B"}},"npm"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"install"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"hexo-deployer-git")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#676E95","font-style":"italic"}},"# 字数统计")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#FFCB6B"}},"npm"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"install"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"hexo-wordcount")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#676E95","font-style":"italic"}},"# RSS")]),t(`
`),e("span",{class:"line"},[e("span",{style:{color:"#FFCB6B"}},"npm"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"install"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"hexo-generator-feed"),e("span",{style:{color:"#A6ACCD"}}," "),e("span",{style:{color:"#C3E88D"}},"--save")]),t(`
`),e("span",{class:"line"})])])],-1),H=e("p",null,"暂时就这些，要用到别的以后还可以再配嘛。",-1),F={id:"启用github-pages",tabindex:"-1"},S=e("p",null,[t("这个就不多说了，建仓库开Pages服务还有域名解析。域名解析记录可以直接用"),e("strong",null,"CNAME"),t("指向GitHub给的默认域名。")],-1),G={id:"图床",tabindex:"-1"},N=e("strong",null,"PicGo",-1),P={id:"今后的打算",tabindex:"-1"},T=e("p",null,"之前发的那些题解水文就不删了，~~不然没有内容，~~今后题解水文如果发也可能只有一些思路，更具体的应该会放到CSDN上吧。学习笔记什么的会用语雀之类的平台。用主题提供的post type做成外部链接也不错。",-1),M=e("p",null,"还是希望这里能够成为更个性化的空间。",-1);function w(s,V,Z,z,i,J){const a=_,c=d;return u(),h(c,{frontmatter:i.frontmatter,data:i.data},{"main-content-md":l(()=>[e("h2",y,[t("起因 "),n(a,{class:"header-anchor",href:"#起因","aria-hidden":"true"},{default:l(()=>[t("#")]),_:1})]),C,g(" more "),e("h2",b,[t("导出 "),n(a,{class:"header-anchor",href:"#导出","aria-hidden":"true"},{default:l(()=>[t("#")]),_:1})]),e("p",null,[t("把文章从Typecho导出到Hugo主要是通过这个插件来完成的："),n(a,{href:"https://github.com/lizheming/typecho-export-hugo",target:"_blank",rel:"noreferrer"},{default:l(()=>[t("Typecho 博客文章导出至 Hugo 插件")]),_:1}),t("。")]),e("p",null,[t("然而我得到的zip文件老是无法解压，看了"),n(a,{href:"https://github.com/lizheming/typecho-export-hugo/issues/2",target:"_blank",rel:"noreferrer"},{default:l(()=>[t("issue")]),_:1}),t("之后去"),v,t("下面找才找到导出的文件。把导出的content文件夹扔到Hugo的目录下面，嗯，最基本的部分就完成了。")]),e("h3",D,[t("然而 "),n(a,{class:"header-anchor",href:"#然而","aria-hidden":"true"},{default:l(()=>[t("#")]),_:1})]),A,k,e("h2",E,[t("主题和配置 "),n(a,{class:"header-anchor",href:"#主题和配置","aria-hidden":"true"},{default:l(()=>[t("#")]),_:1})]),e("p",null,[t("使用了云游君大佬的"),n(a,{href:"https://github.com/YunYouJun/hexo-theme-yun",target:"_blank",rel:"noreferrer"},{default:l(()=>[t("Yun")]),_:1}),t("主题。")]),$,B,x,H,e("h2",F,[t("启用GitHub Pages "),n(a,{class:"header-anchor",href:"#启用github-pages","aria-hidden":"true"},{default:l(()=>[t("#")]),_:1})]),S,e("h2",G,[t("图床 "),n(a,{class:"header-anchor",href:"#图床","aria-hidden":"true"},{default:l(()=>[t("#")]),_:1})]),e("p",null,[t("使用了"),e("strong",null,[n(a,{href:"http://SM.MS",target:"_blank",rel:"noreferrer"},{default:l(()=>[t("SM.MS")]),_:1})]),t("免费版和"),N,t("的组合，先这样吧~~（钱包空空）~~。")]),e("h2",P,[t("今后的打算 "),n(a,{class:"header-anchor",href:"#今后的打算","aria-hidden":"true"},{default:l(()=>[t("#")]),_:1})]),T,M]),"main-header":l(()=>[o(s.$slots,"main-header")]),"main-header-after":l(()=>[o(s.$slots,"main-header-after")]),"main-nav":l(()=>[o(s.$slots,"main-nav")]),"main-content":l(()=>[o(s.$slots,"main-content")]),"main-content-after":l(()=>[o(s.$slots,"main-content-after")]),"main-nav-before":l(()=>[o(s.$slots,"main-nav-before")]),"main-nav-after":l(()=>[o(s.$slots,"main-nav-after")]),comment:l(()=>[o(s.$slots,"comment")]),footer:l(()=>[o(s.$slots,"footer")]),aside:l(()=>[o(s.$slots,"aside")]),"aside-custom":l(()=>[o(s.$slots,"aside-custom")]),default:l(()=>[o(s.$slots,"default")]),_:3},8,["frontmatter","data"])}const q=p(f,[["render",w]]);export{j as __pageData,q as default};