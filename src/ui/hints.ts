// 谜题提示组件：3 级渐进提示，防卡关；点开先被号码嘲讽一句
import { useHint } from '../engine/state';
import * as audio from '../engine/audio';
import { fx } from './fx';

export function hintBox(
  hints: string[],
  opts?: { taunt?: string },
): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'hint-box';
  const btn = document.createElement('button');
  btn.className = 'hint-btn';
  btn.textContent = '需要提示？';
  const body = document.createElement('div');
  body.className = 'hint-body';

  let i = 0;
  let taunted = false;
  btn.addEventListener('click', () => {
    useHint();
    audio.playMessage('number');
    fx.glitch(220);
    if (!taunted) {
      taunted = true;
      const t = document.createElement('div');
      t.className = 'hint-taunt';
      t.textContent = opts?.taunt ?? '「连这个都要问？它就在你手机里。」';
      wrap.insertBefore(t, body);
    }
    if (i < hints.length) {
      body.textContent = `【线索 ${i + 1}/${hints.length}】${hints[i]}`;
      body.classList.add('show');
      i++;
    }
    if (i >= hints.length) {
      btn.disabled = true;
      btn.textContent = '线索已全部给出';
    }
  });

  wrap.append(btn, body);
  return wrap;
}
