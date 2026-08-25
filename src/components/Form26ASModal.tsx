import React from 'react';
import { X, ShieldCheck, Download, ExternalLink, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { DeliveryPlatform, RiderProfile } from '../types';
import { formatINR } from '../utils/formatters';

interface Form26ASModalProps {
  isOpen: boolean;
  onClose: () => void;
  platforms: DeliveryPlatform[];
  riderProfile: RiderProfile;
}

export const Form26ASModal: React.FC<Form26ASModalProps> = ({
  isOpen,
  onClose,
  platforms,
  riderProfile,
}) => {
  if (!isOpen) return null;

  const connectedPlatforms = platforms.filter((p) => p.connected);
  const totalGross = connectedPlatforms.reduce((sum, p) => sum + p.defaultEarnings, 0);
  const totalTds = Math.round(totalGross * 0.01);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090E17] border border-slate-700 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Form 26AS & AIS Tax Credit Certificate</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Income Tax Department • Assessment Year: {riderProfile.assessmentYear} (FY {riderProfile.financialYear})
              </p>
            </div>
          </div>

          <button
            onClick={() => alert('Downloading official Form 26AS PDF statement from TRACES...')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download 26AS PDF</span>
          </button>
        </div>

        {/* Taxpayer Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800 my-6">
          <div>
            <div className="text-slate-400">PAN Number:</div>
            <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">{riderProfile.pan}</div>
          </div>
          <div>
            <div className="text-slate-400">Assessee Name:</div>
            <div className="font-bold text-white text-sm mt-0.5">{riderProfile.name}</div>
          </div>
          <div>
            <div className="text-slate-400">Financial Year:</div>
            <div className="font-mono text-white text-sm mt-0.5">{riderProfile.financialYear}</div>
          </div>
          <div>
            <div className="text-slate-400">Status:</div>
            <div className="text-emerald-400 font-bold text-sm mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>TRACES Active</span>
            </div>
          </div>
        </div>

        {/* Section 194-O Deductions Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>PART A: Details of Tax Deducted at Source (Section 194-O / 194-C)</span>
            <span className="text-emerald-400 font-mono">Total Deductions: {connectedPlatforms.length}</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3.5">Deductor (Platform)</th>
                  <th className="py-3 px-3">TAN</th>
                  <th className="py-3 px-3">Section</th>
                  <th className="py-3 px-3 text-right">Total Paid</th>
                  <th className="py-3 px-3 text-right">TDS (1%)</th>
                  <th className="py-3 px-3 text-right">TDS Deposited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
                {connectedPlatforms.map((p) => {
                  const gross = p.defaultEarnings;
                  const tds = Math.round(gross * 0.01);
                  const tan = p.id === 'zomato' ? 'BLRZ09412E' : p.id === 'swiggy' ? 'BLRB19482F' : 'MUMB88492C';
                  return (
                    <tr key={p.id} className="hover:bg-slate-900/40">
                      <td className="py-3 px-3.5 font-sans font-medium text-white flex items-center gap-2">
                        <span>{p.name} Private Limited</span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{tan}</td>
                      <td className="py-3 px-3 text-emerald-400 font-sans">194-O</td>
                      <td className="py-3 px-3 text-right text-white font-bold">{formatINR(gross)}</td>
                      <td className="py-3 px-3 text-right text-emerald-400 font-bold">{formatINR(tds)}</td>
                      <td className="py-3 px-3 text-right text-emerald-400 font-bold">{formatINR(tds)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-900 text-white font-bold border-t border-slate-800">
                <tr>
                  <td colSpan={3} className="py-3 px-3.5 font-sans">Total Tax Deducted at Source</td>
                  <td className="py-3 px-3 text-right text-white font-mono">{formatINR(totalGross)}</td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-mono">{formatINR(totalTds)}</td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-mono">{formatINR(totalTds)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-6 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Full TDS Refund Entitlement Confirmed:</span>{' '}
            Since your net taxable income after Section 44ADA 50% vehicle expenses is below ₹7,00,000, 
            the entire <strong className="text-emerald-400">{formatINR(totalTds)}</strong> is eligible for a 100% tax refund upon filing your ITR.
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
          >
            Close 26AS Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
