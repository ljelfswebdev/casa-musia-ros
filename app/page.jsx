import dynamic from 'next/dynamic';
import { dbConnect } from '@helpers/db';
import Page from '@/models/Page';
import HeroSection from '@/components/Homepage/HeroSection';

// Lazy sections
const GallerySection = dynamic(
  () => import('@/components/Homepage/GallerySection'),
  { ssr: false }
);
const AboutSection = dynamic(
  () => import('@/components/Homepage/AboutSection'),
  { ssr: false }
);
const HouseRulesSection = dynamic(
  () => import('@/components/Homepage/HouseRulesSection'),
  { ssr: false }
);
const AmenitiesSection = dynamic(
  () => import('@/components/Homepage/AmenitiesSection'),
  { ssr: false }
);
const PlacesToEatSection = dynamic(
  () => import('@/components/Homepage/PlacesToEatSection'),
  { ssr: false }
);
const TouristAttractionsSection = dynamic(
  () => import('@/components/Homepage/TouristAttractionsSection'),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import('@/components/Homepage/ContactSection'),
  { ssr: false }
);
const FaqSection = dynamic(
  () => import('@/components/Homepage/FaqSection'),
  { ssr: false }
);

export default async function HomePage() {
  await dbConnect();

  const page = await Page.findOne({ templateKey: 'homepage' }).lean();

  if (!page) {
    return (
      <section className="container py-10">
        <h1 className="text-2xl font-semibold mb-2">Homepage not set up</h1>
        <p className="text-sm text-gray-600">
          Create a page in the admin and assign it the <code>homepage</code> template.
        </p>
      </section>
    );
  }

  const data = page.templateData || {};

  return (
    <>
      <HeroSection data={data.section1 || {}} />

      <GallerySection data={data.section2 || {}} />
      <AboutSection data={data.section3 || {}} />
      <HouseRulesSection data={data.section4 || {}} />
      <AmenitiesSection data={data.section5 || {}} />
      <PlacesToEatSection data={data.section6 || {}} />
      <TouristAttractionsSection data={data.section7 || {}} />
      <ContactSection data={data.section8 || {}} />
      <FaqSection data={data.section9 || {}} />
    </>
  );
}