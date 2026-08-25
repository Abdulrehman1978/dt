import React, { useState } from 'react';
import { formatINR } from '../utils/formatters';
import { PlatformBadge } from './PlatformBadges';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Zap, HelpCircle } from 'lucide-react';
import { DeliveryPlatform, PlatformId } from '../types';

interface HeroSectionProps {
  onGetStarted: () => void;
  platforms: DeliveryPlatform[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  platforms,
}) => {
  const [monthlyEarnings, setMonthlyEarnings] = useState<number>(28000);
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>(['zomato', 'swiggy']);

  // Estimate calculation: Annual = monthly * 12. TDS @ 1% under 194O.
  // With Section 44ADA + 87A rebate, tax is ₹0, so 100% of TDS is refunded + ~3% interest.
  const annualGross = monthlyEarnings * 12;
  const estimatedTds = Math.round(annualGross * 0.01);
  const estimatedRefund = estimatedTds;

  const togglePlatform = (id: PlatformId) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== id));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-18 sm:pb-28">
      {/* Background glow ambient effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Income Tax Filing for Delivery Partners (FY 2024-25)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">TDS</span>. Back In Your Bank Account.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Swiggy, Zomato, Zepto & Blinkit deduct <strong className="text-white font-semibold">1% TDS</strong> from every order payout. Since your annual income is zero-tax eligible, you can claim <strong className="text-emerald-400 font-semibold">100% of this money back</strong> in under 3 minutes.
            </p>

            {/* Quick value props list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero petrol receipt headaches (Sec 44ADA)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Auto-sync with Form 26AS & AIS tax portal</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct credit to your SBI, HDFC, or Paytm Bank</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Govt ITR-V acknowledgement for bike loans</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="hero-start-cta"
                onClick={onGetStarted}
                className="px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Connect Apps & Calculate Refund</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </button>

              <a
                href="#how-it-works"
                className="px-5 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Security footnote */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                256-bit Bank Grade Encrypted
              </span>
              <span>•</span>
              <span>Income Tax Dept API Verified</span>
            </div>
          </div>

          {/* Right Column: Live Interactive TDS Estimator Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0B111A]/95 p-6 sm:p-7 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
              
              {/* Card Header badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Instant Refund Estimator</h3>
                    <p className="text-[11px] text-slate-400">FY 2024-25 Assessment</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% Claimable
                </span>
              </div>

              {/* Platform selector chips */}
              <div className="py-4 space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>1. Platforms you deliver with:</span>
                  <span className="text-[11px] text-slate-400 font-normal">Select all that apply</span>
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(['zomato', 'swiggy', 'zepto', 'blinkit'] as PlatformId[]).map((platformId) => {
                    const isSelected = selectedPlatforms.includes(platformId);
                    return (
                      <button
                        key={platformId}
                        id={`hero-chip-${platformId}`}
                        onClick={() => togglePlatform(platformId)}
                        className={`transition-all rounded-full p-0.5 cursor-pointer ${
                          isSelected ? 'ring-2 ring-emerald-400 scale-105' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <PlatformBadge platform={platformId} size="sm" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Monthly earnings slider */}
              <div className="space-y-3 py-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">2. Average monthly payout:</span>
                  <span className="font-mono text-emerald-400 font-bold text-base">
                    {formatINR(monthlyEarnings)}
                    <span className="text-slate-400 font-normal text-xs">/month</span>
                  </span>
                </div>

                <input
                  id="hero-earnings-slider"
                  type="range"
                  min={12000}
                  max={65000}
                  step={1000}
                  value={monthlyEarnings}
                  onChange={(e) => setMonthlyEarnings(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>₹12,000</span>
                  <span>₹35,000</span>
                  <span>₹65,000+</span>
                </div>
              </div>

              {/* Estimated Refund Highlight Output */}
              <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 text-center relative overflow-hidden">
                <div className="text-xs text-slate-300 font-medium mb-1">
                  Estimated TDS Refund you will get back:
                </div>
                <div
                  id="hero-estimated-refund-display"
                  className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight my-1 drop-shadow-sm"
                >
                  {formatINR(estimatedRefund)}
                  <span className="text-xs text-emerald-300/80 font-sans font-normal ml-1.5">+ interest</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1.5">
                  <span>Section 194-O TDS: <strong className="text-white">{formatINR(estimatedTds)}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-300">Zero Income Tax Due</span>
                </div>
              </div>

              {/* CTA inside Card */}
              <button
                id="hero-card-claim-cta"
                onClick={onGetStarted}
                className="w-full mt-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>File & Claim My {formatINR(estimatedRefund)}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹18.4 Cr+</div>
            <div className="text-xs sm:text-sm text-slate-400">TDS Refunds Unlocked</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">45,000+</div>
            <div className="text-xs sm:text-sm text-slate-400">Riders Filed Successfully</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">4.9 / 5.0★</div>
            <div className="text-xs sm:text-sm text-slate-400">Play Store User Rating</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono">100% Free</div>
            <div className="text-xs sm:text-sm text-slate-400">For Income Under ₹3 Lakhs</div>
          </div>
        </div>

        {/* Supported Platforms Strip */}
        <div className="mt-12 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">
            Works with all major Indian delivery & gig platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {platforms.map((p) => (
              <PlatformBadge key={p.id} platform={p.id} size="md" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
