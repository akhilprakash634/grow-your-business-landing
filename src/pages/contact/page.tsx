import Header from '../home/components/Header';
import ContactSection from '../home/components/Contact';
import Footer from '../home/components/Footer';
import { useSEO } from '../../utils/seo';

export default function ContactPage() {
  useSEO({
    title: 'Contact Us | Grow Your Business Kerala & UAE',
    description: 'Get in touch for professional IT services and business growth solutions. Offices in Kerala and UAE.',
    canonical: '/contact',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-20">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
