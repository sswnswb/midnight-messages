// 第一章 《第一夜》——号码报出王斌的秘密；多差异找茬谜题；深夜探索

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
    N('c1s4', 'number', '别怕。我不会伤害你。\n\n我只是……想让你想起来。', ['typing'], undefined, 'c1s4a'),
    N('c1s4a', 'number', '你昨天加班到十点，回来没吃晚饭。\n\n冰箱第三层，有一盒你热过一次又放回去的饭。\n\n你自己都不敢承认，那饭是你做的，却一直以为是她做的。', ['typing', 'sting'], [
      { label: '你连我家冰箱都知道？！', go: 'c1s4b', flags: { knowFridge: true } },
      { label: '*手一松，手机差点掉了', go: 'c1s4b' },
    ]),
    N('c1s4b', 'number', '我说过，我就在你身边。\n\n今晚，先送你一样东西。\n\n你收到一张照片。看仔细了。', ['typing', 'sfx:msg_num', 'photo:p_hallway', 'photo:open:p_hallway', 'sting'], undefined, 'c1s5'),
    N('c1s5', 'number', '那张照片，是你相册里那张走廊照的"另一版"。\n\n找出不同。全都找出来。', ['typing', 'banner:照片已收到 —— 找找哪里不对劲'], undefined, 'c1s6'),
    N('c1s6', 'narration', '屏幕暗下去，又亮起来。\n\n那张照片……和你相册里你自己拍的那张，好像，不太一样？\n\n不是一处。是三处。', ['sting'], undefined, 'c1s7'),
    N('c1s7', 'narration', '你盯着它看了很久。', [], [
      { label: '*回相册，两张对比一下', effect: ['screen:photos'], go: 'c1s7' },
      { label: '*告诉它：门缝里，多了一个人。', cond: 'flag:puzzle1Done', go: 'c1s7a', flags: { foundDiff: true }, effect: ['count:trait_truth'] },
      { label: '*告诉它：没什么不一样。', go: 'c1s7b', flags: { missedDiff: true }, effect: ['count:trait_avoid'] },
    ]),
    // 找全三处的奖励：号码逐一点破
    N('c1s7a', 'number', '对。门缝里的人影。\n\n还有呢？\n\n你茶几上的杯子，是你昨晚加班忘带回去、早上又放回原位的。\n\n你右边的窗帘，是你自己拉上的——你怕深夜有人从外面看进来。', ['typing', 'stinglong'], [
      { label: '*够了。你到底想干什么？', go: 'c1s8', flags: { enough: true }, effect: ['count:trait_truth'] },
      { label: '*那你告诉我，门缝里的人是谁？', go: 'c1s8a' },
    ]),
    // 没找到的路径
    N('c1s7b', 'number', '没有不一样？\n\n你再想想。\n\n门缝里，多了一个人。茶几上，多了一个杯子。窗帘，被拉上了。\n\n三处。你一样都没看见。', ['typing', 'sting'], [
      { label: '*……你是说，照片在动？', go: 'c1s8' },
      { label: '*我不想看了。', go: 'c1s8' },
    ]),
    N('c1s8', 'number', '你比我想的敏锐。\n\n门缝里的人影，你怕吗？', ['typing', 'sting'], undefined, 'c1s8a'),
    N('c1s8a', 'number', '怕，就对了。\n\n你该怕的不是那个人影。\n\n是你一直不敢确认的——那一晚，到底发生了什么。', ['typing'], [
      { label: '那一晚……是哪一晚？', go: 'c1s9', flags: { askNight: true } },
      { label: '*把手机扣在桌上', go: 'c1s9', flags: { flipPhone: true }, effect: ['count:trait_avoid'] },
    ]),
    N('c1s9', 'number', '别怕。\n\n那只是我，想让你记住的某个东西。\n\n明天，或者后天，你会想起来的。', ['typing'], undefined, 'c1s10'),
    N('c1s10', 'number', '这张照片，是从你房间的门缝里拍的。\n\n你回头看一眼——你客厅的灯，是不是还亮着？', ['typing', 'sting'], undefined, 'c1s11'),
    N('c1s11', 'narration', '你回头。\n\n客厅的灯，确实亮着。\n\n你明明记得，进门的时候，没有开灯。', ['stinglong', 'silence'], undefined, 'c1s11a'),
    N('c1s11a', 'narration', '你站在客厅和卧室的门口，不敢再往里走。', [], [
      { label: '*去走廊，看看那扇门', go: 'c1s11b' },
      { label: '*去茶几，看看那个杯子', go: 'c1s11c' },
      { label: '*退回床上，蒙住被子', go: 'c1s11d' },
    ]),
    N('c1s11b', 'narration', '走廊的灯没开。\n\n你摸到门边。那扇门虚掩着，门缝里黑黢黢的，什么也看不见。\n\n你忽然想起照片里那个站在门缝里的人影——\n\n它现在，是在门里，还是门后？', ['sting', 'scare:flash'], [
      { label: '*猛地把门关上', go: 'c1s11e' },
      { label: '*退回客厅', go: 'c1s11e' },
    ]),
    N('c1s11c', 'narration', '茶几上，确实放着一个杯子。\n\n空的。杯沿还有一点干涸的水渍。\n\n你昨晚加班回来，没有喝水，没有碰过它。\n\n那是谁喝的？', ['sting', 'battery:-6'], [
      { label: '*拿起杯子，倒掉里面的空气', go: 'c1s11e' },
      { label: '*手缩了回来', go: 'c1s11e' },
    ]),
    N('c1s11d', 'narration', '你退回床上，被子拉到头顶。\n\n手机屏幕的微光，透过被子照进来。\n\n你知道，它在等你。', ['battery:-6'], undefined, 'c1s12'),
    N('c1s11e', 'narration', '你退回卧室。\n\n背后，客厅的灯，在你自己关掉之后……过了三秒，又亮了。\n\n你没有再回去关。', ['sting', 'wallchange'], undefined, 'c1s12'),
    N('c1s12', 'number', '……晚安。明天 00:00，我还在。\n\n除非——你想起来。', ['typing'], undefined, 'c1s13'),
    N('c1s13', 'system', '对方已离线。', [], undefined, 'c1s13a'),
    N('c1s13a', 'narration', '凌晨一点。你睡意全无。\n\n你翻着今天收到的照片，翻着相册里那张原图。\n\n门缝里的人影、茶几上的杯子、被拉上的窗帘。\n\n有些东西，你逃避了一年。', ['time:70', 'typing'], [
      { label: '*把这些碎片收进证据册', effect: ['evidence:e_hallway'], go: 'c1s14' },
      { label: '*把手机放远一点，闭上眼', go: 'c1s14', flags: { putAway: true }, effect: ['count:trait_avoid'] },
    ]),
    N('c1s14', 'narration', '你一夜没睡。\n\n天一点点变亮。你看着那条短信，看了很久。', ['time:270'], [
      { label: '睡一会儿吧，明天还要上班。', go: 'c2s1', flags: { keptWorking: true } },
      { label: '*想把这件事告诉周凯', go: 'c2s1', flags: { wantTell: true } },
      { label: '*把号码删掉，假装没发生过', effect: ['count:trait_avoid'], go: 'c2s1', flags: { deleted: true } },
    ]),
  ],
};
