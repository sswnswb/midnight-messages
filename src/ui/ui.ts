// UI 协调器：聊天控制器、来电、照片查看器、章节卡、结束流程
// 引擎与界面的唯一装配点——把叙事节点渲染成手机里的消息流。

import type { Choice, Speaker, StoryNode } from '../types';
import { getNode } from '../engine/narrative';
import { runEffects, type EffectContext } from '../engine/effects';
import {
  getRun,
  setCurrentNode,
  setFlag,
  addCount,
  bumpRead,
  saveRun,
  recordEnding,
  evalCond,
  interpolate,
  clearRun,
  advanceTime,
  setChapter,
  addPhoto,
  addNote,
  addContact,
  addCall,
  personality,
  getMeta,
  hasAllBaseEndings,
  addEvidence,
  hasEvidence,
  addBattery,
  setClock,
  getHintsUsed,
  setTimelineCorrect,
} from '../engine/state';
import { resolveEnding } from '../story/endings';
import * as audio from '../engine/audio';
import { fx } from './fx';
import { router, ui as phoneUi } from './phone';
import { hintBox } from './hints';
import { Typewriter } from '../engine/typewriter';
import { photoElement } from './art';
import { photoById, noteById, TIMELINE_CARDS, timelineOrder } from '../story/content';
import { getEnding } from '../story/endings';

// ---------- 章节标题 ----------
export const CHAPTERS: Record<number, { no: string; title: string }> = {
  1: { no: '壹', title: '第一夜' },
  2: { no: '贰', title: '第二夜' },
  3: { no: '叁', title: '第三夜' },
  4: { no: '肆', title: '真相' },
  5: { no: '伍', title: '最后一夜' },
};

// ---------- 聊天 DOM 引用 ----------
let scrollEl: HTMLElement | null = null;
let msgListEl: HTMLElement | null = null;
let typingEl: HTMLElement | null = null;
let choicesEl: HTMLElement | null = null;
let history: { nodeId: string; asBubble: boolean; label?: string }[] = [];
let mounted = false;
let busy = false;

export function resetChat(): void {
  history = [];
}

export function chatMount(container: HTMLElement): void {
  container.innerHTML = '';
  scrollEl = document.createElement('div');
  scrollEl.className = 'scroll-area';

  const chatHeader = document.createElement('div');
  chatHeader.className = 'chat-top';
  chatHeader.innerHTML = `<span class="chat-top-label">以下与「未知号码」的对话 · 仅你可见</span>`;
  scrollEl.appendChild(chatHeader);

  msgListEl = document.createElement('div');
  msgListEl.className = 'msg-list';
  scrollEl.appendChild(msgListEl);

  typingEl = document.createElement('div');
  typingEl.className = 'typing-indicator';
  typingEl.innerHTML = `<span></span><span></span><span></span><span class="typing-txt">对方正在输入…</span>`;
  typingEl.style.display = 'none';
  scrollEl.appendChild(typingEl);

  container.appendChild(scrollEl);

  choicesEl = document.createElement('div');
  choicesEl.className = 'choices-area';
  container.appendChild(choicesEl);

  mounted = true;
}

export function rehydrate(): void {
  if (!msgListEl) return;
  // 剧情正在推进时不要重建消息列表：会把正在打字的元素从 DOM 上"剥"下来，
  // 打字机失去可见目标，onDone 被延迟到幽灵元素打完才触发（每处长旁白卡 ~7-10s）。
  if (busy) return;
  msgListEl.innerHTML = '';
  for (const item of history) {
    const node = getNode(item.nodeId);
    if (!node) continue;
    if (item.asBubble) {
      appendBubbleStatic(item.nodeId, node.speaker ?? 'narration', item.label ?? node.text);
    }
  }
  scrollBottom();
  // 若当前节点还有未决选项，重渲染（flags 可能已变化）
  const cur = getNode(getRun().currentNode);
  if (cur?.choices?.length && !busy) {
    renderChoices(cur.choices);
  }
}

function scrollBottom(): void {
  if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
}

// ---------- 主流程 ----------

