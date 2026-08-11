// v2 端到端自动通关测试：序章 → 五章 → 人格加权结局
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

// 优先选择：走"直面+逃避混合"路径，尽量触发各谜题机制
const PRIORITY = [
  '*都看过了。有些事',
  '*告诉它：门缝里，多了一个人。',
  '*直接回答：4 月 18 日',
  '11 月 6 日。车祸那天。',
  '是……林晚发的。',
  '*眼泪掉在屏幕上',
  '……你真是我自己？',
  '我打开了，都看完了。',
  '我自己的备忘录，我还不清楚？',
  '我没打过这个电话！',
  '*我什么都没看到。',
  '*天亮就去派出所，把一切说清楚。',
  '*就这样坐着，天快亮了。',
];

let step = 0;
let ended = false;
let sawDraftsLock = false;

while (step < 700) {
  step++;

  if (step % 60 === 0) {
    const probe = await page.evaluate(() => {
      const sc = document.querySelector('.screen-content');
      const rows = document.querySelectorAll('.msg-row .bubble-text');
      const last = rows[rows.length - 1];
      return {
        last: last ? last.textContent.slice(0, 20) : '(none)',
        chat: !!document.querySelector('.chat-screen'),
        notes: !!document.querySelector('.notes-screen'),
        photos: !!document.querySelector('.photos-screen'),
        choices: document.querySelectorAll('.choice-btn').length,
        text: sc?.textContent?.slice(0, 40) || '',
      };
    });
    console.log(`[step ${step}]`, JSON.stringify(probe));
  }

  // 0. 找不同谜题：点差异位置，然后关闭
  const diff = page.locator('.diff-viewer');
  if (await diff.count()) {
    try {
      const box = await page.locator('.diff-holder').boundingBox();
      if (box) {
        await page.mouse.click(box.x + box.width * 0.52, box.y + box.height * 0.35);
        await page.waitForTimeout(400);
      }
    } catch {
      /* ignore */
    }
    const pc = page.locator('.diff-viewer .photo-close');
    if (await pc.count()) {
      await pc.click();
      await page.waitForTimeout(400);
    }
    continue;
  }

  // 1. 草稿箱密码
  const lock = page.locator('.drafts-lock');
  if (await lock.count()) {
    if (!sawDraftsLock) {
      sawDraftsLock = true;
      for (const d of ['1', '1', '0', '6']) {
        await page.click(`.passcode-key >> text=${d}`);
        await page.waitForTimeout(150);
      }
      await page.waitForTimeout(500);
      // 解锁后回短信
      await page.click('.drafts-continue').catch(() => {});
      await page.waitForTimeout(400);
    }
  }

  // 2. 章节卡
  const cc = page.locator('.chapter-card');
  if (await cc.count()) {
    await cc.click();
    await page.waitForTimeout(300);
  }

  // 3. 照片查看器
  const pc = page.locator('.photo-close');
  if (await pc.count()) {
    await pc.click();
    await page.waitForTimeout(250);
  }

  // 4. 来电
  const callUi = page.locator('.call-ui');
  if (await callUi.count()) {
    const accept = page.locator('.call-btn.accept');
    if (await accept.count()) {
      await accept.click();
      await page.waitForTimeout(300);
    }
    const hang = page.locator('.call-btn.hangup');
    if (await hang.count()) {
      await hang.click();
      await page.waitForTimeout(400);
    } else {
      await page.waitForTimeout(7000);
      await page.click('.call-btn.hangup').catch(() => {});
      await page.waitForTimeout(400);
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

  // 7. 若不在短信屏（探索切走了），点返回回短信继续
  if (!(await page.locator('.chat-screen').count())) {
    await page.click('.header-back').catch(() => {});
    await page.waitForTimeout(300);
    continue;
  }

  // 8. 跳过打字（点最后一条）
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
