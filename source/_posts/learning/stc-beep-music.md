---
title: 用单片机蜂鸣器播放音乐
date: 2021-07-12 17:28:11
tags: 
  - 单片机
  - c
categories:
  - 奇怪的知识增加了
---

## 这是怎么一回事

是的，我又来水了。

话说回来，虽然暑假开始已经将近两周了，但是我们并没有回家。为什么呢？

你可知道这世上有一物唤作“小学期”吗？

![滑稽](https://i.loli.net/2021/07/13/Kz3emPhy7xDvNMu.jpg)

每年暑假，我们学院大二的学生都会被拉到工训中心愉悦地学习课程，其名为——焊板子！~~（学会了，明天就进电子厂。）~~

![板子成品](https://i.loli.net/2021/07/13/YqjBUElkJ2VW8DX.jpg)

好吧，其实正式名称应该是电子系统设计与创新基础训练，上面说的算是实训的一部分。在焊板子之外，我们要做的事情是通过学习各种案例理解其中的原理，最终自己编程实现想要的功能。

老师给我们提供了很多案例，不过根据观察，大家玩得最 High 的还是电子音乐，就是让蜂鸣器按指定的曲调发出声音。~~（电子系统设计？不，是 8-bit 音乐大赏。）~~

<!-- more -->

## 蜂鸣器电子音乐

电子音乐的案例代码如下，感谢我校老师：

```c
/**********************
myMusic 音乐播放
型号:IAP15F2K60S2 主频:12MHz
************************/
#include <STC15F2K60S2.h>
#define uint unsigned int
#define uchar unsigned char

/*---------引脚别名定义---------*/
sbit sbtBeep = P3 ^ 4;    //蜂鸣器

/*---------变量定义---------*/
uchar ucTimerH, ucTimerL;   //定义定时器的重装值
uchar code arrMusic[] =     //音乐代码，歌曲为《同一首歌》，格式为: 音符, 节拍
{
//音符的十位代表是低中高八度，1代表高八度，2代表中八度，3代表高八度
//个位代表简谱的音符，例如0x15代表低八度的S0，0x21代表中八度的DO。
//节拍则是代表音长，例如：0x10代表一拍，0x20代表两拍，0x08代表1/2拍
0x15,0x20,0x21,0x10,
0x22,0x10,0x23,0x18,
0x24,0x08,0x23,0x10,
0x21,0x10,0x22,0x20,
0x21,0x10,0x16,0x10,
0x21,0x40,0x15,0x20,
0x21,0x10,0x22,0x10,
0x23,0x10,0x23,0x08,
0x24,0x08,0x25,0x10,
0x21,0x10,0x24,0x18,
0x23,0x08,0x25,0x10,
0x22,0x08,0x23,0x08,
0x23,0x08,0x22,0x08,
0x22,0x30,0x23,0x20,
0x25,0x10,0x31,0x10,
0x27,0x18,0x26,0x08,
0x26,0x20,0x25,0x10,
0x25,0x08,0x26,0x08,
0x27,0x10,0x26,0x08,
0x25,0x08,0x23,0x40,
0x24,0x18,0x24,0x08,
0x25,0x10,0x26,0x10,
0x25,0x10,0x24,0x08,
0x23,0x08,0x22,0x20,
0x17,0x10,0x17,0x08,
0x16,0x08,0x15,0x10,
0x16,0x10,0x21,0x40,
0x00,0x00
};
uchar code arrMusicToTimerNum[] =  
{
    //此数组数据为各个音符在定时器中的重装值，第一列是高位，第二列是低位
    0xf8, 0x8c,   //低八度，低1
    0xf9, 0x5b,
    0xfa, 0x15,   //低3
    0xfa, 0x67,
    0xfb, 0x04,   //低5
    0xfb, 0x90,
    0xfc, 0x0c,   //低7
    0xfc, 0x44,   //中央C调
    0xfc, 0xac,   //中2
    0xfd, 0x09,
    0xfd, 0x34,   //中4
    0xfd, 0x82,
    0xfd, 0xc8,   //中6
    0xfe, 0x06,
    0xfe, 0x22,   //高八度，高1
    0xfe, 0x56,
    0xfe, 0x6e,   //高3
    0xfe, 0x9a,
    0xfe, 0xc1,   //高5
    0xfe, 0xe4,
    0xff, 0x03    //高7
};

/*---------延时子函数---------*/
void DelayMs( unsigned int xms )
{
    uint i, j;
    for( i = xms; i > 0; i-- )
        for( j = 124; j > 0; j-- );
}

/*---------取址子函数---------*/
//取出tem音符在arrMusicToTimerNum数组中的位置值
uchar GetPosition( uchar tem ) 
{
    uchar ucBase, ucOffset, ucPosition;     //定义曲调，音符和位置
    ucBase = tem / 16;            //高4位是曲调值,基址
    ucOffset = tem % 16;          //低4位是音符，偏移量
    if( ucBase == 1 )              //当曲调值为1时，即是低八度，基址为0
        ucBase = 0;
    else if( ucBase == 2 )          //当曲调值为2时，即是中八度，基址为14
        ucBase = 14;
    else if( ucBase == 3 )          //当曲调值为3时，即是高八度，基址为28
        ucBase = 28;
    //通过基址加上偏移量，即可定位此音符在arrMusicToTimerNum数组中的位置
    ucPosition = ucBase + ( ucOffset - 1 ) * 2; 
    return ucPosition;            //返回这一个位置值
}

/*---------播放音乐功能函数---------*/
void PlayMusic()
{
    uchar ucNoteTmp, ucRhythmTmp, tem; // ucNoteTmp为音符，ucRhythmTmp为节拍
    uchar i = 0;
    while( 1 )
    {
        ucNoteTmp = arrMusic[i];    //如果碰到结束符,延时1秒,回到开始再来一遍
        if( ucNoteTmp == 0x00 )
        {
            i = 0;
            DelayMs( 1000 );
        }
        else if( ucNoteTmp == 0xff )  //若碰到休止符,延时100ms,继续取下一音符
        {
            i = i + 2;
            DelayMs( 100 );
            TR0 = 0;
        }
        else                     //正常情况下取音符和节拍
        {
            //取出当前音符在arrMusicToTimerNum数组中的位置值
            tem = GetPosition( arrMusic[i] );              
            //把音符相应的计时器重装载值赋予ucTimerH和ucTimerL
            ucTimerH = arrMusicToTimerNum[tem];  
            ucTimerL = arrMusicToTimerNum[tem + 1];
            i++;
            TH0 = ucTimerH;           //把ucTimerH和ucTimerL赋予计时器
            TL0 = ucTimerL;
            ucRhythmTmp = arrMusic[i];      //取得节拍
            i++;
        }
        TR0 = 1;                          //开定时器1
        DelayMs( ucRhythmTmp * 180 );      //等待节拍完成, 通过P3^4口输出音频
        TR0 = 0;                          //关定时器1

    }
}

/*---------初始化子函数---------*/
//功能是配置IO口
void InitSys()
{
    P0M0 = 0xff;
    P0M1 = 0x00;
    P2M0 = 0x08;
    P2M1 = 0x00;
    P3M0 = 0x10;
    P3M1 = 0x00;
    P4M0 = 0x00;
    P4M1 = 0x00;
    P5M0 = 0x00;
    P5M1 = 0x00;
}

/*---------定时器0初始化子函数---------*/
void InitT0()
{
    TMOD = 0x01;
    TH0 = 0xD8;
    TL0 = 0xEF;
    EA = 1;
    ET0 = 1;
    TR0 = 0;
}

/*---------主函数---------*/
void main()
{
    InitSys();
    InitT0();
    P0 = 0x00;
    PlayMusic();
    while( 1 );
}

/*---------定时器0中断处理函数---------*/
//重新装值，并把sbtBeep值取反，产生方波
void T0_Process() interrupt 1                     //计时器控制频率
{
    TH0 = ucTimerH;
    TL0 = ucTimerL;
    sbtBeep = ~sbtBeep;
}
```

头文件的内容就不贴了，主要是跟寄存器有关的。电子音乐工程有好几个版本，包括可以切换内容的、可以震动感应的，甚至还有可以显示歌词的……但是我现在要说的只需要用到上面这个（不要把偷懒说得这么堂而皇之啊喂）。

## 问题以及修改

上面这个程序是让蜂鸣器以《同一首歌》的旋律发出声音，以“做中学”为准则的我院学生怎么能只听它唱呢？~~最起码换成咱们的曲子。~~

于是问题就出现了，当我们把自己选的曲子按格式写进去、构建程序并且下载之后，播放出来却很明显比预想的节奏快很多，而且时不时会有很怪的调调出现。除此之外，休止符的效果也不能让我们满意。

### 音高

经过几次试验，我们发现音高的问题主要出现在高音3，这个音不对劲。那么怎么修改呢？

根据原理说明和源代码，程序指定音高的时候是根据写入的音乐代码重定位到音符在定时器中的重装值。这个重装值又是什么？

![简谱码](https://i.loli.net/2021/07/13/ug95cZrwiSLT4dU.jpg)

这是课程网站给出的一张图。经过进制转换可以发现图中的简谱码就是前面所说的重装值。这样一来就好办了，老师给出的工程文件中高音3的重装值是`0xfe, 0x6e`，就是`0xff6e`，而高音3的简谱码`65157`转换成16进制应该是`0xfe85`，把重装值改成`0xfe, 0x85`就好了。

同理，也可以用这种方式校准其它音，只要有简谱码，甚至可以实现半音和不在这个表格中的音。表格给出了一部分，不在这一部分的可以通过如下公式来计算：

> [百度知道](https://zhidao.baidu.com/question/73525053.html)
>
> N=Fi÷2÷Fr
>
> N：计数值
>
> Fi：内部计时频率12MHz，应该和硬件有关
>
> Fr：要产生的频率
>
> T=65536-N=65536-Fi÷2÷Fr 

T值就是我们需要的简谱码，转换成16进制就可以在程序中使用了。

### 节拍

音高的问题解决了，下面是节拍。源代码是这样写的：

```c
TR0 = 1;                          //开定时器1
DelayMs( ucRhythmTmp * 180 );     //等待节拍完成, 通过P3^4口输出音频
TR0 = 0;                          //关定时器1
```

其实节拍应该不算是个问题，因为不同歌曲的速度也会不同。经过试验（主要是听，毕竟不懂），我自己用的大部分歌曲改成这样会比较好：

```c
DelayMs( ucRhythmTmp * 360 );
```

不过具体写多少还是取决于目标音乐的速度。

### 休止符

至于休止符，我在音符的重装值最后加上了`0xff,0xff`，只要当前音符是`0xn0`（n 不为0，因为`0x00`表示播放结束，回到开头），就让程序把重装值定位到42的位置（前面3个八度需要42个16进制数，从第0到第41），这样获取的重装值的高低位相等（其它的重装值还没有高低位相等的），直接关掉定时器再等待节拍，蜂鸣器在休止期间就不会发声。

```c
TR0 = 1;                       // 开定时器1
if( ucTimerH == ucTimerL )     // 是休止符直接关掉定时器
    TR0 = 0;
DelayMs( parameter );          // 等待节拍完成
TR0 = 0;                       // 关定时器1
```

### 其他

我还加上了根据音符来点亮不同数量 LED 灯的功能，实现了按键控制暂停和继续播放，~~其实就是把其他案例复制粘贴。~~除此之外，我把`PlayMusic`函数中`i`的类型从`uchar`改成`uint`来支持更长的音乐。

好像没什么技术力的说……

## 让蜂鸣器唱起《国际歌》

上视频：

{% raw %}
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
<iframe src="////player.bilibili.com/player.html?aid=461634310&bvid=BV16L411W7Ay&cid=370583013&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; Left: 0; top: 0;" ></iframe></div>
{% endraw %}

修改后的代码，没有定义半音：

```c
/**********************
myMusic 音乐播放
型号:IAP15F2K60S2 主频:12MHz
************************/
#include <STC15F2K60S2.h>
#define uint unsigned int
#define uchar unsigned char

/*---------引脚别名定义---------*/
sbit sbtBeep = P3 ^ 4;   // 蜂鸣器
sbit key1 = P3 ^ 2;      // 按键1
sbit sbtLedSel = P2 ^ 3; // 数码管与 LED 灯切换引脚

/*---------变量定义---------*/
uchar code arrLed[] = {0x00, 0x01, 0x03, 0x07, 0x0f, 0x1f, 0x3f, 0x7f, 0xff}; // LED 值
uchar ucTimerH, ucTimerL;                                                     // 定义定时器的重装值
bit flag;                                                                     // 标志位，暂停或播放
uchar code arrMusic[] =                                                       // 音乐代码，格式为: 音符, 节拍
    {
        // 音符的十位代表是低中高八度，1代表高八度，2代表中八度，3代表高八度
        // 个位代表简谱的音符，例如0x15代表低八度的S0，0x21代表中八度的DO。
        // 节拍则是代表音长，例如：0x10代表一拍，0x20代表两拍，0x08代表1/2拍
        0x25, 0x10, 0x31, 0x18, 0x27, 0x08, 0x32, 0x08, 0x31, 0x08, 0x25, 0x08, 0x23, 0x08, 0x26, 0x18, 0x26, 0x08, 0x24, 0x10, 0x20, 0x08,
        0x26, 0x08, 0x32, 0x18, 0x31, 0x08, 0x27, 0x08, 0x26, 0x08, 0x25, 0x08, 0x24, 0x08, 0x23, 0x30,
        0x25, 0x10, 0x31, 0x18, 0x27, 0x08, 0x32, 0x08, 0x31, 0x08, 0x25, 0x08, 0x23, 0x08, 0x26, 0x20, 0x24, 0x08,
        0x26, 0x08, 0x32, 0x08, 0x31, 0x08, 0x27, 0x10, 0x32, 0x10, 0x34, 0x10, 0x27, 0x10, 0x31, 0x20, 0x31, 0x08, 0x30, 0x08,
        0x33, 0x08, 0x32, 0x08, 0x27, 0x20, 0x26, 0x08, 0x27, 0x08, 0x31, 0x08, 0x26, 0x08, 0x27, 0x20, 0x25, 0x08,
        0x25, 0x08, 0x24, 0x08, 0x25, 0x08, 0x26, 0x18, 0x26, 0x08, 0x32, 0x18, 0x31, 0x08, 0x27, 0x20, 0x27, 0x08, 0x20, 0x08,
        0x32, 0x10, 0x32, 0x18, 0x27, 0x08, 0x25, 0x08, 0x25, 0x08, 0x24, 0x08, 0x25, 0x08, 0x33, 0x20, 0x31, 0x08,
        0x26, 0x08, 0x27, 0x08, 0x31, 0x08, 0x27, 0x10, 0x32, 0x10, 0x31, 0x10, 0x26, 0x10, 0x25, 0x20, 0x25, 0x08, 0x20, 0x08,
        0x33, 0x08, 0x32, 0x08, 0x31, 0x20, 0x25, 0x18, 0x23, 0x08, 0x26, 0x20, 0x24, 0x08, 0x20, 0x08,
        0x32, 0x0c, 0x31, 0x04, 0x27, 0x20, 0x26, 0x10, 0x25, 0x10, 0x25, 0x20, 0x25, 0x08, 0x20, 0x08,
        0x25, 0x10, 0x33, 0x20, 0x32, 0x10, 0x25, 0x10, 0x31, 0x20, 0x27, 0x18,
        0x27, 0x08, 0x26, 0x18, 0x25, 0x08, 0x26, 0x10, 0x32, 0x10, 0x32, 0x20, 0x32, 0x08, 0x30, 0x08,
        0x33, 0x0c, 0x32, 0x04, 0x31, 0x20, 0x25, 0x18, 0x23, 0x08, 0x26, 0x20, 0x24, 0x08, 0x20, 0x08,
        0x32, 0x0c, 0x31, 0x04, 0x27, 0x20, 0x26, 0x10, 0x25, 0x10, 0x33, 0x30,
        0x33, 0x10, 0x35, 0x20, 0x34, 0x10, 0x33, 0x10, 0x32, 0x18, 0x33, 0x08, 0x34, 0x10, 0x30, 0x08,
        0x34, 0x08, 0x33, 0x18, 0x33, 0x08, 0x32, 0x18, 0x32, 0x08, 0x31, 0x30,
        0x00, 0x00};
uchar code arrMusicToTimerNum[] =
    {
        // 此数组数据为各个音符在定时器中的重装值，第一列是高位，第二列是低位
        0xf8, 0x8c, // 低八度，低1
        0xf9, 0x5b,
        0xfa, 0x15, // 低3
        0xfa, 0x67,
        0xfb, 0x04, // 低5
        0xfb, 0x90,
        0xfc, 0x0c, // 低7
        0xfc, 0x44, // 中央 C 调
        0xfc, 0xac, // 中2
        0xfd, 0x09,
        0xfd, 0x34, // 中4
        0xfd, 0x82,
        0xfd, 0xc8, // 中6
        0xfe, 0x06,
        0xfe, 0x22, // 高八度，高1
        0xfe, 0x56,
        0xfe, 0x85, // 高3
        0xfe, 0x9a,
        0xfe, 0xc1, // 高5
        0xfe, 0xe4,
        0xff, 0x03, // 高7
        0xff, 0xff};

/*---------延时子函数---------*/
void DelayMs(uint xms)
{
    uint i, j;
    for (i = xms; i > 0; i--)
        for (j = 124; j > 0; j--)
            ;
}

/*---------取址子函数---------*/
// 取出 tem 音符在 arrMusicToTimerNum 数组中的位置值
uchar GetPosition(uchar tem)
{
    uchar ucBase, ucOffset, ucPosition; // 定义曲调、音符和位置
    ucBase = tem / 16;                  // 高4位是曲调值，基址
    ucOffset = tem % 16;                // 低4位是音符，偏移量
    if (ucOffset == 0)                  // 当音符为0时，位置是42
    {
        P0 = 0x00;
        return 42;
    }
    // 点亮对应数量的 LED
    P0 = arrLed[ucOffset];
    if (ucBase == 1) // 当曲调值为1时，即是低八度，基址为0
        ucBase = 0;
    else if (ucBase == 2) // 当曲调值为2时，即是中八度，基址为14
        ucBase = 14;
    else if (ucBase == 3) // 当曲调值为3时，即是高八度，基址为28
        ucBase = 28;
    // 通过基址加上偏移量，即可定位此音符在 arrMusicToTimerNum 数组中的位置
    ucPosition = ucBase + (ucOffset - 1) * 2;
    return ucPosition; // 返回这一个位置值
}

/*---------播放音乐功能函数---------*/
void PlayMusic()
{
    // ucNoteTmp 为音符，ucRhythmTmp 为节拍
    uchar ucNoteTmp, ucRhythmTmp, tem;
    // 这里把 uchar 型改成 uint 型，否则 i 最大为255，只能支持128个音符，甚至放不完《国际歌》的旋律
    uint i = 0;
    while (1)
    {
        if (flag == 1) // 播放状态
        {
            ucNoteTmp = arrMusic[i];
            if (ucNoteTmp == 0x00) // 如果碰到结束符,延时1秒,回到开始再来一遍
            {
                i = 0;
                P0 = 0x00;
                sbtBeep = 0;
                DelayMs(1000);
            }
            else // 其他情况下取音符和节拍
            {
                tem = GetPosition(arrMusic[i]);     // 取出当前音符在 arrMusicToTimerNum 数组中的位置值
                ucTimerH = arrMusicToTimerNum[tem]; // 把音符相应的计时器重装载值赋予 ucTimerH 和 ucTimerL
                ucTimerL = arrMusicToTimerNum[tem + 1];
                i++;

                TH0 = ucTimerH; // 把 ucTimerH 和 ucTimerL 赋予计时器
                TL0 = ucTimerL;
                ucRhythmTmp = arrMusic[i]; // 取得节拍
                i++;

                TR0 = 1;                  // 开定时器1
                if (ucTimerH == ucTimerL) // 休止直接关掉定时器
                    TR0 = 0;
                DelayMs(ucRhythmTmp * 300); // 等待节拍完成, 通过 P3^4 口输出音频
                TR0 = 0;                    // 关定时器1
                sbtBeep = 0;
            }
        }
        else
            while (flag != 1) // 暂停
                ;
    }
}

/*---------初始化子函数---------*/
// 功能是配置 IO 口
void InitSys()
{
    P0M0 = 0xff;
    P0M1 = 0x00;
    P2M0 = 0x08;
    P2M1 = 0x00;
    P3M0 = 0x10;
    P3M1 = 0x00;
    P4M0 = 0x00;
    P4M1 = 0x00;
    P5M0 = 0x00;
    P5M1 = 0x00;
    sbtLedSel = 1;
}

/*---------定时器0初始化子函数---------*/
void InitT0()
{
    TMOD = 0x01;
    TH0 = 0xD8;
    TL0 = 0xEF;
    IE = 0x87; // 1000 0111  EA=1,EX0=1,ET0=1,EX1=0;
    IP = 0x02; // 0000 0010  PT0=1;   定时器0优先级高
    TR0 = 0;
    sbtBeep = 0;
}

/*---------主函数---------*/
void main()
{
    InitSys();
    InitT0();
    P0 = 0x00;
    key1 = 1;
    flag = 0;
    PlayMusic();
}

/*---------定时器0中断处理函数---------*/
// 重新装值，并把 sbtBeep 值取反，产生方波
void T0_Process() interrupt 1 // 计时器控制频率
{
    TH0 = ucTimerH;
    TL0 = ucTimerL;
    sbtBeep = ~sbtBeep;
}

/*---------按键1中断处理函数---------*/
// 从其他案例抄过来的
void ex1() interrupt 0
{
    DelayMs(5);
    if (key1 == 0) // 判断 key1 是否按下
    {
        DelayMs(5);
        if (key1 == 0)
        {
            while (!key1)
                ;
            flag = ~flag; // 播放中断位取反，播放或者暂停
        }
    }
}

```

