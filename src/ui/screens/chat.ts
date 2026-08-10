// 短信聊天屏：主战场

import { chatMount, rehydrate } from '../ui';

export function screenChat(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'chat-screen';
  const container = document.createElement('div');
  container.className = 'chat-container';
  wrap.appendChild(container);
  chatMount(container);
  requestAnimationFrame(() => rehydrate());
  return wrap;
}
