import { useEffect, useRef, useState, useCallback } from 'react';
import Button from '../../components/Button/Button';
import { useBooking } from '../../context/BookingContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './About.module.css';

const CHAPTERS = [
  {
    num: '01',
    tag:   'The Space',
    title: 'A Sanctuary\nBuilt for You',
    body:  'Nestled in the heart of Illovo, Sandton, Brow Arch is more than a beauty studio — it\'s a private retreat. From the moment you step inside, the world slows down. Every detail has been considered: soft lighting, curated scents, and a calm that lets you breathe out before we even begin.',
    img:   'https://images.unsplash.com/photo-1643684391140-c5056cfd3436?auto=format&fit=crop&w=1000&q=80',
    imgAlt:'Brow Arch studio interior',
    bg:    'var(--color-bg)',
  },
  {
    num: '02',
    tag:   'The Expert',
    title: 'Skill You Can\nSee and Feel',
    body:  'Brow Arch was founded on the belief that great results come from great technique — not trend-chasing. Every treatment is delivered with precision, education, and genuine care. Years of professional training, combined with a passion for skin health, means your therapist brings expertise that shows in every outcome.',
    img:   'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&q=80',
    imgAlt:'Beauty therapist at work',
    bg:    'var(--color-bg-section)',
  },
  {
    num: '03',
    tag:   'The Craft',
    title: 'Premium From\nStart to Finish',
    body:  'We believe your skin deserves only the best — which is why we use exclusively professional-grade, results-focused products. No compromises. No cutting corners. Every formula is chosen for its efficacy and safety, ensuring every treatment delivers exactly what it promises.',
    img:   'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=1000&q=80',
    imgAlt:'Luxury skincare products',
    bg:    'var(--color-bg)',
  },
  {
    num: '04',
    tag:   'The Promise',
    title: 'Real Results.\nEvery Time.',
    body:  'We don\'t measure success by appointment duration — we measure it by how you feel when you leave, and what you see in the mirror one week later. That\'s the Brow Arch promise: honest advice, transparent results, and treatments that genuinely transform.',
    img:   'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=1000&q=80',
    imgAlt:'Close-up beauty treatment result',
    bg:    'var(--color-bg-section)',
  },
];

