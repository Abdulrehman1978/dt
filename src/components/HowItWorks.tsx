import React, { useState } from 'react';
import { Smartphone, Calculator, Send, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { PlatformBadge } from './PlatformBadges';

interface HowItWorksProps {
  onStartFiling: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartFiling }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Connect Delivery Platforms',
      desc: 'Link your registered mobile number for Swiggy, Zomato, Zepto, and Blinkit in one tap. We securely read only your payout & TDS deductions.',
      badgeText: 'Instant 1-Click Sync',
      icon: Smartphone,
      preview: (
        <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-700/70">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span>Detected Delivery Platforms</span>
            <span className="text-emerald-400 font-medium">All Linked</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
              <PlatformBadge platform="zomato" size="sm" />
              <span className="text-xs text-emerald-400 font-mono font-semibold">Synced: ₹1,84,500</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
              <PlatformBadge platform="swiggy" size="sm" />
              <span className="text-xs text-emerald-400 font-mono font-semibold">Synced: ₹1,42,000</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
              <PlatformBadge platform="zepto" size="sm" />
              <span className="text-xs text-emerald-400 font-mono font-semibold">Synced: ₹68,500</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '02',
      title: 'We Calculate Your Zero Tax & TDS',
      desc: 'Under Section 44ADA, 50% of your earnings are exempt for petrol, bike EMI and mobile bills. We verify your Form 26AS to confirm zero tax due.',
      badgeText: 'Section 44ADA Optimization',
      icon: Calculator,
      preview: (
        <div className="space-y-3 p-4 rounded-xl bg-slate-900/90 border border-slate-700/70">
          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-800">
            <span className="text-slate-400">Tax Optimization Breakdown</span>
            <span className="text-emerald-400 font-semibold font-mono">Sec 44ADA + 87A</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Gross Payouts (FY 24-25):</span>
              <span className="font-mono text-white">₹3,95,000</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>50% Gig Expense Exemption:</span>
              <span className="font-mono">- ₹1,97,500</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Taxable Income:</span>
              <span className="font-mono text-white">₹1,97,500</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-emerald-400">
              <span>Net Tax Payable:</span>
              <span className="font-mono">₹0 (Zero)</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: '03',
      title: 'File Your ITR in 1-Click',
      desc: 'Review your pre-filled ITR form and e-Verify using instant Aadhaar OTP. We generate your official Govt ITR-V acknowledgement instantly.',
      badgeText: 'Instant Aadhaar e-Verify',
      icon: Send,
      preview: (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/70 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>ITR-4 Sugam Form Generated</span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-1">
            <div className="text-slate-300 font-medium">Govt Acknowledgement No:</div>
            <div className="font-mono text-emerald-300 font-bold text-sm tracking-wider">
              ITR4-88492019482-2025
            </div>
            <div className="text-[11px] text-slate-400 pt-1">e-Verified via Aadhaar OTP on 25-Aug-2025</div>
          </div>
        </div>
      ),
    },
    {
      number: '04',
      title: 'Track Refund Direct to Bank',
      desc: 'Watch the Income Tax Department process and credit your refund directly to your SBI, HDFC, or ICICI bank account with live status alerts.',
      badgeText: '7-21 Day Direct Credit',
      icon: ShieldCheck,
      preview: (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/70 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="text-slate-400">Refund Status Live Tracker</span>
            <span className="text-emerald-400 font-bold">Approved</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              ₹
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white font-mono">₹14,280 Refund Credited</div>
              <div className="text-[11px] text-slate-400">SBI A/c •••• 4912 via NECS/RTGS</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0A0F17] border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Taxly Gets Your Money Back
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            No complicated tax terms. No endless paper receipts. We built Taxly specifically for how food and grocery delivery riders work.
          </p>
        </div>

        {/* Steps Grid and Interactive Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 4 Step Selector Buttons */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isCurrent = activeStep === idx;
              return (
                <div
                  key={step.number}
                  id={`how-it-works-step-${idx}`}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isCurrent
                      ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5 scale-[1.01]'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        isCurrent
                          ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {step.number}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className={`text-base font-bold transition-colors ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                          {step.title}
                        </h3>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                          {step.badgeText}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Step Visual Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#080D14] border border-slate-700 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Step {steps[activeStep].number} in Action</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Taxly Live Flow</span>
              </div>

              {/* Dynamic Step Preview Component */}
              <div className="min-h-[220px] flex flex-col justify-center">
                {steps[activeStep].preview}
              </div>

              {/* Step Navigation Dots & CTA */}
              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeStep === i ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  id="how-it-works-try-cta"
                  onClick={onStartFiling}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <span>Start with Step 1</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
