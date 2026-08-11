// 手机外壳 + 屏幕路由 + UI 门面（供引擎调用）

import { getRun, getMeta, getBattery } from '../engine/state';
import * as audio from '../engine/audio';
import { screenMenu } from './screens/menu';
import { screenChat } from './screens/chat';
import { screenNotes } from './screens/notes';
import { screenPhotos } from './screens/photos';
import { screenContacts } from './screens/contacts';
import { screenCalls } from './screens/calls';
import { screenDrafts } from './screens/drafts';
import { screenSettings } from './screens/settings';
import { screenEnding } from './screens/ending';
import { screenEvidence } from './screens/evidence';

export type ScreenName =
  | 'menu'
  | 'chat'
  | 'notes'
  | 'photos'
  | 'contacts'
  | 'calls'
  | 'drafts'
  | 'settings'
  | 'ending'
  | 'evidence';

interface ScreenReg {
  render: () => HTMLElement;
  title: string;
  nav?: boolean; // 是否在底部导航栏显示
}

const screens: Record<ScreenName, ScreenReg> = {
  menu: { render: () => screenMenu(), title: '' },
  chat: { render: () => screenChat(), title: '未知号码', nav: true },
  notes: { render: () => screenNotes(), title: '备忘录', nav: true },
  photos: { render: () => screenPhotos(), title: '相册', nav: true },
  contacts: { render: () => screenContacts(), title: '通讯录', nav: true },
  calls: { render: () => screenCalls(), title: '最近通话', nav: true },
  drafts: { render: () => screenDrafts(), title: '草稿箱', nav: false },
  settings: { render: () => screenSettings(), title: '设置', nav: true },
  ending: { render: () => screenEnding(), title: '' },
  evidence: { render: () => screenEvidence(), title: '证据册', nav: true },
};

const NAV_ORDER: ScreenName[] = ['chat', 'notes', 'photos', 'evidence', 'contacts', 'settings'];

let current: ScreenName = 'menu';
let phoneEl: HTMLElement | null = null;
let screenEl: HTMLElement | null = null;
let statusTimeEl: HTMLElement | null = null;
let statusBattEl: HTMLElement | null = null;
let headerTitleEl: HTMLElement | null = null;
let navEl: HTMLElement | null = null;

export const ui = {
  updateStatus(): void {
    if (!statusTimeEl) return;
    const { time } = getRun();
    const total = time % (24 * 60);
    const h = Math.floor(total / 60);
    const m = total % 60;
    statusTimeEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    if (statusBattEl) {
      const batt = getBattery();
      statusBattEl.textContent = `${batt}%`;
      statusBattEl.classList.toggle('low', batt <= 20);
    }
  },

  refreshScreens(): void {
    // 备忘录/相册/联系人等在后台被 effects 修改后，重渲染当前数据屏
    if (current === 'notes' || current === 'photos' || current === 'contacts' || current === 'calls') {
      router.show(current);
    }
  },

  setHeader(title: string): void {
    if (headerTitleEl) headerTitleEl.textContent = title;
  },

  showNoteView(text: string): void {
    // 由 notes 屏幕注册的处理器，无则忽略
    noteViewHandler?.(text);
  },
};

let noteViewHandler: ((text: string) => void) | null = null;
export function setNoteViewHandler(fn: (text: string) => void): void {
  noteViewHandler = fn;
}

export const router = {
  show(name: ScreenName, arg?: unknown): void {
    current = name;
    if (!screenEl) return;
    const reg = screens[name];
    ui.setHeader(reg.title);
    screenEl.innerHTML = '';
    let content: HTMLElement;
    if (name === 'chat') {
      content = reg.render();
      // chat 的特殊状态由 chat 模块自行管理
    } else {
      content = reg.render();
    }
    screenEl.appendChild(content);
    if (reg.title) document.title = `${reg.title} · 午夜来讯`;
    renderNav();
    // 通知当前屏幕已挂载（供 chat 等状态型屏幕用）
    window.dispatchEvent(new CustomEvent('screen:show', { detail: name }));
    // 切到有内容的屏幕时自动滚底
    const sc = screenEl.querySelector('.scroll-area');
    if (sc) sc.scrollTop = sc.scrollHeight;
    // 结束画面背景氛围
    audio.setChapterDensity(getRun().chapter);
  },

  current(): ScreenName {
    return current;
  },
};

