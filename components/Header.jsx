 // components/layout/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from '@/helpers/Image';

import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/lang/LanguageContext';

// language-aware labels for each section
const NAV_LABELS = {
  gallery: {
    es: 'Galería',
    en: 'Gallery',
    fr: 'Galerie',
    de: 'Galerie',
  },
  about: {
    es: 'Sobre Nosotros',
    en: 'About Us',
    fr: 'À propos de nous',
    de: 'Über uns',
  },
  rules: {
    es: 'Normas',
    en: 'House Rules',
    fr: 'Règles',
    de: 'Hausregeln',
  },
  amenities: {
    es: 'Servicios',
    en: 'Amenities',
    fr: 'Équipements',
    de: 'Ausstattung',
  },
  eat: {
    es: 'Dónde Comer',
    en: 'Places to Eat',
    fr: 'Où manger',
    de: 'Essen gehen',
  },
  tourist: {
    es: 'Qué Visitar',
    en: 'What to Visit',
    fr: 'À visiter',
    de: 'Was man besichtigen sollte',
  },
  contact: {
    es: 'Contactos',
    en: 'Contacts',
    fr: 'Contacts',
    de: 'Kontakte',
  },
  faq: {
    es: 'Preguntas Frecuentes',
    en: 'FAQs',
    fr: 'FAQ',
    de: 'FAQ',
  },

  supermarkets: {
    es: 'Supermercados y Tiendas',
    en: 'Supermarkets & Shops',
    fr: 'Supermarchés & Boutiques',
    de: 'Einkaufen',
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    // On admin, no scroll-based background change – always solid
    if (isAdmin) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isAdmin]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navItems = [
    'about',     // About
    'gallery',   // Galería
    'amenities', // Amenities
    'rules',     // House Rules
    'contact',   // Contact
    'tourist',   // Attractions
    'eat',       // Food / Where to Eat
    'supermarkets',       // FAQs
  ];

  const navLinks = navItems.map((id) => ({
    id,
    href: `#${id}`,
  }));

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getLabel = (id) =>
    NAV_LABELS[id]?.[lang] || NAV_LABELS[id]?.en || id;

  // 🔥 Only tweak: background logic
  const headerBgClasses = isAdmin
    ? 'bg-primary shadow-md'
    : scrolled
    ? 'bg-primary shadow-md'
    : 'bg-primary lg:bg-transparent';

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-40
          transition-colors duration-300 ease-out
          ${headerBgClasses}
        `}
      >
        <div className="container">
          <div className="flex gap-10 justify-end py-10 w-full relative text-white">


            {/* Left: brand (scroll to top or admin home) */}
            {isAdmin ? (
              <Link
                href="/"
                className="flex items-center gap-2 absolute top-4 left-0"
                aria-label="Go to admin dashboard"
              >
              <Image
                src="/logo.svg"
                alt={process.env.NEXT_PUBLIC_PROJECT_NAME || 'Casa Musia Ros'}
                width={300}
                height={200}
                className="w-full h-full object-contain"
              />
              
           
              </Link>
            ) : (
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 absolute top-4 left-0"
                aria-label="Scroll to top"
              >
              <Image
                src="/logo.svg"
                alt={process.env.NEXT_PUBLIC_PROJECT_NAME || 'Casa Musia Ros'}
                width={300}
                height={200}
                className="w-full h-full object-contain"
              />    </button>
            )}

            {/* Center: nav (desktop only) */}
            <nav className="hidden lg:flex items-center gap-4 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="hover:text-white/80 transition-colors"
                >
                  {getLabel(link.id)}
                </Link>
              ))}
            </nav>

            {/* Right: hamburger (mobile only) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleMenu}
                className="lg:hidden relative w-8 h-8 flex items-center justify-center"
                aria-label="Toggle navigation"
              >
                {/* Top bar */}
                <span
                  className={`
                    absolute block h-0.5 w-6 bg-white rounded-full
                    transition-transform duration-300
                    ${isOpen ? 'rotate-45' : '-translate-y-1.5'}
                  `}
                />
                {/* Middle bar */}
                <span
                  className={`
                    absolute block h-0.5 w-6 bg-white rounded-full
                    transition-all duration-300
                    ${isOpen ? 'opacity-0' : 'opacity-100'}
                  `}
                />
                {/* Bottom bar */}
                <span
                  className={`
                    absolute block h-0.5 w-6 bg-white rounded-full
                    transition-transform duration-300
                    ${isOpen ? '-rotate-45' : 'translate-y-1.5'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`
          lg:hidden fixed top-[56px] left-0 right-0 z-30
          bg-primary text-white
          max-lg:h-[calc(100dvh_-_56px)]
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <nav className="container mx-auto h-full flex items-center justify-center">
          <ul className="flex flex-col items-center gap-4 text-lg">
            {navLinks.map((link, idx) => (
              <li
                key={link.id}
                className={`
                  transition-all duration-300
                  ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
                `}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <Link
                  href={link.href}
                  className="block py-1 hover:text-white/80"
                  onClick={() => setIsOpen(false)}
                >
                  {getLabel(link.id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
 
 
 
