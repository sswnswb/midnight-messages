// 最近通话屏：隐藏线索（打给过自己）

import { getRun } from '../../engine/state';
import { CALLS } from '../../story/content';

export function screenCalls(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'calls-screen';
  const list = document.createElement('div');
  list.className = 'scroll-area calls-list';

  const { calls } = getRun();
  if (calls.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'system-note';
    empty.textContent = '（暂无通话记录）';
    list.appendChild(empty);
  }

  for (const id of calls) {
    const data = CALLS.find((c) => c.id === id);
    if (!data) continue;
    const row = document.createElement('div');
    row.className = 'call-row';
    const dirIco = document.createElement('span');
    dirIco.className = 'call-dir';
    dirIco.textContent = data.dir === 'in' ? '↓' : data.dir === 'out' ? '↑' : '☓';
    if (data.dir === 'out') row.classList.add('self-out');
    const who = document.createElement('span');
    who.className = 'call-who';
    who.textContent = data.who;
    const when = document.createElement('span');
    when.className = 'call-when';
    when.textContent = `${data.when} · ${data.dur}`;
    row.append(dirIco, who, when);
    list.appendChild(row);
  }

  wrap.appendChild(list);
  return wrap;
}
