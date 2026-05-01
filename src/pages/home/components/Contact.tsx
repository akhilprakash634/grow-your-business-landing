import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // GOOGLE SHEETS INTEGRATION
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyEbVHg47Nt_rSMAroYiEDtP6PHbHVaYwzrFdIeL58dW65Fxz_zNZrLitaKBaYy5Cfn/exec';

    if (!GOOGLE_SHEET_URL) {
      console.warn('Google Sheet URL not set. Logging data to console instead.');
      console.log('Form Data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      return;
    }

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      setStatus('success');
    } catch (err) {
      console.error('Submission Error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-950 flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-checkbox-circle-fill text-5xl text-emerald-500"></i>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Enquiry Received!</h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Thank you for reaching out. Our team will get back to you within 24 hours to discuss your growth plan.
          </p>
          <button
            onClick={() => setStatus('')}
            className="mt-8 text-emerald-400 font-bold hover:underline"
          >
            Send another enquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Content */}
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Let's Work Together</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
              Ready to Grow Your <span className="text-emerald-500">Business?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Fill out the form and we'll create a custom growth plan for your brand. Get a mobile-friendly website and WhatsApp system that actually brings customers.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <i className="ri-whatsapp-line text-2xl text-emerald-500"></i>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Direct Contact</p>
                  <p className="text-white font-bold text-lg">+91 62828 63459</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <i className="ri-mail-line text-2xl text-emerald-500"></i>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Email Us</p>
                  <p className="text-white font-bold text-lg">hello@growyourbusiness.today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-800 rounded-[2.5rem] blur opacity-25"></div>
            <form
              onSubmit={handleSubmit}
              className="relative bg-gray-900 border border-gray-800 p-8 sm:p-10 rounded-[2rem] shadow-2xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Full Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Brand Name</label>
                  <input
                    required
                    name="brand"
                    type="text"
                    placeholder="ACME Corp"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Email Address</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Phone Number</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Location</label>
                <input
                  required
                  name="location"
                  type="text"
                  placeholder="e.g. Dubai, UAE or Kochi, Kerala"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Requirement</label>
                <select
                  required
                  name="requirement"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
                >
                  <option value="" disabled selected>Select a Service</option>
                  <option value="New Website Development">New Website Development</option>
                  <option value="WhatsApp Marketing System">WhatsApp Marketing System</option>
                  <option value="Local SEO & GMB Optimization">Local SEO & GMB Optimization</option>
                  <option value="Full Business Growth Package">Full Business Growth Package</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Message (Optional)</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send My Enquiry</span>
                    <i className="ri-send-plane-fill"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
