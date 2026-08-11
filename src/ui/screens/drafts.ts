// 草稿箱屏：谜题③——4 位密码解锁（答案=车祸日期 1106）

import { getRun, setFlag, getFlag } from '../../engine/state';
import { router } from '../phone';
import * as audio from '../../engine/audio';
import { fx } from '../fx';
import { showBanner } from '../ui';

const PASSCODE = '1106';

interface DraftView {
  to: string;
  when: string;
  text: string;
  sent?: boolean;
}

const DRAFTS: DraftView[] = [
  { to: '未知号码', when: '定时发送 · 每天 00:00', text: '还没睡？' },
  { to: '未知号码', when: '定时发送 · 每天 00:00', text: '今天在公司，我又把方案弄砸了。你以前会笑我。' },
  { to: '未知号码', when: '定时发送 · 每天 00:00', text: '林晚，对不起。' },
  { to: '未知号码', when: '定时发送 · 每天 00:00', text: '你看到我的未读了吗。' },
  { to: '林晚', when: '定时发送 · 每年 4 月 18 日', text: '生日快乐。要记得我。', sent: true },
  { to: '林晚', when: '2025-11-06 23:52', text: '雨好大，我马上到家，你等我。', sent: true },
];

export function screenDrafts(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'drafts-screen';

  const unlocked = getFlag('draftsUnlocked') as boolean || getRun().draftsUnlocked;
  if (unlocked) {
    wrap.appendChild(renderDrafts(() => router.show('chat')));
  } else {
    wrap.appendChild(renderLock());
  }
  return wrap;
}

function renderLock(): HTMLElement {
  const view = document.createElement('div');
  view.className = 'drafts-lock';
  const icon = document.createElement('div');
  icon.className = 'drafts-lock-icon';
  icon.textContent = '🔒';
  const title = document.createElement('div');
  title.className = 'drafts-lock-title';
  title.textContent = '草稿箱已加密';
  const hint = document.createElement('div');
  hint.className = 'drafts-lock-hint';
  hint.textContent = '输入 4 位数字密码。\n（提示：备忘录里有答案。那晚的雨……是哪一天？）';

  const pad = document.createElement('div');
  pad.className = 'passcode';
  const dots = document.createElement('div');
  dots.className = 'passcode-dots';
  for (let i = 0; i < 4; i++) {
    const d = document.createElement('span');
    d.className = 'dot';
    dots.appendChild(d);
  }
  const keys = document.createElement('div');
  keys.className = 'passcode-keys';
  let entered = '';
  let wrongTimes = 0;
  const setDots = () => {
    dots.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('fill', i < entered.length));
  };
  const push = (digit: string) => {
    if (entered.length >= 4) return;
    entered += digit;
    audio.playType();
    setDots();
    if (entered.length === 4) {
      if (entered === PASSCODE) {
        audio.playSend();
        fx.glitch(400);
        setFlag('draftsUnlocked', true);
        getRun().draftsUnlocked = true;
        router.show('drafts');
      } else {
        audio.playStinger();
        fx.shake(260);
        entered = '';
        wrongTimes++;
        if (wrongTimes === 3) {
          // 彩蛋：连错三次，号码嘲讽
          showBanner('「你在用谁的生日？她一定很失望。」');
          fx.glitch(500);
          hint.textContent = '（密码：那晚的雨，是哪一天？）';
        }
        window.setTimeout(setDots, 180);
      }
    }
  };
  for (const d of ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫']) {
    const k = document.createElement('button');
    k.className = 'passcode-key';
    k.textContent = d;
    k.addEventListener('click', () => {
      if (d === 'C') {
        entered = '';
        setDots();
      } else if (d === '⌫') {
        entered = entered.slice(0, -1);
        setDots();
      } else {
        push(d);
      }
    });
    keys.appendChild(k);
  }

  pad.append(dots, keys);
  view.append(icon, title, hint, pad);
  return view;
}

function renderDrafts(onContinue: () => void): HTMLElement {
  const list = document.createElement('div');
  list.className = 'scroll-area drafts-list';
  const success = document.createElement('div');
  success.className = 'drafts-success';
  success.innerHTML = '🔓 <b>已解锁</b> —— 这些定时短信，全是你自己一年前设下的。';
  list.appendChild(success);
  for (const d of DRAFTS) {
    const row = document.createElement('div');
    row.className = 'draft-row' + (d.sent ? ' sent' : '');
    const head = document.createElement('div');
    head.className = 'draft-head';
    head.textContent = `发至：${d.to} · ${d.when}`;
    const body = document.createElement('div');
    body.className = 'draft-body';
    body.textContent = d.text;
    row.append(head, body);
    if (d.sent) {
      const tag = document.createElement('div');
      tag.className = 'draft-tag';
      tag.textContent = '已发送';
      row.appendChild(tag);
    }
    list.appendChild(row);
  }
  const end = document.createElement('div');
  end.className = 'system-note';
  end.textContent = '（草稿箱的定时发送，最早的一条，是你出事前一周设置的。）';
  list.appendChild(end);
  // 明确的"继续"入口，避免玩家解完锁不知道回短信
  const go = document.createElement('button');
  go.className = 'menu-btn drafts-continue';
  go.textContent = '我看完了 · 回到短信继续';
  go.addEventListener('click', onContinue);
  list.appendChild(go);
  return list;
}
