// 入口：装配手机、注册剧情、隐藏启动画面

import './style.css';
import { mountPhone, router } from './ui/phone';
import { registerStory } from './story';
import { validateGraph } from './engine/narrative';
import { registerCallFlow } from './ui/ui';
import { hasSave, loadRun } from './engine/state';
import type { Speaker } from './types';

// 先注册剧情数据
registerStory();

// 有存档则恢复进度（支持刷新续玩）
if (hasSave()) loadRun();

// 开发期校验剧情图
if (import.meta.env.DEV) {
  const errors = validateGraph();
  if (errors.length) {
    console.warn('[graph] 剧情图校验发现 ' + errors.length + ' 个问题：');
    errors.forEach((e) => console.warn('  - ' + e));
  }
}

// 来电流程注册
registerCallFlow('zhou', {
  who: '周凯',
  onAccept: 'c2_aftercall_zhou',
  onDecline: 'c2_declined_zhou',
  lines: [
    { speaker: 'zhou' as Speaker, text: '哥，你终于接电话了！你他妈吓死我了，两天不回消息。' },
    { speaker: 'zhou' as Speaker, text: '周六晚上老地方，麻哥他们把火锅都订好了。你必须来，别跟我扯你困了。' },
    { speaker: 'zhou' as Speaker, text: '…还有，你最近是不是又没睡好？黑眼圈快掉地上了。那个事都一年了，你得往前看。' },
  ],
});

registerCallFlow('mom', {
  who: '妈妈',
  onAccept: 'c2_aftercall_mom',
  onDecline: 'c2_declined_mom',
  lines: [
    { speaker: 'mom' as Speaker, text: '斌斌，妈打了你好几个电话，你怎么才接。' },
    { speaker: 'mom' as Speaker, text: '上周妈给你寄的补品收到了吗？你老熬夜，妈不放心。' },
    { speaker: 'mom' as Speaker, text: '……妈知道你心里难过。但是晚晚她，也不想看到你这样。' },
  ],
});

registerCallFlow('number', {
  who: '未知号码',
  onAccept: 'c3_call_accepted',
  onDecline: 'c3_call_declined',
  lines: [
    { speaker: 'number' as Speaker, text: '……你终于接了。' },
    { speaker: 'number' as Speaker, text: '我以为你会一直躲下去。' },
    { speaker: 'number' as Speaker, text: '别挂。听我说完。那晚……不是你一个人记得。' },
  ],
});

// 挂载手机
mountPhone();

// QA 调试钩子
if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).__router = router;
}

// 隐藏启动画面
window.setTimeout(() => {
  const boot = document.querySelector('.boot');
  if (boot) boot.classList.add('hide');
  window.setTimeout(() => boot?.remove(), 1000);
}, 600);
