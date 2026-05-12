import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { useSEO, generateLocalBusinessSchema, generateServiceSchema, generateOrganizationSchema } from '../../utils/seo';

// Lazy load non-critical components
const Problem = lazy(() => import('./components/Problem'));
const Services = lazy(() => import('./components/Services'));
const Pricing = lazy(() => import('./components/Pricing'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Minimal loading placeholder for smooth transitions
const ComponentLoader = () => <div className="py-20 bg-gray-950 animate-pulse" />;

export default function Home() {
  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateServiceSchema()
  ];

  useSEO({
    title: 'IT Services & Website Design Kerala | Grow Your Business UAE',
    description: 'Expert IT services, professional website design, and digital growth solutions for businesses in Kerala and UAE. High-converting websites, WhatsApp marketing, and GMB optimization.',
    keywords: 'IT services Kerala, website design Kerala, digital marketing UAE, business growth Kerala, WhatsApp marketing Kerala, local SEO Kerala',
    canonical: '/',
    ogType: 'website',
    ogImage: 'https://static.readdy.ai/image/3a79f3d26d575281f009959c52307d03/4faeac9cacf9a888180dbe48ffa35e91.png',
    schema: schemas
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<ComponentLoader />}>
          <Problem />
          <Services />
          <Pricing />
          <SocialProof />
          <HowItWorks />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-40 bg-gray-950" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
