import{_ as r}from"./ValaxyMain.vue_vue_type_style_index_0_lang-40050c3d.js";import{_ as C,c as A,w as n,o as d,b as s,d as l,e,r as o,f as y,p as h}from"./app-025bdceb.js";import"./YunFooter.vue_vue_type_script_setup_true_lang-dd4500d1.js";import"./YunCard.vue_vue_type_style_index_0_lang-c0980680.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-870a2da2.js";const is=JSON.parse('{"title":"1.汇编初步","description":"","frontmatter":{"title":"1.汇编初步","categories":["快去学习"],"tags":["学习笔记","汇编"],"draft":false,"slug":"56","date":"2021-03-10T15:26:00.000Z","updated":"2021-03-10T15:26:00.000Z"},"headers":[{"level":2,"title":"汇编初步","slug":"汇编初步","link":"#汇编初步","children":[{"level":3,"title":"机器指令","slug":"机器指令","link":"#机器指令","children":[]},{"level":3,"title":"通用寄存器","slug":"通用寄存器","link":"#通用寄存器","children":[]},{"level":3,"title":"AT&T汇编代码","slug":"at-t汇编代码","link":"#at-t汇编代码","children":[]}]}],"relativePath":"pages/posts/learning/assembly.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/learning/assembly.md","lastUpdated":1699970883000}'),c=JSON.parse('{"title":"1.汇编初步","description":"","frontmatter":{"title":"1.汇编初步","categories":["快去学习"],"tags":["学习笔记","汇编"],"draft":false,"slug":"56","date":"2021-03-10T15:26:00.000Z","updated":"2021-03-10T15:26:00.000Z"},"headers":[{"level":2,"title":"汇编初步","slug":"汇编初步","link":"#汇编初步","children":[{"level":3,"title":"机器指令","slug":"机器指令","link":"#机器指令","children":[]},{"level":3,"title":"通用寄存器","slug":"通用寄存器","link":"#通用寄存器","children":[]},{"level":3,"title":"AT&T汇编代码","slug":"at-t汇编代码","link":"#at-t汇编代码","children":[]}]}],"relativePath":"pages/posts/learning/assembly.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/learning/assembly.md","lastUpdated":1699970883000}'),u={name:"pages/posts/learning/assembly.md",data(){return{data:c,frontmatter:c.frontmatter}},setup(){h("pageData",c)}},D={id:"_2020-2021-2-计算机系统",tabindex:"-1"},g=s("p",null,"2020-2021学年第二学期 计算机系统",-1),m=s("p",null,"基于32位系统",-1),b=s("p",null,"随上课进度更新",-1),x={id:"汇编初步",tabindex:"-1"},_={id:"机器指令",tabindex:"-1"},f=s("div",{class:"language-txt"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"00000000 <_start>:")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"   0:   90")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"   1:   ……")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])],-1),v=s("p",null,"地址：指令数",-1),k=s("p",null,"一行对应一条指令",-1),$={id:"通用寄存器",tabindex:"-1"},w=s("table",null,[s("thead",null,[s("tr",null,[s("th",{style:{"text-align":"center"}},"%eax"),s("th",{style:{"text-align":"center"}},"%ax"),s("th",{style:{"text-align":"center"}},"%ah"),s("th",{style:{"text-align":"center"}},"%al")])]),s("tbody",null,[s("tr",null,[s("td",{style:{"text-align":"center"}},"31-0"),s("td",{style:{"text-align":"center"}},"15-0"),s("td",{style:{"text-align":"center"}},"15-8"),s("td",{style:{"text-align":"center"}},"7-0")])])],-1),T=s("p",null,"（命名方式与发展过程相关）",-1),B={id:"at-t汇编代码",tabindex:"-1"},F=s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"格式：指令 源操作数,目的操作数")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"示例：movl $8,%eax0")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])],-1),S=s("ul",null,[s("li",null,[l("操作数 "),s("ul",null,[s("li",null,"立即数"),s("li",null,"寄存器"),s("li",null,"存储器")])])],-1),j={id:"汇编示例",tabindex:"-1"},E=s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}}," .section .text")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}}," .global _start")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}}," _start:")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"     nop")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"     mov $0x4, %eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"     sarl %eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"     movw $1, %bx")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"     movb $0xff65, %dh")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"     movl $13, %edx")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"     movl $1, %eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"     movl $0, %ebx")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"     int $0x80")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])],-1),N={id:"tip：gcc编译",tabindex:"-1"},q=s("ul",null,[s("li",null,[s("p",null,"预处理"),s("p",null,[s("code",null,"gcc -E main.c -o main.i")])]),s("li",null,[s("p",null,"编译"),s("p",null,[s("code",null,"gcc -S main.i -o main.s")])]),s("li",null,[s("p",null,"汇编"),s("p",null,[s("code",null,"gcc -c main.s -o main.o")])]),s("li",null,[s("p",null,"链接"),s("p",null,[s("code",null,"gcc main.o -o main")])])],-1),V={id:"tip：gdb调试相关",tabindex:"-1"},Z=s("ul",null,[s("li",null,[s("p",null,"启动gdb"),s("div",{class:"language-shell"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#FFCB6B"}},"gdb"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#C3E88D"}},"xxx")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#FFCB6B"}},"可以通过--silent、-q和--quiet选项取消输出免责条款")]),l(`
`),s("span",{class:"line"})])])])]),s("li",null,[s("p",null,"常用命令"),s("div",{class:"language-txt"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"编译程序时需要加上-g，之后才能用gdb进行调试：gcc -g main.c -o main")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"gdb中命令：")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"回车键：重复上一命令")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）help：查看命令帮助，具体命令查询在gdb中输入help + 命令，简写h")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）run：重新开始运行文件（run-text：加载文本文件，run-bin：加载二进制文件），简写r")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）start：单步执行，运行程序，停在第一执行语句")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）list：查看原代码（list-n,从第n行开始查看代码。list+ 函数名：查看具体函数），简写l")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）set：设置变量的值")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）next：单步调试（逐过程，函数直接执行），简写n")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）step：单步调试（逐语句：跳入自定义函数内部执行），简写s")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）backtrace：查看函数的调用的栈帧和层级关系，简写bt")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）frame：切换函数的栈帧，简写f")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）info：查看函数内部局部变量的数值，简写i")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）finish：结束当前函数，返回到函数调用点")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）continue：继续运行，简写c")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）print：打印值及地址，简写p")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）quit：退出gdb，简写q")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）break+num：在第num行设置断点，简写b")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）info breakpoints：查看当前设置的所有断点")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）delete breakpoints num：删除第num个断点，简写d")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）display：追踪查看具体变量值")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）undisplay：取消追踪观察变量")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）watch：被设置观察点的变量发生修改时，打印显示")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）i watch：显示观察点")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）enable breakpoints：启用断点")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）disable breakpoints：禁用断点")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）x：查看内存x/20xw 显示20个单元，16进制，4字节每单元")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）run argv[1] argv[2]：调试时命令行传参")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"（gdb）set follow-fork-mode child#Makefile项目管理：选择跟踪父子进程（fork()）")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"core文件：先用$ ulimit -c 1024 开启core，当程序出错会自动生成core文件。调试时 gdb a.out core")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"ctrl+c：退出输入")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"gdb的examine命令："),s("div",{class:"language-txt"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"x/<n/f/u>  <addr>")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"n:是正整数，表示需要显示的内存单元的个数，即从当前地址向后显示n个内存单元的内容，")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"一个内存单元的大小由第三个参数u定义。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}}," f:表示addr指向的内存内容的输出格式，s对应输出字符串，此处需特别注意输出整型数据的格式：")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  x 按十六进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  d 按十进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  u 按十进制格式显示无符号整型；")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  o 按八进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  t 按二进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  a 按十六进制格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  c 按字符格式显示变量；")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  f 按浮点数格式显示变量。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"u:就是指以多少个字节作为一个内存单元-unit,默认为4。u还可以用被一些字符表示:")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  如b=1 byte, h=2 bytes,w=4 bytes,g=8 bytes。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"<addr>:表示内存地址。")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])])],-1),P={id:"tip：objdump反汇编",tabindex:"-1"},J=s("div",{class:"language-shell"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#FFCB6B"}},"objdump"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#C3E88D"}},"-d"),s("span",{style:{color:"#A6ACCD"}}," "),s("span",{style:{color:"#C3E88D"}},"xxx")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#FFCB6B"}},"将代码段反汇编")]),l(`
`),s("span",{class:"line"})])])],-1),L={id:"数据传送",tabindex:"-1"},M=s("ul",null,[s("li",null,"movl 32位 (4字节)"),s("li",null,"movw 16位"),s("li",null,"movb 8位")],-1),O={id:"寻址方式",tabindex:"-1"},R=s("ul",null,[s("li",null,[s("p",null,"立即数寻址"),s("div",{class:"language-assambly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"movl $1,%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"将1传给%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"寄存器寻址"),s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"movl %ebx,%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"将%ebx的内容传给%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"绝对寻址"),s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"movl 0x08048054,%eax`")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"以地址0x08048054访问内存，将对应内容传给%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"间接寻址"),s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"movl (%ebx),%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"以%ebx的内容作为地址访问内存，将内存对应内容传给%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"基址偏移量寻址"),s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"0x8(%ebx),%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"%ebx的内容+8作为地址")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"变址寻址"),s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"(%ebx,%edx),%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"%ebx、%edx内容相加作为地址")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"变址基址寻址"),s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"movl 0x8(%ebx,%edx),%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"%ebx、%edx内容相加再+8作为地址")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"比例变址寻址"),s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"(%ebx,%ecx,0x2),%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"%ecx、0x2相乘再与%ebx相加作为地址")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"比例变址基址寻址"),s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"movl 0x8(%ebx,%ecx,0x2),%eax")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"%ecx、0x2相乘再与%ebx相加，再加8作为地址")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])]),s("li",null,[s("p",null,"总结"),s("div",{class:"language-assembly"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"D(rb, ri, S) ")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"mem[Reg[rb]+Reg[ri]*S+D]")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])])])],-1),U={id:"lea指令",tabindex:"-1"},z=s("p",null,"lea：Load Effective Address",-1),G=s("p",null,"可以用来将一个内存地址直接赋给目的操作数",-1),H={id:"栈",tabindex:"-1"},I=s("p",null,"先进后出；",-1),K=s("p",null,"向“下”（低地址方向）增长；",-1),Q=s("p",null,"栈顶指针保存在%esp中 指示最新的数据；",-1),W=s("p",null,"P115",-1);function X(t,Y,ss,ls,i,ns){const a=y,p=r;return d(),A(p,{frontmatter:i.frontmatter,data:i.data},{"main-content-md":n(()=>[s("h1",D,[l("2020-2021-2 计算机系统 "),e(a,{class:"header-anchor",href:"#_2020-2021-2-计算机系统","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),g,m,b,s("h2",x,[l("汇编初步 "),e(a,{class:"header-anchor",href:"#汇编初步","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),s("h3",_,[l("机器指令 "),e(a,{class:"header-anchor",href:"#机器指令","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),f,v,k,s("h3",$,[l("通用寄存器 "),e(a,{class:"header-anchor",href:"#通用寄存器","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),w,T,s("h3",B,[l("AT&T汇编代码 "),e(a,{class:"header-anchor",href:"#at-t汇编代码","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),F,S,s("h4",j,[l("汇编示例 "),e(a,{class:"header-anchor",href:"#汇编示例","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),E,s("h5",N,[l("Tip：gcc编译 "),e(a,{class:"header-anchor",href:"#tip：gcc编译","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),q,s("h5",V,[l("Tip：gdb调试相关 "),e(a,{class:"header-anchor",href:"#tip：gdb调试相关","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),s("p",null,[e(a,{href:"https://www.jianshu.com/p/589308dd36dc",target:"_blank",rel:"noreferrer"},{default:n(()=>[l("参考简书Adam_0的文章")]),_:1})]),Z,s("h5",P,[l("Tip：objdump反汇编 "),e(a,{class:"header-anchor",href:"#tip：objdump反汇编","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),J,s("p",null,[e(a,{href:"https://blog.csdn.net/wwchao2012/article/details/79980514",target:"_blank",rel:"noreferrer"},{default:n(()=>[l("可参考这篇文章")]),_:1})]),s("h4",L,[l("数据传送 "),e(a,{class:"header-anchor",href:"#数据传送","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),M,s("h4",O,[l("寻址方式 "),e(a,{class:"header-anchor",href:"#寻址方式","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),R,s("h4",U,[l("lea指令 "),e(a,{class:"header-anchor",href:"#lea指令","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),z,G,s("h4",H,[l("栈 "),e(a,{class:"header-anchor",href:"#栈","aria-hidden":"true"},{default:n(()=>[l("#")]),_:1})]),I,K,Q,W]),"main-header":n(()=>[o(t.$slots,"main-header")]),"main-header-after":n(()=>[o(t.$slots,"main-header-after")]),"main-nav":n(()=>[o(t.$slots,"main-nav")]),"main-content":n(()=>[o(t.$slots,"main-content")]),"main-content-after":n(()=>[o(t.$slots,"main-content-after")]),"main-nav-before":n(()=>[o(t.$slots,"main-nav-before")]),"main-nav-after":n(()=>[o(t.$slots,"main-nav-after")]),comment:n(()=>[o(t.$slots,"comment")]),footer:n(()=>[o(t.$slots,"footer")]),aside:n(()=>[o(t.$slots,"aside")]),"aside-custom":n(()=>[o(t.$slots,"aside-custom")]),default:n(()=>[o(t.$slots,"default")]),_:3},8,["frontmatter","data"])}const ps=C(u,[["render",X]]);export{is as __pageData,ps as default};
