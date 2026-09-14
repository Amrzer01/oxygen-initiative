import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { campaigns } from '../data/mockData';

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

export default function Campaigns() {
  const { t, lang } = useLanguage();

  return (
    <div className="pt-24 bg-cream-50 min-h-screen pb-20">
      <div className="section-wrap">
        {/* Header */}
        <Reveal className="py-12 md:py-24 max-w-3xl">
          <p className="eyebrow mb-4">{t('campaignsEyebrow')}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">{t('campaignsTitle')}</h1>
          <p className="text-stone-500 text-lg">
            {lang === 'ar'
              ? 'كل حملة هي خطوة في رحلة مصر الخضرا. شوف اللي اشتغلنا فيه.'
              : 'Every campaign is a step in Egypt\'s green journey. See what we\'ve worked on.'}
          </p>
        </Reveal>

        {/* Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map(c => (
            <StaggerChild key={c.id}>
              <div className="group card-base overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={c.image}
                    alt={lang === 'ar' ? c.title_ar : c.title_en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 start-4 flex gap-2 flex-wrap">
                    <span className="bg-white/95 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {lang === 'ar' ? c.location_ar : c.location_en}
                    </span>
                    {c.status === 'completed' && (
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {t('statusCompleted')}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 start-4">
                    <p className="text-white font-bold text-lg drop-shadow">
                      {lang === 'ar' ? c.title_ar : c.title_en}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-5">
                    {lang === 'ar' ? c.description_ar : c.description_en}
                  </p>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-stone-400 mb-2">
                      <span>{t('goal')}: {c.goal.toLocaleString()} {t('trees')}</span>
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
                  </div>
                </div>
              </div>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
