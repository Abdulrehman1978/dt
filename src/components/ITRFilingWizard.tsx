import React, { useState, useEffect } from 'react';
import { 
  DeliveryPlatform, 
  RiderProfile, 
  FilingState, 
  DeductionItem 
} from '../types';
import { formatINR, calculateGigTax } from '../utils/formatters';
import { PlatformBadge } from './PlatformBadges';
import confetti from 'canvas-confetti';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Building2, 
  FileText, 
  CreditCard, 
  RefreshCw, 
  Lock,
  Smartphone
} from 'lucide-react';

interface ITRFilingWizardProps {
  platforms: DeliveryPlatform[];
  riderProfile: RiderProfile;
  filingState: FilingState;
  onUpdateFilingState: (state: Partial<FilingState>) => void;
  onCompleteFiling: () => void;
  onGoToTracker: () => void;
}

export const ITRFilingWizard: React.FC<ITRFilingWizardProps> = ({
  platforms,
  riderProfile,
  filingState,
  onUpdateFilingState,
  onCompleteFiling,
  onGoToTracker,
}) => {
  const [step, setStep] = useState(filingState.currentStep || 1);
  
  // Step 1: Platform Incomes State
  const connectedPlatforms = platforms.filter((p) => p.connected);
  const [platformIncomes, setPlatformIncomes] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    connectedPlatforms.forEach((p) => {
      map[p.id] = p.defaultEarnings;
    });
    return map;
  });

  // Step 2: Deductions State
  const [deductions, setDeductions] = useState<DeductionItem[]>(filingState.deductions);
  const [selectedRegime, setSelectedRegime] = useState<'new' | 'old'>(filingState.selectedRegime || 'new');
  
  // Step 3: Bank verification penny drop state
  const [pennyDropStatus, setPennyDropStatus] = useState<'verified' | 'verifying'>('verified');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aadhaarOtp, setAadhaarOtp] = useState('8842');
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Computations
  const totalGross: number = (Object.values(platformIncomes) as number[]).reduce(
    (sum: number, val: number) => sum + (Number(val) || 0),
    0
  );
  const totalTds: number = Math.round(totalGross * 0.01);
  
  const totalAdditionalDeductions: number = deductions
    .filter((d) => d.enabled && d.id !== 'sec_44ada')
    .reduce((sum: number, d) => sum + (Number(d.userAmount) || 0), 0);

  const taxResult = calculateGigTax(totalGross, totalTds, totalAdditionalDeductions, selectedRegime);

  // Trigger confetti upon reaching step 4
  useEffect(() => {
    if (step === 4) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#34D399', '#059669', '#38BDF8'],
      });
    }
  }, [step]);

  const handleToggleDeduction = (id: string) => {
    setDeductions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, enabled: !d.enabled } : d))
    );
  };

  const handleUpdateDeductionAmount = (id: string, amount: number) => {
    setDeductions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, userAmount: amount } : d))
    );
  };

  const handleVerifyBankPennyDrop = () => {
    setPennyDropStatus('verifying');
    setTimeout(() => {
      setPennyDropStatus('verified');
    }, 1200);
  };

  const handleFinalSubmitFiling = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowOtpModal(false);
      const ackNo = `ITR4-${Math.floor(100000000000 + Math.random() * 900000000000)}-2025`;
      onUpdateFilingState({
        currentStep: 4,
        filingStatus: 'verified',
        totalGrossIncome: totalGross,
        totalTdsDeducted: totalTds,
        estimatedRefund: taxResult.totalCreditExpected,
        ackNumber: ackNo,
        filingDate: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      });
      setStep(4);
      onCompleteFiling();
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Wizard Step Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>ITR-4 Sugam Filing Wizard • FY 2024-25</span>
          <span className="text-emerald-400 font-mono">
            {step === 1 && 'Step 1: Income Confirmation'}
            {step === 2 && 'Step 2: Deductions & 44ADA'}
            {step === 3 && 'Step 3: Review & e-Verify'}
            {step === 4 && 'Step 4: Filing Success & ITR-V'}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                step >= s
                  ? 'bg-emerald-500 shadow-sm shadow-emerald-500/40'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Income Confirmation */}
      {step === 1 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0F17] border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Step 1: Confirm Delivery Payouts & Tips
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Data auto-pulled from connected platform statements & Form 26AS.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
              Form 26AS Match: 100%
            </span>
          </div>

          <div className="space-y-4">
            {connectedPlatforms.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <PlatformBadge platform={p.id} size="md" />
                  <div>
                    <div className="text-xs text-slate-400">Section 194-O Payout</div>
                    <div className="text-xs text-slate-300 font-mono">TDS Deducted: {formatINR(p.defaultEarnings * 0.01)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <label className="text-[10px] text-slate-400 block">Gross Earnings (₹):</label>
                    <input
                      type="number"
                      value={platformIncomes[p.id] || 0}
                      onChange={(e) =>
                        setPlatformIncomes({
                          ...platformIncomes,
                          [p.id]: Number(e.target.value),
                        })
                      }
                      className="w-32 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-right text-sm font-bold font-mono text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aggregated Totals Box */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <div className="text-slate-400">Total Gross Income (All Platforms):</div>
              <div className="text-xl font-extrabold text-white font-mono mt-0.5">{formatINR(totalGross)}</div>
            </div>
            <div className="sm:text-right">
              <div className="text-slate-400">Total TDS Deducted (194-O):</div>
              <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">{formatINR(totalTds)}</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-slate-400">
              Need to add another app? You can link more in Dashboard.
            </span>

            <button
              id="filing-step1-next-btn"
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Deductions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Deductions & 44ADA Optimization */}
      {step === 2 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0F17] border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Step 2: Section 44ADA & Gig Deductions
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select your eligible business expenses and tax-saving deductions.
              </p>
            </div>

            {/* Live Reactive Refund Counter Badge */}
            <div className="p-2.5 px-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-right">
              <div className="text-[10px] text-emerald-300 font-semibold">Live Refund Estimate:</div>
              <div className="text-lg font-mono font-extrabold text-emerald-400">
                {formatINR(taxResult.totalCreditExpected)}
              </div>
            </div>
          </div>

          {/* Section 44ADA Highlight banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Section 44ADA Presumptive Expense (50%)</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                - {formatINR(totalGross * 0.5)}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              The government automatically deducts 50% of your gross earnings as petrol, bike maintenance, and data pack allowance without requiring any paper bills or receipts.
            </p>
          </div>

          {/* Deduction Items Checklist */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300">Additional Allowable Savings:</label>
            {deductions.map((d) => (
              <div
                key={d.id}
                className={`p-4 rounded-xl border transition-all ${
                  d.enabled
                    ? 'bg-slate-800/70 border-slate-700'
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={d.enabled}
                      onChange={() => handleToggleDeduction(d.id)}
                      className="w-4 h-4 mt-1 rounded text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
                    />
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{d.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {d.section}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {d.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <label className="text-[10px] text-slate-400 block">Claim Amount (₹):</label>
                    <input
                      type="number"
                      disabled={!d.enabled}
                      value={d.userAmount}
                      onChange={(e) => handleUpdateDeductionAmount(d.id, Number(e.target.value))}
                      className="w-28 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-right text-xs font-mono font-bold text-white focus:border-emerald-500 disabled:opacity-40"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Income</span>
            </button>

            <button
              id="filing-step2-next-btn"
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Review Tax & Bank Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Review, Bank Verification & e-Verify */}
      {step === 3 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0F17] border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Step 3: Review ITR Summary & Bank Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Confirm your bank account where CPC Bangalore will deposit your refund.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold font-mono">
              Ready for e-Filing
            </span>
          </div>

          {/* Tax Regime Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Choose Tax Regime:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedRegime('new')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRegime === 'new'
                    ? 'bg-emerald-950/30 border-emerald-500/80 shadow-md'
                    : 'bg-slate-800/40 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">New Tax Regime (Recommended)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    Zero Tax
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Full 100% tax rebate up to ₹7,00,000 under Section 87A. Maximum refund guarantee.
                </p>
              </button>

              <button
                onClick={() => setSelectedRegime('old')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRegime === 'old'
                    ? 'bg-emerald-950/30 border-emerald-500/80 shadow-md'
                    : 'bg-slate-800/40 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">Old Tax Regime</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                    Standard
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Includes Chapter VI-A 80C/80D deductions. Tax rebate up to ₹5,00,000.
                </p>
              </button>
            </div>
          </div>

          {/* Detailed Review Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Gross Delivery Payout (FY 2024-25):</span>
              <span className="font-mono font-bold text-white">{formatINR(totalGross)}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Section 44ADA Deemed Gig Expenses (50%):</span>
              <span className="font-mono">- {formatINR(taxResult.presumptiveExpense)}</span>
            </div>
            {totalAdditionalDeductions > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Other Deductions (80C / 80D):</span>
                <span className="font-mono">- {formatINR(totalAdditionalDeductions)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-300">
              <span>Net Taxable Income:</span>
              <span className="font-mono font-semibold text-white">{formatINR(taxResult.netTaxableIncome)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Income Tax Payable (Rebate under 87A):</span>
              <span className="font-mono text-emerald-400 font-bold">₹0.00</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
              <span>1% TDS Deducted by Platforms:</span>
              <span className="font-mono text-emerald-400">{formatINR(totalTds)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Section 244A Estimated Interest on Refund:</span>
              <span className="font-mono text-slate-300">+ {formatINR(taxResult.interestOnRefund)}</span>
            </div>
            <div className="pt-2 border-t border-slate-700 flex justify-between text-base font-extrabold text-emerald-400">
              <span>Total Refund Credited to You:</span>
              <span className="font-mono text-xl">{formatINR(taxResult.totalCreditExpected)}</span>
            </div>
          </div>

          {/* Refund Destination Bank Account Box */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Verified Refund Bank Account</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                NPCI Pre-Validated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Bank Name:</span>
                <span className="text-white font-bold">{riderProfile.bankName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Account Number:</span>
                <span className="text-white font-bold">{riderProfile.accountNumberMasked}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">IFSC Code:</span>
                <span className="text-white font-bold">{riderProfile.ifsc}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Deductions</span>
            </button>

            <button
              id="filing-step3-everify-trigger"
              onClick={() => setShowOtpModal(true)}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>e-Verify with Aadhaar OTP & Submit</span>
            </button>
          </div>
        </div>
      )}

      {/* Aadhaar e-Verify OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0F17] border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Aadhaar Instant e-Verification</h3>
              <p className="text-xs text-slate-400">
                UIDAI has sent a 6-digit OTP to mobile ending in •••• 3210 (linked to Aadhaar ending {riderProfile.aadhaarLast4})
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-center">
                <input
                  type="text"
                  maxLength={6}
                  value={aadhaarOtp}
                  onChange={(e) => setAadhaarOtp(e.target.value)}
                  className="w-48 text-center bg-slate-800 border border-slate-700 focus:border-emerald-400 rounded-xl text-2xl font-bold font-mono tracking-widest text-white py-2"
                />
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  Demo Auto-fill OTP: <strong className="text-emerald-400">8842</strong>
                </span>
              </div>
            </div>

            <button
              id="modal-submit-itr-btn"
              onClick={handleFinalSubmitFiling}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Submitting to CPC Bangalore e-Filing...</span>
                </div>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & e-File ITR Now</span>
                </>
              )}
            </button>

            <div className="text-center">
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Success & Acknowledgement Card */}
      {step === 4 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-emerald-950/40 border-2 border-emerald-500 shadow-2xl text-center space-y-6">
          
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <Check className="w-9 h-9 stroke-[3]" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs font-mono uppercase">
              ITR-4 Sugam Successfully Filed & e-Verified
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Your ITR is on its way to the Income Tax Department!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your refund of <strong className="text-emerald-400 font-bold font-mono">{formatINR(taxResult.totalCreditExpected)}</strong> is scheduled for processing by CPC Bangalore.
            </p>
          </div>

          {/* Acknowledgement Box */}
          <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-left space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Govt Acknowledgement No:</span>
              <span className="text-emerald-300 font-bold">{filingState.ackNumber || 'ITR4-88492019482-2025'}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Assessee:</span>
              <span className="text-white font-bold font-sans">{riderProfile.name}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>PAN Number:</span>
              <span className="text-white">{riderProfile.pan}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Assessment Year:</span>
              <span className="text-white">{riderProfile.assessmentYear}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Refund Destination:</span>
              <span className="text-emerald-400">{riderProfile.bankName} (•••• 4912)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="filing-download-itrv-btn"
              onClick={() => alert('Downloading official ITR-V Signed Acknowledgement PDF...')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download ITR-V PDF (For Bike Loans)</span>
            </button>

            <button
              id="filing-go-to-tracker-btn"
              onClick={onGoToTracker}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Live Refund Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
