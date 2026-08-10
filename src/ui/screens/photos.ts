// 相册屏：线索库之二，承载"重复中的细微变化"

import { getRun, addCount } from '../../engine/state';
import { photoById } from '../../story/content';
import { photoElement } from '../art';
import { showPhoto } from '../ui';
import * as audio from '../../engine/audio';

export function screenPhotos(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'photos-screen';

  const grid = document.createElement('div');
  grid.className = 'scroll-area photo-grid';

  const { photos } = getRun();
  if (photos.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'system-note';
    empty.textContent = '（相册是空的）';
    grid.appendChild(empty);
  }

  for (const id of photos) {
    const data = photoById(id);
    if (!data) continue;
    const cell = document.createElement('button');
    cell.className = 'photo-cell';
    const inner = document.createElement('div');
    inner.className = 'photo-cell-inner';
    inner.appendChild(photoElement(id, data.real));
    cell.appendChild(inner);
    const cap = document.createElement('div');
    cap.className = 'photo-cell-cap';
    cap.textContent = data.title;
    cell.appendChild(cap);
    cell.addEventListener('click', () => {
      // 空房间照片：反复查看会有"变化"
      if (id === 'p_room') {
        addCount('roomViewed');
        audio.playBreath();
        fxRedHint();
      }
      void showPhoto(id);
    });
    grid.appendChild(cell);
  }

  wrap.appendChild(grid);
  return wrap;
}

function fxRedHint(): void {
  // 房间照片用轻红闪提示"不对劲"
  const el = document.createElement('div');
  el.className = 'fx-flash';
  el.style.animationDuration = '260ms';
  document.getElementById('app')?.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}
