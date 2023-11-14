import{_ as h}from"./ValaxyMain.vue_vue_type_style_index_0_lang-40050c3d.js";import{_ as u,c,w as t,o as _,b as e,d as a,e as i,r as n,f as p,p as m}from"./app-025bdceb.js";import"./YunFooter.vue_vue_type_script_setup_true_lang-dd4500d1.js";import"./YunCard.vue_vue_type_style_index_0_lang-c0980680.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-870a2da2.js";const K=JSON.parse('{"title":"Java 中的多线程编程？","description":"","frontmatter":{"title":"Java 中的多线程编程？","tags":["Java","多线程"],"categories":["快去学习"],"date":"2021-09-19T14:25:17.000Z","updated":"2021-09-19T14:25:17.000Z"},"headers":[{"level":2,"title":"首先，什么是线程","slug":"首先，什么是线程","link":"#首先，什么是线程","children":[]},{"level":2,"title":"在 Java 中使用线程","slug":"在-java-中使用线程","link":"#在-java-中使用线程","children":[{"level":3,"title":"启动线程","slug":"启动线程","link":"#启动线程","children":[]},{"level":3,"title":"线程的状态","slug":"线程的状态","link":"#线程的状态","children":[]}]},{"level":2,"title":"其他要讲的","slug":"其他要讲的","link":"#其他要讲的","children":[]}],"relativePath":"pages/posts/learning/java-thread.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/learning/java-thread.md","lastUpdated":1699970883000}'),o=JSON.parse('{"title":"Java 中的多线程编程？","description":"","frontmatter":{"title":"Java 中的多线程编程？","tags":["Java","多线程"],"categories":["快去学习"],"date":"2021-09-19T14:25:17.000Z","updated":"2021-09-19T14:25:17.000Z"},"headers":[{"level":2,"title":"首先，什么是线程","slug":"首先，什么是线程","link":"#首先，什么是线程","children":[]},{"level":2,"title":"在 Java 中使用线程","slug":"在-java-中使用线程","link":"#在-java-中使用线程","children":[{"level":3,"title":"启动线程","slug":"启动线程","link":"#启动线程","children":[]},{"level":3,"title":"线程的状态","slug":"线程的状态","link":"#线程的状态","children":[]}]},{"level":2,"title":"其他要讲的","slug":"其他要讲的","link":"#其他要讲的","children":[]}],"relativePath":"pages/posts/learning/java-thread.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/learning/java-thread.md","lastUpdated":1699970883000}'),v={name:"pages/posts/learning/java-thread.md",data(){return{data:o,frontmatter:o.frontmatter}},setup(){m("pageData",o)}},f={id:"首先，什么是线程",tabindex:"-1"},g=e("p",null,'在讨论“线程”这个概念之前，我们有必要知道它到底是什么。这个词经常和"进程"一起出现，那么这两者有什么区别呢？',-1),k=e("p",null,"进程是对 CPU 活动的称呼，简单说来就是执行的程序。当然它肯定不止“程序”这么简单，一个完整的进程应该包括代码段（文本）、数据段、栈、堆等部分。",-1),$=e("p",null,"至于线程，《操作系统概念》是这样定义它的：",-1),b=e("blockquote",null,[e("p",null,"线程是 CPU 使用的一个基本单元；它包括线程 ID、程序计数器、寄存器组和堆栈。")],-1),J=e("p",null,"基于这些，我给出个人的理解：如果说进程是操作系统层面的程序基本单位，那么线程更像是 CPU 执行任务的基本单位。~~众所周知，~~一个进程可以包含多个线程，拥有多个控制线程的进程可以同时执行多个任务。",-1),j=e("p",null,[a("打个比方，多线程的程序就像眼睛盯着屏幕手里还搓着手柄的你，单线程的程序就像要看一眼屏幕再看一眼手柄上的按键才能操作的你。"),e("s",null,"是不是很形象？")],-1),T=e("p",null,[e("img",{src:"https://i.loli.net/2021/09/19/URq8ot6VmZCfJrX.gif",alt:"说的就是你"})],-1),U=e("p",null,[e("s",null,"嘶~或许还有点并行和并发的意思？")],-1),C={id:"在-java-中使用线程",tabindex:"-1"},P=e("p",null,"为什么需要多线程编程？这就很好理解了。如果一个程序要同时处理多个任务，不管这些任务是相似的还是完全不同的，有多个线程时效率一般都会比较高（嗯）。",-1),N=e("p",null,"在 Java 中使用多线程很简单，可以直接使用继承线程（Thread）类，也可以实现 Runnable 接口。就稍微讲一下使用线程类的方法好了。",-1),V=e("p",null,[e("code",null,"Thread"),a(" 类的对象和其他对象一样具有属性和方法。")],-1),Z={id:"启动线程",tabindex:"-1"},w=e("p",null,[e("code",null,"Thread"),a(" 类中有一个 "),e("code",null,"run()"),a(" 方法，其子类需要实现这个方法。实例化线程，创建对象之后，调用 "),e("code",null,"start()"),a(" 方法才算是启动了线程。")],-1),B=e("p",null,[e("em",null,[a("直接调用 "),e("code",null,"run()"),a(" 方法和调用普通方法没有区别，不会启动新的线程。")])],-1),D={id:"线程的状态",tabindex:"-1"},S=e("p",null,"线程可以有如下几个状态：",-1),q=e("ul",null,[e("li",null,[a("新建：实例化线程对象后，还未执行 "),e("code",null,"start()"),a(" 时；")]),e("li",null,[a("就绪：调用 "),e("code",null,"start()"),a(" 后，处于就绪状态的线程等待调度；")]),e("li",null,[a("运行：当线程获得 CPU 资源后就可以执行 "),e("code",null,"run()"),a(" 方法，此时线程就处于运行状态，处于运行状态的线程可能变为阻塞、就绪或死亡状态；")]),e("li",null,"阻塞：线程失去所占用资源后进入阻塞状态，具体原因包括睡眠、等待以及同步锁被占用等等，重新获得资源后线程可以重新进入就绪状态；"),e("li",null,[a("死亡：线程执行完 "),e("code",null,"run()"),a(" 方法或者因其他原因终止时进入死亡状态，即结束。")])],-1),O=e("p",null,"状态之间的转换构成了线程的生命周期。",-1),R={id:"其他要讲的",tabindex:"-1"},y=e("ul",null,[e("li",null,"在 Java 中，线程有优先级，取值范围从1到10，数值越大优先级越高，默认优先级是5；"),e("li",null,[a("多线程编程：线程间的同步、通信等内容……"),e("s",null,"先不写了，才不是因为懒。")])],-1);function A(l,I,L,M,r,X){const s=p,d=h;return _(),c(d,{frontmatter:r.frontmatter,data:r.data},{"main-content-md":t(()=>[e("h2",f,[a("首先，什么是线程 "),i(s,{class:"header-anchor",href:"#首先，什么是线程","aria-hidden":"true"},{default:t(()=>[a("#")]),_:1})]),g,k,$,b,J,j,T,U,e("h2",C,[a("在 Java 中使用线程 "),i(s,{class:"header-anchor",href:"#在-java-中使用线程","aria-hidden":"true"},{default:t(()=>[a("#")]),_:1})]),P,N,V,e("h3",Z,[a("启动线程 "),i(s,{class:"header-anchor",href:"#启动线程","aria-hidden":"true"},{default:t(()=>[a("#")]),_:1})]),w,B,e("h3",D,[a("线程的状态 "),i(s,{class:"header-anchor",href:"#线程的状态","aria-hidden":"true"},{default:t(()=>[a("#")]),_:1})]),S,q,O,e("h2",R,[a("其他要讲的 "),i(s,{class:"header-anchor",href:"#其他要讲的","aria-hidden":"true"},{default:t(()=>[a("#")]),_:1})]),y]),"main-header":t(()=>[n(l.$slots,"main-header")]),"main-header-after":t(()=>[n(l.$slots,"main-header-after")]),"main-nav":t(()=>[n(l.$slots,"main-nav")]),"main-content":t(()=>[n(l.$slots,"main-content")]),"main-content-after":t(()=>[n(l.$slots,"main-content-after")]),"main-nav-before":t(()=>[n(l.$slots,"main-nav-before")]),"main-nav-after":t(()=>[n(l.$slots,"main-nav-after")]),comment:t(()=>[n(l.$slots,"comment")]),footer:t(()=>[n(l.$slots,"footer")]),aside:t(()=>[n(l.$slots,"aside")]),"aside-custom":t(()=>[n(l.$slots,"aside-custom")]),default:t(()=>[n(l.$slots,"default")]),_:3},8,["frontmatter","data"])}const Q=u(v,[["render",A]]);export{K as __pageData,Q as default};