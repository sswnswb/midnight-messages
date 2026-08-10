// 程序化音频引擎：环境底噪 + 事件音效 + 震动 + TTS 来电语音
// 全部用 Web Audio API 现场合成，无需任何音频素材文件。

export interface AudioSettings {
  master: number;
  ambience: number;
  sfx: number;
}

const defaultSettings: AudioSettings = { master: 0.9, ambience: 0.7, sfx: 1.0 };

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let sfxBus: GainNode | null = null;
let ambientBus: GainNode | null = null;

// 环境层（可开/关）
let ambientStarted = false;
let ambNodes: { lfo: OscillatorNode; drone: OscillatorNode; gain: GainNode } | null = null;
let heartTimer: number | null = null;
let heartbeatGain: GainNode | null = null;
let currentChapter = 1;

let settings: AudioSettings = { ...defaultSettings };
try {
  const raw = localStorage.getItem('wywlx_audio');
  if (raw) settings = { ...defaultSettings, ...JSON.parse(raw) };
} catch {
  /* ignore */
}

export function getAudioSettings(): AudioSettings {
  return { ...settings };
}

export function setAudioSettings(patch: Partial<AudioSettings>): void {
  settings = { ...settings, ...patch };
  try {
    localStorage.setItem('wywlx_audio', JSON.stringify(settings));
  } catch {
    /* ignore */
  }
  if (ctx) applyVolumes();
}

export function setChapterDensity(ch: number): void {
  currentChapter = ch;
  if (ambientStarted) rebuildAmbient();
}

/** 必须在用户手势后调用以解锁音频 */
export function initAudio(): void {
  if (ctx) {
    if (ctx.state === 'suspended') void ctx.resume();
    return;
  }
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC();
  masterGain = ctx.createGain();
  masterGain.gain.value = settings.master;
  masterGain.connect(ctx.destination);
  sfxBus = ctx.createGain();
  sfxBus.gain.value = settings.sfx;
  sfxBus.connect(masterGain);
  ambientBus = ctx.createGain();
  ambientBus.gain.value = settings.ambience;
  ambientBus.connect(masterGain);
}

function applyVolumes(): void {
  if (masterGain) masterGain.gain.setTargetAtTime(settings.master, ctx!.currentTime, 0.02);
  if (sfxBus) sfxBus.gain.setTargetAtTime(settings.sfx, ctx!.currentTime, 0.02);
  if (ambientBus) ambientBus.gain.setTargetAtTime(settings.ambience, ctx!.currentTime, 0.02);
}

// ---------- 噪声生成工具 ----------

