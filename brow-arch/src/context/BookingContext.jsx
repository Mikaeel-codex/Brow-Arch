import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preSelected, setPreSelected] = useState([]);

  const openBooking = (initialServiceIds = []) => {
    setPreSelected(initialServiceIds);
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking, preSelected }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
}
