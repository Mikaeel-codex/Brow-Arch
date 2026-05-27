import Button from '../Button/Button';
import { useBooking } from '../../context/BookingContext';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service }) {
  const { name, category, description, duration, price, id, image } = service;
  const { openBooking } = useBooking();

  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        {image && <img src={image} alt={name} loading="lazy" className={styles.card__img} />}
        <span className={styles.card__category}>{category}</span>
      </div>
      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{name}</h3>
        <p className={styles.card__desc}>{description}</p>
        <div className={styles.card__meta}>
          <span className={styles.card__duration}>⏱ {duration} min</span>
          <span className={styles.card__price}>R{price.toLocaleString()}</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => openBooking([id])}>
          Book Now
        </Button>
      </div>
    </div>
  );
}
