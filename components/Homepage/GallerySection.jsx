// components/Homepage/GallerySection.jsx
'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from '@/helpers/Image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function GallerySection({ data }) {
  const images = Array.isArray(data?.images) ? data.images : [];
  const [activeIndex, setActiveIndex] = useState(null);
  // create a ref to watch when section becomes visible
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    amount: 0.25, // trigger when 25% of section enters viewport
    once: true,
  });

  if (!images.length) return null;

  return (
    <section ref={sectionRef} id="gallery" className="py-16 bg-white">
      <div className="container">
        {/* Flex: prev btn - swiper - next btn */}
        <div className="flex items-center justify-center gap-4 lg:gap-8">
          {/* Prev button */}
          <button
            type="button"
            className="gallery-prev h-10 w-10 min-h-10 min-w-10"
            aria-label="Gallery Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#a38357"/><path fill="#fff" d="M12.469 19.074a1.6 1.6 0 0 0 0 2.265l9.6 9.6a1.602 1.602 0 0 0 2.265-2.265l-8.47-8.47 8.465-8.47a1.602 1.602 0 0 0-2.265-2.265l-9.6 9.6z"/></svg>
          </button>

          {/* Swiper */}
          <div className="flex-1 w-[calc(100%_-_108px)] lg:w-[calc(100%_-_144px)]">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: '.gallery-prev',
                nextEl: '.gallery-next',
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
              {images.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <motion.button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="block w-full focus:outline-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.15 }} // stagger
                  >
                    <div className="w-full h-52 md:h-64 lg:h-96 overflow-hidden rounded-primary border">
                      {item?.image && (
                        <Image
                          src={item.image}
                          alt={`Gallery image ${idx + 1}`}
                          width={600}
                          height={600}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      )}
                    </div>
                  </motion.button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Next button */}
          <button
            type="button"
            className="gallery-next h-10 w-10 min-h-10 min-w-10"
            aria-label="Gallery Next"
          >
            <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#a38357"/><path fill="#fff" d="M12.469 19.074a1.6 1.6 0 0 0 0 2.265l9.6 9.6a1.602 1.602 0 0 0 2.265-2.265l-8.47-8.47 8.465-8.47a1.602 1.602 0 0 0-2.265-2.265l-9.6 9.6z"/></svg>
          </button>
        </div>
      </div>

      {/* Fullscreen popup */}
      {activeIndex != null && images[activeIndex]?.image && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-xl"
            onClick={() => setActiveIndex(null)}
          >
            ✕
          </button>
          <div className="max-w-4xl w-full px-4">
            <Image
              src={images[activeIndex].image}
              alt={`La Casa Musia Gallery image ${activeIndex + 1}`}
              width={1200}
              height={800}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}