// 结局数据：5 种结局

import type { EndData } from '../types';

export const ENDINGS: Record<string, EndData> = {
  confess: {
    id: 'confess',
    title: '自首',
    kind: 'true',
    unlocksNext: true,
    text: `凌晨三点，你坐在派出所门口的长椅上，手机亮着。\n\n那一串号码安静了很久。你看着它，第一次觉得它像一面镜子。\n\n你把手机翻了个面，走进大厅。\n\n\n几个月后，你收到一条短信，来自你换掉的那个旧号码。\n\n只有两个字——\n\n「晚安。」\n\n你盯着看了很久。你知道那条短信不是你发的。\n\n你点了已读，然后没有回。`,
  },
  therapy: {
    id: 'therapy',
    title: '面对',
    kind: 'good',
    unlocksNext: true,
    text: `你删掉了那个号码，把所有记录清空，然后拨通了陈医生的电话。\n\n那是你一年来第一次完整地讲出那晚的事。\n\n窗外的雨下了一夜。医生听完，沉默了很久，只说了一句：\n\n「你没有删掉他。你只是愿意开始照顾他了。」\n\n从那天起，手机里的未读，终于一条一条变少了。\n\n你偶尔还是会想起那串号码。但你不再怕它了。`,
  },
  loop: {
    id: 'loop',
    title: '循环',
    kind: 'bad',
    unlocksNext: true,
    text: `你拉黑了那个号码，删除了所有记录，把手机恢复出厂设置。\n\n干净了。\n\n一切都像什么都没发生过。\n\n你在新手机里重新下载了备忘录，第一条写着：\n\n「别想太多。」\n\n第二天夜里，00:00，屏幕亮起。\n\n一条新短信，来自一个陌生的号码：\n\n「还没睡？」\n\n你的手指悬在屏幕上方，很久。\n\n（游戏并未结束。你可以再玩一次。）`,
  },
  merge: {
    id: 'merge',
    title: '我们',
    kind: 'hidden',
    unlocksNext: true,
    text: `你没有删掉他。\n\n你坐在地板上，一条一条地读着过去一年的定时短信，像读一本你写过却忘掉的书。\n\n读到最后一条草稿，你忽然懂了：他不是要伤害你。\n\n他只是那晚被你锁在手机里、替你记得一切的另一个你。\n\n你打出最后一句话，按下了发送。\n\n「我原谅你了。」\n\n这一次，草稿箱空了。\n\n房间的灯亮了。有人在看窗外，终于不再是一个人。`,
  },
  silence: {
    id: 'silence',
    title: '沉默',
    kind: 'silence',
    unlocksNext: true,
    text: `你没有回任何一条消息。\n\n一开始，号码还等。后来，它开始发得越来越少。\n\n第七天，它只发来四个字：\n\n「你不在了。」\n\n之后，它再也没有出现过。\n\n你赢了。你让那个半夜想跟你说话的东西，死在了没有人回应的沉默里。\n\n你保存了所有记录，时常翻看，像翻看一封永远没有寄出的信。\n\n有一天你会后悔的。但不是今天。`,
  },
};

export function getEnding(id: string): EndData | undefined {
  return ENDINGS[id];
}

export function listEndings(): EndData[] {
  return Object.values(ENDINGS);
}
