import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Button from '../Button/Button';
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { openBooking } = useBooking();
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles['header--scrolled'] : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logo__name}>BROW ARCH</span>
          <span className={styles.logo__sub}>Beauty Therapy</span>
        </Link>

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
          <div className={styles.nav__cta}>
            <Button variant="primary" size="sm" onClick={() => { openBooking(); closeMenu(); }}>
              Book Appointment
            </Button>
          </div>
        </nav>

        <Button href="https://wa.me/27000000000" variant="primary" size="sm" className={styles.cta__desktop}>
          Book Appointment
        </Button>

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
