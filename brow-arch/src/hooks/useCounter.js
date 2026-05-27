import { useEffect, useState } from 'react';
import { useScrollReveal } from './useScrollReveal';

export function useCounter(target, duration = 1800) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.round(ease(p) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return { ref, count };
}
