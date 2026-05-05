import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO, generateWebPageSchema } from '../../utils/seo';
import { initiateCheckout } from '../../utils/razorpay';
import Header from '../home/components/Header';
import SupportModal from '../home/components/SupportModal';
import { CheckCircle2, ChevronRight, MessageSquare, Zap, Target, DollarSign, HelpCircle, ArrowRight, X, Lock, Star, Users, ShieldCheck, Sparkles, Headphones } from 'lucide-react';

export default function FirstClientPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

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
    title: 'First Freelance Client System | Get Your First Client in 72 Hours',
    description: 'A step-by-step system for beginners to get their first freelance client in 72 hours. No experience needed.',
    keywords: 'freelancing for beginners, get freelance clients, freelance outreach messages, start freelancing, earn online',
    canonical: '/first-client',
    schema: generateWebPageSchema('/first-client', 'First Freelance Client System', 'Get your first freelance client in 72 hours with our proven system.')
  });

  const handleBuyNow = () => {
    setIsLoading(true);
    initiateCheckout({
      amount: 19900, // ₹199 in paise
      currency: 'INR',
      name: 'First Freelance Client System',
      description: 'Digital Playbook for Beginners',
      productId: 'first-client',
      onSuccess: (response) => {
        navigate(`/thank-you?payment_id=${response.razorpay_payment_id}&product_id=first-client`);
      },
      onCancel: () => setIsLoading(false),
    });
  };

  const benefits = [
    { title: 'Step-by-step execution roadmap', description: 'Follow the exact path to your first dollar.' },
    { title: 'Ready-to-use outreach messages', description: 'Copy-paste templates that actually get replies.' },
    { title: 'Client closing system', description: 'Know exactly what to say to seal the deal.' },
    { title: 'Master AI prompts', description: 'AI prompts to find leads and personalize messages.' },
    { title: 'Beginner-friendly approach', description: 'No technical skills or portfolio required.' },
    { title: 'Instant digital access', description: 'Get immediate access after payment.' },
  ];

  const steps = [
    { name: 'Find Leads', icon: Target },
    { name: 'Send Message', icon: MessageSquare },
    { name: 'Get Reply', icon: Zap },
    { name: 'Close Client', icon: CheckCircle2 },
    { name: 'Get Paid', icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-white pb-20 sm:pb-0">

      {/* Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <section className="px-6 pt-12 pb-20 md:pt-20 md:pb-32 max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8 lg:col-span-7">
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider border border-emerald-500/20">
                <Zap className="w-3 h-3" /> LAUNCH OFFER: ₹199 ONLY
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Get Your First <span className="text-emerald-400">Freelance Client</span> in 72 Hours
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
              The exact step-by-step system for beginners to land high-paying clients without any prior experience or portfolio.
            </p>

            <div className="flex flex-col gap-6 pt-2">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  className="w-full sm:w-fit bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xl sm:text-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 group shadow-[0_20px_50px_rgba(16,185,129,0.4)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.5)] active:scale-[0.98] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {isLoading ? 'Opening Checkout...' : <>Get Access Now ₹199 <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>}
                </button>

                <button
                  onClick={() => setIsSupportModalOpen(true)}
                  className="w-full sm:w-fit bg-emerald-500/5 text-emerald-400 px-8 py-5 rounded-2xl font-bold text-lg border border-emerald-500/10 hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2 group h-[68px] sm:h-[76px]"
                >
                  <Headphones className="w-5 h-5 group-hover:-rotate-12 transition-transform" /> Already Purchased? Get 1:1 Support
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium px-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
                <span>Instant access after payment • Beginner friendly • No experience needed</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none relative group mt-8 lg:mt-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition-all" />
            <div className="relative aspect-square sm:aspect-[4/5] bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 overflow-hidden flex items-center justify-center p-4 sm:p-6 shadow-2xl">
              <img
                src="/product-hero.png"
                alt="First Freelance Client System Playbook"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* How it works (Real Example) */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">How You Can Get Your <span className="text-emerald-400">First Client</span></h2>
              <p className="text-gray-400">A real example of the strategy you'll master</p>
            </div>
            
            <div className="grid gap-6">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Sparkles className="w-32 h-32 text-emerald-400" />
                </div>
                
                <div className="space-y-8 relative">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">1</div>
                    <p className="text-lg">Search <span className="text-white font-bold italic">“salon near me”</span> on Google</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">2</div>
                    <p className="text-lg">Find a business with an unoptimized or poor profile</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">3</div>
                    <div className="space-y-4 w-full">
                      <p className="text-lg">Send this proven message:</p>
                      <div className="bg-black/50 border border-emerald-500/20 rounded-2xl p-6 font-mono text-emerald-400 leading-relaxed shadow-inner">
                        “Hey, I noticed your Google listing isn’t optimized. <br/>
                        I help businesses get more calls in 48 hours. <br/>
                        Can I share 2 quick improvements?”
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">4</div>
                    <p className="text-lg">Client replies → You offer the service → <span className="text-emerald-400 font-bold">Close ₹500–₹1000</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white/5 py-24 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">Everything you need to <span className="text-emerald-400">succeed</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="p-8 rounded-2xl bg-black border border-white/10 hover:border-emerald-500/50 transition-all group hover:-translate-y-1 text-left">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Flow */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-20">The 5-Step <span className="text-emerald-400">Flow</span></h2>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col lg:flex-row items-center flex-1 w-full lg:w-auto">
                  <div className="flex flex-col items-center gap-4 group">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-lg">{step.name}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-gray-700 mx-auto my-6 lg:my-0 lg:rotate-0 rotate-90" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <HelpCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h2 className="text-3xl lg:text-4xl font-bold">Common Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Do I need experience?', a: 'No, this system is designed specifically for beginners with zero portfolio or experience.' },
                { q: 'How will I get access?', a: 'Immediately after payment, you\'ll be redirected to a page to enter your email and get instant access.' },
                { q: 'Is this beginner-friendly?', a: 'Yes! We avoid technical jargon and focus on simple, repeatable actions.' },
                { q: 'Can I access it later?', a: 'Yes! Once you register your email after payment, you can access it anytime from any device.' },
              ].map((faq, i) => (
                <div key={i} className="p-8 rounded-2xl bg-black border border-white/5 hover:border-white/10 transition-colors space-y-4 text-left">
                  <h3 className="text-xl font-bold text-emerald-400">{faq.q}</h3>
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
          className="w-full bg-emerald-500 text-white py-4 rounded-xl font-black text-lg shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95 transition-all"
        >
          {isLoading ? 'Loading...' : 'GET ACCESS NOW ₹199'}
        </button>
      </div>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2024 Grow Your Business. All rights reserved.</p>
      </footer>

      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
}
