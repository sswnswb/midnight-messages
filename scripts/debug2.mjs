import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
page.on('console', (m) => {
  if (m.type() === 'error') console.log('[console.error]', m.text());
});

await page.goto('http://localhost:5173/');
await page.waitForTimeout(2000);

const run = {
  flags: { chooseConfess: true, tears: true },
  currentNode: 'c5s5',
  chapter: 5,
  readCount: 30,
  time: 0,
  notes: ['n_onboarding'],
  photos: ['p_home'],
  contacts: ['c_unknown', 'c_lin'],
  calls: [],
  draftsUnlocked: true,
  roomViewed: 0,
};
await page.evaluate((r) => {
  localStorage.setItem('wywlx_save_v1', JSON.stringify(r));
  localStorage.setItem('wywlx_meta_v1', JSON.stringify({ endings: [], newGamePlus: false }));
}, run);
await page.reload();
await page.waitForTimeout(1800);

await page.click('.menu-btn >> text=继续上一夜');
await page.locator('.choice-btn').first().waitFor({ timeout: 9000 });
const choices = await page.locator('.choice-btn').allTextContents();
console.log('choices:', choices.map((c) => c.slice(0, 14)));

const confess = page.locator('.choice-btn', { hasText: '自首' });
console.log('confess count:', await confess.count());
await confess.click();
await page.waitForTimeout(2500);

const endingCount = await page.locator('.ending-screen').count();
console.log('ending-screen count:', endingCount);
const body = await page.evaluate(() => document.querySelector('#app')?.textContent?.slice(0, 300));
console.log('app text:', body);
await page.screenshot({ path: 'qa/debug-ending.png' });

await browser.close();
