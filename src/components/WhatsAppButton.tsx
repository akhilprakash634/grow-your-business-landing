import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "916282863459"; // Used from Hero.tsx
  const message = encodeURIComponent("Hi, I'm interested in your services and would like to know more.");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)] transition-all duration-300 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} className="fill-current" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10 shadow-xl">
        Chat with us
        {/* Triangle pointer */}
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-l-[6px] border-l-gray-900 border-b-[6px] border-b-transparent"></div>
      </div>
      
      {/* Ping animation behind the button */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10"></div>
    </a>
  );
}
