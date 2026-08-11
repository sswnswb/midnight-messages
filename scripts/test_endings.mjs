// 结局系统测试：① resolveEnding 纯函数映射 ② 浏览器验证门控选项
import { chromium } from 'playwright';
import { build } from 'esbuild';
import { writeFileSync, readFileSync } from 'fs';
import { createRequire } from 'module';

// ---- ① 纯函数单元测试：打包 endings.ts 到临时 mjs ----
await build({
  entryPoints: ['src/story/endings.ts'],
  bundle: true,
  outfile: 'scripts/_endings_unit.mjs',
  platform: 'node',
  format: 'esm',
  logLevel: 'silent',
});
const { resolveEnding } = await import('./_endings_unit.mjs');

const cases = [
  [{ truth: 4, help: 0, avoid: 0, care: 1, silent: 0 }, 'confess', '高直面'],
  [{ truth: 2, help: 4, avoid: 0, care: 1, silent: 0 }, 'therapy', '求助主导'],
  [{ truth: 1, help: 0, avoid: 4, care: 0, silent: 0 }, 'loop', '逃避主导'],
  [{ truth: 4, help: 0, avoid: 0, care: 5, silent: 0 }, 'merge', '高在意+高直面'],
  [{ truth: 0, help: 0, avoid: 0, care: 0, silent: 4 }, 'silence', '彻底沉默'],
  [{ truth: 3, help: 0, avoid: 0, care: 3, silent: 0 }, 'confess', '中等直面（未到隐藏门槛）'],
  [{ truth: 3, help: 0, avoid: 0, care: 4, silent: 0 }, 'awakening', '二周目+全结局+高直面高在意', true],
];
let ok = true;
for (const [p, expected, label, isAwakening] of cases) {
  const got = resolveEnding(p, { newGamePlus: !!isAwakening, allBaseUnlocked: !!isAwakening });
  const pass = got === expected;
  if (!pass) ok = false;
  console.log(`${pass ? '✅' : '❌'} ${label}: 人格${JSON.stringify(p)} → 「${got}」${pass ? '' : `(期望 ${expected})`}`);
}

// ---- ② 浏览器测试：门控选项按人格显示 ----
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(e.message));

async function checkGates(traits, expectedVisible, label) {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1500);
  const run = {
    flags: { ...traits },
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
  };
  await page.evaluate((r) => {
    localStorage.setItem('wywlx_save_v1', JSON.stringify(r));
    localStorage.setItem('wywlx_meta_v1', JSON.stringify({ endings: [], newGamePlus: false }));
  }, run);
  await page.reload();
  await page.waitForTimeout(1500);
  await page.click('.menu-btn >> text=继续上一夜');
  await page.locator('.choice-btn').first().waitFor({ timeout: 9000 });
  const texts = await page.locator('.choice-btn').allTextContents();
  const allOk = expectedVisible.every((s) => texts.some((t) => t.includes(s)));
  const forbiddenOk = !texts.some((t) => t.includes('恢复出厂') && !expectedVisible.includes('恢复出厂'));
  console.log(`${allOk && forbiddenOk ? '✅' : '❌'} ${label}: 可见选项 ${expectedVisible.length}/${expectedVisible.length} 匹配`);
  if (!allOk || !forbiddenOk) {
    ok = false;
    console.log('    实际选项:', texts.map((t) => t.slice(0, 12)));
  }
}

await checkGates({ trait_truth: 4, trait_care: 0, trait_help: 0, trait_avoid: 0 }, ['派出所', '就这样坐着'], '高直面→能看到自首行动，看不到逃避');
await checkGates({ trait_truth: 0, trait_help: 0, trait_care: 0, trait_avoid: 4 }, ['恢复出厂', '就这样坐着'], '高逃避→能看到恢复出厂，看不到直面');
await checkGates({ trait_truth: 0, trait_help: 0, trait_care: 0, trait_silent: 3 }, ['什么都不做', '就这样坐着'], '高沉默→能看到沉默选项');

// ③ 浏览器：从 c5s5w 走完到结局，验证 resolveEnding 一致
await page.goto('http://localhost:5173/');
await page.waitForTimeout(1500);
await page.evaluate(() => {
  localStorage.setItem(
    'wywlx_save_v1',
    JSON.stringify({
      flags: { trait_truth: 4, trait_avoid: 0, trait_care: 1, trait_help: 0 },
      currentNode: 'c5s5w',
      chapter: 5,
      readCount: 30,
      time: 0,
      notes: ['n_onboarding'],
      photos: ['p_home'],
      contacts: ['c_unknown'],
      calls: [],
      draftsUnlocked: true,
      roomViewed: 0,
    }),
  );
  localStorage.setItem('wywlx_meta_v1', JSON.stringify({ endings: [], newGamePlus: false }));
});
await page.reload();
await page.waitForTimeout(1500);
await page.click('.menu-btn >> text=继续上一夜');
await page.locator('.choice-btn').first().waitFor({ timeout: 9000 });
// 点"去派出所"（trait_truth +1 → 5）
await page.locator('.choice-btn', { hasText: '派出所' }).click();
await page.locator('.ending-screen').waitFor({ timeout: 12000 });
const title = await page.locator('.ending-title').textContent();
const expected = resolveEnding({ truth: 5, help: 0, avoid: 0, care: 1, silent: 0 }, { newGamePlus: false, allBaseUnlocked: false });
console.log(`${title === '自首' ? '✅' : '❌'} 走完结局 → 「${title}」（resolveEnding 期望 ${expected}）`);
if (title !== '自首') ok = false;

console.log(pageErrors.length ? `❌ 页面错误: ${pageErrors[0]}` : '✅ 无页面错误');
await browser.close();
process.exit(ok ? 0 : 1);
