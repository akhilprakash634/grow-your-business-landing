import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSEO, generateWebPageSchema } from '../../utils/seo';
import { initiateCheckout } from '../../utils/razorpay';
import { getUserCountryCode, isUserInIndia } from '../../utils/location';
import Header from '../home/components/Header';
import { CheckCircle2, Zap, Target, DollarSign, HelpCircle, ArrowRight, ShieldCheck, Sparkles, BookOpen, Star, Users, Clock } from 'lucide-react';

export default function WomenIncomeIdeasPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Automatic language switching based on location
    const detectLocation = async () => {
      // Only switch if user hasn't manually set a language (stored in localStorage by i18next)
      const savedLng = localStorage.getItem('i18nextLng');
      if (!savedLng || (savedLng !== 'hi' && savedLng !== 'en')) {
        const countryCode = await getUserCountryCode();
        if (isUserInIndia(countryCode)) {
          i18n.changeLanguage('hi');
        }
      }
    };
    detectLocation();

    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [i18n]);

  useSEO({
    title: t('women_income.title'),
    description: t('women_income.description'),
    keywords: 'business ideas for women, work from home for ladies, make money online women, hindi business guide, marathi business guide',
    canonical: '/women-income-ideas',
    schema: generateWebPageSchema('/women-income-ideas', t('women_income.title'), t('women_income.description'))
  });

  const handleBuyNow = () => {
    setIsLoading(true);
    initiateCheckout({
      amount: 9900, // ₹99 in paise
      currency: 'INR',
      name: t('women_income.title'),
      description: t('women_income.hero_subtitle'),
      productId: 'women-income-ideas',
      onSuccess: (response) => {
        navigate(`/thank-you?payment_id=${response.razorpay_payment_id}&product_id=women-income-ideas`);
      },
      onCancel: () => setIsLoading(false),
    });
  };

  const benefits = [
    { title: t('women_income.benefits_0_title'), description: t('women_income.benefits_0_desc') },
    { title: t('women_income.benefits_1_title'), description: t('women_income.benefits_1_desc') },
    { title: t('women_income.benefits_2_title'), description: t('women_income.benefits_2_desc') },
    { title: t('women_income.benefits_3_title'), description: t('women_income.benefits_3_desc') },
    { title: t('women_income.benefits_4_title'), description: t('women_income.benefits_4_desc') },
    { title: t('women_income.benefits_5_title'), description: t('women_income.benefits_5_desc') },
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
                <Sparkles className="w-3 h-3" /> {t('women_income.hero_badge')}
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              {t('women_income.hero_title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
              {t('women_income.hero_subtitle')}
            </p>

            <div className="flex flex-col gap-6 pt-2">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  className="w-full sm:w-fit bg-pink-500 text-white px-10 py-5 rounded-2xl font-black text-xl sm:text-2xl hover:bg-pink-600 transition-all flex items-center justify-center gap-3 group shadow-[0_20px_50px_rgba(236,72,153,0.4)] hover:shadow-[0_25px_60px_rgba(236,72,153,0.5)] active:scale-[0.98] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {isLoading ? t('women_income.loading') : <>{t('women_income.buy_now')} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium px-1">
                <ShieldCheck className="w-4 h-4 text-pink-500/50" />
                <span>{t('women_income.subtext')}</span>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">{t('women_income.benefits_title')}</h2>
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
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">{t('women_income.empower_title')}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {t('women_income.empower_desc')}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <div className="text-3xl font-black text-white">500+</div>
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">{t('women_income.stats_learners')}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-white">50+</div>
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">{t('women_income.stats_ideas')}</div>
                </div>
              </div>
            </div>
            <div className="bg-pink-500/5 border border-pink-500/10 rounded-3xl p-10 space-y-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} className="w-5 h-5 fill-pink-500 text-pink-500" />)}
              </div>
              <p className="text-xl italic font-medium leading-relaxed">
                {t('women_income.testimonial_text')}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center font-bold text-pink-400">S</div>
                <div>
                  <div className="font-bold">{t('women_income.testimonial_author')}</div>
                  <div className="text-sm text-gray-500">{t('women_income.testimonial_role')}</div>
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
              <h2 className="text-3xl lg:text-4xl font-bold">{t('women_income.faq_title')}</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: t('women_income.faq_0_q'), a: t('women_income.faq_0_a') },
                { q: t('women_income.faq_1_q'), a: t('women_income.faq_1_a') },
                { q: t('women_income.faq_2_q'), a: t('women_income.faq_2_a') },
                { q: t('women_income.faq_3_q'), a: t('women_income.faq_3_a') },
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
          {isLoading ? t('women_income.loading') : t('women_income.sticky_buy')}
        </button>
      </div>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2024 Grow Your Business. All rights reserved.</p>
      </footer>
    </div>
  );
}
