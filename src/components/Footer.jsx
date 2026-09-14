import { Link } from 'react-router-dom';
import { Instagram, Phone, Leaf, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <footer className="bg-forest-950 text-white">
      {/* Top CTA strip */}
      <div className="border-b border-white/10">
        <div className="section-wrap py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/50 text-sm mb-2 eyebrow">{t('involvedEyebrow')}</p>
            <h2 className="text-2xl md:text-3xl font-bold">{t('involvedTitle')}</h2>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link to="/get-involved" className="btn-primary">
              {t('cta1')} <Arrow className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-ghost-white">
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-wrap py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-green-400" />
            </div>
            <span className="font-bold text-xl">{lang === 'ar' ? 'أكسجين' : 'Oxygen'}</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">{t('tagline')}</p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-5">{t('contact')}</p>
          <div className="space-y-3">
            <a
              href="tel:01035246291"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            >
              <Phone className="w-4 h-4 text-green-400 shrink-0" />
              <span dir="ltr" className="font-medium">01035246291</span>
            </a>
            <a
              href="tel:01559090846"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-green-400 shrink-0" />
              <span dir="ltr" className="font-medium">01559090846</span>
            </a>
            <a
              href="https://www.instagram.com/_oxygen_initiative/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4 text-green-400 shrink-0" />
              <span dir="ltr">@_oxygen_initiative</span>
            </a>
          </div>
        </div>

        {/* Nav */}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-5">الصفحات</p>
          <ul className="space-y-3">
            {[
              { to: '/',             label: t('home') },
              { to: '/about',        label: t('mission') },
              { to: '/campaigns',    label: t('campaigns') },
              { to: '/get-involved', label: t('getInvolved') },
              { to: '/contact',      label: t('contact') },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/60 hover:text-white text-sm transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">{t('rights')}</p>
          <p className="text-white/20 text-xs">Egypt 🌿</p>
        </div>
      </div>
    </footer>
  );
}
