import{_ as r}from"./ValaxyMain.vue_vue_type_style_index_0_lang-W4huc0WW.js";import{A as h,f as b,o as g,w as a,Q as e,a as s,H as l,e as m,ad as o}from"./app-1HJeoz-c.js";import"./YunComment.vue_vue_type_style_index_0_lang-l30xdsKI.js";import"./index-C5okkQwF.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-DgsY1z78.js";import"./post-BWvOEICl.js";const w={__name:"assembly",setup(v,{expose:u}){const i=JSON.parse('{"title":"1.汇编初步","description":"","frontmatter":{"title":"1.汇编初步","categories":["快去学习"],"tags":["学习笔记","汇编"],"draft":false,"slug":"56","date":"2021-03-10 15:26:00","updated":"2021-03-10 15:26:00"},"headers":[{"level":2,"title":"汇编初步","slug":"汇编初步","link":"#汇编初步","children":[{"level":3,"title":"机器指令","slug":"机器指令","link":"#机器指令","children":[]},{"level":3,"title":"通用寄存器","slug":"通用寄存器","link":"#通用寄存器","children":[]},{"level":3,"title":"AT&T汇编代码","slug":"at-t汇编代码","link":"#at-t汇编代码","children":[]}]}],"relativePath":"pages/posts/learning/assembly.md","path":"/home/runner/work/chldu2000.github.io/chldu2000.github.io/pages/posts/learning/assembly.md","lastUpdated":1769604377000}'),t=h(),p=i.frontmatter||{};return t.meta.frontmatter=Object.assign(t.meta.frontmatter||{},i.frontmatter||{}),o("pageData",i),o("valaxy:frontmatter",p),globalThis.$frontmatter=p,u({frontmatter:{title:"1.汇编初步",categories:["快去学习"],tags:["学习笔记","汇编"],draft:!1,slug:"56",date:"2021-03-10 15:26:00",updated:"2021-03-10 15:26:00"}}),(n,c)=>{const d=r;return g(),b(d,{frontmatter:m(p)},{"main-content-md":a(()=>c[0]||(c[0]=[s("h1",{id:"_2020-2021-2-计算机系统",tabindex:"-1"},[l("2020-2021-2 计算机系统 "),s("a",{class:"header-anchor",href:"#_2020-2021-2-计算机系统","aria-label":'Permalink to "2020-2021-2 计算机系统"'},"​")],-1),s("p",null,"2020-2021学年第二学期 计算机系统",-1),s("p",null,"基于32位系统",-1),s("p",null,"随上课进度更新",-1),s("h2",{id:"汇编初步",tabindex:"-1"},[l("汇编初步 "),s("a",{class:"header-anchor",href:"#汇编初步","aria-label":'Permalink to "汇编初步"'},"​")],-1),s("h3",{id:"机器指令",tabindex:"-1"},[l("机器指令 "),s("a",{class:"header-anchor",href:"#机器指令","aria-label":'Permalink to "机器指令"'},"​")],-1),s("div",{class:"language-txt vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"txt"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"00000000 <_start>:")]),l(`
`),s("span",{class:"line"},[s("span",null,"   0:   90")]),l(`
`),s("span",{class:"line"},[s("span",null,"   1:   ……")])])]),s("button",{class:"collapse"})],-1),s("p",null,"地址：指令数",-1),s("p",null,"一行对应一条指令",-1),s("h3",{id:"通用寄存器",tabindex:"-1"},[l("通用寄存器 "),s("a",{class:"header-anchor",href:"#通用寄存器","aria-label":'Permalink to "通用寄存器"'},"​")],-1),s("table",null,[s("thead",null,[s("tr",null,[s("th",{style:{"text-align":"center"}},"%eax"),s("th",{style:{"text-align":"center"}},"%ax"),s("th",{style:{"text-align":"center"}},"%ah"),s("th",{style:{"text-align":"center"}},"%al")])]),s("tbody",null,[s("tr",null,[s("td",{style:{"text-align":"center"}},"31-0"),s("td",{style:{"text-align":"center"}},"15-0"),s("td",{style:{"text-align":"center"}},"15-8"),s("td",{style:{"text-align":"center"}},"7-0")])])],-1),s("p",null,"（命名方式与发展过程相关）",-1),s("h3",{id:"at-t汇编代码",tabindex:"-1"},[l("AT&T汇编代码 "),s("a",{class:"header-anchor",href:"#at-t汇编代码","aria-label":'Permalink to "AT&T汇编代码"'},"​")],-1),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"格式：指令 源操作数,目的操作数")]),l(`
`),s("span",{class:"line"},[s("span",null,"示例：movl $8,%eax0")])])]),s("button",{class:"collapse"})],-1),s("ul",null,[s("li",null,[l("操作数 "),s("ul",null,[s("li",null,"立即数"),s("li",null,"寄存器"),s("li",null,"存储器")])])],-1),s("h4",{id:"汇编示例",tabindex:"-1"},[l("汇编示例 "),s("a",{class:"header-anchor",href:"#汇编示例","aria-label":'Permalink to "汇编示例"'},"​")],-1),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null," .section .text")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null," .global _start")]),l(`
`),s("span",{class:"line"},[s("span",null," _start:")]),l(`
`),s("span",{class:"line"},[s("span",null,"     nop")]),l(`
`),s("span",{class:"line"},[s("span",null,"     mov $0x4, %eax")]),l(`
`),s("span",{class:"line"},[s("span",null,"     sarl %eax")]),l(`
`),s("span",{class:"line"},[s("span",null,"     movw $1, %bx")]),l(`
`),s("span",{class:"line"},[s("span",null,"     movb $0xff65, %dh")]),l(`
`),s("span",{class:"line"},[s("span",null,"     movl $13, %edx")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"     movl $1, %eax")]),l(`
`),s("span",{class:"line"},[s("span",null,"     movl $0, %ebx")]),l(`
`),s("span",{class:"line"},[s("span",null,"     int $0x80")])])]),s("button",{class:"collapse"})],-1),s("h5",{id:"tip-gcc编译",tabindex:"-1"},[l("Tip：gcc编译 "),s("a",{class:"header-anchor",href:"#tip-gcc编译","aria-label":'Permalink to "Tip：gcc编译"'},"​")],-1),s("ul",null,[s("li",null,[s("p",null,"预处理"),s("p",null,[s("code",null,"gcc -E main.c -o main.i")])]),s("li",null,[s("p",null,"编译"),s("p",null,[s("code",null,"gcc -S main.i -o main.s")])]),s("li",null,[s("p",null,"汇编"),s("p",null,[s("code",null,"gcc -c main.s -o main.o")])]),s("li",null,[s("p",null,"链接"),s("p",null,[s("code",null,"gcc main.o -o main")])])],-1),s("h5",{id:"tip-gdb调试相关",tabindex:"-1"},[l("Tip：gdb调试相关 "),s("a",{class:"header-anchor",href:"#tip-gdb调试相关","aria-label":'Permalink to "Tip：gdb调试相关"'},"​")],-1),s("p",null,[s("a",{href:"https://www.jianshu.com/p/589308dd36dc",target:"_blank",rel:"noreferrer"},"参考简书Adam_0的文章")],-1),s("ul",null,[s("li",null,[s("p",null,"启动gdb"),s("div",{class:"language-shell vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"shell"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"gdb"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," xxx")]),l(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"可以通过--silent、-q和--quiet选项取消输出免责条款")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"常用命令"),s("div",{class:"language-txt vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"txt"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"编译程序时需要加上-g，之后才能用gdb进行调试：gcc -g main.c -o main")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"gdb中命令：")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"回车键：重复上一命令")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）help：查看命令帮助，具体命令查询在gdb中输入help + 命令，简写h")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）run：重新开始运行文件（run-text：加载文本文件，run-bin：加载二进制文件），简写r")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）start：单步执行，运行程序，停在第一执行语句")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）list：查看原代码（list-n,从第n行开始查看代码。list+ 函数名：查看具体函数），简写l")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）set：设置变量的值")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）next：单步调试（逐过程，函数直接执行），简写n")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）step：单步调试（逐语句：跳入自定义函数内部执行），简写s")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）backtrace：查看函数的调用的栈帧和层级关系，简写bt")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）frame：切换函数的栈帧，简写f")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）info：查看函数内部局部变量的数值，简写i")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）finish：结束当前函数，返回到函数调用点")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）continue：继续运行，简写c")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）print：打印值及地址，简写p")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）quit：退出gdb，简写q")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）break+num：在第num行设置断点，简写b")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）info breakpoints：查看当前设置的所有断点")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）delete breakpoints num：删除第num个断点，简写d")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）display：追踪查看具体变量值")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）undisplay：取消追踪观察变量")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）watch：被设置观察点的变量发生修改时，打印显示")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）i watch：显示观察点")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）enable breakpoints：启用断点")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）disable breakpoints：禁用断点")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）x：查看内存x/20xw 显示20个单元，16进制，4字节每单元")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）run argv[1] argv[2]：调试时命令行传参")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"（gdb）set follow-fork-mode child#Makefile项目管理：选择跟踪父子进程（fork()）")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"core文件：先用$ ulimit -c 1024 开启core，当程序出错会自动生成core文件。调试时 gdb a.out core")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"ctrl+c：退出输入")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"gdb的examine命令："),s("div",{class:"language-txt vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"txt"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"x/<n/f/u>  <addr>")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"n:是正整数，表示需要显示的内存单元的个数，即从当前地址向后显示n个内存单元的内容，")]),l(`
`),s("span",{class:"line"},[s("span",null,"一个内存单元的大小由第三个参数u定义。")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null," f:表示addr指向的内存内容的输出格式，s对应输出字符串，此处需特别注意输出整型数据的格式：")]),l(`
`),s("span",{class:"line"},[s("span",null,"  x 按十六进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",null,"  d 按十进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",null,"  u 按十进制格式显示无符号整型；")]),l(`
`),s("span",{class:"line"},[s("span",null,"  o 按八进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",null,"  t 按二进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",null,"  a 按十六进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",null,"  c 按字符格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",null,"  f 按浮点数格式显示变量。")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"u:就是指以多少个字节作为一个内存单元-unit,默认为4。u还可以用被一些字符表示:")]),l(`
`),s("span",{class:"line"},[s("span",null,"  如b=1 byte, h=2 bytes,w=4 bytes,g=8 bytes。")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"<addr>:表示内存地址。")])])]),s("button",{class:"collapse"})])])],-1),s("h5",{id:"tip-objdump反汇编",tabindex:"-1"},[l("Tip：objdump反汇编 "),s("a",{class:"header-anchor",href:"#tip-objdump反汇编","aria-label":'Permalink to "Tip：objdump反汇编"'},"​")],-1),s("div",{class:"language-shell vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"shell"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"objdump"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," -d"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," xxx")]),l(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"将代码段反汇编")])])]),s("button",{class:"collapse"})],-1),s("p",null,[s("a",{href:"https://blog.csdn.net/wwchao2012/article/details/79980514",target:"_blank",rel:"noreferrer"},"可参考这篇文章")],-1),s("h4",{id:"数据传送",tabindex:"-1"},[l("数据传送 "),s("a",{class:"header-anchor",href:"#数据传送","aria-label":'Permalink to "数据传送"'},"​")],-1),s("ul",null,[s("li",null,"movl 32位 (4字节)"),s("li",null,"movw 16位"),s("li",null,"movb 8位")],-1),s("h4",{id:"寻址方式",tabindex:"-1"},[l("寻址方式 "),s("a",{class:"header-anchor",href:"#寻址方式","aria-label":'Permalink to "寻址方式"'},"​")],-1),s("ul",null,[s("li",null,[s("p",null,"立即数寻址"),s("div",{class:"language-assambly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assambly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"movl $1,%eax")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"将1传给%eax")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"寄存器寻址"),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"movl %ebx,%eax")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"将%ebx的内容传给%eax")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"绝对寻址"),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"movl 0x08048054,%eax`")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"以地址0x08048054访问内存，将对应内容传给%eax")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"间接寻址"),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"movl (%ebx),%eax")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"以%ebx的内容作为地址访问内存，将内存对应内容传给%eax")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"基址偏移量寻址"),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"0x8(%ebx),%eax")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"%ebx的内容+8作为地址")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"变址寻址"),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"(%ebx,%edx),%eax")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"%ebx、%edx内容相加作为地址")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"变址基址寻址"),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"movl 0x8(%ebx,%edx),%eax")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"%ebx、%edx内容相加再+8作为地址")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"比例变址寻址"),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"(%ebx,%ecx,0x2),%eax")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"%ecx、0x2相乘再与%ebx相加作为地址")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"比例变址基址寻址"),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"movl 0x8(%ebx,%ecx,0x2),%eax")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"%ecx、0x2相乘再与%ebx相加，再加8作为地址")])])]),s("button",{class:"collapse"})])]),s("li",null,[s("p",null,"总结"),s("div",{class:"language-assembly vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"assembly"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",{"v-pre":""},[s("span",{class:"line"},[s("span",null,"D(rb, ri, S) ")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"mem[Reg[rb]+Reg[ri]*S+D]")])])]),s("button",{class:"collapse"})])])],-1),s("h4",{id:"lea指令",tabindex:"-1"},[l("lea指令 "),s("a",{class:"header-anchor",href:"#lea指令","aria-label":'Permalink to "lea指令"'},"​")],-1),s("p",null,"lea：Load Effective Address",-1),s("p",null,"可以用来将一个内存地址直接赋给目的操作数",-1),s("h4",{id:"栈",tabindex:"-1"},[l("栈 "),s("a",{class:"header-anchor",href:"#栈","aria-label":'Permalink to "栈"'},"​")],-1),s("p",null,"先进后出；",-1),s("p",null,"向“下”（低地址方向）增长；",-1),s("p",null,"栈顶指针保存在%esp中 指示最新的数据；",-1),s("p",null,"P115",-1)])),"main-header":a(()=>[e(n.$slots,"main-header")]),"main-header-after":a(()=>[e(n.$slots,"main-header-after")]),"main-nav":a(()=>[e(n.$slots,"main-nav")]),"main-content":a(()=>[e(n.$slots,"main-content")]),"main-content-after":a(()=>[e(n.$slots,"main-content-after")]),"main-nav-before":a(()=>[e(n.$slots,"main-nav-before")]),"main-nav-after":a(()=>[e(n.$slots,"main-nav-after")]),comment:a(()=>[e(n.$slots,"comment")]),footer:a(()=>[e(n.$slots,"footer")]),aside:a(()=>[e(n.$slots,"aside")]),"aside-custom":a(()=>[e(n.$slots,"aside-custom")]),default:a(()=>[e(n.$slots,"default")]),_:3},8,["frontmatter"])}}};export{w as default};
