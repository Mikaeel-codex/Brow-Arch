import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroCanvas from '../../components/HeroCanvas/HeroCanvas';
import OurStory from '../../components/OurStory/OurStory';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCounter } from '../../hooks/useCounter';
import { services } from '../../data/services';
import styles from './Home.module.css';

/* ── Split-text word reveal ── */
function SplitText({ children, className, delay = 0 }) {
  const parts = [];
  const process = (node, keyPrefix) => {
    if (typeof node === 'string') {
      node.split(' ').forEach((word, i, arr) => {
        parts.push(
          <span key={`${keyPrefix}-${i}`} className={styles.word}>
            <span className={styles.wordInner} style={{ '--wi': parts.length, '--d': `${delay}s` }}>
              {word}{i < arr.length - 1 ? ' ' : ''}
            </span>
          </span>
        );
      });
    } else if (node?.type === 'em') {
      node.props.children.split(' ').forEach((word, i, arr) => {
        parts.push(
          <span key={`em-${keyPrefix}-${i}`} className={styles.word}>
            <em className={`${styles.wordInner} ${styles.wordEm}`} style={{ '--wi': parts.length, '--d': `${delay}s` }}>
              {word}{i < arr.length - 1 ? ' ' : ''}
            </em>
          </span>
        );
      });
    }
  };
  [].concat(children).forEach((c, i) => process(c, i));
  return <span className={className}>{parts}</span>;
}

/* ── Marquee content ── */
const MARQUEE = [
  'Brow Arch Beauty',
  '✦',
  'Expert Therapist',
  '✦',
  'Premium Skincare',
  '✦',
  'Illovo Sandton',
  '✦',
  'Personalised Care',
  '✦',
  'Timeless Results',
  '✦',
];

/* ── Pinned showcase chapters ── */
const CHAPTERS = [
  {
    num: '00',
    label: 'Popular Treatments',
    heading: 'Our most\nloved services.',
    body: 'Three categories. Endless results. Discover the treatments our clients return to time and again — each one crafted to bring out your most radiant self.',
    img: 'https://images.unsplash.com/photo-1619451427882-6aaaded0cc61?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '01',
    label: 'Facials',
    heading: 'Skin that\nradiates health.',
    body: 'From deep-cleansing hydration masks to targeted chemical peels, every facial is tailored to your skin\'s exact needs — leaving you luminous, restored, and utterly renewed.',
    img: '/Chapters/Facials.jpg',
    cta: 'Explore Facials',
  },
  {
    num: '02',
    label: 'Brow & Lash',
    heading: 'Definition,\nperfectly placed.',
    body: 'Precision brow shaping and tinting sculpted to your bone structure. Lash lifts that open, lift, and transform — no extensions required.',
    img: '/Chapters/brow & Lash.jpg',
    cta: 'Explore Brows',
  },
  {
    num: '03',
    label: 'Threading',
    heading: 'Advanced care,\nvisible results.',
    body: 'Clinical dermaplaning, resurfacing peels, and full-body ritual massages — each treatment engineered to deliver measurable, lasting transformation.',
    img: '/Chapters/threading.jpg',
    cta: 'Explore Treatments',
  },
];

/* ── Stat counter item ── */
function StatCounter({ target, suffix, label }) {
  const { ref, count } = useCounter(target);
  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.statNum}>{count}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