export async function playNode(id: string): Promise<void> {
  if (busy) return;
  const node = getNode(id);
  if (!node) {
    console.error(`[ui] 节点不存在: ${id}`);
    return;
  }
  busy = true;
  clearChoices();

  setCurrentNode(id);
  saveRun();

  if (node.chapterCard) {
    await showChapterCard(node.chapterCard.no);
  }

  const consumed = await runEffects(node.effects, ctx);
  if (consumed) {
    busy = false;
    return;
  }

  if (node.speaker && node.text) {
    await appendMessage(node);
  }

  if (node.end) {
    busy = false;
    endGame(node.end);
    return;
  }

  if (node.next) {
    const nextId = node.next;
    busy = false;
    window.setTimeout(() => void playNode(nextId), 420);
    return;
  }

  if (node.choices?.length) {
    renderChoices(node.choices);
  }
  busy = false;
}

// ---------- 消息渲染 ----------

async function appendMessage(node: StoryNode): Promise<void> {
  const speaker = node.speaker ?? 'narration';
  const text = interpolate(node.text);

  if (speaker === 'number') {
    bumpRead();
  }

  await appendBubble(node.id, speaker, text);

  // 号码的消息，视"已读"次数可触发额外台词（由剧情节点自行决定，这里只推进）
  phoneUi.updateStatus();
}

function appendBubbleStatic(nodeId: string, speaker: Speaker, text: string): void {
  const bubble = buildBubble(speaker, text);
  msgListEl!.appendChild(bubble);
}

function appendBubble(nodeId: string, speaker: Speaker, text: string): Promise<void> {
  return new Promise((resolve) => {
    if (speaker === 'wang') audio.playSend();
    const bubble = buildBubble(speaker, text);
    msgListEl!.appendChild(bubble);
    history.push({ nodeId, asBubble: true });

    const textEl = bubble.querySelector('.bubble-text') as HTMLElement;
    if (speaker === 'narration') {
      new Typewriter(textEl, text, { speed: 20, audio: false, onDone: () => setTimeout(resolve, 120) });
    } else if (speaker === 'system') {
      textEl.textContent = text;
      setTimeout(resolve, 200);
    } else {
      new Typewriter(textEl, text, {
        speed: 30,
        audio: speaker !== 'wang',
        onDone: () => setTimeout(resolve, 160),
      });
    }
    scrollTick();
  });
}

function buildBubble(speaker: Speaker, text: string): HTMLElement {
  const row = document.createElement('div');
  row.className = 'msg-row ' + speakerClass(speaker);

  if (speaker === 'narration' || speaker === 'system') {
    const inner = document.createElement('div');
    inner.className = speaker === 'narration' ? 'narration' : 'system-note';
    const t = document.createElement('div');
    t.className = 'bubble-text';
    t.textContent = text;
    inner.appendChild(t);
    row.appendChild(inner);
    return row;
  }

  const bubble = document.createElement('div');
  bubble.className = 'bubble bubble-' + speaker;
  if (speaker === 'number') bubble.classList.add('bubble-mono');
  const t = document.createElement('div');
  t.className = 'bubble-text';
  t.textContent = text;
  bubble.appendChild(t);
  const time = document.createElement('div');
  time.className = 'bubble-time';
  time.textContent = nowTime();
  bubble.appendChild(time);
  row.appendChild(bubble);
  return row;
}

function speakerClass(s: Speaker): string {
  return `msg-${s}`;
}

