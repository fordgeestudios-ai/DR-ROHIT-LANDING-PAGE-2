import React, { useState } from 'react';
import { Lock, X, ShieldAlert, KeyRound, CheckCircle, ArrowRight } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPin: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  correctPin,
}) => {
  if (!isOpen) return null;

  const [enteredPin, setEnteredPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() === correctPin.trim()) {
      setErrorMsg('');
      onSuccess();
    } else {
      setErrorMsg('Incorrect PIN. Please enter the doctor/clinic administrator PIN (Default: 1234).');
    }
  };

  const handleQuickUnlock = () => {
    setEnteredPin(correctPin);
    setTimeout(() => {
      onSuccess();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-blue-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Clinic Admin Portal</h3>
              <p className="text-[11px] text-sky-200/80">Dr. Rohit & Staff Access Only</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            The Timing & Schedule Manager is restricted to clinic coordinators to update doctor availability, block surgery dates, and view patient reports.
          </p>

          {errorMsg && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Enter Administrator PIN:
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={8}
                autoFocus
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="••••"
                className="w-full text-center tracking-widest text-lg font-mono bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-3 text-slate-900 focus:outline-blue-600"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Unlock Schedule Manager</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Quick Demo Test Access */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Default PIN: <strong className="font-mono text-slate-700">{correctPin}</strong></span>
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="text-blue-700 hover:text-blue-900 font-semibold underline underline-offset-2 cursor-pointer"
            >
              Quick Unlock (1-Click)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
