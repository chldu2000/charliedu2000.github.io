---
title: "i3wm配置备份"
categories: [ "有趣的东西" ]
tags: [ "i3wm" ]
draft: false
slug: "59"
date: 2021-04-09 22:43:00
updated: 2021-04-09 22:43:00
---

## i3wm配置

> i3wm的配置备份，基本只写了非默认的部分。

<!-- more -->

## ~/.config/i3/config

```txt
# mod键为win键
set $mod Mod4

gaps inner 5
# 设置i3窗口间的空隙大小，单位是像素。
new_window 1pixel
# 设置新的窗口的边界宽度，效果是不显示窗口的title。
new_float 1pixel
# 新的浮动窗口的边界宽度，同上。
smart_borders on
# 在只有一个窗口的情况下自动最大化当前的窗口，不处理窗口的Gap。

# 电源管理
exec --no-startup-id xfce4-power-manager

#登录时 启用窗口透明
exec_always --no-startup-id picom -b

#exec_always --no-startup-id ibus-daemon -dr
# fcitx5输入法
exec_always --no-startup-id fcitx5

#自动平铺
exec_always --no-startup-id autotiling

#随机壁纸
exec --no-startup-id feh --randomize --bg-fill ~/Pictures/Wallpapers

font pango:DejaVu Sans Mono 10

# start a terminal : alacritty
bindsym $mod+Return exec alacritty

# 应用菜单改为rofi
bindsym $mod+d exec --no-startup-id rofi -show drun

# Start i3bar to display a workspace bar (plus the system information i3status
# finds out, if available)
bar {
        status_command i3status
        position top
}
```

## ~/.config/alacritty/alacritty.yml

```txt
# KDE Breeze (Ported from Konsole)
colors:
  # Default colors
  primary:
    background: '#232627'
    foreground: '#fcfcfc'

    dim_foreground: '#eff0f1'
    bright_foreground: '#ffffff'
    dim_background: '#31363b'
    bright_background: '#000000'

  # Normal colors
  normal:
    black: '#232627'
    red: '#ed1515'
    green: '#11d116'
    yellow: '#f67400'
    blue: '#1d99f3'
    magenta: '#9b59b6'
    cyan: '#1abc9c'
    white: '#fcfcfc'

  # Bright colors
  bright:
    black: '#7f8c8d'
    red: '#c0392b'
    green: '#1cdc9a'
    yellow: '#fdbc4b'
    blue: '#3daee9'
    magenta: '#8e44ad'
    cyan: '#16a085'
    white: '#ffffff'

  # Dim colors
  dim:
    black: '#31363b'
    red: '#783228'
    green: '#17a262'
    yellow: '#b65619'
    blue: '#1b668f'
    magenta: '#614a73'
    cyan: '#186c60'
    white: '#63686d'

background_opacity: 0.90
# 设置字体
font:
  normal:
    family: "Hack Nerd Font"
    style: Regular
  bold:
    family: "Hack Nerd Font"
    style: Bold
  italic:
    family: "Hack Nerd Font"
    style: Italic
  bold_italic:
    family: "Hack Nerd Font"
    style: Bold Italic

  # 字大小
  size: 8.0 

  offset:
    x: 0
    y: 0
  glyph_offset:
    x: 0
    y: 0

window:
  padding:
    x: 2
    y: 2

scrolling:
# 回滚缓冲区中的最大行数,指定“0”将禁用滚动。
  history: 10000

  # 滚动行数 

  multiplier: 10

# 如果为‘true’，则使用亮色变体绘制粗体文本。
draw_bold_text_with_bright_colors: true

selection:
  semantic_escape_chars: ',│`|:"'' ()[]{}<>'
  save_to_clipboard: true

live_config_reload: true

# 解决ssh之后不能正确识别终端类型的问题
env:
  TERM: xterm-256color
```

## /etc/X11/xorg.conf.d/90-touchpad.conf

```txt
Section "InputClass"
        Identifier "touchpad"
        MatchIsTouchpad "on"
        Driver "libinput"
        Option "Tapping" "on"
	Option "NaturalScrolling" "on"
EndSection
```

## /etc/i3status.conf

```txt
general {
        colors = true
        interval = 5
}

order += "wireless _first_"
# order += "ethernet _first_"
order += "volume master"
order += "battery all"
order += "disk /"
order += "load"
order += "memory"
order += "tztime local"

volume master {
        format = "♪: %volume"
        format_muted = "♪: muted (%volume)"
        device = "default"
        mixer = "Master"
        mixer_idx = 0
}

wireless _first_ {
        format_up = "W: (%quality at %essid)"
        format_down = "W: down"
}

ethernet _first_ {
        format_up = "E: %ip (%speed)"
        format_down = "E: down"
}

battery all {
        format = "%status %percentage %remaining"
        format_down = "No battery"
        status_chr = "⚡"
        status_bat = "🔋"
        status_unk = "?"
        status_full = "☻"
        path = "/sys/class/power_supply/BAT%d/uevent"
        low_threshold = 15
}

disk "/" {
        format = "/ %avail free"
}

load {
        format = "Load %1min"
}

memory {
        format = "RAM %used | %available"
        threshold_degraded = "1G"
        format_degraded = "MEMORY < %available"
}

tztime local {
        format = "%Y-%m-%d %H:%M"
}
```

