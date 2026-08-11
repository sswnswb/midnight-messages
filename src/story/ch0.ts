// 序章 《她》——人物交代：通过翻手机，认识王斌是谁

import type { Chapter, StoryNode } from '../types';

const N = (
  id: string,
  speaker: StoryNode['speaker'],
  text: string,
  effects?: string[],
  choices?: StoryNode['choices'],
  next?: string,
): StoryNode => ({ id, speaker, text, effects, choices, next });

export const ch0: Chapter = {
  id: 0,
  title: '她',
  nodes: [
    N('p1s1', 'narration', '二十三点五十分。雨下了一天。\n\n钥匙在锁孔里转了两圈，门开了。你脱下湿透的外套，挂在椅背上。\n\n桌上放着中午没吃完的外卖，垃圾桶里有三个空咖啡罐。\n\n你是王斌。二十八岁，在一家不大不小的公司做方案，一周被驳回三次。', ['chapter:0', 'ambient:on'] as string[], undefined, 'p1s2'),
    N('p1s2', 'narration', '你把自己摔进沙发。手机屏幕自己亮了一下，又暗下去。\n\n一年了。有些东西，你一直没舍得删，也没敢再看。', ['banner:一年前，这里还住着另一个人'], undefined, 'p1s2w'),
    N('p1s2w', 'narration', '你点开手机。', [], [
      { label: '*打开备忘录，看看那些没删的便签', effect: ['screen:notes', 'count:visitedExplore'], go: 'p1s2w' },
      { label: '*打开相册，翻到那些老照片', effect: ['screen:photos', 'count:visitedExplore'], go: 'p1s2w' },
      { label: '*打开联系人，看那个永远不会再亮的头像', effect: ['screen:contacts', 'count:visitedExplore'], go: 'p1s2w' },
      { label: '*打开通话记录', effect: ['screen:calls', 'count:visitedExplore'], go: 'p1s2w' },
      { label: '*都看过了。有些事，想起来比忘掉疼。', cond: 'count:visitedExplore>=2', go: 'p1s3' },
    ]),
    N('p1s3', 'narration', '你合上手机，盯着天花板。\n\n雨声很大。你听见自己的呼吸。\n\n有些事，你不敢多想。想多了，这间屋子就装不下了。', ['time:6'], undefined, 'p1s4'),
    N('p1s4', 'narration', '二十三点五十八分。\n\n手机屏幕又亮了一下。\n\n不是闹钟。', ['time:2', 'sfx:msg_num'], undefined, 'p1s5'),
    N('p1s5', 'system', '00:00', ['time:0'], undefined, 'p1s6'),
    N('p1s6', 'number', '还没睡？', ['typing'], undefined, 'p1s7'),
    N('p1s7', 'number', '我知道你睡不着的。', ['typing'], undefined, 'p1s8'),
    N('p1s8', 'number', '一年了。你一直都在假装没事。\n\n可我认得你。', ['typing'], [
      { label: '你是谁？', go: 'c1s1', flags: { askWho: true } },
      { label: '*不回。盯着屏幕。', go: 'c1s1' },
    ]),
  ],
};
