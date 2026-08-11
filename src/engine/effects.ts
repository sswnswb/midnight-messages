// 效果指令分发器（纯逻辑，UI 通过注入的 EffectContext 驱动）
// 指令格式：'sfx:sting' | 'photo:p_hallway' | 'note:n_secret' | 'call:zhou' | 'screen:notes' ...

export interface EffectContext {
  sfx(name: string): void;
  sting(): void;
  stinglong(): void;
  glitch(dur?: number): void;
  noise(on: boolean): void;
  shake(dur?: number): void;
  time(min: number): void;
  chapter(n: number): void;
  photo(id: string): void;
  photoOpen(id: string): void;
  note(id: string): void;
  contact(id: string): void;
  calllog(id: string): void;
  banner(text: string): void;
  screen(name: string): void;
  call(who: string): void;
  typing(): Promise<void>;
  flag(name: string): void;
  count(name: string): void;
  card(no: number): Promise<void>;
  heart(on: boolean): void;
  ambient(on: boolean): void;
  noteopen(id: string): void;
  drafts(): void;
  flicker(dur?: number): void;
  revoke(): void;
  wallChange(on: boolean): void;
  silenceDrop(): void;
  presence(): void;
  voice(text: string): void;
}

/**
 * 执行一串效果指令。
 * @returns true 表示流程被消费（来电/切屏接管了后续），调用方应停止渲染本节点的消息。
 */
export async function runEffects(effects: string[] | undefined, ctx: EffectContext): Promise<boolean> {
  if (!effects) return false;
  // 消费型效果（切屏/来电）延迟到最后执行，保证同串中前面的 count/flag 等效果先生效
  let consume: { op: 'screen' | 'call'; arg: string } | null = null;
  for (const raw of effects) {
    let op: string;
    let arg: string;
    if (raw.startsWith('photo:open:')) {
      // 两段式指令：photo:open:<id>
      op = 'photo:open';
      arg = raw.slice('photo:open:'.length);
    } else {
      const i = raw.indexOf(':');
      op = i < 0 ? raw : raw.slice(0, i);
      arg = i < 0 ? '' : raw.slice(i + 1);
    }
    switch (op) {
      case 'call':
        consume = { op: 'call', arg };
        break;
      case 'screen':
        consume = { op: 'screen', arg };
        break;
      case 'card':
        await ctx.card(Number(arg));
        break;
      case 'typing':
        await ctx.typing();
        break;
      case 'sfx':
        ctx.sfx(arg);
        break;
      case 'sting':
        ctx.sting();
        break;
      case 'stinglong':
        ctx.stinglong();
        break;
      case 'glitch':
        ctx.glitch(arg ? Number(arg) : undefined);
        break;
      case 'noise':
        ctx.noise(arg === 'on' || arg === '1');
        break;
      case 'shake':
        ctx.shake(arg ? Number(arg) : undefined);
        break;
      case 'time':
        ctx.time(arg ? Number(arg) : 1);
        break;
      case 'chapter':
        ctx.chapter(Number(arg));
        break;
      case 'photo':
        ctx.photo(arg);
        break;
      case 'photo:open':
        ctx.photoOpen(arg);
        break;
      case 'note':
        ctx.note(arg);
        break;
      case 'contact':
        ctx.contact(arg);
        break;
      case 'calllog':
        ctx.calllog(arg);
        break;
      case 'banner':
        ctx.banner(arg);
        break;
      case 'flag':
        ctx.flag(arg);
        break;
      case 'count':
        ctx.count(arg);
        break;
      case 'heart':
        ctx.heart(arg === 'on');
        break;
      case 'ambient':
        ctx.ambient(arg === 'on' || arg === '1');
        break;
      case 'noteopen':
        ctx.noteopen(arg);
        break;
      case 'drafts':
        ctx.drafts();
        break;
      case 'flicker':
        ctx.flicker(arg ? Number(arg) : undefined);
        break;
      case 'msgrevoke':
        ctx.revoke();
        break;
      case 'wallchange':
        ctx.wallChange(arg !== 'off');
        break;
      case 'silence':
        ctx.silenceDrop();
        break;
      case 'presence':
        ctx.presence();
        break;
      case 'voice':
        ctx.voice(arg);
        break;
    }
  }
  // 消费型效果最后执行，接管后续流程
  if (consume) {
    if (consume.op === 'call') ctx.call(consume.arg);
    else ctx.screen(consume.arg);
    return true;
  }
  return false;
}
