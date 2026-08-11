// 结局屏：展示结局 + 画廊入口 + 再来一次

import { getEnding, listEndings, evidenceSummary } from '../../story/endings';
import { getMeta, clearRun, interpolate } from '../../engine/state';
import { getCurrentEndingId, startNewGame } from '../ui';
import { router } from '../phone';
import * as audio from '../../engine/audio';

const KIND_LABEL: Record<string, string> = {
  true: '真结局',
  good: '好结局',
  bad: '坏结局',
  hidden: '隐藏结局',
  silence: '隐藏结局',
};

export function screenEnding(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'ending-screen';

  const id = getCurrentEndingId();
  const end = id ? getEnding(id) : undefined;

  if (!end) {
    wrap.innerHTML = `<div class="system-note">（没有结局数据）</div>`;
    return wrap;
  }

  const kind = document.createElement('div');
  kind.className = 'ending-kind kind-' + end.kind;
  kind.textContent = KIND_LABEL[end.kind] ?? '结局';

  const title = document.createElement('div');
  title.className = 'ending-title';
  title.textContent = end.title;

  const divider = document.createElement('div');
  divider.className = 'ending-divider';

  const body = document.createElement('div');
  body.className = 'ending-body';
  body.textContent = interpolate(end.text);

  const summary = evidenceSummary();
  if (summary) {
    const epi = document.createElement('div');
    epi.className = 'ending-epilogue';
    const t = document.createElement('div');
    t.className = 'ending-epi-title';
    t.textContent = '这一夜，你确实做了这些事';
    const s = document.createElement('div');
    s.className = 'ending-epi-body';
    s.innerHTML = summary.replace(/\n/g, '<br>');
    epi.append(t, s);
    wrap.insertBefore(epi, body.nextSibling);
  }

  const meta = getMeta();
  const total = listEndings().length;
  const unlocked = listEndings().filter((e) => meta.endings.includes(e.id)).length;
  const progress = document.createElement('div');
  progress.className = 'ending-progress';
  progress.textContent = `已解锁结局 ${unlocked} / ${total}`;

  const btns = document.createElement('div');
  btns.className = 'ending-btns';

  const btnMenu = document.createElement('button');
  btnMenu.className = 'menu-btn ghost';
  btnMenu.textContent = '回到主菜单';
  btnMenu.addEventListener('click', () => router.show('menu'));

  const btnAgain = document.createElement('button');
  btnAgain.className = 'menu-btn';
  btnAgain.textContent = '再试一次 · 另一条路';
  btnAgain.addEventListener('click', () => {
    clearRun();
    startNewGame();
  });

  const btnGallery = document.createElement('button');
  btnGallery.className = 'menu-btn ghost';
  btnGallery.textContent = '查看结局画廊';
  btnGallery.addEventListener('click', () => router.show('settings'));

  btns.append(btnMenu, btnAgain, btnGallery);
  wrap.append(kind, title, divider, body, progress, btns);

  // 氛围：结局后压低
  audio.setChapterDensity(1);

  return wrap;
}
