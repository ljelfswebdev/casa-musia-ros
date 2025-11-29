'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/components/lang/LanguageContext';

function pickLocalized(obj, base, lang) {
  if (!obj) return '';
  const order = [lang, 'es', 'en', 'fr', 'de'];
  for (const code of order) {
    const key = `${base}_${code}`; // e.g. title_en, title_es
    if (obj[key]) return obj[key];
  }
  return '';
}

export default function HouseRulesSection({ data }) {
  const { lang } = useLanguage();

  // your template uses `items` as the repeater name
  const items = Array.isArray(data?.items) ? data.items : [];
  if (!items.length) return null;

  // Localized section title
  const titles = {
    es: 'Normas de la Casa',
    en: 'House Rules',
    fr: 'Règles de la Maison',
    de: 'Hausregeln',
  };
  const sectionTitle = titles[lang] || titles.en;

  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.25,
    once: true,
  });

  return (
    <section ref={ref} id="rules" className="py-16 bg-white">
      <div className="container">
        {/* Title */}
        <motion.h2
          className="h2 mb-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {sectionTitle}
        </motion.h2>

        {/* Rules list */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            // uses title_es/title_en/... from your schema
            const text = pickLocalized(item, 'title', lang);
            if (!text) return null;

            return (
              <motion.div
                key={idx}
                className="flex gap-4 items-center p-4 bg-white/80 border rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: 0.15 + idx * 0.08, // stagger
                }}
              >
                {/* Number circle */}
                <div className="shrink-0 h-10 w-10 min-h-10 min-w-10 bg-secondary text-white rounded-full flex items-center justify-center font-semibold">
                  {idx + 1}
                </div>

                {/* Rule text (plain text) */}
                <div className="text-base">
                  {text}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}