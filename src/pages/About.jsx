import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Leaf, Sun, Wind, Droplets, Globe } from 'lucide-react';
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

export default function About() {
  const { t, lang } = useLanguage();
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  const points = [
    { icon: Sun,      title: lang === 'ar' ? 'تقليل الحرارة'    : 'Reduce Heat',        desc: lang === 'ar' ? 'الأشجار بتخفض درجة الحرارة في المدن بشكل ملحوظ عن طريق الظل والتبخر.'         : 'Trees significantly lower urban temperatures through shade and evaporation.' },
    { icon: Wind,     title: lang === 'ar' ? 'هواء أنقى'        : 'Cleaner Air',        desc: lang === 'ar' ? 'كل شجرة بتمتص الكربون وتطلق أكسجين نقي — وده اللي اسمه أكسجين.'               : 'Every tree absorbs carbon and releases pure oxygen — that\'s why we\'re called Oxygen.' },
    { icon: Droplets, title: lang === 'ar' ? 'حفاظ على المياه'  : 'Water Conservation', desc: lang === 'ar' ? 'جذور الأشجار بتساعد في تقليل التبخر وزيادة المياه الجوفية.'                   : 'Tree roots help reduce evaporation and increase groundwater.' },
    { icon: Globe,    title: lang === 'ar' ? 'مستقبل أحسن'      : 'A Better Future',    desc: lang === 'ar' ? 'اللي بنزرعه النهارده هو الإرث اللي هنسيبه للجيل الجاي.'                      : 'What we plant today is the legacy we leave for the next generation.' },
    { icon: Leaf,     title: lang === 'ar' ? 'مجتمع يحب أرضه'  : 'Community & Land',   desc: lang === 'ar' ? 'مبادرة أكسجين مش بس بتزرع أشجار، بتزرع حب الأرض في الناس.'                  : 'Oxygen doesn\'t just plant trees — it plants love for the land in people.' },
  ];

  return (
    <div className="pt-24 bg-cream-50 min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-28">
        <div className="section-wrap max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-5">{t('missionEyebrow')}</p>
            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 leading-tight mb-8">
              {t('missionTitle')}
            </h1>
            <p className="text-xl text-stone-500 leading-relaxed max-w-2xl">
              {t('missionBody')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Full-width image */}
      <div className="w-full h-56 md:h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&fm=webp&q=80&w=2400"
          alt="Forest"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Why trees — 5 points */}
      <section className="bg-white py-16 md:py-32">
        <div className="section-wrap">
          <Reveal className="mb-20">
            <p className="eyebrow mb-3">{t('whyEyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">{t('whyTitle')}</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {points.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="group p-8 rounded-2xl border border-stone-200/60 hover:border-green-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white h-full">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                    <p.icon className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-lg mb-3">{p.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 py-16 md:py-20">
        <div className="section-wrap text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('involvedTitle')}</h2>
            <Link to="/get-involved" className="btn-primary !bg-white !text-green-700 hover:!bg-green-50 text-base px-8 py-4 group">
              {t('cta1')} <Arrow className="w-5 h-5 transition-transform group-hover:translate-x-[-4px]" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
