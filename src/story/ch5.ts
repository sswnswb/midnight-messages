// 第五章 《最后一夜》——结局由人格加权结算，无明选菜单

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
    N('c5s4', 'number', '这一夜，你一共 {trait_truth} 次直面我，{trait_help} 次向人求助，{trait_avoid} 次想把我推远，{trait_care} 次想起她。', ['typing'], undefined, 'c5s5'),
    N('c5s5', 'number', '我是那个替你记得一切的人。\n\n现在，天快亮了。\n\n你想记得我，还是忘了我？', ['typing', 'sting'], undefined, 'c5s5w'),
    // 结局由人格挣得：选项是被你"玩出来"的，不是菜单
    N('c5s5w', 'narration', '雨声很大。你握着手机。', [], [
      { label: '*天亮就去派出所，把一切说清楚。', cond: 'count:trait_truth>=3', effect: ['count:trait_truth'], go: 'c5s6t' },
      { label: '*拨通陈医生的电话。', cond: 'count:trait_help>=2', effect: ['count:trait_help'], go: 'c5s6h' },
      { label: '*翻开她的照片，看最后一眼。', cond: 'count:trait_care>=3', effect: ['count:trait_care'], go: 'c5s6c' },
      { label: '*把手机恢复出厂设置。', cond: 'count:trait_avoid>=3', effect: ['count:trait_avoid'], go: 'c5s6a' },
      { label: '*什么都不做，也不说话。', cond: 'count:trait_silent>=2', effect: ['count:trait_silent'], go: 'c5s6s' },
      { label: '*就这样坐着，天快亮了。', effect: ['count:trait_silent'], go: 'c5s6s' },
    ]),
    // 各行动收束（结局由 resolveEnding 加权决定）
    N('c5s6t', 'narration', '你打出了那行字，发送。\n\n然后，你拨出了那个号码。\n\n号码没有再回。', ['sfx:send', 'time:5'], [], undefined, 'ending:resolve'),
    N('c5s6h', 'narration', '你找到了陈医生的名片，拨了过去。\n\n电话响了三声，接通了。\n\n你说：医生，我想聊聊。', ['sfx:ring', 'time:5'], [], undefined, 'ending:resolve'),
    N('c5s6c', 'narration', '你翻开相册，找到那张蛋糕照片。\n\n蜡烛的光，照着你一个人的脸。\n\n你忽然明白，这一年你真正怕的是什么。', ['sfx:breath', 'time:5'], [], undefined, 'ending:resolve'),
    N('c5s6a', 'narration', '你删除了所有聊天记录，拉黑号码，清空了草稿箱。\n\n手机恢复出厂设置的那一刻，你长长地舒了一口气。', ['sfx:send', 'time:5', 'sting'], [], undefined, 'ending:resolve'),
    N('c5s6s', 'narration', '你没有回。\n\n屏幕暗下去，又因为新消息亮起来。你没有看。\n\n天亮了。你也没有看。', ['time:420', 'sting'], [], undefined, 'ending:resolve'),
  ],
};
