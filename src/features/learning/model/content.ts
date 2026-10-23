import type { LearningStep } from "./types";

export const learningSteps: LearningStep[] = [
  {
    id: "image",
    eyebrow: "01",
    title: "看图记 5 个词",
    description: "用视觉符号和记忆钩子，不抄写也能留下印象。",
    actionLabel: "去记词",
    tone: "coral",
  },
  {
    id: "number",
    eyebrow: "02",
    title: "读对话和小文章",
    description: "把单词放回一个真实场景，听懂它在句子里怎么用。",
    actionLabel: "试一试",
    tone: "blue",
  },
  {
    id: "scene",
    eyebrow: "03",
    title: "主动回想 5 道题",
    description: "不看答案把内容捞回来，答错就进入个人错题本。",
    actionLabel: "开口练",
    tone: "yellow",
  },
];

export const reviewMoments = [
  ["现在", "看图 + 开口"],
  ["10 分钟后", "遮图回忆"],
  ["明天", "3 题小测"],
  ["第 3 天", "放进旅行场景"],
  ["第 7 天", "只复习还会错的"],
] as const;
