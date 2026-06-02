import { useEffect, useRef, useState } from 'react';
import styles from './OurStory.module.css';

const CHAPTERS = [
  {
    num: '01',
    tag:   'The Space',
    title: 'A Sanctuary\nBuilt for You',
    body:  'Nestled in the heart of Illovo, Sandton, Brow Arch is more than a beauty studio — it\'s a private retreat. From the moment you step inside, the world slows down. Every detail has been considered: soft lighting, curated scents, and a calm that lets you breathe out before we even begin.',
    img:   'https://images.unsplash.com/photo-1643684391140-c5056cfd3436?auto=format&fit=crop&w=1000&q=80',
    imgAlt: 'Brow Arch studio interior',
    bg:    'var(--color-bg)',
  },
  {
    num: '02',
    tag:   'The Expert',
    title: 'Skill You Can\nSee and Feel',
    body:  'Brow Arch was founded on the belief that great results come from great technique — not trend-chasing. Every treatment is delivered with precision, education, and genuine care. Years of professional training, combined with a passion for skin health, means your therapist brings expertise that shows in every outcome.',
    img:   'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&q=80',
    imgAlt: 'Beauty therapist at work',
    bg:    'var(--color-bg-section)',
  },
  {
    num: '03',
    tag:   'The Craft',
    title: 'Premium From\nStart to Finish',
    body:  'We believe your skin deserves only the best — which is why we use exclusively professional-grade, results-focused products. No compromises. No cutting corners. Every formula is chosen for its efficacy and safety, ensuring every treatment delivers exactly what it promises.',
    img:   'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=1000&q=80',
    imgAlt: 'Luxury skincare products',
    bg:    'var(--color-bg)',
  },
  {
    num: '04',
    tag:   'The Promise',
    title: 'Real Results.\nEvery Time.',
    body:  'We don\'t measure success by appointment duration — we measure it by how you feel when you leave, and what you see in the mirror one week later. That\'s the Brow Arch promise: honest advice, transparent results, and treatments that genuinely transform.',
    img:   'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=1000&q=80',
    imgAlt: 'Close-up beauty treatment result',
    bg:    'var(--color-bg-section)',
  },
];

/* ── Desktop: horizontal scroll ── */
function HorizontalStory() {
  const wrapperRef = useRef(null);
  const trackRef   = useRef(null);
  const chapRefs   = useRef([]);
  const [active, setActive] = useState(0);
  const posRef = useRef({ cur: 0, target: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track   = trackRef.current;
    if (!wrapper || !track) return;

    const pos = posRef.current;
    let raf;
    let lastActive = -1;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onScroll = () => {
      const rect      = wrapper.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const progress  = maxScroll > 0 ? Math.max(0, Math.min(1, -rect.top / maxScroll)) : 0;
      pos.target      = -progress * (CHAPTERS.length - 1) * window.innerWidth;
    };

    const loop = () => {
      pos.cur = lerp(pos.cur, pos.target, 0.072);
      track.style.transform = `translateX(${pos.cur}px)`;

      const newActive = Math.round(Math.abs(pos.cur) / window.innerWidth);
      if (newActive !== lastActive) {
        setActive(newActive);
        lastActive = newActive;
        CHAPTERS.forEach((_, i) => {
          const dist = Math.abs(pos.cur + i * window.innerWidth);
          if (dist < window.innerWidth * 0.65 && chapRefs.current[i]) {
            chapRefs.current[i].classList.add(styles.chapRevealed);
          }
        });
      }
      raf = requestAnimationFrame(loop);
    };

    setTimeout(() => { chapRefs.current[0]?.classList.add(styles.chapRevealed); }, 200);

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.hWrapper}>
      <div className={styles.hSticky}>
        <div ref={trackRef} className={styles.hTrack}>
          {CHAPTERS.map((ch, i) => (
            <div
              key={ch.num}
              ref={el => { chapRefs.current[i] = el; }}
              className={styles.hChap}
              style={{ background: ch.bg }}
            >
              <span className={styles.hChapNum} aria-hidden="true">{ch.num}</span>
              <div className={`${styles.hChapImg} ${i % 2 === 1 ? styles.hChapImgRight : ''}`}>
                <div className={styles.hChapImgInner}>
                  <img src={ch.img} alt={ch.imgAlt} loading={i === 0 ? 'eager' : 'lazy'} />
                </div>
                <span className={styles.hChapTag}>{ch.tag}</span>
              </div>
              <div className={styles.hChapText}>
                <p className={styles.hChapLabel}>{ch.num} — {ch.tag}</p>
                <h2 className={styles.hChapTitle}>
                  {ch.title.split('\n').map((line, j) => (
                    <span key={j} className={styles.hChapTitleLine}>{line}</span>
                  ))}
                </h2>
                <p className={styles.hChapBody}>{ch.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.hDots}>
          {CHAPTERS.map((ch, i) => (
            <div key={i} className={`${styles.hDot} ${active === i ? styles.hDotActive : ''}`}>
              <span>{ch.tag}</span>
            </div>
          ))}
        </div>

        <div className={`${styles.hScrollHint} ${active > 0 ? styles.hScrollHintHidden : ''}`}>
          <span className={styles.hScrollHintLine} />
          <span>Scroll to explore</span>
        </div>
      </div>
    </div>
  );
}

export default function OurStory() {
  return <HorizontalStory />;
}
