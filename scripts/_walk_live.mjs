// v3 端到端自动通关测试：序章 → 五章 → 人格+证据加权结局
// 覆盖：多差异找茬、日期推导、求助支线、3:33 等待、限时判断、时间线拼图、草稿箱密码
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text());
});

await page.goto('https://sswnswb.github.io/midnight-messages/');
await page.waitForTimeout(2000);
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.waitForTimeout(1800);
await page.click('.menu-btn >> text=开始新的一夜');

// 优先选择：走"直面+收集"路径，尽量触发各谜题机制
const PRIORITY = [
  '*都看过了。有些事',
  '*把它收进证据册',
  '*告诉它：门缝里，多了一个人。',
  '*回答：4 月 18 日',
  '*回答：11 月 6 日',
  '是……林晚发的。她问我到家没有。',
  '……你真是我自己？',
  '我打开了，都看完了。',
  '*我拼出来了。顺序是这样。',
  '*天亮就去派出所，把一切说清楚。',
  '*就这样坐着，天快亮了。',
];

let step = 0;
let ended = false;
let sawDraftsLock = false;
let lastNode = null;
let stuckCount = 0;
let pickIdx = 0;

// 多差异找茬：三处差异的归一化中心
const DIFF_SPOTS = [
  [0.5, 0.35], // 门缝人影
  [0.155, 0.66], // 矮桌杯子
  [0.75, 0.34], // 窗帘
];

async function solveDiff() {
  const holder = page.locator('.diff-holder');
  const box = await holder.boundingBox();
  if (!box) return;
  for (const [nx, ny] of DIFF_SPOTS) {
    await page.mouse.click(box.x + box.width * nx, box.y + box.height * ny);
    await page.waitForTimeout(260);
  }
  const pc = page.locator('.diff-viewer .photo-close');
  if (await pc.count()) {
    await pc.click();
    await page.waitForTimeout(350);
  }
}

async function solveTimeline() {
  // 正确顺序：聚餐→备忘→来电31秒→未接来电→她问你→你回
  for (const lbl of ['那晚的聚餐', '你的备忘', '她来电', '她再来电', '她问你', '你回了']) {
    const card = page.locator(`.tl-card:has-text("${lbl}")`);
    if (await card.count()) {
      await card.click();
      await page.waitForTimeout(120);
    }
  }
  await page.waitForSelector('.timeline-viewer', { state: 'detached', timeout: 8000 }).catch(() => {});
}

while (step < 900) {
  step++;

  if (step % 90 === 0) {
    const probe = await page.evaluate(() => {
      const sc = document.querySelector('.screen-content');
      const rows = document.querySelectorAll('.msg-row .bubble-text');
      const last = rows[rows.length - 1];
      return {
        last: last ? last.textContent.slice(0, 18) : '(none)',
        diff: !!document.querySelector('.diff-viewer'),
        timeline: !!document.querySelector('.timeline-viewer'),
        timed: !!document.querySelector('.timed-overlay'),
        choices: document.querySelectorAll('.choice-btn').length,
      };
    });
    console.log(`[step ${step}]`, JSON.stringify(probe));
  }

  // 0. 多差异找茬：点 3 处，然后关闭
  if (await page.locator('.diff-viewer').count()) {
    await solveDiff();
    continue;
  }

  // 0b. 时间线拼图
  if (await page.locator('.timeline-viewer').count()) {
    await solveTimeline();
    continue;
  }

  // 0c. 限时判断：点第一个选项（开门）
  const timed = page.locator('.timed-overlay');
  if (await timed.count()) {
    const opt = page.locator('.timed-opt').first();
    if (await opt.count()) {
      await opt.click();
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

  // 3. 照片查看器（普通）
  const pc = page.locator('.photo-viewer .photo-close');
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
    const epi = await page.locator('.ending-epi-body').textContent().catch(() => '');
    console.log('✅ 到达结局:', endingTitle);
    console.log('   今晚做了这些事:', epi.replace(/\n/g, ' | '));
    break;
  }

  // 6. 选项
  const choices = page.locator('.choice-btn');
  const n = await choices.count();
  if (n > 0) {
    // 卡在同一节点（如切屏选项自循环）时，轮换点下一个选项，避免死循环
    const cur = await page.evaluate(() => JSON.parse(localStorage.getItem('wywlx_save_v1') || '{}').currentNode);
    if (cur === lastNode) stuckCount++;
    else {
      stuckCount = 0;
      lastNode = cur;
    }
    if (stuckCount >= 4) {
      pickIdx = (pickIdx + 1) % n;
      stuckCount = 0;
    }
    let clicked = false;
    for (const pri of PRIORITY) {
      const target = page.locator('.choice-btn', { hasText: pri });
      if (await target.count()) {
        await target.click();
        pickIdx = 0;
        clicked = true;
        break;
      }
    }
    if (!clicked) {
      const curN = await choices.count();
      const idx = Math.min(pickIdx, Math.max(0, curN - 1));
      await choices.nth(idx).click({ timeout: 2500 }).catch(() => {});
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
