import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-10 px-4">
      <h2 className="text-3xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
      <div className="grid gap-6">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-4 hover:bg-white/[0.05] transition-colors">
            <h3 className="font-bold text-white text-xl">Q: {faq.question}</h3>
            <p className="text-gray-400 leading-relaxed text-base font-medium">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
