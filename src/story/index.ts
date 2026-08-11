// 剧情注册入口

import { registerChapter } from '../engine/narrative';
import { ch0 } from './ch0';
import { ch1 } from './ch1';
import { ch2 } from './ch2';
import { ch3 } from './ch3';
import { ch4 } from './ch4';
import { ch5 } from './ch5';

export function registerStory(): void {
  registerChapter(ch0);
  registerChapter(ch1);
  registerChapter(ch2);
  registerChapter(ch3);
  registerChapter(ch4);
  registerChapter(ch5);
}
