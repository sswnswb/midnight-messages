// 通讯录屏

import { getRun } from '../../engine/state';

interface ContactView {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  note?: string;
  cold?: boolean;
}

function contactsFor(): ContactView[] {
  const { contacts } = getRun();
  const all: Record<string, ContactView> = {
    c_unknown: { id: 'c_unknown', name: '未知号码', avatar: '？', phone: '+86 138-****-0404', note: '无备注 · 本机陌生来电', cold: true },
    c_lin: { id: 'c_lin', name: '林晚', avatar: '晚', phone: '+86 137-****-0918', note: '❤ 我的女孩 · 通话记录：去年十一月', cold: true },
    c_zhou: { id: 'c_zhou', name: '周凯', avatar: '凯', phone: '+86 139-****-7721', note: '同事 · 老骂我不出门' },
    c_doctor: { id: 'c_doctor', name: '陈医生', avatar: '陈', phone: '010-****-6158', note: '心理门诊 · 周三下午' },
    c_mom: { id: 'c_mom', name: '妈妈', avatar: '妈', phone: '+86 135-****-3302', note: '最近来电：8月9日（未接）' },
  };
  const out: ContactView[] = [];
  // 保持固定顺序：号码 → 林晚 → 其他已解锁
  const order = ['c_unknown', 'c_lin', 'c_zhou', 'c_doctor', 'c_mom'];
  for (const id of order) {
    if (contacts.includes(id) && all[id]) out.push(all[id]);
  }
  return out;
}

export function screenContacts(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'contacts-screen';
  const list = document.createElement('div');
  list.className = 'scroll-area contacts-list';

  const items = contactsFor();
  if (items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'system-note';
    empty.textContent = '（通讯录是空的）';
    list.appendChild(empty);
  }

  for (const c of items) {
    const row = document.createElement('button');
    row.className = 'contact-row' + (c.cold ? ' cold' : '');
    const av = document.createElement('div');
    av.className = 'contact-avatar';
    av.textContent = c.avatar;
    const info = document.createElement('div');
    info.className = 'contact-info';
    const name = document.createElement('div');
    name.className = 'contact-name';
    name.textContent = c.name;
    const phone = document.createElement('div');
    phone.className = 'contact-phone';
    phone.textContent = c.phone;
    const note = document.createElement('div');
    note.className = 'contact-note';
    note.textContent = c.note ?? '';
    info.append(name, phone, note);
    row.append(av, info);
    row.addEventListener('click', () => {
      if (c.id === 'c_unknown') {
        // 号码详情：无操作，仅提示
        note.textContent = '……这个号码，你越看越觉得眼熟。';
      } else if (c.id === 'c_lin') {
        note.textContent = '你点开又关上。她的头像，你不敢看太久。';
      }
    });
    list.appendChild(row);
  }

  wrap.appendChild(list);
  return wrap;
}
