import { MapPin, Phone, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Contact() {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen pt-24 bg-cream-50 pb-20">
      <div className="section-wrap">
        {/* Header */}
        <Reveal className="py-16 md:py-24 max-w-2xl">
          <p className="eyebrow mb-4">{t('contact')}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">{t('contactTitle')}</h1>
          <p className="text-stone-500 text-lg leading-relaxed">{t('contactBody')}</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 pb-16">
          {/* Contact info */}
          <div className="space-y-6">
            {/* Phone 1 */}
            <Reveal>
              <a
                href="tel:01035246291"
                className="group flex items-center gap-5 p-6 bg-white rounded-2xl border border-stone-200/60 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                  <Phone className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-medium mb-1">{t('phone')}</p>
                  <p className="text-stone-900 font-bold text-xl" dir="ltr">01035246291</p>
                  <p className="text-green-600 text-xs mt-1">
                    {lang === 'ar' ? 'اضغط للاتصال' : 'Tap to call'}
                  </p>
                </div>
              </a>
            </Reveal>

            {/* Phone 2 */}
            <Reveal delay={0.05}>
              <a
                href="tel:01559090846"
                className="group flex items-center gap-5 p-6 bg-white rounded-2xl border border-stone-200/60 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                  <Phone className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-medium mb-1">{t('phone')}</p>
                  <p className="text-stone-900 font-bold text-xl" dir="ltr">01559090846</p>
                  <p className="text-green-600 text-xs mt-1">
                    {lang === 'ar' ? 'اضغط للاتصال' : 'Tap to call'}
                  </p>
                </div>
              </a>
            </Reveal>

            {/* Instagram */}
            <Reveal delay={0.1}>
              <a
                href="https://www.instagram.com/_oxygen_initiative/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 bg-white rounded-2xl border border-stone-200/60 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                  <Instagram className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-medium mb-1">Instagram</p>
                  <p className="text-stone-900 font-bold text-xl" dir="ltr">@_oxygen_initiative</p>
                  <p className="text-green-600 text-xs mt-1">
                    {lang === 'ar' ? 'تابعنا على الإنستجرام' : 'Follow us on Instagram'}
                  </p>
                </div>
              </a>
            </Reveal>

            {/* Address */}
            <Reveal delay={0.15}>
              <div className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-stone-200/60">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-medium mb-1">{lang === 'ar' ? 'المقر' : 'Location'}</p>
                  <p className="text-stone-900 font-bold text-lg">{t('address')}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={e => e.preventDefault()}
              className="bg-white rounded-2xl border border-stone-200/60 p-8 md:p-10 space-y-6"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                {lang === 'ar' ? 'ابعتلنا رسالة' : 'Send us a message'}
              </h2>

              {[
                { id: 'name',    label: t('name'),    type: 'text',  dir: undefined },
                { id: 'email',   label: t('email'),   type: 'email', dir: 'ltr'     },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-sm font-semibold text-stone-700 mb-2">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    dir={f.dir}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-cream-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-400 transition"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-2">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-cream-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-400 transition resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
                {t('send')}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
