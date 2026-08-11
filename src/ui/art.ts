// 程序化电影感美术 v2：为每个照片 id 绘制氛围场景
// 设计原则：电影感调色 + 光斑景深 + 精致剪影 + 细噪点，努力让"程序图"接近实拍照片气质。

type Scene = 'city' | 'hallway' | 'hallway_orig' | 'portrait' | 'accident' | 'room' | 'window' | 'cake' | 'wallpaper' | 'anomaly';

const SCENES: Record<string, Scene> = {
  p_home: 'city',
  p_lin_cake: 'cake',
  p_lin_window: 'window',
  p_hallway: 'hallway',
  p_hallway_orig: 'hallway_orig',
  p_crash: 'accident',
  p_room: 'room',
  p_nightout: 'city',
  p_wall: 'wallpaper',
  p_333: 'anomaly',
};

function pickScene(id: string): Scene {
  return SCENES[id] ?? 'city';
}

// ---------- 基础工具 ----------

function bg(ctx: CanvasRenderingContext2D, w: number, h: number, stops: [number, string][]): void {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  for (const [off, color] of stops) g.addColorStop(off, color);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

/** 径向光源（用于光斑/辉光） */
function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, a = 1): void {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, color.replace(/[\d.]+\)$/, '0)'));
  ctx.globalAlpha = a;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

/** 散景光斑 */
function bokeh(ctx: CanvasRenderingContext2D, w: number, h: number, count: number, color: string, minR: number, maxR: number): void {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = minR + Math.random() * (maxR - minR);
    glow(ctx, x, y, r, color, 0.25 + Math.random() * 0.3);
  }
}

/** 细胶片噪点 */
function grain(ctx: CanvasRenderingContext2D, w: number, h: number, alpha = 0.32): void {
  for (let i = 0; i < w * h * 0.03; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * alpha * 0.06})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.1, 1.1);
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * alpha * 0.06})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.1, 1.1);
  }
}

function vignette(ctx: CanvasRenderingContext2D, w: number, h: number, strength = 0.5): void {
  const g = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.95);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

/** 色偏（冷/暖） */
function grade(ctx: CanvasRenderingContext2D, w: number, h: number, tint: string, amount: number): void {
  ctx.fillStyle = tint;
  ctx.globalAlpha = amount;
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
}

