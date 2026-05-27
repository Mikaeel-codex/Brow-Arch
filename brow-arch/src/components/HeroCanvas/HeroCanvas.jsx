import { useEffect, useRef } from 'react';
import styles from './HeroCanvas.module.css';

const COUNT = 60;

class Sparkle {
  constructor(W, H, init = false) {
    this.W = W; this.H = H;
    this.reset(init);
  }

  reset(init = false) {
    this.x    = Math.random() * this.W;
    this.y    = init ? Math.random() * this.H : this.H + 12;
    this.z    = 0.2 + Math.random() * 0.8;
    this.size = 0.7 + this.z * 2.8;
    this.vy   = -(0.22 + this.z * 0.5);
    this.vx   = (Math.random() - 0.5) * 0.28;
    this.rot  = Math.random() * Math.PI * 2;
    this.rspd = (Math.random() - 0.5) * 0.022;
    this.age  = init ? Math.random() * 200 : 0;
    this.life = 200 + Math.random() * 220;
    this.alpha = 0;
  }

  update() {
    this.age++;
    this.x   += this.vx;
    this.y   += this.vy;
    this.rot += this.rspd;

    const t = this.age / this.life;
    const raw = t < 0.12 ? t / 0.12 : t > 0.72 ? (1 - t) / 0.28 : 1;
    this.alpha = raw * (0.38 + this.z * 0.52);

    if (this.age >= this.life || this.y < -20) this.reset();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.globalAlpha = this.alpha;
    const s = this.size;
    /* 4-point star */
    ctx.beginPath();
    ctx.moveTo(0,       -s * 3);
    ctx.lineTo(s * .4,  -s * .4);
    ctx.lineTo(s * 3,    0);
    ctx.lineTo(s * .4,   s * .4);
    ctx.lineTo(0,        s * 3);
    ctx.lineTo(-s * .4,  s * .4);
    ctx.lineTo(-s * 3,   0);
    ctx.lineTo(-s * .4, -s * .4);
    ctx.closePath();
    ctx.fillStyle = this.z > 0.55
      ? 'rgba(255,255,255,0.92)'
      : 'rgba(196,160,168,0.88)';
    ctx.fill();
    ctx.restore();
  }
}

export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let sparks = [];
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      sparks = Array.from({ length: COUNT },
        (_, i) => new Sparkle(canvas.width, canvas.height, i < COUNT * 0.6)
      );
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.forEach(s => { s.update(); s.draw(ctx); });
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}
