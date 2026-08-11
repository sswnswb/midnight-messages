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
}

export interface NoteData {
  id: string;
  title: string;
  date: string;
  body: string;
  glitched?: boolean;
  /** 长按触发的隐藏文字（彩蛋） */
  secret?: string;
}

export interface CallData {
  id: string;
  who: string;
  when: string;
  dir: 'in' | 'out' | 'missed';
  dur: string;
}

export const PHOTOS: PhotoData[] = [
  { id: 'p_home', title: '壁纸', date: '2026-08-01', caption: '随手拍的夜晚', real: 'assets/photos/p_home.jpg' },
  {
    id: 'p_lin_cake',
    title: '她的生日',
    date: '2025-04-18',
    caption: '四月。那天她吹蜡烛前说，下辈子还要一起过生日。',
    real: 'assets/photos/p_lin_cake.jpg',
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
  },
  {
    id: 'p_hallway',
    title: '它发来的照片',
    date: '现在',
    caption: '……门缝里，好像有人。',
    real: 'assets/photos/p_hallway.jpg',
    pair: 'p_hallway_orig',
    diffZone: [0.44, 0.28, 0.6, 0.42],
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
  },
  {
    id: 'p_333',
    title: '？',
    date: '？？？？',
    caption: '这张照片，你从来没有拍过。',
    real: 'assets/photos/p_333.jpg',
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
  },
  {
    id: 'n_right',
    title: '？',
    date: '????',
    body: '别信自己。\n\n你忘了很多事。\n记得开车那晚吗。\n你手机里，真的有那么多未读吗。',
    glitched: true,
  },
];

export const CALLS: CallData[] = [
  { id: 'c_zhou_1', who: '周凯', when: '2026-08-10 21:03', dir: 'in', dur: '12:47' },
  { id: 'c_mom_1', who: '妈妈', when: '2026-08-09 19:52', dir: 'missed', dur: '—' },
  { id: 'c_self', who: '未知号码', when: '2026-08-11 00:04', dir: 'out', dur: '00:03' },
  { id: 'c_lin_1', who: '林晚', when: '2025-11-06 23:38', dir: 'in', dur: '00:31' },
  { id: 'c_lin_last', who: '林晚', when: '2025-11-06 23:41', dir: 'missed', dur: '—' },
];

export function photoById(id: string): PhotoData | undefined {
  return PHOTOS.find((p) => p.id === id);
}

export function noteById(id: string): NoteData | undefined {
  return NOTES.find((n) => n.id === id);
}
