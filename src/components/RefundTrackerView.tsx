import React, { useState } from 'react';
import { RiderProfile, FilingState } from '../types';
import { formatINR } from '../utils/formatters';
import { 
  CheckCircle2, 
  Clock, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Download, 
  ExternalLink,
  HelpCircle,
  Smartphone
} from 'lucide-react';

interface RefundTrackerViewProps {
  riderProfile: RiderProfile;
  filingState: FilingState;
  onNavigateToDashboard: () => void;
}

export const RefundTrackerView: React.FC<RefundTrackerViewProps> = ({
  riderProfile,
  filingState,
  onNavigateToDashboard,
}) => {
  const [activeStage, setActiveStage] = useState<number>(3); // 1 to 5

  const refundAmount = filingState.estimatedRefund || 3950;
  const ackNumber = filingState.ackNumber || 'ITR4-88492019482-2025';

  const stages = [
    {
      id: 1,
      name: 'ITR Filed Online',
      date: '25 Aug 2025',
      time: '11:42 AM',
      status: 'Completed',
      desc: 'ITR-4 Sugam form generated and transmitted via Income Tax e-Filing API.',
      reference: 'API-ACK-99410',
    },
    {
      id: 2,
      name: 'e-Verified via Aadhaar',
      date: '25 Aug 2025',
      time: '11:44 AM',
      status: 'Completed',
      desc: 'Instant UIDAI biometric token verified. Physical signed ITR-V paper copy not required.',
      reference: 'UIDAI-OTP-8842',
    },
    {
      id: 3,
      name: 'Processing at CPC Bangalore',
      date: 'In Progress',
      time: 'Est. 3-7 days',
      status: 'Current',
      desc: 'Automated Centralized Processing Center (CPC) Bangalore system is validating Section 194-O TDS credits with Form 26AS.',
      reference: 'CPC-BLR-BATCH-902',
    },
    {
      id: 4,
      name: 'Refund Approved (Sec 143(1))',
      date: 'Expected 02 Sep 2025',
      time: 'Automated',
      status: 'Upcoming',
      desc: 'Intimation order under Section 143(1) will be issued confirming zero tax liability and full refund approval.',
      reference: 'Pending ITD Approval',
    },
    {
      id: 5,
      name: 'Refund Credited to Bank Account',
      date: 'Expected 05 Sep 2025',
      time: 'Direct NECS / RTGS',
      status: 'Upcoming',
      desc: `State Bank of India (A/c ending •••• 4912) will receive direct credit of ${formatINR(refundAmount)} via SBI Refund Banker.`,
      reference: 'RTGS / NECS Token',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live CPC Tracker Active
            </span>
            <span className="text-xs text-slate-400 font-mono">AY {riderProfile.assessmentYear}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            TDS Refund Claim of {formatINR(refundAmount)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Assessee: <strong className="text-white">{riderProfile.name}</strong> • PAN: <strong className="text-emerald-400 font-mono">{riderProfile.pan}</strong>
          </p>
        </div>

        {/* Demo Stage Switcher */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5 w-full sm:w-auto">
          <div className="text-[11px] text-slate-400 font-semibold">Demo Stage Simulator:</div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setActiveStage(s)}
                className={`px-2.5 py-1 rounded font-mono font-bold transition-all ${
                  activeStage === s
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Stage {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Timeline Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Income Tax Department CPC Processing Timeline</h3>
            <p className="text-xs text-slate-400">Acknowledgement No: <strong className="text-emerald-400 font-mono">{ackNumber}</strong></p>
          </div>
          <button
            onClick={() => alert('Sending SMS alert update to +91 98765 43210...')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Enable WhatsApp Alerts</span>
          </button>
        </div>

        {/* Vertical Stepper List */}
        <div className="space-y-6 relative before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
          {stages.map((st) => {
            const isCompleted = st.id < activeStage;
            const isCurrent = st.id === activeStage;
            const isUpcoming = st.id > activeStage;

            return (
              <div key={st.id} className="relative flex items-start gap-5 pl-2">
                {/* Node Icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : isCurrent
                      ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 ring-4 ring-emerald-500/10 animate-pulse'
                      : 'bg-slate-800 border border-slate-700 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : st.id}
                </div>

                {/* Content Box */}
                <div
                  className={`flex-1 p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-slate-800/80 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                      : 'bg-slate-900/50 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${isUpcoming ? 'text-slate-400' : 'text-white'}`}>
                        {st.name}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold uppercase">
                          Active Stage
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-slate-400">{st.date} • {st.time}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                    {st.desc}
                  </p>

                  <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                    <span>Reference:</span>
                    <span className="text-slate-300">{st.reference}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bank Credit Detail Footer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white">Direct Credit Destination:</div>
              <div className="text-slate-400">{riderProfile.bankName} (A/c •••• 4912) • IFSC: {riderProfile.ifsc}</div>
            </div>
          </div>

          <button
            onClick={onNavigateToDashboard}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>

      </div>

    </div>
  );
};
