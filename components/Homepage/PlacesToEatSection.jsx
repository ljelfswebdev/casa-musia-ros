// components/Homepage/PlacesToEatSection.jsx
'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

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

export default function PlacesToEatSection({ data }) {
  const { lang } = useLanguage();
  const places = Array.isArray(data?.places) ? data.places : [];
  const [activeIndex, setActiveIndex] = useState(null);

  if (!places.length) return null;

  // Localized section title
  const titles = {
    es: 'Dónde Comer',
    en: 'Where to Eat',
    fr: 'Où Manger',
    de: 'Wo Man Essen Kann',
  };
  const sectionTitle = titles[lang] || titles.en;

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    amount: 0.25,
    once: true,
  });

  return (
    <section id="eat" ref={sectionRef} className="py-16 bg-tertiary">
      <div className="container space-y-8">
        {/* Section title */}
        <motion.h2
          className="h2 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {sectionTitle}
        </motion.h2>

        {/* Flex: prev btn - swiper - next btn */}
        <div className="flex items-center justify-center gap-4 lg:gap-8">
          {/* Prev button */}
          <button
            type="button"
            className="places-prev h-10 w-10 min-h-10 min-w-10"
            aria-label="Eat Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 40 40"
            >
              <circle cx="20" cy="20" r="20" fill="#a38357" />
              <path
                fill="#fff"
                d="M12.469 19.074a1.6 1.6 0 0 0 0 2.265l9.6 9.6a1.602 1.602 0 0 0 2.265-2.265l-8.47-8.47 8.465-8.47a1.602 1.602 0 0 0-2.265-2.265l-9.6 9.6z"
              />
            </svg>
          </button>

          {/* Swiper */}
          <div className="flex-1 w-[calc(100%_-_108px)] lg:w-[calc(100%_-_144px)]">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: '.places-prev',
                nextEl: '.places-next',
              }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                0: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                900: { slidesPerView: 3 },
              }}
            >
              {places.map((p, idx) => {
                const title = pickLocalized(p, 'title', lang);

                return (
                  <SwiperSlide key={idx}>
                    <motion.button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className="block w-full text-left focus:outline-none"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        ease: 'easeOut',
                        delay: 0.1 + idx * 0.12,
                      }}
                    >
                      <div className="h-40 md:h-48 lg:h-56 rounded-xl overflow-hidden border mb-2">
                        {p?.image && (
                          <Image
                            src={p.image}
                            alt={title || `Place ${idx + 1}`}
                            width={320}
                            height={200}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        )}
                      </div>
                      {title && (
                        <div className="text-xl">
                          {title}
                        </div>
                      )}
                    </motion.button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Next button */}
          <button
            type="button"
            className="places-next h-10 w-10 min-h-10 min-w-10"
            aria-label="Eat Next"
          >
            <svg
              className="rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 40 40"
            >
              <circle cx="20" cy="20" r="20" fill="#a38357" />
              <path
                fill="#fff"
                d="M12.469 19.074a1.6 1.6 0 0 0 0 2.265l9.6 9.6a1.602 1.602 0 0 0 2.265-2.265l-8.47-8.47 8.465-8.47a1.602 1.602 0 0 0-2.265-2.265l-9.6 9.6z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Popup with more info */}
      {activeIndex != null && places[activeIndex] && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-xl"
            onClick={() => setActiveIndex(null)}
          >
            ✕
          </button>
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 overflow-hidden">
            {places[activeIndex].image && (
              <Image
                src={places[activeIndex].image}
                alt={pickLocalized(places[activeIndex], 'title', lang)}
                width={800}
                height={400}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-4">
              <div className="text-xl">
                {pickLocalized(places[activeIndex], 'title', lang)}
              </div>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: pickLocalized(places[activeIndex], 'body', lang),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}