import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO, generateFAQSchema } from '../../utils/seo';

export default function GMBOptimization() {
  const faqs = [
    { 
      question: "How long does it take to rank #1 on Google Maps?", 
      answer: "Typically, it takes 4-12 weeks of consistent optimization, review gathering, and local citations to see a significant jump in map rankings." 
    },
    { 
      question: "Do I need a physical office for GMB in Dubai?", 
      answer: "Yes, Google requires a physical location or a service area for a Business Profile. In the UAE, having a trade license that matches your location is crucial." 
    }
  ];

  useSEO({
    title: '5 Tips for Google Business Profile Optimization in Kerala & UAE',
    description: 'Master local SEO with our guide on ranking #1 on Google Maps. Get more calls and store visits for your business in Kochi, Calicut, or Dubai.',
    canonical: '/resources/google-business-profile-tips',
    schema: generateFAQSchema(faqs)
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
              5 Tips for Optimizing Your Google Business Profile
            </h1>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>April 25, 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">
            <p>
              For local businesses in <strong>Kerala</strong> and the <strong>UAE</strong>, appearing in the "Map Pack" is more important than ranking on the first page of organic search. When someone searches for "IT support near me" or "best gym in Dubai," Google shows the map first.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">1. Claim and Verify Your Profile</h2>
            <p>
              The first step is ownership. If you haven't claimed your business, someone else might. Ensure your <strong>NAP (Name, Address, Phone)</strong> is 100% consistent across the web.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">2. High-Quality Photos are Non-Negotiable</h2>
            <p>
              Businesses with photos receive 42% more requests for directions. Upload professional shots of your office, your team, and your work. In the UAE market, luxury and professionalism in visuals are key drivers of trust.
            </p>

            <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl my-10">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Pro Tip for Kerala Businesses:</h3>
              <p>
                Use Malayalam keywords in your business description alongside English to capture local language searches, which are increasing in rural and semi-urban areas.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">3. Gather and Respond to Reviews</h2>
            <p>
              Reviews are a primary ranking factor. Don't just get reviews; respond to them. Even a "Thank you" shows Google your business is active and cares about customers.
            </p>
          </div>

          <section className="mt-20 pt-10 border-t border-gray-800">
            <h2 className="text-3xl font-bold mb-10 text-white">Local SEO FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-bold text-emerald-400 mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
