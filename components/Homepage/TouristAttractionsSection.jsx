'use client';

import { useLanguage } from '@/components/lang/LanguageContext';
import PopupSliderSection from '@/components/Homepage/PopupSliderSection';

export default function TouristAttractionsSection({ data }) {
  const { lang } = useLanguage();
  const attractions = Array.isArray(data?.attractions)
    ? data.attractions
    : [];

  if (!attractions.length) return null;

  // Localized section title
  const titles = {
    es: 'Lugares de Interés',
    en: 'Points of Interest',
    fr: 'Points d’Intérêt',
    de: 'Sehenswürdigkeiten',
  };
  const sectionTitle = titles[lang] || titles.en;

  return (
    <PopupSliderSection
      id="tourist"
      sectionTitle={sectionTitle}
      items={attractions}
      lang={lang}
      sectionBgClass="bg-white"
      navKey="attractions"
      prevAriaLabel="Tourist Previous"
      nextAriaLabel="Tourist Next"
    />
  );
}