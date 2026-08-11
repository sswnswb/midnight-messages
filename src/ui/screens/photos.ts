// 相册屏：线索库之二，承载"重复中的细微变化"

import { getRun, addCount, atTime } from '../../engine/state';
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
  // 彩蛋：只有 3:33 那一刻，相册里才会多出那张你没拍过的照片
  const includeAnomaly = !!getRun().flags['night333'] && atTime(213) && !photos.includes('p_333');
  if (includeAnomaly) photos.push('p_333');

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
    // 壁纸异常：墙变灰（wallchange 效果）
    const wallChanged = !!getRun().flags['wallChanged'];
    if (id === 'p_home' && wallChanged) {
      inner.classList.add('wall-abnormal');
    }
    inner.appendChild(photoElement(id, data.real));
    cell.appendChild(inner);
    const cap = document.createElement('div');
    cap.className = 'photo-cell-cap';
    cap.textContent = id === 'p_home' && wallChanged ? '壁纸 ·（变灰了？）' : data.title;
    cell.appendChild(cap);
    cell.addEventListener('click', () => {
      // 空房间照片：反复查看会有"变化"
      if (id === 'p_room') {
        addCount('roomViewed');
        audio.playBreath();
        fxRedHint();
      }
      // 3:33 异常照片：看过一次就算"见过她"
      if (id === 'p_333') {
        addCount('anomalyViewed');
        audio.playStinger();
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
