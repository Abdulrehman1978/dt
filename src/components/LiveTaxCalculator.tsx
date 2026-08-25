import React, { useState } from 'react';
import { formatINR, calculateGigTax } from '../utils/formatters';
import { Calculator, Check, ArrowRight, ShieldAlert, Sparkles, Fuel, Smartphone, HeartPulse } from 'lucide-react';

interface LiveTaxCalculatorProps {
  onStartFilingWithAmount: (amount: number) => void;
}

export const LiveTaxCalculator: React.FC<LiveTaxCalculatorProps> = ({
  onStartFilingWithAmount,
}) => {
  const [monthlyGross, setMonthlyGross] = useState<number>(32000);
  const [hasHealthInsurance, setHasHealthInsurance] = useState<boolean>(true);
  const [hasLifeInsurance, setHasLifeInsurance] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<'petrol' | 'ev'>('petrol');

  const annualGross = monthlyGross * 12;
  const annualTds = Math.round(annualGross * 0.01); // 1% under 194-O
  
  const additionalDeductions = 
    (hasHealthInsurance ? 12000 : 0) + 
    (hasLifeInsurance ? 25000 : 0);

  const calc = calculateGigTax(annualGross, annualTds, additionalDeductions, 'new');

  return (
    <section id="tax-calculator" className="py-20 bg-[#0A0F17] border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Interactive Tax & Refund Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See Exactly How Much You Are Leaving On The Table
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Delivery apps automatically deduct 1% TDS. Adjust the sliders below to see your legal refund under the Indian Income Tax Act.
          </p>
        </div>

        {/* Calculator Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Input Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Monthly Income Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <label className="text-slate-200 font-bold">Monthly Delivery Earnings (All Apps):</label>
                  <span className="font-mono text-emerald-400 font-extrabold text-lg">
                    {formatINR(monthlyGross)}
                    <span className="text-xs text-slate-400 font-normal"> /mo</span>
                  </span>
                </div>
                <input
                  id="calc-income-slider"
                  type="range"
                  min={10000}
                  max={75000}
                  step={1000}
                  value={monthlyGross}
                  onChange={(e) => setMonthlyGross(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>₹10,000</span>
                  <span>₹40,000</span>
                  <span>₹75,000+</span>
                </div>
                <div className="text-xs text-slate-400 bg-slate-800/50 p-2 rounded-lg flex items-center justify-between">
                  <span>Total Annual Payout (FY 2024-25):</span>
                  <span className="font-mono text-white font-semibold">{formatINR(annualGross)}</span>
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Primary Delivery Vehicle:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="calc-vehicle-petrol"
                    onClick={() => setSelectedVehicle('petrol')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      selectedVehicle === 'petrol'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Fuel className="w-4 h-4 text-amber-400" />
                    <span>Petrol Bike / Scooter</span>
                  </button>

                  <button
                    id="calc-vehicle-ev"
                    onClick={() => setSelectedVehicle('ev')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      selectedVehicle === 'ev'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Electric EV / Cycle</span>
                  </button>
                </div>
              </div>

              {/* Additional Gig Deductions Toggles */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-300">Additional Allowable Savings:</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 cursor-pointer hover:bg-slate-800/80 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <HeartPulse className="w-4 h-4 text-rose-400" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">Health Insurance (Sec 80D)</div>
                        <div className="text-[11px] text-slate-400">Rider mediclaim / family policy</div>
                      </div>
                    </div>
                    <input
                      id="calc-toggle-80d"
                      type="checkbox"
                      checked={hasHealthInsurance}
                      onChange={(e) => setHasHealthInsurance(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 cursor-pointer hover:bg-slate-800/80 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-indigo-400" />
                      <div>
                        <div className="text-xs font-semibold text-slate-200">LIC / Life Insurance / PPF (Sec 80C)</div>
                        <div className="text-[11px] text-slate-400">Personal savings or child policy</div>
                      </div>
                    </div>
                    <input
                      id="calc-toggle-80c"
                      type="checkbox"
                      checked={hasLifeInsurance}
                      onChange={(e) => setHasLifeInsurance(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500"
                    />
                  </label>
                </div>
              </div>

            </div>

            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              💡 <strong>Tax Tip:</strong> Under Section 44ADA Presumptive Taxation, 50% of your earnings ({formatINR(calc.presumptiveExpense)}) are legally recognized as operating expenses.
            </div>
          </div>

          {/* Right: Comparative Outcome Visualizer */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#080D14] border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300">Financial Outcome Comparison</span>
                <span className="text-xs font-mono text-emerald-400">FY 2024-25 / AY 2025-26</span>
              </div>

              {/* Side-by-side comparison boxes */}
              <div className="grid grid-cols-2 gap-4">
                {/* Without Filing */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-red-500/20 text-left space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span>If You Don't File</span>
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-slate-400">
                    ₹0
                  </div>
                  <div className="text-[11px] text-red-300/80 leading-tight">
                    You forfeit <strong className="text-red-300">{formatINR(annualTds)}</strong> TDS permanently to the government.
                  </div>
                </div>

                {/* With Taxly Filing */}
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-left space-y-2 relative shadow-lg shadow-emerald-500/10">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                    <span>With Taxly</span>
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-400 drop-shadow-sm">
                    {formatINR(calc.totalCreditExpected)}
                  </div>
                  <div className="text-[11px] text-emerald-300/90 leading-tight">
                    100% of <strong className="text-white">{formatINR(annualTds)}</strong> TDS returned + ₹{calc.interestOnRefund} interest!
                  </div>
                </div>
              </div>

              {/* Line item breakdown */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Gross Platform Payout:</span>
                  <span className="font-mono text-white">{formatINR(annualGross)}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Sec 44ADA Business Expense Exemption:</span>
                  <span className="font-mono">- {formatINR(calc.presumptiveExpense)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Net Taxable Income:</span>
                  <span className="font-mono text-white">{formatINR(calc.netTaxableIncome)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Income Tax Liability (under 87A Rebate):</span>
                  <span className="font-mono text-emerald-400 font-bold">₹0.00</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex justify-between text-sm font-bold text-white">
                  <span>TDS Deducted (Sec 194-O @ 1%):</span>
                  <span className="font-mono text-emerald-400">{formatINR(annualTds)}</span>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-6 mt-4">
              <button
                id="calc-claim-now-btn"
                onClick={() => onStartFilingWithAmount(calc.totalCreditExpected)}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim My {formatINR(calc.totalCreditExpected)} Refund</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
