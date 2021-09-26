---
title: 如何拥有一辆属于自己的三蹦子
tags:
  - 单片机
  - 小车
categories:
  - 奇怪的知识增加了
date: 2021-09-26 18:56:38
---

你是否经常感到空虚寂寞、百无聊赖？你是否缺少陪伴、倍感不安、想要在这喧嚣的城市里寻找一份慰藉？

毫无疑问，拥有属于自己的车、房可以在物质层面缓解这些焦虑（确信）。买房太难了，所以就先从车开始吧。

## 三轮车也是车

打住，我要说的并不是这种车：

![车1网图](https://i.loli.net/2021/09/26/ln7xH36LUbiZc9O.png)

![车2网图](https://i.loli.net/2021/09/26/GHQzW9Xd73DqvNF.png)

或者这种车：

![蝙蝠车网图](https://i.loli.net/2021/09/26/E3CDyXLPTh5qFfS.png)

~~废话，你以为我买得起？~~

而是这种：

![三蹦子](https://i.loli.net/2021/09/26/En4idsW7mopQIlw.png)

什么？这不行？气抖冷，难道三轮车就不是车？玩具车就不能给慰藉了？

<!-- more -->

## 从零（并不是）开始的造三轮生活

是这样的，我想搞个小车已经很久了，大概大半年了？早早地就从某宝上买了亚克力板和电机、轮子（所以不算从零开始），准备大干一番，却一直没有动手。因为之前没有接触过单片机，丝毫没有头绪。~~（懒）~~

事情的转机出现在今年夏季小学期，我们要基于单片机学电子系统设计了。狂喜，有人教了。于是在焊完板子学了一些案例后我们就放假回家了，老师特意说要自己想想选题（不过很多人不一定想了）嗯？这还用想？做车啊！

~~虽然这样说，我还是等到了暑假的最后一周才开始动手。~~

### 电机驱动

对于车来说，最基本的是什么？当然是能跑。所以我首先测了电机能不能转。

我用的板子就是之前[蜂鸣器唱《国际歌》](https://afool.top/learning/stc-beep-music/)的那块，芯片型号是 IAP15F2K60S2（基本等同于STC15F2K60S2）。板子上有三个拓展接口：EXT、SM 和 485。大概长这样：

![拓展接口](https://i.loli.net/2021/09/26/zn1dQPEOVopC6Nb.png)

最适合拿来控制两个电机的当然是 SM （步进电机）接口，给了一个 VCC 和四个引脚输出（EXT 接口蓝牙要用，485 只给了两个引脚和 GND）。直接把电机接到 VCC 和另一个引脚，没问题，但是接两个引脚给高低电平电机就不转，设推挽输出也没用，我是没想明白怎么回事。实在太逊了，这个样子连电机反转都搞不了，还怎么跑两个电机啊？

办法总比困难多，博闻强识的我（大嘘）怎么能想不到解决方案呢？好吧，其实是搜索引擎帮大忙。我借助了双路 L9110S 电机驱动来控制电机。

![电机驱动](https://i.loli.net/2021/09/26/sag6u8wGnzUjeJI.png)

这样就可以做到用 SM 的 VCC 和 485 的 GND 供电，用 S1 到 S4 控制两个电机。四个引脚分别接图里下方的 A-1A 这些。A-1A 和 A-1B 控制 Motor A，Motor A连接到一个电机的两端，Motor B 同理。嗯，完美解决。

让小车按命令动起来的话当然要写程序了，先给小车运动状态的基本定义：

```c
#ifndef _MOVE_H
#define _MOVE_H

#include "STC15F2K60S2.H"

// 接电机的引脚
sbit s1 = P4 ^ 1;
sbit s2 = P4 ^ 2;
sbit s3 = P4 ^ 3;
sbit s4 = P4 ^ 4;

// 电机转动方向
#define RightMotorStop s1 = 0, s2 = 0
#define LeftMotorStop s3 = 0, s4 = 0
#define RightMotorFWD s1 = 1, s2 = 0
#define LeftMotorFWD s3 = 1, s4 = 0
#define RightMotorREV s1 = 0, s2 = 1
#define LeftMotorREV s3 = 0, s4 = 1

// 运动和停止
void Forward();
void Backward();
void TurnLeft();
void TurnRight();
void VStop();

// 初始化
void MoveInit();

#endif
```

~~分别给高低电平应该能看懂吧？~~

函数实现：

```c
#include "move.h"
// 前进
void Forward()
{
	LeftMotorFWD;
	RightMotorFWD;
}

// 后退
void Backward()
{
	LeftMotorREV;
	RightMotorREV;
}

// 左转
void TurnLeft()
{
	LeftMotorREV;
	RightMotorFWD;
}

// 右转
void TurnRight()
{
	LeftMotorFWD;
	RightMotorREV;
}

// 停车
void VStop()
{
	LeftMotorStop;
	RightMotorStop;
}

// 初始化，s1 到 s4 推挽输出
void MoveInit()
{
	P4M0 = 0xff;
	P4M1 = 0x00;
	//P0 = 0;
	VStop();
}
```

我觉得这些都算得上言简意赅（叉腰），就不多解释了。

### 蓝牙遥控与串口通信

小车能动了，但是我们还需要控制。我最开始的想法就是做遥控，能用手机直接遥控就再好不过了。手机遥控？那就用蓝牙！

遥控器程序去手机的应用商店里搜“蓝牙串口”，最好是带按钮编辑的那种，一搜一大把，所以就先不关心了。

小车的蓝牙接收我是用 HC-06 来做的。

老师给出的样例里面有用到蓝牙串口通信的，遂“参考”之。

> STC15F2K60S2 系列单片机有2个高速异步串行通信端口，每个串口由2个数据缓冲器、一个移位寄存器、一个串行控制寄存器和一个波特率发生器等组成。
>
> 串口1已被用于下载电路，故本案例使用的是串口2来进行与蓝牙的通信。从芯片引脚电路图中，我们可以找到串口2对应的收发引脚分别为 P1.0 和 P1.1，将其的“接受”端和蓝牙模块的“发送”端相连，“发送”端和蓝牙模块的“接收端”端相连，再对应连接 VCC 和 GND 即实现了物理上电路的连通。
>
> 串口2只能使用定时器2作为波特率发生器，根据芯片使用手册的说明设置好定时器后，只要将要发送的数据写到 SBUF2 中，串口即自动发送缓存中的数据。
>
> ![连接图示](https://i.loli.net/2021/09/26/3bd725qZpOjQaWt.png)
>
> ——湖大超星 电子系统设计与创新基础训练 基于Andriod的数据采集系统

如上所示，使用串口2进行蓝牙通信，串口2只能用定时器2作为波特率发生器，所以先初始化定时器：

```c
void Uart2Init(void) // 9600bps@11.0592MHz
{
	S2CON = 0x50; // 8位数据，可变波特率
	AUXR |= 0x04; // 定时器2时钟为Fosc，即1T
	T2L = 0xE0;   // 设定定时初值
	T2H = 0xFE;   // 设定定时初值
	AUXR |= 0x10; //启动定时器2
	IE2 = 0x01;
	P_SW2 = 0x00;
	EA = 1;
}
```

前面有注释的都是 STC-ISP 软件自动生成的，最后三句大概是中断使能、外设切换等~~，没怎么看懂~~。

然后是用于读取串口2接收数据的中断函数：

```c
void UART2_Interrupt() interrupt 8 // 中断8，用于串口2
{  
	unsigned char temp;	
	
    // 检查串口2控制寄存器
    // 将1字节的新数据赋给 ReceivedData
	if((S2CON&0x01)==0x01)
	{
		S2CON &= ~0x01;
		temp = S2BUF;
		ReceivedData=temp;
	}
}	
```

~~这里似乎可以不用 `temp`。~~

`ReceivedData` 是个 `unsigned char` 型的全局变量。在手机的蓝牙串口应用里编辑按钮发送不同数据，根据 `ReceivedData` 来调用小车的运动控制函数就能实现遥控。这部分程序就不写出来了，`switch` 或者 `if` 判断就行。

~~现在一看好简单啊！那为什么我暑假里写了好几天？~~

## 当你拥有了现成的轮子

**这部分可能不太具有复现性（湖大信息院学生除外，毕竟有老师给的 BSP）。**

上面这些是在八月的最后两三天完成的，一边摸鱼一边写程序，算是完成了蓝牙遥控小车的功能，想着就这样吧，也算个设计了，就这样交差。

令我没想到的是，暑假回来之后的下半个小学期，老师给出了一套功能完备的 BSP （Board Support Package，板级支持包），里面有板子上各种外设的驱动程序。比方说要让数码管显示一个数字，原来你需要这样：写段选、写位选、设置推挽输出、引脚赋值、循环内刷新……现在你只需要这样：

```c
DisplayerInit();                   // 显示模块初始化
SetDisplayerArea(7, 7);            // 只用数码管最后一位
Seg7Print(0, 0, 0, 0, 0, 0, 0, 1); // 数码管最后一位显示1
```

初始化之后想显示什么直接调用 `Seg7Print()` 就行，十分快捷。

有了这样一套轮子，大家想做什么直接调库函数就行，完全不需要向我之前那样从定时器和中断开始写。于是同学们纷纷变身缝合怪，恨不得把所有模块都加到自己的设计中。

~~坏了，卷起来了。~~

没办法，我也只能多搞点东西了。先把蓝牙遥控换成了 BSP 的实现，加了上锁功能。此外在小车上加什么好呢？在咨询了[隔壁老王](https://blog.csdn.net/dasifhoaisfg?spm=1001.2014.3001.5509)后，我确定了“超声波”这个方向，避障什么的自然是少不了，跟随式行李箱也有点意思。完成这些之后我又附加了一个红外遥控的模式。

嗯……比我的最初想法丰富多了……

### 车身功能

![车身功能](https://i.loli.net/2021/09/27/Em4FxIQVOqHk23v.png)

### 程序构成

小车整体的思想是依托 BSP 提供的**设置事件回调函数**的功能，持续获取外部和车身命令，维护几个系统变量，根据命令和这些变量判断当前小车应该执行的动作。

~~就没必要给整体流程图了吧？~~

由于 BSP 是学校老师写的，且其中函数实现被封装进了库文件，我就不太好意思上传了，只讲一下整体的结构和我自己写的函数吧。

#### 系统变量和函数声明

```c
// main.h
// 老师写的数码管显示码表就略过了

/**
 * 提供四种模式：
 * 1. 红外遥控
 * 2. 蓝牙串口遥控
 * 3. 超声波避障
 * 4. 跟随/保持距离
 * 其中红外和蓝牙串口模式的运动状态均由 Remote() 控制
 * 避障模式的运动状态由 AutoMove(int i) 控制，跟随模式的运动状态由 Follow(int i) 控制
 * 系统利用 TenMsCallback()，每 10ms 进行运动控制，根据当前模式调用上述三个函数中的一个
 */

unsigned char rxd[2];		  // 红外和蓝牙接收的数据
unsigned char rxdHead = 0xFA; // 蓝牙校验，为配合红外的数据头校验，不特意使用 SetUart2Rxd() 设置

unsigned char flag;			// 标志位，是否允许操作，为1时允许操作
unsigned char speedState;	// PWM 控制标志
unsigned char speedControl; // 速度控制参数，将电机转速降为全速的 1/speedControl
unsigned char speedLevel;	// 速度档位，数字越大速度越快
unsigned char dirFlag;		// 避障转向选择
unsigned char mode;			// 模式标志

void ChangeSpeed();	   // 更改速度档位
void Remote();		   // 遥控
void AutoMove(int i);  // 避障
void Follow(int i);	   // 维持距离
void ModeBTRemote();   // 蓝牙遥控模式初始化
void ModeIRRemote();   // 红外遥控模式初始化
void ModeAuto();	   // 避障模式初始化
void ModeFollow();	   // 跟随&控制距离模式初始化
void SwitchModes();	   // 切换模式
void KeyCallback();	   // 按键事件回调函数
void Uart2Callback();  // 蓝牙接收数据回调函数，仅处理解锁上锁，运动控制被 TenMsCallback() 接管
void IRCallback();	   // 红外接收数据回调函数，仅处理解锁上锁，运动控制被 TenMsCallback() 接管
void TenMsCallback();  // 10ms 回调，实现电机转速控制
```

以上函数均在 `main.c` 中实现，下面出现的没有在此处声明的函数都来自老师的 BSP。

#### 系统初始化

```c
void main()
{
	Key_Init();				// 按键初始化
	DisplayerInit();		// 显示模块初始化
	SetDisplayerArea(0, 7); // 使用数码管范围
	BeepInit();				// 蜂鸣器初始化

	SetEventCallBack(enumEventKey, KeyCallback);	   // 设置按键回调函数，本机按键包括模式切换和上锁解锁
	SetEventCallBack(enumEventSys10mS, TenMsCallback); // 每 10ms 进行运动控制

	speedState = 1; // 给PWM控制位赋初值
	speedLevel = 1; // 默认速度档位
	flag = 1;		// 启动时未上锁
	MoveInit();		// 设置 s1 到 s4 推挽输出

	ModeIRRemote(); // 默认启动红外遥控模式，即模式0

	MySTC_Init();
	while (1)
	{
		MySTC_OS();
		LedPrint((flag << 7) + (1 << mode)); // 用 LED7 显示 flag 状态，亮起时表示未上锁
											 // LED0、1、2、3分别表示模式0、1、2、3
	}
}
```

#### 车身按键功能

```c
// 按下车机按键的回调函数
void KeyCallback()
{
	// 按下 key1 上锁解锁
	if (GetKeyAct(enumKey1) == enumKeyPress)
	{
		VStop();
		flag = !flag;
	}
	// 按下 key2 切换模式
	if (GetKeyAct(enumKey2) == enumKeyPress)
	{
		VStop();
		SwitchModes();
	}
}
```

#### 运动控制中枢

直接控制电机的函数就是之前写的那些。

设置系统 10ms 事件回调函数来控制运动：

```c
// 简单的 PWM，将电机转速控制为全速的 1/speedControl
void TenMsCallback()
{
	if (flag) // 未上锁
	{
		if (!speedState)
		{
			switch (mode) // 根据当前模式选择运动控制函数
			{
			case 0:
				Remote();
				break;
			case 1:
				Remote();
				break;
			case 2:
				AutoMove(GetUltraSonic());
				break;
			case 3:
				Follow(GetUltraSonic());
				break;
			default:
				break;
			}
		}
		else
			VStop();
		if (++speedState >= speedControl)
			speedState = 0;
	}
}
```

在程序中，0 <= speedState < speedControl。系统每次执行回调函数 speedState 会自加，超出范围后再赋值为0。只有在 speedState 为0时小车才会运动。

系统每执行 speedControl 次回调函数，只会有一次允许小车运动，即调整速度为全速的 1/speedControl。改变 speedControl 的值即可改变速度：

```c
// 调整速度，speedControl 的值是 3或4-speedLevel，所以speedLevel越大，速度越大
void ChangeSpeed()
{
	switch (speedLevel)
	{
	case 0:
		speedLevel = 1;
		break;
	case 1:
		speedLevel = 2;
		break;
	case 2:
		speedLevel = 0;
		break;
	default:
		break;
	}
}
```

你问我难道老师没有写速度控制？当然写了，可老师的 PWM 是控制 EXT 接口的，我用不了。步进电机那种从 S1 到 S4 依次扫描下来的方式也做不到控制两个直流电机。那就自己写咯……

#### 模式转换

```c
// 在四种模式之间轮换：红外->蓝牙->避障->跟随->红外...
void SwitchModes()
{
	switch (mode)
	{
	case 0:
		ModeBTRemote();
		break;
	case 1:
		ModeAuto();
		break;
	case 2:
		ModeFollow();
		break;
	case 3:
		ModeIRRemote();
		break;
	default:
		break;
	}
}
```

#### 红外和蓝牙遥控

红外遥控和蓝牙遥控都是一套逻辑，遥控器发送的命令数据和对应动作如下：

| **命令**              | **动作**     |
| --------------------- | ------------ |
| **0xFA,0x00** | 停车         |
| **0xFA,0x01**     | 前进         |
| **0xFA,0x02**     | 左转         |
| **0xFA,0x03**     | 右转         |
| **0xFA,0x04**     | 后退         |
| **0xFA,0x05**     | 鸣笛         |
| **0xFA,0x06**     | 模式转换     |
| **0xFA,0x07**     | 上锁解锁     |
| **0xFA,0x08**     | 切换速度档位 |

红外遥控器就是另一块同样的板子，按下按键发送命令：

| **按键**               | **动作**                           |
| ---------------------- | ---------------------------------- |
| **Up**                 | 前进                               |
| **Left**               | 左转                               |
| **Right**              | 右转                               |
| **Down**               | 后退                               |
| **Center**             | 停车                               |
| **Key3**               | 不发给小车，用于切换Key1和Key2的模式 |
| **Key1** **模式0** | 鸣笛                               |
| **Key1** **模式1** | 上锁解锁                           |
| **Key2** **模式0** | 速度控制                           |
| **Key2** **模式1** | 模式转换                           |

红外遥控器的程序就是简单的按键事件和导航按键事件回调函数，就不贴出来了。

至于蓝牙遥控器……~~比卷，~~我又写了个[安卓蓝牙遥控器](https://github.com/charliedu2000/BLESerial)，界面上的按键名就是对应功能。

小车的红外模式、蓝牙模式初始化：

```c
// 红外遥控模式初始化
void ModeIRRemote()
{
	Seg7Print(speedLevel, 10, 10, 10, 10, 10, 10, 0); // 默认模式下显示速度等级和默认指令
	IrInit(NEC_R05d);								  // 设置红外协议基本时间片时长，接收到的数据在回调函数和 Remote() 中再进行内容校验
	SetIrRxd(&rxd);

	SetEventCallBack(enumEventIrRxd, IRCallback);
	mode = 0;
}

// 蓝牙遥控模式初始化
void ModeBTRemote()
{
	Uart2Init(9600, Uart2UsedforEXT);  // 将串口2的波特率设为9600，用于 EXT
	SetUart2Rxd(&rxd, 2, &rxdHead, 0); // 将接收到的数据存到 rxd，不在此处设置校验
									   // 放到 Remote() 中和红外接收的数据一样用 if 语句校验

	SetEventCallBack(enumEventUart2Rxd, Uart2Callback);
	mode = 1;
}
```

接收到数据的回调函数：

```c
// 红外接收到数据的回调函数
void IRCallback()
{
	if (GetIrRxNum() != 0 && rxd[0] == rxdHead) // 简单校验，剩下的与运动状态有关的指令在 Remote() 中校验
	{
		Seg7Print(speedLevel, 10, 10, 10, 10, 10, 10, rxd[1]); // 数码管显示接收到的指令（0到8）
		if (rxd[1] == 6)
			VStop(), SwitchModes(); //IrPrint("CodeZone\n", sizeof("CodeZone\n"));
		else if (rxd[1] == 7)
			VStop(), flag = !flag; // 接收到7的时候进行上锁解锁操作
		else if (rxd[1] == 8)
			VStop(), ChangeSpeed();
	}
}

// 蓝牙接收到数据的回调函数
void Uart2Callback()
{
	if (rxd[0] == rxdHead) // 由于蓝牙初始化时不再设置校验，所以在这里简单校验
						   // 运动状态指令和红外模式一样在 Remote() 中校验
	{
		Seg7Print(speedLevel, 10, 10, 10, 10, 10, 10, rxd[1]); // 数码管显示接收到的指令（0到8）
		if (rxd[1] == 6)
			VStop(), SwitchModes(); //Uart2Print("CodeZone\n", sizeof("CodeZone\n"));
		else if (rxd[1] == 7)
			VStop(), flag = !flag; // 接收到7的时候进行上锁解锁操作
		else if (rxd[1] == 8)
			VStop(), ChangeSpeed();
	}
}
```

遥控模式下的控制：

```c
/**
 * 遥控：
 * 现在 Remote() 由 TenMsCallback() 直接调用
 * 这里不再包含上锁解锁等按下后只执行一次的操作
 * 上述操作仅在接收数据事件的回调函数里判断并执行
 */
void Remote()
{
	// 校验数据头
	if (rxd[0] == rxdHead)
	{
		switch (rxd[1])
		{
		case 0:
			VStop();
			break;
		case 1:
			speedControl = 3 - speedLevel;
			Forward();
			break;
		case 2:
			speedControl = 4 - speedLevel;
			TurnLeft();
			break;
		case 3:
			speedControl = 4 - speedLevel;
			TurnRight();
			break;
		case 4:
			speedControl = 3 - speedLevel;
			Backward();
			break;
		case 5:
			SetBeep(440, 50);
			break;
		default:
			break;
		}
	}
}
```

#### 避障

避障模式的初始化：

```c
// 避障模式初始化
void ModeAuto()
{
	EXTInit(enumEXTUltraSonic);
	dirFlag = 0;
	mode = 2;
}
```

避障模式下的控制：

```c
/**
 * 显示距离数值，根据距离选择方向
 * i 为距离值，单位是厘米
 */
void AutoMove(int i)
{
	Seg7Print(speedLevel, 10, 10, 10, 
			(i / 1000) % 10, (i / 100) % 10, (i / 10) % 10, i % 10); // 显示速度等级、与障碍物间的距离
	if (i > 20)
	{
		speedControl = 3 - speedLevel;
		Forward();
		dirFlag = !dirFlag;
	}
	else
	{
		speedControl = 4 - speedLevel;
		SetBeep(1000, 10 + 2 * i); // 距离值过小时蜂鸣器报警
		if (dirFlag)
			TurnLeft();
		else
			TurnRight();
	}
	// 当前可以看作随机转向，复杂情况下可能导致小车找不到可行路径
}
```

运动逻辑：

![避障模式运动逻辑](https://i.loli.net/2021/09/27/pFOxqZhGQ3ArHud.png)

*显然控制函数每 10ms 就可能被调用，这个流程图里就没有循环结构了。*

不得不说这个运动逻辑很有问题。在这个逻辑下，小车遇到障碍时的转向算是随机的，但是在复杂情况下就可能使小车一会儿左转一会儿右转，最后转不出去。让小车始终转向一个方向会好些。

由于硬件限制，我装不上舵机，也装不上多个超声波模块，就只能做到让它避开正前方的障碍了。（连这一个超声波模块都要跟蓝牙模块抢 EXT 接口，换模式还得插拔……）

#### 跟随

说是跟随，其实就是和障碍物保持一定距离罢了。

模式初始化：

```c
// 跟随模式初始化
void ModeFollow()
{
	EXTInit(enumEXTUltraSonic);
	mode = 3;
}
```

该模式下的运动控制：

```c
/**
 * 显示距离数值，保持一定距离
 * i 为距离值，单位是厘米
 */
void Follow(int i)
{
	Seg7Print(speedLevel, 10, 10, 10, 
			(i / 1000) % 10, (i / 100) % 10, (i / 10) % 10, i % 10); // 显示速度等级、与障碍物间的距离
	if (i > 20)
	{
		speedControl = 3 - speedLevel;
		Forward();
	}
	else if (i < 10)
	{
		speedControl = 3 - speedLevel;
		SetBeep(1000, 10 + 4 * i); // 距离值过小时蜂鸣器报警
		Backward();
	}
	else
	{
		VStop();
	}
}
```

这个运动逻辑就简单了：

![跟随模式运动逻辑](https://i.loli.net/2021/09/27/u2kjTUFf97LInDW.png)

当然，“跟随”的目标也只限正前方。

## 总结

所以我得到了什么呢？一个有四种模式的三蹦子。甚好。最初的目标实现了，这下不会空虚寂寞了（笑）。这个设计也拿了院里竞赛的一等奖，爽到。

当然，这个三蹦子还有很多可以改进的地方，包括一些运动逻辑和硬件的改装等等……嗯，未来可期！

<details><summary>一点负能量的东西……</summary>
关于这门课的得分……自己把设计思路输出出去，还提供了一些技术指导，结果那个同学几乎完全复刻，缝合了他自己原本的设计，比我得分还高……多多少少会感觉心里不舒服……算了算了……
</details>
