import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 440, height: 920 } });
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.log('[console]', m.text()); });

await page.goto('http://localhost:5173/');
await page.waitForTimeout(2000);
await page.evaluate(() => localStorage.clear());
await page.reload();
await page.waitForTimeout(1800);
await page.click('.menu-btn >> text=开始新的一夜');

for (let step = 1; step <= 30; step++) {
  await page.waitForTimeout(700);
  const state = await page.evaluate(() => ({
    card: !!document.querySelector('.chapter-card'),
    photo: !!document.querySelector('.photo-viewer'),
    call: !!document.querySelector('.call-ui'),
    ending: !!document.querySelector('.ending-screen'),
    choices: document.querySelectorAll('.choice-btn').length,
    typing: document.querySelector('.typing-indicator')?.style.display,
    msgs: document.querySelectorAll('.msg-row').length,
    lastMsg: (() => {
      const rows = document.querySelectorAll('.msg-row .bubble-text, .msg-row .narration .bubble-text');
      const last = rows[rows.length - 1];
      return last ? last.textContent?.slice(0, 30) : '(none)';
    })(),
  }));
  console.log(`step ${step}:`, JSON.stringify(state));
  // 动作
  if (state.card) await page.click('.chapter-card');
  else if (state.photo) await page.click('.photo-close');
  else if (state.call) {
    if (await page.locator('.call-btn.accept').count()) await page.click('.call-btn.accept');
    await page.waitForTimeout(300);
    if (await page.locator('.call-btn.hangup').count()) await page.click('.call-btn.hangup');
  }
  else if (state.choices > 0) {
    await page.locator('.choice-btn').first().click();
  }
  else {
    await page.click('.bubble-text').catch(() => {});
  }
}
await browser.close();