function renderNav(): void {
  if (!navEl) return;
  const meta = getMeta();
  navEl.innerHTML = '';
  for (const name of NAV_ORDER) {
    const btn = document.createElement('button');
    btn.className = 'nav-btn' + (name === current ? ' active' : '');
    btn.dataset.screen = name;
    const icon = navIcon(name);
    btn.innerHTML = `<span class="nav-ico">${icon}</span><span class="nav-lbl">${navLabel(name)}</span>`;
    if (name === 'chat') {
      // 短信角标：未读提示
      const badge = document.createElement('span');
      badge.className = 'nav-badge';
      btn.appendChild(badge);
    }
    btn.addEventListener('click', () => {
      router.show(name);
    });
    navEl.appendChild(btn);
  }
}

function navIcon(name: ScreenName): string {
  switch (name) {
    case 'chat':
      return '💬';
    case 'notes':
      return '📝';
    case 'photos':
      return '🖼️';
    case 'contacts':
      return '👤';
    case 'settings':
      return '⚙️';
    case 'evidence':
      return '🔍';
    default:
      return '';
  }
}

function navLabel(name: ScreenName): string {
  switch (name) {
    case 'chat':
      return '短信';
    case 'notes':
      return '备忘录';
    case 'photos':
      return '相册';
    case 'contacts':
      return '联系人';
    case 'settings':
      return '设置';
    case 'evidence':
      return '证据';
    default:
      return '';
  }
}

export function mountPhone(): HTMLElement {
  const app = document.getElementById('app') as HTMLElement;
  app.innerHTML = '';

  phoneEl = document.createElement('div');
  phoneEl.className = 'phone';

  const screen = document.createElement('div');
  screen.className = 'phone-screen';
  phoneEl.appendChild(screen);

  const notch = document.createElement('div');
  notch.className = 'notch';
  screen.appendChild(notch);

  const status = document.createElement('div');
  status.className = 'status-bar';
  status.innerHTML = `
    <span class="st-left">23:57</span>
    <span class="st-right">📶 · <span class="st-batt">87%</span></span>
  `;
  screen.appendChild(status);
  statusTimeEl = status.querySelector('.st-left');
  statusBattEl = status.querySelector('.st-batt');

  const header = document.createElement('div');
  header.className = 'screen-header';
  const back = document.createElement('button');
  back.className = 'header-back';
  back.textContent = '‹';
  header.appendChild(back);
  headerTitleEl = document.createElement('span');
  headerTitleEl.className = 'header-title';
  header.appendChild(headerTitleEl);
  const spacer = document.createElement('span');
  spacer.className = 'header-spacer';
  header.appendChild(spacer);
  screen.appendChild(header);

  screenEl = document.createElement('div');
  screenEl.className = 'screen-content';
  screen.appendChild(screenEl);

  navEl = document.createElement('nav');
  navEl.className = 'bottom-nav';
  screen.appendChild(navEl);

  app.appendChild(phoneEl);

  // 特效覆盖层
  const noise = document.createElement('div');
  noise.className = 'fx-noise';
  app.appendChild(noise);
  const tint = document.createElement('div');
  tint.className = 'fx-tint';
  app.appendChild(tint);

  back.addEventListener('click', () => {
    if (current === 'chat') router.show('menu');
    else router.show('chat');
  });

  // 后台自动推进时间（氛围：手机时间在走）
  window.setInterval(() => {
    // 只有进入游戏后才走
    if (current === 'menu' || current === 'ending') return;
    ui.updateStatus();
  }, 30000);

  router.show('menu');
  return phoneEl;
}
