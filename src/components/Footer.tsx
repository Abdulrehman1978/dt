import React from 'react';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { ActiveScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080E] border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-950 text-base">
                ₹
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Taxly
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Rider FinTech
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India's first automated tax filing and 100% TDS refund recovery engine designed specifically for food delivery and quick-commerce riders.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Income Tax Department Authorized API Partner Spec</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#why-file" className="hover:text-emerald-400 transition-colors">Why File ITR</a></li>
              <li><a href="#tax-calculator" className="hover:text-emerald-400 transition-colors">TDS Calculator</a></li>
              <li><button onClick={() => onNavigate('onboarding')} className="hover:text-emerald-400 transition-colors text-left">Connect Platforms</button></li>
              <li><button onClick={() => onNavigate('filing')} className="hover:text-emerald-400 transition-colors text-left">File ITR-4 Sugam</button></li>
            </ul>
          </div>

          {/* Supported Apps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platforms</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-slate-300">Swiggy Delivery Partner</span></li>
              <li><span className="hover:text-slate-300">Zomato Food Delivery</span></li>
              <li><span className="hover:text-slate-300">Zepto Quick Commerce</span></li>
              <li><span className="hover:text-slate-300">Blinkit Delivery Fleet</span></li>
              <li><span className="hover:text-slate-300">Shadowfax & Uber Moto</span></li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Support & Trust</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ & Helpdesk</a></li>
              <li><span className="hover:text-slate-300">Privacy & 256-bit Security</span></li>
              <li><span className="hover:text-slate-300">Section 44ADA Guidelines</span></li>
              <li><span className="hover:text-slate-300">Terms of Service</span></li>
              <li><span className="hover:text-slate-300">Rider Grievance Redressal</span></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer note */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-500 leading-relaxed">
          <strong className="text-slate-400">Statutory Disclaimer:</strong> Taxly is a financial technology platform built to facilitate Section 44ADA e-filing for unorganized and gig workers under the Indian Income Tax Act, 1961. Income Tax Returns are filed directly through official authorized e-Filing intermediary channels and processed by CPC Bangalore, Income Tax Department, Ministry of Finance, Government of India.
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Taxly Financial Technologies Pvt. Ltd. Crafted with passion for delivery riders across India.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
