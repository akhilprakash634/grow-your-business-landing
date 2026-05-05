import { useState } from 'react';
import { X, MessageSquare, Loader2, ShieldCheck, Phone, Mail, ArrowRight } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid mobile number.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/request-support`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim(), mobile }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to WhatsApp
        const message = encodeURIComponent('i have purchased the product i need support');
        const whatsappUrl = `https://wa.me/916282863459?text=${message}`;
        window.open(whatsappUrl, '_blank');
        onClose();
      } else {
        setError(data.error || 'Verification failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-emerald-500/10 blur-[80px] -z-10" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-white">Free 1:1 Support</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enter the details used during purchase to connect with our support team.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 ml-1">Email Address (Gmail)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all focus:bg-white/[0.08]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 ml-1">Mobile Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="w-4 h-4 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all focus:bg-white/[0.08]"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium leading-relaxed">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 group shadow-[0_15px_40px_rgba(16,185,129,0.3)] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLoading ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Verifying...</>
              ) : (
                <>Connect to WhatsApp <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
            Verified Purchase Only
          </div>
        </div>
      </div>
    </div>
  );
}
