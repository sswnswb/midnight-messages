// 视觉特效：红闪、抖动、噪点/CRT、故障——心理恐怖的"画面语言"

function root(): HTMLElement {
  return document.getElementById('app') as HTMLElement;
}

export const fx = {
  /** 恐怖红色闪光 */
  redFlash(duration = 500): void {
    const el = document.createElement('div');
    el.className = 'fx-flash';
    el.style.animationDuration = `${duration}ms`;
    root().appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  },

  /** 文字/界面故障抖动 */
  glitch(duration = 400): void {
    const screen = document.querySelector('.phone-screen') as HTMLElement | null;
    if (!screen) return;
    screen.classList.add('fx-glitch');
    window.setTimeout(() => screen.classList.remove('fx-glitch'), duration);
  },

  /** 画面震动 */
  shake(duration = 300): void {
    const phone = document.querySelector('.phone') as HTMLElement | null;
    if (!phone) return;
    phone.classList.add('fx-shake');
    window.setTimeout(() => phone.classList.remove('fx-shake'), duration);
  },

  /** 常驻噪点/CRT 覆盖（心理恐怖的"不对劲"氛围） */
  setNoise(on: boolean): void {
    const el = document.querySelector('.fx-noise') as HTMLElement | null;
    if (!el) return;
    el.style.opacity = on ? '1' : '0';
  },

  /** 红色环境压暗（危机时刻常驻） */
  setRedTint(on: boolean): void {
    const el = document.querySelector('.fx-tint') as HTMLElement | null;
    if (!el) return;
    el.style.opacity = on ? '1' : '0';
  },
};
