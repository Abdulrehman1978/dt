import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      id: 'free',
      name: 'Rider Basic',
      price: '₹0',
      period: 'Forever Free',
      badge: 'Zero Income Tax Due',
      description: 'Perfect for riders earning up to ₹3,00,000 annually from a single delivery app.',
      highlight: false,
      buttonText: 'File For Free',
      features: [
        'Single platform sync (Swiggy / Zomato)',
        'Automatic Form 26AS & 194-O TDS fetch',
        'Section 44ADA Presumptive Tax calculation',
        'Govt ITR-4 Sugam e-Filing in 3 minutes',
        'Official ITR-V Acknowledgement PDF',
      ],
    },
    {
      id: 'plus',
      name: 'Multi-App Rider Plus',
      price: '₹299',
      originalPrice: '₹599',
      period: 'per financial year',
      badge: 'Most Popular for Gig Workers',
      description: 'Ideal for delivery partners riding across multiple apps (Swiggy + Zomato + Zepto).',
      highlight: true,
      buttonText: 'Get Plus Plan',
      features: [
        'Unlimited platform sync (Zomato, Swiggy, Zepto, Blinkit)',
        'Multi-TAN automatic 26AS reconciliation',
        'Maximised fuel & mobile deductions engine',
        'WhatsApp live status alerts & refund tracking',
        'Verified ITR Certificate for Bike Loan approval',
        'Priority processing queue at CPC Bangalore',
      ],
    },
    {
      id: 'pro',
      name: 'CA Expert Assisted',
      price: '₹699',
      originalPrice: '₹1,299',
      period: 'one-time complete filing',
      badge: 'Expert Human Review',
      description: 'For riders with crypto, previous year pending TDS, or prior Income Tax notices.',
      highlight: false,
      buttonText: 'Book CA Review',
      features: [
        'Everything in Plus Plan',
        '1-on-1 Dedicated Chartered Accountant review',
        'Past 2 years pending TDS recovery (ITR-U)',
        'Notice & Defective Return protection guarantee',
        'Official CA-signed Net Worth / Income Certificate',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-[#080D14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Fair & Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparent Pricing Built for Gig Workers
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            No hidden charges. No commission taken from your refund money. 100% of your TDS goes directly to your bank account.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                plan.highlight
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900/95 to-emerald-950/40 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.03] z-10'
                  : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-xs tracking-wide uppercase shadow-md">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {!plan.highlight && (
                    <span className="text-[11px] font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 min-h-[36px] mb-6">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-extrabold text-white font-mono">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-slate-500 line-through font-mono">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">/{plan.period}</span>
                </div>

                {/* Features list */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                id={`btn-select-plan-${plan.id}`}
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  plan.highlight
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Pricing Guarantee */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Money-Back Guarantee if your ITR is not accepted by the Income Tax Department</span>
        </div>

      </div>
    </section>
  );
};
