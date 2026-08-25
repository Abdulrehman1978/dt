import React, { useState, useEffect } from 'react';
import { X, Smartphone, ArrowRight, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    let interval: any;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setResendTimer(28);
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto move focus to next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleAutoFillOtp = () => {
    setOtp(['8', '8', '4', '2']);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(phone);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-900 to-[#0A0F17] border border-slate-700 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 font-extrabold text-xl shadow-inner">
            ₹
          </div>
          <h3 className="text-xl font-bold text-white">
            {step === 'phone' ? 'Login or Sign Up with Phone' : 'Enter Verification Code'}
          </h3>
          <p className="text-xs text-slate-400">
            {step === 'phone'
              ? 'Enter your mobile number linked to your delivery partner accounts'
              : `We sent a 4-digit OTP to +91 ${phone}`}
          </p>
        </div>

        {/* Phone Step */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mobile Number
              </label>
              <div className="flex rounded-xl bg-slate-800/80 border border-slate-700 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 overflow-hidden">
                <span className="px-3.5 py-3 bg-slate-800 text-slate-300 font-mono text-sm border-r border-slate-700 flex items-center">
                  +91
                </span>
                <input
                  id="auth-phone-input"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full px-3.5 py-3 bg-transparent text-white font-mono text-base focus:outline-none placeholder-slate-500"
                  required
                />
              </div>
            </div>

            <button
              id="auth-send-otp-btn"
              type="submit"
              disabled={isLoading || phone.length < 10}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Sending OTP...</span>
                </div>
              ) : (
                <>
                  <span>Get OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>We never spam or share your contact number</span>
            </div>
          </form>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-center gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-digit-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-14 text-center bg-slate-800/90 border border-slate-700 focus:border-emerald-400 rounded-xl text-xl font-bold font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                  />
                ))}
              </div>

              {/* Demo Helper auto-fill button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer"
                >
                  ⚡ Click to Auto-fill Demo OTP (8842)
                </button>
              </div>
            </div>

            <button
              id="auth-verify-otp-btn"
              type="submit"
              disabled={isLoading || otp.join('').length < 4}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying & Syncing Accounts...</span>
                </div>
              ) : (
                <>
                  <span>Verify & Continue</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="hover:text-slate-200"
              >
                Change Number
              </button>
              <span>
                {resendTimer > 0 ? (
                  `Resend in ${resendTimer}s`
                ) : (
                  <button
                    type="button"
                    onClick={() => setResendTimer(30)}
                    className="text-emerald-400 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
