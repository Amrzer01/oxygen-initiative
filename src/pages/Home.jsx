import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight,
  Wind, Thermometer, Eye, Users, Sprout,
  Instagram, Phone
} from 'lucide-react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { statistics, campaigns } from '../data/mockData';

/* ─── helpers ──────────────────────────────────────────────── */
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

const Stagger = ({ children, className = '' }) => (
  <motion.div
    variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-60px' }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerChild = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/* Animated number counter */
function Counter({ value, suffix = '', label }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count  = useRef(0);
  const display = useRef(null);

  if (inView && display.current) {
    const target   = value;
    const duration = 2200;
    const start    = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const cur  = Math.floor(ease * target);
      if (display.current) display.current.textContent = cur.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return (
    <div ref={ref} className="text-center">
      <p
        ref={display}
        className="text-5xl md:text-6xl font-bold text-green-600 tabular-nums"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {inView ? '' : '0'}
      </p>
      <p className="mt-2 text-stone-500 text-sm font-medium">{label}</p>
    </div>
  );
}

/* Parallax image wrapper */
function ParaImg({ src, alt, className = '' }) {
  const ref  = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y    = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src} alt={alt}
        style={{ y, scale: 1.18 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function Home() {
  const { t, lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const whyItems = [
    { icon: Wind,        key: 'why1' },
    { icon: Thermometer, key: 'why2' },
    { icon: Eye,         key: 'why3' },
    { icon: Users,       key: 'why4' },
    { icon: Sprout,      key: 'why5' },
  ];

  return (
    <div>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&fm=webp&q=80&w=1200"
            srcSet="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&fm=webp&q=80&w=800 800w, https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&fm=webp&q=80&w=1600 1600w, https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&fm=webp&q=80&w=2400 2400w"
            sizes="100vw"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Overlay — darker on top for nav readability, greener at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-forest-950/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 section-wrap pt-28 pb-20 md:pt-36">
          <Stagger className="max-w-3xl">
            <StaggerChild>
              <span className="eyebrow text-green-400 mb-6 inline-block">
                مبادرة أكسجين — Oxygen Initiative
              </span>
            </StaggerChild>
            <StaggerChild>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8">
                {t('heroTitle')}
              </h1>
            </StaggerChild>
            <StaggerChild>
              <p className="text-xl md:text-2xl text-white/75 leading-relaxed max-w-2xl mb-10">
                {t('heroSubtitle')}
              </p>
            </StaggerChild>
            <StaggerChild>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-involved" className="btn-primary text-base px-8 py-4 group">
                  {t('heroCta1')}
                  <Arrow className="w-5 h-5 transition-transform group-hover:translate-x-[-4px]" />
                </Link>
                <Link to="/about" className="btn-ghost-white text-base px-8 py-4">
                  {t('heroCta2')}
                </Link>
              </div>
            </StaggerChild>
          </Stagger>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>


      {/* ══════════════════════════════════════════════════
          IMPACT NUMBERS
      ══════════════════════════════════════════════════ */}
      <section className="bg-cream-50 py-16 md:py-24">
        <div className="section-wrap">
          <Reveal className="text-center mb-16">
            <p className="eyebrow mb-3">{t('impactEyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">{t('impactTitle')}</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            <Counter value={statistics.trees_planted}      suffix="+"  label={t('treesPlanted')} />
            <Counter value={statistics.volunteers}                      label={t('volunteers')} />
            <Counter value={statistics.areas_greened}                   label={t('areasGreened')} />
            <Counter value={statistics.campaigns_completed}             label={t('campaignsCompleted')} />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          MISSION
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-32 overflow-hidden">
        <div className="section-wrap grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <Reveal className="order-2 lg:order-1">
            <ParaImg
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&fm=webp&q=80&w=1000"
              alt="Planting trees"
              className="rounded-2xl aspect-[4/5] md:aspect-[3/4] w-full mt-8 lg:mt-0"
            />
          </Reveal>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow mb-4">{t('missionEyebrow')}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8 leading-tight">
                {t('missionTitle')}
              </h2>
              <p className="text-stone-500 text-lg leading-relaxed mb-10">
                {t('missionBody')}
              </p>
            </Reveal>
            <Stagger className="space-y-4">
              {['missionPoint1','missionPoint2','missionPoint3','missionPoint4'].map(k => (
                <StaggerChild key={k} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                  <p className="text-stone-700 font-medium">{t(k)}</p>
                </StaggerChild>
              ))}
            </Stagger>
            <Reveal delay={0.3} className="mt-10">
              <Link to="/about" className="btn-ghost group">
                {t('discoverInitiative')} <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-[-4px]" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════ */}
      <section className="bg-cream-100 py-16 md:py-28">
        <div className="section-wrap">
          <Reveal className="text-center mb-20">
            <p className="eyebrow mb-3">{t('howEyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">{t('howTitle')}</h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'step1Label', desc: 'step1Desc', n: '01' },
              { label: 'step2Label', desc: 'step2Desc', n: '02' },
              { label: 'step3Label', desc: 'step3Desc', n: '03' },
              { label: 'step4Label', desc: 'step4Desc', n: '04' },
            ].map(s => (
              <StaggerChild key={s.n}>
                <div className="group p-8 rounded-2xl bg-white border border-stone-200/60 hover:border-green-300 hover:shadow-lg transition-all duration-300 h-full">
                  <p className="text-green-500 font-bold font-outfit text-sm mb-5" dir="ltr">{s.n}</p>
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">{t(s.label)}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{t(s.desc)}</p>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          FULL-WIDTH IMAGE BREAK
      ══════════════════════════════════════════════════ */}
      <div className="w-full h-56 md:h-[480px] overflow-hidden">
        <ParaImg
          src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&fm=webp&q=80&w=1600"
          alt="Forest canopy"
          className="w-full h-full"
        />
      </div>


      {/* ══════════════════════════════════════════════════
          WHY TREES — scroll storytelling
      ══════════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-32">
        <div className="section-wrap">
          <Reveal className="mb-16 md:mb-24">
            <p className="eyebrow mb-4">{t('whyEyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 max-w-2xl">
              {t('whyTitle')}
            </h2>
          </Reveal>

          <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-5 md:gap-px md:border md:border-stone-100 md:rounded-2xl overflow-hidden">
            {whyItems.map(({ icon: Icon, key }, i) => (
              <Reveal key={key} delay={i * 0.08}>
                <div className="group p-8 bg-white hover:bg-green-50 transition-colors duration-300 border-b border-stone-100 md:border-b-0 md:border-r last:border-0 h-full">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                    <Icon className="w-5 h-5 text-green-700" />
                  </div>
                  <h3 className="font-bold text-stone-900 mb-2">{t(`${key}Title`)}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{t(`${key}Desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          CAMPAIGNS
      ══════════════════════════════════════════════════ */}
      <section className="bg-cream-50 py-16 md:py-32">
        <div className="section-wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <Reveal>
              <p className="eyebrow mb-3">{t('campaignsEyebrow')}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900">{t('campaignsTitle')}</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Link to="/campaigns" className="btn-ghost group whitespace-nowrap">
                {t('viewAll')} <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-[-4px]" />
              </Link>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campaigns.map(c => (
              <StaggerChild key={c.id}>
                <div className="group card-base overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={c.image.replace('?auto=format', '?auto=format&fm=webp')}
                      alt={lang === 'ar' ? c.title_ar : c.title_en}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 start-4">
                      <span className="bg-white/95 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {lang === 'ar' ? c.location_ar : c.location_en}
                      </span>
                    </div>
                    {c.status === 'completed' && (
                      <div className="absolute top-4 end-4">
                        <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                          {t('statusCompleted')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-stone-900 text-lg mb-2 group-hover:text-green-700 transition-colors">
                      {lang === 'ar' ? c.title_ar : c.title_en}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-6">
                      {lang === 'ar' ? c.description_ar : c.description_en}
                    </p>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-xs font-medium text-stone-500 mb-2">
                        <span>{t('progress')}</span>
                        <span className="text-green-600 font-bold">{c.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${c.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: 'easeOut' }}
                          className="h-full bg-green-500 rounded-full"
                        />
                      </div>
                      <p className="mt-2 text-xs text-stone-400">
                        {c.raised.toLocaleString()} / {c.goal.toLocaleString()} {t('trees')}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          INSTAGRAM
      ══════════════════════════════════════════════════ */}
      <section className="bg-forest-950 py-16 md:py-32 text-white overflow-hidden">
        <div className="section-wrap">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <Reveal>
              <p className="eyebrow text-green-400 mb-4">{t('igEyebrow')}</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('igTitle')}</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">{t('igBody')}</p>
              <a
                href="https://www.instagram.com/_oxygen_initiative/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                <Instagram className="w-5 h-5" />
                {t('igCta')}
              </a>
            </Reveal>

            {/* Fake Instagram grid — real images from Unsplash */}
            <Stagger className="grid grid-cols-3 gap-2">
              {[
                'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&fm=webp&q=70&w=400',
                'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&fm=webp&q=70&w=400',
                'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&fm=webp&q=70&w=400',
                'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&fm=webp&q=70&w=400',
                'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&fm=webp&q=70&w=400',
                'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&fm=webp&q=70&w=400',
              ].map((src, i) => (
                <StaggerChild key={i}>
                  <a
                    href="https://www.instagram.com/_oxygen_initiative/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-square overflow-hidden rounded-xl group"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </a>
                </StaggerChild>
              ))}
            </Stagger>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          GET INVOLVED — CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-40 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&fm=webp&q=80&w=1800"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 section-wrap text-center">
          <Reveal>
            <p className="eyebrow text-green-400 mb-5 justify-center">{t('involvedEyebrow')}</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto">
              {t('involvedTitle')}
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">{t('involvedBody')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/get-involved" className="btn-primary text-base px-8 py-4">
                {t('cta1')}
              </Link>
              <Link to="/get-involved" className="btn-ghost-white text-base px-8 py-4">
                {t('cta2')}
              </Link>
              <Link to="/contact" className="btn-ghost-white text-base px-8 py-4">
                {t('cta3')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          CONTACT STRIP
      ══════════════════════════════════════════════════ */}
      <section className="bg-cream-50 py-12 md:py-16 border-b border-stone-100">
        <div className="section-wrap flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-start">
          <Reveal>
            <p className="text-stone-500 text-sm mb-1">{t('contactBody')}</p>
            <h3 className="text-2xl font-bold text-stone-900">{t('contactTitle')}</h3>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col sm:flex-row gap-4">
            <a href="tel:01035246291" className="btn-primary group">
              <Phone className="w-4 h-4" />
              <span dir="ltr">01035246291</span>
            </a>
            <a href="tel:01559090846" className="btn-ghost group">
              <Phone className="w-4 h-4" />
              <span dir="ltr">01559090846</span>
            </a>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