function makeNoiseBuffer(seconds = 2): AudioBuffer {
  const buffer = ctx!.createBuffer(1, ctx!.sampleRate * seconds, ctx!.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  // 布朗噪声：低频厚重，适合深夜房间底噪
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  return buffer;
}

function playNoiseSource(duration: number, filterFreq: number, gain: number, pan = 0): void {
  const src = ctx!.createBufferSource();
  src.buffer = makeNoiseBuffer(duration);
  src.loop = true;
  const filter = ctx!.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = filterFreq;
  filter.Q.value = 0.6;
  const g = ctx!.createGain();
  g.gain.value = 0;
  g.gain.setTargetAtTime(gain, ctx!.currentTime, 0.4);
  const panner = ctx!.createStereoPanner();
  panner.pan.value = pan;
  src.connect(filter).connect(g).connect(panner).connect(sfxBus!);
  src.start();
  src.stop(ctx!.currentTime + duration + 0.6);
}

// ---------- 环境氛围 ----------

export function startAmbient(): void {
  if (!ctx || ambientStarted) return;
  ambientStarted = true;
  rebuildAmbient();
}

export function stopAmbient(): void {
  if (!ambNodes) return;
  try {
    ambNodes.lfo.stop();
    ambNodes.drone.stop();
    ambNodes.gain.disconnect();
  } catch {
    /* ignore */
  }
  ambNodes = null;
  ambientStarted = false;
}

function rebuildAmbient(): void {
  if (!ctx || !ambientStarted) return;
  if (ambNodes) {
    try {
      ambNodes.lfo.stop();
      ambNodes.drone.stop();
    } catch {
      /* ignore */
    }
  }

  const g = ctx.createGain();
  g.gain.value = 0;

  // 层1：布朗噪声低通 → 深夜房间底噪
  const noise = ctx.createBufferSource();
  noise.buffer = makeNoiseBuffer(4);
  noise.loop = true;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 180;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.5;
  noise.connect(lp).connect(noiseGain).connect(g);

  // 层2：缓慢起伏的低频嗡鸣（LFO 调制）
  const drone = ctx.createOscillator();
  drone.type = 'sine';
  drone.frequency.value = 47;
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.12;
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.07;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.06;
  lfo.connect(lfoGain).connect(droneGain.gain);
  drone.connect(droneGain).connect(g);

  // 随章节增加的第三层：更刺的嗡鸣（压抑感）
  const highDrone = ctx.createOscillator();
  highDrone.type = 'triangle';
  highDrone.frequency.value = 88 + currentChapter * 3;
  const highGain = ctx.createGain();
  highGain.gain.value = 0.018 * currentChapter;
  highDrone.connect(highGain).connect(g);

  noise.start();
  drone.start();
  lfo.start();
  highDrone.start();
  g.connect(ambientBus!);
  g.gain.setTargetAtTime(0.5, ctx.currentTime, 2.5);

  ambNodes = { lfo, drone, gain: g };
}

// ---------- 事件音效 ----------

/** 新消息通知音（按发件人区分音色） */
export function playMessage(which: 'number' | 'contact' | 'lin'): void {
  if (!ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g).connect(sfxBus!);
  g.gain.setValueAtTime(0, t);
  const base = which === 'number' ? 620 : which === 'lin' ? 820 : 720;
  o.type = which === 'number' ? 'square' : 'sine';
  o.frequency.setValueAtTime(base, t);
  o.frequency.setValueAtTime(base * 0.92, t + 0.09);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.22, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.start(t);
  o.stop(t + 0.25);
  if (which === 'number') vibrate([18, 40, 12]);
  else vibrate([10]);
}

/** 发送消息声 */
export function playSend(): void {
  if (!ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(560, t);
  o.frequency.exponentialRampToValueAtTime(760, t + 0.07);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.14, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
  o.connect(g).connect(sfxBus!);
  o.start(t);
  o.stop(t + 0.16);
}

/** 打字声 */
export function playType(): void {
  if (!ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.value = 900 + Math.random() * 500;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.035, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
  o.connect(g).connect(sfxBus!);
  o.start(t);
  o.stop(t + 0.035);
}

/** 铃声（来电） */
export function playRing(): void {
  if (!ctx) return;
  const pattern = [
    [880, 0, 0.25],
    [880, 0.38, 0.25],
    [880, 0.76, 0.25],
    [1108, 1.14, 0.35],
  ] as const;
  for (const [freq, off, dur] of pattern) {
    const t = ctx.currentTime + off;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(sfxBus!);
    o.start(t);
    o.stop(t + dur + 0.02);
  }
}

/** 恐怖冲击 + 空气感不协和 stinger */
export function playStinger(): void {
  if (!ctx) return;
  const t = ctx.currentTime;
  // 低频冲击
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(90, t);
  o.frequency.exponentialRampToValueAtTime(28, t + 1.2);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.6, t + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
  o.connect(g).connect(sfxBus!);
  o.start(t);
  o.stop(t + 1.5);
  // 不协和音簇（空气感）
  for (const [f, mult] of [[440, 1], [467, 1.007], [493.8, 1.02], [554.4, 1.04]] as const) {
    const o2 = ctx.createOscillator();
    o2.type = 'sawtooth';
    o2.frequency.value = f * (mult * 0.35 + 0.65);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.0001, t);
    g2.gain.exponentialRampToValueAtTime(0.045, t + 0.08);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1200;
    o2.connect(lp).connect(g2).connect(sfxBus!);
    o2.start(t + 0.01);
    o2.stop(t + 2);
  }
  // 高处空气感
  playNoiseSource(2.2, 800, 0.08, 0.2);
}

/** 心跳声（循环，需手动停止） */
export function startHeartbeat(): void {
  if (!ctx) return;
  stopHeartbeat();
  heartbeatGain = ctx.createGain();
  heartbeatGain.gain.value = 0;
  heartbeatGain.connect(sfxBus!);
  const thump = (when: number) => {
    const o = ctx!.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(65, when);
    o.frequency.exponentialRampToValueAtTime(38, when + 0.16);
    const g = ctx!.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(0.5, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.2);
    o.connect(g).connect(heartbeatGain!);
    o.start(when);
    o.stop(when + 0.25);
  };
  const loop = () => {
    const now = ctx!.currentTime;
    thump(now);
    thump(now + 0.28);
    heartTimer = window.setTimeout(loop, 820);
  };
  loop();
}

export function stopHeartbeat(): void {
  if (heartTimer !== null) {
    clearTimeout(heartTimer);
    heartTimer = null;
  }
  if (heartbeatGain) {
    try {
      heartbeatGain.disconnect();
    } catch {
      /* ignore */
    }
    heartbeatGain = null;
  }
}

/** 震动（Web Audio 低频脉冲模拟） */
export function vibrate(pattern: number[]): void {
  if (!ctx || !navigator.vibrate) return;
  const t = ctx.currentTime;
  for (let i = 0; i < pattern.length; i++) {
    if (i % 2 === 0) continue; // 偶数位是震动时长
    const start = t + pattern.slice(0, i).reduce((a, b) => a + b, 0) / 1000;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = 46;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.3, start + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, start + pattern[i] / 1000);
    o.connect(g).connect(sfxBus!);
    o.start(start);
    o.stop(start + pattern[i] / 1000 + 0.02);
  }
  if (navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* ignore */
    }
  }
}

