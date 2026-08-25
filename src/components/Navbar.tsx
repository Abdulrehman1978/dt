import React, { useState } from 'react';
import { ActiveScreen } from '../types';
import { ShieldCheck, ArrowRight, User, Globe, Menu, X, Sparkles, LogOut, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenAuth,
  isLoggedIn,
  onLogout,
  userName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'EN' | 'HI' | 'KN'>('EN');

  const navLinks = [
    { label: 'How It Works', targetId: 'how-it-works' },
    { label: 'Why File ITR', targetId: 'why-file' },
    { label: 'TDS Calculator', targetId: 'tax-calculator' },
    { label: 'Pricing', targetId: 'pricing' },
    { label: 'FAQ', targetId: 'faq' },
  ];

  const handleScrollTo = (targetId: string) => {
    if (currentScreen !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-[37px] z-40 w-full bg-[#080D14]/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="taxly-brand-logo"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1px] shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0B111A] rounded-[11px] flex items-center justify-center">
              <span className="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                ₹
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Taxly
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Riders
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              100% TDS Refund for Gig Delivery
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => (
            <button
              key={item.targetId}
              id={`nav-link-${item.targetId}`}
              onClick={() => handleScrollTo(item.targetId)}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs text-slate-300">
            <Globe className="w-3.5 h-3.5 ml-2 mr-1 text-slate-400" />
            <button
              onClick={() => setCurrentLang('EN')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLang === 'EN' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLang('HI')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLang === 'HI' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setCurrentLang('KN')}
              className={`px-2 py-1 rounded transition-colors ${
                currentLang === 'KN' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                id="nav-go-dashboard"
                onClick={() => onNavigate('dashboard')}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  {userName.charAt(0)}
                </div>
                <span>Dashboard</span>
              </button>

              <button
                id="nav-start-filing-btn"
                onClick={() => onNavigate('filing')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
              >
                <span>File ITR Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                id="nav-login-btn"
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer"
              >
                Login
              </button>

              <button
                id="nav-signup-cta"
                onClick={onOpenAuth}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Claim TDS Refund Free</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {isLoggedIn ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              Claim TDS
            </button>
          )}

          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B111A] border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <button
                key={item.targetId}
                onClick={() => handleScrollTo(item.targetId)}
                className="text-left py-2 text-sm font-medium text-slate-300 hover:text-emerald-400"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Language:</span>
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => setCurrentLang('EN')}
                className={`px-2 py-1 rounded ${currentLang === 'EN' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLang('HI')}
                className={`px-2 py-1 rounded ${currentLang === 'HI' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setCurrentLang('KN')}
                className={`px-2 py-1 rounded ${currentLang === 'KN' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
