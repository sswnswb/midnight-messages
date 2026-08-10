// 第一章 《第一夜》——日常建立，第一封短信

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
    N('c1s1', 'narration', '十一点五十分。\n\n你回到出租屋，钥匙在锁孔里转了两圈。灯没开，你摸黑换了鞋，把外套搭在椅背上。\n\n这套一居室不大。桌上有吃了一半的外卖，垃圾桶里有三个空咖啡罐。\n\n你把自己摔进床里，手机放在枕边。屏幕亮了一下：\n\n23:57。', ['chapter:1', 'ambient:on'], undefined, 'c1s2'),
    N('c1s2', 'narration', '你盯着天花板，数着楼上拖鞋走动的次数。\n\n0:00。\n\n手机震了一下。', ['time:0', 'sfx:msg_num'], undefined, 'c1s3'),
    N('c1s3', 'number', '还没睡？', ['typing'], undefined, 'c1s4'),
    N('c1s4', 'number', '这么晚不睡，是在等什么消息吗。', ['typing'], [
      { label: '你是谁？', go: 'c1s5' },
      { label: '你打错了吧。', go: 'c1s5b', flags: { saidWrong: true } },
      { label: '*不回，翻个身装睡', go: 'c1s6', flags: { ignoredFirst: true } },
    ]),
    N('c1s5', 'number', '我是谁不重要。\n\n我知道你叫王斌。今天下午三点，你在十七楼会议室，方案又没过。领导把文件摔在桌上时，你的手抖了一下。', ['typing'], undefined, 'c1s7'),
    N('c1s5b', 'number', '没打错。\n\n你叫王斌，对吧？今天加班到十点，路过便利店买了瓶咖啡，没喝，扔了。你说它"又苦又凉"。', ['typing'], undefined, 'c1s7'),
    N('c1s6', 'number', '我知道你醒了。', ['typing', 'sting'], undefined, 'c1s7'),
    N('c1s7', 'number', '我说几件事。\n\n你公司楼下那家面馆，上周倒闭了。你兜里那张电影票根，是去年十一月六号的。\n\n还有——你房间里，是不是有一台很久没开机的电脑？', ['typing'], [
      { label: '你到底是谁？你在监控我？', go: 'c1s8', flags: { accuse: true } },
      { label: '*不说话，盯着屏幕', go: 'c1s8b' },
    ]),
    N('c1s8', 'number', '不是监控。\n\n我在你身边。很近。', ['typing', 'sting'], undefined, 'c1s9'),
    N('c1s8b', 'number', '你不说话也没用。我知道你在看。', ['typing', 'sting'], undefined, 'c1s9'),
    N('c1s9', 'number', '比如——你现在住的这个房间。一年前，还住着另一个人。\n\n你把她弄丢了。', ['typing', 'stinglong'], [
      { label: '你闭嘴！别提她！', go: 'c1s10', flags: { anger: true } },
      { label: '*握着手机，发抖', go: 'c1s10', flags: { shaken: true } },
      { label: '……你怎么知道林晚？', go: 'c1s10', flags: { askLin: true } },
    ]),
    N('c1s10', 'narration', '屏幕暗下去又亮起来。\n\n过了一分钟，像是斟酌了很久，它发来一张照片。', ['sfx:msg_num', 'sting'], undefined, 'c1s11'),
    N('c1s11', 'number', '这张照片，是刚才拍的。你信吗？', ['typing', 'photo:p_hallway', 'photo:open:p_hallway', 'stinglong'], undefined, 'c1s12'),
    N('c1s12', 'number', '从你房间的门缝里，能看到你客厅的灯还亮着。\n\n你回头看了一眼。\n\n灯，确实亮着。', ['typing', 'sting'], undefined, 'c1s13'),
    N('c1s13', 'number', '晚安。明天我还会来。\n\n除非——你想起来。', ['typing'], undefined, 'c1s14'),
    N('c1s14', 'system', '对方已离线。', [], undefined, 'c1s15'),
    N('c1s15', 'narration', '你一夜没睡。\n\n窗外的天，一点点变亮。像一张底片，慢慢显影出楼的轮廓。\n\n你看着那条短信，看了很久。', ['time:270'], [
      { label: '睡一会儿吧，明天还要上班。', go: 'c2s1', flags: { keptWorking: true } },
      { label: '*想把这件事告诉周凯', go: 'c2s1', flags: { wantTell: true } },
      { label: '*把这个号码删掉', go: 'c2s1', flags: { deleted: true } },
    ]),
  ],
};
