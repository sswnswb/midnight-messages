// 证据册屏：玩家主动收证的核心反馈——有收集进度感
import { getRun } from '../../engine/state';
import { evidenceMeta } from '../../story/content';

export function screenEvidence(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'evidence-screen';

  const list = document.createElement('div');
  list.className = 'scroll-area evidence-list';

  const { evidence } = getRun();
  const collected = Array.isArray(evidence) ? evidence : [];

  const head = document.createElement('div');
  head.className = 'evidence-head';
  head.innerHTML = `已收证 <b>${collected.length}</b> 件 · 可做推理的碎片`;

  if (collected.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'evidence-empty';
    empty.textContent =
      '证据册是空的。\n\n值得怀疑的东西，长按或点"收证"收进来。\n它总有一天会把真相拼起来。';
    list.append(head, empty);
  } else {
    list.appendChild(head);
    for (const id of collected) {
      const meta = evidenceMeta(id);
      if (!meta) continue;
      const card = document.createElement('div');
      card.className = 'evidence-card';
      const icon = document.createElement('div');
      icon.className = 'evidence-icon';
      icon.textContent = meta.icon;
      const t = document.createElement('div');
      t.className = 'evidence-title';
      t.textContent = meta.title;
      const n = document.createElement('div');
      n.className = 'evidence-note';
      n.textContent = meta.note;
      card.append(icon, t, n);
      list.appendChild(card);
    }
    const tip = document.createElement('div');
    tip.className = 'system-note';
    tip.textContent = '（证据不会消失。收集得越全，你越接近那晚的真相。）';
    list.appendChild(tip);
  }

  wrap.appendChild(list);
  return wrap;
}
