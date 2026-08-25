import React, { useState, useEffect } from 'react';
import { DeliveryPlatform, RiderProfile, PlatformId } from '../types';
import { PlatformBadge } from './PlatformBadges';
import { formatINR } from '../utils/formatters';
import { 
  User, 
  MapPin, 
  Bike, 
  Check, 
  ArrowRight, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface OnboardingWizardProps {
  platforms: DeliveryPlatform[];
  onTogglePlatformConnect: (id: PlatformId) => void;
  riderProfile: RiderProfile;
  onUpdateProfile: (profile: Partial<RiderProfile>) => void;
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  platforms,
  onTogglePlatformConnect,
  riderProfile,
  onUpdateProfile,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [connectingMap, setConnectingMap] = useState<Record<string, boolean>>({});
  
  // Step 1 Form state
  const [name, setName] = useState(riderProfile.name);
  const [city, setCity] = useState(riderProfile.city);
  const [vehicle, setVehicle] = useState<'bike' | 'ev_scooter' | 'cycle'>(riderProfile.primaryVehicle);

  // Step 3 Sync progress state
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatusText, setSyncStatusText] = useState('Connecting to GSTN & Income Tax Portal...');
  const [syncDone, setSyncDone] = useState(false);

  // Handle mock platform connect delay
  const handleConnectClick = (platformId: PlatformId) => {
    setConnectingMap((prev) => ({ ...prev, [platformId]: true }));
    setTimeout(() => {
      onTogglePlatformConnect(platformId);
      setConnectingMap((prev) => ({ ...prev, [platformId]: false }));
    }, 1100);
  };

  // Step 3 Auto-progress timer
  useEffect(() => {
    if (currentStep === 3) {
      setSyncProgress(0);
      setSyncDone(false);
      
      const interval = setInterval(() => {
        setSyncProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setSyncDone(true);
            return 100;
          }
          if (prev === 20) setSyncStatusText('Fetching Form 26AS & AIS tax credits from Income Tax e-Filing...');
          if (prev === 55) setSyncStatusText('Reconciling Section 194-O TDS deductions with Zomato & Swiggy TANs...');
          if (prev === 85) setSyncStatusText('Calculating Section 44ADA 50% vehicle expense exemption...');
          return prev + 5;
        });
      }, 120);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const connectedCount = platforms.filter((p) => p.connected).length;
  const totalEarnings = platforms
    .filter((p) => p.connected)
    .reduce((sum, p) => sum + p.defaultEarnings, 0);
  const totalTds = Math.round(totalEarnings * 0.01);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, city, primaryVehicle: vehicle });
    setCurrentStep(2);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Wizard Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>Step {currentStep} of 4</span>
          <span className="text-emerald-400 font-mono">
            {currentStep === 1 && 'Rider Details'}
            {currentStep === 2 && 'Connect Delivery Apps'}
            {currentStep === 3 && 'Syncing Tax Credits'}
            {currentStep === 4 && 'Refund Summary'}
          </span>
        </div>

        {/* Multi-step progress bar */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`h-2 rounded-full transition-all ${
                currentStep >= stepNum
                  ? 'bg-emerald-500 shadow-sm shadow-emerald-500/40'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Basic Details */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0F17] border border-slate-800 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Let's set up your Rider Profile</h2>
            <p className="text-sm text-slate-400">
              This helps us accurately categorize your vehicle deductions and PAN records.
            </p>
          </div>

          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name (as per PAN Card)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Operating Hub / City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                    required
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Primary Delivery Vehicle
                </label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:border-emerald-500 focus:outline-none"
                >
                  <option value="bike">Petrol Motorcycle / Scooter</option>
                  <option value="ev_scooter">Electric Vehicle (EV)</option>
                  <option value="cycle">Bicycle / E-cycle</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Automatic Section 44ADA Optimization Enabled</span>
              </div>
              <p className="text-[11px] text-slate-400">
                50% of your gross earnings will be automatically claimed as fuel and vehicle maintenance allowance.
              </p>
            </div>

            <button
              id="onboarding-step1-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Connect Apps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: Connect Platforms */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0F17] border border-slate-800 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">Connect Your Delivery Platforms</h2>
            <p className="text-sm text-slate-400">
              Link the apps you ride for to auto-pull your TDS deductions and weekly earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platforms.map((p) => {
              const isConnecting = connectingMap[p.id];
              return (
                <div
                  key={p.id}
                  id={`onboarding-platform-${p.id}`}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    p.connected
                      ? 'bg-slate-900 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <PlatformBadge platform={p.id} size="md" />
                    {p.connected && (
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Connected
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-xs text-slate-400 mb-4">
                    <div className="flex justify-between">
                      <span>Rider ID:</span>
                      <span className="font-mono text-slate-300">{p.riderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. FY Payout:</span>
                      <span className="font-mono text-white font-semibold">{formatINR(p.defaultEarnings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TDS Deducted (1%):</span>
                      <span className="font-mono text-emerald-400 font-bold">{formatINR(p.defaultEarnings * 0.01)}</span>
                    </div>
                  </div>

                  <button
                    id={`onboarding-btn-connect-${p.id}`}
                    onClick={() => handleConnectClick(p.id)}
                    disabled={isConnecting}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      p.connected
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
                    }`}
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying Token...</span>
                      </>
                    ) : p.connected ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Linked (Click to Disconnect)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Connect {p.name}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Back
            </button>

            <button
              id="onboarding-step2-next"
              onClick={() => setCurrentStep(3)}
              disabled={connectedCount === 0}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Sync Tax Records ({connectedCount} Connected)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Data Sync Animation */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0F17] border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
            {syncDone ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            ) : (
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              {syncDone ? 'Tax Records Successfully Reconciled!' : 'Fetching 26AS & Platform Earnings...'}
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {syncStatusText}
            </p>
          </div>

          {/* Sync Progress Bar */}
          <div className="space-y-2 max-w-md mx-auto">
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-150"
                style={{ width: `${syncProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>{syncProgress}% Synchronized</span>
              <span>Income Tax Dept AIS / 26AS</span>
            </div>
          </div>

          {/* Scanned Data Stream Cards */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left text-xs">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
              <div className="text-slate-400">Total Gross Income:</div>
              <div className="font-mono text-base font-bold text-white mt-0.5">{formatINR(totalEarnings)}</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <div className="text-emerald-300">TDS Ready to Refund:</div>
              <div className="font-mono text-base font-bold text-emerald-400 mt-0.5">{formatINR(totalTds)}</div>
            </div>
          </div>

          <div className="pt-4">
            <button
              id="onboarding-step3-continue"
              disabled={!syncDone}
              onClick={() => setCurrentStep(4)}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold text-sm shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>View Sync Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Summary & Dashboard Confirmation */}
      {currentStep === 4 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-emerald-950/40 border-2 border-emerald-500/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assessment Ready for FY 2024-25</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Great news, {name.split(' ')[0]}!
            </h2>
            <p className="text-sm text-slate-300">
              We found <strong className="text-emerald-400 font-bold">{formatINR(totalTds)}</strong> in TDS deductions that can be directly credited back to your bank account.
            </p>
          </div>

          {/* Refund Highlight Card */}
          <div className="p-6 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-center space-y-2">
            <div className="text-xs text-slate-400 font-medium">Total Claimable TDS Refund:</div>
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono tracking-tight drop-shadow-sm">
              {formatINR(totalTds)}
            </div>
            <div className="text-xs text-slate-400 flex items-center justify-center gap-2 pt-1">
              <span>Platforms: <strong>{connectedCount} Connected</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Zero Income Tax Due</span>
            </div>
          </div>

          {/* Summary Breakdown List */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Gross Payout (FY 2024-25):</span>
              <span className="font-mono text-white font-semibold">{formatINR(totalEarnings)}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Sec 44ADA Fuel & Bike Expense Exemption (50%):</span>
              <span className="font-mono">- {formatINR(totalEarnings * 0.5)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Taxable Net Income:</span>
              <span className="font-mono text-white">{formatINR(totalEarnings * 0.5)}</span>
            </div>
            <div className="flex justify-between text-slate-300 font-bold">
              <span>Final Tax Payable (under Sec 87A rebate):</span>
              <span className="font-mono text-emerald-400">₹0 (Zero)</span>
            </div>
          </div>

          <button
            id="onboarding-enter-dashboard-btn"
            onClick={onComplete}
            className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Go to My Tax Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
};
