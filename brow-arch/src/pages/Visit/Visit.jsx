import styles from './Visit.module.css';

const contactInfo = [
  {
    icon: '📍',
    label: 'Address',
    lines: ['Inside Pinnacurl, 16 Fort St', 'Illovo, Sandton, 2196'],
  },
  {
    icon: '📞',
    label: 'Phone',
    lines: ['+27 83 867 8709'],
  },
  {
    icon: '🕐',
    label: 'Hours',
    lines: [
      'Tuesday – Friday: 9:00am – 5:00pm',
      'Saturday: 9:00am – 2:00pm',
      'Sunday, Monday & public holidays: Closed',
    ],
  },
];

export default function Visit() {
  return (
    <main className={styles.main}>
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <p className="section-label">Find Us</p>
          <h1 className={styles.header__title}>
            Visit Us
          </h1>
          <p className={styles.header__sub}>
            Located in the heart of Illovo, Sandton.
          </p>
        </div>
      </section>

      {/* Info + Map */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.info}>
              {contactInfo.map((item) => (
                <div key={item.label} className={styles.info__item}>
                  <span className={styles.info__icon}>{item.icon}</span>
                  <div>
                    <p className={styles.info__label}>{item.label}</p>
                    {item.lines.map((line, i) => (
                      <p key={i} className={styles.info__line}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.map}>
              <iframe
                title="Brow Arch location"
                src="https://maps.google.com/maps?q=Pinnacurl+Illovo+16+Fort+St+Sandton&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="420"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container text-center">
          <h2 className={styles.cta__heading}>
            Ready to visit us?
          </h2>
          <p className={styles.cta__sub}>
            Reach out via WhatsApp — we'd love to welcome you to the studio.
          </p>
        </div>
      </section>
    </main>
  );
}