/* ── Pinned showcase ── */
function PinnedShowcase() {
  const wrapperRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [prevChapter, setPrevChapter] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      const n = CHAPTERS.length;
      const lastStart = 0.65;
      const chapter = progress >= lastStart
        ? n - 1
        : Math.min(n - 2, Math.floor((progress / lastStart) * (n - 1)));
      setActiveChapter(prev => {
        if (prev !== chapter) {
          setPrevChapter(prev);
          setAnimKey(k => k + 1);
          return chapter;
        }
        return prev;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ch = CHAPTERS[activeChapter];

  return (
    <div ref={wrapperRef} className={styles.pinWrapper}>
      <div className={styles.pinSticky}>
        {/* Chapter number watermark */}
        <div className={styles.pinChapNum} aria-hidden="true">{ch.num}</div>

        {/* Left — text */}
        <div className={styles.pinLeft} key={`left-${animKey}`}>
          <p className={styles.pinLabel}>{ch.label}</p>
          <h2 className={styles.pinHeading}>
            {ch.heading.split('\n').map((line, i) => (
              <span key={i} className={styles.pinHeadLine}>{line}</span>
            ))}
          </h2>
          <p className={styles.pinBody}>{ch.body}</p>
        </div>

        {/* Right — image */}
        <div className={styles.pinRight}>
          {CHAPTERS.map((c, i) => (
            <div
              key={i}
              className={`${styles.pinImgSlide} ${i === activeChapter ? styles.pinImgActive : ''} ${i === prevChapter ? styles.pinImgExit : ''}`}
            >
              <img src={c.img} alt={c.label} />
            </div>
          ))}
          <div className={styles.pinImgOverlay} />
        </div>

        {/* Progress dots */}
        <div className={styles.pinDots} aria-label="Chapter navigation">
          {CHAPTERS.map((c, i) => (
            <button
              key={i}
              className={`${styles.pinDot} ${i === activeChapter ? styles.pinDotActive : ''}`}
              aria-label={`Chapter ${c.num}: ${c.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function Home() {
  const heroBgRef  = useRef(null);
  const heroTxtRef = useRef(null);
  const popularServices = services.filter(s => s.popular).slice(0, 4);

  const { ref: teaserRef,    isVisible: teaserVisible }    = useScrollReveal({ threshold: 0.15 });
  const { ref: ctaRef,       isVisible: ctaVisible }       = useScrollReveal({ threshold: 0.2 });

  /* ── Parallax rAF ── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (heroBgRef.current)
          heroBgRef.current.style.transform = `translateY(${y * 0.38}px) scale(1.15)`;
        if (heroTxtRef.current)
          heroTxtRef.current.style.transform = `translateY(${y * 0.16}px)`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className={styles.main}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className={styles.hero}>

        {/* Parallax background video */}
        <div className={styles.heroBgWrap}>
          <video
            ref={heroBgRef}
            className={styles.heroBg}
            src="/hero page/Therapist_performing_facial_trea…_202606022003.mp4"
            autoPlay
            muted
            playsInline
            loop
            aria-hidden="true"
            onTimeUpdate={e => { if (e.target.currentTime >= 6) e.target.currentTime = 0; }}
          />
        </div>

        {/* Gradient overlays */}
        <div className={styles.heroOverlay1} aria-hidden="true" />
        <div className={styles.heroOverlay2} aria-hidden="true" />

        {/* Canvas sparkles */}
        <HeroCanvas />

        {/* Copy — bottom left */}
        <div ref={heroTxtRef} className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>
            <span className={styles.eyebrowLine} />
            Illovo · Sandton
          </p>
          <h1 className={styles.heroH1}>
            <SplitText>Enhance Your <em>Natural</em> Beauty</SplitText>
          </h1>
          <p className={styles.heroSub}>
            Expert treatments. Personalised care. Timeless results.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/services" className={styles.ctaGhost}>Explore Services</Link>
          </div>
        </div>

        {/* Floating thumbnails — bottom right */}
        <div className={styles.heroThumbs} aria-hidden="true">
          {popularServices.slice(0, 3).map((s, i) => (
            <div key={s.id} className={styles.heroThumb} style={{ '--ti': i }}>
              <img src={s.image} alt={s.title} />
              <div className={styles.heroThumbLabel}>{s.title}</div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollLine} />
          <span className={styles.scrollText}>Scroll</span>
        </div>
      </section>

      {/* ══ MARQUEE ════════════════════════════════════════════ */}
      <div className={styles.marqueeSection} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>{item}</span>
          ))}
        </div>
        <div className={`${styles.marqueeTrack} ${styles.marqueeTrackReverse}`}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* ══ PINNED SHOWCASE ════════════════════════════════════ */}
      <PinnedShowcase />

      {/* ══ STATS ══════════════════════════════════════════════ */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <StatCounter target={5}   suffix="+" label="Years of expertise" />
            <StatCounter target={120} suffix="+" label="Satisfied clients" />
            <StatCounter target={8}   suffix=""  label="Signature treatments" />
            <StatCounter target={5}   suffix="★" label="Average rating" />
          </div>
        </div>
      </section>

      {/* ══ MAGAZINE TEASER ════════════════════════════════════ */}
      <section
        ref={teaserRef}
        className={`${styles.teaser} ${teaserVisible ? styles.teaserVisible : ''}`}
      >
        <div className={styles.teaserLeft}>
          <p className={styles.teaserLabel}>Our Story</p>
          <blockquote className={styles.teaserQuote}>
            "Beauty is not a<br />standard — it is an<br /><em>expression.</em>"
          </blockquote>
          <p className={styles.teaserBody}>
            Brow Arch was founded on a single belief: that every client deserves
            luxury-level care, delivered with warmth and genuine expertise.
            Based in Illovo, Sandton, we combine advanced techniques with a
            deeply personalised touch.
          </p>
          <Link to="/about" className={styles.teaserLink}>
            Our Story
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        <div className={styles.teaserRight}>
          <div className={styles.teaserImgFrame}>
            <img
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=700&q=80"
              alt="Brow Arch studio atmosphere"
            />
            <div className={styles.teaserImgBorder} aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ══ OUR STORY CHAPTERS ════════════════════════════════ */}
      <OurStory />

      {/* ══ FEATURES STRIP ════════════════════════════════════ */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {[
              { icon: '📅', title: 'Easy Online Booking',  text: 'Book your appointment in seconds via WhatsApp or our booking link — available 24/7.' },
              { icon: '🔒', title: 'Secure & Private',      text: 'Your details are kept strictly confidential. A calm, private space just for you.' },
              { icon: '⏰', title: 'Appointment Based',     text: 'By appointment only — ensuring you always receive undivided, personalised attention.' },
            ].map((f) => (
              <div key={f.title} className={styles.feature}>
                <span className={styles.feature__icon}>{f.icon}</span>
                <h4 className={styles.feature__title}>{f.title}</h4>
                <p className={styles.feature__text}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className={`${styles.cta} ${ctaVisible ? styles.ctaVisible : ''}`}
      >
        <div className={styles.ctaBgWrap}>
          <img
            className={styles.ctaBgImg}
            src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=50"
            alt=""
            aria-hidden="true"
          />
          <div className={styles.ctaOverlay} />
        </div>
        <div className="container">
          <div className={styles.ctaInner}>
            <p className={styles.ctaEyebrow}>Ready to begin?</p>
            <h2 className={styles.ctaHeading}>
              Your beauty,<br />your time, <em>your way.</em>
            </h2>
            <p className={styles.ctaSub}>
              Book your appointment today and experience the Brow Arch difference.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
