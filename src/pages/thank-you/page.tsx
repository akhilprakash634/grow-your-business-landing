import { useSEO } from '../../utils/seo';
import { CheckCircle2, Download, ExternalLink } from 'lucide-react';

export default function ThankYouPage() {
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
            <h3 className="text-xl font-bold">Access Instructions</h3>
            <p className="text-gray-500">
              Click the button below to view and download your system files.
            </p>
          </div>

          <a 
            href="https://1drv.ms/b/c/3aac4d58cd15c559/IQC-aJwdaaG9SZTnxvoHF0OvAVoJ5uv-lrqAiLA9cjJ4G5E?e=jiW0I0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.2)]"
          >
            <Download className="w-6 h-6" /> DOWNLOAD SYSTEM
          </a>

          <div className="pt-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
            <ExternalLink className="w-4 h-4" /> Secure OneDrive Access
          </div>
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
