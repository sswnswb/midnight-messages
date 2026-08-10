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
}

export interface NoteData {
  id: string;
  title: string;
  date: string;
  body: string;
  glitched?: boolean;
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
    title: '走廊',
    date: '现在',
    caption: '？？？？？',
    real: 'assets/photos/p_hallway.jpg',
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
];

export const NOTES: NoteData[] = [
  {
    id: 'n_onboarding',
    title: '待办',
    date: '2026-08-10',
    body: '· 给妈妈回电话\n· 交水电费\n· 买洗衣液\n· 明天上午开会\n· 别想太多',
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
];

export function photoById(id: string): PhotoData | undefined {
  return PHOTOS.find((p) => p.id === id);
}

export function noteById(id: string): NoteData | undefined {
  return NOTES.find((n) => n.id === id);
}
