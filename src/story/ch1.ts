// 第一章 《第一夜》——号码开始报出王斌的秘密；照片找不同谜题

import type { Chapter, StoryNode } from '../types';

const N = (
  id: string,
  speaker: StoryNode['speaker'],
  text: string,
  effects?: string[],
  choices?: StoryNode['choices'],
  next?: string,
): StoryNode => ({ id, speaker, text, effects, choices, next });

export const ch1: Chapter = {
  id: 1,
  title: '第一夜',
  nodes: [
    N('c1s1', 'number', '我是谁不重要。\n\n我知道你叫王斌。今天下午三点，你在十七楼会议室，方案又没过。领导把文件摔在桌上时，你的手抖了一下。', ['typing'], undefined, 'c1s2'),
    N('c1s2', 'number', '还有。你住的这间屋子，一年前，住着另一个人。\n\n你把她弄丢了。', ['typing', 'stinglong'], undefined, 'c1s3'),
    N('c1s3', 'number', '我说的对吗。', ['typing'], [
      { label: '你连这个都知道？你到底是谁？', effect: ['count:trait_care'], go: 'c1s4', flags: { askWho: true } },
      { label: '*握紧手机，指节发白', effect: ['count:trait_care'], go: 'c1s4', flags: { shaken: true } },
      { label: '*把这个号码拉黑', effect: ['count:trait_avoid'], go: 'c1s3b' },
    ]),
    N('c1s3b', 'number', '拉黑没有用。\n\n三秒后，一条新短信，来自一个新的陌生号码：\n\n「我说过，我在你身边。」', ['typing', 'sting'], undefined, 'c1s4'),
    N('c1s4', 'number', '别怕。我不会伤害你。\n\n我只是……想让你想起来。', ['typing'], undefined, 'c1s5'),
    N('c1s5', 'number', '今晚，先送你一样东西。\n\n你收到一张照片。看仔细了。', ['typing', 'sfx:msg_num', 'photo:p_hallway', 'photo:open:p_hallway', 'sting'], undefined, 'c1s6'),
    N('c1s6', 'narration', '屏幕暗下去，又亮起来。\n\n那张照片……和你相册里你自己拍的那张，好像，不太一样？', ['sting'], undefined, 'c1s7'),
    N('c1s7', 'narration', '你盯着它看了很久。', [], [
      { label: '*回相册，两张对比一下', effect: ['screen:photos'], go: 'c1s7' },
      { label: '*告诉它：门缝里，多了一个人。', cond: 'flag:puzzle1Done', go: 'c1s8', flags: { foundDiff: true }, effect: ['count:trait_truth'] },
      { label: '*告诉它：没什么不一样。', go: 'c1s8', flags: { missedDiff: true }, effect: ['count:trait_avoid'] },
    ]),
    N('c1s8', 'number', '……你比我想的敏锐。\n\n门缝里的人影，你怕吗？', ['typing', 'sting'], undefined, 'c1s9'),
    N('c1s9', 'number', '别怕。\n\n那只是我，想让你记住的某个东西。', ['typing'], undefined, 'c1s10'),
    N('c1s10', 'number', '这张照片，是从你房间的门缝里拍的。\n\n你回头看一眼——你客厅的灯，是不是还亮着？', ['typing', 'sting'], undefined, 'c1s11'),
    N('c1s11', 'narration', '你回头。\n\n客厅的灯，确实亮着。\n\n你明明记得，进门的时候，没有开灯。', ['stinglong', 'silence'], undefined, 'c1s12'),
    N('c1s12', 'number', '……晚安。明天 00:00，我还在。\n\n除非——你想起来。', ['typing'], undefined, 'c1s13'),
    N('c1s13', 'system', '对方已离线。', [], undefined, 'c1s14'),
    N('c1s14', 'narration', '你一夜没睡。\n\n天一点点变亮。你看着那条短信，看了很久。', ['time:270'], [
      { label: '睡一会儿吧，明天还要上班。', go: 'c2s1', flags: { keptWorking: true } },
      { label: '*想把这件事告诉周凯', go: 'c2s1', flags: { wantTell: true } },
      { label: '*把号码删掉，假装没发生过', effect: ['count:trait_avoid'], go: 'c2s1', flags: { deleted: true } },
    ]),
  ],
};