/** 高光柔化：横向光斑扫过（镜头耀斑） */
function flare(ctx: CanvasRenderingContext2D, w: number, h: number, x: number, y: number, len: number, color: string): void {
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, len, 4, 0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

/** 人物剪影（简单可读的侧面/背影） */
function figure(ctx: CanvasRenderingContext2D, cx: number, baseY: number, scale: number, color: string): void {
  ctx.save();
  ctx.translate(cx, baseY);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  // 头
  ctx.beginPath();
  ctx.arc(0, -46, 14, 0, Math.PI * 2);
  ctx.fill();
  // 身体（微含肩，望向一侧）
  ctx.beginPath();
  ctx.moveTo(-17, -33);
  ctx.quadraticCurveTo(-24, -8, -20, 20);
  ctx.lineTo(20, 20);
  ctx.quadraticCurveTo(24, -8, 17, -33);
  ctx.closePath();
  ctx.fill();
  // 头与身之间过渡
  ctx.beginPath();
  ctx.arc(0, -30, 16, Math.PI, 0);
  ctx.fill();
  ctx.restore();
}

// ---------- 各场景 ----------

function sceneCake(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // 生日：暖色蜡烛光 + 蛋糕 + 窗外夜晚
  bg(ctx, w, h, [
    [0, '#241a20'],
    [0.6, '#19131a'],
    [1, '#0d0a10'],
  ]);
  // 窗外夜色
  const winX = w * 0.62, winY = h * 0.12, winW = w * 0.3, winH = h * 0.4;
  bg(ctx, 0, 0, [[0, '#0a0e1a'], [1, '#0a0e1a']]);
  ctx.fillStyle = '#0b1020';
  ctx.fillRect(winX - 10, winY - 10, winW + 20, winH + 20);
  const moonG = ctx.createRadialGradient(winX + winW * 0.4, winY + winH * 0.35, 2, winX + winW * 0.4, winY + winH * 0.35, 30);
  moonG.addColorStop(0, 'rgba(200,215,240,0.9)');
  moonG.addColorStop(1, 'rgba(160,175,210,0)');
  ctx.fillStyle = moonG;
  ctx.fillRect(winX - 20, winY - 20, winW + 40, winH + 40);
  ctx.strokeStyle = '#0b1020';
  ctx.lineWidth = 6;
  ctx.strokeRect(winX, winY, winW, winH);
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2, winY);
  ctx.lineTo(winX + winW / 2, winY + winH);
  ctx.stroke();
  // 桌面上蛋糕的暖光（主要光源）
  const cakeX = w * 0.34, cakeY = h * 0.6;
  glow(ctx, cakeX, cakeY - 30, 130, 'rgba(255,190,120,0.5)', 0.8);
  glow(ctx, cakeX, cakeY - 30, 60, 'rgba(255,220,160,0.5)', 0.9);
  // 蜡烛
  for (let i = -2; i <= 2; i++) {
    const cx = cakeX + i * 11;
    ctx.fillStyle = 'rgba(255,244,225,0.95)';
    ctx.fillRect(cx - 1.2, cakeY - 52, 2.4, 9);
    glow(ctx, cx, cakeY - 58, 16, 'rgba(255,210,130,0.85)');
  }
  // 蛋糕体
  const cakeG = ctx.createLinearGradient(0, cakeY - 44, 0, cakeY + 8);
  cakeG.addColorStop(0, '#b07058');
  cakeG.addColorStop(1, '#7c4638');
  ctx.fillStyle = cakeG;
  ctx.beginPath();
  ctx.moveTo(cakeX - 40, cakeY - 44);
  ctx.lineTo(cakeX + 40, cakeY - 44);
  ctx.lineTo(cakeX + 40, cakeY);
  ctx.lineTo(cakeX - 40, cakeY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillRect(cakeX - 40, cakeY - 4, 80, 5);
  // 桌面
  const tableG = ctx.createLinearGradient(0, cakeY, 0, h);
  tableG.addColorStop(0, '#1c1418');
  tableG.addColorStop(1, '#0e0a0d');
  ctx.fillStyle = tableG;
  ctx.fillRect(0, cakeY, w, h - cakeY);
  // 餐桌上的餐具剪影
  ctx.fillStyle = 'rgba(20,14,16,0.9)';
  ctx.fillRect(w * 0.78, cakeY + 6, 54, 5);
  ctx.fillRect(w * 0.13, cakeY + 12, 40, 4);
  // 前景散景（蜡烛光的暖斑）
  bokeh(ctx, w, h, 26, 'rgba(255,180,110,0.5)', 3, 14);
  // 整体暖调
  grade(ctx, w, h, 'rgba(255,150,90,0.06)', 1);
  flare(ctx, w, h, cakeX, cakeY - 40, 90, 'rgba(255,200,140,0.5)');
}

function sceneWindow(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // 窗边：人物逆光剪影 + 明亮窗光（回忆感，偏亮）
  bg(ctx, w, h, [
    [0, '#0d1526'],
    [0.55, '#16233a'],
    [1, '#0c1120'],
  ]);
  // 窗外云海
  const winX = w * 0.1, winY = h * 0.08, winW = w * 0.8, winH = h * 0.62;
  const cloudG = ctx.createLinearGradient(0, winY, 0, winY + winH);
  cloudG.addColorStop(0, 'rgba(235,238,246,0.95)');
  cloudG.addColorStop(0.5, 'rgba(205,214,232,0.85)');
  cloudG.addColorStop(1, 'rgba(150,166,196,0.6)');
  ctx.fillStyle = cloudG;
  ctx.fillRect(winX, winY, winW, winH);
  // 云层纹理
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  for (let i = 0; i < 12; i++) {
    const cx = winX + Math.random() * winW;
    const cy = winY + Math.random() * winH * 0.8;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 60 + Math.random() * 90, 16 + Math.random() * 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  // 窗框
  ctx.fillStyle = '#0a0e1a';
  ctx.fillRect(winX - 14, winY - 14, winW + 28, winH + 28);
  ctx.fillStyle = '#0c1120';
  ctx.fillRect(winX, winY, winW, winH);
  // 重新画云（在窗框内）
  const cloudG2 = ctx.createLinearGradient(0, winY, 0, winY + winH);
  cloudG2.addColorStop(0, 'rgba(235,238,246,0.95)');
  cloudG2.addColorStop(1, 'rgba(160,176,206,0.7)');
  ctx.fillStyle = cloudG2;
  ctx.fillRect(winX, winY, winW, winH);
  // 窗户十字格
  ctx.strokeStyle = '#0c1120';
  ctx.lineWidth = 10;
  ctx.strokeRect(winX, winY, winW, winH);
  ctx.beginPath();
  ctx.moveTo(w / 2, winY);
  ctx.lineTo(w / 2, winY + winH);
  ctx.moveTo(winX, winY + winH / 2);
  ctx.lineTo(winX + winW, winY + winH / 2);
  ctx.stroke();
  // 窗前人物背影（逆光）
  const fx = w * 0.5, fy = winY + winH;
  glow(ctx, w * 0.5, winY + winH * 0.5, 120, 'rgba(230,235,245,0.5)', 0.6);
  ctx.fillStyle = '#0a0d18';
  ctx.beginPath();
  ctx.arc(w * 0.5, winY + winH - 2, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w * 0.5 - 44, winY + winH + 6);
  ctx.quadraticCurveTo(w * 0.5, winY + winH - 40, w * 0.5 + 44, winY + winH + 6);
  ctx.closePath();
  ctx.fill();
  // 窗台与室内暗部
  ctx.fillStyle = '#0a0d18';
  ctx.fillRect(0, winY + winH, w, h - (winY + winH));
  ctx.fillStyle = '#131a2c';
  ctx.fillRect(winX - 20, winY + winH, winW + 40, 10);
  void fx; void fy;
}

function sceneCity(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // 深夜城市：蓝调 + 万家灯火
  bg(ctx, w, h, [
    [0, '#0a1220'],
    [0.6, '#101a2e'],
    [1, '#0d1526'],
  ]);
  // 月亮
  glow(ctx, w * 0.74, h * 0.2, 40, 'rgba(220,230,250,0.7)');
  glow(ctx, w * 0.74, h * 0.2, 14, 'rgba(240,245,255,0.95)');
  // 楼群剪影（两层）
  ctx.fillStyle = '#0b1322';
  let x = -10;
  while (x < w) {
    const bw = 26 + Math.random() * 46;
    const bh = h * (0.12 + Math.random() * 0.2);
    ctx.fillRect(x, h * 0.68 - bh, bw, bh + h * 0.32);
    x += bw + 1;
  }
  ctx.fillStyle = '#0e1728';
  let y = h * 0.6;
  while (x > -w) {
    const bw = 18 + Math.random() * 30;
    ctx.fillRect(x - bw, y, bw, h - y);
    x -= bw + 1;
  }
  // 亮窗
  ctx.fillStyle = 'rgba(255,214,150,0.55)';
  for (let i = 0; i < 80; i++) {
    const wx = Math.random() * w;
    const wy = h * 0.3 + Math.random() * h * 0.36;
    ctx.fillRect(wx, wy, 2, 3);
  }
  ctx.fillStyle = 'rgba(160,180,215,0.4)';
  for (let i = 0; i < 40; i++) {
    ctx.fillRect(Math.random() * w, Math.random() * h * 0.3, 2, 3);
  }
  // 灯光辉光
  for (let i = 0; i < 14; i++) {
    glow(ctx, Math.random() * w, h * 0.3 + Math.random() * h * 0.4, 3 + Math.random() * 5, 'rgba(255,200,120,0.4)');
  }
  // 前景雨丝
  ctx.strokeStyle = 'rgba(180,200,230,0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 40; i++) {
    const sx = Math.random() * w;
    const sy = Math.random() * h;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - 3, sy + 12);
    ctx.stroke();
  }
  grade(ctx, w, h, 'rgba(120,160,230,0.05)', 1);
  flare(ctx, w, h, w * 0.74, h * 0.2, 120, 'rgba(210,225,250,0.4)');
}

