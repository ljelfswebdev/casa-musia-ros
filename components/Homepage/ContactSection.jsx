'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/components/lang/LanguageContext';

function pickLocalized(obj, base, lang) {
  if (!obj) return '';
  const order = [lang, 's', 'en', 'fr', 'de'];
  for (const code of order) {
    const key = `${base}_${code}`;
    if (obj[key]) return obj[key];
  }
  return '';
}

const GROUP_TITLES = {
  interest: {
    es: 'Teléfonos de interés',
    en: 'Important phone numbers',
    fr: 'Numéros importants',
    de: 'Wichtige Telefonnummern',
  },
  emergency: {
    es: 'Emergencias',
    en: 'Emergency numbers',
    fr: "Numéros d'urgence",
    de: 'Notrufnummern',
  },
};

// Make a safe tel: link
const buildTelHref = (number) => {
  if (!number) return null;
  const cleaned = String(number).replace(/[^+\d]/g, '');
  return cleaned ? `tel:${cleaned}` : null;
};

// Reusable phone card
function PhoneCard({ content, number }) {
  const href = buildTelHref(number);
  const commonClassName = `
    block rounded-xl bg-white p-4 shadow-sm
    transition-all cursor-pointer
    hover:shadow-xl hover:-translate-y-1 hover:bg-white
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
  `;

  const inner = (
    <>
      {content && (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {number && (
        <p className="mt-3 font-bold text-primary text-lg">
          {number}
        </p>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={`Call ${number}`}
        className={commonClassName}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={commonClassName}>
      {inner}
    </div>
  );
}

export default function ContactSection({ data }) {
  const { lang } = useLanguage();
  if (!data) return null;

  const title = pickLocalized(data, 'title', lang);
  const body = pickLocalized(data, 'body', lang);

  const interestPhones = data.interestPhones || [];
  const emergencyPhones = data.emergencyPhones || [];

  if (!title && !body && !interestPhones.length && !emergencyPhones.length) {
    return null;
  }

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    amount: 0.25,
    once: true,
  });

  const interestTitle =
    GROUP_TITLES.interest[lang] || GROUP_TITLES.interest.es;
  const emergencyTitle =
    GROUP_TITLES.emergency[lang] || GROUP_TITLES.emergency.es;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 bg-secondary relative"
    >
      <div className="container">
        <div className="flex flex-col gap-8">
          {/* Main intro */}
          <motion.div
            className="flex flex-col w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            {title && <h2 className="mb-4">{title}</h2>}
            {body && (
              <div
                className="prose max-w-none mb-4"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}
          </motion.div>

          {/* Telephones of interest */}
          {interestPhones.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
              className="w-full"
            >
              <h3 className="mb-4 text-black text-left">
                {interestTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {interestPhones.map((item, idx) => {
                  const content = pickLocalized(item, 'body', lang);
                  const number = item?.number;
                  if (!content && !number) return null;

                  return (
                    <PhoneCard
                      key={`interest-${idx}`}
                      content={content}
                      number={number}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Emergency numbers */}
          {emergencyPhones.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              className="w-full"
            >
              <h3 className="mb-4 text-black text-left">
                {emergencyTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencyPhones.map((item, idx) => {
                  const content = pickLocalized(item, 'body', lang);
                  const number = item?.number;
                  if (!content && !number) return null;

                  return (
                    <PhoneCard
                      key={`emergency-${idx}`}
                      content={content}
                      number={number}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}