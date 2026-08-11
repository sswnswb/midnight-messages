// 世界观内容数据：相册照片 / 备忘录条目 / 通话记录
// 这些是玩家能主动翻找的"线索库"，剧情节点通过效果指令增删。

export interface PhotoData {
  id: string;
  title: string;
  date: string;
  caption: string;
  /** AI 生成图的路径（存在则用，不存在用程序化兜底） */
  real?: string;
  /** 查看时是否变化 */
  shifting?: boolean;
  /** 找不同谜题：该照片的"原版对照"id（用于照片找不同） */
  pair?: string;
  /** 找不同谜题：差异区域的归一化坐标 [x0,y0,x1,y1]（0-1） */
  diffZone?: [number, number, number, number];
  /** 多差异找茬：多差异区域 {id, rect}[] */
  diffZones?: { id: string; rect: [number, number, number, number] }[];
  /** 收证到证据册的证据 id */
  evidence?: string;
}

export interface NoteData {
  id: string;
  title: string;
  date: string;
  body: string;
  glitched?: boolean;
  /** 长按触发的隐藏文字（彩蛋） */
  secret?: string;
  /** 收证到证据册的证据 id */
  evidence?: string;
}

export interface CallData {
  id: string;
  who: string;
  when: string;
  dir: 'in' | 'out' | 'missed';
  dur: string;
  /** 收证到证据册的证据 id */
  evidence?: string;
}

export const PHOTOS: PhotoData[] = [
  { id: 'p_home', title: '壁纸', date: '2026-08-01', caption: '随手拍的夜晚', real: 'assets/photos/p_home.jpg' },
  {
    id: 'p_lin_cake',
    title: '她的生日',
    date: '2025-04-18',
    caption: '四月。那天她吹蜡烛前说，下辈子还要一起过生日。',
    real: 'assets/photos/p_lin_cake.jpg',
    evidence: 'e_birthday',
  },
  {
    id: 'p_lin_window',
    title: '窗边',
    date: '2025-06-02',
    caption: '她说看云能减压，我不信，跟着她看了一下午。',
    real: 'assets/photos/p_lin_window.jpg',
  },
  {
    id: 'p_nightout',
    title: '那晚',
    date: '2025-11-06',
    caption: '聚餐。她说雨大，让我别开车……',
    real: 'assets/photos/p_nightout.jpg',
    evidence: 'e_nightout',
  },
  {
    id: 'p_hallway',
    title: '它发来的照片',
    date: '现在',
    caption: '……门缝里，好像有人。',
    real: 'assets/photos/p_hallway.jpg',
    pair: 'p_hallway_orig',
    diffZones: [
      { id: 'figure', rect: [0.4, 0.24, 0.6, 0.46] },
      { id: 'cup', rect: [0.07, 0.54, 0.24, 0.78] },
      { id: 'curtain', rect: [0.6, 0.16, 0.9, 0.52] },
    ],
  },
  {
    id: 'p_hallway_orig',
    title: '走廊',
    date: '去年 11 月 5 日',
    caption: '这张才是你自己拍的。那天走廊很干净。',
    real: 'assets/photos/p_hallway_orig.jpg',
  },
  {
    id: 'p_crash',
    title: '现场',
    date: '2025-11-06 23:41',
    caption: '新闻截图。雨夜，一辆车冲下护栏。',
    real: 'assets/photos/p_crash.jpg',
  },
  {
    id: 'p_room',
    title: '空房间',
    date: '2025-11-07',
    caption: '收拾东西那天拍的。她不在，房间就空了。',
    real: 'assets/photos/p_room.jpg',
    shifting: true,
    evidence: 'e_room',
  },
  {
    id: 'p_333',
    title: '？',
    date: '？？？？',
    caption: '这张照片，你从来没有拍过。',
    real: 'assets/photos/p_333.jpg',
    evidence: 'e_333',
  },
];

export const NOTES: NoteData[] = [
  {
    id: 'n_onboarding',
    title: '待办',
    date: '2026-08-10',
    body: '· 给妈妈回电话\n· 交水电费\n· 买洗衣液\n· 明天上午开会\n· 别想太多',
  },
  {
    id: 'n_lin_remind',
    title: '备忘',
    date: '2025-11-06',
    body: '· 晚上给她回电话\n· 她说要给我看个东西\n· 别忘了，她容易生气\n· 九点前到家',
  },
  {
    id: 'n_lin_draft',
    title: '未发送的草稿',
    date: '2025-11-07 00:12',
    body: '我错了。\n\n对不起。\n\n如果那天我没碰手机……',
    evidence: 'e_lin_draft',
  },
  {
    id: 'n_dinner',
    title: '—',
    date: '2025-06-02',
    body: '她说想吃那家川菜。6 月 7 号去。',
  },
  {
    id: 'n_secret',
    title: '—',
    date: '2025-04-18',
    body: '4.18\n\n是我们的日子。\n她让我别忘。\n我不会忘。',
    secret: '……她说：如果你有一天不在了，也要替她，好好活下去。',
  },
  {
    id: 'n_zhou',
    title: '—',
    date: '2026-08-10',
    body: '周凯：周六出来喝酒，哥几个都到。别一个人闷着。',
  },
  {
    id: 'n_wrong',
    title: '？？',
    date: '????',
    body: '别信手机。\n\n它不是你。\n它在骗你。\n别信手机。别信手机。别信手机。',
    glitched: true,
    evidence: 'e_note_wrong',
  },
  {
    id: 'n_right',
    title: '？',
    date: '????',
    body: '别信自己。\n\n你忘了很多事。\n记得开车那晚吗。\n你手机里，真的有那么多未读吗。',
    glitched: true,
    evidence: 'e_note_wrong',
  },
];