// 找不同·矮桌（照片里多了一个杯子）
function sideTable(ctx: CanvasRenderingContext2D, w: number, h: number, withCup: boolean): void {
  const tx = w * 0.15, ty = h * 0.58, tw = w * 0.1, th = h * 0.14;
  ctx.fillStyle = 'rgba(18,24,38,0.92)';
  ctx.fillRect(tx - tw / 2, ty, tw, th);
  ctx.fillStyle = 'rgba(12,16,28,0.92)';
  ctx.fillRect(tx - tw / 2 + 3, ty + th - 3, 3, 9);
  ctx.fillRect(tx + tw / 2 - 6, ty + th - 3, 3, 9);
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(tx - tw / 2 - 2, ty + th + 4, tw + 4, 4);
  if (withCup) {
    // 杯身 + 手柄（暗色剪影，不该在的位置）
    ctx.fillStyle = 'rgba(150,165,200,0.32)';
    ctx.fillRect(tx - 4, ty - 12, 8, 12);
    ctx.beginPath();
    ctx.arc(tx + 6, ty - 8, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(205,220,250,0.16)';
    ctx.fillRect(tx - 2, ty - 12, 4, 12);
  }
}

// 找不同·右侧窗（照片里窗帘被拉上）
function sideWindow(ctx: CanvasRenderingContext2D, w: number, h: number, curtain: boolean): void {
  const wx = w * 0.64, wy = h * 0.14, ww = w * 0.2, wh = h * 0.34;
  if (curtain) {
    const cg = ctx.createLinearGradient(wx, 0, wx + ww, 0);
    cg.addColorStop(0, 'rgba(8,10,16,0.95)');
    cg.addColorStop(0.5, 'rgba(16,20,30,0.95)');
    cg.addColorStop(1, 'rgba(8,10,16,0.95)');
    ctx.fillStyle = cg;
    ctx.fillRect(wx, wy, ww, wh);
    ctx.strokeStyle = 'rgba(120,135,170,0.12)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(wx + (ww / 4) * i, wy);
      ctx.lineTo(wx + (ww / 4) * i, wy + wh);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(150,165,200,0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(wx, wy, ww, wh);
  } else {
    const wg = ctx.createLinearGradient(0, wy, 0, wy + wh);
    wg.addColorStop(0, 'rgba(150,165,200,0.22)');
    wg.addColorStop(1, 'rgba(100,120,165,0.12)');
    ctx.fillStyle = wg;
    ctx.fillRect(wx, wy, ww, wh);
    ctx.fillStyle = 'rgba(6,8,14,0.9)';
    ctx.fillRect(wx - 4, wy, 6, wh);
    ctx.fillRect(wx + ww - 2, wy, 6, wh);
    ctx.strokeStyle = 'rgba(170,185,215,0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(wx, wy, ww, wh);
    ctx.beginPath();
    ctx.moveTo(wx + ww / 2, wy);
    ctx.lineTo(wx + ww / 2, wy + wh);
    ctx.stroke();
  }
}

function sceneHallway(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // 走廊（恐怖）：透视灭点 + 门缝光 + 门后虚影 + 三处"不该有"的差异
  bg(ctx, w, h, [[0, '#0a0e18'], [1, '#080b12']]);
  const vx = w * 0.5, vy = h * 0.34;
  // 墙面与地面分界（带纵深渐变）
  const wallG = ctx.createLinearGradient(0, 0, 0, vy);
  wallG.addColorStop(0, '#0b0f1a');
  wallG.addColorStop(1, '#0a0d16');
  ctx.fillStyle = wallG;
  ctx.fillRect(0, 0, w, vy);
  const floorG = ctx.createLinearGradient(0, vy, 0, h);
  floorG.addColorStop(0, '#101524');
  floorG.addColorStop(0.6, '#0d111c');
  floorG.addColorStop(1, '#0a0d14');
  ctx.fillStyle = floorG;
  ctx.fillRect(0, vy, w, h - vy);
  // 透视线（地面）
  ctx.strokeStyle = 'rgba(150,165,200,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(i * (w / 10), h);
    ctx.lineTo(vx, vy);
    ctx.stroke();
  }
  // 墙面接缝（水平）
  ctx.strokeStyle = 'rgba(150,165,200,0.05)';
  ctx.beginPath();
  ctx.moveTo(0, vy);
  ctx.lineTo(w, vy);
  ctx.stroke();
  // 门缝光源（恐怖焦点）——光线在门前地面形成光晕
  glow(ctx, vx, vy + 14, 56, 'rgba(200,210,235,0.4)');
  glow(ctx, vx, vy, 26, 'rgba(220,228,248,0.55)');
  ctx.fillStyle = 'rgba(215,223,245,0.6)';
  ctx.fillRect(vx - 1.5, vy - 52, 3, 72);
  // 门（虚掩，门缝更宽、透出光）
  ctx.fillStyle = 'rgba(150,160,190,0.1)';
  ctx.fillRect(vx - 22, vy - 42, 44, 64);
  ctx.fillStyle = 'rgba(215,223,245,0.35)';
  ctx.fillRect(vx - 5, vy - 42, 7, 64);
  // 门框与门把手
  ctx.strokeStyle = 'rgba(170,180,205,0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(vx - 22, vy - 42, 44, 64);
  ctx.fillStyle = 'rgba(190,200,225,0.3)';
  ctx.fillRect(vx + 10, vy - 8, 3, 9);
  // 门后一个几乎看不清的身影（细思极恐）
  ctx.fillStyle = 'rgba(5,6,10,0.85)';
  ctx.beginPath();
  ctx.arc(vx + 2, vy + 18, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(vx - 4, vy + 20, 13, 34);
  // 找不同：照片里多出来的——矮桌上的杯子、被拉上的窗帘
  sideTable(ctx, w, h, true);
  sideWindow(ctx, w, h, true);
  // 两侧墙面明暗（增加立体感）
  const shadeL = ctx.createLinearGradient(0, 0, w * 0.18, 0);
  shadeL.addColorStop(0, 'rgba(0,0,0,0.45)');
  shadeL.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = shadeL;
  ctx.fillRect(0, 0, w * 0.18, h);
  const shadeR = ctx.createLinearGradient(w, 0, w * 0.82, 0);
  shadeR.addColorStop(0, 'rgba(0,0,0,0.45)');
  shadeR.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = shadeR;
  ctx.fillRect(w * 0.82, 0, w * 0.18, h);
  // 两侧门框（更暗，制造压迫）
  ctx.fillStyle = 'rgba(10,12,18,0.7)';
  ctx.fillRect(0, vy * 0.92, w * 0.13, h);
  ctx.fillRect(w * 0.87, vy * 0.92, w * 0.13, h);
  // 墙角阴影
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.moveTo(0, vy);
  ctx.lineTo(w * 0.1, vy * 0.75);
  ctx.lineTo(w * 0.16, vy);
  ctx.closePath();
  ctx.fill();
  // 天花板暗灯（向灭点聚拢）
  for (let i = 1; i < 6; i++) {
    const tx = vx + (vx - w * 0.2) * i * 0.09;
    const ty = vy - (vy - 0) * i * 0.09;
    glow(ctx, tx, ty, 5, 'rgba(160,170,200,0.2)');
  }
  // 冷色 + 暗角
  grade(ctx, w, h, 'rgba(60,90,160,0.04)', 1);
}

function sceneAccident(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // 车祸现场：雨夜、刹车灯红光、路面反光
  bg(ctx, w, h, [[0, '#05070d'], [1, '#0a0e18']]);
  // 路面
  ctx.fillStyle = '#0a0d15';
  ctx.fillRect(0, h * 0.58, w, h * 0.42);
  // 路面反光（水洼）
  const pool = ctx.createLinearGradient(0, h * 0.6, 0, h);
  pool.addColorStop(0, 'rgba(20,26,40,0.9)');
  pool.addColorStop(1, 'rgba(8,10,16,0.9)');
  ctx.fillStyle = pool;
  ctx.fillRect(0, h * 0.6, w, h * 0.4);
  // 远处车流光点
  glow(ctx, w * 0.2, h * 0.52, 5, 'rgba(255,210,150,0.5)');
  glow(ctx, w * 0.3, h * 0.5, 4, 'rgba(255,210,150,0.4)');
  glow(ctx, w * 0.82, h * 0.53, 6, 'rgba(255,190,120,0.5)');
  // 事故车（右倾）
  ctx.fillStyle = '#0c111c';
  ctx.save();
  ctx.translate(w * 0.62, h * 0.6);
  ctx.rotate(0.16);
  ctx.fillRect(-70, -30, 150, 46);
  ctx.fillRect(-30, -30, 40, -24);
  ctx.restore();
  // 破损车灯
  glow(ctx, w * 0.55, h * 0.55, 26, 'rgba(255,120,90,0.5)');
  glow(ctx, w * 0.55, h * 0.55, 8, 'rgba(255,160,120,0.7)');
  // 红光反射在路面
  const redPool = ctx.createLinearGradient(0, h * 0.6, 0, h * 0.8);
  redPool.addColorStop(0, 'rgba(200,60,50,0.25)');
  redPool.addColorStop(1, 'rgba(200,60,50,0)');
  ctx.fillStyle = redPool;
  ctx.fillRect(w * 0.3, h * 0.6, w * 0.4, h * 0.2);
  // 警/救护灯（远处）
  glow(ctx, w * 0.88, h * 0.5, 18, 'rgba(255,120,110,0.4)');
  glow(ctx, w * 0.88, h * 0.5, 8, 'rgba(140,160,255,0.4)');
  // 雨丝
  ctx.strokeStyle = 'rgba(190,210,235,0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 70; i++) {
    const sx = Math.random() * w, sy = Math.random() * h;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - 4, sy + 16);
    ctx.stroke();
  }
  grade(ctx, w, h, 'rgba(120,60,70,0.06)', 1);
}

