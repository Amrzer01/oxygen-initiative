import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Users, Sprout, Handshake } from 'lucide-react';
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

export default function GetInvolved() {
  const { t, lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const cards = [
    {
      icon:  Sprout,
      title: t('cta1'),
      desc:  lang === 'ar'
        ? 'بمساهمة بسيطة تقدر تكفل زراعة ورعاية شجرة لمدة سنة كاملة. مساهمتك بتحفظ المياه، توفر المعدات، وتدعم المتطوعين.'
        : 'With a small donation you can sponsor planting and caring for a tree for a full year.',
      cta:    t('cta1'),
      accent: true,
    },
    {
      icon:  Users,
      title: t('cta2'),
      desc:  lang === 'ar'
        ? 'انضم لفرق التطوع وانزل مع الناس في الشوارع والميادين. الجدول مرن وكل يوم بيحسب.'
        : 'Join our volunteer teams and get on the ground. The schedule is flexible — every day counts.',
      cta:   t('cta2'),
      accent: false,
    },
    {
      icon:  Handshake,
      title: t('cta3'),
      desc:  lang === 'ar'
        ? 'لو عندك شركة أو مؤسسة، ممكن تكون شريك رسمي للمبادرة وتساهم في رحلة مصر الخضرا.'
        : 'If you have a company or organization, become an official partner of the initiative.',
      cta:   t('cta3'),
      accent: false,
    },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative py-24 md:py-40 overflow-hidden bg-forest-950 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&fm=webp&q=80&w=2000"
            alt=""
            loading="eager"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative z-10 section-wrap">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-green-400 mb-5">{t('involvedEyebrow')}</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">{t('involvedTitle')}</h1>
            <p className="text-white/60 text-xl leading-relaxed">{t('involvedBody')}</p>
          </Reveal>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-32">
        <div className="section-wrap">
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`group rounded-2xl p-10 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  card.accent
                    ? 'bg-green-600 text-white'
                    : 'bg-white border border-stone-200/60 text-stone-900 hover:border-green-300'
                }`}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${
                      card.accent ? 'bg-white/20' : 'bg-green-50 group-hover:bg-green-100'
                    }`}
                  >
                    <card.icon className={`w-7 h-7 ${card.accent ? 'text-white' : 'text-green-700'}`} />
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-4 ${card.accent ? 'text-white' : 'text-stone-900'}`}>
                    {card.title}
                  </h3>
                  <p className={`leading-relaxed flex-1 mb-8 ${card.accent ? 'text-white/80' : 'text-stone-500'}`}>
                    {card.desc}
                  </p>
                  <Link
                    to="/contact"
                    className={`btn-ghost group/btn ${card.accent ? 'border-white/40 text-white hover:bg-white/10 hover:border-white' : ''}`}
                  >
                    {card.cta}
                    <Arrow className="w-4 h-4 transition-transform group-hover/btn:translate-x-[-4px]" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
