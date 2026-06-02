import { useState } from 'react';
import Button from '../../components/Button/Button';
import { useBooking } from '../../context/BookingContext';
import { services, categories, categoryNotes } from '../../data/services';
import styles from './Services.module.css';

/* ── Inline SVG icons ── */
const FaceWaxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="6" />
    <circle cx="10" cy="9.5" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="14" cy="9.5" r="0.7" fill="currentColor" stroke="none" />
    <path d="M9.5 13 Q12 15 14.5 13" />
  </svg>
);
const LegsWaxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M10 3 C10 7 9.5 11 9.5 14 C9.5 17.5 9 20 8.5 21" />
    <path d="M14 3 C14 7 14.5 11 14.5 14 C14.5 17.5 15 20 15.5 21" />
  </svg>
);
const ArmsWaxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M6 17 Q9 13 13 11 Q17 9 20 10" />
    <path d="M4 20 Q8 16 12 14 Q16 12 20 13" />
    <path d="M13 11 L20 10 L20 13 L12 14" />
  </svg>
);
const IntimateWaxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M12 3 Q17 5 18 10 Q19 15 16 18 Q14 20 12 21 Q10 20 8 18 Q5 15 6 10 Q7 5 12 3Z" />
    <path d="M9 11 Q12 14 15 11" />
  </svg>
);
const BodyWaxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="12" cy="4.5" r="2.2" />
    <path d="M9 7.5 Q12 6.5 15 7.5 L14.5 15 L16 21" />
    <path d="M9.5 15 L8 21" />
    <path d="M9 10 L6 14" />
    <path d="M15 10 L18 14" />
  </svg>
);
const ThreadingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M4 16 Q8 8 12 8 Q16 8 20 16" />
    <path d="M7 15 Q10 10.5 12 10.5 Q14 10.5 17 15" />
  </svg>
);
const TintingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M3 12 Q7 6 12 6 Q17 6 21 12 Q17 18 12 18 Q7 18 3 12Z" />
    <circle cx="12" cy="12" r="2.5" />
    <line x1="10" y1="5.5" x2="9.2" y2="3.5" />
    <line x1="12" y1="5.2" x2="12" y2="3" />
    <line x1="14" y1="5.5" x2="14.8" y2="3.5" />
  </svg>
);
const ComboIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <rect x="13" y="3" width="8" height="8" rx="2" />
    <rect x="3" y="13" width="8" height="8" rx="2" />
    <path d="M17 13 v8 M13 17 h8" />
  </svg>
);
const LashLiftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M3 13 Q7 7 12 7 Q17 7 21 13" />
    <circle cx="12" cy="13" r="2.5" />
    <line x1="8"  y1="6"   x2="7"  y2="3.5" />
    <line x1="10" y1="5.5" x2="9.5" y2="3" />
    <line x1="12" y1="5.2" x2="12" y2="2.8" />
    <line x1="14" y1="5.5" x2="14.5" y2="3" />
    <line x1="16" y1="6"   x2="17" y2="3.5" />
  </svg>
);
const FacialsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="12" cy="11" r="7" />
    <circle cx="9.5" cy="10" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="10" r="0.7" fill="currentColor" stroke="none" />
    <path d="M9.5 14 Q12 16 14.5 14" />
    <line x1="5" y1="11" x2="3.5" y2="11" />
    <line x1="19" y1="11" x2="20.5" y2="11" />
  </svg>
);

const BASE = 'https://images.unsplash.com/photo-';
const FIT  = '?auto=format&fit=crop&w=900&q=75';

