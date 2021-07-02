---
title: "BombLab实验"
categories: [ "快去学习" ]
tags: [ "学习笔记", ]
draft: false
slug: "74"
date: "2021-05-14 23:52:00"
---

# 拆掉邪恶博士的炸弹

> 这是一个课程实验，感觉有点意思，就记录一下吧。
> 
> 分析可能不准确，仅供参考。

## 邪恶博士的幽默感

```
/***************************************************************************
 * Dr. Evil's Insidious Bomb, Version 1.1
 * Copyright 2011, Dr. Evil Incorporated. All rights reserved.
 *
 * LICENSE:
 *
 * Dr. Evil Incorporated (the PERPETRATOR) hereby grants you (the
 * VICTIM) explicit permission to use this bomb (the BOMB).  This is a
 * time limited license, which expires on the death of the VICTIM.
 * The PERPETRATOR takes no responsibility for damage, frustration,
 * insanity, bug-eyes, carpal-tunnel syndrome, loss of sleep, or other
 * harm to the VICTIM.  Unless the PERPETRATOR wants to take credit,
 * that is.  The VICTIM may not distribute this bomb source code to
 * any enemies of the PERPETRATOR.  No VICTIM may debug,
 * reverse-engineer, run "strings" on, decompile, decrypt, or use any
 * other technique to gain knowledge of and defuse the BOMB.  BOMB
 * proof clothing may not be worn when handling this program.  The
 * PERPETRATOR will not apologize for the PERPETRATOR's poor sense of
 * humor.  This license is null and void where the BOMB is prohibited
 * by law.
 ***************************************************************************/
```

满满的中二之感，连我都看不惯了，解之。

由于我们并没有完整的源代码，只能通过汇编代码来尝试推出博士~~这个邪恶的刀客塔~~到底在炸弹里做了些什么手脚了。

## 第一关

```
/* Hmm...  Six phases must be more secure than one phase! */
```

邪恶博士的第一个关卡如下

```
08048b50 <phase_1>:
 8048b50:   83 ec 1c                sub    $0x1c,%esp
 8048b53:   c7 44 24 04 64 a1 04    movl   $0x804a164,0x4(%esp)
 8048b5a:   08 
 8048b5b:   8b 44 24 20             mov    0x20(%esp),%eax
 8048b5f:   89 04 24                mov    %eax,(%esp)
 8048b62:   e8 2d 04 00 00          call   8048f94 <strings_not_equal>
 8048b67:   85 c0                   test   %eax,%eax
 8048b69:   74 05                   je     8048b70 <phase_1+0x20>
 8048b6b:   e8 36 05 00 00          call   80490a6 <explode_bomb>
 8048b70:   83 c4 1c                add    $0x1c,%esp
 8048b73:   c3                      ret
```

看起来很短，大概是这样的：

把输入的内容传给了`phase_1`，根据`phase_1`调用了`<strings_not_equal>`猜想这里应该是把输入的字符串和某个字符串作比较，下面`test %eax,%eax`，当`%eax`为0时跳过`<explode_bomb>`，即`<strings_not_equal>`的返回值为0，两个字符串相等时跳过。

在`<strings_not_equal>`之前可以看到`movl $0x804a164,0x4(%esp)`，将这个立即数作为地址。使用gdb调试bomb程序，输入`x/s 0x804a164`，终端显示了`0x804a164: "Crikey! I have lost my mojo!"`。

再往下是`mov 0x20(%esp),%eax`，把手动输入的字符串的地址放进`%eax`，再放到`(%esp)`，传给了`<strings_not_equal>`。猜测需要输入的正确答案就是`0x804a164`处的字符串`Crikey! I have lost my mojo!`。

在`<explode_bomb>`前设置断点，`break explode_bomb`，输入run运行程序。输入字符串`Crikey! I have lost my mojo!`，终端显示`Phase 1 defused. How about the next one?`，第一关通过。

