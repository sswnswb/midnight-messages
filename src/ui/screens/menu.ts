// 主菜单：标题 / 新游戏 / 继续 / 结局画廊
// 二周目时菜单会有"细思极恐"的第四面墙细节。

import { getMeta, hasSave } from '../../engine/state';
import { startNewGame, continueGame } from '../ui';
import { router } from '../phone';
import { listEndings } from '../../story/endings';

export function screenMenu(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'menu-screen';
  const meta = getMeta();

  const title = document.createElement('div');
  title.className = 'menu-title';
  title.innerHTML = `午<b>夜</b>来讯`;

  const sub = document.createElement('div');
  sub.className = 'menu-sub';
  sub.textContent = '—— 你收到了一条陌生短信 ——';

  const btns = document.createElement('div');
  btns.className = 'menu-btns';

  const btnNew = mkBtn('开始新的一夜', () => startNewGame());
  btns.appendChild(btnNew);

  if (hasSave()) {
    const btnContinue = mkBtn('继续上一夜', () => continueGame());
    btns.appendChild(btnContinue);
  }

  const endings = listEndings();
  const unlocked = endings.filter((e) => meta.endings.includes(e.id)).length;
  if (unlocked > 0) {
    const btnGallery = mkBtn(`结局画廊（${unlocked}/${endings.length}）`, () => router.show('settings'));
    btnGallery.classList.add('ghost');
    btns.appendChild(btnGallery);
  }

  wrap.append(title, sub, btns);

  const foot = document.createElement('div');
  foot.className = 'menu-foot';
  foot.innerHTML = `<div class="menu-hint">深夜 00:00 · 陌生人发来短信<br>回复与否，都由你决定</div>`;
  wrap.appendChild(foot);

  // —— 第四面墙：二周目时菜单悄悄变化 ——
  if (meta.newGamePlus) {
    const ghost = document.createElement('div');
    ghost.className = 'menu-ghost';
    ghost.textContent = '（草稿箱里，有一封不是你写的信）';
    wrap.appendChild(ghost);
    // 标题轻微闪烁
    title.classList.add('ngp');
  }

  return wrap;
}

function mkBtn(label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.className = 'menu-btn';
  b.textContent = label;
  b.addEventListener('click', onClick);
  return b;
}