const categoryMeta = {
  'Face Wax':     { num: '01', desc: 'Smooth, gentle waxing for flawless, glowing skin.',      img: `${BASE}1616394584738-fc6e612e71b9${FIT}`, Icon: FaceWaxIcon     },
  'Legs Wax':     { num: '02', desc: 'Long-lasting smoothness with premium care.',             img: `${BASE}1585945037805-5fd82c2e60b1${FIT}`, Icon: LegsWaxIcon     },
  'Arms Wax':     { num: '03', desc: 'Silky smooth arms in minutes.',                          img: `${BASE}1519823551278-64ac92734fb1${FIT}`, Icon: ArmsWaxIcon     },
  'Intimate Wax': { num: '04', desc: 'Comfortable, precise & discreet.',                       img: `${BASE}1643684391140-c5056cfd3436${FIT}`, Icon: IntimateWaxIcon },
  'Body Wax':     { num: '05', desc: 'Smooth, radiant skin from head to toe.',                 img: `${BASE}1570172619644-dfd03ed5d881${FIT}`, Icon: BodyWaxIcon     },
  'Threading':    { num: '06', desc: 'Precision shaping for perfect brows.',                   img: `${BASE}1589710751893-f9a6770ad71b${FIT}`, Icon: ThreadingIcon   },
  'Tinting':      { num: '07', desc: 'Define your brows & lashes with precision tinting.',     img: `${BASE}1587910234573-d6fc84743bc8${FIT}`, Icon: TintingIcon     },
  'Facials':      { num: '08', desc: 'Rejuvenating facials for a healthy, radiant glow.',      img: `${BASE}1619451427882-6aaaded0cc61${FIT}`, Icon: FacialsIcon    },
  'Lash Lift':    { num: '09', desc: 'Curl, lift & transform your natural lashes.',            img: `${BASE}1587910234573-d6fc84743bc8${FIT}`, Icon: LashLiftIcon    },
  'Combo Deals':  { num: '10', desc: 'Save more with our bundled treatment packages.',         img: `${BASE}1570172619644-dfd03ed5d881${FIT}`, Icon: ComboIcon       },
};

export default function Services() {
  const { openBooking } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState(null);

  /* ── Treatments view ── */
  if (selectedCategory) {
    const catServices = services.filter((s) => s.category === selectedCategory);
    const note = categoryNotes[selectedCategory];
    const meta = categoryMeta[selectedCategory];

    return (
      <main className={styles.main}>
        <section
          className={styles.treatHero}
          style={{ backgroundImage: `url(${meta.img})` }}
        >
          <div className={styles.treatHero__overlay} />
          <div className={`container ${styles.treatHero__content}`}>
            <button className={styles.backBtn} onClick={() => setSelectedCategory(null)}>
              ← All Services
            </button>
            <h1 className={styles.treatHero__title}>{selectedCategory}</h1>
            {note && <p className={styles.treatHero__note}>{note}</p>}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className={styles.treatGrid}>
              {catServices.map((service) => (
                <div key={service.id} className={styles.treatCard}>
                  <span className={styles.treatCard__name}>{service.name}</span>
                  <div className={styles.treatCard__footer}>
                    <span className={styles.treatCard__duration}>{service.duration} min</span>
                    <span className={styles.treatCard__price}>R{service.price.toLocaleString()}</span>
                    <Button variant="outline" size="sm" onClick={() => openBooking([service.id])}>
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    );
  }

  /* ── Grid view ── */
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {/* Intro text cell */}
            <div className={styles.intro}>
              <p className="section-label">What We Offer</p>
              <h1 className={styles.intro__title}>Our Services</h1>
              <p className={styles.intro__sub}>
                Bespoke treatments designed to help you look and feel your best.
              </p>
              <span className={styles.intro__line} />
            </div>

            {/* Category cards */}
            {categories.map((cat) => {
              const { num, desc, img, Icon } = categoryMeta[cat];
              return (
                <div
                  key={cat}
                  className={styles.card}
                  style={{ backgroundImage: `url(${img})` }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <div className={styles.card__overlay} />

                  <div className={styles.card__top}>
                    <div className={styles.card__num}>
                      <span>{num}</span>
                      <span className={styles.card__numLine} />
                    </div>
                    <div className={styles.card__iconWrap}>
                      <Icon />
                    </div>
                  </div>

                  <div className={styles.card__bottom}>
                    <h3 className={styles.card__name}>{cat}</h3>
                    <p className={styles.card__desc}>{desc}</p>
                    <div className={styles.card__cta}>
                      <span>Explore Treatments</span>
                      <span className={styles.card__arrow}>→</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quote card — fills the last empty grid cell */}
            <div className={styles.quoteCard}>
              <span className={styles.quoteCard__mark}>"</span>
              <p className={styles.quoteCard__text}>
                Your skin deserves expert care — not guesswork.
              </p>
              <span className={styles.quoteCard__sub}>
                Every treatment is personalised, precise, and held to the highest standard.
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
