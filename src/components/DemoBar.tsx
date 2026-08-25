import React from 'react';
import { ActiveScreen } from '../types';
import { LayoutDashboard, FileText, RefreshCw, Compass, Shield, UserCheck, Layers, ArrowRight } from 'lucide-react';

interface DemoBarProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onResetData: () => void;
  filingStatus: string;
}

export const DemoBar: React.FC<DemoBarProps> = ({
  currentScreen,
  onNavigate,
  onResetData,
  filingStatus,
}) => {
  return (
    <div id="demo-controller-bar" className="sticky top-0 z-50 bg-[#0B111A]/95 backdrop-blur-md border-b border-emerald-500/20 text-xs py-2 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-2 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold tracking-wide uppercase text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Prototype Live Demo
        </span>
        <span className="text-slate-400 hidden sm:inline">| Quick Jump:</span>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 max-w-full">
        <button
          id="demo-nav-landing"
          onClick={() => onNavigate('landing')}
          className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 whitespace-nowrap ${
            currentScreen === 'landing'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Landing
        </button>

        <button
          id="demo-nav-onboarding"
          onClick={() => onNavigate('onboarding')}
          className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 whitespace-nowrap ${
            currentScreen === 'onboarding'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          Onboarding
        </button>

        <button
          id="demo-nav-dashboard"
          onClick={() => onNavigate('dashboard')}
          className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 whitespace-nowrap ${
            currentScreen === 'dashboard'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Dashboard
        </button>

        <button
          id="demo-nav-filing"
          onClick={() => onNavigate('filing')}
          className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 whitespace-nowrap ${
            currentScreen === 'filing'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          ITR Filing
        </button>

        <button
          id="demo-nav-tracker"
          onClick={() => onNavigate('refund_tracker')}
          className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 whitespace-nowrap ${
            currentScreen === 'refund_tracker'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          Refund Tracker
        </button>

        <button
          id="demo-nav-settings"
          onClick={() => onNavigate('settings')}
          className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 whitespace-nowrap ${
            currentScreen === 'settings'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Vault
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          id="demo-reset-state"
          onClick={onResetData}
          title="Reset all demo states back to initial rider profile"
          className="text-slate-400 hover:text-amber-400 px-2 py-1 rounded hover:bg-slate-800/80 transition-colors flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden md:inline">Reset Demo</span>
        </button>
      </div>
    </div>
  );
};