/** 相册查看空房间时的"呼吸声" */
export function playBreath(): void {
  if (!ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.value = 210;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 320;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.05, t + 0.4);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
  o.connect(lp).connect(g).connect(sfxBus!);
  o.start(t);
  o.stop(t + 2.4);
}

// ---------- 来电语音（TTS） ----------

let ttsBusy = false;

export function speakText(
  text: string,
  opts: { voice?: 'normal' | 'distorted' | 'mom' | 'doctor'; onEnd?: () => void } = {},
): void {
  if (!('speechSynthesis' in window)) {
    opts.onEnd?.();
    return;
  }
  if (ttsBusy) {
    speechSynthesis.cancel();
  }
  ttsBusy = true;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN';
  u.rate = opts.voice === 'distorted' ? 0.8 : 1.0;
  u.pitch = opts.voice === 'distorted' ? 0.3 : opts.voice === 'mom' ? 1.15 : 1.0;
  u.volume = 0.9;
  const voices = speechSynthesis.getVoices();
  const zh = voices.find((v) => v.lang.toLowerCase().startsWith('zh'));
  if (zh) u.voice = zh;
  u.onend = () => {
    ttsBusy = false;
    opts.onEnd?.();
  };
  u.onerror = () => {
    ttsBusy = false;
    opts.onEnd?.();
  };
  // 失真来电用滤波器模拟电话质感
  if (opts.voice === 'distorted' && ctx) {
    const g = ctx.createGain();
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 900;
    lp.Q.value = 1.4;
    g.gain.value = 0.6;
    const dest = ctx.createMediaStreamDestination();
    lp.connect(g).connect(dest);
    g.connect(dest);
    // 不可直接接入 TTS，此处仅预创建节点——简单起见 TTS 走系统输出
    g.disconnect();
  }
  speechSynthesis.speak(u);
}

export function cancelSpeech(): void {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  ttsBusy = false;
}
