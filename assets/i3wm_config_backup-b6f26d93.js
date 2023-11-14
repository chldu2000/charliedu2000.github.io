import{_ as r}from"./ValaxyMain.vue_vue_type_style_index_0_lang-40050c3d.js";import{_ as A,c as C,w as l,o as y,b as s,d as n,e as c,a as d,r as e,f as D,p as f}from"./app-025bdceb.js";import"./YunFooter.vue_vue_type_script_setup_true_lang-dd4500d1.js";import"./YunCard.vue_vue_type_style_index_0_lang-c0980680.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-870a2da2.js";const O=JSON.parse('{"title":"i3wm配置备份","description":"","frontmatter":{"title":"i3wm配置备份","categories":["奇怪的知识增加了"],"tags":["i3wm"],"draft":false,"slug":"59","date":"2021-04-09T22:43:00.000Z","updated":"2021-04-09T22:43:00.000Z"},"headers":[{"level":2,"title":"i3wm配置","slug":"i3wm配置","link":"#i3wm配置","children":[]},{"level":2,"title":"~/.config/i3/config","slug":"config-i3-config","link":"#config-i3-config","children":[]},{"level":2,"title":"~/.config/alacritty/alacritty.yml","slug":"config-alacritty-alacritty-yml","link":"#config-alacritty-alacritty-yml","children":[]},{"level":2,"title":"/etc/X11/xorg.conf.d/90-touchpad.conf","slug":"etc-x11-xorg-conf-d-90-touchpad-conf","link":"#etc-x11-xorg-conf-d-90-touchpad-conf","children":[]},{"level":2,"title":"/etc/i3status.conf","slug":"etc-i3status-conf","link":"#etc-i3status-conf","children":[]}],"relativePath":"pages/posts/things/i3wm_config_backup.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/things/i3wm_config_backup.md","lastUpdated":1699970883000}'),t=JSON.parse('{"title":"i3wm配置备份","description":"","frontmatter":{"title":"i3wm配置备份","categories":["奇怪的知识增加了"],"tags":["i3wm"],"draft":false,"slug":"59","date":"2021-04-09T22:43:00.000Z","updated":"2021-04-09T22:43:00.000Z"},"headers":[{"level":2,"title":"i3wm配置","slug":"i3wm配置","link":"#i3wm配置","children":[]},{"level":2,"title":"~/.config/i3/config","slug":"config-i3-config","link":"#config-i3-config","children":[]},{"level":2,"title":"~/.config/alacritty/alacritty.yml","slug":"config-alacritty-alacritty-yml","link":"#config-alacritty-alacritty-yml","children":[]},{"level":2,"title":"/etc/X11/xorg.conf.d/90-touchpad.conf","slug":"etc-x11-xorg-conf-d-90-touchpad-conf","link":"#etc-x11-xorg-conf-d-90-touchpad-conf","children":[]},{"level":2,"title":"/etc/i3status.conf","slug":"etc-i3status-conf","link":"#etc-i3status-conf","children":[]}],"relativePath":"pages/posts/things/i3wm_config_backup.md","path":"/home/runner/work/charliedu2000.github.io/charliedu2000.github.io/pages/posts/things/i3wm_config_backup.md","lastUpdated":1699970883000}'),m={name:"pages/posts/things/i3wm_config_backup.md",data(){return{data:t,frontmatter:t.frontmatter}},setup(){f("pageData",t)}},u={id:"i3wm配置",tabindex:"-1"},g=s("blockquote",null,[s("p",null,"i3wm的配置备份，基本只写了非默认的部分。")],-1),h={id:"config-i3-config",tabindex:"-1"},_=s("div",{class:"language-txt"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# mod键为win键")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"set $mod Mod4")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"gaps inner 5")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 设置i3窗口间的空隙大小，单位是像素。")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"new_window 1pixel")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 设置新的窗口的边界宽度，效果是不显示窗口的title。")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"new_float 1pixel")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 新的浮动窗口的边界宽度，同上。")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"smart_borders on")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 在只有一个窗口的情况下自动最大化当前的窗口，不处理窗口的Gap。")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 电源管理")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"exec --no-startup-id xfce4-power-manager")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"#登录时 启用窗口透明")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"exec_always --no-startup-id picom -b")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"#exec_always --no-startup-id ibus-daemon -dr")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# fcitx5输入法")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"exec_always --no-startup-id fcitx5")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"#自动平铺")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"exec_always --no-startup-id autotiling")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"#随机壁纸")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"exec --no-startup-id feh --randomize --bg-fill ~/Pictures/Wallpapers")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"font pango:DejaVu Sans Mono 10")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# start a terminal : alacritty")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"bindsym $mod+Return exec alacritty")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 应用菜单改为rofi")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"bindsym $mod+d exec --no-startup-id rofi -show drun")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# Start i3bar to display a workspace bar (plus the system information i3status")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# finds out, if available)")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"bar {")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"        status_command i3status")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"        position top")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])],-1),b={id:"config-alacritty-alacritty-yml",tabindex:"-1"},w=s("div",{class:"language-txt"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# KDE Breeze (Ported from Konsole)")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"colors:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  # Default colors")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  primary:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    background: '#232627'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    foreground: '#fcfcfc'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    dim_foreground: '#eff0f1'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    bright_foreground: '#ffffff'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    dim_background: '#31363b'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    bright_background: '#000000'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  # Normal colors")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  normal:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    black: '#232627'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    red: '#ed1515'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    green: '#11d116'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    yellow: '#f67400'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    blue: '#1d99f3'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    magenta: '#9b59b6'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    cyan: '#1abc9c'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    white: '#fcfcfc'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  # Bright colors")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  bright:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    black: '#7f8c8d'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    red: '#c0392b'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    green: '#1cdc9a'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    yellow: '#fdbc4b'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    blue: '#3daee9'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    magenta: '#8e44ad'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    cyan: '#16a085'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    white: '#ffffff'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  # Dim colors")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  dim:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    black: '#31363b'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    red: '#783228'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    green: '#17a262'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    yellow: '#b65619'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    blue: '#1b668f'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    magenta: '#614a73'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    cyan: '#186c60'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    white: '#63686d'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"background_opacity: 0.90")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 设置字体")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"font:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  normal:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'    family: "Hack Nerd Font"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    style: Regular")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  bold:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'    family: "Hack Nerd Font"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    style: Bold")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  italic:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'    family: "Hack Nerd Font"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    style: Italic")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  bold_italic:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'    family: "Hack Nerd Font"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    style: Bold Italic")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  # 字大小")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  size: 8.0 ")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  offset:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    x: 0")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    y: 0")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  glyph_offset:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    x: 0")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    y: 0")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"window:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  padding:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    x: 2")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    y: 2")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"scrolling:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 回滚缓冲区中的最大行数,指定“0”将禁用滚动。")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  history: 10000")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  # 滚动行数 ")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  multiplier: 10")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 如果为‘true’，则使用亮色变体绘制粗体文本。")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"draw_bold_text_with_bright_colors: true")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"selection:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  semantic_escape_chars: ',│`|:\"'' ()[]{}<>'")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  save_to_clipboard: true")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"live_config_reload: true")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"# 解决ssh之后不能正确识别终端类型的问题")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"env:")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"  TERM: xterm-256color")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])],-1),x={id:"etc-x11-xorg-conf-d-90-touchpad-conf",tabindex:"-1"},k=s("div",{class:"language-txt"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'Section "InputClass"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        Identifier "touchpad"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        MatchIsTouchpad "on"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        Driver "libinput"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        Option "Tapping" "on"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'	Option "NaturalScrolling" "on"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"EndSection")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])],-1),v={id:"etc-i3status-conf",tabindex:"-1"},$=s("div",{class:"language-txt"},[s("span",{class:"copy"}),s("pre",{class:"shiki material-theme-palenight",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"general {")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"        colors = true")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"        interval = 5")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'order += "wireless _first_"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'# order += "ethernet _first_"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'order += "volume master"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'order += "battery all"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'order += "disk /"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'order += "load"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'order += "memory"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'order += "tztime local"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"volume master {")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format = "♪: %volume"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format_muted = "♪: muted (%volume)"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        device = "default"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        mixer = "Master"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"        mixer_idx = 0")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"wireless _first_ {")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format_up = "W: (%quality at %essid)"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format_down = "W: down"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"ethernet _first_ {")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format_up = "E: %ip (%speed)"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format_down = "E: down"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"battery all {")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format = "%status %percentage %remaining"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format_down = "No battery"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        status_chr = "⚡"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        status_bat = "🔋"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        status_unk = "?"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        status_full = "☻"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        path = "/sys/class/power_supply/BAT%d/uevent"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"        low_threshold = 15")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'disk "/" {')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format = "/ %avail free"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"load {")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format = "Load %1min"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"memory {")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format = "RAM %used | %available"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        threshold_degraded = "1G"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format_degraded = "MEMORY < %available"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"tztime local {")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},'        format = "%Y-%m-%d %H:%M"')]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"}")]),n(`
`),s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}})])])])],-1);function N(a,M,T,B,i,S){const o=D,p=r;return y(),C(p,{frontmatter:i.frontmatter,data:i.data},{"main-content-md":l(()=>[s("h2",u,[n("i3wm配置 "),c(o,{class:"header-anchor",href:"#i3wm配置","aria-hidden":"true"},{default:l(()=>[n("#")]),_:1})]),g,d(" more "),s("h2",h,[n("~/.config/i3/config "),c(o,{class:"header-anchor",href:"#config-i3-config","aria-hidden":"true"},{default:l(()=>[n("#")]),_:1})]),_,s("h2",b,[n("~/.config/alacritty/alacritty.yml "),c(o,{class:"header-anchor",href:"#config-alacritty-alacritty-yml","aria-hidden":"true"},{default:l(()=>[n("#")]),_:1})]),w,s("h2",x,[n("/etc/X11/xorg.conf.d/90-touchpad.conf "),c(o,{class:"header-anchor",href:"#etc-x11-xorg-conf-d-90-touchpad-conf","aria-hidden":"true"},{default:l(()=>[n("#")]),_:1})]),k,s("h2",v,[n("/etc/i3status.conf "),c(o,{class:"header-anchor",href:"#etc-i3status-conf","aria-hidden":"true"},{default:l(()=>[n("#")]),_:1})]),$]),"main-header":l(()=>[e(a.$slots,"main-header")]),"main-header-after":l(()=>[e(a.$slots,"main-header-after")]),"main-nav":l(()=>[e(a.$slots,"main-nav")]),"main-content":l(()=>[e(a.$slots,"main-content")]),"main-content-after":l(()=>[e(a.$slots,"main-content-after")]),"main-nav-before":l(()=>[e(a.$slots,"main-nav-before")]),"main-nav-after":l(()=>[e(a.$slots,"main-nav-after")]),comment:l(()=>[e(a.$slots,"comment")]),footer:l(()=>[e(a.$slots,"footer")]),aside:l(()=>[e(a.$slots,"aside")]),"aside-custom":l(()=>[e(a.$slots,"aside-custom")]),default:l(()=>[e(a.$slots,"default")]),_:3},8,["frontmatter","data"])}const R=A(m,[["render",N]]);export{O as __pageData,R as default};
