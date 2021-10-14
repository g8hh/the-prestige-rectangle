/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "Reset for +": "重置获得 +",
    "The Beginning of a Journey": "旅程的开始",
    "Achievement Gotten!": "成就达成！",
    "Currently": "当前",
    "Double point gain per L1 upgrade bought.": "每购买一次 L1 升级则获得双倍点数。",
    "Doubler": "加倍",
    "Each layer resets the ones before it.": "每一层都会重置它之前的层。",
    "Extra Points": "额外点数",
    "Gain more points based on L1 points.": "基于L1点获得更多点数。",
    "I am a button!": "我是一个按钮！",
    "Modes": "模式",
    "Layer Info": "层信息",
    "points": " 点数",
    "Autobuy upgrades, gain 3x more of each layer's currency, and keep L4 upgrades on middle reset.": "自动购买升级，每层获得 3 倍以上的货币，并在中间重置时保持 L4 升级。",
    "Grindless": "不受约束",
    "achievements.": "成就.",
    "Half Way There!": "到一半了!",
    "Strategy Acquired": "战略获得",
    "Layer Up!": "层层叠叠！",
    "There's more of them?": "还有更多吗？",
    "What about the last one?": "最后一个怎么样？",
    "Where's the QoL?": "QoL 在哪里？",
    "You have completed": "你已经完成了",
    "Even More Points": "更多点数",
    "Extra Upgrades": "额外升级",
    "Gain more points based on L2 points.": "基于 L2点 获得更多点数。",
    "Corner resets don't reset anything.": "角落重置不会重置任何东西。",
    "Increase": "提高",
    "Keep all keeper upgrades on layer, corner, and line reset.": "保留层、角和线重置的所有 保留者 升级。",
    "Multiply L1 point gain based on the amount of L1 upgrades you have.": "根据您拥有的 L1 升级数量乘以 L1 点增益。",
    "Past Doubler": "过去倍增器",
    "'s base by L2 upgrades.": "的基础由 L2 升级。",
    "You can buy max CP.": "您可以购买最大CP。",
    "Upgrades": "升级",
    "Unlock extra nerfs for The": "解锁额外的 神经 为",
    "Unlock": "解锁",
    "Unlock challenges and change the effect of": "解锁挑战并改变效果",
    "The Prestige Triangle": "声望三角",
    "The Challenge": "挑战",
    "Speed Up": "提速",
    "Start with 1 CP per 2 line milestones.": "从每 2 行里程碑 1 CP 开始。",
    "Selector": "选择器",
    "Reset All": "重置所有",
    "Red": "红色",
    "QoL, while helpful, isn't required.": "QoL 虽然有帮助，但不是必需的。",
    "Point Exponent": "点数指数",
    "Point Boosters+": "点数助推器+",
    "Point Boosters": "点数助推器",
    "Layers": "层",
    "lines": "行",
    "Main": "主要",
    "Improve": "改进",
    "Improve+": "改进+",
    "Now What?": "现在怎么办?",
    "Hint": "提示",
    "Help": "帮助",
    "green": "绿色",
    "Finish": "完成",
    "Extra Nerfs": "额外神经",
    "Extra L3": "额外L3",
    "Energy": "能量",
    "Exit Early": "提前退出",
    "Goal:": "目标:",
    "Reward": "奖励",
    " points": " 点数",
    "'s base by 0.005 for each one you buy.": "您购买的每件商品以 0.005 为基数。",
    "'s cost by the amount you have.": "的成本按您拥有的金额计算。",
    "Boost point gain based on total lines and CP.": "基于总行数和CP的提升点增益。",
    "Challenge": "挑战",
    "Challenges": "挑战",
    "Challenge Goal": "挑战目标",
    "Challenge Info": "挑战信息",
    "Completed": "已完成",
    "corner points": "角落点数",
    "DE Boost": "DE 提升",
    "DE Multiplier": "DE 乘数",
    "DE to Points": "DE 到 点数",
    "Divide": "分隔",
    "Dividers": "分隔线",
    "Doubler Update": "双重更新",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Keeper ": "保留者 ",
    "\t\t\t\t": "\t\t\t\t",
    "Completions: ": "完成: ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^([\d\.]+)s$/,
    /^([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
    [/^You have (.+) downgrade points.$/, '您有 $1 降级点数。'],
    [/^You have (.+) downgrade energy \(\+(.+)$/, '你有 $1 降级能量 \(\+$2'],
    [/^You have earned (.+) lines in total.$/, '您总共获得了 $1 行。'],
    [/^You are gaining (.+) L(.+) points per second$/, '你每秒获得 $1 L$2 点数'],
    [/^Req: (.+) \/ (.+) points$/, '需要: $1 \/ $2 点数'],
	[/^Autobuy L([\d\.]+) upgrades.$/, '自动购买 L$1 升级。'],
	[/^([\d\.]+) Line$/, '$1 行'],
	[/^([\d\.]+) Lines$/, '$1 行'],
	[/^([\d\.]+) Total Lines$/, '$1 总行数'],
	[/^([\d\.]+) corner points$/, '$1 角落点数'],
	[/^([\d\.]+)x DP$/, '$1x DP'],
	[/^L([\d\.]+) Boosting$/, 'L$1 提升'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+) OOMs\/sec$/, '$1e$2 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
	[/^([\d\.]+) L([\d\.]+) points$/, '$1 L$2 点数'],
	[/^([\d\.]+)e([\d\.,]+) L([\d\.]+) points$/, '$1e$2 L$3 点数'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^L([\d\.]+) points$/, 'L$1 点数'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^Reach (.+) points to unlock \(You have (.+) points$/, '达到 $1 点解锁（你有 $2 点'],
    [/^Unlock (.+) L(.+) upgrades.$/, '解锁 $1 L$2 升级.'],
    [/^Buy (.+) L(.+) upgrades.$/, '购买 $1 L$2 升级.'],
    [/^Get (.+) L(.+) point.$/, '获得 $1 L$2 点。'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);