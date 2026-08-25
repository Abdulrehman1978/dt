import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#0A0F17] border-t border-slate-800/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Verified Rider Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by 45,000+ Delivery Partners
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Real delivery riders from Bengaluru, Delhi, and Mumbai sharing how Taxly helped them claim back their hard-earned money.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              id={`testimonial-card-${idx}`}
              className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all hover:bg-slate-900"
            >
              <div>
                {/* Rating stars and Refund Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {t.amount} Refunded in {t.days}
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Rider Identity Info */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-950 font-bold flex items-center justify-center text-sm shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                  </h4>
                  <div className="text-xs text-slate-400">
                    {t.platform} • <span className="text-slate-400">{t.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Play Store & Trust Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Rated 4.9★ by Gig Delivery Riders</div>
              <div className="text-xs text-slate-400">Average refund claim size: ₹9,240 per rider for FY 24-25</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span>Direct Bank Transfer via SBI/NECS</span>
          </div>
        </div>

      </div>
    </section>
  );
};
