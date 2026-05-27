import Button from '../Button/Button';
import { useBooking } from '../../context/BookingContext';
import styles from './TreatmentCard.module.css';

export default function TreatmentCard({ treatment }) {
  const { name, category, description, duration, price, id, image } = treatment;
  const { openBooking } = useBooking();

  return (
    <div className={styles.card}>
      <div className={styles.card__thumb}>
        {image && <img src={image} alt={name} loading="lazy" className={styles.card__thumbImg} />}
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__info}>
          <span className={styles.card__category}>{category}</span>
          <h3 className={styles.card__title}>{name}</h3>
          <p className={styles.card__desc}>{description}</p>
        </div>
        <div className={styles.card__action}>
          <div className={styles.card__meta}>
            <span className={styles.card__duration}>⏱ {duration} min</span>
            <span className={styles.card__price}>R{price.toLocaleString()}</span>
          </div>
          <Button variant="primary" size="sm" onClick={() => openBooking([id])}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
