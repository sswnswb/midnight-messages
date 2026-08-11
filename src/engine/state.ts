// 游戏状态：单局运行状态（可存档）+ 跨局元状态（结局画廊/二周目）

export interface RunState {
  flags: Record<string, boolean | number>;
  currentNode: string;
  chapter: number;
  /** 已读消息计数（号码能看到你是否读了） */
  readCount: number;
  /** 距午夜过去的分钟数（状态栏时间） */
  time: number;
  /** 备忘录中已有的条目 id */
  notes: string[];
  /** 相册中已有的照片 id */
  photos: string[];
  /** 已存在的联系人 id */
  contacts: string[];
  /** 通话记录条目 id */
  calls: string[];
  /** 是否已解锁草稿箱 */
  draftsUnlocked: boolean;
  /** 看过几遍空房间照片（重复中的变化） */
  roomViewed: number;
}

export interface MetaState {
  endings: string[];
  newGamePlus: boolean;
}

const SAVE_KEY = 'wywlx_save_v1';
const META_KEY = 'wywlx_meta_v1';

export function freshRun(): RunState {
  return {
    flags: {},
    currentNode: 'p1s1',
    chapter: 0,
    readCount: 0,
    time: 23 * 60 + 50, // 序章从 23:50 开始
    notes: ['n_onboarding', 'n_lin_remind', 'n_lin_draft', 'n_zhou', 'n_secret'],
    photos: ['p_home', 'p_lin_cake', 'p_lin_window', 'p_nightout', 'p_room', 'p_hallway_orig'],
    contacts: ['c_unknown', 'c_lin', 'c_zhou', 'c_mom', 'c_doctor'],
    calls: ['c_lin_last'],
    draftsUnlocked: false,
    roomViewed: 0,
  };
}

let run: RunState = freshRun();
let meta: MetaState = loadMeta();

export function getRun(): RunState {
  return run;
}

export function getMeta(): MetaState {
  return meta;
}

export function setFlag(key: string, value: string | number | boolean): void {
  if (typeof value === 'boolean') run.flags[key] = value;
  else run.flags[key] = value as number;
}

export function addCount(key: string, delta = 1): void {
  run.flags[key] = (Number(run.flags[key]) || 0) + delta;
}

export function getFlag(key: string): string | number | boolean | undefined {
  return run.flags[key];
}

export function addNote(id: string): void {
  if (!run.notes.includes(id)) run.notes.push(id);
}

export function addPhoto(id: string): void {
  if (!run.photos.includes(id)) run.photos.push(id);
}

export function addContact(id: string): void {
  if (!run.contacts.includes(id)) run.contacts.push(id);
}

export function addCall(id: string): void {
  if (!run.calls.includes(id)) run.calls.push(id);
}

export function setChapter(n: number): void {
  run.chapter = n;
}

export function setCurrentNode(id: string): void {
  run.currentNode = id;
}

export function advanceTime(min: number): void {
  run.time = Math.max(0, run.time + min);
}

export function bumpRead(): void {
  run.readCount += 1;
}

export function saveRun(): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(run));
  } catch {
    /* 隐私模式等情况下静默失败 */
  }
}

export function hasSave(): boolean {
  try {
    return !!localStorage.getItem(SAVE_KEY);
  } catch {
    return false;
  }
}

export function loadRun(): boolean {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    run = JSON.parse(raw) as RunState;
    return true;
  } catch {
    return false;
  }
}

export function clearRun(): void {
  run = freshRun();
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}

function loadMeta(): MetaState {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<MetaState>;
      return {
        endings: parsed.endings ?? [],
        newGamePlus: parsed.newGamePlus ?? false,
      };
    }
  } catch {
    /* ignore */
  }
  return { endings: [], newGamePlus: false };
}

export function recordEnding(id: string): void {
  if (!meta.endings.includes(id)) meta.endings.push(id);
  meta.newGamePlus = true;
  try {
    localStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch {
    /* ignore */
  }
}

export function hasEnding(id: string): boolean {
  return meta.endings.includes(id);
}

/** 人格维度（由剧情中的 trait 计数累积） */
export interface Personality {
  truth: number; // 直面真相
  help: number; // 求助他人
  avoid: number; // 逃避/拉黑
  care: number; // 在意林晚、愿意倾听
  silent: number; // 已读不回、彻底沉默
}

export function personality(): Personality {
  const n = (k: string) => Number(run.flags[k]) || 0;
  return {
    truth: n('trait_truth'),
    help: n('trait_help'),
    avoid: n('trait_avoid'),
    care: n('trait_care'),
    silent: n('trait_silent'),
  };
}

/** 是否已解锁全部基础结局（二周目隐藏结局的门槛） */
export function hasAllBaseEndings(): boolean {
  return ['confess', 'therapy', 'loop', 'merge', 'silence'].every((id) => meta.endings.includes(id));
}

/** 条件表达式求值 */
export function evalCond(expr: string | undefined): boolean {
  if (!expr) return true;
  const m = expr.match(/^!?flag:([A-Za-z0-9_.]+)$/);
  if (m) {
    const val = run.flags[m[1]];
    const truthy = !!val;
    return expr.startsWith('!') ? !truthy : truthy;
  }
  const c = expr.match(/^count:([A-Za-z0-9_.]+)\s*(>=|<=|==|>|<)\s*(-?\d+)$/);
  if (c) {
    const val = Number(run.flags[c[1]]) || 0;
    const target = Number(c[3]);
    switch (c[2]) {
      case '>=':
        return val >= target;
      case '<=':
        return val <= target;
      case '==':
        return val === target;
      case '>':
        return val > target;
      case '<':
        return val < target;
    }
  }
  if (expr === 'drafts:unlocked') return run.draftsUnlocked;
  if (expr === 'chapter:>1') return run.chapter > 1;
  if (expr === 'chapter:>2') return run.chapter > 2;
  if (expr === 'chapter:>3') return run.chapter > 3;
  if (expr === 'chapter:>=3') return run.chapter >= 3;
  if (expr === 'chapter:>=4') return run.chapter >= 4;
  if (expr === 'chapter:>=5') return run.chapter >= 5;
  return false;
}

export function interpolate(text: string): string {
  return text.replace(/\{([A-Za-z0-9_]+)\}/g, (_, key: string) => {
    const v = run.flags[key];
    if (v === undefined) return '';
    return String(v);
  });
}
