import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSEO } from '../../utils/seo';
import { CheckCircle2, Unlock, Mail, Download, Loader2, ArrowRight, Headphones } from 'lucide-react';
import SupportModal from '../home/components/SupportModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [buyerEmail, setBuyerEmail] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  
  const paymentId = searchParams.get('payment_id');
  const productId = searchParams.get('product_id') || 'first-client';

  const products = {
    'first-client': {
      name: 'First Freelance Client System',
      link: 'https://1drv.ms/b/c/3aac4d58cd15c559/IQC-aJwdaaG9SZTnxvoHF0OvAVoJ5uv-lrqAiLA9cjJ4G5E?e=jiW0I0'
    },
    'women-income-ideas': {
      name: 'Income Making Ideas for Women',
      link: 'https://1drv.ms/b/c/3aac4d58cd15c559/IQA3xstO1F2QQ5MJln5pbsWjATn7PiEth5ZIi-qeIHsC5ZE?e=Sw94mO'
    }
  };

  const product = products[productId as keyof typeof products] || products['first-client'];

  useEffect(() => {
    const email = localStorage.getItem('buyer_email');
    if (email) {
      setBuyerEmail(email);
      setIsSuccess(true);
    }
  }, []);

  useSEO({
    title: 'Payment Successful | Grow Your Business',
    description: 'Thank you for your purchase. Please register your email to get instant access.',
    canonical: '/thank-you',
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail || !/\S+@\S+\.\S+/.test(inputEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsRegistering(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/register-purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_id: paymentId || 'manual_entry',
          email: inputEmail.toLowerCase().trim()
        }),
      });

      if (response.ok) {
        localStorage.setItem('buyer_email', inputEmail.toLowerCase().trim());
        setBuyerEmail(inputEmail.toLowerCase().trim());
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to register. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse"></div>
          <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto relative" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Payment Successful!</h1>
          <p className="text-gray-400">
            Thank you for purchasing <strong>{product.name}</strong>.
          </p>
        </div>

        {!isSuccess ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Secure Your Access</h3>
              <p className="text-sm text-gray-500">
                Enter your email address to link your purchase and get the download link.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all"
                  autoFocus
                />
              </div>

              {error && <p className="text-red-400 text-sm ml-1">{error}</p>}

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full bg-emerald-500 text-white py-4 rounded-xl font-black text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-[0_15px_30px_rgba(16,185,129,0.3)] disabled:opacity-70"
              >
                {isRegistering ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Registering...</>
                ) : (
                  <><Unlock className="w-5 h-5" /> UNLOCK MY ACCESS</>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <Unlock className="w-3 h-3" /> ACCESS UNLOCKED
              </div>
              <h3 className="text-2xl font-bold">Your Product is Ready</h3>
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium">
                <Mail className="w-4 h-4" /> {buyerEmail}
              </div>
              <p className="text-gray-500 text-sm">
                We've also sent the download link to your email.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.2)]"
              >
                <Download className="w-6 h-6" /> DOWNLOAD PDF NOW
              </a>
              
              <button 
                onClick={() => navigate('/product-access')}
                className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-sm"
              >
                Go to Online Access Page <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={() => setIsSupportModalOpen(true)}
                  className="w-full bg-emerald-500/10 text-emerald-400 py-4 rounded-xl font-bold text-sm hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2 border border-emerald-500/20"
                >
                  <Headphones className="w-4 h-4" /> Need help? Get Free 1:1 Support
                </button>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-white transition-colors font-medium text-sm"
        >
          Back to Home
        </button>
      </div>

      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
}
