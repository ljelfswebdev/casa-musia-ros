// components/Homepage/HeroSection.jsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from '@/helpers/Image';
import '@/styles/pages/homepage.css';
import { useLanguage } from '@/components/lang/LanguageContext';

export default function HeroSection({ data }) {
  const { lang } = useLanguage();

  const {
    backgroundImage,
    title,
    strapline_es,
    strapline_en,
    strapline_fr,
    strapline_de,
  } = data || {};

  const straplineMap = {
    es: strapline_es,
    en: strapline_en,
    fr: strapline_fr,
    de: strapline_de,
  };

  const rawStrapline =
    straplineMap[lang] ||
    strapline_es ||
    strapline_en ||
    strapline_fr ||
    strapline_de ||
    '';

  // --- simple typewriter ---
  const [typedStrapline, setTypedStrapline] = useState('');

  useEffect(() => {
    setTypedStrapline('');

    if (!rawStrapline) return;

    const plain = rawStrapline.replace(/<[^>]+>/g, '');
    let i = 0;

    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedStrapline(plain.slice(0, i + 1));
        i++;
        if (i >= plain.length) clearInterval(interval);
      }, 40);
    }, 700); // wait for title animation

    return () => clearTimeout(startDelay);
  }, [rawStrapline]);

  if (!backgroundImage && !title) {
    return (
      <section className="bg-black text-white py-20">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">
            Hero not configured
          </h1>
          <p className="text-sm text-white/70">
            Add content in <strong>Homepage → Section 1</strong> in the admin.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[600px] min-h-screen overflow-hidden" id="hero">
      {/* Background with slow zoom */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 w-[calc(100vw_+_100px)]"
          initial={{ scale: 1, x: 0, y: 0 }}
          animate={{ scale: 1.05, x: -20, y: -20 }}
          transition={{ duration: 18, ease: 'easeOut' }}
        >
          <Image
            src={backgroundImage}
            alt={title || 'Hero Image'}
            width={1920}
            height={600}
              sizes="100vw" 
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 container h-full flex items-center justify-center text-center text-white">
        <div className="max-w-3xl w-full flex flex-col items-center">
          {/* Title stays put */}
          {title && (
            <motion.h1
              className="text-white mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            >
              {title}
            </motion.h1>
          )}

          {/* Reserved space for strapline so title doesn't shift */}
          {rawStrapline && (
            <div className="max-w-2xl text-white/90 min-h-[72px] flex items-start justify-center">
              <p className="text-lg md:text-xl font-light whitespace-pre-line">
                {typedStrapline}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}