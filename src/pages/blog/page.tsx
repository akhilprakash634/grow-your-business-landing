import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO } from '../../utils/seo';

export default function BlogPage() {
  const posts = [
    {
      title: "How AI is Revolutionizing Local Business in Kerala and UAE",
      excerpt: "Discover how smart automation and AI-driven SEO can help your business stay ahead of the competition in 2025.",
      date: "May 1, 2026",
      slug: "ai-growth-kerala"
    },
    {
      title: "5 Tips for Optimizing Your Google Business Profile",
      excerpt: "Learn the secrets to ranking #1 on Google Maps in your local area and getting more customer calls.",
      date: "April 25, 2026",
      slug: "gmb-optimization"
    }
  ];

  useSEO({
    title: 'Business Growth Blog | IT & Digital Marketing Insights',
    description: 'Expert advice on website design, SEO, and business automation for entrepreneurs in Kerala and UAE.',
    canonical: '/blog',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-12 text-white">Resources & Insights</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post, i) => (
              <div key={i} className="group p-8 bg-gray-900 rounded-3xl border border-gray-800 hover:border-emerald-500/30 transition-all">
                <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">{post.date}</span>
                <h2 className="text-2xl font-bold mt-4 mb-4 text-white group-hover:text-emerald-400 transition-colors">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="inline-flex items-center text-emerald-400 font-bold hover:translate-x-2 transition-transform">
                  Read Full Article <i className="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