export const CALLS: CallData[] = [
  { id: 'c_zhou_1', who: '周凯', when: '2026-08-10 21:03', dir: 'in', dur: '12:47' },
  { id: 'c_mom_1', who: '妈妈', when: '2026-08-09 19:52', dir: 'missed', dur: '—' },
  { id: 'c_self', who: '未知号码', when: '2026-08-11 00:04', dir: 'out', dur: '00:03', evidence: 'e_call_self' },
  { id: 'c_lin_1', who: '林晚', when: '2025-11-06 23:38', dir: 'in', dur: '00:31' },
  { id: 'c_lin_last', who: '林晚', when: '2025-11-06 23:41', dir: 'missed', dur: '—', evidence: 'e_lin_last' },
];

/** 证据册元数据：id → 标题 + 推理注记 */
export interface EvidenceData {
  id: string;
  title: string;
  note: string;
  icon: string;
}

export const EVIDENCE: Record<string, EvidenceData> = {
  e_birthday: { id: 'e_birthday', title: '她的生日蛋糕照', note: '2025-04-18。你留着它，是不敢忘。', icon: '🎂' },
  e_hallway: { id: 'e_hallway', title: '走廊照片（它发来的）', note: '门缝里多了一个人。你相册里没有这个人。', icon: '🖼️' },
  e_333: { id: 'e_333', title: '3:33 的照片', note: '这张照片不是你拍的。它出现在你相册里，像一直就在。', icon: '🌑' },
  e_room: { id: 'e_room', title: '空房间', note: '你数了三遍，房间里没有人。可你知道你看见了什么。', icon: '🚪' },
  e_call_self: { id: 'e_call_self', title: '打给自己的电话', note: '通话记录里，凌晨 00:04，有一个打出去的号码——是你的号码。', icon: '📞' },
  e_note_wrong: { id: 'e_note_wrong', title: '矛盾的备忘录', note: '一条说"别信手机"，一条说"别信自己"。你的手机里不该有这些字。', icon: '📝' },
  e_draft: { id: 'e_draft', title: '草稿箱的定时短信', note: '每天 00:00 定时发送，发给你自己。你一年前设下的。', icon: '⏰' },
  e_lin_last: { id: 'e_lin_last', title: '她最后一通电话', note: '2025-11-06 23:41，她打来，你未接。之后是那场雨。', icon: '📴' },
  e_nightout: { id: 'e_nightout', title: '那晚的聚餐照', note: '2025-11-06。她说雨大，让你别开车。', icon: '🌧️' },
  e_lin_draft: { id: 'e_lin_draft', title: '未发送的草稿', note: '"我错了。如果那天我没碰手机……" 你永远没有发出去。', icon: '✉️' },
};

export function evidenceMeta(id: string): EvidenceData | undefined {
  return EVIDENCE[id];
}

/** 第四章时间线拼图：那晚的证据卡（fake=true 是号码伪造的干扰项） */
export interface TimelineCard {
  id: string;
  label: string;
  sub: string;
  when: string;
  fake?: boolean;
  /** 真实时间顺序 1-6；干扰项无 order */
  order?: number;
}

export const TIMELINE_CARDS: TimelineCard[] = [
  { id: 't_party', label: '那晚的聚餐', sub: '她劝你：雨大，别开车。你没当回事。', when: '19:20', order: 1 },
  { id: 't_note', label: '你的备忘', sub: '「晚上给她回电话 · 九点前到家」', when: '17:10', order: 2 },
  { id: 't_call1', label: '她来电 · 31 秒', sub: '你在开车，接了。她说：雨好大，你慢点。', when: '23:38', order: 3 },
  { id: 't_call2', label: '她再来电 · 未接', sub: '第二通。你没接——你在回那条短信。', when: '23:41', order: 4 },
  { id: 't_msg', label: '她问你', sub: '「到家了吗？」亮在屏幕上。', when: '23:47', order: 5 },
  { id: 't_reply', label: '你回了', sub: '「马上到家，你等我」——一边开车，一边打字。', when: '23:52', order: 6 },
  { id: 't_fake1', label: '「未知号码」的短信', sub: '那晚，还没有这个号码。', when: '23:41', fake: true },
  { id: 't_fake2', label: '第二天早上的闹钟', sub: '和那晚无关。', when: '07:00', fake: true },
];

/** 真实顺序：order 升序的真实卡片 id */
export function timelineOrder(): string[] {
  return TIMELINE_CARDS.filter((c) => !c.fake)
    .sort((a, b) => (a.order! - b.order!))
    .map((c) => c.id);
}

export function photoById(id: string): PhotoData | undefined {
  return PHOTOS.find((p) => p.id === id);
}

export function noteById(id: string): NoteData | undefined {
  return NOTES.find((n) => n.id === id);
}
