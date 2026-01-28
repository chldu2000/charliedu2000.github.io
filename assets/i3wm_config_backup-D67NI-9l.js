import{_ as d}from"./ValaxyMain.vue_vue_type_style_index_0_lang-W4huc0WW.js";import{A as f,f as m,o as g,w as a,Q as p,a as n,g as h,H as s,e as b,ad as o}from"./app-1HJeoz-c.js";import"./YunComment.vue_vue_type_style_index_0_lang-l30xdsKI.js";import"./index-C5okkQwF.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-DgsY1z78.js";import"./post-BWvOEICl.js";const N={__name:"i3wm_config_backup",setup(y,{expose:u}){const i=JSON.parse('{"title":"i3wm配置备份","description":"","frontmatter":{"title":"i3wm配置备份","categories":["有趣的东西"],"tags":["i3wm"],"draft":false,"slug":"59","date":"2021-04-09 22:43:00","updated":"2021-04-09 22:43:00","excerpt_type":"html"},"headers":[{"level":2,"title":"i3wm配置","slug":"i3wm配置","link":"#i3wm配置","children":[]},{"level":2,"title":"~/.config/i3/config","slug":"config-i3-config","link":"#config-i3-config","children":[]},{"level":2,"title":"~/.config/alacritty/alacritty.yml","slug":"config-alacritty-alacritty-yml","link":"#config-alacritty-alacritty-yml","children":[]},{"level":2,"title":"/etc/X11/xorg.conf.d/90-touchpad.conf","slug":"etc-x11-xorg-conf-d-90-touchpad-conf","link":"#etc-x11-xorg-conf-d-90-touchpad-conf","children":[]},{"level":2,"title":"/etc/i3status.conf","slug":"etc-i3status-conf","link":"#etc-i3status-conf","children":[]}],"relativePath":"pages/posts/things/i3wm_config_backup.md","path":"/home/runner/work/chldu2000.github.io/chldu2000.github.io/pages/posts/things/i3wm_config_backup.md","lastUpdated":1769604377000}'),c=f(),t=i.frontmatter||{};return c.meta.frontmatter=Object.assign(c.meta.frontmatter||{},i.frontmatter||{}),o("pageData",i),o("valaxy:frontmatter",t),globalThis.$frontmatter=t,u({frontmatter:{title:"i3wm配置备份",categories:["有趣的东西"],tags:["i3wm"],draft:!1,slug:"59",date:"2021-04-09 22:43:00",updated:"2021-04-09 22:43:00",excerpt_type:"html"}}),(e,l)=>{const r=d;return g(),m(r,{frontmatter:b(t)},{"main-content-md":a(()=>[l[0]||(l[0]=n("h2",{id:"i3wm配置",tabindex:"-1"},[s("i3wm配置 "),n("a",{class:"header-anchor",href:"#i3wm配置","aria-label":'Permalink to "i3wm配置"'},"​")],-1)),l[1]||(l[1]=n("blockquote",null,[n("p",null,"i3wm的配置备份，基本只写了非默认的部分。")],-1)),h(" more "),l[2]||(l[2]=n("h2",{id:"config-i3-config",tabindex:"-1"},[s("~/.config/i3/config "),n("a",{class:"header-anchor",href:"#config-i3-config","aria-label":'Permalink to "~/.config/i3/config"'},"​")],-1)),l[3]||(l[3]=n("div",{class:"language-txt vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"txt"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[n("code",{"v-pre":""},[n("span",{class:"line"},[n("span",null,"# mod键为win键")]),s(`
`),n("span",{class:"line"},[n("span",null,"set $mod Mod4")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"gaps inner 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 设置i3窗口间的空隙大小，单位是像素。")]),s(`
`),n("span",{class:"line"},[n("span",null,"new_window 1pixel")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 设置新的窗口的边界宽度，效果是不显示窗口的title。")]),s(`
`),n("span",{class:"line"},[n("span",null,"new_float 1pixel")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 新的浮动窗口的边界宽度，同上。")]),s(`
`),n("span",{class:"line"},[n("span",null,"smart_borders on")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 在只有一个窗口的情况下自动最大化当前的窗口，不处理窗口的Gap。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 电源管理")]),s(`
`),n("span",{class:"line"},[n("span",null,"exec --no-startup-id xfce4-power-manager")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"#登录时 启用窗口透明")]),s(`
`),n("span",{class:"line"},[n("span",null,"exec_always --no-startup-id picom -b")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"#exec_always --no-startup-id ibus-daemon -dr")]),s(`
`),n("span",{class:"line"},[n("span",null,"# fcitx5输入法")]),s(`
`),n("span",{class:"line"},[n("span",null,"exec_always --no-startup-id fcitx5")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"#自动平铺")]),s(`
`),n("span",{class:"line"},[n("span",null,"exec_always --no-startup-id autotiling")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"#随机壁纸")]),s(`
`),n("span",{class:"line"},[n("span",null,"exec --no-startup-id feh --randomize --bg-fill ~/Pictures/Wallpapers")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"font pango:DejaVu Sans Mono 10")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"# start a terminal : alacritty")]),s(`
`),n("span",{class:"line"},[n("span",null,"bindsym $mod+Return exec alacritty")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 应用菜单改为rofi")]),s(`
`),n("span",{class:"line"},[n("span",null,"bindsym $mod+d exec --no-startup-id rofi -show drun")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"# Start i3bar to display a workspace bar (plus the system information i3status")]),s(`
`),n("span",{class:"line"},[n("span",null,"# finds out, if available)")]),s(`
`),n("span",{class:"line"},[n("span",null,"bar {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        status_command i3status")]),s(`
`),n("span",{class:"line"},[n("span",null,"        position top")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])]),n("button",{class:"collapse"})],-1)),l[4]||(l[4]=n("h2",{id:"config-alacritty-alacritty-yml",tabindex:"-1"},[s("~/.config/alacritty/alacritty.yml "),n("a",{class:"header-anchor",href:"#config-alacritty-alacritty-yml","aria-label":'Permalink to "~/.config/alacritty/alacritty.yml"'},"​")],-1)),l[5]||(l[5]=n("div",{class:"language-txt vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"txt"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[n("code",{"v-pre":""},[n("span",{class:"line"},[n("span",null,"# KDE Breeze (Ported from Konsole)")]),s(`
`),n("span",{class:"line"},[n("span",null,"colors:")]),s(`
`),n("span",{class:"line"},[n("span",null,"  # Default colors")]),s(`
`),n("span",{class:"line"},[n("span",null,"  primary:")]),s(`
`),n("span",{class:"line"},[n("span",null,"    background: '#232627'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    foreground: '#fcfcfc'")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    dim_foreground: '#eff0f1'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    bright_foreground: '#ffffff'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    dim_background: '#31363b'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    bright_background: '#000000'")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  # Normal colors")]),s(`
`),n("span",{class:"line"},[n("span",null,"  normal:")]),s(`
`),n("span",{class:"line"},[n("span",null,"    black: '#232627'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    red: '#ed1515'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    green: '#11d116'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    yellow: '#f67400'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    blue: '#1d99f3'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    magenta: '#9b59b6'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    cyan: '#1abc9c'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    white: '#fcfcfc'")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  # Bright colors")]),s(`
`),n("span",{class:"line"},[n("span",null,"  bright:")]),s(`
`),n("span",{class:"line"},[n("span",null,"    black: '#7f8c8d'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    red: '#c0392b'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    green: '#1cdc9a'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    yellow: '#fdbc4b'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    blue: '#3daee9'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    magenta: '#8e44ad'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    cyan: '#16a085'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    white: '#ffffff'")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  # Dim colors")]),s(`
`),n("span",{class:"line"},[n("span",null,"  dim:")]),s(`
`),n("span",{class:"line"},[n("span",null,"    black: '#31363b'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    red: '#783228'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    green: '#17a262'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    yellow: '#b65619'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    blue: '#1b668f'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    magenta: '#614a73'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    cyan: '#186c60'")]),s(`
`),n("span",{class:"line"},[n("span",null,"    white: '#63686d'")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"background_opacity: 0.90")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 设置字体")]),s(`
`),n("span",{class:"line"},[n("span",null,"font:")]),s(`
`),n("span",{class:"line"},[n("span",null,"  normal:")]),s(`
`),n("span",{class:"line"},[n("span",null,'    family: "Hack Nerd Font"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    style: Regular")]),s(`
`),n("span",{class:"line"},[n("span",null,"  bold:")]),s(`
`),n("span",{class:"line"},[n("span",null,'    family: "Hack Nerd Font"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    style: Bold")]),s(`
`),n("span",{class:"line"},[n("span",null,"  italic:")]),s(`
`),n("span",{class:"line"},[n("span",null,'    family: "Hack Nerd Font"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    style: Italic")]),s(`
`),n("span",{class:"line"},[n("span",null,"  bold_italic:")]),s(`
`),n("span",{class:"line"},[n("span",null,'    family: "Hack Nerd Font"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    style: Bold Italic")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  # 字大小")]),s(`
`),n("span",{class:"line"},[n("span",null,"  size: 8.0 ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  offset:")]),s(`
`),n("span",{class:"line"},[n("span",null,"    x: 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"    y: 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"  glyph_offset:")]),s(`
`),n("span",{class:"line"},[n("span",null,"    x: 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"    y: 0")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"window:")]),s(`
`),n("span",{class:"line"},[n("span",null,"  padding:")]),s(`
`),n("span",{class:"line"},[n("span",null,"    x: 2")]),s(`
`),n("span",{class:"line"},[n("span",null,"    y: 2")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"scrolling:")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 回滚缓冲区中的最大行数,指定“0”将禁用滚动。")]),s(`
`),n("span",{class:"line"},[n("span",null,"  history: 10000")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  # 滚动行数 ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"  multiplier: 10")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 如果为‘true’，则使用亮色变体绘制粗体文本。")]),s(`
`),n("span",{class:"line"},[n("span",null,"draw_bold_text_with_bright_colors: true")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"selection:")]),s(`
`),n("span",{class:"line"},[n("span",null,"  semantic_escape_chars: ',│`|:\"'' ()[]{}<>'")]),s(`
`),n("span",{class:"line"},[n("span",null,"  save_to_clipboard: true")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"live_config_reload: true")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"# 解决ssh之后不能正确识别终端类型的问题")]),s(`
`),n("span",{class:"line"},[n("span",null,"env:")]),s(`
`),n("span",{class:"line"},[n("span",null,"  TERM: xterm-256color")])])]),n("button",{class:"collapse"})],-1)),l[6]||(l[6]=n("h2",{id:"etc-x11-xorg-conf-d-90-touchpad-conf",tabindex:"-1"},[s("/etc/X11/xorg.conf.d/90-touchpad.conf "),n("a",{class:"header-anchor",href:"#etc-x11-xorg-conf-d-90-touchpad-conf","aria-label":'Permalink to "/etc/X11/xorg.conf.d/90-touchpad.conf"'},"​")],-1)),l[7]||(l[7]=n("div",{class:"language-txt vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"txt"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[n("code",{"v-pre":""},[n("span",{class:"line"},[n("span",null,'Section "InputClass"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        Identifier "touchpad"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        MatchIsTouchpad "on"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        Driver "libinput"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        Option "Tapping" "on"')]),s(`
`),n("span",{class:"line"},[n("span",null,'	Option "NaturalScrolling" "on"')]),s(`
`),n("span",{class:"line"},[n("span",null,"EndSection")])])]),n("button",{class:"collapse"})],-1)),l[8]||(l[8]=n("h2",{id:"etc-i3status-conf",tabindex:"-1"},[s("/etc/i3status.conf "),n("a",{class:"header-anchor",href:"#etc-i3status-conf","aria-label":'Permalink to "/etc/i3status.conf"'},"​")],-1)),l[9]||(l[9]=n("div",{class:"language-txt vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"},"txt"),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[n("code",{"v-pre":""},[n("span",{class:"line"},[n("span",null,"general {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        colors = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"        interval = 5")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'order += "wireless _first_"')]),s(`
`),n("span",{class:"line"},[n("span",null,'# order += "ethernet _first_"')]),s(`
`),n("span",{class:"line"},[n("span",null,'order += "volume master"')]),s(`
`),n("span",{class:"line"},[n("span",null,'order += "battery all"')]),s(`
`),n("span",{class:"line"},[n("span",null,'order += "disk /"')]),s(`
`),n("span",{class:"line"},[n("span",null,'order += "load"')]),s(`
`),n("span",{class:"line"},[n("span",null,'order += "memory"')]),s(`
`),n("span",{class:"line"},[n("span",null,'order += "tztime local"')]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"volume master {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        format = "♪: %volume"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        format_muted = "♪: muted (%volume)"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        device = "default"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        mixer = "Master"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        mixer_idx = 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"wireless _first_ {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        format_up = "W: (%quality at %essid)"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        format_down = "W: down"')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"ethernet _first_ {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        format_up = "E: %ip (%speed)"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        format_down = "E: down"')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"battery all {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        format = "%status %percentage %remaining"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        format_down = "No battery"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        status_chr = "⚡"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        status_bat = "🔋"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        status_unk = "?"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        status_full = "☻"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        path = "/sys/class/power_supply/BAT%d/uevent"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        low_threshold = 15")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,'disk "/" {')]),s(`
`),n("span",{class:"line"},[n("span",null,'        format = "/ %avail free"')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"load {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        format = "Load %1min"')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"memory {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        format = "RAM %used | %available"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        threshold_degraded = "1G"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        format_degraded = "MEMORY < %available"')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"tztime local {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        format = "%Y-%m-%d %H:%M"')]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])]),n("button",{class:"collapse"})],-1))]),"main-header":a(()=>[p(e.$slots,"main-header")]),"main-header-after":a(()=>[p(e.$slots,"main-header-after")]),"main-nav":a(()=>[p(e.$slots,"main-nav")]),"main-content":a(()=>[p(e.$slots,"main-content")]),"main-content-after":a(()=>[p(e.$slots,"main-content-after")]),"main-nav-before":a(()=>[p(e.$slots,"main-nav-before")]),"main-nav-after":a(()=>[p(e.$slots,"main-nav-after")]),comment:a(()=>[p(e.$slots,"comment")]),footer:a(()=>[p(e.$slots,"footer")]),aside:a(()=>[p(e.$slots,"aside")]),"aside-custom":a(()=>[p(e.$slots,"aside-custom")]),default:a(()=>[p(e.$slots,"default")]),_:3},8,["frontmatter"])}}};export{N as default};
