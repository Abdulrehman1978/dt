import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#080D14] border-t border-slate-800/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-base">
            Everything you need to know about your 1% TDS, Section 44ADA, and claiming your refund.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/90 transition-colors"
                >
                  <span className="text-base font-bold text-white flex items-center gap-3">
                    <span className="text-emerald-400 font-mono text-sm font-semibold">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-sm text-slate-400">
          Have a specific question about your 26AS or payout?{' '}
          <span className="text-emerald-400 font-semibold cursor-pointer hover:underline">
            Chat with our Rider Tax Helpdesk on WhatsApp (24x7)
          </span>
        </div>

      </div>
    </section>
  );
};
