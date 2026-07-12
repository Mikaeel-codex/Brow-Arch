import { useEffect, useRef, useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { services, categories } from '../../data/services';
import styles from './BookingModal.module.css';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function getTimeSlots(date) {
  if (!date) return [];
  const day = date.getDay();
  if (day === 0 || day === 1) return [];       // Sun & Mon — closed
  const start = 9;                             // Tue–Sat: 09:00
  const end   = day === 6 ? 14 : 17;           // Sat: until 14:00, Tue–Fri: until 17:00
  const slots = [];
  for (let t = start; t <= end; t += 0.5) {
    const h = Math.floor(t);
    const m = t % 1 === 0 ? '00' : '30';
    slots.push(`${String(h).padStart(2, '0')}:${m}`);
  }
  return slots;
}

function CalendarPicker({ selectedDate, onDateSelect, selectedTime, onTimeSelect }) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const daysInMonth   = new Date(year, month + 1, 0).getDate();
  const firstWeekday  = new Date(year, month, 1).getDay();

  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const timeSlots = getTimeSlots(selectedDate);

  return (
    <div className={styles.picker}>
      {/* Month navigation */}
      <div className={styles.cal__nav}>
        <button className={styles.cal__arrow} onClick={prevMonth}>‹</button>
        <span className={styles.cal__heading}>{MONTHS[month]} {year}</span>
        <button className={styles.cal__arrow} onClick={nextMonth}>›</button>
      </div>

      {/* Weekday labels */}
      <div className={styles.cal__weekdays}>
        {WEEKDAYS.map(d => <span key={d} className={styles.cal__wday}>{d}</span>)}
      </div>

      {/* Day grid */}
      <div className={styles.cal__grid}>
        {cells.map((date, i) => {
          if (!date) return <span key={`blank-${i}`} />;
          const isPast     = date < today;
          const isClosed   = date.getDay() === 0 || date.getDay() === 1; // Sun & Mon
          const isDisabled = isPast || isClosed;
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          const isToday    = date.toDateString() === today.toDateString();
          return (
            <button
              key={date.getDate()}
              disabled={isDisabled}
              onClick={() => { onDateSelect(date); onTimeSelect(null); }}
              className={[
                styles.cal__day,
                isDisabled ? styles['cal__day--disabled'] : '',
                isToday    ? styles['cal__day--today']    : '',
                isSelected ? styles['cal__day--selected'] : '',
              ].filter(Boolean).join(' ')}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className={styles.times}>
          <p className={styles.times__label}>
            {selectedDate.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          {timeSlots.length > 0 ? (
            <div className={styles.times__grid}>
              {timeSlots.map(t => (
                <button
                  key={t}
                  onClick={() => onTimeSelect(t)}
                  className={`${styles.timeslot} ${selectedTime === t ? styles['timeslot--selected'] : ''}`}
                >
                  {t}
                </button>
              ))}
            </div>
          ) : (
            <p className={styles.times__note}>
              We are closed on Sundays, Mondays and public holidays.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function BookingModal() {
  const { isOpen, closeBooking, preSelected } = useBooking();
  const [step, setStep]                 = useState(1);
  const [selected, setSelected]         = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSelected(preSelected);
      setActiveCategory('All');
      setStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [isOpen, preSelected]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeBooking(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeBooking]);

  const toggleService = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  const selectedServices  = services.filter(s => selected.includes(s.id));
  const totalPrice        = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration     = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  const buildWhatsAppMessage = () => {
    if (!selectedServices.length) return '';
    const lines = selectedServices
      .map(s => `• ${s.name} (${s.duration}min) — R${s.price.toLocaleString()}`)
      .join('\n');
    const dateStr = selectedDate
      ? selectedDate.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    return encodeURIComponent(
      `Hi! I'd like to book the following:\n${lines}\n\nPreferred date: ${dateStr}\nPreferred time: ${selectedTime}\n\nTotal: ${totalDuration}min | R${totalPrice.toLocaleString()}`
    );
  };

  if (!isOpen) return null;

  const canProceedToWhatsApp = selectedDate && selectedTime;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) closeBooking(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Book Appointment"
    >
      <div className={styles.modal}>

        {/* ── STEP INDICATOR ── */}
        <div className={styles.steps}>
          <span className={`${styles.step} ${step === 1 ? styles['step--active'] : styles['step--done']}`}>
            1. Services
          </span>
          <span className={styles.steps__divider}>›</span>
          <span className={`${styles.step} ${step === 2 ? styles['step--active'] : ''}`}>
            2. Date & Time
          </span>
        </div>

        {/* ── HEADER ── */}
        <div className={styles.modal__header}>
          <div>
            {step === 1 ? (
              <>
                <h2 className={styles.modal__title}>Select Treatments</h2>
                <p className={styles.modal__subtitle}>Choose one or more services to book.</p>
              </>
            ) : (
              <>
                <h2 className={styles.modal__title}>Date & Time</h2>
                <p className={styles.modal__subtitle}>Pick your preferred appointment slot.</p>
              </>
            )}
          </div>
          <button className={styles.close} onClick={closeBooking} aria-label="Close">✕</button>
        </div>

        {/* ══════════ STEP 1: SERVICES ══════════ */}
        {step === 1 && (
          <>
            <div className={styles.filters}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filter} ${activeCategory === cat ? styles['filter--active'] : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={styles.list}>
              {filtered.map(service => {
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
                    </div>
                    <div className={styles.item__meta}>
                      <span className={styles.item__duration}>⏱ {service.duration} min</span>
                      <span className={styles.item__price}>R{service.price.toLocaleString()}</span>
                    </div>
                  </button>
                );
              })}
            </div>

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
                <button className={styles.summary__clear} onClick={() => setSelected([])}>Clear</button>
                <button
                  className={styles.summary__book}
                  disabled={selected.length === 0}
                  onClick={() => setStep(2)}
                >
                  Next: Date & Time →
                </button>
              </div>
            </div>
          </>
        )}

        {/* ══════════ STEP 2: DATE & TIME ══════════ */}
        {step === 2 && (
          <>
            <button className={styles.backBtn} onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(null); }}>
              ← Back to services
            </button>

            <div className={styles.pickerWrap}>
              <CalendarPicker
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
              />
            </div>

            <div className={`${styles.summary} ${styles['summary--visible']}`}>
              <div className={styles.summary__info}>
                <span className={styles.summary__count}>
                  {selectedDate
                    ? selectedDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
                    : 'No date selected'}
                  {selectedTime && ` at ${selectedTime}`}
                </span>
                <span className={styles.summary__totals}>
                  {totalDuration} min &nbsp;·&nbsp; R{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className={styles.summary__actions}>
                <a
                  href={canProceedToWhatsApp ? `https://wa.me/27838678709?text=${buildWhatsAppMessage()}` : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.summary__book} ${!canProceedToWhatsApp ? styles['summary__book--disabled'] : ''}`}
                  onClick={e => { if (!canProceedToWhatsApp) e.preventDefault(); }}
                >
                  Confirm via WhatsApp →
                </a>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
