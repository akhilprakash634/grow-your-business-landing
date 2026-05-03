import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO, generateWebPageSchema } from '../../utils/seo';
import { initiateCheckout } from '../../utils/razorpay';
import { CheckCircle2, ChevronRight, MessageSquare, Zap, Target, DollarSign, HelpCircle, ArrowRight, ShoppingCart, X, Lock, Star, Users } from 'lucide-react';

export default function FirstClientPage() {
  const navigate = useNavigate();
  const [salesCount, setSalesCount] = useState(6);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
    const fetchSalesCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/sales-count`);
        if (response.ok) {
          const data = await response.json();
          setSalesCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching sales count:', error);
      }
    };
    fetchSalesCount();
  }, []);

  useSEO({
    title: 'First Freelance Client System | Get Your First Client in 72 Hours',
    description: 'A step-by-step system for beginners to get their first freelance client in 72 hours. No experience needed.',
    keywords: 'freelancing for beginners, get freelance clients, freelance outreach messages, start freelancing, earn online',
    canonical: '/first-client',
    schema: generateWebPageSchema('/first-client', 'First Freelance Client System', 'Get your first freelance client in 72 hours with our proven system.')
  });

  const validateAndProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    if (!buyerName.trim()) { setEmailError('Please enter your name.'); return; }
    if (!buyerEmail.trim() || !/\S+@\S+\.\S+/.test(buyerEmail)) { setEmailError('Please enter a valid email address.'); return; }
    setIsLoading(true);
    setShowEmailModal(false);
    initiateCheckout({
      amount: 100, // ₹1 for testing (100 paise)
      currency: 'INR',
      name: 'First Freelance Client System',
      description: 'Digital Playbook for Beginners',
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim().toLowerCase(),
      onSuccess: (_response, email) => {
        // Store email in localStorage for instant access
        if (email) localStorage.setItem('buyer_email', email);
        navigate('/thank-you');
      },
      onCancel: () => setIsLoading(false),
    });
  };

  const handleBuyNow = () => {
    setShowEmailModal(true);
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

  const faqs = [
    { q: 'Do I need experience?', a: 'No, this system is designed specifically for beginners with zero portfolio or experience.' },
    { q: 'How will I get access?', a: 'Immediately after payment, you\'ll be redirected to your personal access page. Your email is your key — you can revisit anytime.' },
    { q: 'Is this beginner-friendly?', a: 'Yes! We avoid technical jargon and focus on simple, repeatable actions.' },
    { q: 'Can I access it later?', a: 'Yes! Your purchase email gives you permanent access. Just visit the access page and verify your email anytime.' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Email Collection Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowEmailModal(false)} />
          <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-black border border-emerald-500/30 rounded-3xl p-8 shadow-[0_25px_80px_rgba(16,185,129,0.2)] animate-[slideUp_0.3s_ease-out]">
            <button onClick={() => setShowEmailModal(false)} className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Secure Your Access</h2>
              <p className="text-gray-400 text-sm">Your email will be your key to access the product anytime, forever.</p>
            </div>

            <form onSubmit={validateAndProceed} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={e => setBuyerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={e => setBuyerEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
                />
              </div>
              {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
              
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
              >
                <Lock className="w-4 h-4" />
                Proceed to Secure Payment ₹199
              </button>
              <p className="text-center text-xs text-gray-600">🔒 Secured by Razorpay · Your info is safe</p>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tighter">
          GROW YOUR <span className="text-emerald-500">BUSINESS</span>
        </div>
        <button
          onClick={handleBuyNow}
          disabled={isLoading}
          className="bg-emerald-500 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-70"
        >
          <ShoppingCart className="w-4 h-4" /> {isLoading ? 'Processing...' : 'BUY NOW'}
        </button>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="px-6 pt-12 pb-24 md:pt-20 md:pb-32 max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8 lg:col-span-7">
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider border border-emerald-500/20">
                <Zap className="w-3 h-3" /> LAUNCH OFFER: ₹199 ONLY
              </div>
              <div className="inline-flex items-center gap-2 bg-white/5 text-gray-400 px-3 py-1.5 rounded-full text-xs font-bold border border-white/10">
                <Users className="w-3 h-3" /> {salesCount} buyers
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
              Get Your First <span className="text-emerald-400">Freelance Client</span> in 72 Hours
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
              The exact step-by-step system for beginners to land high-paying clients without any prior experience or portfolio.
            </p>

            {/* Social proof stars */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <span className="text-sm text-gray-400 ml-1">Loved by {salesCount}+ freelancers</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 pt-2">
              <button
                onClick={handleBuyNow}
                disabled={isLoading}
                className="w-full sm:w-auto bg-emerald-500 text-white px-8 py-4 rounded-xl font-black text-lg sm:text-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group shadow-[0_15px_40px_rgba(16,185,129,0.3)] disabled:opacity-70"
              >
                {isLoading ? 'Opening...' : <>Buy Now ₹199 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
              </button>
              <div className="flex flex-col justify-center items-center sm:items-start">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-br from-emerald-800 to-emerald-600" />
                    ))}
                  </div>
                  <p className="text-sm text-emerald-400 font-bold">{salesCount} sales done</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Verified purchases today</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none relative group mt-8 lg:mt-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition-all" />
            <div className="relative aspect-square sm:aspect-[4/5] bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center p-4 sm:p-6 shadow-2xl">
              <img
                src="/product-hero.png"
                alt="First Freelance Client System Playbook"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
              />
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

        {/* How It Works */}
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

        {/* Pricing */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-3xl mx-auto bg-gradient-to-b from-emerald-500/10 to-transparent p-px rounded-[2.5rem] border border-emerald-500/20">
            <div className="bg-black p-10 lg:p-16 rounded-[2.5rem] text-center space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold">Limited Time Launch Offer</h2>
                <p className="text-emerald-400 font-bold tracking-widest text-sm uppercase">First 15 Users Only</p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <span className="text-6xl font-black">₹199</span>
                <span className="text-2xl text-gray-500 line-through">₹299</span>
              </div>

              <ul className="text-left max-w-sm mx-auto space-y-4">
                {['Instant Digital Access', 'Lifetime Updates', 'Private Community Access', 'Access via Email — Anytime'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleBuyNow}
                disabled={isLoading}
                className="w-full bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black text-2xl hover:bg-emerald-600 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-70"
              >
                {isLoading ? 'Processing...' : 'BUY NOW ₹199'}
              </button>
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Secure Checkout by Razorpay
              </p>

              <div className="pt-4 flex items-center justify-center gap-2">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-gradient-to-br from-emerald-800 to-emerald-600" />
                  ))}
                </div>
                <p className="text-xs text-gray-400"><span className="text-emerald-400 font-bold">{salesCount} people</span> already grabbed this</p>
              </div>
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
              {faqs.map((faq, i) => (
                <div key={i} className="p-8 rounded-2xl bg-black border border-white/5 hover:border-white/10 transition-colors space-y-4 text-left">
                  <h3 className="text-xl font-bold text-emerald-400">{faq.q}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© 2024 Grow Your Business. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
