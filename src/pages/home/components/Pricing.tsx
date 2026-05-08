import { useState, useEffect } from 'react';
import { fetchPricing } from '../../../lib/sanity';
import { Check } from 'lucide-react';

interface PricingPlan {
  _id: string;
  planName: string;
  price: number;
  features: string[];
  isPopular: boolean;
  buttonText: string;
}

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlans = async () => {
      try {
        const data = await fetchPricing();
        if (data && data.length > 0) {
          setPlans(data);
        }
      } catch (error) {
        console.error('Error fetching pricing from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };
    getPlans();
  }, []);

  if (loading) {
    return (
      <section id="pricing" className="py-24 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-800 rounded mb-4"></div>
            <div className="h-4 w-96 bg-gray-800 rounded mb-16"></div>
            <div className="grid md:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] bg-gray-800 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback plans if Sanity is empty
  const displayPlans = plans.length > 0 ? plans : [
    {
      _id: 'starter',
      planName: 'Starter',
      price: 7999,
      features: ['1-Page Website', 'WhatsApp Integration', 'Basic Setup', 'Mobile Responsive'],
      isPopular: false,
      buttonText: 'Get Starter Package'
    },
    {
      _id: 'growth',
      planName: 'Growth',
      price: 14999,
      features: ['5-Page Website', 'Lead Capture Forms', 'GMB Setup', 'Local SEO', 'WhatsApp Integration'],
      isPopular: true,
      buttonText: 'Get Growth Package'
    },
    {
      _id: 'premium',
      planName: 'Premium',
      price: 24999,
      features: ['Advanced Features', 'Speed Optimization', 'Dedicated Support', 'Advanced SEO'],
      isPopular: false,
      buttonText: 'Get Premium Package'
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple, Transparent Packages
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">
            Choose the package that works best for your business size. One-time payment, no hidden monthly fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-center">
          {displayPlans.map((plan) => (
            <div 
              key={plan._id}
              className={`rounded-3xl p-8 border ${
                plan.isPopular 
                  ? 'bg-gradient-to-b from-gray-950 to-gray-900 border-emerald-500 relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(16,185,129,0.15)]' 
                  : 'bg-gray-950 border-gray-800'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-4">{plan.planName}</h3>
              <div className="mb-6">
                <span className={`text-5xl font-extrabold ${plan.isPopular ? 'text-emerald-400' : 'text-white'}`}>
                  ₹{plan.price.toLocaleString()}
                </span>
                <span className="text-gray-400 ml-2">/ one-time</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-gray-300">
                    <Check className="text-emerald-500 w-5 h-5 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/916282863459?text=I'm%20interested%20in%20the%20${plan.planName}%20Package`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 px-6 text-center text-white font-bold rounded-xl transition-all active:scale-95 ${
                  plan.isPopular 
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20' 
                    : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
