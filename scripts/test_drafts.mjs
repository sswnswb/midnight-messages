// 复现：草稿箱解锁 → "回到短信继续" 后，故事是否卡住
// 测两条路径：c4s13d（相信路径）与 c4s14b（拉黑路径）
import { chromium } from 'playwright';

const URL = 'http://localhost:5173/';

function saveAt(nodeId, flags, notes, contacts) {
  return {
    flags,
    currentNode: nodeId,
    chapter: 4,
    readCount: 20,
    time: 0,
    notes: notes || ['n_onboarding', 'n_secret', 'n_right'],
    photos: ['p_home', 'p_lin_cake'],
    contacts: contacts || ['c_unknown', 'c_lin', 'c_zhou'],
    calls: ['c_self'],
    draftsUnlocked: false,
    roomViewed: 0,
  };
}

const browser = await chromium.launch();

async function runPath(name, nodeId, flags, unlockChoiceText, afterUnlockProbe) {
  const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  await page.goto(URL);
  await page.waitForTimeout(1800);
  await page.evaluate(
    ([r]) => {
      localStorage.setItem('wywlx_save_v1', JSON.stringify(r));
      localStorage.setItem('wywlx_meta_v1', JSON.stringify({ endings: [], newGamePlus: false }));
      localStorage.removeItem('wywlx_audio');
    },
    [saveAt(nodeId, flags)],
  );
  await page.reload();
  await page.waitForTimeout(1500);
  await page.click('.menu-btn >> text=继续上一夜');
  await page.locator('.choice-btn').first().waitFor({ timeout: 9000 });

  console.log(`\n=== 路径: ${name} (节点 ${nodeId}) ===`);
  console.log('初始选项:', await page.locator('.choice-btn').allTextContents());

  // 点解锁草稿箱
  const unlock = page.locator('.choice-btn', { hasText: unlockChoiceText });
  if (await unlock.count()) await unlock.click();
  await page.locator('.drafts-lock').waitFor({ timeout: 6000 });
  console.log('进入草稿箱密码屏 ✅');

  // 输入密码
  for (const d of ['1', '1', '0', '6']) {
    await page.click(`.passcode-key >> text=${d}`);
    await page.waitForTimeout(200);
  }
  await page.locator('.drafts-continue').waitFor({ timeout: 6000 });
  console.log('解锁成功，看到"回到短信继续"按钮 ✅');

  // 点返回短信
  await page.click('.drafts-continue');
  await page.waitForTimeout(1200);

  const choices = page.locator('.choice-btn');
  const n = await choices.count();
  const texts = n ? await choices.allTextContents() : [];
  console.log('返回短信后的选项:', n ? texts : '(无选项!)');

  await afterUnlockProbe?.(page);
  await page.screenshot({ path: `qa/repro-${name}.png` });

  if (!n) console.log(`❌ 卡住：返回短信后没有选项`);
  else console.log(`✅ 有选项，可以继续`);
  if (errors.length) console.log('⚠️ 错误:', errors.join(' | '));
  await page.close();
  return n;
}

// 路径 A：相信 → c4s13d
const nA = await runPath('c4s13d-believe', 'c4s13d', { believe: true }, '去解锁草稿箱');

// 路径 B：拉黑 → c4s14b
const nB = await runPath('c4s14b-block', 'c4s14b', { blockAgain: true }, '回到草稿箱');

await browser.close();
console.log(`\n结果: A=${nA}个选项, B=${nB}个选项`);
