import { useState } from 'react';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import Button from '../../components/Button/Button';
import { useGoogleReviews } from '../../hooks/useGoogleReviews';
import { reviews as staticReviews } from '../../data/reviews';
import styles from './Reviews.module.css';

const LEAVE_REVIEW_URL = 'https://www.google.com/search?q=kinza+hair+%26+beauty&sca_esv=f309c00a8710a5de&biw=1920&bih=945&sxsrf=ANbL-n5ZguCj2ioyGRqrfc8geM9bX6vTGw%3A1780347237262&ei=ZfEdavXWD8GXxc8Pz4PywQw&oq=kinza&gs_lp=Egxnd3Mtd2l6LXNlcnAiBWtpbnphKgIIADIEECMYJzIKECMYgAQYigUYJzIEECMYJzIKEC4YgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQ0j9IVDQDFjPFHABeAGQAQCYAfIBoAGfCaoBAzItNbgBAcgBAPgBAZgCBqACvAmoAhDCAgcQIxjqAhgnwgIHEC4Y6gIYJ8ICFhAAGIAEGIoFGEMY5wYY6gIYtALYAQHCAhAQABgDGI8BGOoCGLQC2AEBwgIQEC4YAxiPARjqAhi0AtgBAcICCxAAGIAEGIoFGJECwgITEC4YgAQYigUYQxixAxjHARjRA8ICCBAuGLEDGIAEwgIIEC4YgAQYsQPCAgsQLhiABBjHARjRA8ICCBAAGIAEGLEDwgIREC4YgAQYigUYkQIYxwEYrwHCAg4QLhiABBiKBRiNBhixA8ICBRAAGIAEwgILEAAYgAQYsQMYgwHCAgUQLhiABMICDhAuGIAEGLEDGMcBGNEDmAMG8QVYyH_k7xWWrLoGBggBEAEYAZIHBTEuMC41oAf5VbIHAzItNbgHtQnCBwMyLTbIBxeACAE&sclient=gws-wiz-serp';

export default function Reviews() {
  const { reviews: liveReviews, loading } = useGoogleReviews();

  // Use live reviews if loaded, otherwise fall back to static data
  const reviews = liveReviews.length > 0 ? liveReviews : staticReviews;

  const CARDS_PER_PAGE = 3;
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
          <Button href={LEAVE_REVIEW_URL} variant="outline" size="sm">
            Leave a Review
          </Button>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className={styles.loading}>
              <span className={styles.loading__dot} />
              <span className={styles.loading__dot} />
              <span className={styles.loading__dot} />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>
    </main>
  );
}