function nowTime(): string {
  const { time } = getRun();
  return `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;
}

let ticking = false;
function scrollTick(): void {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    scrollBottom();
    ticking = false;
  });
}

// ---------- 选项渲染 ----------

function renderChoices(choices: Choice[]): void {
  if (!choicesEl) return;
  choicesEl.innerHTML = '';
  let shown = 0;
  for (const ch of choices) {
    if (!evalCond(ch.cond)) continue;
    shown++;
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = ch.label;
    btn.addEventListener('click', () => {
      if (busy) return;
      void onChoice(ch);
    });
    choicesEl.appendChild(btn);
  }
  if (shown === 0) {
    const dead = document.createElement('div');
    dead.className = 'system-note';
    dead.textContent = '……';
    choicesEl.appendChild(dead);
  }
}

async function onChoice(ch: Choice): Promise<void> {
  if (busy) return;
  for (const [k, v] of Object.entries(ch.flags ?? {})) setFlag(k, v);
  clearChoices();
  let consumed = false;
  if (ch.effect) {
    consumed = await runEffects(ch.effect, ctx);
  }
  if (consumed) {
    // 来电/切屏接管了后续流程
    return;
  }
  // 把玩家的回复/动作渲染进对话流
  const isAction = ch.label.startsWith('*');
  const label = isAction ? ch.label.slice(1) : ch.label;
  if (label.trim()) {
    const asBubble = !isAction;
    if (asBubble) {
      const bubble = buildBubble('wang', label);
      msgListEl!.appendChild(bubble);
      audio.playSend();
      history.push({ nodeId: ch.go, asBubble: true, label });
      const t = bubble.querySelector('.bubble-text') as HTMLElement;
      t.textContent = label;
    } else {
      const row = document.createElement('div');
      row.className = 'msg-row msg-system';
      const inner = document.createElement('div');
      inner.className = 'system-note';
      inner.textContent = label;
      row.appendChild(inner);
      msgListEl!.appendChild(row);
      history.push({ nodeId: ch.go, asBubble: false });
    }
    scrollBottom();
  }
  await playNode(ch.go); // playNode 内部管理 busy
}

function clearChoices(): void {
  if (choicesEl) choicesEl.innerHTML = '';
}

// ---------- 效果上下文 ----------

export async function queueTyping(): Promise<void> {
  if (!typingEl) return;
  typingEl.style.display = 'flex';
  scrollBottom();
  await new Promise((r) => setTimeout(r, 1400));
  typingEl.style.display = 'none';
}

export function showBanner(text: string): void {
  let banner = document.querySelector('.fx-banner') as HTMLElement | null;
  if (!banner) {
    banner = document.createElement('div');
    banner.className = 'fx-banner';
    document.getElementById('app')?.appendChild(banner);
  }
  banner.textContent = text;
  banner.classList.remove('show');
  void banner.offsetWidth;
  banner.classList.add('show');
  window.setTimeout(() => banner.classList.remove('show'), 2600);
}

export function showPhoto(id: string): Promise<void> {
  return new Promise((resolve) => {
    const data = photoById(id);
    if (!data) {
      resolve();
      return;
    }
    if (data.pair && (data.diffZone || (data.diffZones && data.diffZones.length > 0))) {
      showFindDiff(data, resolve);
      return;
    }
    audio.playType();
    const app = document.getElementById('app') as HTMLElement;
    const overlay = document.createElement('div');
    overlay.className = 'photo-viewer';
    const frame = document.createElement('div');
    frame.className = 'photo-frame';
    frame.appendChild(photoElement(id, data.real));

    // "空房间"照片：反复查看会有细微变化（重复中的变化）
    let caption = data.caption;
    if (id === 'p_room') {
      const n = getRun().roomViewed;
      if (n >= 3) caption = '你数了三遍。房间里没有人。可你知道，你看见了什么。';
      else if (n === 2) caption = '……窗边，好像站了个人？';
      if (n >= 2) audio.playBreath();
    }

    const cap = document.createElement('div');
    cap.className = 'photo-cap' + (id === 'p_room' && getRun().roomViewed >= 2 ? ' shifting' : '');
    cap.innerHTML = `<b>${data.title}</b> · ${data.date}<br><span>${caption}</span>`;
    frame.appendChild(cap);
    const close = document.createElement('button');
    close.className = 'photo-close';
    close.textContent = '关闭';
    overlay.appendChild(frame);
    if (data.evidence) {
      const evBtn = document.createElement('button');
      evBtn.className = 'collect-btn';
      const got = hasEvidence(data.evidence);
      evBtn.textContent = got ? '已收证 ✓' : '收证';
      evBtn.disabled = got;
      evBtn.addEventListener('click', () => {
        addEvidence(data.evidence!);
        saveRun();
        showBanner('🔍 已收入证据册');
        evBtn.textContent = '已收证 ✓';
        evBtn.disabled = true;
      });
      overlay.appendChild(evBtn);
    }
    overlay.appendChild(close);
    app.appendChild(overlay);
    const dismiss = () => {
      overlay.classList.add('out');
      setTimeout(() => {
        overlay.remove();
        resolve();
      }, 260);
    };
    close.addEventListener('click', dismiss);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) dismiss();
    });
  });
}

/** 照片找不同谜题：多差异找茬（号码发来的照片 vs 原图，找全 3 处） */
function showFindDiff(data: import('../story/content').PhotoData, resolve: () => void): void {
  const orig = photoById(data.pair!);
  const zones: { id: string; rect: [number, number, number, number] }[] =
    data.diffZones ?? (data.diffZone ? [{ id: 'diff', rect: data.diffZone }] : []);
  const total = zones.length;
  const app = document.getElementById('app') as HTMLElement;
  const overlay = document.createElement('div');
  overlay.className = 'photo-viewer diff-viewer';
  overlay.innerHTML = `<div class="diff-head">这张照片，和你相册里的<u>不太一样</u>。找出 ${total} 处不同。</div>`;
  const frame = document.createElement('div');
  frame.className = 'photo-frame diff-frame';
  const holder = document.createElement('div');
  holder.className = 'diff-holder';
  holder.appendChild(photoElement(data.id, data.real));
  frame.appendChild(holder);

  const bar = document.createElement('div');
  bar.className = 'diff-bar';
  const toggle = document.createElement('button');
  toggle.className = 'diff-toggle';
  toggle.textContent = '对照原图';
  bar.appendChild(toggle);
  frame.appendChild(bar);

  const hint = document.createElement('div');
  hint.className = 'diff-hint';
  hint.textContent = '仔细看，有些地方不对劲。';
  frame.appendChild(hint);

  overlay.appendChild(frame);
  const close = document.createElement('button');
  close.className = 'photo-close';
  close.textContent = '关闭';
  overlay.appendChild(close);
  overlay.appendChild(
    hintBox(
      [
        '看那扇门。是不是……多了一个不该有的影子？',
        '门对面的矮桌，和右侧的窗，再对照一次原图。',
        '三处：门缝里的人影、矮桌上的杯子、被拉上的窗帘。',
      ],
      { taunt: '「连这个都要问？它就在照片里。」' },
    ),
  );
  app.appendChild(overlay);

  let showingOrig = false;
  const found = new Set<string>();
  const marks: HTMLElement[] = [];

  const dismiss = () => {
    overlay.classList.add('out');
    setTimeout(() => {
      overlay.remove();
      resolve();
    }, 260);
  };

  const markAt = (rect: [number, number, number, number]) => {
    const m = document.createElement('div');
    m.className = 'diff-mark';
    m.style.left = `${rect[0] * 100}%`;
    m.style.top = `${rect[1] * 100}%`;
    m.style.width = `${(rect[2] - rect[0]) * 100}%`;
    m.style.height = `${(rect[3] - rect[1]) * 100}%`;
    holder.appendChild(m);
    marks.push(m);
  };

  const checkTap = (e: PointerEvent) => {
    const rect = holder.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    if (showingOrig) {
      hint.textContent = '这是你自己拍的原图。换回那张再看看。';
      hint.classList.remove('good');
      return;
    }
    let hit = false;
    for (const z of zones) {
      if (found.has(z.id)) continue;
      const [x0, y0, x1, y1] = z.rect;
      if (nx >= x0 && nx <= x1 && ny >= y0 && ny <= y1) {
        found.add(z.id);
        markAt(z.rect);
        hit = true;
        audio.playSend();
        fx.redFlash(220);
        hint.classList.add('good');
        if (found.size === total) {
          setFlag('puzzle1Done', true);
          addEvidence('e_hallway');
          saveRun();
          close.disabled = false;
          close.textContent = '明白了 · 返回';
          hint.textContent = '全找到了。门缝里，多了一个人。';
        } else {
          hint.textContent = `找到了。(${found.size}/${total})`;
        }
        break;
      }
    }
    if (!hit) {
      hint.textContent = '不对。再看看，哪里多出来了什么。';
      hint.classList.remove('good');
      audio.playStaticBurst();
      fx.shake(220);
      addBattery(-5);
      phoneUi.updateStatus();
    }
  };

  holder.addEventListener('pointerup', checkTap);
  toggle.addEventListener('click', () => {
    showingOrig = !showingOrig;
    holder.replaceChildren(photoElement(showingOrig ? orig!.id : data.id, showingOrig ? orig!.real : data.real));
    for (const m of marks) holder.appendChild(m);
    toggle.textContent = showingOrig ? '看它发来的那张' : '对照原图';
  });
  close.addEventListener('click', dismiss);
}

/** 第四章时间线拼图：把那晚按顺序拼出来，混有伪造证据 */
function showTimeline(resolve: () => void): void {
  const order = timelineOrder();
  const cards = TIMELINE_CARDS;
  const slots: (string | null)[] = order.map(() => null);
  const app = document.getElementById('app') as HTMLElement;
  const ov = document.createElement('div');
  ov.className = 'timeline-viewer';
  const head = document.createElement('div');
  head.className = 'tl-head';
  head.innerHTML = `把那晚，按顺序拼出来。<br><span class="tl-sub">有些卡片不属于那晚。别放进去。</span>`;
  const slotRow = document.createElement('div');
  slotRow.className = 'tl-slots';
  const hint = document.createElement('div');
  hint.className = 'tl-hint';
  hint.textContent = '点卡片放进时间槽；点时间槽取回。';
  const pool = document.createElement('div');
  pool.className = 'tl-pool';

  const renderSlots = () => {
    slotRow.innerHTML = '';
    slots.forEach((id, i) => {
      const s = document.createElement('button');
      s.className = 'tl-slot' + (id ? ' filled' : '');
      const card = cards.find((c) => c.id === id);
      s.textContent = card ? `${card.when} · ${card.label}` : `槽 ${i + 1}`;
      s.addEventListener('click', () => {
        if (!id) return;
        slots[i] = null;
        renderSlots();
        renderPool();
      });
      slotRow.appendChild(s);
    });
  };
  const renderPool = () => {
    pool.innerHTML = '';
    for (const c of cards) {
      if (slots.includes(c.id)) continue;
      const b = document.createElement('button');
      b.className = 'tl-card' + (c.fake ? ' fake' : '');
      b.innerHTML = `<span class="tl-when">${c.when}</span><b>${c.label}</b><small>${c.sub}</small>`;
      b.addEventListener('click', () => {
        if (c.fake) {
          hint.textContent = '这个……不属于那晚。';
          hint.classList.remove('good');
          audio.playStinger();
          fx.glitch(200);
          return;
        }
        const idx = slots.findIndex((s) => !s);
        if (idx < 0) return;
        slots[idx] = c.id;
        renderSlots();
        renderPool();
        checkComplete();
      });
      pool.appendChild(b);
    }
  };
  const checkComplete = () => {
    if (slots.some((s) => !s)) return;
    const got = slots.join('|');
    if (got === order.join('|')) {
      hint.textContent = '你拼出了真相。';
      hint.classList.add('good');
      setTimelineCorrect(true);
      saveRun();
      audio.playSend();
      fx.redFlash(260);
      window.setTimeout(() => {
        ov.classList.add('out');
        window.setTimeout(() => {
          ov.remove();
          resolve();
        }, 300);
      }, 900);
    } else {
      hint.textContent = '有一处顺序不对。卡片会回到下面，再试一次。';
      hint.classList.remove('good');
      audio.playStaticBurst();
      fx.shake(280);
      slots.fill(null);
      renderSlots();
      renderPool();
    }
  };

  const giveUp = document.createElement('button');
  giveUp.className = 'tl-giveup';
  giveUp.textContent = '我拼不出来 · 放弃整理';
  giveUp.addEventListener('click', () => {
    ov.classList.add('out');
    window.setTimeout(() => {
      ov.remove();
      resolve();
    }, 300);
  });

  ov.append(head, slotRow, hint, pool);
  ov.appendChild(
    hintBox(
      [
        '那晚从聚餐开始。她劝过你别开车。',
        '她打了两通电话（一通接了、一通没接），然后是那条「到家了吗」。',
        '顺序：聚餐→你的备忘→来电31秒→未接来电→她问你→你回「马上到家」。两条「未知号码」和闹钟是假的。',
      ],
      { taunt: '「连顺序都拼不出来？你当时，可清醒得很。」' },
    ),
  );
  ov.appendChild(giveUp);
  app.appendChild(ov);
  renderSlots();
  renderPool();
}

export function showChapterCard(no: number): Promise<void> {
  return new Promise((resolve) => {
    const ch = CHAPTERS[no];
    if (!ch) {
      resolve();
      return;
    }
    audio.playStinger();
    const app = document.getElementById('app') as HTMLElement;
    const card = document.createElement('div');
    card.className = 'chapter-card';
    card.innerHTML = `<div class="cc-no">第${ch.no}章</div><div class="cc-title">《${ch.title}》</div><div class="cc-hint">轻触继续</div>`;
    app.appendChild(card);
    let done = false;
    const dismiss = () => {
      if (done) return;
      done = true;
      card.classList.add('out');
      setTimeout(() => {
        card.remove();
        resolve();
      }, 500);
    };
    card.addEventListener('click', dismiss);
    setTimeout(() => {
      card.querySelector('.cc-hint')?.classList.add('blink');
    }, 1600);
  });
}

// ---------- 来电系统 ----------

type CallFlow = {
  who: string;
  lines: { speaker: Speaker; text: string }[];
  onAccept: string;
  onDecline: string;
};

const CALL_FLOWS: Record<string, CallFlow> = {};

export function registerCallFlow(id: string, flow: CallFlow): void {
  CALL_FLOWS[id] = flow;
}

export function startCall(who: string): void {
  const flow = CALL_FLOWS[who];
  if (!flow) {
    console.warn(`[ui] 来电流程不存在: ${who}`);
    return;
  }
  audio.playRing();
  const app = document.getElementById('app') as HTMLElement;
  const overlay = document.createElement('div');
  overlay.className = 'call-ui';
  overlay.innerHTML = `
    <div class="call-avatar">${flow.who === '未知号码' ? '？' : flow.who[0]}</div>
    <div class="call-name">${flow.who}</div>
    <div class="call-status">来电…</div>
    <div class="call-btns">
      <button class="call-btn decline">拒接</button>
      <button class="call-btn accept">接听</button>
    </div>
  `;
  app.appendChild(overlay);

  const finish = (nodeId: string) => {
    overlay.remove();
    audio.cancelSpeech();
    audio.playMessage('contact');
    void playNode(nodeId);
  };

  overlay.querySelector('.decline')!.addEventListener('click', () => {
    audio.playSend();
    finish(flow.onDecline);
  });
  overlay.querySelector('.accept')!.addEventListener('click', () => {
    audio.playSend();
    runCall(overlay, flow);
  });
}

function runCall(overlay: HTMLElement, flow: CallFlow): void {
  overlay.querySelector('.call-status')!.textContent = '通话中 · 00:0X';
  const btns = overlay.querySelector('.call-btns')!;
  btns.innerHTML = `<button class="call-btn hangup">挂断</button>`;
  let li = 0;
  const body = document.createElement('div');
  body.className = 'call-body';
  overlay.insertBefore(body, btns);

  const speakNext = () => {
    if (li >= flow.lines.length) return;
    const line = flow.lines[li];
    li++;
    const cap = document.createElement('div');
    cap.className = 'call-line ' + speakerClass(line.speaker);
    cap.innerHTML = `<div class="bubble bubble-${line.speaker}"><div class="bubble-text"></div></div>`;
    body.appendChild(cap);
    const t = cap.querySelector('.bubble-text') as HTMLElement;
    new Typewriter(t, line.text, {
      speed: 26,
      audio: false,
      onDone: () => setTimeout(speakNext, 420),
    });
    if (line.speaker === 'number') {
      audio.speakText(line.text, { voice: 'distorted' });
    } else if (line.speaker === 'mom') {
      audio.speakText(line.text, { voice: 'mom' });
    } else {
      audio.speakText(line.text, { voice: 'normal' });
    }
  };
  speakNext();

  const hangup = () => {
    overlay.remove();
    audio.cancelSpeech();
    audio.playSend();
    void playNode(flow.onAccept);
  };
  btns.querySelector('.hangup')!.addEventListener('click', hangup);
}

// ---------- 结束流程 ----------

let currentEndingId: string | null = null;

export function setCurrentEndingId(id: string): void {
  currentEndingId = id;
}

export function getCurrentEndingId(): string | null {
  return currentEndingId;
}

export function endGame(endingRef: string): void {
  let id = endingRef.replace('ending:', '');
  if (id === 'resolve') {
    // 结局由人格加权结算（无明选菜单）
    const p = personality();
    id = resolveEnding(p, {
      newGamePlus: getMeta().newGamePlus,
      allBaseUnlocked: hasAllBaseEndings(),
    });
  }
  const end = getEnding(id);
  if (end) {
    recordEnding(id);
    setCurrentEndingId(id);
    audio.stopHeartbeat();
    audio.cancelSpeech();
    window.dispatchEvent(new CustomEvent('game:end', { detail: id }));
  }
  router.show('ending');
}

// ---------- 新建/继续 ----------

export function startNewGame(): void {
  clearRunState();
  resetChat();
  audio.initAudio();
  audio.startAmbient();
  audio.setChapterDensity(0);
  router.show('chat');
  void playNode('p1s1');
}

export function continueGame(): void {
  audio.initAudio();
  audio.startAmbient();
  audio.setChapterDensity(getRun().chapter);
  resetChat();
  router.show('chat');
  void playNode(getRun().currentNode);
}

function clearRunState(): void {
  clearRun();
}

// ---------- 效果上下文装配 ----------

const ctx: EffectContext = {
  sfx(name: string) {
    switch (name) {
      case 'msg_num':
        audio.playMessage('number');
        break;
      case 'msg_con':
        audio.playMessage('contact');
        break;
      case 'msg_lin':
        audio.playMessage('lin');
        break;
      case 'send':
        audio.playSend();
        break;
      case 'ring':
        audio.playRing();
        break;
      case 'sting':
        audio.playStinger();
        break;
      case 'breath':
        audio.playBreath();
        break;
    }
  },
  sting() {
    audio.playStinger();
    fx.redFlash();
  },
  stinglong() {
    audio.playStinger();
    fx.redFlash(60);
    fx.glitch(500);
  },
  glitch(dur) {
    fx.glitch(dur);
  },
  noise(on) {
    fx.setNoise(on);
  },
  shake(dur) {
    fx.shake(dur);
  },
  time(min) {
    advanceTime(min);
    phoneUi.updateStatus();
  },
  chapter(n) {
    setChapter(n);
    audio.setChapterDensity(n);
    phoneUi.updateStatus();
  },
  photo(id) {
    addPhoto(id);
    phoneUi.refreshScreens();
  },
  photoOpen(id) {
    void showPhoto(id);
  },
  note(id) {
    addNote(id);
    phoneUi.refreshScreens();
  },
  contact(id) {
    addContact(id);
    phoneUi.refreshScreens();
  },
  calllog(id) {
    addCall(id);
    phoneUi.refreshScreens();
  },
  banner(text) {
    showBanner(text);
  },
  screen(name) {
    router.show(name as never);
  },
  call(who) {
    startCall(who);
  },
  async typing() {
    await queueTyping();
  },
  flag(name) {
    setFlag(name, true);
  },
  count(name) {
    addCount(name);
  },
  async card(no) {
    await showChapterCard(no);
  },
  heart(on) {
    if (on) audio.startHeartbeat();
    else audio.stopHeartbeat();
  },
  ambient(on) {
    if (on) audio.startAmbient();
    else audio.stopAmbient();
  },
  noteopen(id) {
    const note = noteById(id);
    if (note) phoneUi.showNoteView(note.body);
  },
  drafts() {
    // 标记草稿箱可见（由 drafts 屏幕读取 flags）
    setFlag('draftsVisible', true);
  },
  flicker(dur) {
    fx.glitch(dur ?? 600);
    const sc = document.querySelector('.phone-screen') as HTMLElement | null;
    if (sc) {
      sc.classList.add('fx-flicker');
      window.setTimeout(() => sc.classList.remove('fx-flicker'), (dur ?? 600) + 200);
    }
  },
  revoke() {
    revokeLastMessage();
  },
  wallChange(on) {
    setFlag('wallChanged', on);
    phoneUi.refreshScreens();
  },
  silenceDrop() {
    audio.silenceDrop();
  },
  presence() {
    // 状态栏时间异常：跳回 00:00 又恢复
    const el = document.querySelector('.st-left') as HTMLElement | null;
    if (el) {
      el.textContent = '00:00';
      el.classList.add('presence-glitch');
      window.setTimeout(() => {
        phoneUi.updateStatus();
        el.classList.remove('presence-glitch');
      }, 1800);
    }
  },
  voice(text) {
    audio.speakText(text, { voice: 'distorted' });
  },
  evidence(id) {
    addEvidence(id);
    saveRun();
    showBanner('🔍 已收入证据册');
    phoneUi.refreshScreens();
  },
  battery(delta) {
    addBattery(delta);
    phoneUi.updateStatus();
  },
  scare(type) {
    doScare(type);
  },
  clock(minOfDay) {
    setClock(minOfDay);
    phoneUi.updateStatus();
  },
  timed(id) {
    showTimedChoice(id);
  },
  timeline() {
    return new Promise((resolve) => showTimeline(resolve));
  },
};

// ---------- 限时判断（电量/时间压力下的快速抉择） ----------

type TimedOption = {
  label: string;
  node: string;
  flag?: string;
  count?: string;
  battery?: number;
};
type TimedChoice = {
  prompt: string;
  seconds: number;
  options: TimedOption[];
  timeout: TimedOption & { scare?: boolean };
};

const TIMED: Record<string, TimedChoice> = {
  c333call: {
    prompt: '手机快没电了。门外传来敲门声。\n\n你必须马上决定——',
    seconds: 6,
    options: [
      { label: '开门', node: 'c3s13_open', flag: 'openedDoor', count: 'trait_truth' },
      { label: '不开门，盯着手机屏幕', node: 'c3s13_phone', count: 'trait_care' },
      { label: '关机，假装没人在家', node: 'c3s13_hide', count: 'trait_avoid', battery: 4 },
    ],
    timeout: { label: '（你僵在原地，什么都没做）', node: 'c3s13_timeout', battery: -25, scare: true },
  },
};

function showTimedChoice(id: string): void {
  const cfg = TIMED[id];
  if (!cfg) {
    console.warn(`[timed] 未注册: ${id}`);
    return;
  }
  audio.playClockTick();
  const app = document.getElementById('app') as HTMLElement;
  const ov = document.createElement('div');
  ov.className = 'timed-overlay';
  const prompt = document.createElement('div');
  prompt.className = 'timed-prompt';
  prompt.textContent = cfg.prompt;
  const bar = document.createElement('div');
  bar.className = 'timed-bar';
  const fill = document.createElement('div');
  fill.className = 'timed-fill';
  bar.appendChild(fill);
  const counter = document.createElement('div');
  counter.className = 'timed-count';
  counter.textContent = `0:${cfg.seconds}`;
  const btns = document.createElement('div');
  btns.className = 'timed-btns';

  let done = false;
  const apply = (o: TimedOption) => {
    if (o.flag) setFlag(o.flag, true);
    if (o.count) addCount(o.count);
    if (o.battery) addBattery(o.battery);
    phoneUi.updateStatus();
  };
  const finish = (o: TimedOption, scare?: boolean) => {
    if (done) return;
    done = true;
    clearInterval(iv);
    apply(o);
    if (scare) doScare('flash');
    ov.classList.add('out');
    window.setTimeout(() => {
      ov.remove();
      audio.playSend();
      void playNode(o.node);
    }, 300);
  };

  for (const o of cfg.options) {
    const b = document.createElement('button');
    b.className = 'timed-opt';
    b.textContent = o.label;
    b.addEventListener('click', () => finish(o));
    btns.appendChild(b);
  }
  ov.append(prompt, bar, counter, btns);
  app.appendChild(ov);

  requestAnimationFrame(() => {
    fill.style.width = '0%';
  });
  const start = Date.now();
  const iv = window.setInterval(() => {
    const remain = Math.ceil(cfg.seconds - (Date.now() - start) / 1000);
    counter.textContent = `0:${remain > 9 ? '' : '0'}${Math.max(0, remain)}`;
    if (remain <= 2) counter.classList.add('urgent');
    if (Date.now() - start >= cfg.seconds * 1000) {
      clearInterval(iv);
      finish(cfg.timeout, cfg.timeout.scare);
    }
  }, 200);
}

/** 跳吓点：全屏覆盖层 + 音效，克制使用 */
function doScare(type: string): void {
  audio.playStinger();
  fx.glitch(500);
  const app = document.getElementById('app') as HTMLElement;
  if (!app) return;
  const ov = document.createElement('div');
  ov.className = 'scare-overlay';
  if (type === 'photo') {
    ov.innerHTML = `<div class="scare-figure"></div><div class="scare-label">它也在看你</div>`;
    audio.playStaticBurst();
  } else {
    ov.classList.add('flash');
    audio.playStaticBurst();
  }
  app.appendChild(ov);
  window.setTimeout(() => {
    ov.classList.add('out');
    window.setTimeout(() => ov.remove(), 400);
  }, 620);
}

/** 消息撤回效果：把最后一条消息标记为被撤回 */
function revokeLastMessage(): void {
  const rows = msgListEl?.querySelectorAll('.msg-row') ?? [];
  const last = rows[rows.length - 1] as HTMLElement | undefined;
  if (last) {
    last.classList.add('revoked');
    const note = document.createElement('div');
    note.className = 'system-note revoke-note';
    note.textContent = '⚠ 对方撤回了一条消息';
    last.after(note);
    scrollBottom();
  }
}