function sceneRoom(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // 空房间：一扇亮窗、光柱、地上的影子
  bg(ctx, w, h, [[0, '#0b0f18'], [1, '#0d111a']]);
  // 墙
  ctx.fillStyle = '#0b0f18';
  ctx.fillRect(0, 0, w, h * 0.72);
  // 地板
  const floorG = ctx.createLinearGradient(0, h * 0.72, 0, h);
  floorG.addColorStop(0, '#10141e');
  floorG.addColorStop(1, '#0a0d14');
  ctx.fillStyle = floorG;
  ctx.fillRect(0, h * 0.72, w, h * 0.28);
  // 地板缝
  ctx.strokeStyle = 'rgba(150,165,195,0.06)';
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(0, h * 0.72 + (i * h * 0.28) / 6);
    ctx.lineTo(w, h * 0.72 + (i * h * 0.28) / 6);
    ctx.stroke();
  }
  // 窗
  const winX = w * 0.32, winY = h * 0.16, winW = w * 0.36, winH = h * 0.4;
  glow(ctx, winX + winW / 2, winY + winH / 2, winW, 'rgba(180,195,230,0.5)');
  const winG = ctx.createLinearGradient(0, winY, 0, winY + winH);
  winG.addColorStop(0, 'rgba(200,212,238,0.85)');
  winG.addColorStop(1, 'rgba(150,168,205,0.7)');
  ctx.fillStyle = winG;
  ctx.fillRect(winX, winY, winW, winH);
  ctx.strokeStyle = '#0b0f18';
  ctx.lineWidth = 5;
  ctx.strokeRect(winX, winY, winW, winH);
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2, winY);
  ctx.lineTo(winX + winW / 2, winY + winH);
  ctx.moveTo(winX, winY + winH / 2);
  ctx.lineTo(winX + winW, winY + winH / 2);
  ctx.stroke();
  // 光柱（洒在地上）
  const beam = ctx.createLinearGradient(winX, winY, winX + 80, h);
  beam.addColorStop(0, 'rgba(200,212,238,0.16)');
  beam.addColorStop(1, 'rgba(200,212,238,0.02)');
  ctx.fillStyle = beam;
  ctx.beginPath();
  ctx.moveTo(winX, winY + winH);
  ctx.lineTo(winX + winW, winY + winH);
  ctx.lineTo(winX + winW + 90, h);
  ctx.lineTo(winX - 40, h);
  ctx.closePath();
  ctx.fill();
  // 地上的黑影（空房间的"不空"）
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.ellipse(w * 0.58, h * 0.86, 34, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  // 椅子剪影
  ctx.fillStyle = 'rgba(16,20,28,0.9)';
  ctx.fillRect(w * 0.14, h * 0.6, 4, h * 0.16);
  ctx.fillRect(w * 0.14 + 16, h * 0.6, 4, h * 0.16);
  ctx.fillRect(w * 0.1, h * 0.6, 24, 4);
  ctx.fillRect(w * 0.12, h * 0.47, 3, h * 0.13);
  grade(ctx, w, h, 'rgba(120,150,210,0.04)', 1);
}

