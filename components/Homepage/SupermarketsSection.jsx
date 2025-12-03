'use client';

import { useLanguage } from '@/components/lang/LanguageContext';
import PopupSliderSection from '@/components/Homepage/PopupSliderSection';

export default function SupermarketsSection({ data }) {
  const { lang } = useLanguage();
  const supermarkets = Array.isArray(data?.supermarkets) ? data.supermarkets : [];

  if (!supermarkets.length) return null;

  // Localized section title
    const titles = {
    es: 'Supermercados y Tiendas',
    en: 'Supermarkets & Shops',
    fr: 'Supermarchés & Boutiques',
    de: 'Supermärkte & Geschäfte',
    };
  const sectionTitle = titles[lang] || titles.en;

  return (
    <PopupSliderSection
      id="supermarkets"
      sectionTitle={sectionTitle}
      items={supermarkets}
      lang={lang}
      sectionBgClass="bg-white"
      navKey="supermarkets"
      prevAriaLabel="Supermarkets Previous"
      nextAriaLabel="Supermarkets Next"
    />
  );
}