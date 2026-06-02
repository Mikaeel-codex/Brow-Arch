import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './About.module.css';

const PROCESS = [
  {
    num: '01',
    title: 'Consultation',
    text: 'Every appointment begins with a personalised consultation. We talk about your skin, your goals, and your lifestyle — before a single product is opened.',
  },
  {
    num: '02',
    title: 'Treatment',
    text: 'Using only professional-grade products, every treatment is crafted specifically for you. No templates. No rushing. Just focused, expert hands.',
  },
  {
    num: '03',
    title: 'Aftercare',
    text: "We don't say goodbye at the door. You leave with tailored aftercare advice and a clear plan to maintain and build on your results at home.",
  },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80', alt: 'Facial treatment' },
  { src: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=600&q=80', alt: 'Brow shaping' },
  { src: 'https://images.unsplash.com/photo-1587910234573-d6fc84743bc8?auto=format&fit=crop&w=600&q=80', alt: 'Lash treatment' },
  { src: 'https://images.unsplash.com/photo-1643684391140-c5056cfd3436?auto=format&fit=crop&w=600&q=80', alt: 'Skin treatment' },
  { src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80', alt: 'Skincare' },
];

export default function About() {
  const { ref: statsRef,     isVisible: statsVis     } = useScrollReveal({ threshold: 0.2  });
  const { ref: manifestoRef, isVisible: manifestoVis } = useScrollReveal({ threshold: 0.25 });
  const { ref: founderRef,   isVisible: founderVis   } = useScrollReveal({ threshold: 0.15 });
  const { ref: processRef,   isVisible: processVis   } = useScrollReveal({ threshold: 0.15 });
  const { ref: galleryRef,   isVisible: galleryVis   } = useScrollReveal({ threshold: 0.1  });
  const { ref: valRef,       isVisible: valVis       } = useScrollReveal({ threshold: 0.1  });
  const { ref: ctaRef,       isVisible: ctaVis       } = useScrollReveal({ threshold: 0.2  });

  return (
    <main className={styles.main}>

      {/* ── HERO BANNER ── */}
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
        <div className={styles.bannerCut} />
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className={`${styles.stats} ${statsVis ? styles.statsVis : ''}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { val: '5+',   label: 'Years of expertise' },
              { val: '120+', label: 'Happy clients'       },
              { val: '100%', label: 'By appointment'      },
              { val: '5.0★', label: 'Google rating'       },
            ].map((s, i) => (
              <div key={s.label} className={styles.statItem} style={{ '--si': i }}>
                <span className={styles.statVal}>{s.val}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section ref={manifestoRef} className={`${styles.manifesto} ${manifestoVis ? styles.manifestoVis : ''}`}>
        <div className="container">
          <p className={styles.manifesto__eyebrow}>Our Philosophy</p>
          <h2 className={styles.manifesto__statement}>
            We don't follow trends.<br />We follow <em>your skin.</em>
          </h2>
          <p className={styles.manifesto__sub}>
            At Brow Arch, every decision is guided by one thing: what is genuinely best for
            you. No shortcuts. No one-size-fits-all. Just honest, expert care that listens
            first and delivers real, lasting results.
          </p>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section ref={founderRef} className={`${styles.founder} ${founderVis ? styles.founderVis : ''}`}>
        <div className="container">
          <div className={styles.founder__grid}>
            <div className={styles.founder__imgWrap}>
              <img
                src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=700&q=80"
                alt="Brow Arch studio"
                loading="lazy"
              />
              <div className={styles.founder__imgAccent} />
            </div>
            <div className={styles.founder__text}>
              <p className="section-label">Meet the Founder</p>
              <h2 className={styles.founder__name}>Kinza</h2>
              <p className={styles.founder__bio}>
                Brow Arch was born from a simple belief — that everyone deserves a beauty
                experience that feels as good as it looks. Kinza founded the studio with
                over five years of professional training and a deep passion for skin health,
                precision technique, and personalised care.
              </p>
              <p className={styles.founder__bio}>
                Based in the heart of Illovo, Sandton, the studio is designed as a private
                sanctuary. Every appointment is crafted with intention — from the products
                selected to the aftercare advice given. Nothing is generic. Everything is
                for you.
              </p>
              <blockquote className={styles.founder__quote}>
                "Every client deserves to leave feeling like the best version of themselves —
                and my job is to make sure they do."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE EXPERIENCE ── */}
      <section ref={processRef} className={`${styles.process} ${processVis ? styles.processVis : ''}`}>
        <div className="container">
          <div className={styles.process__header}>
            <p className="section-label">What to Expect</p>
            <h2 className={styles.process__title}>The Brow Arch Experience</h2>
          </div>
          <div className={styles.process__steps}>
            {PROCESS.map((step, i) => (
              <div key={step.num} className={styles.process__step} style={{ '--pi': i }}>
                <div className={styles.process__numWrap}>
                  <span className={styles.process__num}>{step.num}</span>
                </div>
                <div className={styles.process__connector} aria-hidden="true" />
                <h3 className={styles.process__stepTitle}>{step.title}</h3>
                <p className={styles.process__stepText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section ref={galleryRef} className={`${styles.gallery} ${galleryVis ? styles.galleryVis : ''}`}>
        <div className="container">
          <div className={styles.gallery__grid}>
            {GALLERY.map((img, i) => (
              <div key={i} className={`${styles.gallery__item} ${styles[`gallery__item--${i}`]}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valRef} className={`${styles.values} ${valVis ? styles.valVis : ''}`}>
        <div className="container">
          <div className={styles.values__header}>
            <p className="section-label">Our Values</p>
            <h2 className={styles.values__title}>What We Stand For</h2>
          </div>
          <div className={styles.valList}>
            {[
              { num: '01', title: 'Personalised Treatments', text: 'Every treatment is tailored to your skin type, your goals, and your lifestyle. We never apply a one-size-fits-all approach.' },
              { num: '02', title: 'Premium Products',        text: 'We use only professional-grade, results-focused products selected for their efficacy — nothing is chosen by chance.' },
              { num: '03', title: 'Safe & Hygienic',         text: 'Strict hygiene protocols and a spotless studio environment ensure every visit is as safe as it is luxurious.' },
              { num: '04', title: 'Results Driven',          text: 'We measure success by how you look and feel one week after your appointment — not just the moment you leave the chair.' },
            ].map((v, i) => (
              <div key={v.num} className={styles.valItem} style={{ '--vi': i }}>
                <span className={styles.valNum}>{v.num}</span>
                <div className={styles.valDivider} />
                <div className={styles.valContent}>
                  <h3 className={styles.valTitle}>{v.title}</h3>
                  <p className={styles.valText}>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section ref={ctaRef} className={`${styles.closing} ${ctaVis ? styles.closingVis : ''}`}>
        <div className={styles.closing__bg}>
          <img
            src="https://images.unsplash.com/photo-1643684391140-c5056cfd3436?auto=format&fit=crop&w=1400&q=70"
            alt=""
            aria-hidden="true"
          />
          <div className={styles.closing__overlay} />
        </div>
        <div className="container">
          <div className={styles.closing__inner}>
            <p className={styles.closing__eyebrow}>Begin Your Journey</p>
            <h2 className={styles.closing__title}>
              Your most confident self<br />starts <em>here.</em>
            </h2>
            <p className={styles.closing__sub}>
              Located in Illovo, Sandton. Reach out via WhatsApp to book your first appointment.
            </p>
            <a
              href="https://wa.me/27838678709"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.closing__btn}
            >
              Chat on WhatsApp
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