function sceneHallwayOrig(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // 走廊原图：更普通、更明亮一点，没有身影（找不同对照）
  bg(ctx, w, h, [[0, '#0e1320'], [1, '#0b0f18']]);
  const vx = w * 0.5, vy = h * 0.36;
  const wallG = ctx.createLinearGradient(0, 0, 0, vy);
  wallG.addColorStop(0, '#101525');
  wallG.addColorStop(1, '#0d121e');
  ctx.fillStyle = wallG;
  ctx.fillRect(0, 0, w, vy);
  const floorG = ctx.createLinearGradient(0, vy, 0, h);
  floorG.addColorStop(0, '#121828');
  floorG.addColorStop(1, '#0c101a');
  ctx.fillStyle = floorG;
  ctx.fillRect(0, vy, w, h - vy);
  ctx.strokeStyle = 'rgba(160,175,210,0.09)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(i * (w / 10), h);
    ctx.lineTo(vx, vy);
    ctx.stroke();
  }
  // 门：关闭，无光缝，无身影——普通的走廊
  glow(ctx, vx, vy + 10, 22, 'rgba(160,172,200,0.12)');
  ctx.fillStyle = 'rgba(150,162,190,0.14)';
  ctx.fillRect(vx - 22, vy - 42, 44, 64);
  ctx.strokeStyle = 'rgba(170,182,210,0.22)';
  ctx.lineWidth = 2;
  ctx.strokeRect(vx - 22, vy - 42, 44, 64);
  ctx.fillStyle = 'rgba(180,192,220,0.3)';
  ctx.fillRect(vx + 10, vy - 8, 3, 9);
  // 找不同对照：没有杯子、窗帘拉开透光
  sideTable(ctx, w, h, false);
  sideWindow(ctx, w, h, false);
  ctx.fillStyle = 'rgba(12,15,24,0.7)';
  ctx.fillRect(0, vy * 0.92, w * 0.13, h);
  ctx.fillRect(w * 0.87, vy * 0.92, w * 0.13, h);
  grade(ctx, w, h, 'rgba(80,110,180,0.03)', 1);
}

