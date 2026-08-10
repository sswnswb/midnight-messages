// 第二章 《第二夜》——谜题①：纪念日密码

import type { Chapter, StoryNode } from '../types';

const N = (
  id: string,
  speaker: StoryNode['speaker'],
  text: string,
  effects?: string[],
  choices?: StoryNode['choices'],
  next?: string,
): StoryNode => ({ id, speaker, text, effects, choices, next });

export const ch2: Chapter = {
  id: 2,
  title: '第二夜',
  nodes: [
    N('c2s1', 'narration', '白天浑浑噩噩。周凯在微信上喊你吃午饭，你没回。\n\n晚上十一点五十，你躺下，手机放在枕边。\n\n你知道它要来。', ['chapter:2', 'card:2', 'note:n_secret', 'contact:c_doctor'], undefined, 'c2s2'),
    N('c2s2', 'number', '我来了。', ['typing', 'sfx:msg_num', 'time:0'], undefined, 'c2s3'),
    N('c2s3', 'number', '今天你开会走了三次神。第三次，你在备忘录里写了一个字，又删了。', ['typing'], [
      { label: '你连我的备忘录都看得见？', go: 'c2s4', flags: { revealNote: true } },
      { label: '*没回，却打开了自己的备忘录', go: 'c2s4b' },
    ]),
    N('c2s4', 'number', '看不见。\n\n但我读得懂你。你写的那个字，是"晚"。对吧。', ['typing'], undefined, 'c2s5'),
    N('c2s4b', 'number', '你自己都忘了自己写过什么，对吧。\n\n那我来告诉你——是"晚"。', ['typing'], undefined, 'c2s5'),
    N('c2s5', 'number', '我们来玩个游戏。\n\n你猜对一个，我就告诉你我是谁。', ['typing'], undefined, 'c2s6'),
    N('c2s6', 'number', '谜题。\n\n我们第一次见面的日子。\n\n给你一个提示：你的相册里，有一张蛋糕。', ['typing'], undefined, 'c2s6w'),
    // 决策点：可去翻相册，也可直接答
    N('c2s6w', 'narration', '你想了想。', [], [
      { label: '*先去翻相册，找那张蛋糕的照片', effect: ['screen:photos'], go: 'c2s6w' },
      { label: '*直接回答：4 月 18 日', go: 'c2s7', flags: { solvedPuzzle1: true } },
      { label: '*直接回答：6 月 2 日', go: 'c2s6wrong' },
      { label: '*直接回答：11 月 6 日', go: 'c2s6wrong' },
    ]),
    N('c2s6wrong', 'number', '不对。\n\n你连这个都忘了？她得多难过。', ['typing', 'sting'], [
      { label: '*再想想', go: 'c2s6wrong2', flags: { wrongP1: true } },
    ]),
    N('c2s6wrong2', 'number', '再想想。\n\n相册里那张蛋糕照片，日期，你看见过。', ['typing'], [
      { label: '*翻相册，找那张蛋糕的照片', effect: ['screen:photos'], go: 'c2s6w' },
      { label: '*再猜一次', go: 'c2s6w' },
    ]),
    N('c2s7', 'number', '……4 月 18 日。\n\n那是你们相遇的第一天。很好，你记得。\n\n可是你记不记得，你们在一起的最后一天，是哪一天？', ['typing', 'sfx:sting'], [
      { label: '11 月 6 日。车祸那天。', go: 'c2s8', flags: { knowsDate: true } },
      { label: '*不想回答', go: 'c2s8' },
    ]),
    N('c2s8', 'number', '11 月 6 日。那天下着大雨。\n\n你开着车，手机亮着——一条短信。\n\n你回了吗？', ['typing'], undefined, 'c2s9'),
    N('c2s9', 'number', '回答我。', ['typing'], [
      { label: '我……没回。我在开车。', go: 'c2s9a', flags: { claimDriving: true } },
      { label: '我不记得了。', go: 'c2s9b', flags: { noMemory: true } },
    ]),
    N('c2s9a', 'number', '是吗。\n\n你确定吗。', ['typing', 'sting'], [{ label: '*沉默', go: 'c2s10' }]),
    N('c2s9b', 'number', '你果然不记得了。\n\n没关系。我替你记着。', ['typing', 'sting'], [{ label: '*沉默', go: 'c2s10' }]),
    N('c2s10', 'number', '今晚先到这儿。\n\n明天，我带你去见一个人。', ['typing'], [
      { label: '*打给周凯，把这件事说出来', effect: ['call:zhou'], go: 'c2_aftercall_zhou' },
      { label: '*打给妈妈，听听她的声音', effect: ['call:mom'], go: 'c2_aftercall_mom' },
      { label: '*谁都不打，自己扛着', go: 'c2s11', flags: { alone: true } },
    ]),
    // 自己扛
    N('c2s11', 'number', '很好。\n\n你选择了自己扛。像以前一样。', ['typing'], undefined, 'c2s12'),
    N('c2s12', 'number', '晚安。明天见。\n\n等你真正想起来的时候，你会感谢今晚的你。', ['typing'], undefined, 'c3s1'),
    // 电话后汇合
    N('c2_aftercall_zhou', 'number', '你的同事很关心你。\n\n可惜，他帮不了你。', ['typing', 'calllog:c_zhou_1'], [
      { label: '*把号码发给周凯看', go: 'c2s12', flags: { toldZhou: true } },
      { label: '算了，说了他也不信。', go: 'c2s12', flags: { toldZhou: true } },
    ]),
    N('c2_declined_zhou', 'number', '连周凯的电话你都不接？\n\n你把自己关得太死了。', ['typing'], [{ label: '……', go: 'c2s12', flags: { refusedHelp: true } }]),
    N('c2_aftercall_mom', 'number', '妈妈的声音，让你有点想哭。', ['typing', 'calllog:c_mom_1'], [
      { label: '*想把这件事告诉妈妈', go: 'c2s12', flags: { toldMom: true } },
      { label: '*没说出口，只说"我挺好的"', go: 'c2s12', flags: { liedMom: true } },
    ]),
    N('c2_declined_mom', 'number', '你挂断了妈妈的电话。', ['typing'], [{ label: '……', go: 'c2s12', flags: { refusedHelp: true } }]),
  ],
};
