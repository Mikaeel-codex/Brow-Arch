import styles from './ReviewCard.module.css';

export default function ReviewCard({ review }) {
  const { name, rating, date, text, treatment } = review;

  return (
    <div className={styles.card}>
      <div className={styles.card__stars}>
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className={styles.star}>★</span>
        ))}
      </div>
      <p className={styles.card__text}>"{text}"</p>
      <div className={styles.card__footer}>
        <div>
          <span className={styles.card__name}>{name}</span>
          {treatment && <span className={styles.card__treatment}>{treatment}</span>}
        </div>
        <span className={styles.card__date}>{date}</span>
      </div>
    </div>
  );
}
