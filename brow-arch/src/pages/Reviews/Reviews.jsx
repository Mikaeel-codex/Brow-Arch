import { useState } from 'react';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import Button from '../../components/Button/Button';
import { useBooking } from '../../context/BookingContext';
import { reviews } from '../../data/reviews';
import styles from './Reviews.module.css';

const CARDS_PER_PAGE = 3;

export default function Reviews() {
  const { openBooking } = useBooking();
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(reviews.length / CARDS_PER_PAGE);
  const visible = reviews.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <main className={styles.main}>
      {/* Header */}
      <section className={styles.header}>
        <div className="container text-center">
          <p className="section-label">Client Stories</p>
          <h1 className={styles.header__title}>What My Clients Say</h1>
          <p className={styles.header__sub}>Real results. Real people.</p>
          <div className={styles.rating}>
            <div className={styles.rating__stars}>
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className={styles.rating__star}>{s}</span>
              ))}
            </div>
            <span className={styles.rating__score}>5.0</span>
            <span className={styles.rating__count}>based on 120+ Google reviews</span>
          </div>
          <Button
            href="https://g.page/r/review"
            variant="outline"
            size="sm"
          >
            Leave a Review
          </Button>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {visible.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === page ? styles['dot--active'] : ''}`}
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.cta__inner}>
            <div>
              <h2 className={styles.cta__heading}>Ready to experience it yourself?</h2>
              <p className={styles.cta__sub}>
                Join hundreds of happy clients and book your first appointment today.
              </p>
            </div>
            <Button variant="white" size="lg" onClick={openBooking}>
              Book Appointment
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
