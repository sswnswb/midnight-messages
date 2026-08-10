// 第五章 《最后一夜》——五个结局

import type { Chapter, StoryNode } from '../types';

const N = (
  id: string,
  speaker: StoryNode['speaker'],
  text: string,
  effects?: string[],
  choices?: StoryNode['choices'],
  next?: string,
  end?: string,
): StoryNode => ({ id, speaker, text, effects, choices, next, end });

export const ch5: Chapter = {
  id: 5,
  title: '最后一夜',
  nodes: [
    N('c5s1', 'narration', '窗外下着雨，像那晚一样。\n\n你坐在床边，没有开灯。手机握在手里，屏幕暗着。\n\n你等它。\n\n00:00。', ['chapter:5', 'card:5', 'time:0'], undefined, 'c5s2'),
    N('c5s2', 'number', '最后一夜了。王斌。', ['typing', 'sfx:msg_num'], undefined, 'c5s3'),
    N('c5s3', 'number', '一年了。每天 00:00，我都在这里等你。\n\n现在你都想起来了。\n\n所以——轮到你回答了。', ['typing'], undefined, 'c5s4'),
    N('c5s4', 'number', '我给你三个选择。\n\n不，我给你五个。\n\n记住：没有正确的答案。只有你想成为什么样的人。', ['typing', 'sting'], undefined, 'c5s5'),
    // 五个结局的选择
    N('c5s5', 'narration', '雨声很大。你看着屏幕，很久。', [], [
      { label: '我想起来，也愿意承担。明天，我去自首。', go: 'c5end_confess', flags: { chooseConfess: true } },
      { label: '我想活下去。我去找陈医生，把一切都告诉他。', go: 'c5end_therapy', flags: { chooseTherapy: true } },
      { label: '我受够了。我删掉所有，重新开始。', go: 'c5end_loop', flags: { chooseLoop: true } },
      { label: '我不删他。我接受他。我原谅我自己。', cond: 'flag:tears', go: 'c5end_merge', flags: { chooseMerge: true } },
      { label: '*不回复。让这个号码永远等下去。', go: 'c5end_silence', flags: { chooseSilence: true } },
    ]),
    // 各结局收束节点
    N('c5end_confess', 'narration', '你打出了那三个字，按下发送：\n\n「我去自首。」\n\n号码没有再回。', ['sfx:send', 'time:5'], [], undefined, 'ending:confess'),
    N('c5end_therapy', 'narration', '你找到了陈医生的名片，拨了过去。\n\n电话响了三声，接通了。\n\n你说：医生，我想聊聊。', ['sfx:ring', 'time:5'], [], undefined, 'ending:therapy'),
    N('c5end_loop', 'narration', '你删除了所有聊天记录，拉黑号码，清空了草稿箱。\n\n手机恢复出厂设置的那一刻，你长长地舒了一口气。', ['sfx:send', 'time:5', 'sting'], [], undefined, 'ending:loop'),
    N('c5end_merge', 'narration', '你保存了所有记录，一条也没有删。\n\n你关掉手机，没有等它。\n\n你知道，它——不，你——明天还会来。而你不再害怕了。', ['sfx:send', 'time:5'], [], undefined, 'ending:merge'),
    N('c5end_silence', 'narration', '你没有回。\n\n屏幕暗下去，又因为新消息亮起来。你没有看。\n\n天亮了。你也没有看。', ['time:420', 'sting'], [], undefined, 'ending:silence'),
  ],
};
