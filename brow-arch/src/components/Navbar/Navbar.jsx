import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Journal', to: '/journal' },
  { label: 'Visit', to: '/visit' },
];

export default function Navbar() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles['header--scrolled'] : ''}`}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        <img src="/Brow Arch.png" alt="" className={styles.logo__img} aria-hidden="true" />
        <span className={styles.logo__texts}>
          <span className={styles.logo__name}>BROW ARCH</span>
          <span className={styles.logo__sub}>Beauty Therapy</span>
        </span>
      </Link>

      <div className={`container ${styles.inner}`}>
        <nav className={`${styles.nav} ${menuOpen ? styles['nav--open'] : ''}`}>
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles['nav__link--active'] : ''}`
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          <button
            className={`${styles.nav__cta} ${styles.bookBtn}`}
            onClick={() => { openBooking(); closeMenu(); }}
          >
            Book Now
          </button>
        </nav>

        <button
          className={`${styles.bookBtn} ${styles.cta__desktop}`}
          onClick={() => openBooking()}
        >
          Book Now
        </button>

        <button
          className={`${styles.burger} ${menuOpen ? styles['burger--open'] : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