![phase1](https://i.loli.net/2021/06/05/xodRVhpKkq7BUI5.jpg)

## 第二关

```
/* The second phase is harder.  No one will ever figure out
 * how to defuse this... */
```

```
08048b74 <phase_2>:
 8048b74:   56                      push   %esi
 8048b75:   53                      push   %ebx
 8048b76:   83 ec 34                sub    $0x34,%esp
 8048b79:   8d 44 24 18             lea    0x18(%esp),%eax
 8048b7d:   89 44 24 04             mov    %eax,0x4(%esp)
 8048b81:   8b 44 24 40             mov    0x40(%esp),%eax
 8048b85:   89 04 24                mov    %eax,(%esp)
 8048b88:   e8 4e 06 00 00          call   80491db <read_six_numbers>
 8048b8d:   83 7c 24 18 00          cmpl   $0x0,0x18(%esp)
 8048b92:   75 07                   jne    8048b9b <phase_2+0x27>
 8048b94:   83 7c 24 1c 01          cmpl   $0x1,0x1c(%esp)
 8048b99:   74 05                   je     8048ba0 <phase_2+0x2c>
 8048b9b:   e8 06 05 00 00          call   80490a6 <explode_bomb>
```

由`<read_six_numbers>`可以猜想第二关要输入六个数。紧接着是`cmpl  $0x0,0x18(%esp)`和`jne 8048b9b <phase_2+0x27>`，而`8048b9b`处就是调用`<explode_bomb>`，也就是说如果第一个数不等于0就爆炸，所以第一个数是0。

再往下是`cmpl $0x1,0x1c(%esp)`和`je 8048ba0 <phase_2+0x2c>`，第二个数等于1就跳过爆炸。

```
8048ba0:   8d 5c 24 20             lea    0x20(%esp),%ebx
 8048ba4:   8d 74 24 30             lea    0x30(%esp),%esi
 8048ba8:   8b 43 f8                mov    -0x8(%ebx),%eax
 8048bab:   03 43 fc                add    -0x4(%ebx),%eax
 8048bae:   39 03                   cmp    %eax,(%ebx)
 8048bb0:   74 05                   je     8048bb7 <phase_2+0x43>
 8048bb2:   e8 ef 04 00 00          call   80490a6 <explode_bomb>
 8048bb7:   83 c3 04                add    $0x4,%ebx
 8048bba:   39 f3                   cmp    %esi,%ebx
 8048bbc:   75 ea                   jne    8048ba8 <phase_2+0x34>
 8048bbe:   83 c4 34                add    $0x34,%esp
 8048bc1:   5b                      pop    %ebx
 8048bc2:   5e                      pop    %esi
 8048bc3:   c3                      ret
```

接着是循环遍历剩下的数，由`mov -0x8(%ebx),%eax`、`add -0x4(%ebx),%eax`、`cmp %eax,(%ebx)`可以发现是用当前数与它前面两个数之和比较，相等就不爆炸，也就是说输入的数应该组成斐波那契数列，已经有了0和1，剩下的应该是1、2、3、5。

在终端输入`0 1 1 2 3 5`，终端输出了`That's number 2. Keep going!`，第二关通过。

![phase2](https://i.loli.net/2021/06/05/yXM4Omd15wWbu8V.jpg)

## 第三关

```
/* I guess this is too easy so far.  Some more complex code will
 * confuse people. */
```

```
08048bc4 <phase_3>:
 8048bc4:   83 ec 2c                sub    $0x2c,%esp
 8048bc7:   8d 44 24 1c             lea    0x1c(%esp),%eax
 8048bcb:   89 44 24 0c             mov    %eax,0xc(%esp)
 8048bcf:   8d 44 24 18             lea    0x18(%esp),%eax
 8048bd3:   89 44 24 08             mov    %eax,0x8(%esp)
 8048bd7:   c7 44 24 04 8b a3 04    movl   $0x804a38b,0x4(%esp)
 8048bde:   08 
 8048bdf:   8b 44 24 30             mov    0x30(%esp),%eax
 8048be3:   89 04 24                mov    %eax,(%esp)
 8048be6:   e8 85 fc ff ff          call   8048870 <__isoc99_sscanf@plt>
 8048beb:   83 f8 01                cmp    $0x1,%eax
 8048bee:   7f 05                   jg     8048bf5 <phase_3+0x31>
 8048bf0:   e8 b1 04 00 00          call   80490a6 <explode_bomb>
```

由`movl $0x804a38b,0x4(%esp)`可以猜想`0x804a38b`中保存的内容与`sscanf`有关。在gdb中输入`x/s 0x804a38b`，终端输出了`0x804a38b: "%d %d"`，猜想应该输入两个整数，`sscanf`的返回值与1比较，返回值（输入数的个数）大于1才能不爆炸。

```
8048bf5:   83 7c 24 18 07          cmpl   $0x7,0x18(%esp)
 8048bfa:   77 3c                   ja     8048c38 <phase_3+0x74>
```

输入的第一个数与7比较，小于等于7才不爆炸。

```
8048bfc:   8b 44 24 18             mov    0x18(%esp),%eax
 8048c00:   ff 24 85 a0 a1 04 08    jmp    *0x804a1a0(,%eax,4)
```

猜测是`switch`，使用以`*0x804a1a0`为基址的跳转表。

```
8048c07:   b8 f5 02 00 00          mov    $0x2f5,%eax
 8048c0c:   eb 3b                   jmp    8048c49 <phase_3+0x85>
 8048c0e:   b8 ad 03 00 00          mov    $0x3ad,%eax
 8048c13:   eb 34                   jmp    8048c49 <phase_3+0x85>
 8048c15:   b8 0e 02 00 00          mov    $0x20e,%eax
 8048c1a:   eb 2d                   jmp    8048c49 <phase_3+0x85>
 8048c1c:   b8 e3 03 00 00          mov    $0x3e3,%eax
 8048c21:   eb 26                   jmp    8048c49 <phase_3+0x85>
 8048c23:   b8 e0 03 00 00          mov    $0x3e0,%eax
 8048c28:   eb 1f                   jmp    8048c49 <phase_3+0x85>
 8048c2a:   b8 a3 02 00 00          mov    $0x2a3,%eax
 8048c2f:   eb 18                   jmp    8048c49 <phase_3+0x85>
 8048c31:   b8 5e 01 00 00          mov    $0x15e,%eax
 8048c36:   eb 11                   jmp    8048c49 <phase_3+0x85>
 8048c38:   e8 69 04 00 00          call   80490a6 <explode_bomb>
 8048c3d:   b8 00 00 00 00          mov    $0x0,%eax
 8048c42:   eb 05                   jmp    8048c49 <phase_3+0x85>
 8048c44:   b8 13 03 00 00          mov    $0x313,%eax
 8048c49:   3b 44 24 1c             cmp    0x1c(%esp),%eax
 8048c4d:   74 05                   je     8048c54 <phase_3+0x90>
 8048c4f:   e8 52 04 00 00          call   80490a6 <explode_bomb>
 8048c54:   83 c4 2c                add    $0x2c,%esp
 8048c57:   c3                      ret
```

输入`p/x *0x804a1a0`，终端输出了`"$1 = 0x8048c07"`，那么第一个数是0时，第二个数应该是`0x8048c07`处`mov $0x2f5,%eax`对应的数0x2f5，转换成十进制就是757。当第一个数是其他值时第二个数会有不同，比如当第一个数是2，通过`p/x *0x804a1a8`得到`$3 = 0x8048c0e`，第二个数应该是0x3ad，转换成十进制是941，其他情况不再一一列出。

输入`0 757`，终端输出了`Halfway there!`，第三关通过，答案不唯一。

![phase3](https://i.loli.net/2021/06/05/kXyj7TLxtaJEIB3.jpg)

## 第四关

```
/* Oh yeah?  Well, how good is your math?  Try on this saucy problem! */
```

```
08048cb5 <phase_4>:
 8048cb5:   83 ec 2c                sub    $0x2c,%esp
 8048cb8:   8d 44 24 18             lea    0x18(%esp),%eax
 8048cbc:   89 44 24 0c             mov    %eax,0xc(%esp)
 8048cc0:   8d 44 24 1c             lea    0x1c(%esp),%eax
 8048cc4:   89 44 24 08             mov    %eax,0x8(%esp)
 8048cc8:   c7 44 24 04 8b a3 04    movl   $0x804a38b,0x4(%esp)
 8048ccf:   08 
 8048cd0:   8b 44 24 30             mov    0x30(%esp),%eax
 8048cd4:   89 04 24                mov    %eax,(%esp)
 8048cd7:   e8 94 fb ff ff          call   8048870 <__isoc99_sscanf@plt>
 8048cdc:   83 f8 02                cmp    $0x2,%eax
 8048cdf:   75 0e                   jne    8048cef <phase_4+0x3a>
 8048ce1:   8b 44 24 18             mov    0x18(%esp),%eax
 8048ce5:   83 f8 01                cmp    $0x1,%eax
 8048ce8:   7e 05                   jle    8048cef <phase_4+0x3a>
```

根据`movl $0x804a38b,0x4(%esp)`，输入`x/s 0x804a38b`，得到`"0x804a38b: "%d %d""`，猜想应该输入两个整数。接下来`sscanf`返回值等于2就不爆炸，说明接受的输入数量是2个。

在这种情况下`"%d %d"`指定了`sscanf`接受的输入类型，使它只能接受两个输入，输入元素的数量大于2时返回值也是2，这样`secret_phase`的进入条件不会影响`phase_4`的正常通关。

```
8048cea:   83 f8 04                cmp    $0x4,%eax
 8048ced:   7e 05                   jle    8048cf4 <phase_4+0x3f>
 8048cef:   e8 b2 03 00 00          call   80490a6 <explode_bomb>
 8048cf4:   8b 44 24 18             mov    0x18(%esp),%eax
 8048cf8:   89 44 24 04             mov    %eax,0x4(%esp)
 8048cfc:   c7 04 24 06 00 00 00    movl   $0x6,(%esp)
 8048d03:   e8 50 ff ff ff          call   8048c58 <func4>
```

`mov 0x18(%esp),%eax`、`cmp $0x1,%eax`和`cmp $0x4,%eax`限定输入的第二个数应该大于1且小于等于4，再将6和输入的第二个数（这里记作x和y）传入`func4`。

func4：

```
08048c58 <func4>:
 8048c58:   83 ec 1c                sub    $0x1c,%esp
 8048c5b:   89 5c 24 10             mov    %ebx,0x10(%esp)
 8048c5f:   89 74 24 14             mov    %esi,0x14(%esp)
 8048c63:   89 7c 24 18             mov    %edi,0x18(%esp)
 8048c67:   8b 74 24 20             mov    0x20(%esp),%esi
 8048c6b:   8b 5c 24 24             mov    0x24(%esp),%ebx
 8048c6f:   85 f6                   test   %esi,%esi
 8048c71:   7e 2b                   jle    8048c9e <func4+0x46>
 8048c73:   83 fe 01                cmp    $0x1,%esi
 8048c76:   74 2b                   je     8048ca3 <func4+0x4b>
```

先判断x是否等于0，等于0则返回0；再判断x是否为1，为1则返回y。

```
8048c78:   89 5c 24 04             mov    %ebx,0x4(%esp)
 8048c7c:   8d 46 ff                lea    -0x1(%esi),%eax
 8048c7f:   89 04 24                mov    %eax,(%esp)
 8048c82:   e8 d1 ff ff ff          call   8048c58 <func4>
 8048c87:   8d 3c 18                lea    (%eax,%ebx,1),%edi
 8048c8a:   89 5c 24 04             mov    %ebx,0x4(%esp)
 8048c8e:   83 ee 02                sub    $0x2,%esi
 8048c91:   89 34 24                mov    %esi,(%esp)
 8048c94:   e8 bf ff ff ff          call   8048c58 <func4>
 8048c99:   8d 1c 07                lea    (%edi,%eax,1),%ebx
 8048c9c:   eb 05                   jmp    8048ca3 <func4+0x4b>
 8048c9e:   bb 00 00 00 00          mov    $0x0,%ebx
 8048ca3:   89 d8                   mov    %ebx,%eax
 8048ca5:   8b 5c 24 10             mov    0x10(%esp),%ebx
 8048ca9:   8b 74 24 14             mov    0x14(%esp),%esi
 8048cad:   8b 7c 24 18             mov    0x18(%esp),%edi
 8048cb1:   83 c4 1c                add    $0x1c,%esp
 8048cb4:   c3                      ret
```

剩下的部分，即x大于1时，把x-1的值和y当作参数调用`func4`，返回值与y相加后存到`%edi`，接着与这里类似，x减去2，把`x-2`和`y`当作参数调用`func4`，返回值与之前存在`%edi`中的值相加，所得结果作为返回值。

推测func4如下：

```
int func4(int x, int y) {
  if(x == 0) {
    return 0;
  }
  else if(x == 1) {
    return y;
  }
  else {
    return func4(x-1, y)+y+func4(x-2, y);
  }
}
```

回到`phase4`：

```
8048d08:   3b 44 24 1c             cmp    0x1c(%esp),%eax
 8048d0c:   74 05                   je     8048d13 <phase_4+0x5e>
 8048d0e:   e8 93 03 00 00          call   80490a6 <explode_bomb>
 8048d13:   83 c4 2c                add    $0x2c,%esp
 8048d16:   c3                      ret
```

`cmp 0x1c(%esp),%eax`，将`func4`的返回值与输入的第一个数比较，相等就跳过爆炸，那么输入的第一个数应该等于`func4`的返回值，该返回值与输入的第二个数有关，答案不唯一。

当输入的第二个数为4时，`func4`的返回值应该是80。

输入80 4，终端输出了`So you got that one. Try this one.`，第四关通过。

![phase4](https://i.loli.net/2021/06/05/EhNXclznmLyHFGs.jpg)

## 第五关

```
/* Round and 'round in memory we go, where we stop, the bomb blows! */
```

```
08048d17 <phase_5>:
 8048d17:   53                      push   %ebx
 8048d18:   83 ec 18                sub    $0x18,%esp
 8048d1b:   8b 5c 24 20             mov    0x20(%esp),%ebx
 8048d1f:   89 1c 24                mov    %ebx,(%esp)
 8048d22:   e8 54 02 00 00          call   8048f7b <string_length>
 8048d27:   83 f8 06                cmp    $0x6,%eax
 8048d2a:   74 05                   je     8048d31 <phase_5+0x1a>
 8048d2c:   e8 75 03 00 00          call   80490a6 <explode_bomb>
```

将输入的内容传到`(%esp)`再调用`<string_length>`，获取字符串长度并与6比较，长度为6才不爆炸。

```
8048d31:   ba 00 00 00 00          mov    $0x0,%edx
 8048d36:   b8 00 00 00 00          mov    $0x0,%eax
 8048d3b:   0f be 0c 03             movsbl (%ebx,%eax,1),%ecx
 8048d3f:   83 e1 0f                and    $0xf,%ecx
 8048d42:   03 14 8d c0 a1 04 08    add    0x804a1c0(,%ecx,4),%edx
 8048d49:   83 c0 01                add    $0x1,%eax
 8048d4c:   83 f8 06                cmp    $0x6,%eax
 8048d4f:   75 ea                   jne    8048d3b <phase_5+0x24>
```

接下来是一个循环，用`movsbl (%ebx,%eax,1),%ecx`和`and $0xf,%ecx`获得输入的字符串中每个字符的二进制编码低四位，`add 0x804a1c0(,%ecx,4),%edx`以每一步的四位编码作为偏移量在数组中找到对应的数，做累加，存到`%edx`。

```
8048d51:   83 fa 35                cmp    $0x35,%edx
 8048d54:   74 05                   je     8048d5b <phase_5+0x44>
 8048d56:   e8 4b 03 00 00          call   80490a6 <explode_bomb>
 8048d5b:   83 c4 18                add    $0x18,%esp
 8048d5e:   5b                      pop    %ebx
 8048d5f:   90                      nop
 8048d60:   c3                      ret
```

这里`cmp $0x35,%edx`，将上一步获得的结果与0x35（转化成十进制是53）比较，相等则跳过爆炸。

在gdb中输入`x/16d 0x804a1c0`，以十进制有符号数格式显示数组中的部分数值：

![nums](https://i.loli.net/2021/06/05/nWz8EwikTUpqQ3d.jpg)

只要输入的六个字符编码低四位作为偏移量对应数组元素之和等于53即可。比如输入字符a，ASCII码是`01100001`，低四位是`0001`，那么对应的数组元素就是`10`。按照这个方法可以得出一组可能的答案：`dehifk`。答案不唯一。

输入`dehifk`，终端输出`Good work! On to the next...`，第五关通过。

![phase5](https://i.loli.net/2021/06/05/rig7bMAeZzaQyk1.jpg)

## 第六关

```
/* This phase will never be used, since no one will get past the
 * earlier ones.  But just in case, make this one extra hard. */
```

```
08048d61 <phase_6>:
 8048d61:   56                      push   %esi
 8048d62:   53                      push   %ebx
 8048d63:   83 ec 44                sub    $0x44,%esp
 8048d66:   8d 44 24 10             lea    0x10(%esp),%eax
 8048d6a:   89 44 24 04             mov    %eax,0x4(%esp)
 8048d6e:   8b 44 24 50             mov    0x50(%esp),%eax
 8048d72:   89 04 24                mov    %eax,(%esp)
 8048d75:   e8 61 04 00 00          call   80491db <read_six_numbers>
```

由`<read_six_numbers>`可以看出这一关需要输入六个数。

```
8048d7a:   be 00 00 00 00          mov    $0x0,%esi
 8048d7f:   8b 44 b4 10             mov    0x10(%esp,%esi,4),%eax
 8048d83:   83 e8 01                sub    $0x1,%eax
 8048d86:   83 f8 05                cmp    $0x5,%eax
 8048d89:   76 05                   jbe    8048d90 <phase_6+0x2f>
 8048d8b:   e8 16 03 00 00          call   80490a6 <explode_bomb>
 8048d90:   83 c6 01                add    $0x1,%esi
 8048d93:   83 fe 06                cmp    $0x6,%esi
 8048d96:   74 33                   je     8048dcb <phase_6+0x6a>
```

这里进入一个循环，由`$0x0,%esi、mov 0x10(%esp,%esi,4),%eax`、`sub $0x1,%eax`和`cmp $0x5,%eax`发现输入的数必须小于等于6（注意`%eax`与5比较之前减去了1），`add $0x1,%esi、cmp $0x6,%esi`是循环条件，保证遍历输入的6个数，确定其大小。

```
8048d98:   89 f3                   mov    %esi,%ebx
 8048d9a:   8b 44 9c 10             mov    0x10(%esp,%ebx,4),%eax
 8048d9e:   39 44 b4 0c             cmp    %eax,0xc(%esp,%esi,4)
 8048da2:   75 05                   jne    8048da9 <phase_6+0x48>
 8048da4:   e8 fd 02 00 00          call   80490a6 <explode_bomb>
 8048da9:   83 c3 01                add    $0x1,%ebx
 8048dac:   83 fb 05                cmp    $0x5,%ebx
 8048daf:   7e e9                   jle    8048d9a <phase_6+0x39>
 8048db1:   eb cc                   jmp    8048d7f <phase_6+0x1e>
```

判断完一个数（记为`x`）的大小后进行嵌套的循环，其中`mov 0x10(%esp,%ebx,4),%eax`和`cmp %eax,0xc(%esp,%esi,4)`把后面的数和x进行比较，不相等才不会引发爆炸。这一层循环比较x和它后面的所有数。这两层循环就能确定输入的所有数都不相等。

```
8048db3:   8b 52 08                mov    0x8(%edx),%edx
 8048db6:   83 c0 01                add    $0x1,%eax
 8048db9:   39 c8                   cmp    %ecx,%eax
 8048dbb:   75 f6                   jne    8048db3 <phase_6+0x52>
​
 8048dbd:   89 54 b4 28             mov    %edx,0x28(%esp,%esi,4);
 8048dc1:   83 c3 01                add    $0x1,%ebx
 8048dc4:   83 fb 06                cmp    $0x6,%ebx
 8048dc7:   75 07                   jne    8048dd0 <phase_6+0x6f>;
 8048dc9:   eb 1c                   jmp    8048de7 <phase_6+0x86>
​
 8048dcb:   bb 00 00 00 00          mov    $0x0,%ebx
​
 8048dd0:   89 de                   mov    %ebx,%esi
 8048dd2:   8b 4c 9c 10             mov    0x10(%esp,%ebx,4),%ecx
 8048dd6:   b8 01 00 00 00          mov    $0x1,%eax
 8048ddb:   ba 3c c1 04 08          mov    $0x804c13c,%edx
 8048de0:   83 f9 01                cmp    $0x1,%ecx
 8048de3:   7f ce                   jg     8048db3 <phase_6+0x52>
 8048de5:   eb d6                   jmp    8048dbd <phase_6+0x5c>
```

做完之前的检查后程序跳到了`8048dcb`对应的行，这里也是一个循环，在这个循环中，以`0x804c13c`为基址，之前输入的数减1再乘8作为偏移量，按数被输入的顺序将对应的元素存入栈帧。

输入`x/20wx 0x804c13c`，得到如下内容：

![contents](https://i.loli.net/2021/06/05/IYUkiuCAZMjdDzb.jpg)

可以发现前面保存的内容都是地址的形式。由这些内容还可以看出应该输入的数是1到6这六个数。

如果输入的第一个数是`2`，那么偏移量是`8`，保存的地址就是`0x804c144`处的内容`0x804c148`。

```
8048de7:   8b 5c 24 28             mov    0x28(%esp),%ebx
 8048deb:   8b 44 24 2c             mov    0x2c(%esp),%eax
 8048def:   89 43 08                mov    %eax,0x8(%ebx)
 8048df2:   8b 54 24 30             mov    0x30(%esp),%edx
 8048df6:   89 50 08                mov    %edx,0x8(%eax)
 8048df9:   8b 44 24 34             mov    0x34(%esp),%eax
 8048dfd:   89 42 08                mov    %eax,0x8(%edx)
 8048e00:   8b 54 24 38             mov    0x38(%esp),%edx
 8048e04:   89 50 08                mov    %edx,0x8(%eax)
 8048e07:   8b 44 24 3c             mov    0x3c(%esp),%eax
 8048e0b:   89 42 08                mov    %eax,0x8(%edx)
 8048e0e:   c7 40 08 00 00 00 00    movl   $0x0,0x8(%eax)
```

之前保存完地址之后，程序按顺序将这些地址指向的数也保存进栈帧，按照上面假设的情况，保存的第一项是`0x143`。

```
8048e15:   be 05 00 00 00          mov    $0x5,%esi
 8048e1a:   8b 43 08                mov    0x8(%ebx),%eax
 8048e1d:   8b 10                   mov    (%eax),%edx
 8048e1f:   39 13                   cmp    %edx,(%ebx)
 8048e21:   7e 05                   jle    8048e28 <phase_6+0xc7>
 8048e23:   e8 7e 02 00 00          call   80490a6 <explode_bomb>
​
 8048e28:   8b 5b 08                mov    0x8(%ebx),%ebx
 8048e2b:   83 ee 01                sub    $0x1,%esi
 8048e2e:   75 ea                   jne    8048e1a <phase_6+0xb9>；aaa
​
 8048e30:   83 c4 44                add    $0x44,%esp
 8048e33:   5b                      pop    %ebx
 8048e34:   5e                      pop    %esi
 8048e35:   c3                      ret
```

在这之后，进行比较排序。`mov 0x8(%ebx),%eax`、`mov (%eax),%edx`和`cmp %edx,(%ebx)`每次都取一项与前一项进行比较，前一项小于后一项才不会爆炸。`sub  $0x1,%esi`、`jne 8048e1a <phase_6+0xb9>`是循环条件。

可以发现保存的数与输入的数的对应关系：

```
277 1
143 2
1f3 3
31d 4
281 5
8c  6
```

按升序排列：

```
8c  6
143 2
1f3 3
277 1
281 5
31d 4
```

也就是说输入数的顺序应该是6、2、3、1、5、4。

输入`6 2 3 1 5 4`，终端输出了`Congratulations! You've defused the bomb!`，第六关通过。

![phase6](https://i.loli.net/2021/06/05/4yp7FVA1wiEMkrI.jpg)

## 隐藏关卡

看起来我们已经解决了所有问题，但是事情好像并不像我们想得那么简单。

```
/* Wow, they got it!  But isn't something... missing?  Perhaps
 * something they overlooked?  Mua ha ha ha ha! */
```

这赤裸裸的嘲讽，能忍吗？（doge）

发现汇编代码中存在`secret_phase`，但是之前的过程并没有用到，猜测它是一个隐藏关卡。

### 进入条件

为了找到进入该关卡的条件，在汇编代码中寻找`secret_phase`，发现只有`phase_defused`调用了该函数。

首先分析`phase_defused`，它在通过每一个关卡后被调用。

```
0804922b <phase_defused>:
 804922b:   81 ec 8c 00 00 00       sub    $0x8c,%esp
 8049231:   65 a1 14 00 00 00       mov    %gs:0x14,%eax
 8049237:   89 44 24 7c             mov    %eax,0x7c(%esp)
 804923b:   31 c0                   xor    %eax,%eax
 804923d:   83 3d cc c3 04 08 06    cmpl   $0x6,0x804c3cc
 8049244:   75 72                   jne    80492b8 <phase_defused+0x8d>
```

`cmpl $0x6,0x804c3cc`可能与通过之前六关有关，没有全部通过就不会触发隐藏关卡。

```
8049246:   8d 44 24 2c             lea    0x2c(%esp),%eax
 804924a:   89 44 24 10             mov    %eax,0x10(%esp)
 804924e:   8d 44 24 28             lea    0x28(%esp),%eax
 8049252:   89 44 24 0c             mov    %eax,0xc(%esp)
 8049256:   8d 44 24 24             lea    0x24(%esp),%eax
 804925a:   89 44 24 08             mov    %eax,0x8(%esp)
 804925e:   c7 44 24 04 91 a3 04    movl   $0x804a391,0x4(%esp)
 8049265:   08 
 8049266:   c7 04 24 d0 c4 04 08    movl   $0x804c4d0,(%esp)
 804926d:   e8 fe f5 ff ff          call   8048870 <__isoc99_sscanf@plt>
```

把两个立即数地址传给`<__isoc99_sscanf@plt>`。查看第一个地址（`x/s 0x804a391`）发现是`"%d %d %s"`，应该输入两个整数和一个字符串。后一个地址`0x804c4d0`应该是输入时的地址，查看每一个关卡输入时的地址，发现**第四关**输入时的地址正好是`0x804c4d0`。

![input4](https://i.loli.net/2021/06/05/x7tO5IuYpvTCgKE.jpg)

```
8049272:   83 f8 03                cmp    $0x3,%eax
 8049275:   75 35                   jne    80492ac <phase_defused+0x81>
 8049277:   c7 44 24 04 9a a3 04    movl   $0x804a39a,0x4(%esp)
 804927e:   08 
 804927f:   8d 44 24 2c             lea    0x2c(%esp),%eax
 8049283:   89 04 24                mov    %eax,(%esp)
 8049286:   e8 09 fd ff ff          call   8048f94 <strings_not_equal>
 804928b:   85 c0                   test   %eax,%eax
 804928d:   75 1d                   jne    80492ac <phase_defused+0x81>
 804928f:   c7 04 24 60 a2 04 08    movl   $0x804a260,(%esp)
 8049296:   e8 65 f5 ff ff          call   8048800 <puts@plt>
 804929b:   c7 04 24 88 a2 04 08    movl   $0x804a288,(%esp)
 80492a2:   e8 59 f5 ff ff          call   8048800 <puts@plt>
 80492a7:   e8 db fb ff ff          call   8048e87 <secret_phase>
​
 80492ac:   c7 04 24 c0 a2 04 08    movl   $0x804a2c0,(%esp)
 80492b3:   e8 48 f5 ff ff          call   8048800 <puts@plt>
 80492b8:   8b 44 24 7c             mov    0x7c(%esp),%eax
 80492bc:   65 33 05 14 00 00 00    xor    %gs:0x14,%eax
 80492c3:   74 05                   je     80492ca <phase_defused+0x9f>
 80492c5:   e8 06 f5 ff ff          call   80487d0 <__stack_chk_fail@plt>
 80492ca:   81 c4 8c 00 00 00       add    $0x8c,%esp
 80492d0:   c3                      ret
```

将`<__isoc99_sscanf@plt>`的返回值与3比较，猜测该返回值应该是参数的数量，等于3才可能解锁隐藏关。然后又传递了一个地址`0x804a39a`，将该地址处的字符串与输入的字符串比较，相等才能解锁隐藏关。在gdb中输入`x/s 0x804a39a`，得到该处的字符串是`DrEvil`。

所以在进行第四关时，输入两个数后再输入`DrEvil`，通过第六关之后即可进入`secret_phase`。第四关里面获取输入元素数量也使用了`<__isoc99_sscanf@plt>`，在那里给的参数是`"%d %d"`，应该是只能接受两个输入，即使输入了三个，返回值也会是2，第四关的通关不受影响。

进入secret_phase：

![enter-sp](https://i.loli.net/2021/06/05/CRqUj6n8Ki7ZlDd.jpg)

### 分析secret_phase

```
08048e87 <secret_phase>:
 8048e87:   53                      push   %ebx
 8048e88:   83 ec 18                sub    $0x18,%esp
 8048e8b:   e8 3d 02 00 00          call   80490cd <read_line>
 8048e90:   c7 44 24 08 0a 00 00    movl   $0xa,0x8(%esp)
 8048e97:   00 
 8048e98:   c7 44 24 04 00 00 00    movl   $0x0,0x4(%esp)
 8048e9f:   00 
 8048ea0:   89 04 24                mov    %eax,(%esp)
 8048ea3:   e8 38 fa ff ff          call   80488e0 <strtol@plt>
```

由`<read_line>`可知要有一行输入，然后输入的内容和`0xa`、`0x0`两个立即数一起作为`<strtol@plt>`的参数。`<strtol@plt>`的作用是把参数按照其base（即进制）转换成长整型数，由此可知应该输入的是一个数。

```
8048ea8:   89 c3                   mov    %eax,%ebx
 8048eaa:   8d 40 ff                lea    -0x1(%eax),%eax
 8048ead:   3d e8 03 00 00          cmp    $0x3e8,%eax
 8048eb2:   76 05                   jbe    8048eb9 <secret_phase+0x32>
 8048eb4:   e8 ed 01 00 00          call   80490a6 <explode_bomb>
```

输入的数应该小于等于1001。

```
8048eb9:   89 5c 24 04             mov    %ebx,0x4(%esp);
 8048ebd:   c7 04 24 88 c0 04 08    movl   $0x804c088,(%esp)
 8048ec4:   e8 6d ff ff ff          call   8048e36 <fun7>
 8048ec9:   83 f8 07                cmp    $0x7,%eax
 8048ecc:   74 05                   je     8048ed3 <secret_phase+0x4c>
 8048ece:   e8 d3 01 00 00          call   80490a6 <explode_bomb>
```

把地址`0x804c088`和输入的数作为参数调用`fun7`。要求`fun7`的返回值等于7。

接下来分析`fun7`：

记`fun7`的参数为`x`和`y`，在`secret_phase`中调用时`x`是一个地址。

```
08048e36 <fun7>:
 8048e36:   53                      push   %ebx
 8048e37:   83 ec 18                sub    $0x18,%esp
 8048e3a:   8b 54 24 20             mov    0x20(%esp),%edx
 8048e3e:   8b 4c 24 24             mov    0x24(%esp),%ecx
 8048e42:   85 d2                   test   %edx,%edx
 8048e44:   74 37                   je     8048e7d <fun7+0x47>
```

它是一个递归函数，当x为0时返回`0xffffffff`。不过`secret_phase`传给它的x不为0。

```
8048e46:   8b 1a                   mov    (%edx),%ebx
 8048e48:   39 cb                   cmp    %ecx,%ebx
 8048e4a:   7e 13                   jle    8048e5f <fun7+0x29>
 8048e4c:   89 4c 24 04             mov    %ecx,0x4(%esp)
 8048e50:   8b 42 04                mov    0x4(%edx),%eax
 8048e53:   89 04 24                mov    %eax,(%esp)
 8048e56:   e8 db ff ff ff          call   8048e36 <fun7>
 8048e5b:   01 c0                   add    %eax,%eax
 8048e5d:   eb 23                   jmp    8048e82 <fun7+0x4c>
```

若x不为0，当x指向的值大于y，将地址x加4，和y一起作为参数调用fun7，返回其返回值的2倍。当x指向的值等于y，返回0。

```
8048e5f:   b8 00 00 00 00          mov    $0x0,%eax
 8048e64:   39 cb                   cmp    %ecx,%ebx
 8048e66:   74 1a                   je     8048e82 <fun7+0x4c>
​
 8048e68:   89 4c 24 04             mov    %ecx,0x4(%esp)
 8048e6c:   8b 42 08                mov    0x8(%edx),%eax
 8048e6f:   89 04 24                mov    %eax,(%esp)
 8048e72:   e8 bf ff ff ff          call   8048e36 <fun7>
​
 8048e77:   8d 44 00 01             lea    0x1(%eax,%eax,1),%eax
 8048e7b:   eb 05                   jmp    8048e82 <fun7+0x4c>
```

当x指向的值小于y，将地址x加8，和y一起作为参数调用fun7，返回其返回值的2倍加1。

```
8048e7d:   b8 ff ff ff ff          mov    $0xffffffff,%eax
 8048e82:   83 c4 18                add    $0x18,%esp
 8048e85:   5b                      pop    %ebx
 8048e86:   c3                      ret
```

最终需要的返回值是7，最内层返回值应该是0，即在最内层x所指向的值与y相等，再往外一层返回2*0+1，再往外一层返回2*1+1，最外层返回2*3+1。

输入`x/44x 0x804c088`查看保存的值。

![values](https://i.loli.net/2021/06/05/rIbYyvn1j2AHZa7.jpg)

`secret_phase`调用`fun7`时，x为`0x804c088`，y是输入的数。

`0x804c088+8`等于`0x804c090`，该处存放的值为`0x804c0a0`，是一个地址。

`0x804c0a0+8`等于`0x804c0a8`，该处存放的值为`0x804c0d0`，是一个地址。

`0x804c0d0+8`等于`0x804c0d8`，该处存放的值为`0x804c130`，是一个地址。

地址`0x804c130`处保存了一个数，0x3e9，转换成十进制是1001，它应该等于y。

返回到`secret_phase`:

```
8048ed3:   c7 04 24 00 a2 04 08    movl   $0x804a200,(%esp)
 8048eda:   e8 21 f9 ff ff          call   8048800 <puts@plt>
 8048edf:   e8 47 03 00 00          call   804922b <phase_defused>
 8048ee4:   83 c4 18                add    $0x18,%esp
 8048ee7:   5b                      pop    %ebx
 8048ee8:   c3                      ret
```

`fun7(0x804c088, 1001)`的返回值应该是7，使得程序输出通关信息，正常返回。也就是说，要通过`secret_phase`，应该输入`1001`。

输入`1001`，终端输出了`Wow! You've defused the secret stage!`，隐藏的秘密关卡通过。

![sp](https://i.loli.net/2021/06/05/oSlURyD4XP8NbhZ.jpg)

## 通关

![victory](https://i.loli.net/2021/06/05/TpuSW5DxAa8yQje.jpg)

有几关的答案不唯一。这个实验每个人的题目不太一样，不过在网上能找到很多类似的题解来提供思路。和身边的人对比起来，我抽到的题目算是比较常规吧。邪恶博士，谢谢你（才怪）。

