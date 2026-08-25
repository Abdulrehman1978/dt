import React, { useState } from 'react';
import { 
  DeliveryPlatform, 
  RiderProfile, 
  FilingState, 
  PlatformId 
} from '../types';
import { MOCK_MONTHLY_EARNINGS } from '../data/mockData';
import { formatINR } from '../utils/formatters';
import { PlatformBadge } from './PlatformBadges';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  IndianRupee, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileSpreadsheet, 
  Bike, 
  Share2, 
  Download, 
  Clock, 
  Plus, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface DashboardViewProps {
  platforms: DeliveryPlatform[];
  onTogglePlatformConnect: (id: PlatformId) => void;
  riderProfile: RiderProfile;
  filingState: FilingState;
  onStartFiling: () => void;
  onOpen26AS: () => void;
  onNavigateToTracker: () => void;
  onNavigateToSettings: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  platforms,
  onTogglePlatformConnect,
  riderProfile,
  filingState,
  onStartFiling,
  onOpen26AS,
  onNavigateToTracker,
  onNavigateToSettings,
}) => {
  const [selectedChartMetric, setSelectedChartMetric] = useState<'earnings' | 'tds'>('earnings');
  const [copiedReferral, setCopiedReferral] = useState(false);

  const connectedPlatforms = platforms.filter((p) => p.connected);
  const totalGrossIncome = connectedPlatforms.reduce((sum, p) => sum + p.defaultEarnings, 0);
  const totalTdsDeducted = Math.round(totalGrossIncome * 0.01);
  const totalRefundAmount = filingState.estimatedRefund || totalTdsDeducted;

  const handleShareReferral = () => {
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const getStatusBadge = () => {
    switch (filingState.filingStatus) {
      case 'filed':
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ITR-4 e-Verified
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Processing at CPC Bangalore
          </span>
        );
      case 'refund_credited':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Refund Credited
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Ready to File (FY 24-25)
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Greeting & Alert Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome, {riderProfile.name}
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono hidden md:inline">
              PAN: {riderProfile.pan}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {riderProfile.city} • Linked Hub Account • Assessment Year: {riderProfile.assessmentYear}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {getStatusBadge()}
          <button
            id="dash-view-26as-btn"
            onClick={onOpen26AS}
            className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>View Form 26AS</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Gross Earnings */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Earnings (FY 2024-25)</span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {formatINR(totalGrossIncome)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Across {connectedPlatforms.length} connected platforms
            </div>
          </div>
        </div>

        {/* Card 2: Estimated TDS Deducted */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>TDS Deducted (Sec 194-O)</span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
              <IndianRupee className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {formatINR(totalTdsDeducted)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Deposited with Income Tax Dept</span>
            </div>
          </div>
        </div>

        {/* Card 3: Estimated 100% TDS Refund (Highlight Card) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border-2 border-emerald-500/50 shadow-xl shadow-emerald-500/10 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Claimable TDS Refund
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-bold">
              100% Back
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
              {formatINR(totalRefundAmount)}
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Direct credit to <span className="text-white font-semibold">{riderProfile.bankName.split(' ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Action Status / Next Step */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Filing Deadline (AY 25-26)</span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          {filingState.filingStatus === 'not_started' || filingState.filingStatus === 'draft' ? (
            <button
              id="dash-kpi-file-btn"
              onClick={onStartFiling}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>File ITR Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id="dash-kpi-track-btn"
              onClick={onNavigateToTracker}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Track Refund Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Main Action Banner if Not Filed */}
      {filingState.filingStatus === 'not_started' && (
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 44ADA Optimization Ready</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Claim your {formatINR(totalRefundAmount)} refund into {riderProfile.bankName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We have pre-filled your Form 26AS data. Review your 50% vehicle fuel deduction and e-verify with Aadhaar in 3 minutes.
            </p>
          </div>

          <button
            id="dash-hero-start-filing-btn"
            onClick={onStartFiling}
            className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/30 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>Start 1-Click ITR Filing</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>
        </div>
      )}

      {/* Connected Delivery Platforms Strip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Connected Platforms & Statements</h3>
            <p className="text-xs text-slate-400">Manage connected delivery accounts and individual earnings sync</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {connectedPlatforms.length} of {platforms.length} Apps Linked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((p) => {
            const isConnected = p.connected;
            const platformTds = Math.round(p.defaultEarnings * 0.01);
            return (
              <div
                key={p.id}
                id={`platform-card-${p.id}`}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isConnected
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-900/30 border-dashed border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <PlatformBadge platform={p.id} size="md" />
                    {isConnected ? (
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Active Sync
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">Not Linked</span>
                    )}
                  </div>

                  {isConnected ? (
                    <div className="space-y-2 text-xs pt-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Total FY Payout:</span>
                        <span className="font-mono text-white font-bold">{formatINR(p.defaultEarnings)}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>1% TDS Deducted:</span>
                        <span className="font-mono text-emerald-400 font-semibold">{formatINR(platformTds)}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Orders Delivered:</span>
                        <span className="font-mono text-slate-300">{p.orderCount.toLocaleString('en-IN')} trips</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 text-xs text-slate-400">
                      Link your registered {p.name} rider number to automatically import TDS credits.
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    id={`dash-toggle-platform-${p.id}`}
                    onClick={() => onTogglePlatformConnect(p.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      isConnected
                        ? 'text-slate-400 hover:text-red-400 hover:bg-slate-800'
                        : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                    }`}
                  >
                    {isConnected ? 'Disconnect' : `+ Connect ${p.name}`}
                  </button>

                  {isConnected && (
                    <button
                      onClick={() => alert(`Downloading Form 16A TDS certificate for ${p.name}...`)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      title="Download platform certificate"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Form 16A</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Earnings & TDS Visualizer (Recharts) */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Monthly Earnings & TDS Trend</h3>
            <p className="text-xs text-slate-400">Financial Year 2024-25 (April 2024 – March 2025)</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setSelectedChartMetric('earnings')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedChartMetric === 'earnings' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              Monthly Earnings (₹)
            </button>
            <button
              onClick={() => setSelectedChartMetric('tds')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedChartMetric === 'tds' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'
              }`}
            >
              TDS Deductions (₹)
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-64 sm:h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_MONTHLY_EARNINGS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#F8FAFC',
                }}
                formatter={(value: any) => [formatINR(Number(value)), selectedChartMetric === 'earnings' ? 'Total Earnings' : '1% TDS']}
              />
              <Bar
                dataKey={selectedChartMetric === 'earnings' ? 'total' : 'tds'}
                fill={selectedChartMetric === 'earnings' ? '#10B981' : '#F59E0B'}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-slate-800 text-center">
          <div>
            <div className="text-slate-400">Peak Month:</div>
            <div className="font-bold text-white font-mono mt-0.5">October (Diwali - ₹47,700)</div>
          </div>
          <div>
            <div className="text-slate-400">Avg Monthly Pay:</div>
            <div className="font-bold text-white font-mono mt-0.5">₹32,916 / mo</div>
          </div>
          <div>
            <div className="text-slate-400">Total TDS Deducted:</div>
            <div className="font-bold text-emerald-400 font-mono mt-0.5">{formatINR(totalTdsDeducted)}</div>
          </div>
          <div>
            <div className="text-slate-400">Presumptive Business Tax:</div>
            <div className="font-bold text-emerald-400 font-mono mt-0.5">₹0.00 (Zero)</div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Quick Financial Tools & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Box 1: Bike Loan Pre-qualification Certificate */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Bike className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Bike & EV Loan Certificate</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use your verified ITR-V to unlock instant ₹80,000–₹1,50,000 bike finance with TVS Credit, Bajaj Finserv or SBI at low EMIs.
            </p>
          </div>
          <button
            onClick={() => alert('ITR-V income certificate generated for loan applications!')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-teal-300 border border-teal-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Download Loan Certificate</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Box 2: Refer a Fellow Rider & Earn ₹100 */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Share2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Refer a Rider, Earn ₹100</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Help your fellow Swiggy/Zomato riders claim their TDS refund. You earn ₹100 cash directly in UPI for every friend who files.
            </p>
          </div>
          <button
            onClick={handleShareReferral}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 border border-amber-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedReferral ? 'Referral Link Copied!' : 'Share Referral via WhatsApp'}</span>
          </button>
        </div>

        {/* Box 3: Document Vault */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Tax Documents Vault</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Securely store and access your PAN card, Form 16A, Form 26AS, and Govt ITR-V acknowledgements anytime.
            </p>
          </div>
          <button
            onClick={onNavigateToSettings}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 border border-indigo-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open Vault & Settings</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
