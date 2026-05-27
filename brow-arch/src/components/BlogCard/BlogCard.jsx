import { Link } from 'react-router-dom';
import styles from './BlogCard.module.css';

export default function BlogCard({ post }) {
  const { title, category, excerpt, date, readTime, slug, image } = post;

  return (
    <article className={styles.card}>
      <div className={styles.card__image}>
        {image && <img src={image} alt={title} loading="lazy" className={styles.card__img} />}
      </div>
      <div className={styles.card__body}>
        <span className={styles.card__category}>{category}</span>
        <h3 className={styles.card__title}>{title}</h3>
        <p className={styles.card__excerpt}>{excerpt}</p>
        <div className={styles.card__footer}>
          <span className={styles.card__meta}>{date} · {readTime}</span>
          <Link to={`/journal/${slug}`} className={styles.card__link}>
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