/* ── Horizontal scroll chapters (desktop only) ── */
function HorizontalStory({ openBooking }) {
  const wrapperRef  = useRef(null);
  const trackRef    = useRef(null);
  const chapRefs    = useRef([]);
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
      const rect    = wrapper.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const progress  = maxScroll > 0 ? Math.max(0, Math.min(1, -rect.top / maxScroll)) : 0;
      pos.target = -progress * (CHAPTERS.length - 1) * window.innerWidth;
    };

    const loop = () => {
      pos.cur = lerp(pos.cur, pos.target, 0.072);
      track.style.transform = `translateX(${pos.cur}px)`;

      // Reveal chapters as they slide into view
      const newActive = Math.round(Math.abs(pos.cur) / window.innerWidth);
      if (newActive !== lastActive) {
        setActive(newActive);
        lastActive = newActive;
        // Mark all chapters within range as revealed
        CHAPTERS.forEach((_, i) => {
          const dist = Math.abs(pos.cur + i * window.innerWidth);
          if (dist < window.innerWidth * 0.65 && chapRefs.current[i]) {
            chapRefs.current[i].classList.add(styles.chapRevealed);
          }
        });
      }
      raf = requestAnimationFrame(loop);
    };

    // Reveal first chapter immediately
    setTimeout(() => {
      chapRefs.current[0]?.classList.add(styles.chapRevealed);
    }, 200);

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    /* The tall wrapper provides the scroll space */
    <div ref={wrapperRef} className={styles.hWrapper}>
      <div className={styles.hSticky}>

        {/* Scrolling track */}
        <div ref={trackRef} className={styles.hTrack}>
          {CHAPTERS.map((ch, i) => (
            <div
              key={ch.num}
              ref={el => { chapRefs.current[i] = el; }}
              className={styles.hChap}
              style={{ background: ch.bg }}
            >
              {/* Big decorative number */}
              <span className={styles.hChapNum} aria-hidden="true">{ch.num}</span>

              {/* Image side */}
              <div className={`${styles.hChapImg} ${i % 2 === 1 ? styles.hChapImgRight : ''}`}>
                <div className={styles.hChapImgInner}>
                  <img src={ch.img} alt={ch.imgAlt} loading={i === 0 ? 'eager' : 'lazy'} />
                </div>
                <span className={styles.hChapTag}>{ch.tag}</span>
              </div>

              {/* Text side */}
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

        {/* Chapter progress indicator */}
        <div className={styles.hDots}>
          {CHAPTERS.map((ch, i) => (
            <div key={i} className={`${styles.hDot} ${active === i ? styles.hDotActive : ''}`}>
              <span>{ch.tag}</span>
            </div>
          ))}
        </div>

        {/* Scroll hint — fades after first interaction */}
        <div className={`${styles.hScrollHint} ${active > 0 ? styles.hScrollHintHidden : ''}`}>
          <span className={styles.hScrollHintLine} />
          <span>Scroll to explore</span>
        </div>
      </div>
    </div>
  );
}

/* ── Vertical story (mobile fallback) ── */
function VerticalStory() {
  return (
    <section className={styles.vStory}>
      <div className="container">
        {CHAPTERS.map((ch, i) => {
          const { ref: imgRef,  isVisible: imgV  } = useScrollReveal({ threshold: 0.1 });
          const { ref: txtRef,  isVisible: txtV  } = useScrollReveal({ threshold: 0.1 });
          return (
            <div key={ch.num} className={`${styles.vChap} ${i % 2 ? styles.vChapFlip : ''}`}>
              <span className={styles.vChapNum} aria-hidden="true">{ch.num}</span>
              <div ref={imgRef} className={`${styles.vChapImg} ${imgV ? styles.vChapImgVis : ''} ${i % 2 ? styles.vChapImgFromRight : styles.vChapImgFromLeft}`}>
                <img src={ch.img} alt={ch.imgAlt} loading="lazy" />
                <span className={styles.vChapTag}>{ch.tag}</span>
              </div>
              <div ref={txtRef} className={`${styles.vChapTxt} ${txtV ? styles.vChapTxtVis : ''}`}>
                <p className={styles.vChapLabel}>{ch.num} — {ch.tag}</p>
                <h2 className={styles.vChapTitle}>{ch.title.replace('\n', ' ')}</h2>
                <p className={styles.vChapBody}>{ch.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function About() {
  const { openBooking } = useBooking();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { ref: statsRef, isVisible: statsVis } = useScrollReveal({ threshold: 0.2 });
  const { ref: valRef,   isVisible: valVis   } = useScrollReveal({ threshold: 0.1 });
  const { ref: ctaRef,   isVisible: ctaVis   } = useScrollReveal({ threshold: 0.2 });

  return (
    <main className={styles.main}>

      {/* ── CINEMATIC BANNER ── */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}>
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=60"
            alt=""
            aria-hidden="true"
          />
          <div className={styles.bannerOverlay} />
        </div>
        <div className={`container ${styles.bannerInner}`}>
          <div className={styles.bannerContent}>
            <p className={styles.bannerLabel}>About Brow Arch</p>
            <h1 className={styles.bannerTitle}>
              We don't just<br />enhance your appearance.<br />
              <em>We help you see yourself.</em>
            </h1>
            <p className={styles.bannerSub}>Boutique beauty therapy. Illovo, Sandton.</p>
          </div>
          <div className={styles.bannerQuote}>
            <p>"Beauty is not in the face; beauty is a light in the heart."</p>
            <span>— Our philosophy</span>
          </div>
        </div>
        {/* Diagonal cut at bottom */}
        <div className={styles.bannerCut} />
      </section>

      {/* ── STATS ── */}
      <section
        ref={statsRef}
        className={`${styles.stats} ${statsVis ? styles.statsVis : ''}`}
      >
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { val: '5+',   label: 'Years of expertise' },
              { val: '120+', label: 'Happy clients' },
              { val: '100%', label: 'By appointment' },
              { val: '5.0★', label: 'Google rating' },
            ].map((s, i) => (
              <div key={s.label} className={styles.statItem} style={{ '--si': i }}>
                <span className={styles.statVal}>{s.val}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY (horizontal on desktop, vertical on mobile) ── */}
      {isDesktop
        ? <HorizontalStory openBooking={openBooking} />
        : <VerticalStory />
      }

      {/* ── VALUES ── */}
      <section
        ref={valRef}
        className={`section section--alt ${styles.values} ${valVis ? styles.valVis : ''}`}
      >
        <div className="container">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <p className="section-label">Our Values</p>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className={styles.valGrid}>
            {[
              { icon: '✦', title: 'Personalised Treatments', text: 'Every treatment is tailored to your skin type, goals, and lifestyle.' },
              { icon: '✦', title: 'Premium Products',        text: 'Only the highest quality, professional-grade skincare and beauty products.' },
              { icon: '✦', title: 'Safe & Hygienic',         text: 'Strict hygiene protocols and a clean, professional studio environment.' },
              { icon: '✦', title: 'Results Driven',          text: 'Focused on real, visible, lasting results — not just a temporary fix.' },
            ].map((v, i) => (
              <div key={v.title} className={styles.valCard} style={{ '--vi': i }}>
                <span className={styles.valIcon}>{v.icon}</span>
                <h3 className={styles.valTitle}>{v.title}</h3>
                <p className={styles.valText}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        ref={ctaRef}
        className={`${styles.closingCta} ${ctaVis ? styles.closingCtaVis : ''}`}
      >
        <div className="container">
          <div className={styles.closingInner}>
            <div className={styles.closingImg}>
              <img
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80"
                alt="Relaxing spa treatment"
                loading="lazy"
              />
              <div className={styles.closingImgSheen} />
            </div>
            <div className={styles.closingText}>
              <p className="section-label">Begin Your Journey</p>
              <h2 className={styles.closingTitle}>Book a<br /><em>Consultation</em></h2>
              <p className={styles.closingBody}>
                Every Brow Arch journey starts with a personalised consultation — no pressure,
                just an honest conversation about your skin and your goals. Let's talk.
              </p>
              <button className={styles.closingBtn} onClick={openBooking}>
                Book a Consultation
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
