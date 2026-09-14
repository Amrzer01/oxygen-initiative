import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar      from './components/Navbar.jsx';
import Footer      from './components/Footer.jsx';
import IntroScreen from './components/IntroScreen.jsx';

const Home        = lazy(() => import('./pages/Home.jsx'));
const About       = lazy(() => import('./pages/About.jsx'));
const Campaigns   = lazy(() => import('./pages/Campaigns.jsx'));
const GetInvolved = lazy(() => import('./pages/GetInvolved.jsx'));
const Contact     = lazy(() => import('./pages/Contact.jsx'));

const INTRO_KEY = 'ox_intro_seen';

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname]);
  return null;
}

export default function App() {
  const location  = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem(INTRO_KEY);
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, '1');
    setShowIntro(false);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroScreen key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="min-h-screen flex flex-col"
      >
        <ScrollReset />
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Suspense fallback={null}>
              <Routes location={location} key={location.pathname}>
                <Route path="/"            element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about"       element={<PageTransition><About /></PageTransition>} />
                <Route path="/campaigns"   element={<PageTransition><Campaigns /></PageTransition>} />
                <Route path="/get-involved"element={<PageTransition><GetInvolved /></PageTransition>} />
                <Route path="/contact"     element={<PageTransition><Contact /></PageTransition>} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
