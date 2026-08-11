// 浏览器自动化 QA：跑真实流程 + 注入存档直达关键画面，截图供美术自检
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const URL = 'http://localhost:5173/';
const OUT = 'qa';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
page.on('console', (m) => {
  if (m.type() === 'error') console.log('[console.error]', m.text());
});

async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('shot:', name);
}

async function gotoHome() {
  await page.goto(URL);
  await page.waitForTimeout(2000);
}

async function setRun(run, meta) {
  await page.evaluate(
    ([r, m]) => {
      localStorage.setItem('wywlx_save_v1', JSON.stringify(r));
      localStorage.setItem('wywlx_meta_v1', JSON.stringify(m));
      localStorage.removeItem('wywlx_audio');
    },
    [run, meta],
  );
}

// ---------- 1. 主菜单 ----------
await gotoHome();
await shot('01-menu');

// ---------- 2. 新游戏：第一夜开头 ----------
await page.click('.menu-btn >> text=开始新的一夜');
await page.waitForTimeout(2500);
await shot('02-chat-open');
// 跳过打字，推进几步
for (let i = 0; i < 4; i++) {
  await page.click('.bubble-text').catch(() => {});
  await page.waitForTimeout(700);
  const cc = page.locator('.chapter-card');
  if (await cc.count()) await cc.click();
  const pc = page.locator('.photo-close');
  if (await pc.count()) await pc.click();
  const ch = page.locator('.choice-btn').first();
  if (await ch.count()) await ch.click();
  await page.waitForTimeout(900);
}
await shot('03-chat-firstnight');

// ---------- 3. 手机各屏 ----------
await page.click('.nav-btn[data-screen="photos"]');
await page.waitForTimeout(700);
await shot('04-photos');
await page.click('.nav-btn[data-screen="notes"]');
await page.waitForTimeout(700);
await shot('05-notes');
await page.click('.nav-btn[data-screen="contacts"]');
await page.waitForTimeout(700);
await shot('06-contacts');
await page.evaluate(() => window.__router.show('calls'));
await page.waitForTimeout(700);
await shot('07-calls');
await page.click('.nav-btn[data-screen="settings"]');
await page.waitForTimeout(700);
await shot('08-settings');

// ---------- 4. 照片查看器（林晚蛋糕照） ----------
await page.click('.nav-btn[data-screen="photos"]');
await page.waitForTimeout(500);
const cake = page.locator('.photo-cell', { hasText: '她的生日' });
if (await cake.count()) {
  await cake.click();
  await page.waitForTimeout(900);
  await shot('09-photo-viewer');
  await page.click('.photo-close');
}

// ---------- 4b. 照片找不同谜题 ----------
await setRun(
  {
    flags: {},
    currentNode: 'c1s5',
    chapter: 1,
    readCount: 5,
    time: 0,
    notes: ['n_onboarding'],
    photos: ['p_home', 'p_lin_cake', 'p_hallway_orig'],
    contacts: ['c_unknown'],
    calls: [],
    draftsUnlocked: false,
    roomViewed: 0,
  },
  { endings: [], newGamePlus: false },
);
await page.reload();
await page.waitForTimeout(1600);
await page.click('.menu-btn >> text=继续上一夜');
await page.locator('.diff-viewer').waitFor({ timeout: 9000 });
await page.waitForTimeout(600);
await shot('15-find-diff');

// ---------- 5. 注入存档直达：故障备忘录（第三章矛盾线索） ----------
await setRun(
  {
    flags: { doubt: true, noteSeen: true },
    currentNode: 'c3s8w',
    chapter: 3,
    readCount: 10,
    time: 30,
    notes: ['n_onboarding', 'n_secret', 'n_wrong', 'n_right'],
    photos: ['p_home', 'p_lin_cake', 'p_room'],
    contacts: ['c_unknown', 'c_lin', 'c_zhou', 'c_mom'],
    calls: ['c_self'],
    draftsUnlocked: false,
    roomViewed: 1,
  },
  { endings: [], newGamePlus: false },
);
await page.reload();
await page.waitForTimeout(1600);
await page.click('.menu-btn >> text=继续上一夜');
await page.waitForTimeout(900);
await page.click('.nav-btn[data-screen="notes"]');
await page.waitForTimeout(800);
await shot('10-glitch-notes');

// ---------- 6. 草稿箱密码谜题 ----------
await setRun(
  {
    flags: {},
    currentNode: 'c4s13d',
    chapter: 4,
    readCount: 20,
    time: 0,
    notes: ['n_onboarding', 'n_secret'],
    photos: ['p_home', 'p_lin_cake'],
    contacts: ['c_unknown', 'c_lin'],
    calls: ['c_self'],
    draftsUnlocked: false,
    roomViewed: 0,
  },
  { endings: [], newGamePlus: false },
);
await page.reload();
await page.waitForTimeout(1600);
await page.click('.menu-btn >> text=继续上一夜');
await page.locator('.choice-btn').first().waitFor({ timeout: 9000 });
// 选择"去解锁草稿箱"
const unlockChoice = page.locator('.choice-btn', { hasText: '解锁草稿箱' });
if (await unlockChoice.count()) {
  await unlockChoice.click();
  await page.locator('.drafts-lock').waitFor({ timeout: 6000 });
  await page.waitForTimeout(500);
  await shot('11-drafts-lock');
  // 输入密码 1106
  for (const d of ['1', '1', '0', '6']) {
    await page.click(`.passcode-key >> text=${d}`);
    await page.waitForTimeout(220);
  }
  await page.locator('.draft-row').first().waitFor({ timeout: 6000 });
  await page.waitForTimeout(600);
  await shot('12-drafts-unlocked');
}

// ---------- 7. 结局：人格加权 → 自首 ----------
await setRun(
  {
    flags: { trait_truth: 4, trait_care: 1, trait_help: 0, trait_avoid: 0 },
    currentNode: 'c5s5w',
    chapter: 5,
    readCount: 30,
    time: 0,
    notes: ['n_onboarding'],
    photos: ['p_home'],
    contacts: ['c_unknown', 'c_lin'],
    calls: [],
    draftsUnlocked: true,
    roomViewed: 0,
  },
  { endings: [], newGamePlus: false },
);
await page.reload();
await page.waitForTimeout(1600);
await page.click('.menu-btn >> text=继续上一夜');
await page.locator('.choice-btn').first().waitFor({ timeout: 9000 });
const confess = page.locator('.choice-btn', { hasText: '派出所' });
if (await confess.count()) {
  await confess.click();
  await page.locator('.ending-screen').waitFor({ timeout: 9000 });
  await page.waitForTimeout(600);
  await shot('13-ending-confess');
  // 回主菜单看第四面墙
  await page.click('.ending-btns .menu-btn >> text=回到主菜单');
  await page.waitForTimeout(900);
  await shot('14-menu-ngp');
}

await browser.close();
console.log('done');
