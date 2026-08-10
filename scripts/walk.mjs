// 端到端自动通关测试：新游戏 → 一路玩到结局
// 处理：跳过打字、章节卡、照片查看器、来电（接/挂）、草稿箱密码谜题
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text());
});

await page.goto('http://localhost:5173/');
await page.waitForTimeout(2000);
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.waitForTimeout(1800);

await page.click('.menu-btn >> text=开始新的一夜');

// 优先选择的文案（走"真结局"路线）
const PRIORITY = ['我打开了，都看完了', '4 月 18 日', '眼泪掉在屏幕上', '你真是我自己', '是……林晚发的', '我信我自己', '我没打过这个电话', '我自己的备忘录，我还不清楚', '自首'];

let step = 0;
let ended = false;
let sawDraftsLock = false;

while (step < 600) {
  step++;

  // 1. 草稿箱密码
  const lock = page.locator('.drafts-lock');
  if (await lock.count()) {
    if (!sawDraftsLock) {
      sawDraftsLock = true;
      for (const d of ['1', '1', '0', '6']) {
        await page.click(`.passcode-key >> text=${d}`);
        await page.waitForTimeout(180);
      }
      await page.waitForTimeout(600);
      // 已解锁 → 返回聊天
      await page.click('.header-back').catch(() => {});
      await page.waitForTimeout(500);
    }
  }

  // 2. 章节卡
  const cc = page.locator('.chapter-card');
  if (await cc.count()) {
    await cc.click();
    await page.waitForTimeout(400);
  }

  // 3. 照片查看器
  const pc = page.locator('.photo-close');
  if (await pc.count()) {
    await pc.click();
    await page.waitForTimeout(300);
  }

  // 4. 来电
  const callUi = page.locator('.call-ui');
  if (await callUi.count()) {
    const accept = page.locator('.call-btn.accept');
    if (await accept.count()) {
      await accept.click();
      await page.waitForTimeout(400);
    }
    const hang = page.locator('.call-btn.hangup');
    if (await hang.count()) {
      await hang.click();
      await page.waitForTimeout(500);
    } else {
      // 等通话台词放完
      await page.waitForTimeout(8000);
      await page.click('.call-btn.hangup').catch(() => {});
      await page.waitForTimeout(500);
    }
    continue;
  }

  // 5. 结束？
  if (await page.locator('.ending-screen').count()) {
    ended = true;
    const endingTitle = await page.locator('.ending-title').textContent().catch(() => '');
    console.log('✅ 到达结局:', endingTitle);
    break;
  }

  // 6. 选项
  const choices = page.locator('.choice-btn');
  const n = await choices.count();
  if (n > 0) {
    let clicked = false;
    for (const pri of PRIORITY) {
      const target = page.locator('.choice-btn', { hasText: pri });
      if (await target.count()) {
        await target.click();
        clicked = true;
        break;
      }
    }
    if (!clicked) {
      await choices.first().click();
    }
    await page.waitForTimeout(400);
    continue;
  }

  // 7. 跳过打字（点最后一条正在打字的消息）
  const lastBubble = page.locator('.bubble-text').last();
  if (await lastBubble.count()) {
    await lastBubble.click({ position: { x: 5, y: 5 } }).catch(() => {});
  }
  await page.waitForTimeout(350);
}

console.log('step count:', step);
if (!ended) {
  const screen = await page.evaluate(() => document.querySelector('.screen-content')?.textContent?.slice(0, 120) || '');
  console.log('❌ 未到达结局。当前屏幕:', screen);
}
if (errors.length) {
  console.log('❌ 发现 ' + errors.length + ' 个错误：');
  errors.forEach((e) => console.log('   ' + e));
} else {
  console.log('✅ 无页面/控制台错误');
}

await browser.close();
