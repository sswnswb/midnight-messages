// 五个结局全部可达性测试：注入存档直达最终抉择，分别点选各结局
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

async function gotoVerdict(flags) {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1600);
  const run = {
    flags,
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
  await page.waitForTimeout(1600);
  await page.click('.menu-btn >> text=继续上一夜');
  await page.locator('.choice-btn').first().waitFor({ timeout: 9000 });
}

const cases = [
  ['confess', { chooseConfess: true }, '自首'],
  ['therapy', { chooseTherapy: true }, '陈医生'],
  ['loop', { chooseLoop: true }, '删掉所有'],
  ['merge', { tears: true }, '原谅我自己'],
  ['silence', { chooseSilence: true }, '不回复'],
];

let ok = true;
for (const [id, flags, label] of cases) {
  await gotoVerdict(flags);
  const opt = page.locator('.choice-btn', { hasText: label });
  if (!(await opt.count())) {
    console.log(`❌ ${id}: 找不到选项「${label}」`);
    ok = false;
    continue;
  }
  await opt.click();
  await page.locator('.ending-screen').waitFor({ timeout: 12000 });
  const title = await page.locator('.ending-title').textContent();
  const expected = { confess: '自首', therapy: '面对', loop: '循环', merge: '我们', silence: '沉默' }[id];
  const pass = title === expected;
  if (!pass) ok = false;
  console.log(`${pass ? '✅' : '❌'} ${id} → 「${title}」${pass ? '' : `(期望 ${expected})`}`);
}

console.log(errors.length ? `❌ 页面错误 ${errors.length}: ${errors[0]}` : '✅ 无页面错误');
await browser.close();
process.exit(ok ? 0 : 1);
