'use client';

import { useState } from 'react';
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

export default function FaqSection({ data }) {
  const { lang } = useLanguage();
  const faqs = Array.isArray(data?.faqs) ? data.faqs : [];
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs.length) return null;

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container">

        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        <div className="h2 text-center">FAQs</div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const question = pickLocalized(faq, 'question', lang);
            const answer = pickLocalized(faq, 'answer', lang);
            if (!question && !answer) return null;

            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-2 border-secondary rounded-primary bg-white/80">
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-4 text-left"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : idx)
                  }
                >
                  <span className="text-xl max-w-[calc(100%_-_32px)]">{question}</span>
                  <span
                    className={`
                      inline-block transition-transform duration-300
                      ${isOpen ? 'rotate-180' : 'rotate-0'}
                    `}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" fill="none" viewBox="0 0 24 14"><path fill="#a38357" d="M10.79 13.487c.67.684 1.756.684 2.426 0L23.498 2.99c.67-.683.67-1.793 0-2.476a1.69 1.69 0 0 0-2.426 0L12 9.775 2.928.518a1.69 1.69 0 0 0-2.426 0 1.78 1.78 0 0 0 0 2.477l10.282 10.498z"/></svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-3">
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}