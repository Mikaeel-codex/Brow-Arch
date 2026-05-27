import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const state   = useRef({ mx: -200, my: -200, rx: -200, ry: -200, hover: false });

  useEffect(() => {
    const s = state.current;
    let raf;

    /* Mouse position */
    const onMove = (e) => {
      s.mx = e.clientX;
      s.my = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${s.mx}px,${s.my}px)`;
    };

    /* Hover detection via delegation */
    const onOver = (e) => {
      if (e.target.closest('a,button,[data-cursor]') && !s.hover) {
        s.hover = true;
        ringRef.current?.classList.add(styles.hover);
        dotRef.current?.classList.add(styles.dotHover);
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a,button,[data-cursor]') && s.hover) {
        s.hover = false;
        ringRef.current?.classList.remove(styles.hover);
        dotRef.current?.classList.remove(styles.dotHover);
      }
    };

    /* Click pulse */
    const onClick = () => {
      ringRef.current?.classList.add(styles.click);
      setTimeout(() => ringRef.current?.classList.remove(styles.click), 300);
    };

    /* Spring-lerp ring */
    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      s.rx = lerp(s.rx, s.mx, 0.095);
      s.ry = lerp(s.ry, s.my, 0.095);
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${s.rx}px,${s.ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    document.addEventListener('click',     onClick);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      document.removeEventListener('click',     onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
