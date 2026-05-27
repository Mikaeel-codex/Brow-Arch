import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import BookingModal from './components/BookingModal/BookingModal';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import About from './pages/About/About';
import Reviews from './pages/Reviews/Reviews';
import Journal from './pages/Journal/Journal';
import Visit from './pages/Visit/Visit';
import styles from './App.module.css';

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <ScrollProgress />
        {/* Film grain overlay */}
        <div className={styles.grain} aria-hidden="true" />
        <Navbar />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about"   element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/visit"   element={<Visit />} />
        </Routes>
        <Footer />
        <BookingModal />
      </BrowserRouter>
    </BookingProvider>
  );
}
