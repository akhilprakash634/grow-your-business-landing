import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO, generateWebPageSchema } from '../../utils/seo';
import { initiateCheckout } from '../../utils/razorpay';
import Header from '../home/components/Header';
import { CheckCircle2, Zap, Target, DollarSign, HelpCircle, ArrowRight, ShieldCheck, Sparkles, BookOpen, Star, Users, Clock } from 'lucide-react';

export default function WomenIncomeIdeasPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useSEO({
    title: '50+ Income Making Ideas for Women | Start Your Business from Home',
    description: 'Discover 50+ proven work-from-home and business ideas for women in Hindi and Marathi. No experience needed.',
    keywords: 'business ideas for women, work from home for ladies, make money online women, hindi business guide, marathi business guide',
    canonical: '/women-income-ideas',
    schema: generateWebPageSchema('/women-income-ideas', 'Income Making Ideas for Women', 'Proven business and work-from-home ideas for women in Hindi and Marathi.')
  });

  const handleBuyNow = () => {
    setIsLoading(true);
    initiateCheckout({
      amount: 9900, // ₹99 in paise
      currency: 'INR',
      name: 'Income Making Ideas for Women',
      description: '50+ Ideas (Hindi/Marathi)',
      productId: 'women-income-ideas',
      onSuccess: (response) => {
        navigate(`/thank-you?payment_id=${response.razorpay_payment_id}&product_id=women-income-ideas`);
      },
      onCancel: () => setIsLoading(false),
    });
  };

  const benefits = [
    { title: '50+ Proven Business Ideas', description: 'Real ideas you can start from home with zero investment.' },
    { title: 'Hindi & Marathi Language', description: 'Easy to understand guides in your own language.' },
    { title: 'Step-by-step Setup Guide', description: 'How to start, find customers, and manage your time.' },
    { title: 'Zero Investment Options', description: 'Many ideas that require no money to start.' },
    { title: 'Flexible Working Hours', description: 'Balance your home and work easily.' },
    { title: 'Instant Digital Access', description: 'Get immediate access to the PDF after payment.' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-500 selection:text-white pb-20 sm:pb-0">

      {/* Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <section className="px-6 pt-12 pb-20 md:pt-20 md:pb-32 max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8 lg:col-span-7">
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-400 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider border border-pink-500/20">
                <Sparkles className="w-3 h-3" /> SPECIAL OFFER: ₹99 ONLY
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              50+ <span className="text-pink-400">Income Making Ideas</span> for Women
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
              Start your journey to financial independence today. Proven business and work-from-home ideas in Hindi & Marathi.
            </p>

            <div className="flex flex-col gap-6 pt-2">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  className="w-full sm:w-fit bg-pink-500 text-white px-10 py-5 rounded-2xl font-black text-xl sm:text-2xl hover:bg-pink-600 transition-all flex items-center justify-center gap-3 group shadow-[0_20px_50px_rgba(236,72,153,0.4)] hover:shadow-[0_25px_60px_rgba(236,72,153,0.5)] active:scale-[0.98] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {isLoading ? 'Opening Checkout...' : <>Get Access Now ₹99 <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium px-1">
                <ShieldCheck className="w-4 h-4 text-pink-500/50" />
                <span>Instant access after payment • Available in Hindi & Marathi • No experience needed</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none relative group mt-8 lg:mt-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-700 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition-all" />
            <div className="relative aspect-square sm:aspect-[4/5] bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 overflow-hidden flex items-center justify-center p-4 sm:p-6 shadow-2xl">
              <img
                src="/women-income.png"
                alt="Income Making Ideas for Women Guide"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white/5 py-24 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">Everything you need to <span className="text-pink-400">start today</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="p-8 rounded-2xl bg-black border border-white/10 hover:border-pink-500/50 transition-all group hover:-translate-y-1 text-left">
                  <CheckCircle2 className="w-10 h-10 text-pink-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">Empowering Women to be <span className="text-pink-400">Independent</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Join 500+ women who have started their small businesses using our guide. We provide the ideas, strategies, and confidence you need to succeed.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <div className="text-3xl font-black text-white">500+</div>
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">Active Learners</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-white">50+</div>
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">Business Ideas</div>
                </div>
              </div>
            </div>
            <div className="bg-pink-500/5 border border-pink-500/10 rounded-3xl p-10 space-y-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} className="w-5 h-5 fill-pink-500 text-pink-500" />)}
              </div>
              <p className="text-xl italic font-medium leading-relaxed">
                "This guide changed my life. I started my small home catering business with just ₹500 and now I'm earning ₹15,000 every month. Thank you!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center font-bold text-pink-400">S</div>
                <div>
                  <div className="font-bold">Sunita Patil</div>
                  <div className="text-sm text-gray-500">Home Entrepreneur</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <HelpCircle className="w-12 h-12 text-pink-500 mx-auto" />
              <h2 className="text-3xl lg:text-4xl font-bold">Common Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Is it in Hindi and Marathi?', a: 'Yes, the guide is available in both Hindi and Marathi languages for easy understanding.' },
                { q: 'How will I get access?', a: 'Immediately after payment, you\'ll be redirected to a page where you can download the PDF guide instantly.' },
                { q: 'Do I need a big investment?', a: 'No, many of the 50+ ideas can be started with zero or very little investment.' },
                { q: 'Can I do this part-time?', a: 'Absolutely! These ideas are designed to be flexible so you can manage them along with your household work.' },
              ].map((faq, i) => (
                <div key={i} className="p-8 rounded-2xl bg-black border border-white/5 hover:border-white/10 transition-colors space-y-4 text-left">
                  <h3 className="text-xl font-bold text-pink-400">{faq.q}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Mobile Button */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-lg border-t border-white/10 z-[60] sm:hidden transition-transform duration-300 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <button
          onClick={handleBuyNow}
          disabled={isLoading}
          className="w-full bg-pink-500 text-white py-4 rounded-xl font-black text-lg shadow-[0_10px_30px_rgba(236,72,153,0.3)] active:scale-95 transition-all"
        >
          {isLoading ? 'Loading...' : 'GET ACCESS NOW ₹99'}
        </button>
      </div>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2024 Grow Your Business. All rights reserved.</p>
      </footer>
    </div>
  );
}
