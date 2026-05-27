import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useBooking } from '../../context/BookingContext';
import styles from './Footer.module.css';

const features = [
  {
    icon: '📅',
    title: 'Easy Online Booking',
    text: 'Book your appointment in seconds via WhatsApp or our booking link — available 24/7.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    text: 'Your details are kept strictly confidential. A calm, private space just for you.',
  },
  {
    icon: '⏰',
    title: 'Appointment Based',
    text: 'By appointment only — ensuring you always receive undivided, personalised attention.',
  },
];

export default function Footer() {
  const { openBooking } = useBooking();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.features}>
          {features.map((f) => (
            <div key={f.title} className={styles.feature}>
              <span className={styles.feature__icon}>{f.icon}</span>
              <h4 className={styles.feature__title}>{f.title}</h4>
              <p className={styles.feature__text}>{f.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.tagline}>
          <p className={styles.tagline__text}>
            <em>Your beauty. Your time. Your way.</em>
          </p>
          <Button variant="outline" size="md" onClick={openBooking}>
            Book Appointment
          </Button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottom__logo}>
            <span className={styles.logo__name}>BROW ARCH</span>
            <span className={styles.logo__sub}>Beauty Therapy</span>
          </div>
          <nav className={styles.bottom__nav}>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/visit">Visit</Link>
          </nav>
          <p className={styles.bottom__copy}>
            © {new Date().getFullYear()} Brow Arch Beauty Therapy. Illovo, Sandton.
          </p>
        </div>
      </div>
    </footer>
  );
}
