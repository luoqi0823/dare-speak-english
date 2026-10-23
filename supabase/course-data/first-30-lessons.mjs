const lesson = (order, unitOrder, unitTitle, title, scene, words, phrases, grammar, dialogue, story, checks) => ({
  order, unitOrder, unitTitle, title, scene, words, phrases, grammar, dialogue, story, checks,
});

const w = (english, chinese, visual, mnemonic) => ({ english, chinese, visual, mnemonic });
const p = (english, chinese) => ({ english, chinese });
const g = (title, pattern, explanation, exampleEnglish, exampleChinese) => ({ title, pattern, explanation, exampleEnglish, exampleChinese });
const d = (speaker, english, chinese) => ({ speaker, english, chinese });
const q = (prompt, answer, distractors) => ({ prompt, answer, distractors });

export const firstThirtyLessons = [
  lesson(1, 1, "敢开口", "先说一声 Hello", "第一次见面", [
    w("hello", "你好", "👋", "看到挥手，就把 hello 一起挥出去。"), w("name", "名字", "🏷️", "名字像贴在身上的标签。"),
    w("meet", "见面", "🤝", "两只手碰在一起，就是 meet。"), w("from", "来自", "📍", "地图上的起点，就是 from。"),
    w("friend", "朋友", "🧑‍🤝‍🧑", "两个人并肩站着，就是 friend。"),
  ], [p("Nice to meet you.", "很高兴认识你。"), p("I'm from China.", "我来自中国。")],
  g("用 am 介绍自己", "I am / I'm + 身份或状态", "I am 可以缩写成 I'm。先用它说名字和来自哪里。", "I'm Lin. I'm from China.", "我是小林。我来自中国。"),
  [d("A", "Hello! What's your name?", "你好！你叫什么名字？"), d("B", "I'm Lin. Nice to meet you.", "我是小林，很高兴认识你。"), d("A", "Nice to meet you, too.", "我也很高兴认识你。")],
  { title: "勇敢的第一句", english: "Lin meets Anna at the airport. Lin feels nervous, but she smiles and says hello. She tells Anna her name and says she is from China. The first sentence is short, but it starts a new friendship.", chinese: "小林在机场遇见安娜。她有点紧张，但还是微笑着说了你好。她告诉安娜自己的名字，并说自己来自中国。第一句话很短，却开启了一段新友谊。" },
  [q("小林在哪里遇见安娜？", "at the airport", ["at a hotel", "at a restaurant"]), q("小林虽然紧张，还是做了什么？", "smiles and says hello", ["runs away", "calls a taxi"])],
  ),
  lesson(2, 1, "敢开口", "介绍真实的自己", "和新朋友聊天", [
    w("live", "居住", "🏠", "房子就是你 live 的地方。"), w("work", "工作", "💻", "打开电脑开始 work。"),
    w("developer", "开发者", "⌨️", "敲代码的人是 developer。"), w("hobby", "爱好", "🎨", "空闲时最想做的事就是 hobby。"),
    w("like", "喜欢", "❤️", "心形直接钩住 like。"),
  ], [p("I work as a developer.", "我是一名前端开发者。"), p("I like taking photos.", "我喜欢拍照。")],
  g("用 like 说喜欢", "I like + 名词 / doing", "喜欢一件事用名词，喜欢做某事可以用动词加 ing。", "I like music. I like traveling.", "我喜欢音乐。我喜欢旅行。"),
  [d("A", "What do you do?", "你是做什么工作的？"), d("B", "I work as a developer.", "我是一名开发者。"), d("A", "What do you like?", "你喜欢什么？"), d("B", "I like traveling and taking photos.", "我喜欢旅行和拍照。")],
  { title: "我的三张名片", english: "Lin lives in Shanghai and works as a developer. Her hobby is taking photos. She also likes traveling. When a new friend asks about her, she uses three simple sentences: where she lives, what she does, and what she likes.", chinese: "小林住在上海，是一名开发者。她的爱好是拍照，也喜欢旅行。新朋友问起她时，她用三个简单句子介绍居住地、工作和爱好。" },
  [q("小林做什么工作？", "a developer", ["a doctor", "a teacher"]), q("她的爱好是什么？", "taking photos", ["cooking", "running"])],
  ),
  lesson(3, 1, "敢开口", "数字与电话号码", "交换联系方式", [
    w("zero", "零", "0️⃣", "圆圆的 0 就是 zero。"), w("one", "一", "1️⃣", "一根手指念 one。"),
    w("five", "五", "5️⃣", "伸出一只手就是 five。"), w("number", "号码；数字", "🔢", "一串数字就是 number。"),
    w("phone", "电话", "📱", "看到手机就说 phone。"),
  ], [p("What's your phone number?", "你的电话号码是多少？"), p("Let me check.", "让我确认一下。")],
  g("询问信息", "What's your + 名词?", "把 name、number、address 放进去，就能询问不同信息。", "What's your phone number?", "你的电话号码是多少？"),
  [d("A", "What's your phone number?", "你的电话号码是多少？"), d("B", "It's 150-8050-2105.", "是150-8050-2105。"), d("A", "Let me check. One-five-zero...", "让我确认一下，一五零……")],
  { title: "慢慢说号码", english: "Anna wants Lin's phone number. Lin says each number slowly. Anna repeats it and checks the last four numbers. They both look at the phone screen, so one small mistake does not become a big problem.", chinese: "安娜想要小林的电话号码。小林把每个数字慢慢说出来。安娜重复一遍并确认最后四位。两人一起看手机屏幕，因此小错误没有变成大问题。" },
  [q("安娜为什么重复号码？", "to check it", ["to delete it", "to change it"]), q("她们一起看什么？", "the phone screen", ["a menu", "a ticket"])],
  ),
  lesson(4, 1, "敢开口", "时间和约定", "约好明天见", [
    w("today", "今天", "☀️", "太阳正在头顶，就是 today。"), w("tomorrow", "明天", "➡️", "箭头指向下一天 tomorrow。"),
    w("morning", "早晨", "🌅", "日出就是 morning。"), w("evening", "晚上", "🌆", "城市亮灯进入 evening。"),
    w("time", "时间", "🕒", "看到钟表就想起 time。"),
  ], [p("What time is it?", "现在几点？"), p("See you tomorrow.", "明天见。")],
  g("在几点钟", "at + 时间", "具体几点前面用 at。", "Let's meet at nine.", "我们九点见。"),
  [d("A", "Are you free tomorrow morning?", "你明天早上有空吗？"), d("B", "Yes. Let's meet at nine.", "有，我们九点见。"), d("A", "Great. See you tomorrow.", "好的，明天见。")],
  { title: "明早九点", english: "Lin and Anna want to visit a museum. They choose tomorrow morning because the museum is quiet then. They meet at nine near the entrance. Lin writes the time in her phone and sets a small alarm.", chinese: "小林和安娜想参观博物馆。她们选择明天早上，因为那时比较安静。两人约在九点于入口附近见面。小林把时间记进手机并设置了闹钟。" },
  [q("她们几点见面？", "at nine", ["at five", "at noon"]), q("小林为什么设置闹钟？", "to remember the time", ["to order breakfast", "to call a taxi"])],
  ),
  lesson(5, 1, "敢开口", "听不懂也能继续", "第一次见面复习", [
    w("understand", "理解", "💡", "灯泡亮起，表示 understand。"), w("repeat", "重复", "🔁", "循环箭头就是 repeat。"),
    w("slowly", "慢慢地", "🐢", "乌龟的速度就是 slowly。"), w("again", "再一次", "↩️", "回头再来一次 again。"),
    w("help", "帮助", "🛟", "救生圈代表及时的 help。"),
  ], [p("Could you say that again?", "你可以再说一遍吗？"), p("Please speak slowly.", "请说慢一点。")],
  g("礼貌请求", "Could you + 动词?", "Could you 比直接命令更礼貌，后面使用动词原形。", "Could you repeat that?", "你可以重复一遍吗？"),
  [d("A", "The meeting starts at eight thirty.", "会议八点半开始。"), d("B", "Sorry, I don't understand.", "抱歉，我没听懂。"), d("B", "Could you say that again slowly?", "你可以慢慢再说一遍吗？"), d("A", "Of course. Eight thirty.", "当然，八点半。")],
  { title: "没听懂不是结束", english: "A new friend speaks too fast. Lin does not pretend to understand. She says sorry and asks the friend to repeat the time slowly. This simple request gives her another chance. Good communication is not perfect English; it is finding a way to continue.", chinese: "新朋友说得太快，小林没有假装听懂。她先道歉，再请对方慢慢重复时间。这个简单请求给了她第二次机会。好的沟通不是完美英语，而是想办法继续。" },
  [q("小林没听懂时做了什么？", "asks the friend to repeat", ["leaves at once", "says yes"]), q("文章认为什么是好的沟通？", "finding a way to continue", ["using long words", "speaking very fast"])],
  ),
  lesson(6, 2, "吃饭点单", "咖啡店第一单", "咖啡店", [
    w("coffee", "咖啡", "☕", "杯口的热气钩住 coffee。"), w("tea", "茶", "🍵", "绿色茶杯就是 tea。"),
    w("hot", "热的", "🔥", "火焰代表 hot。"), w("iced", "加冰的", "🧊", "冰块代表 iced。"),
    w("cup", "杯子", "🥤", "手里拿着一个 cup。"),
  ], [p("An iced coffee, please.", "请给我一杯冰咖啡。"), p("For here, please.", "在这里喝。")],
  g("礼貌点单", "名词 + please", "最紧张时不用长句，商品名称后加 please 就能完成点单。", "A hot tea, please.", "请给我一杯热茶。"),
  [d("Staff", "Hi! What can I get for you?", "你好！需要什么？"), d("Lin", "An iced coffee, please.", "请给我一杯冰咖啡。"), d("Staff", "For here or to go?", "堂食还是带走？"), d("Lin", "For here, please.", "在这里喝。")],
  { title: "第一杯冰咖啡", english: "It is a warm morning. Lin walks into a small coffee shop and looks at the menu. She wants an iced coffee. The staff smiles, and Lin says her order clearly. A minute later, she holds a cold cup and feels proud.", chinese: "这是一个温暖的早晨。小林走进一家小咖啡店看菜单。她想要冰咖啡，店员微笑着听她清楚地点单。一分钟后，她拿着冰凉的杯子，觉得很有成就感。" },
  [q("天气怎么样？", "warm", ["cold", "snowy"]), q("小林点了什么？", "an iced coffee", ["a hot tea", "a glass of milk"])],
  ),
  lesson(7, 2, "吃饭点单", "早餐不要饿肚子", "早餐店", [
    w("bread", "面包", "🍞", "一片面包就是 bread。"), w("egg", "鸡蛋", "🥚", "椭圆的 egg 很好认。"),
    w("milk", "牛奶", "🥛", "白色的一杯 milk。"), w("banana", "香蕉", "🍌", "弯弯的 banana 像月亮。"),
    w("sandwich", "三明治", "🥪", "两片面包夹住内容，就是 sandwich。"),
  ], [p("Can I have a sandwich?", "我可以要一个三明治吗？"), p("That's all, thank you.", "就这些，谢谢。")],
  g("表达想要", "Can I have + 食物?", "点餐时用 Can I have，既简单又自然。", "Can I have an egg and some milk?", "我可以要一个鸡蛋和一些牛奶吗？"),
  [d("Staff", "What would you like?", "你想要什么？"), d("Lin", "Can I have a sandwich and some milk?", "我可以要一个三明治和一些牛奶吗？"), d("Staff", "Anything else?", "还要别的吗？"), d("Lin", "That's all, thank you.", "就这些，谢谢。")],
  { title: "五分钟早餐", english: "Lin has an early train, so she needs a quick breakfast. She buys a sandwich, an egg, and some milk. She puts the banana in her bag for later. The breakfast is simple, but it gives her energy for the morning.", chinese: "小林要赶早班火车，所以需要一份快速早餐。她买了三明治、鸡蛋和牛奶，把香蕉放进包里留着晚点吃。早餐很简单，却给了她一上午的能量。" },
  [q("小林为什么需要快速早餐？", "she has an early train", ["she has a late flight", "she is not hungry"]), q("她把什么放进包里？", "the banana", ["the milk", "the egg"])],
  ),
  lesson(8, 2, "吃饭点单", "看懂一张菜单", "餐厅点餐", [
    w("menu", "菜单", "📋", "写满菜名的纸就是 menu。"), w("order", "点餐；订单", "📝", "把想吃的写下来就是 order。"),
    w("chicken", "鸡肉", "🍗", "鸡腿图钩住 chicken。"), w("rice", "米饭", "🍚", "一碗白米饭是 rice。"),
    w("noodles", "面条", "🍜", "长长的 noodles 从碗里夹起来。"),
  ], [p("I'd like the chicken rice.", "我想要鸡肉饭。"), p("Could I see the menu?", "我可以看看菜单吗？")],
  g("自然表达想要", "I'd like + 名词", "I'd like 是 I would like 的缩写，比 I want 更适合点餐。", "I'd like the noodles.", "我想要面条。"),
  [d("Lin", "Could I see the menu?", "我可以看看菜单吗？"), d("Staff", "Of course. Here you are.", "当然，给你。"), d("Lin", "I'd like the chicken rice.", "我想要鸡肉饭。"), d("Staff", "Good choice.", "不错的选择。")],
  { title: "菜单上最熟悉的词", english: "The menu has many long names, but Lin does not need to understand everything. She finds the words chicken and rice. There is a small picture beside them. She points to the dish and orders it with one clear sentence.", chinese: "菜单上有很多很长的菜名，但小林不需要全部看懂。她找到了 chicken 和 rice，旁边还有一张小图片。她指着那道菜，用一句清楚的话完成点餐。" },
  [q("小林需要看懂整张菜单吗？", "no", ["yes", "only the prices"]), q("她找到哪两个熟悉的词？", "chicken and rice", ["tea and milk", "bread and egg"])],
  ),
  lesson(9, 2, "吃饭点单", "口味与忌口", "告诉店员饮食需求", [
    w("sweet", "甜的", "🍬", "糖果的味道是 sweet。"), w("spicy", "辣的", "🌶️", "红辣椒就是 spicy。"),
    w("salt", "盐", "🧂", "盐罐里装着 salt。"), w("allergy", "过敏", "⚠️", "警告标志提醒 allergy。"),
    w("vegetarian", "素食者", "🥦", "一盘蔬菜代表 vegetarian。"),
  ], [p("I'm allergic to peanuts.", "我对花生过敏。"), p("Not too spicy, please.", "请不要太辣。")],
  g("说明身体情况", "I'm allergic to + 食物", "allergic 后面用 to，再接会引发过敏的食物。", "I'm allergic to milk.", "我对牛奶过敏。"),
  [d("Staff", "Do you like spicy food?", "你喜欢辣的食物吗？"), d("Lin", "A little. Not too spicy, please.", "一点点，请不要太辣。"), d("Lin", "And I'm allergic to peanuts.", "另外我对花生过敏。"), d("Staff", "No problem. I'll tell the kitchen.", "没问题，我会告诉厨房。")],
  { title: "重要的话先说", english: "Lin likes trying local food, but she has a peanut allergy. Before she orders, she tells the staff clearly. The staff checks the dish with the kitchen. Lin can enjoy her meal because she speaks up about what her body needs.", chinese: "小林喜欢尝试当地食物，但她对花生过敏。点餐前，她清楚地告诉店员。店员向厨房确认了菜品。因为主动说出身体需求，小林可以安心享用这顿饭。" },
  [q("小林对什么过敏？", "peanuts", ["rice", "chicken"]), q("店员向谁确认菜品？", "the kitchen", ["the hotel", "the driver"])],
  ),
  lesson(10, 2, "吃饭点单", "结账也不慌", "餐厅综合复习", [
    w("bill", "账单", "🧾", "长长的小票就是 bill。"), w("cash", "现金", "💵", "纸币代表 cash。"),
    w("card", "卡", "💳", "刷 card 完成付款。"), w("change", "零钱", "🪙", "找回来的硬币是 change。"),
    w("receipt", "收据", "📄", "付款后的凭证是 receipt。"),
  ], [p("Could I have the bill?", "可以给我账单吗？"), p("Can I pay by card?", "可以刷卡吗？")],
  g("用 by 表示方式", "by + 付款/交通方式", "by card 表示用卡，by train 表示乘火车。", "Can I pay by card?", "我可以刷卡吗？"),
  [d("Lin", "Could I have the bill, please?", "可以给我账单吗？"), d("Staff", "Sure. Here you are.", "当然，给你。"), d("Lin", "Can I pay by card?", "可以刷卡吗？"), d("Staff", "Yes. Would you like a receipt?", "可以。需要收据吗？")],
  { title: "从点单到结账", english: "Lin orders noodles and hot tea. She asks for food that is not too spicy. After the meal, she checks the bill and pays by card. She keeps the receipt in her bag. One complete meal uses many small sentences she already knows.", chinese: "小林点了面条和热茶，并要求不要太辣。饭后，她核对账单并刷卡付款，把收据放进包里。一顿完整的饭，用到了许多她已经会的小句子。" },
  [q("小林怎样付款？", "by card", ["by cash", "with a ticket"]), q("饭后她把什么收进包里？", "the receipt", ["the menu", "the cup"])],
  ),
  lesson(11, 3, "机场交通", "机场值机", "值机柜台", [
    w("passport", "护照", "🛂", "出国最重要的小本子是 passport。"), w("flight", "航班", "✈️", "飞机起飞就是 flight。"),
    w("ticket", "票", "🎫", "入场或登机需要 ticket。"), w("luggage", "行李", "🧳", "旅行箱就是 luggage。"),
    w("window", "窗户；靠窗位置", "🪟", "透过 window 看云。"),
  ], [p("I'd like a window seat.", "我想要靠窗座位。"), p("Here is my passport.", "这是我的护照。")],
  g("递交物品", "Here is my + 名词", "把证件递给工作人员时，用 Here is my。", "Here is my ticket.", "这是我的票。"),
  [d("Staff", "May I see your passport?", "可以看一下你的护照吗？"), d("Lin", "Sure. Here is my passport.", "当然，这是我的护照。"), d("Staff", "Do you have any luggage?", "你有行李吗？"), d("Lin", "Yes, one bag. I'd like a window seat.", "有，一个包。我想要靠窗座位。")],
  { title: "把证件放在手边", english: "Lin arrives at the airport early. She keeps her passport and ticket in a small front pocket. At the check-in desk, she gives the staff her passport, checks her luggage, and asks for a window seat. Everything is easy because she prepared first.", chinese: "小林提前到达机场，把护照和机票放在前侧小口袋里。在值机柜台，她递出护照、托运行李，并请求靠窗座位。因为事先准备好了，一切都很顺利。" },
  [q("小林把护照放在哪里？", "in a front pocket", ["in the luggage", "on the plane"]), q("她想要什么座位？", "a window seat", ["a middle seat", "no seat"])],
  ),
  lesson(12, 3, "机场交通", "安检与登机", "寻找登机口", [
    w("gate", "登机口", "🚪", "通往飞机的门就是 gate。"), w("boarding", "登机", "🛫", "排队上飞机是 boarding。"),
    w("seat", "座位", "💺", "飞机椅就是 seat。"), w("belt", "安全带", "🔒", "扣紧 belt 才安全。"),
    w("security", "安检；安全", "🔍", "被仔细检查就是 security。"),
  ], [p("Where is Gate 12?", "12号登机口在哪里？"), p("Is the flight boarding now?", "航班现在开始登机了吗？")],
  g("询问地点", "Where is + 地点?", "不知道地点时直接用 Where is，后接具体位置。", "Where is security?", "安检在哪里？"),
  [d("Lin", "Excuse me, where is Gate 12?", "打扰一下，12号登机口在哪里？"), d("Staff", "Go straight and turn left.", "直走然后左转。"), d("Lin", "Is the flight boarding now?", "航班现在登机了吗？"), d("Staff", "Not yet. You have twenty minutes.", "还没有，你还有二十分钟。")],
  { title: "找到正确的门", english: "After security, Lin checks the big screen. Her flight leaves from Gate 12, but the airport is large. She asks a staff member for help and follows the signs. At the gate, she still has twenty minutes, so she sits down and checks her boarding pass.", chinese: "安检后，小林查看大屏幕。她的航班从12号登机口出发，但机场很大。她向工作人员求助并跟着指示牌走。到达登机口时还有二十分钟，她坐下来再次检查登机牌。" },
  [q("小林在哪里查看航班信息？", "on the big screen", ["on a menu", "in a hotel room"]), q("她到登机口时还有多久？", "twenty minutes", ["two minutes", "one hour"])],
  ),
  lesson(13, 3, "机场交通", "顺利通过入境", "入境问答", [
    w("country", "国家", "🌍", "地球上有很多 country。"), w("purpose", "目的", "🎯", "靶心代表 purpose。"),
    w("visit", "参观；拜访", "🚶", "走进一个地方去 visit。"), w("holiday", "假期", "🏖️", "海边放松就是 holiday。"),
    w("address", "地址", "📬", "信件送到 address。"),
  ], [p("I'm here for a holiday.", "我是来度假的。"), p("I'll stay for five days.", "我会停留五天。")],
  g("表达停留时长", "for + 一段时间", "for five days 表示持续五天。", "I'll stay for one week.", "我会停留一周。"),
  [d("Officer", "What is the purpose of your visit?", "你的来访目的是什么？"), d("Lin", "I'm here for a holiday.", "我是来度假的。"), d("Officer", "How long will you stay?", "你会停留多久？"), d("Lin", "I'll stay for five days.", "我会停留五天。")],
  { title: "三个准备好的答案", english: "At immigration, the officer asks Lin three questions: why she is visiting, how long she will stay, and where she will live. Lin has the hotel address on her phone. She answers with short sentences and shows the booking when asked.", chinese: "入境时，工作人员问小林三个问题：为什么来、停留多久、住在哪里。小林手机里存着酒店地址。她用短句回答，并在需要时出示预订信息。" },
  [q("工作人员问了几个问题？", "three", ["one", "ten"]), q("酒店地址在哪里？", "on her phone", ["on the passport", "on the luggage"])],
  ),
  lesson(14, 3, "机场交通", "打车和坐地铁", "前往市区", [
    w("taxi", "出租车", "🚕", "黄色小车就是 taxi。"), w("subway", "地铁", "🚇", "地下列车是 subway。"),
    w("station", "车站", "🚉", "列车停靠 station。"), w("left", "左边", "⬅️", "箭头向左就是 left。"),
    w("right", "右边", "➡️", "箭头向右就是 right。"),
  ], [p("Please take me to this address.", "请带我去这个地址。"), p("Which line should I take?", "我应该坐哪条线？")],
  g("应该做什么", "should + 动词原形", "should 表示应该，后面的动词不变化。", "Which train should I take?", "我应该坐哪班车？"),
  [d("Lin", "Please take me to this address.", "请带我去这个地址。"), d("Driver", "Sure. It takes about thirty minutes.", "好的，大约需要三十分钟。"), d("Lin", "Can I pay by card?", "可以刷卡吗？"), d("Driver", "Yes, you can.", "可以。")],
  { title: "把地址给司机看", english: "Lin is tired after the flight, so she chooses a taxi. She shows the driver the hotel address instead of trying to say every street name. The driver turns right at the station and drives across a bridge. Lin follows the route on her map.", chinese: "飞行后小林很累，因此选择出租车。她直接给司机看酒店地址，没有勉强念每个街道名称。司机在车站处右转并开过一座桥，小林用地图查看路线。" },
  [q("小林为什么选择出租车？", "she is tired", ["the hotel is closed", "she lost her passport"]), q("她怎样告诉司机目的地？", "shows the address", ["draws a picture", "calls the police"])],
  ),
  lesson(15, 3, "机场交通", "从机场到酒店", "交通综合复习", [
    w("straight", "直行", "⬆️", "箭头向前就是 straight。"), w("far", "远的", "🔭", "要用望远镜看的地方很 far。"),
    w("near", "附近的", "📌", "图钉就在身边，表示 near。"), w("map", "地图", "🗺️", "展开 map 找路线。"),
    w("arrive", "到达", "🏁", "终点旗代表 arrive。"),
  ], [p("Is it far from here?", "离这里远吗？"), p("Go straight for two blocks.", "直走两个街区。")],
  g("离某地多远", "far from + 地点", "from 后面接出发点。", "Is the station far from the hotel?", "车站离酒店远吗？"),
  [d("Lin", "Is the hotel far from here?", "酒店离这里远吗？"), d("Staff", "No. Go straight for two blocks.", "不远，直走两个街区。"), d("Staff", "Turn right at the bank.", "在银行右转。"), d("Lin", "Thank you. I'll check my map.", "谢谢，我会看地图。")],
  { title: "最后十分钟的路", english: "Lin arrives at the station and opens her map. The hotel is near, but one street is closed. She asks a staff member for another way. She goes straight, turns right at a bank, and sees the hotel sign. The trip from the airport is finally complete.", chinese: "小林到达车站后打开地图。酒店很近，但有一条街封闭了。她向工作人员询问另一条路，直走并在银行右转，终于看到酒店招牌。从机场出发的路程完成了。" },
  [q("为什么小林需要问另一条路？", "one street is closed", ["her phone is broken", "the station is far"]), q("她在哪里右转？", "at a bank", ["at the airport", "at a restaurant"])],
  ),
  lesson(16, 4, "酒店住宿", "办理酒店入住", "酒店前台", [
    w("hotel", "酒店", "🏨", "高楼上的 H 代表 hotel。"), w("reservation", "预订", "📅", "日历上的记录就是 reservation。"),
    w("room", "房间", "🚪", "门后面是一间 room。"), w("key", "钥匙", "🔑", "打开房门需要 key。"),
    w("night", "夜晚；住宿晚数", "🌙", "月亮出现进入 night。"),
  ], [p("I have a reservation.", "我有预订。"), p("The reservation is under Lin.", "预订姓名是Lin。")],
  g("预订在谁名下", "under + 姓名", "酒店里 under 后接预订人姓名。", "It's under Li.", "预订姓名是李。"),
  [d("Lin", "Hi, I have a reservation.", "你好，我有预订。"), d("Staff", "What name is it under?", "预订姓名是什么？"), d("Lin", "It's under Lin.", "姓名是Lin。"), d("Staff", "Great. Here is your room key.", "好的，这是你的房卡。")],
  { title: "把预订单截图", english: "Lin reaches the hotel in the evening. She says she has a reservation and gives her name. The staff finds the booking for three nights. Lin also keeps a screenshot on her phone, so she can show the dates quickly if there is a problem.", chinese: "小林傍晚到达酒店，说明自己有预订并报上姓名。工作人员找到了三晚的订单。小林手机里也保存了截图，出现问题时可以快速展示日期。" },
  [q("小林预订了几晚？", "three nights", ["one night", "five nights"]), q("她为什么保存截图？", "to show the dates quickly", ["to order food", "to buy a ticket"])],
  ),
  lesson(17, 4, "酒店住宿", "找到酒店设施", "房间与公共区域", [
    w("elevator", "电梯", "🛗", "上下移动的箱子是 elevator。"), w("wifi", "无线网络", "📶", "信号图标就是 wifi。"),
    w("breakfast", "早餐", "🍳", "早晨的一餐是 breakfast。"), w("towel", "毛巾", "🧻", "擦干身体需要 towel。"),
    w("shower", "淋浴", "🚿", "水从上方落下就是 shower。"),
  ], [p("What's the Wi-Fi password?", "无线网络密码是什么？"), p("Where is the elevator?", "电梯在哪里？")],
  g("某处有什么", "There is / There are", "一个事物用 There is，多个事物用 There are。", "There is a towel in the room.", "房间里有一条毛巾。"),
  [d("Lin", "What's the Wi-Fi password?", "无线网络密码是什么？"), d("Staff", "It's on your room key card.", "在你的房卡上。"), d("Lin", "And where is the elevator?", "电梯在哪里？"), d("Staff", "It's next to the front desk.", "在前台旁边。")],
  { title: "先认识房间", english: "Lin enters her room and checks the important things first. There are two towels beside the shower. The Wi-Fi password is on the key card. Breakfast is on the second floor, and the elevator is near the front desk.", chinese: "小林进入房间后先检查重要物品。淋浴旁有两条毛巾，房卡上写着无线网络密码。早餐在二楼，电梯靠近前台。" },
  [q("无线网络密码在哪里？", "on the key card", ["on the towel", "under the bed"]), q("早餐在几楼？", "the second floor", ["the first floor", "the fifth floor"])],
  ),
  lesson(18, 4, "酒店住宿", "房间有问题", "打电话给前台", [
    w("broken", "坏的", "💔", "裂开的心代表 broken。"), w("noise", "噪音", "📢", "大喇叭发出 noise。"),
    w("cold", "冷的", "🥶", "发抖的脸表示 cold。"), w("clean", "干净的；清洁", "✨", "闪亮代表 clean。"),
    w("light", "灯；光", "💡", "灯泡发出 light。"),
  ], [p("The shower is broken.", "淋浴坏了。"), p("Could someone take a look?", "可以请人来看一下吗？")],
  g("描述问题", "名词 + is + 形容词", "把具体物品放前面，再用形容词说明状态。", "The room is cold.", "房间很冷。"),
  [d("Lin", "Hello. The shower is broken.", "你好，淋浴坏了。"), d("Staff", "I'm sorry to hear that.", "很抱歉。"), d("Lin", "Could someone take a look?", "可以请人来看一下吗？"), d("Staff", "Yes, we'll send someone now.", "可以，我们马上派人过去。")],
  { title: "清楚描述一个问题", english: "The shower in Lin's room has no hot water. She calls the front desk and says the shower is broken. She gives her room number and asks for help. A staff member comes ten minutes later and fixes it.", chinese: "小林房间的淋浴没有热水。她打电话给前台，说明淋浴坏了，报上房间号并请求帮助。十分钟后工作人员过来修好了。" },
  [q("淋浴有什么问题？", "there is no hot water", ["it is too noisy", "it has no towel"]), q("工作人员多久后到达？", "ten minutes later", ["one hour later", "the next day"])],
  ),
  lesson(19, 4, "酒店住宿", "请求与退房", "离开酒店", [
    w("checkout", "退房", "🚪", "交回房卡离开，就是 checkout。"), w("late", "晚的；迟的", "⏰", "超过时间就是 late。"),
    w("bags", "包；行李", "🛍️", "多个包用 bags。"), w("call", "打电话", "☎️", "拿起电话去 call。"),
    w("service", "服务", "🛎️", "按铃得到 service。"),
  ], [p("Can I check out late?", "我可以延迟退房吗？"), p("Could you keep my bags?", "可以帮我保管行李吗？")],
  g("请求许可", "Can I + 动词?", "询问自己是否可以做某事，用 Can I。", "Can I leave my bags here?", "我可以把包放在这里吗？"),
  [d("Lin", "Can I check out at one?", "我可以一点退房吗？"), d("Staff", "Yes, late checkout is available.", "可以，能够延迟退房。"), d("Lin", "Could you keep my bags after that?", "之后可以帮我保管行李吗？"), d("Staff", "Of course.", "当然。")],
  { title: "退房后的半天", english: "Lin's flight is in the evening, but checkout is at noon. She asks for one extra hour and leaves her bags with the hotel. She visits a nearby park without carrying heavy luggage. Later, she returns and calls a taxi.", chinese: "小林的航班在晚上，但酒店中午退房。她请求多住一小时，并把行李寄存在酒店。没有沉重行李，她轻松去了附近公园。之后她返回酒店并叫了出租车。" },
  [q("小林的航班什么时候起飞？", "in the evening", ["in the morning", "at noon"]), q("她把行李留在哪里？", "at the hotel", ["at the park", "in a taxi"])],
  ),
  lesson(20, 4, "酒店住宿", "住酒店完整一天", "酒店综合复习", [
    w("floor", "楼层", "🏢", "大楼一层层是 floor。"), w("lobby", "大堂", "🛋️", "酒店入口休息区是 lobby。"),
    w("stairs", "楼梯", "🪜", "一步步向上的是 stairs。"), w("available", "可用的；有空的", "✅", "绿色勾表示 available。"),
    w("wait", "等待", "⌛", "沙漏提醒你 wait。"),
  ], [p("Is breakfast still available?", "早餐现在还有吗？"), p("I'll wait in the lobby.", "我会在大堂等。")],
  g("表示位置", "in / on / next to", "in 表示在里面，on 表示在某层，next to 表示紧挨着。", "The room is on the third floor.", "房间在三楼。"),
  [d("Lin", "Is breakfast still available?", "早餐现在还有吗？"), d("Staff", "Yes, until ten.", "有，供应到十点。"), d("Lin", "My taxi is coming. I'll wait in the lobby.", "出租车快到了，我会在大堂等。"), d("Staff", "Have a good trip!", "旅途愉快！")],
  { title: "从入住到离开", english: "Lin checks in, finds her room on the third floor, and connects to Wi-Fi. When the shower has a problem, she calls for help. The next day, she eats breakfast, checks out, and waits for her taxi in the lobby. She can now handle a full hotel stay.", chinese: "小林办理入住，找到三楼的房间并连接无线网络。淋浴出现问题时，她打电话求助。第二天，她吃完早餐、办理退房，并在大堂等出租车。现在她能独立完成一次酒店住宿。" },
  [q("小林的房间在几楼？", "the third floor", ["the first floor", "the tenth floor"]), q("她在哪里等出租车？", "in the lobby", ["on the stairs", "in the room"])],
  ),
  lesson(21, 5, "购物求助", "询价和付款", "纪念品商店", [
    w("price", "价格", "🏷️", "价格写在 price tag 上。"), w("cost", "花费", "💰", "钱袋提醒花费 cost。"),
    w("cheap", "便宜的", "🪙", "只要一枚硬币，很 cheap。"), w("expensive", "昂贵的", "💎", "钻石通常很 expensive。"),
    w("pay", "付款", "💸", "钱飞出去就是 pay。"),
  ], [p("How much is this?", "这个多少钱？"), p("I'll take it.", "我要这个。")],
  g("询问价格", "How much is / are ...?", "一个物品用 is，多个物品用 are。", "How much are these postcards?", "这些明信片多少钱？"),
  [d("Lin", "How much is this cup?", "这个杯子多少钱？"), d("Staff", "It's twelve dollars.", "12美元。"), d("Lin", "Okay, I'll take it.", "好的，我要了。"), d("Staff", "You can pay over there.", "你可以在那里付款。")],
  { title: "先换算再决定", english: "Lin finds a handmade cup in a small shop. There is no clear price, so she asks the staff. Twelve dollars is within her budget. She checks the cup for damage, decides to take it, and pays by card.", chinese: "小林在一家小店发现一个手工杯子。上面没有清楚的价格，所以她询问店员。12美元在她的预算内。她检查杯子是否破损，决定购买并刷卡付款。" },
  [q("杯子多少钱？", "twelve dollars", ["two dollars", "twenty dollars"]), q("小林付款前检查什么？", "the cup for damage", ["her passport", "the weather"])],
  ),
  lesson(22, 5, "购物求助", "尺码颜色与试穿", "服装店", [
    w("size", "尺码", "📏", "尺子决定 size。"), w("small", "小的", "🤏", "两指靠近表示 small。"),
    w("large", "大的", "👐", "双手张开表示 large。"), w("color", "颜色", "🎨", "调色盘装满 color。"),
    w("try", "尝试；试穿", "👕", "把衣服穿上 try 一下。"),
  ], [p("Do you have this in a small?", "这件有小码吗？"), p("Can I try it on?", "我可以试穿吗？")],
  g("询问是否有", "Do you have + 物品?", "在商店询问库存、颜色或尺码，都可以用 Do you have。", "Do you have this in blue?", "这件有蓝色吗？"),
  [d("Lin", "Do you have this in a small?", "这件有小码吗？"), d("Staff", "Yes. Would you like blue or black?", "有，你想要蓝色还是黑色？"), d("Lin", "Blue, please. Can I try it on?", "蓝色。我可以试穿吗？"), d("Staff", "Sure. The fitting room is there.", "可以，试衣间在那里。")],
  { title: "不只看标签", english: "Lin likes a blue jacket, but the first one is too large. She asks for a small size and tries it on. The sleeves fit well, and the color looks good in daylight. She walks around for a minute before deciding.", chinese: "小林喜欢一件蓝色夹克，但第一件太大。她询问小码并试穿。袖子很合适，颜色在自然光下也很好看。决定购买前，她穿着走了一分钟。" },
  [q("第一件夹克有什么问题？", "it is too large", ["it is too cheap", "it is broken"]), q("小林最终试穿什么尺码？", "small", ["large", "extra large"])],
  ),
  lesson(23, 5, "购物求助", "在药店说明不舒服", "药店", [
    w("headache", "头痛", "🤕", "捂着头表示 headache。"), w("fever", "发烧", "🌡️", "体温计升高表示 fever。"),
    w("medicine", "药", "💊", "胶囊就是 medicine。"), w("pain", "疼痛", "⚡", "突然的闪电像 pain。"),
    w("doctor", "医生", "🩺", "听诊器代表 doctor。"),
  ], [p("I have a headache.", "我头痛。"), p("How often should I take it?", "我应该多久吃一次？")],
  g("描述症状", "I have + 症状", "headache、fever 前面可以直接用 I have。", "I have a fever.", "我发烧了。"),
  [d("Lin", "I have a headache and a small fever.", "我头痛，还有一点发烧。"), d("Staff", "How long have you felt this way?", "这样多久了？"), d("Lin", "Since this morning.", "从今天早上开始。"), d("Staff", "You should see a doctor if it gets worse.", "如果加重，你应该去看医生。")],
  { title: "把症状说具体", english: "Lin wakes up with a headache and a small fever. At the pharmacy, she explains when the symptoms started. The pharmacist gives her medicine and writes down how often to take it. Lin also saves the address of a nearby doctor in case she feels worse.", chinese: "小林醒来时头痛并有点发烧。在药店，她说明症状何时开始。药剂师给她药并写下服用频率。小林还保存了附近医生的地址，以防情况加重。" },
  [q("症状什么时候开始？", "this morning", ["last week", "on the plane"]), q("什么时候应该去看医生？", "if it gets worse", ["after breakfast", "before shopping"])],
  ),
  lesson(24, 5, "购物求助", "迷路与紧急求助", "街头求助", [
    w("lost", "迷路的；丢失的", "🧭", "指南针乱转时你可能 lost。"), w("police", "警察", "👮", "制服人物代表 police。"),
    w("safe", "安全的", "🛡️", "盾牌保护你 safe。"), w("danger", "危险", "🚨", "红色警报表示 danger。"),
    w("emergency", "紧急情况", "🆘", "SOS 就是 emergency。"),
  ], [p("I'm lost. Can you help me?", "我迷路了，可以帮我吗？"), p("Please call the police.", "请报警。")],
  g("请求别人行动", "Please + 动词原形", "紧急情况下直接说 Please call / help / wait。", "Please help me.", "请帮帮我。"),
  [d("Lin", "Excuse me, I'm lost. Can you help me?", "打扰一下，我迷路了，可以帮我吗？"), d("Local", "Of course. Where do you want to go?", "当然，你想去哪里？"), d("Lin", "I need to get back to my hotel.", "我需要回酒店。"), d("Local", "This bus will take you there.", "这辆公交会带你到那里。")],
  { title: "站在安全的地方求助", english: "Lin takes a wrong turn and cannot find the hotel. She moves to a bright, busy shop instead of staying on a quiet street. She shows the hotel address to the staff and asks for help. Soon she finds the correct bus and feels safe again.", chinese: "小林走错了路，找不到酒店。她没有停在安静的街道，而是走进一家明亮且人多的商店。她向店员展示酒店地址并求助，很快找到了正确的公交车，再次感到安全。" },
  [q("小林去哪里求助？", "a bright, busy shop", ["a quiet street", "an empty park"]), q("她向店员展示什么？", "the hotel address", ["a restaurant menu", "a boarding pass"])],
  ),
  lesson(25, 5, "购物求助", "丢失物品怎么办", "求助综合复习", [
    w("wallet", "钱包", "👛", "装钱和卡的 wallet。"), w("address", "地址", "📍", "地图图钉标出 address。"),
    w("find", "找到", "🔎", "放大镜帮助你 find。"), w("contact", "联系", "📞", "电话图标提醒 contact。"),
    w("embassy", "大使馆", "🏛️", "国旗旁的官方建筑是 embassy。"),
  ], [p("I can't find my wallet.", "我找不到钱包了。"), p("Where is the nearest police station?", "最近的警察局在哪里？")],
  g("表达不能", "I can't + 动词", "can't 后接动词原形，表示无法完成某事。", "I can't find my passport.", "我找不到护照了。"),
  [d("Lin", "I can't find my wallet.", "我找不到钱包了。"), d("Staff", "Where did you last see it?", "你最后在哪里看到它？"), d("Lin", "At the coffee shop, I think.", "我想是在咖啡店。"), d("Staff", "Let's contact the shop first.", "我们先联系那家店。")],
  { title: "先停下来回想", english: "Lin cannot find her wallet. She stops, checks every pocket, and remembers using it at a coffee shop. The hotel staff calls the shop and confirms that the wallet is there. Lin takes her passport copy and goes back to collect it.", chinese: "小林找不到钱包。她停下来检查每个口袋，想起最后在咖啡店用过。酒店员工致电店里，确认钱包在那里。小林带上护照复印件返回领取。" },
  [q("小林最后在哪里使用钱包？", "at a coffee shop", ["at the airport", "at a pharmacy"]), q("谁联系了咖啡店？", "the hotel staff", ["the police", "the taxi driver"])],
  ),
  lesson(26, 6, "独立旅行", "天气改变计划", "安排一天行程", [
    w("sunny", "晴朗的", "☀️", "大太阳代表 sunny。"), w("rainy", "下雨的", "🌧️", "雨云代表 rainy。"),
    w("cloudy", "多云的", "☁️", "云遮住天空就是 cloudy。"), w("plan", "计划", "🗓️", "日历上写下 plan。"),
    w("trip", "旅行", "🎒", "背上包开始 trip。"),
  ], [p("What's the weather like today?", "今天天气怎么样？"), p("Let's change the plan.", "我们改一下计划吧。")],
  g("谈论天气", "It is + 天气形容词", "天气通常用 It is 开头。", "It is rainy today.", "今天下雨。"),
  [d("Anna", "It's rainy today.", "今天下雨。"), d("Lin", "Let's change the plan.", "我们改一下计划吧。"), d("Anna", "How about the art museum?", "去美术馆怎么样？"), d("Lin", "Great idea. We can visit the park tomorrow.", "好主意，我们明天可以去公园。")],
  { title: "雨天也有好行程", english: "Lin plans to walk in the park, but the morning is rainy and cloudy. She does not let the weather ruin the day. She moves the park trip to tomorrow and visits an art museum instead. In the evening, the rain stops and the streets shine.", chinese: "小林原计划去公园散步，但早上阴雨绵绵。她没有让天气毁掉一天，而是把公园行程改到明天，转去参观美术馆。傍晚雨停了，街道闪闪发亮。" },
  [q("原来的计划是什么？", "walk in the park", ["go shopping", "take a flight"]), q("她改去哪里？", "an art museum", ["the airport", "a hospital"])],
  ),
  lesson(27, 6, "独立旅行", "请别人帮忙拍照", "景点交流", [
    w("photo", "照片", "🖼️", "相框里是一张 photo。"), w("camera", "相机", "📷", "按下 camera 快门。"),
    w("beautiful", "美丽的", "🌸", "盛开的花很 beautiful。"), w("together", "一起", "👫", "两个人站 together。"),
    w("smile", "微笑", "😊", "笑脸直接钩住 smile。"),
  ], [p("Could you take a photo for us?", "可以帮我们拍张照吗？"), p("One more, please.", "请再拍一张。")],
  g("为某人做某事", "动词 + for + 人", "take a photo for us 表示为我们拍照。", "Could you write it for me?", "你可以帮我写下来吗？"),
  [d("Lin", "Excuse me, could you take a photo for us?", "打扰一下，可以帮我们拍张照吗？"), d("Traveler", "Sure. Stand together by the tree.", "可以，站到树旁边。"), d("Traveler", "Smile!", "笑一个！"), d("Lin", "Thank you. One more, please.", "谢谢，请再来一张。")],
  { title: "照片之外的小交流", english: "The garden is beautiful, and Lin wants a photo with Anna. She politely asks another traveler for help and shows how to use the camera. After the photo, they talk about the garden for a minute. A simple request becomes a friendly travel memory.", chinese: "花园很美，小林想和安娜合影。她礼貌地请另一位游客帮忙，并展示相机如何使用。拍完后，她们聊了一会儿花园。一个简单请求变成了友好的旅行记忆。" },
  [q("谁帮助她们拍照？", "another traveler", ["a police officer", "a doctor"]), q("她们在哪里拍照？", "in a garden", ["at security", "in a pharmacy"])],
  ),
  lesson(28, 6, "独立旅行", "订票与确认", "博物馆预约", [
    w("book", "预订", "📲", "在手机上点一下完成 book。"), w("confirm", "确认", "✔️", "勾选表示 confirm。"),
    w("cancel", "取消", "❌", "叉号表示 cancel。"), w("available", "可预约的", "🟢", "绿灯表示 available。"),
    w("museum", "博物馆", "🏛️", "柱子建筑让你想起 museum。"),
  ], [p("I'd like to book two tickets.", "我想预订两张票。"), p("Could you confirm the time?", "可以确认一下时间吗？")],
  g("表达数量", "数字 + 可数名词复数", "数量大于一时，可数名词通常加 s。", "I'd like two tickets.", "我想要两张票。"),
  [d("Lin", "I'd like to book two tickets for tomorrow.", "我想预订两张明天的票。"), d("Staff", "Ten o'clock is available.", "十点有票。"), d("Lin", "Great. Could you confirm the address?", "好的，可以确认地址吗？"), d("Staff", "I'll send it by email.", "我会通过邮件发送。")],
  { title: "把预约信息放在一起", english: "Lin books two museum tickets for ten o'clock. She receives an email with the address and a QR code. Before bed, she confirms the date, time, and route. In the morning, she only needs to open one saved message.", chinese: "小林预订了两张十点的博物馆门票，收到包含地址和二维码的邮件。睡前，她确认日期、时间和路线。第二天早上，只需打开一条保存好的消息。" },
  [q("门票预约在几点？", "ten o'clock", ["eight o'clock", "noon"]), q("邮件里有什么？", "the address and a QR code", ["a room key", "a medicine list"])],
  ),
  lesson(29, 6, "独立旅行", "返程与行李", "车站和机场", [
    w("departure", "出发；离境", "🛫", "飞机离地表示 departure。"), w("delay", "延误", "⌛", "沙漏比预期更久就是 delay。"),
    w("baggage", "行李", "🧳", "旅行箱也可以叫 baggage。"), w("platform", "站台", "🚉", "等火车的位置是 platform。"),
    w("return", "返回", "↩️", "回转箭头表示 return。"),
  ], [p("Is the train delayed?", "火车晚点了吗？"), p("Where is the departure gate?", "出发登机口在哪里？")],
  g("一般疑问句", "Is + 名词 + 形容词?", "把 is 放到前面，就能询问某个状态是否成立。", "Is the flight delayed?", "航班延误了吗？"),
  [d("Lin", "Is the train delayed?", "火车晚点了吗？"), d("Staff", "Yes, by fifteen minutes.", "是的，晚点十五分钟。"), d("Lin", "Which platform should I use?", "我应该去哪个站台？"), d("Staff", "Platform six.", "6号站台。")],
  { title: "给延误留一点空间", english: "On the return day, Lin leaves the hotel early. Her train is delayed by fifteen minutes, but she has enough time. She checks the platform, keeps her baggage beside her, and watches the departure screen. At the airport, she finds her gate without rushing.", chinese: "返程当天，小林提前离开酒店。火车晚点十五分钟，但她预留了足够时间。她确认站台，把行李放在身边，并查看出发屏幕。到机场后，她从容地找到了登机口。" },
  [q("火车晚点多久？", "fifteen minutes", ["five minutes", "one hour"]), q("小林为什么没有着急？", "she has enough time", ["the flight is canceled", "she has no baggage"])],
  ),
  lesson(30, 6, "独立旅行", "我真的可以出发", "独自在国外的一天", [
    w("ready", "准备好的", "✅", "打勾表示 ready。"), w("brave", "勇敢的", "🦁", "狮子的心代表 brave。"),
    w("alone", "独自", "🧍", "一个人站着是 alone。"), w("remember", "记得", "🧠", "大脑帮你 remember。"),
    w("journey", "旅程", "🌏", "跨越地图的一段 journey。"),
  ], [p("I can do this.", "我可以做到。"), p("This is only the beginning.", "这只是开始。")],
  g("表达能力", "I can + 动词原形", "can 后接动词原形，告诉自己会做、能做。", "I can ask for help.", "我可以开口求助。"),
  [d("Anna", "Were you nervous on your first day?", "第一天你紧张吗？"), d("Lin", "Yes, but I spoke anyway.", "紧张，但我还是开口了。"), d("Anna", "You traveled alone and solved many problems.", "你独自旅行，还解决了很多问题。"), d("Lin", "I can do this. This is only the beginning.", "我可以做到，这只是开始。")],
  { title: "独自在国外的一天", english: "Lin starts the day by ordering breakfast in English. She takes the subway, asks for directions, visits a museum, and buys a small gift. When it rains, she changes her plan. When she does not understand, she asks people to repeat. She is not fearless or perfect. She is simply ready to try, brave enough to speak, and able to continue her journey.", chinese: "小林用英语点早餐开始新的一天。她乘地铁、问路、参观博物馆并买了一份小礼物。下雨时她调整计划，听不懂时请别人重复。她并非毫无畏惧，也不完美，只是愿意尝试、敢于开口，并能够继续自己的旅程。" },
  [q("下雨时小林做了什么？", "changes her plan", ["ends the journey", "loses her passport"]), q("文章如何描述她？", "ready to try and brave enough to speak", ["perfect at English", "never nervous"])],
  ),
];

