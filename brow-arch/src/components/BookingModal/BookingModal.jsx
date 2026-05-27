import { useEffect, useRef, useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { services, categories } from '../../data/services';
import styles from './BookingModal.module.css';

export default function BookingModal() {
  const { isOpen, closeBooking, preSelected } = useBooking();
  const [selected, setSelected] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const overlayRef = useRef(null);

  // Sync pre-selected services when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelected(preSelected);
      setActiveCategory('All');
    }
  }, [isOpen, preSelected]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeBooking(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeBooking]);

  const toggleService = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const filtered =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  const selectedServices = services.filter((s) => selected.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  const buildWhatsAppMessage = () => {
    if (selectedServices.length === 0) return '';
    const lines = selectedServices
      .map((s) => `• ${s.name} (${s.duration}min) — R${s.price.toLocaleString()}`)
      .join('\n');
    return encodeURIComponent(
      `Hi! I'd like to book the following:\n${lines}\n\nTotal: ${totalDuration}min | R${totalPrice.toLocaleString()}`
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) closeBooking(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Book Appointment"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modal__header}>
          <div>
            <h2 className={styles.modal__title}>Book Your Appointment</h2>
            <p className={styles.modal__subtitle}>
              Select one or more treatments — we'll handle the rest.
            </p>
          </div>
          <button className={styles.close} onClick={closeBooking} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Category Filter */}
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filter} ${activeCategory === cat ? styles['filter--active'] : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service List */}
        <div className={styles.list}>
          {filtered.map((service) => {
            const isSelected = selected.includes(service.id);
            return (
              <button
                key={service.id}
                className={`${styles.item} ${isSelected ? styles['item--selected'] : ''}`}
                onClick={() => toggleService(service.id)}
                aria-pressed={isSelected}
              >
                <div className={styles.item__check}>
                  {isSelected && <span className={styles.item__tick}>✓</span>}
                </div>
                <div className={styles.item__info}>
                  <span className={styles.item__name}>{service.name}</span>
                  <span className={styles.item__category}>{service.category}</span>
                  <p className={styles.item__desc}>{service.description}</p>
                </div>
                <div className={styles.item__meta}>
                  <span className={styles.item__duration}>⏱ {service.duration} min</span>
                  <span className={styles.item__price}>R{service.price.toLocaleString()}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Summary Bar */}
        <div className={`${styles.summary} ${selected.length > 0 ? styles['summary--visible'] : ''}`}>
          <div className={styles.summary__info}>
            <span className={styles.summary__count}>
              {selected.length} service{selected.length !== 1 ? 's' : ''} selected
            </span>
            {selected.length > 0 && (
              <span className={styles.summary__totals}>
                {totalDuration} min &nbsp;·&nbsp; R{totalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className={styles.summary__actions}>
            <button className={styles.summary__clear} onClick={() => setSelected([])}>
              Clear
            </button>
            <a
              href={`https://wa.me/27000000000?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.summary__book} ${selected.length === 0 ? styles['summary__book--disabled'] : ''}`}
              onClick={(e) => { if (selected.length === 0) e.preventDefault(); }}
            >
              Continue via WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
