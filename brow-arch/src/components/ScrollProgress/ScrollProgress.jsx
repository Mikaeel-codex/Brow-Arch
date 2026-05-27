import { useEffect, useRef } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const fillRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      const pct      = total > 0 ? scrolled / total : 0;
      if (fillRef.current)
        fillRef.current.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.bar} aria-hidden="true">
      <div ref={fillRef} className={styles.fill} />
    </div>
  );
}
