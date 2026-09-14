import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

const dictionary = {
  ar: {
    // Nav
    home:        'الرئيسية',
    mission:     'مهمتنا',
    campaigns:   'حملاتنا',
    getInvolved: 'شارك معنا',
    contact:     'اتصل بنا',
    donate:      'ساهم معانا',

    // Hero
    heroTitle:     'حلم ممكن نحققه.',
    heroSubtitle:  'مع بعض نقدر نزرع أكتر، نخلي شوارعنا أخضر، ونسيب لمصر مستقبل أحسن.',
    heroCta1:      'ساهم معانا',
    heroCta2:      'اعرف أكتر عن المبادرة',

    // Mission
    missionEyebrow:  'مهمتنا',
    missionTitle:    'إحنا بنحلم بمصر أكتر خضرة.',
    missionBody:     'مبادرة أكسجين بتؤمن إن التغيير الكبير بيبدأ بخطوة صغيرة. شجرة واحدة ممكن تكون أول خطوة في رحلة مصر الخضرا.',
    missionPoint1:   'نزرع في الشوارع والميادين',
    missionPoint2:   'نحوّل المساحات الفاضية لحدايق',
    missionPoint3:   'نبني مجتمع يحب أرضه',
    missionPoint4:   'نسيب أثر يدوم للجيل الجاي',

    // Impact
    impactEyebrow:    'على الأرض',
    impactTitle:      'أرقام بتتكلم.',
    treesPlanted:     'شجرة زُرعت',
    volunteers:       'متطوع شارك',
    areasGreened:     'منطقة اتخضرت',
    campaignsCompleted: 'حملة مكتملة',

    // How it works
    howEyebrow:   'خطوات بسيطة',
    howTitle:     'ازاي تشارك؟',
    step1Label:   'اختار',
    step1Desc:    'اختار الحملة اللي قربها منك أو اللي بتهمك.',
    step2Label:   'شارك',
    step2Desc:    'سجّل معانا كمتطوع أو ادعم بمساهمتك.',
    step3Label:   'ازرع',
    step3Desc:    'انزل مع الفريق وازرع بإيدك.',
    step4Label:   'شوف تأثيرك',
    step4Desc:    'تابع نمو شجرتك وشوف الفرق بنفسك.',

    // Why trees
    whyEyebrow:  'ليه الأشجار؟',
    whyTitle:    'شجرة واحدة بتغير الصورة كلها.',
    why1Title:   'هواء أنضف',
    why1Desc:    'كل شجرة بتمتص الكربون وبتطلق أكسجين نقي.',
    why2Title:   'جو أبرد',
    why2Desc:    'الأشجار بتقلل الحرارة في المدن بشكل ملحوظ.',
    why3Title:   'مظهر أجمل',
    why3Desc:    'الشوارع الخضرا بتخلي المدينة أحلى وأكثر راحة.',
    why4Title:   'مجتمع أقوى',
    why4Desc:    'زراعة الأشجار بتجمع الناس ببعض وبتعمل هوية مشتركة.',
    why5Title:   'مستقبل أحسن',
    why5Desc:    'اللي بنزرعه النهارده هو اللي جيلنا الجاي هيستفيد منه.',

    // Campaigns
    campaignsEyebrow: 'حملاتنا',
    campaignsTitle:   'شوف اللي اشتغلنا فيه.',
    viewAll:          'شوف كل الحملات',
    progress:         'الإنجاز',
    trees:            'شجرة',
    statusActive:     'جاري التنفيذ',
    statusCompleted:  'مكتملة',
    goal:             'الهدف',
    raised:           'تم',

    // Instagram
    igEyebrow: 'على أرض الواقع',
    igTitle:   'شوفنا على الإنستجرام.',
    igCta:     'تابع @_oxygen_initiative',
    igBody:    'كل يوم بنزرع، بنصوّر، وبنشارك. تابعنا وشوف الفرق بعينيك.',

    // Get Involved
    involvedEyebrow: 'شارك معانا',
    involvedTitle:   'جاهز تزرع أول شجرة معانا؟',
    involvedBody:    'مهما كانت مشاركتك — متطوع، داعم، أو شريك — أنت جزء من الحل.',
    cta1: 'ساهم معانا',
    cta2: 'اتطوع',
    cta3: 'كن شريك',

    // Contact
    contact:       'اتصل بنا',
    contactTitle:  'كلمنا، إحنا هنا.',
    contactBody:   'عايز تعرف أكتر أو تشارك في حملة؟ تواصل معانا على طول.',
    phone:         'الموبايل',
    address:       'القاهرة، مصر',
    name:          'اسمك',
    email:         'إيميلك',
    message:       'رسالتك',
    send:          'ابعت الرسالة',
    followUs:      'تابعنا على الإنستجرام',

    // Footer
    rights: 'كل الحقوق محفوظة — مبادرة أكسجين.',
    tagline: 'معًا نخلي مصر أخضر.',

    // Misc
    discoverInitiative: 'اعرف أكتر',
    ourImpact:          'تأثيرنا',
    howItWorks:         'ازاي نشتغل',
    whyTreesMatter:     'ليه الأشجار؟',
    joinUs:             'انضم إلينا',
  },

  en: {
    home:        'Home',
    mission:     'Our Mission',
    campaigns:   'Campaigns',
    getInvolved: 'Get Involved',
    contact:     'Contact',
    donate:      'Support Us',

    heroTitle:     'A dream we can make real.',
    heroSubtitle:  'Together, we can plant more trees, green our streets, and leave Egypt a better place.',
    heroCta1:      'Support Us',
    heroCta2:      'Learn About Us',

    missionEyebrow:  'Our Mission',
    missionTitle:    'We dream of a greener Egypt.',
    missionBody:     'Oxygen Initiative believes great change starts small. One tree can be the first step in Egypt\'s green journey.',
    missionPoint1:   'Planting in streets & public squares',
    missionPoint2:   'Turning empty spaces into gardens',
    missionPoint3:   'Building a community that loves its land',
    missionPoint4:   'Leaving a legacy for the next generation',

    impactEyebrow:    'On the ground',
    impactTitle:      'Numbers that speak.',
    treesPlanted:     'Trees Planted',
    volunteers:       'Volunteers',
    areasGreened:     'Areas Greened',
    campaignsCompleted: 'Completed Campaigns',

    howEyebrow:   'Simple steps',
    howTitle:     'How to participate?',
    step1Label:   'Choose',
    step1Desc:    'Pick the campaign closest to you or the one that matters most.',
    step2Label:   'Join',
    step2Desc:    'Register as a volunteer or support with a donation.',
    step3Label:   'Plant',
    step3Desc:    'Get on the ground with our team and plant with your own hands.',
    step4Label:   'See your impact',
    step4Desc:    'Watch your tree grow and witness the difference yourself.',

    whyEyebrow:  'Why Trees?',
    whyTitle:    'One tree changes the whole picture.',
    why1Title:   'Cleaner Air',
    why1Desc:    'Every tree absorbs carbon and releases pure oxygen.',
    why2Title:   'Cooler Cities',
    why2Desc:    'Trees significantly reduce urban temperatures.',
    why3Title:   'More Beautiful',
    why3Desc:    'Green streets make cities more pleasant and livable.',
    why4Title:   'Stronger Communities',
    why4Desc:    'Tree planting brings people together and builds shared identity.',
    why5Title:   'Better Future',
    why5Desc:    'What we plant today is what the next generation will benefit from.',

    campaignsEyebrow: 'Our Campaigns',
    campaignsTitle:   'See what we\'ve been working on.',
    viewAll:          'View All Campaigns',
    progress:         'Progress',
    trees:            'trees',
    statusActive:     'Active',
    statusCompleted:  'Completed',
    goal:             'Goal',
    raised:           'Achieved',

    igEyebrow: 'On the ground',
    igTitle:   'Follow us on Instagram.',
    igCta:     'Follow @_oxygen_initiative',
    igBody:    'Every day we plant, photograph, and share. Follow us and see the difference with your own eyes.',

    involvedEyebrow: 'Get Involved',
    involvedTitle:   'Ready to plant your first tree with us?',
    involvedBody:    'Whether you\'re a volunteer, donor, or partner — you\'re part of the solution.',
    cta1: 'Support Us',
    cta2: 'Volunteer',
    cta3: 'Become a Partner',

    contact:       'Contact',
    contactTitle:  'Talk to us, we\'re here.',
    contactBody:   'Want to learn more or join a campaign? Reach out anytime.',
    phone:         'Phone',
    address:       'Cairo, Egypt',
    name:          'Your Name',
    email:         'Your Email',
    message:       'Your Message',
    send:          'Send Message',
    followUs:      'Follow us on Instagram',

    rights: 'All rights reserved — Oxygen Initiative.',
    tagline: 'Together, let\'s make Egypt greener.',

    discoverInitiative: 'Learn More',
    ourImpact:          'Our Impact',
    howItWorks:         'How it Works',
    whyTreesMatter:     'Why Trees?',
    joinUs:             'Join Us',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => setLang(p => p === 'ar' ? 'en' : 'ar');
  const t = key => dictionary[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
