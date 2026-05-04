import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Lock, Mail, Unlock, BookOpen, Download, ArrowRight, ShoppingCart, Star, FileText, Zap, Target, MessageSquare, DollarSign } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ProductAccessPage() {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [error, setError] = useState('');
  const [autoChecked, setAutoChecked] = useState(false);

  // Auto-verify from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('buyer_email');
    if (savedEmail) {
      setEmail(savedEmail);
      verifyEmail(savedEmail, true);
    }
    setAutoChecked(true);
  }, []);

  const verifyEmail = async (emailToCheck: string, silent = false) => {
    if (!silent) setIsVerifying(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/check-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToCheck }),
      });
      const data = await res.json();
      if (data.authorized) {
        setIsAuthorized(true);
        setBuyerName(data.buyer?.name || '');
        localStorage.setItem('buyer_email', emailToCheck.toLowerCase().trim());
      } else if (!silent) {
        setError('This email hasn\'t purchased the product. Please check your email or buy now.');
      }
    } catch {
      if (!silent) setError('Could not verify. Please check your connection and try again.');
    }
    if (!silent) setIsVerifying(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address.'); return; }
    verifyEmail(email);
  };

  const chapters = [
    { num: '01', title: 'The Freelance Mindset Reset', desc: 'Why 97% of beginners fail and how to be in the 3%.' },
    { num: '02', title: 'Finding High-Value Leads', desc: 'Where to find clients who pay well and respect your time.' },
    { num: '03', title: 'The 3-Line Cold Message', desc: 'The exact outreach formula that gets a 40%+ reply rate.' },
    { num: '04', title: 'Converting Replies to Calls', desc: 'How to take a "maybe" and turn it into a "yes, let\'s do it".' },
    { num: '05', title: 'Closing Without Feeling Salesy', desc: 'The conversation framework to close deals naturally.' },
    { num: '06', title: 'Getting Paid & Scaling', desc: 'Invoices, retainers, and turning one client into many.' },
  ];

  const tools = [
    { icon: FileText, title: 'Message Templates', desc: '12 ready-to-use cold outreach messages' },
    { icon: Target, title: 'Lead Finder Prompts', desc: 'AI prompts to find the right clients fast' },
    { icon: MessageSquare, title: 'Objection Handlers', desc: 'Responses to every "I\'ll think about it"' },
    { icon: DollarSign, title: 'Pricing Calculator', desc: 'Know exactly what to charge clients' },
  ];

  if (!autoChecked) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold tracking-tighter">
          GROW YOUR <span className="text-emerald-500">BUSINESS</span>
        </Link>
        {isAuthorized && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" /> Access Granted
          </div>
        )}
      </nav>

      {!isAuthorized ? (
        /* ── GATE ── */
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Lock className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Access Your Product</h1>
            <p className="text-gray-400 mb-10">Enter the email you used during purchase to unlock your content.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
                  autoFocus
                />
              </div>
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-left">
                  {error}
                  {error.includes('buy now') && (
                    <Link to="/first-client" className="block mt-2 text-emerald-400 font-bold hover:underline flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" /> Buy Now for ₹199 →
                    </Link>
                  )}
                </div>
              )}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isVerifying ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying...</>
                ) : (
                  <><Unlock className="w-5 h-5" /> Unlock My Access</>
                )}
              </button>
            </form>

            <p className="text-gray-600 text-sm mt-8">
              Haven't purchased yet?{' '}
              <Link to="/first-client" className="text-emerald-400 hover:underline">Get the system for ₹199 →</Link>
            </p>
          </div>
        </div>
      ) : (
        /* ── CONTENT ── */
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
          {/* Welcome banner */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">
                {buyerName ? `Welcome, ${buyerName.split(' ')[0]}! 🎉` : 'Access Granted! 🎉'}
              </h1>
              <p className="text-gray-400">Your purchase is verified. Everything below is unlocked for you.</p>
            </div>
            <div className="flex items-center gap-1 sm:ml-auto flex-shrink-0">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            </div>
          </div>

          {/* Chapters */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold">Your 6-Chapter Playbook</h2>
            </div>
            <div className="space-y-4">
              {chapters.map((ch, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-6 p-6 bg-black border border-white/5 hover:border-emerald-500/30 rounded-2xl transition-all hover:-translate-y-0.5 cursor-default"
                >
                  <span className="text-3xl font-black text-emerald-500/30 group-hover:text-emerald-500/60 transition-colors flex-shrink-0">
                    {ch.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">{ch.title}</h3>
                    <p className="text-gray-500 text-sm">{ch.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Bonus Tools */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold">Bonus Tools Included</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {tools.map((tool, i) => (
                <div key={i} className="p-6 bg-black border border-white/5 hover:border-emerald-500/30 rounded-2xl transition-all hover:-translate-y-0.5 group">
                  <tool.icon className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold mb-1">{tool.title}</h3>
                  <p className="text-gray-500 text-sm">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Download CTA */}
          <div className="bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-10 text-center space-y-6">
            <Download className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-bold">Download Your Copy</h2>
            <p className="text-gray-400">Your complete PDF with all chapters and bonus templates is ready.</p>
            <a
              href="https://1drv.ms/b/c/3aac4d58cd15c559/IQC-aJwdaaG9SZTnxvoHF0OvAVoJ5uv-lrqAiLA9cjJ4G5E?e=jiW0I0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
            >
              <Download className="w-5 h-5" /> Download PDF
            </a>
            <p className="text-gray-600 text-xs">File available as a secure PDF. Access with email: {email}</p>
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-600 text-sm pb-8">
            Questions? WhatsApp us at{' '}
            <a href="https://wa.me/916282863459" className="text-emerald-400 hover:underline">+91 62828 63459</a>
          </p>
        </div>
      )}
    </div>
  );
}
