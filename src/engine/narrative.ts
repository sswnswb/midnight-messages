// 叙事数据注册表：纯数据层，不做任何 UI 操作

import type { Chapter, StoryNode } from '../types';

const registry = new Map<string, StoryNode>();
const chapters: Chapter[] = [];

export function registerChapter(chapter: Chapter): void {
  chapters.push(chapter);
  for (const node of chapter.nodes) {
    if (registry.has(node.id)) {
      console.warn(`[narrative] 重复节点 id: ${node.id}`);
    }
    registry.set(node.id, node);
  }
}

export function getNode(id: string): StoryNode | undefined {
  return registry.get(id);
}

export function getChapter(no: number): Chapter | undefined {
  return chapters.find((c) => c.id === no);
}

export function getChapters(): Chapter[] {
  return chapters;
}

export function validateGraph(): string[] {
  const errors: string[] = [];
  for (const [id, node] of registry) {
    for (const ch of node.choices ?? []) {
      if (!registry.has(ch.go)) {
        errors.push(`节点「${id}」的选择指向不存在的节点「${ch.go}」`);
      }
    }
    if (node.next && !registry.has(node.next) && !/^ending:/.test(node.next)) {
      errors.push(`节点「${id}」的 next 指向不存在的节点「${node.next}」`);
    }
    if (node.end && !/^ending:/.test(node.end)) {
      errors.push(`节点「${id}」的 end 字段格式应为 ending:xxx`);
    }
  }
  return errors;
}
