// 打字机逐字引擎：控制文本揭示节奏，支持标点停顿、跳过、完成回调

import { playType } from './audio';

export interface TypewriterOptions {
  speed?: number; // 每字毫秒
  onDone?: () => void;
  audio?: boolean;
}

export class Typewriter {
  private el: HTMLElement;
  private text: string;
  private idx = 0;
  private timer: number | null = null;
  private done = false;
  private opts: TypewriterOptions;
  private clickHandler: () => void;

  constructor(el: HTMLElement, text: string, opts: TypewriterOptions = {}) {
    this.el = el;
    this.text = text;
    this.opts = opts;
    this.el.textContent = '';
    this.clickHandler = () => this.skip();
    this.el.addEventListener('click', this.clickHandler);
    this.type();
  }

  private type(): void {
    if (this.idx >= this.text.length) {
      this.finish();
      return;
    }
    const ch = this.text[this.idx];
    this.el.textContent += ch;
    this.idx++;
    if (this.opts.audio && !this.isPunct(ch)) playType();
    let delay = this.opts.speed ?? 34;
    if (this.isLongPunct(ch)) delay = 520;
    else if (this.isPunct(ch)) delay = 260;
    this.timer = window.setTimeout(() => this.type(), delay);
  }

  private isPunct(ch: string): boolean {
    return /[，。！？、；：……"”】—…\s]/.test(ch);
  }

  private isLongPunct(ch: string): boolean {
    return /[。！？……—]/.test(ch);
  }

  skip(): void {
    if (this.timer) clearTimeout(this.timer);
    if (!this.done) {
      this.el.textContent = this.text;
      this.idx = this.text.length;
      this.finish();
    }
  }

  private finish(): void {
    if (this.done) return;
    this.done = true;
    if (this.timer) clearTimeout(this.timer);
    this.el.removeEventListener('click', this.clickHandler);
    this.opts.onDone?.();
  }

  isDone(): boolean {
    return this.done;
  }

  destroy(): void {
    if (this.timer) clearTimeout(this.timer);
    this.el.removeEventListener('click', this.clickHandler);
  }
}