function sceneAnomaly(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  // 3:33 异常照片：本该空无一物的房间，窗边站着一个背对的人影
  bg(ctx, w, h, [[0, '#080a10'], [1, '#0a0d14']]);
  ctx.fillStyle = '#090b12';
  ctx.fillRect(0, 0, w, h * 0.7);
  const floorG = ctx.createLinearGradient(0, h * 0.7, 0, h);
  floorG.addColorStop(0, '#0e121c');
  floorG.addColorStop(1, '#080a10');
  ctx.fillStyle = floorG;
  ctx.fillRect(0, h * 0.7, w, h * 0.3);
  // 窗（微弱月光）
  const winX = w * 0.3, winY = h * 0.14, winW = w * 0.4, winH = h * 0.36;
  glow(ctx, winX + winW / 2, winY + winH / 2, winW * 0.8, 'rgba(160,175,210,0.5)');
  const winG = ctx.createLinearGradient(0, winY, 0, winY + winH);
  winG.addColorStop(0, 'rgba(150,165,200,0.5)');
  winG.addColorStop(1, 'rgba(110,130,175,0.35)');
  ctx.fillStyle = winG;
  ctx.fillRect(winX, winY, winW, winH);
  ctx.strokeStyle = '#090b12';
  ctx.lineWidth = 5;
  ctx.strokeRect(winX, winY, winW, winH);
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2, winY);
  ctx.lineTo(winX + winW / 2, winY + winH);
  ctx.stroke();
  // 窗边背对的身影（异常）
  ctx.fillStyle = 'rgba(5,6,9,0.95)';
  ctx.beginPath();
  ctx.arc(winX + winW / 2, winY + winH - 4, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2 - 20, winY + winH + 2);
  ctx.quadraticCurveTo(winX + winW / 2, winY + winH - 22, winX + winW / 2 + 20, winY + winH + 2);
  ctx.closePath();
  ctx.fill();
  // 窗台边放着一个空的水杯（她留下的）
  ctx.fillStyle = 'rgba(170,185,215,0.25)';
  ctx.fillRect(w * 0.24, h * 0.5, 14, 20);
  ctx.fillRect(w * 0.235, h * 0.47, 17, 4);
  // 地面一道长长的影子
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2, winY + winH);
  ctx.lineTo(winX + winW / 2 + 80, h);
  ctx.lineTo(winX + winW / 2 - 10, h);
  ctx.closePath();
  ctx.fill();
  grade(ctx, w, h, 'rgba(90,110,170,0.06)', 1);
}

