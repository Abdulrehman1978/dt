import React from 'react';
import { WHY_FILE_BENEFITS } from '../data/mockData';
import { IndianRupee, Bike, CreditCard, ShieldCheck, Building2, FileCheck, ArrowUpRight } from 'lucide-react';

interface WhyFileITRProps {
  onExploreFiling: () => void;
}

export const WhyFileITR: React.FC<WhyFileITRProps> = ({ onExploreFiling }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'IndianRupee':
        return <IndianRupee className="w-5 h-5 text-emerald-400" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-teal-400" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-indigo-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-cyan-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="why-file" className="py-20 bg-[#080D14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            More Than Just Money Back
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Every Delivery Rider Should File ITR
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Filing Income Tax Return is not just for high-salaried professionals. Here is how it directly unlocks financial power for delivery partners.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_FILE_BENEFITS.map((item) => (
            <div
              key={item.id}
              id={`benefit-card-${item.id}`}
              className={`rounded-2xl p-6 transition-all relative overflow-hidden flex flex-col justify-between ${
                item.highlight
                  ? 'bg-gradient-to-b from-emerald-950/40 via-slate-900/90 to-slate-900 border border-emerald-500/40 shadow-xl shadow-emerald-500/10'
                  : 'bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    {item.stat}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-1.5">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-emerald-400 cursor-pointer group" onClick={onExploreFiling}>
                <span>Claim with Taxly</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white">Have TDS pending from last financial year?</h4>
            <p className="text-sm text-slate-300">You can still file an updated ITR-U and claim previous years' deducted TDS.</p>
          </div>
          <button
            onClick={onExploreFiling}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            Check Prior Years Eligibility
          </button>
        </div>

      </div>
    </section>
  );
};
