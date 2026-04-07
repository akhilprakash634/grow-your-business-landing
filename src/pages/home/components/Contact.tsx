export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-emerald-500 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Urgency Badge */}
        <div className="inline-flex items-center space-x-2 px-6 py-2 bg-black/20 rounded-full mb-8 backdrop-blur-md border border-white/20">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
          <span className="text-sm font-bold text-white uppercase tracking-wider">
            Only 5 businesses accepted per month to ensure quality
          </span>
        </div>

        <h2 className="text-5xl sm:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
          Start Getting Customers This Week.
        </h2>
        
        <p className="text-xl sm:text-2xl text-emerald-100 font-medium mb-12 max-w-2xl mx-auto">
          Don't let your competitors steal all the online customers. Set up your Business Growth System today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://wa.me/916282863459"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto px-10 py-5 bg-gray-950 text-white text-xl font-bold rounded-2xl hover:bg-black transition-all transform hover:scale-105 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center space-x-3 shrink-0"
          >
            <i className="ri-whatsapp-fill text-3xl text-emerald-500 group-hover:rotate-12 transition-transform"></i>
            <span>Message Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
