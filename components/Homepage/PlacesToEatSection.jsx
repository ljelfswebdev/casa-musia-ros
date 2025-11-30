'use client';

import { useLanguage } from '@/components/lang/LanguageContext';
import PopupSliderSection from '@/components/Homepage/PopupSliderSection';

export default function PlacesToEatSection({ data }) {
  const { lang } = useLanguage();
  const places = Array.isArray(data?.places) ? data.places : [];

  if (!places.length) return null;

  // Localized section title
  const titles = {
    es: 'Dónde Comer',
    en: 'Where to Eat',
    fr: 'Où Manger',
    de: 'Wo Man Essen Kann',
  };
  const sectionTitle = titles[lang] || titles.en;

  return (
    <PopupSliderSection
      id="eat"
      sectionTitle={sectionTitle}
      items={places}
      lang={lang}
      sectionBgClass="bg-tertiary"
      navKey="places"
      prevAriaLabel="Eat Previous"
      nextAriaLabel="Eat Next"
    />
  );
}