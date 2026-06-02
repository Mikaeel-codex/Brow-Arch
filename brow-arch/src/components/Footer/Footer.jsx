import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.tagline}>
          <p className={styles.tagline__text}>
            <em>Your beauty. Your time. Your way.</em>
          </p>
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
