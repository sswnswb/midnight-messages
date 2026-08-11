// 第四章 《真相》——核心反转：号码来自你自己；草稿箱取证

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

export const ch4: Chapter = {
  id: 4,
  title: '真相',
  nodes: [
    N('c4s1', 'narration', '白天，你翻了一整天的相册。\n\n手机里的未读，从 99 变成 0。可你越看，越觉得哪里不对。\n\n夜晚来得很慢。', ['chapter:4', 'card:4', 'photo:p_crash'], undefined, 'c4s2'),
    N('c4s2', 'number', '今晚，我不绕弯子了。', ['typing', 'time:0'], undefined, 'c4s3'),
    N('c4s3', 'number', '你说 11 月 6 号那晚，你在开车，没回短信。\n\n那我问你——', ['typing'], undefined, 'c4s4'),
    N('c4s4', 'number', '那条短信，是谁发给你的？', ['typing', 'sting'], undefined, 'c4s4w'),
    N('c4s4w', 'narration', '你握着手机，指尖发凉。', [], [
      { label: '是……林晚发的。她问我到家没有。', go: 'c4s5', flags: { truthReply: true }, effect: ['count:trait_truth'] },
      { label: '我不记得有短信。', go: 'c4s5', flags: { denyAgain: true }, effect: ['count:trait_avoid'] },
    ]),
    N('c4s5', 'number', '她问你到家没有。\n\n然后呢？你回了。\n\n"马上到，等我。"', ['typing', 'sting'], undefined, 'c4s6'),
    N('c4s6', 'number', '你一边开车，一边回她的短信。\n\n雨很大。你看见前面的刹车灯时，已经来不及了。', ['typing', 'stinglong', 'heart:on'], undefined, 'c4s7'),
    N('c4s7', 'number', '你一直以为，是那场雨。\n\n其实不是。\n\n是你自己的手。', ['typing'], undefined, 'c4s8'),
    N('c4s8', 'number', '你想起来了吗？', ['typing'], [
      { label: '*一直摇头，不愿接受', go: 'c4s8a' },
      { label: '*眼泪掉在屏幕上', go: 'c4s8b', flags: { tears: true }, effect: ['count:trait_care', 'count:trait_truth'] },
    ]),
    N('c4s8a', 'number', '你把车开出护栏的时候，手机屏幕上还亮着两个字——\n\n"等我"。\n\n那是你发的。', ['typing', 'stinglong'], undefined, 'c4s9'),
    N('c4s8b', 'number', '你把车开出护栏的时候，手机屏幕上还亮着两个字——\n\n"等我"。\n\n那是你发的。', ['typing', 'stinglong'], undefined, 'c4s9'),
    N('c4s9', 'number', '你不是受害者。\n\n你是那个，在雨里拿起手机的人。', ['typing'], undefined, 'c4s10'),
    N('c4s10', 'number', '她那天下午问你：几点到家。你说：九点。\n\n那天晚上，你迟了三个小时。\n\n她等你的那三个小时里，打了四通电话。你都没接。', ['typing', 'sting'], undefined, 'c4s11'),
    N('c4s11', 'number', '现在，你知道我是谁了。\n\n我是那个替你记着这一切的人。\n\n我是你。王斌。\n\n是你忘掉的那个自己。', ['typing', 'stinglong'], undefined, 'c4s12'),
    N('c4s12', 'number', '这一年来，每天 00:00 的短信，不是别人。\n\n是你自己，在提醒你自己。', ['typing', 'heart:off'], [
      { label: '……你真是我自己？', go: 'c4s13', flags: { believe: true }, effect: ['count:trait_truth'] },
      { label: '*不信。拉黑这个号码', effect: ['count:trait_avoid'], go: 'c4s14', flags: { blockAgain: true } },
    ]),
    N('c4s13', 'number', '你不信？\n\n那你去打开草稿箱。密码是你永远忘不掉的那一天。\n\n「我们」之后的那一天。', ['typing', 'drafts'], undefined, 'c4s13d'),
    // 草稿箱决策点：去解锁，或已解锁继续
    N('c4s13d', 'narration', '草稿箱需要 4 位数字密码。', [], [
      { label: '*去解锁草稿箱', effect: ['screen:drafts'], go: 'c4s13d' },
      { label: '我打开了，都看完了。', cond: 'flag:draftsUnlocked', go: 'c4s15', flags: { sawDrafts: true }, effect: ['count:trait_truth'] },
      { label: '*先记下这个谜题，想想再回来', go: 'c4s13d' },
    ]),
    N('c4s14', 'number', '你拉黑了我。\n\n手机安静了三秒。\n\n然后，一条新短信，来自一个新的未知号码：\n\n"别这样。你逃不掉的。"', ['typing', 'sting'], [
      { label: '*我该拿你怎么办', go: 'c4s14b' },
    ]),
    N('c4s14b', 'number', '去打开草稿箱。密码是 11 月 6 日。\n\n那是你唯一逃不掉的日子。', ['typing'], [
      { label: '*回到草稿箱，解锁它', effect: ['screen:drafts'], go: 'c4s13d' },
    ]),
    N('c4s15', 'number', '看完了？\n\n那些定时短信——是你，一年前自己设下的。\n\n每天 00:00，发给一个永远不会再回你的人。', ['typing', 'sting'], undefined, 'c4s16'),
    N('c4s16', 'number', '你设下它们，是因为你怕自己忘了。\n\n怕有一天，你真的会以为，那只是一场雨。', ['typing'], undefined, 'c4s17'),
    N('c4s17', 'number', '你一直骗自己：我是受害者，是那场雨。\n\n可你骗不了那个替你记得的你自己。', ['typing', 'sting'], undefined, 'c4s18'),
    N('c4s18', 'number', '今晚就到这。\n\n明天，是最后一夜。\n\n到时候，你要做一个选择。\n\n一个只有你能替自己做的选择。', ['typing'], undefined, 'c4s19'),
    N('c4s19', 'narration', '你把手机放在胸口，睡了过去。\n\n这一次，你没有梦到她。\n\n你梦到了一条短信，一个从未发出的字：\n\n「悔。」', ['time:240'], [
      { label: '*哭出声来', effect: ['count:trait_care'], go: 'c5s1' },
      { label: '*沉默了整整一夜', effect: ['count:trait_truth'], go: 'c5s1' },
      { label: '*告诉自己，那只是一场梦', effect: ['count:trait_avoid'], go: 'c5s1' },
    ]),
  ],
};
