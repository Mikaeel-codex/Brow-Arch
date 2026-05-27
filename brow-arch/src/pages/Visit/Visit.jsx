import Button from '../../components/Button/Button';
import { useBooking } from '../../context/BookingContext';
import styles from './Visit.module.css';

const contactInfo = [
  {
    icon: '📍',
    label: 'Address',
    lines: ['Illovo, Sandton', 'Johannesburg, 2196'],
  },
  {
    icon: '📞',
    label: 'Phone',
    lines: ['+27 00 000 0000'],
  },
  {
    icon: '✉️',
    label: 'Email',
    lines: ['hello@browarchbeauty.co.za'],
  },
  {
    icon: '🕐',
    label: 'Hours',
    lines: [
      'Monday – Friday: 8:00 – 18:00',
      'Saturday: 9:00 – 15:00',
      'Sunday: By appointment only',
    ],
  },
];

export default function Visit() {
  const { openBooking } = useBooking();
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
              <div className={styles.map__placeholder}>
                <span>📍</span>
                <p>Illovo, Sandton</p>
                <p className={styles.map__sub}>Map placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container text-center">
          <h2 className={styles.cta__heading}>
            Ready to book your appointment?
          </h2>
          <p className={styles.cta__sub}>
            Reach out via WhatsApp or email — we'd love to welcome you to the studio.
          </p>
          <Button variant="primary" size="lg" onClick={openBooking}>
            Book Appointment
          </Button>
        </div>
      </section>
    </main>
  );
}