export function validateFirstThirtyLessons() {
  const errors = [];
  if (firstThirtyLessons.length !== 30) errors.push("课程必须恰好为 30 节");
  const orders = new Set(firstThirtyLessons.map((item) => item.order));
  if (orders.size !== 30 || Math.min(...orders) !== 1 || Math.max(...orders) !== 30) errors.push("课程顺序必须为 1 到 30 且不重复");
  const units = new Map();
  for (const item of firstThirtyLessons) {
    units.set(item.unitOrder, (units.get(item.unitOrder) ?? 0) + 1);
    if (item.words.length !== 5) errors.push(`第 ${item.order} 课不是 5 个单词`);
    if (item.phrases.length !== 2) errors.push(`第 ${item.order} 课不是 2 个短语`);
    if (item.dialogue.length < 3) errors.push(`第 ${item.order} 课对话少于 3 轮`);
    if (item.checks.length !== 2) errors.push(`第 ${item.order} 课不是 2 道理解题`);
    const requiredText = [
      item.unitTitle, item.title, item.scene,
      item.grammar?.title, item.grammar?.pattern, item.grammar?.explanation,
      item.grammar?.exampleEnglish, item.grammar?.exampleChinese,
      item.story?.title, item.story?.english, item.story?.chinese,
    ];
    if (requiredText.some((value) => typeof value !== "string" || !value.trim())) errors.push(`第 ${item.order} 课存在空白必填内容`);
    if (new Set(item.words.map((word) => word.english.trim().toLowerCase())).size !== item.words.length) errors.push(`第 ${item.order} 课存在重复单词`);
    if (new Set(item.phrases.map((phrase) => phrase.english.trim().toLowerCase())).size !== item.phrases.length) errors.push(`第 ${item.order} 课存在重复短语`);
    if (new Set(item.checks.map((check) => check.prompt.trim())).size !== item.checks.length) errors.push(`第 ${item.order} 课存在重复题干`);
    for (const check of item.checks) {
      const options = [check.answer, ...check.distractors].map((value) => value.trim().toLowerCase());
      if (!check.prompt.trim() || !check.answer.trim()) errors.push(`第 ${item.order} 课存在空白理解题`);
      if (check.distractors.length !== 2) errors.push(`第 ${item.order} 课理解题必须有 2 个干扰项`);
      if (new Set(options).size !== options.length) errors.push(`第 ${item.order} 课理解题答案与选项重复`);
    }
    const storyWords = item.story.english.trim().split(/\s+/).length;
    if (storyWords < 25 || storyWords > 100) errors.push(`第 ${item.order} 课文章长度为 ${storyWords}，应在 25 到 100 词`);
  }
  if (units.size !== 6 || [...units.values()].some((count) => count !== 5)) errors.push("课程必须由 6 个单元组成且每单元 5 节");
  return errors;
}
