import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warn') console.log('[' + m.type() + ']', m.text());
});

await page.goto('http://localhost:5173/');
await page.waitForTimeout(2000);

const run = {
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
};
await page.evaluate(
  (r) => {
    localStorage.setItem('wywlx_save_v1', JSON.stringify(r));
    localStorage.setItem('wywlx_meta_v1', JSON.stringify({ endings: [], newGamePlus: false }));
  },
  run,
);
await page.reload();
await page.waitForTimeout(1800);

// 打印菜单按钮
const btns = await page.locator('.menu-btn').allTextContents();
console.log('menu buttons:', btns);

await page.click('.menu-btn >> text=继续上一夜');
await page.waitForTimeout(1500);

const choices = await page.locator('.choice-btn').allTextContents();
console.log('choices:', choices);
const screen = await page.evaluate(() => {
  const cur = document.querySelector('.screen-content');
  return cur ? cur.className + ' | ' + (cur.textContent || '').slice(0, 200) : 'NO SCREEN';
});
console.log('screen:', screen);

await browser.close();
