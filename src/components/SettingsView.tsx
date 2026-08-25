import React, { useState } from 'react';
import { RiderProfile, DeliveryPlatform, PlatformId } from '../types';
import { PlatformBadge } from './PlatformBadges';
import { 
  User, 
  ShieldCheck, 
  Building2, 
  Download, 
  FileText, 
  CheckCircle2, 
  Bell, 
  CreditCard, 
  Bike, 
  Globe, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface SettingsViewProps {
  riderProfile: RiderProfile;
  platforms: DeliveryPlatform[];
  onTogglePlatform: (id: PlatformId) => void;
  onUpdateProfile: (profile: Partial<RiderProfile>) => void;
  onOpen26AS: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  riderProfile,
  platforms,
  onTogglePlatform,
  onUpdateProfile,
  onOpen26AS,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'vault' | 'platforms' | 'notifications'>('profile');
  const [name, setName] = useState(riderProfile.name);
  const [pan, setPan] = useState(riderProfile.pan);
  const [bankName, setBankName] = useState(riderProfile.bankName);
  const [ifsc, setIfsc] = useState(riderProfile.ifsc);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, pan, bankName, ifsc });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Rider Account & Tax Documents Vault
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your verified PAN, Aadhaar linking, connected delivery fleets, and downloaded ITR acknowledgements.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-850'
          }`}
        >
          Rider KYC & Bank Profile
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'vault'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-850'
          }`}
        >
          Tax Documents Vault
        </button>

        <button
          onClick={() => setActiveTab('platforms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'platforms'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-850'
          }`}
        >
          Delivery Platforms ({platforms.filter((p) => p.connected).length} Linked)
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-850'
          }`}
        >
          WhatsApp & SMS Alerts
        </button>
      </div>

      {/* TAB 1: Profile & KYC */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Assessee Information</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PAN & Aadhaar Linked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">PAN Card Number</label>
              <input
                type="text"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-mono font-bold text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Bank for TDS Refund</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bank IFSC Code</label>
              <input
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Profile details saved successfully!
              </span>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: Documents Vault */}
      {activeTab === 'vault' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Stored Tax & Certificate Files</h3>
            <span className="text-xs text-slate-400">AY 2025-26</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">ITR-4 Sugam Acknowledgement (ITR-V)</div>
                  <div className="text-xs text-slate-400">Official Income Proof for Bike Loans & Bank Finance</div>
                </div>
              </div>
              <button
                onClick={() => alert('Downloading official ITR-V PDF...')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Form 26AS Tax Credit Statement</div>
                  <div className="text-xs text-slate-400">Consolidated Section 194-O TDS from Swiggy & Zomato</div>
                </div>
              </div>
              <button
                onClick={onOpen26AS}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>View 26AS</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Form 16A Certificates (All Platforms)</div>
                  <div className="text-xs text-slate-400">Quarterly TDS Certificates issued by Deductor TANs</div>
                </div>
              </div>
              <button
                onClick={() => alert('Downloading bundled Form 16A ZIP archive...')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download All</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Platforms */}
      {activeTab === 'platforms' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Manage Platform Connections</h3>
            <span className="text-xs text-slate-400">Encrypted OAuth & Token Sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platforms.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <PlatformBadge platform={p.id} size="md" />
                  <div>
                    <div className="text-xs font-bold text-white">{p.name} Partner</div>
                    <div className="text-[11px] text-slate-400 font-mono">{p.riderId}</div>
                  </div>
                </div>

                <button
                  onClick={() => onTogglePlatform(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    p.connected
                      ? 'bg-slate-700 hover:bg-red-500/20 text-slate-300 hover:text-red-400'
                      : 'bg-emerald-500 text-slate-950 font-bold'
                  }`}
                >
                  {p.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Refund Alerts & Reminders</h3>
            <span className="text-xs text-emerald-400 font-semibold">Active for +91 98765 43210</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 cursor-pointer">
              <div>
                <div className="font-bold text-white">WhatsApp CPC Status Alerts</div>
                <div className="text-slate-400">Receive instant WhatsApp alerts when your TDS refund is approved and credited.</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500 rounded" />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 cursor-pointer">
              <div>
                <div className="font-bold text-white">Quarterly TDS Statement Summary</div>
                <div className="text-slate-400">Get notified whenever Swiggy or Zomato deposits new 194-O TDS every quarter.</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500 rounded" />
            </label>
          </div>
        </div>
      )}

    </div>
  );
};
