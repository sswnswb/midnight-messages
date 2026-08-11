// 备忘录屏：线索库之一

import { getRun, addEvidence, hasEvidence } from '../../engine/state';
import { noteById } from '../../story/content';
import { setNoteViewHandler } from '../phone';
import { fx } from '../fx';

export function screenNotes(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'notes-screen';

  const list = renderList();
  wrap.appendChild(list);

  // 注册"剧情强制打开某条备忘录"的处理器
  setNoteViewHandler((body: string) => {
    if (!wrap.isConnected) return;
    showBody(wrap, body);
  });

  return wrap;
}

function renderList(): HTMLElement {
  const list = document.createElement('div');
  list.className = 'scroll-area notes-list';
  const { notes } = getRun();
  if (notes.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'system-note';
    empty.textContent = '（没有备忘录）';
    list.appendChild(empty);
    return list;
  }
  for (const id of notes) {
    const data = noteById(id);
    if (!data) continue;
    const card = document.createElement('button');
    card.className = 'note-card' + (data.glitched ? ' glitched' : '');
    const t = document.createElement('div');
    t.className = 'note-card-title';
    t.textContent = data.title || '无标题';
    const d = document.createElement('div');
    d.className = 'note-card-date';
    d.textContent = data.date;
    const b = document.createElement('div');
    b.className = 'note-card-preview';
    b.textContent = data.body.split('\n').slice(0, 2).join(' ');
    card.append(t, d, b);
    let didLongPress = false;
    card.addEventListener('click', () => {
      if (didLongPress) {
        didLongPress = false;
        return;
      }
      const listWrap = card.closest('.notes-screen') as HTMLElement | null;
      if (listWrap) showBody(listWrap, data.body, data.evidence);
    });
    // 彩蛋：长按带 secret 的备忘录，浮现隐藏文字
    if (data.secret) {
      let pressTimer: number | null = null;
      card.addEventListener('pointerdown', () => {
        pressTimer = window.setTimeout(() => {
          didLongPress = true;
          fx.redFlash(300);
          const listWrap = card.closest('.notes-screen') as HTMLElement | null;
          if (listWrap) showBody(listWrap, data.body + '\n\n（长按唤出）\n' + data.secret, data.evidence);
        }, 900);
      });
      card.addEventListener('pointerup', () => {
        if (pressTimer) clearTimeout(pressTimer);
      });
      card.addEventListener('pointerleave', () => {
        if (pressTimer) clearTimeout(pressTimer);
      });
    }
    list.appendChild(card);
  }
  return list;
}

function showBody(wrap: HTMLElement, body: string, evidenceId?: string): void {
  const view = document.createElement('div');
  view.className = 'note-view';
  const back = document.createElement('button');
  back.className = 'note-back';
  back.textContent = '‹ 返回';
  back.addEventListener('click', () => {
    wrap.replaceChildren(renderList());
  });
  const bodyEl = document.createElement('div');
  bodyEl.className = 'note-body';
  bodyEl.textContent = body;
  const noteDate = document.createElement('div');
  noteDate.className = 'note-date';
  noteDate.textContent = '编辑于某天';
  view.append(back, bodyEl, noteDate);
  if (evidenceId) {
    const evBtn = document.createElement('button');
    evBtn.className = 'collect-btn';
    const got = hasEvidence(evidenceId);
    evBtn.textContent = got ? '已收证 ✓' : '收证';
    evBtn.disabled = got;
    evBtn.addEventListener('click', () => {
      addEvidence(evidenceId);
      evBtn.textContent = '已收证 ✓';
      evBtn.disabled = true;
    });
    view.appendChild(evBtn);
  }
  wrap.replaceChildren(view);
  // 故障条目触发轻微抖动
  if (body.includes('别信')) {
    fx.glitch(350);
  }
}
