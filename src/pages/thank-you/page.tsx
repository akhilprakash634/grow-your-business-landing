import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../utils/seo';
import { CheckCircle2, Unlock, Mail, Download, ExternalLink } from 'lucide-react';

export default function ThankYouPage() {
  const [buyerEmail, setBuyerEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('buyer_email') || '';
    setBuyerEmail(email);
  }, []);

  useSEO({
    title: 'Payment Successful | First Freelance Client System',
    description: 'Thank you for your purchase. You can now access the First Freelance Client System.',
    canonical: '/thank-you',
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse"></div>
          <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto relative" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight">Payment Successful!</h1>
          <p className="text-xl text-gray-400">
            Welcome to the system. Your journey to your first freelance client starts now.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Your Product is Ready</h3>
            {buyerEmail && (
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium">
                <Mail className="w-4 h-4" /> {buyerEmail}
              </div>
            )}
            <p className="text-gray-500">
              We've also sent the download link to your email so you don't lose it!
            </p>
          </div>

          <a
            href="https://1drv.ms/b/c/3aac4d58cd15c559/IQC-aJwdaaG9SZTnxvoHF0OvAVoJ5uv-lrqAiLA9cjJ4G5E?e=jiW0I0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.2)]"
          >
            <Download className="w-6 h-6" /> DOWNLOAD PLAYBOOK PDF
          </a>
        </div>

        <button 
          onClick={() => window.location.href = '/'}
          className="text-gray-500 hover:text-white transition-colors font-medium"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
