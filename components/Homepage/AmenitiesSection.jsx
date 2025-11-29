'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from '@/helpers/Image';
import { useLanguage } from '@/components/lang/LanguageContext';

function pickLocalized(obj, base, lang) {
  if (!obj) return '';
  const order = [lang, 'es', 'en', 'fr', 'de'];
  for (const code of order) {
    const key = `${base}_${code}`;
    if (obj[key]) return obj[key];
  }
  return '';
}

export default function AmenitiesSection({ data }) {
  const { lang } = useLanguage();
  const items = Array.isArray(data?.items) ? data.items : [];

  if (!items.length) return null;

  // Localized section title
  const titles = {
    es: 'Comodidades de la Casa',
    en: 'House Amenities',
    fr: 'Équipements de la Maison',
    de: 'Ausstattung des Hauses',
  };
  const sectionTitle = titles[lang] || titles.en;

  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.25,
    once: true,
  });

  return (
    <section id="amenities" ref={ref} className="py-16 bg-white">
      <div className="container">
        {/* Section title */}
        <motion.h2
          className="h2 mb-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {sectionTitle}
        </motion.h2>

        {/* Amenities grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const title = pickLocalized(item, 'title', lang);
            if (!title && !item?.icon) return null;

            return (
              <motion.div
                key={idx}
                className="p-4 rounded-xl border bg-white/80 flex gap-3 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: 0.15 + idx * 0.08, // staggered
                }}
              >
                {item?.icon && (
                  <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-secondary">
                    <Image
                      src={item.icon}
                      alt={title || 'Amenity icon'}
                      width={80}
                      height={80}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                )}
                <div>
                  {title && <div className="h6">{title}</div>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}