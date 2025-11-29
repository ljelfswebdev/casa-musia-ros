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

export default function AboutSection({ data }) {
  const { lang } = useLanguage();
  if (!data) return null;

  const title = pickLocalized(data, 'title', lang);
  const body = pickLocalized(data, 'body', lang);
  const image = data.image;

  if (!title && !body && !image) return null;

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    amount: 0.25, // trigger when ~25% visible
    once: true,
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="pb-16 md:py-16 bg-tertiary relative"
    >
      <div className="container">
        <div className="flex flex-col max-md:gap-10">
          {image && (
            <motion.div
              className="w-screen max-md:-left-4 md:w-1/2 relative md:absolute md:top-0 md:left-0 md:h-full max-md:aspect-square"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <Image
                src={image}
                alt={title || 'About La Casa'}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          <motion.div
            className="flex flex-col md:ml-auto w-full md:w-1/2 md:pl-10"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            {title && <h2 className="">{title}</h2>}
            {body && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}