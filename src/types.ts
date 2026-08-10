// 全局共享类型定义

export type Speaker =
  | 'narration' // 旁白（居中卡片）
  | 'number' // 陌生号码（等宽字体，机器感）
  | 'wang' // 王斌自己
  | 'zhou' // 周凯（同事）
  | 'doctor' // 陈医生
  | 'mom' // 妈妈
  | 'lin' // 林晚（回忆/相册）
  | 'system'; // 系统提示（时间/操作）

export interface Choice {
  label: string;
  /** 条件表达式，如 'flag:metZhou' | '!flag:metZhou' | 'count:read>=3' */
  cond?: string;
  go: string;
  /** 选择时写入的 flags */
  flags?: Record<string, string | number | boolean>;
  /** 选择时附带的效果指令 */
  effect?: string[];
}

export interface StoryNode {
  id: string;
  speaker?: Speaker;
  text: string;
  /** 进入节点时执行的效果指令 */
  effects?: string[];
  choices?: Choice[];
  /** 自动推进到下一个节点（无选项的纯叙事连续段） */
  next?: string;
  /** 终局节点：指向结局 id */
  end?: string;
  /** 章节标题卡节点（进入时显示章节卡） */
  chapterCard?: { no: number; title: string };
}

export interface Chapter {
  id: number;
  title: string;
  nodes: StoryNode[];
}

export interface EndData {
  id: string;
  title: string;
  kind: 'true' | 'good' | 'bad' | 'hidden' | 'silence';
  text: string;
  /** 是否允许进入二周目 */
  unlocksNext: boolean;
}