function sceneWallpaper(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  bg(ctx, w, h, [[0, '#05070d'], [1, '#0a0f1a']]);
  for (let i = 0; i < 220; i++) {
    ctx.fillStyle = `rgba(190,205,235,${0.02 + Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.3, 1.3);
  }
  const g = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, h * 0.6);
  g.addColorStop(0, 'rgba(110,168,255,0.06)');
  g.addColorStop(1, 'rgba(110,168,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  flare(ctx, w, h, w * 0.5, h * 0.4, 200, 'rgba(150,180,230,0.12)');
}

function drawScene(scene: Scene, ctx: CanvasRenderingContext2D, w: number, h: number): void {
  switch (scene) {
    case 'cake':
      sceneCake(ctx, w, h);
      break;
    case 'window':
      sceneWindow(ctx, w, h);
      break;
    case 'city':
      sceneCity(ctx, w, h);
      break;
    case 'hallway':
      sceneHallway(ctx, w, h);
      break;
    case 'hallway_orig':
      sceneHallwayOrig(ctx, w, h);
      break;
    case 'anomaly':
      sceneAnomaly(ctx, w, h);
      break;
    case 'accident':
      sceneAccident(ctx, w, h);
      break;
    case 'room':
      sceneRoom(ctx, w, h);
      break;
    case 'wallpaper':
      sceneWallpaper(ctx, w, h);
      break;
    default:
      sceneCity(ctx, w, h);
  }
}

export function photoElement(id: string, realSrc?: string): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'art-photo';

  if (realSrc) {
    const img = new Image();
    img.src = realSrc;
    img.alt = '';
    img.className = 'art-photo-img';
    img.onload = () => {
      wrap.classList.add('art-loaded');
    };
    img.onerror = () => {
      wrap.replaceChildren(drawProcedural(id));
    };
    wrap.appendChild(img);
    // 兜底：先铺程序化图，若真实图加载成功则覆盖
    const ph = drawProcedural(id);
    wrap.appendChild(ph);
    img.onload = () => {
      wrap.querySelector('.art-proc')?.remove();
    };
    return wrap;
  }

  wrap.appendChild(drawProcedural(id));
  return wrap;
}

function drawProcedural(id: string): HTMLElement {
  const canvas = document.createElement('canvas');
  canvas.className = 'art-proc';
  const w = 800;
  const h = 600;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  drawScene(pickScene(id), ctx, w, h);
  grain(ctx, w, h, 0.3);
  vignette(ctx, w, h, 0.45);
  return canvas;
}
