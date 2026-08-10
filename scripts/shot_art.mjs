// 美术专项截图：相册网格 + 每张照片查看器
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
await page.goto('http://localhost:5173/');
await page.waitForTimeout(2000);

await page.evaluate(() => {
  const run = {
    flags: {},
    currentNode: 'c1s1',
    chapter: 1,
    readCount: 0,
    time: 0,
    notes: ['n_onboarding'],
    photos: ['p_home', 'p_lin_cake', 'p_lin_window', 'p_nightout', 'p_room', 'p_hallway', 'p_crash'],
    contacts: ['c_unknown'],
    calls: [],
    draftsUnlocked: false,
    roomViewed: 0,
  };
  localStorage.setItem('wywlx_save_v1', JSON.stringify(run));
  localStorage.setItem('wywlx_meta_v1', JSON.stringify({ endings: [], newGamePlus: false }));
});
await page.reload();
await page.waitForTimeout(1600);
await page.click('.menu-btn >> text=继续上一夜');
await page.waitForTimeout(600);
await page.evaluate(() => window.__router.show('photos'));
await page.waitForTimeout(900);
await page.screenshot({ path: 'qa/20-photos-grid.png' });
console.log('shot 20-photos-grid');

// 逐张打开
for (const [name, title] of [
  ['p_lin_cake', '她的生日'],
  ['p_lin_window', '窗边'],
  ['p_hallway', '走廊'],
  ['p_crash', '现场'],
  ['p_room', '空房间'],
]) {
  const cell = page.locator('.photo-cell', { hasText: title });
  if (await cell.count()) {
    await cell.click();
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `qa/21-photo-${name}.png` });
    console.log('shot', name);
    await page.click('.photo-close');
    await page.waitForTimeout(500);
  }
}

await browser.close();
console.log('done');
