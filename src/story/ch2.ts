// 第二章 《第二夜》——谜题②：跨来源日期推导（不送答案）；求助支线真分叉

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
    N('c2s1', 'narration', '白天浑浑噩噩。周凯在微信上喊你吃午饭，你没回。\n\n下班时，你在公司楼下站了很久，看着对面那家面馆——以前你们总去那吃。\n\n晚上十一点五十，你躺下，手机放在枕边。\n\n你知道它要来。', ['chapter:2', 'card:2', 'note:n_secret', 'time:0'], undefined, 'c2s2'),
    N('c2s2', 'number', '我来了。', ['typing', 'sfx:msg_num'], undefined, 'c2s3'),
    N('c2s3', 'number', '今天你开会走了三次神。第三次，你在备忘录里写了一个字，又删了。', ['typing'], [
      { label: '你连我的备忘录都看得见？', go: 'c2s4', flags: { revealNote: true } },
      { label: '*没回，却打开了自己的备忘录', go: 'c2s4b' },
    ]),
    N('c2s4', 'number', '看不见。\n\n但我读得懂你。你写的那个字，是"晚"。对吧。', ['typing'], undefined, 'c2s5'),
    N('c2s4b', 'number', '你自己都忘了自己写过什么，对吧。\n\n那我来告诉你——是"晚"。', ['typing'], undefined, 'c2s5'),
    N('c2s5', 'number', '我们来玩个游戏。\n\n你猜对一个，我就告诉你我是谁。\n\n我不会骗你——因为猜答案的，本来就是你自己。', ['typing', 'sting'], undefined, 'c2s6'),
    N('c2s6', 'number', '谜题一。\n\n我们第一次见面的日子。\n\n提示：你的相册里，有一张蛋糕。它的日期，就是答案。', ['typing'], undefined, 'c2s6w'),
    // 决策点：可去翻相册（真正的查证），也可直接答
    N('c2s6w', 'narration', '你想了想。', [], [
      { label: '*先翻相册，查那张蛋糕的日期', effect: ['screen:photos'], go: 'c2s6w' },
      { label: '*回答：4 月 18 日', go: 'c2s7', flags: { solvedPuzzle1: true }, effect: ['count:trait_truth'] },
      { label: '*回答：6 月 2 日', go: 'c2s6wrong' },
      { label: '*回答：11 月 6 日', go: 'c2s6wrong' },
      { label: '*回答：3 月 9 日', go: 'c2s6wrong' },
    ]),
    N('c2s6wrong', 'number', '不对。\n\n你连这个都忘了？她得多难过。', ['typing', 'sting'], [
      { label: '*再想想', go: 'c2s6wrong2', flags: { wrongP1: true } },
    ]),
    N('c2s6wrong2', 'number', '再想想。\n\n那张蛋糕照片，就在你相册里。点开它，看日期。\n\n答案写在上面。', ['typing'], [
      { label: '*翻相册，点开蛋糕照片看日期', effect: ['screen:photos'], go: 'c2s6w' },
      { label: '*再猜一次', go: 'c2s6w' },
    ]),
    N('c2s7', 'number', '……4 月 18 日。\n\n那是你们相遇的第一天。很好，你记得。\n\n可是你记不记得——你们在一起的最后一天，是哪一天？', ['typing', 'sfx:sting'], undefined, 'c2s7w'),
    N('c2s7w', 'narration', '最后一天。', [], [
      { label: '*查那晚的照片和通话记录', effect: ['screen:photos'], go: 'c2s7w' },
      { label: '*回答：11 月 6 日', go: 'c2s8', flags: { knowsDate: true }, effect: ['count:trait_truth'] },
      { label: '*回答：10 月 31 日', go: 'c2s7wrong' },
      { label: '*回答：12 月 24 日', go: 'c2s7wrong' },
      { label: '*我不想回答。', go: 'c2s7wrong' },
    ]),
    N('c2s7wrong', 'number', '……\n\n你知道正确答案。你只是不敢说出口。\n\n那晚，就是你们在一起的最后一天。', ['typing', 'sting'], [
      { label: '*沉默', go: 'c2s7w' },
    ]),
    N('c2s8', 'number', '11 月 6 日。那天下着大雨。\n\n你开着车，手机亮着——一条短信。\n\n你回了吗？', ['typing'], undefined, 'c2s9'),
    N('c2s9', 'number', '回答我。', ['typing'], [
      { label: '我……没回。我在开车。', go: 'c2s9a', flags: { claimDriving: true } },
      { label: '我不记得了。', go: 'c2s9b', flags: { noMemory: true } },
    ]),
    N('c2s9a', 'number', '是吗。\n\n你确定吗。\n\n你确定你当时，没有碰那部手机？', ['typing', 'sting'], [
      { label: '*沉默', go: 'c2s10' },
      { label: '……我记不清了。', go: 'c2s10' },
    ]),
    N('c2s9b', 'number', '你果然不记得了。\n\n没关系。我替你记着。\n\n记到你敢想起来的那天。', ['typing', 'sting'], [
      { label: '*沉默', go: 'c2s10' },
    ]),
    N('c2s10', 'number', '今晚先到这儿。\n\n明天，我带你去见一个人。\n\n在那之前——今晚，你可以先找一个人，说说话。', ['typing'], undefined, 'c2s10w'),
    // 求助支线：真分叉，每条都有独立内容
    N('c2s10w', 'narration', '你握着手机。', [], [
      { label: '*给周凯发消息', go: 'c2_zhou_1', effect: ['count:trait_help'] },
      { label: '*给妈妈发消息', go: 'c2_mom_1', effect: ['count:trait_help'] },
      { label: '*在备忘录里，给陈医生留一句话', go: 'c2_doc_1', effect: ['count:trait_help'] },
      { label: '*谁都不找，自己扛', go: 'c2_alone_1', effect: ['count:trait_avoid'] },
    ]),
    // ---- 周凯线 ----
    N('c2_zhou_1', 'narration', '你点开周凯的头像，删删打打，最后还是发了出去。', ['sfx:send'], undefined, 'c2_zhou_2'),
    N('c2_zhou_2', 'number', '【周凯】：？？你总算回消息了！吓死我了，两天没动静。', ['typing', 'sfx:msg_con'], undefined, 'c2_zhou_3'),
    N('c2_zhou_3', 'number', '【周凯】：咋了哥？看你状态不太对。周六出来喝酒？麻哥他们火锅都订好了。', ['typing', 'sfx:msg_con'], [
      { label: '*把那个号码发给他', go: 'c2_zhou_4', flags: { toldZhou: true }, effect: ['count:trait_help'] },
      { label: '*说：我没事，就是最近睡得不好', go: 'c2_zhou_5', flags: { liedZhou: true } },
    ]),
    N('c2_zhou_4', 'number', '【周凯】：这个号？没见过。你搜一下归属地……等等，哥，这号码怎么看着像你自己？', ['typing', 'sfx:msg_con', 'sting'], undefined, 'c2_zhou_5'),
    N('c2_zhou_5', 'number', '【周凯】：行了别想那么多。周六出来，哥们陪你喝。你一个人闷着，容易瞎想。', ['typing', 'sfx:msg_con'], undefined, 'c2_zhou_6'),
    N('c2_zhou_6', 'narration', '你盯着"这号码怎么看着像你自己"那行字，看了很久。', ['sting'], [
      { label: '*把这条记下来', effect: ['evidence:e_call_self'], go: 'c2s12' },
      { label: '*他没看错的话……', go: 'c2s12' },
    ]),
    // ---- 妈妈线 ----
    N('c2_mom_1', 'narration', '你拨了妈妈的号码。响了两声，就接了。', ['sfx:ring'], undefined, 'c2_mom_2'),
    N('c2_mom_2', 'number', '【妈妈】：斌斌！这么晚了，怎么还没睡？妈就说你熬夜。', ['typing', 'sfx:msg_con'], undefined, 'c2_mom_3'),
    N('c2_mom_3', 'number', '【妈妈】：上周给你寄的排骨收到了吗？你一个人住，要好好吃饭。', ['typing', 'sfx:msg_con'], [
      { label: '*妈，我最近总收到一条奇怪的短信', go: 'c2_mom_4', flags: { toldMom: true }, effect: ['count:trait_help'] },
      { label: '*我挺好的，妈。就是……想晚晚', go: 'c2_mom_5', flags: { missLin: true }, effect: ['count:trait_care'] },
    ]),
    N('c2_mom_4', 'number', '【妈妈】：短信？是不是诈骗的？你拉黑它！现在的骗子，专门盯你这种……不对，斌斌，你声音不对。你是不是又做噩梦了？', ['typing', 'sfx:msg_con'], undefined, 'c2_mom_5'),
    N('c2_mom_5', 'number', '【妈妈】：你别吓妈。妈就你一个儿子。那个……那件事，都一年了，你得往前看。晚晚她，肯定也不想看你这样。', ['typing', 'sfx:msg_con'], undefined, 'c2_mom_6'),
    N('c2_mom_6', 'narration', '电话挂了。你握着手机，忽然很想哭。', ['sting'], [
      { label: '*把妈妈的话记下来', go: 'c2s12', flags: { momTold: true } },
      { label: '*沉默很久', go: 'c2s12' },
    ]),
    // ---- 陈医生线 ----
    N('c2_doc_1', 'narration', '你翻开备忘录，找到陈医生的号码。', ['typing'], undefined, 'c2_doc_2'),
    N('c2_doc_2', 'number', '【你】：陈医生，我是王斌。周四的复诊，我还能去吗？', ['typing', 'sfx:send'], undefined, 'c2_doc_3'),
    N('c2_doc_3', 'number', '【陈医生】：王斌。你上次来，是三周前。\n\n周四下午三点，我在。你……这一周睡得怎么样？', ['typing', 'sfx:msg_con'], [
      { label: '*不太好。总做同一个梦', go: 'c2_doc_4', flags: { docTell: true }, effect: ['count:trait_help'] },
      { label: '*还好。就是工作忙', go: 'c2_doc_4', flags: { docLie: true } },
    ]),
    N('c2_doc_4', 'number', '【陈医生】：同一个梦？\n\n说来听听。是……关于车的梦吗？', ['typing', 'sfx:msg_con', 'sting'], undefined, 'c2_doc_5'),
    N('c2_doc_5', 'narration', '关于车的梦。\n\n你从没跟任何人说过那个梦。陈医生是怎么知道的？', ['sting', 'typing'], [
      { label: '*把这件事记下来', go: 'c2s12', flags: { docKnew: true }, effect: ['evidence:e_note_wrong'] },
      { label: '*回：不是。是关于雨。', go: 'c2s12', flags: { denyRain: true } },
    ]),
    // ---- 自己扛线 ----
    N('c2_alone_1', 'narration', '你谁也没找。\n\n把手机静音，扣在桌上。屋里很安静，安静得能听见自己的心跳。', ['battery:-8'], undefined, 'c2_alone_2'),
    N('c2_alone_2', 'number', '……\n\n你把自己关起来了，对吧。\n\n没关系。门锁了，我还在屋里。', ['typing', 'sting'], undefined, 'c2_alone_3'),
    N('c2_alone_3', 'narration', '你猛地抬头。\n\n屋里，只有你一个人。', ['stinglong', 'presence'], [
      { label: '*把灯全打开', go: 'c2s12', flags: { aloneScared: true }, effect: ['count:trait_avoid'] },
    ]),
    N('c2s12', 'number', '晚安。明天见。\n\n等你真正想起来的时候，你会感谢今晚的你。', ['typing'], undefined, 'c3s1'),
  ],
};
