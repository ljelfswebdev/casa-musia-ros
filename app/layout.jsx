import './globals.css';
import { LanguageProvider } from '@/components/lang/LanguageContext';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageFloatingSwitcher from '@/components/lang/LanguageFloatingSwitcher';


const ToasterClient = dynamic(
  () => import('react-hot-toast').then(m => m.Toaster),
  { ssr: false }
);

export const metadata = {
  title: process.env.NEXT_PUBLIC_PROJECT_NAME || 'La Casa Musia Ros',
  description:
    process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION ||
    'A Next.js app using ACF styled templates, designed by Lewis Jelfs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
         <LanguageProvider>
        <Header />
        <main className="">
          {children}
        </main>
        <Footer />
        <ToasterClient position="top-right" />
          <LanguageFloatingSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}
