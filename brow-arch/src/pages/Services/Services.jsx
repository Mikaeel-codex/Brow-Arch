import { useState } from 'react';
import TreatmentCard from '../../components/TreatmentCard/TreatmentCard';
import Button from '../../components/Button/Button';
import { useBooking } from '../../context/BookingContext';
import { services, categories } from '../../data/services';
import styles from './Services.module.css';

export default function Services() {
  const { openBooking } = useBooking();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <main className={styles.main}>
      {/* Page Header */}
      <section className={styles.header}>
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h1 className={styles.header__title}>Our Services</h1>
          <p className={styles.header__sub}>
            Bespoke treatments designed to help you look and feel your best.
          </p>
        </div>
      </section>

      {/* Filter + List */}
      <section className="section">
        <div className="container">
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filter} ${activeCategory === cat ? styles['filter--active'] : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.list}>
            {filtered.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.cta__inner}>
            <div>
              <h2 className={styles.cta__heading}>Not sure which treatment is right for you?</h2>
              <p className={styles.cta__sub}>
                Book a consultation and we'll create a personalised plan just for you.
              </p>
            </div>
            <Button variant="white" size="lg" onClick={openBooking}>
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
