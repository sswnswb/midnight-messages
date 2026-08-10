// 备忘录屏：线索库之一

import { getRun } from '../../engine/state';
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
    card.addEventListener('click', () => {
      const listWrap = card.closest('.notes-screen') as HTMLElement | null;
      if (listWrap) showBody(listWrap, data.body);
    });
    list.appendChild(card);
  }
  return list;
}

function showBody(wrap: HTMLElement, body: string): void {
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
  wrap.replaceChildren(view);
  // 故障条目触发轻微抖动
  if (body.includes('别信')) {
    fx.glitch(350);
  }
}
