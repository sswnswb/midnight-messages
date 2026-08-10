// 第三章 《第三夜》——不可靠叙述：两条矛盾的备忘录

import type { Chapter, StoryNode } from '../types';

const N = (
  id: string,
  speaker: StoryNode['speaker'],
  text: string,
  effects?: string[],
  choices?: StoryNode['choices'],
  next?: string,
): StoryNode => ({ id, speaker, text, effects, choices, next });

export const ch3: Chapter = {
  id: 3,
  title: '第三夜',
  nodes: [
    N('c3s1', 'narration', '白天，周凯在微信上问你"到底怎么了"。你打了几个字，又删了。\n\n夜里，雨又下了起来。00:00，手机准时亮起。', ['chapter:3', 'card:3', 'time:0'], undefined, 'c3s2'),
    N('c3s2', 'number', '今晚，我不说话。\n\n你先去看你的备忘录。第三条。\n\n那不是你写的。', ['typing', 'note:n_wrong', 'sting'], undefined, 'c3s2w'),
    N('c3s2w', 'narration', '备忘录里，多了一条不是你写的东西。', [], [
      { label: '*打开备忘录看看', effect: ['screen:notes'], go: 'c3s2w' },
      { label: '我自己的备忘录，我还不清楚？', go: 'c3s3', flags: { doubt: true } },
    ]),
    N('c3s3', 'number', '看到了吗。\n\n"别信手机"。三条。\n\n那是你自己写的，还是……我替你写的？', ['typing', 'sting'], undefined, 'c3s4'),
    N('c3s4', 'number', '现在，去看你的通话记录。\n\n昨晚 00:04，有一通拨出的电话，打给"未知号码"。时长 3 秒。', ['typing', 'calllog:c_self', 'sting'], undefined, 'c3s4w'),
    N('c3s4w', 'narration', '你不敢相信。', [], [
      { label: '*打开通话记录确认', effect: ['screen:calls'], go: 'c3s4w' },
      { label: '我没打过这个电话！', go: 'c3s5', flags: { deniedCall: true } },
    ]),
    N('c3s5', 'number', '可它就在那里。\n\n3 秒。00:04。\n\n刚好在你删掉我聊天记录之前。', ['typing'], undefined, 'c3s6'),
    N('c3s6', 'number', '你开始怀疑了吧。\n\n你的手机，在背着你做事。\n\n或者——背着你的人，是你自己。', ['typing', 'stinglong'], undefined, 'c3s7'),
    N('c3s7', 'number', '今晚，我再给你看一样东西。\n\n然后，你决定信谁。', ['typing', 'note:n_right'], undefined, 'c3s8'),
    N('c3s8', 'narration', '备忘录里，现在有两条故障的字。\n\n一条说：别信手机。\n\n一条说：别信自己。', ['sting'], undefined, 'c3s8w'),
    N('c3s8w', 'narration', '你站在两条之间。', [], [
      { label: '我信手机。至少它是我的。', go: 'c3s9a', flags: { trustPhone: true } },
      { label: '我信我自己。我怎么会害自己。', go: 'c3s9b', flags: { trustSelf: true } },
      { label: '*两条都不信，再去备忘录看看', effect: ['screen:notes'], go: 'c3s8w' },
    ]),
    N('c3s9a', 'number', '你信手机？\n\n可昨晚 00:04 那通电话，就是你的手机自己打的。', ['typing', 'sting'], [{ label: '*沉默', go: 'c3s10' }]),
    N('c3s9b', 'number', '你信自己？\n\n那为什么你会忘掉那么多事。为什么备忘录里会有你没写过的字。', ['typing', 'sting'], [{ label: '*沉默', go: 'c3s10' }]),
    N('c3s10', 'number', '你不是疯了。\n\n你只是……不敢想起来。', ['typing'], undefined, 'c3s11'),
    N('c3s11', 'number', '明天，我有样东西要给你看。\n\n你见过之后，就会明白一切。', ['typing'], [
      { label: '*接这个未知号码的来电', effect: ['call:number'], go: 'c3_call_accepted' },
      { label: '*不接，挂断', go: 'c3s13', flags: { refusedCall: true } },
    ]),
    N('c3_call_accepted', 'number', '……你终于接了。', ['typing'], undefined, 'c3s13'),
    N('c3_call_declined', 'number', '你不接电话。\n\n你以为躲开声音，就能躲开真相吗。', ['typing'], undefined, 'c3s13'),
    N('c3s13', 'number', '明天晚上，还是这个时间。\n\n我会给你看那晚的照片。\n\n睡吧。你需要的。', ['typing'], undefined, 'c3s14'),
    N('c3s14', 'narration', '你把手机放下，又拿起来。\n\n屏幕的光，照着你一个人。\n\n你忽然发现，你不记得自己是什么时候睡着的。', ['time:180'], [{ label: '*天亮之前，必须弄明白', go: 'c4s1' }]),
  ],
};
