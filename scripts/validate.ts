// 开发期剧情图校验：死链、缺失节点、end 格式
import { registerStory } from '../src/story';
import { getNode, getChapters, validateGraph } from '../src/engine/narrative';
import { getRun } from '../src/engine/state';

registerStory();

const errors = validateGraph();
console.log(`[validate] 节点总数: ${getChapters().reduce((a, c) => a + c.nodes.length, 0)}`);
console.log(`[validate] 章节数: ${getChapters().length}`);

// 额外检查：起始节点
const start = getNode('c1s1');
if (!start) errors.push('起始节点 c1s1 不存在');

// 检查每个含 choices 的节点至少有一个无条件可选项（避免死胡同）
for (const ch of getChapters()) {
  for (const node of ch.nodes) {
    if (node.choices?.length) {
      const hasUncond = node.choices.some((c) => !c.cond);
      const hasScreenOrCall = node.choices.some((c) =>
        c.effect?.some((e) => e.startsWith('call:') || e.startsWith('screen:') || e.startsWith('timed:')),
      );
      if (!hasUncond && !hasScreenOrCall) {
        errors.push(`节点「${node.id}」的所有选项都有条件或都会被切屏消费，可能死胡同`);
      }
    }
  }
}

// 检查死路节点：无选项、无 next、无 end（会卡住流程）
for (const ch of getChapters()) {
  for (const node of ch.nodes) {
    if (!node.choices?.length && !node.next && !node.end) {
      const consumes = node.effects?.some((e) => e.startsWith('screen:') || e.startsWith('call:') || e.startsWith('timed:'));
      if (!consumes) {
        errors.push(`节点「${node.id}」是死路：无选项/无next/无end/无接管效果`);
      }
    }
  }
}

// 检查号码消息是否都有 typing 效果（节奏）
for (const ch of getChapters()) {
  for (const node of ch.nodes) {
    if (node.speaker === 'number' && node.text) {
      const noTyping = !node.effects?.includes('typing');
      const isQuick = node.text.length < 8;
      if (noTyping && !isQuick) {
        errors.push(`号码节点「${node.id}」较长但缺少 typing 效果`);
      }
    }
  }
}

if (errors.length) {
  console.error('[validate] 发现问题：');
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log('[validate] 剧情图校验通过 ✓');
void getRun;
