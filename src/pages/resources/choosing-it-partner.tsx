import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO, generateFAQSchema } from '../../utils/seo';

export default function ChoosingITPartner() {
  const faqs = [
    { 
      question: "Should I hire a freelancer or an agency?", 
      answer: "Freelancers are great for small, one-off tasks. Agencies are better for long-term growth and complex systems where you need a team of experts." 
    },
    { 
      question: "What is a reasonable budget for a business website in the UAE?", 
      answer: "Budgets vary, but a high-quality, custom business growth system typically starts from 3,500 AED, depending on the complexity and integrations required." 
    }
  ];

  useSEO({
    title: 'Choosing the Right IT Partner in the Middle East | 2026 Guide',
    description: 'Expert advice on selecting an IT agency that understands the cultural and technical landscape of the Middle East and Kerala.',
    canonical: '/resources/choosing-right-it-partner',
    schema: generateFAQSchema(faqs)
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
              Choosing the Right IT Partner in the Middle East
            </h1>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>April 5, 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">
            <p>
              Selecting an <strong>IT partner</strong> is one of the most critical decisions for a business owner in the <strong>Middle East</strong> or <strong>Kerala</strong>. The right partner can scale your business to new heights; the wrong one can lead to months of frustration and lost revenue.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">1. Look for Industry Experience</h2>
            <p>
              Does the agency understand your specific market? An agency that has worked with real estate firms in Dubai or retail shops in Kochi will already understand the customer behavior and competitive landscape of those areas.
            </p>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">2. Check for Local Support</h2>
            <p>
              When things go wrong, do you have someone you can call? Having an IT partner that operates in your time zone and understands the local business culture is a massive advantage.
            </p>

            <div className="bg-gray-900 border border-emerald-500/30 p-8 rounded-2xl my-10">
              <h3 className="text-2xl font-bold text-white mb-4">Red Flags to Watch For:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>No portfolio of local clients.</li>
                <li>Extremely low pricing (indicates lack of quality or hidden costs).</li>
                <li>Vague communication about timelines and deliverables.</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-white mt-12 mb-4">3. Ask About Post-Launch Support</h2>
            <p>
              A website is not a "set it and forget it" product. Ask potential partners about their maintenance plans, security updates, and how they handle future changes as your business grows.
            </p>
          </div>

          <section className="mt-20 pt-10 border-t border-gray-800">
            <h2 className="text-3xl font-bold mb-10 text-white">IT Partnership FAQs</h2>
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
