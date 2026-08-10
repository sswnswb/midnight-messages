// 设置屏：音量 + 结局画廊 + 重置

import { getAudioSettings, setAudioSettings } from '../../engine/audio';
import { getMeta, clearRun } from '../../engine/state';
import { listEndings } from '../../story/endings';
import { router } from '../phone';
import { getCurrentEndingId } from '../ui';

const KIND_LABEL: Record<string, string> = {
  true: '真结局',
  good: '好结局',
  bad: '坏结局',
  hidden: '隐藏结局',
  silence: '隐藏结局',
};

export function screenSettings(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'settings-screen';
  const scroll = document.createElement('div');
  scroll.className = 'scroll-area';

  // 音量
  const s = getAudioSettings();
  scroll.appendChild(sectionTitle('音量'));
  for (const [key, label] of [['master', '总音量'], ['ambience', '氛围声'], ['sfx', '音效']] as const) {
    const row = document.createElement('div');
    row.className = 'set-row';
    const lab = document.createElement('span');
    lab.className = 'set-label';
    lab.textContent = label;
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '1';
    input.step = '0.05';
    input.value = String(s[key]);
    input.addEventListener('input', () => {
      setAudioSettings({ [key]: Number(input.value) });
    });
    row.append(lab, input);
    scroll.appendChild(row);
  }

  // 结局画廊
  const meta = getMeta();
  const endings = listEndings();
  scroll.appendChild(sectionTitle('结局画廊'));
  if (endings.every((e) => !meta.endings.includes(e.id))) {
    const empty = document.createElement('div');
    empty.className = 'system-note';
    empty.textContent = '（尚未解锁任何结局）';
    scroll.appendChild(empty);
  } else {
    const grid = document.createElement('div');
    grid.className = 'ending-gallery';
    for (const e of endings) {
      const unlocked = meta.endings.includes(e.id);
      const card = document.createElement('button');
      card.className = 'gallery-card kind-' + e.kind + (unlocked ? '' : ' locked');
      if (!unlocked) {
        card.textContent = '？';
      } else {
        card.innerHTML = `<b>${e.title}</b><span>${KIND_LABEL[e.kind]}</span>`;
        if (e.id === getCurrentEndingId()) card.classList.add('recent');
      }
      grid.appendChild(card);
    }
    scroll.appendChild(grid);
  }

  // 危险区
  scroll.appendChild(sectionTitle('其他'));
  const reset = document.createElement('button');
  reset.className = 'menu-btn ghost danger';
  reset.textContent = '清除全部存档与结局';
  reset.addEventListener('click', () => {
    if (confirm('确定要清空所有进度与结局吗？此操作不可撤销。')) {
      clearRun();
      localStorage.removeItem('wywlx_meta_v1');
      localStorage.removeItem('wywlx_audio');
      location.reload();
    }
  });
  scroll.appendChild(reset);

  wrap.appendChild(scroll);
  return wrap;
}

function sectionTitle(text: string): HTMLElement {
  const t = document.createElement('div');
  t.className = 'set-section';
  t.textContent = text;
  return t;
}
