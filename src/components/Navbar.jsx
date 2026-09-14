import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const { pathname }              = useLocation();
  const { lang, toggleLanguage, t } = useLanguage();

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  // Transparent when at top of homepage; solid otherwise
  const transparent = isHome && !scrolled;

  const links = [
    { to: '/',             label: t('home') },
    { to: '/about',        label: t('mission') },
    { to: '/campaigns',    label: t('campaigns') },
    { to: '/contact',      label: t('contact') },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent py-6'
          : 'bg-white/95 backdrop-blur-xl border-b border-stone-200/60 py-4 shadow-sm'
      }`}
    >
      <nav className="section-wrap flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            transparent ? 'bg-green-500/20' : 'bg-green-100'
          }`}>
            <Leaf className={`w-4.5 h-4.5 ${transparent ? 'text-green-300' : 'text-green-600'}`} />
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors ${
            transparent ? 'text-white' : 'text-stone-900'
          }`}>
            {lang === 'ar' ? 'أكسجين' : 'Oxygen'}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm font-medium transition-colors relative group ${
                  pathname === l.to
                    ? (transparent ? 'text-green-300' : 'text-green-700')
                    : (transparent ? 'text-white/70 hover:text-white' : 'text-stone-600 hover:text-stone-900')
                }`}
              >
                {l.label}
                {pathname === l.to && (
                  <span className={`absolute -bottom-1 inset-x-0 h-0.5 rounded-full ${transparent ? 'bg-green-400' : 'bg-green-500'}`} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              transparent ? 'text-white/70 hover:text-white' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          <Link
            to="/get-involved"
            className={`btn-primary text-sm py-2.5 px-5 ${
              transparent ? '!bg-white !text-green-700 hover:!bg-green-50' : ''
            }`}
          >
            {t('donate')}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleLanguage} className={transparent ? 'text-white/80' : 'text-stone-600'}>
            <Globe className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsOpen(o => !o)}
            className={transparent ? 'text-white' : 'text-stone-800'}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <div className="section-wrap py-6 space-y-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    pathname === l.to
                      ? 'bg-green-50 text-green-700'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-4 pb-2">
                <Link to="/get-involved" className="btn-primary w-full justify-center">
                  {t('donate')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
