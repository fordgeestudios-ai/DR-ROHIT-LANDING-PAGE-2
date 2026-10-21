import React from 'react';
import { Calendar, Lock, LogOut } from 'lucide-react';
import { DoctorScheduleConfig } from '../types';

interface HeaderProps {
  onOpenBooking: (type?: 'video' | 'in_person') => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
  doctorConfig: DoctorScheduleConfig;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onAdminLogout,
  doctorConfig,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Admin Status Strip if Logged In */}
      {isAdminLoggedIn && (
        <div className="bg-blue-950 text-white py-1 px-4 text-xs flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-sky-200">Doctor / Clinic Admin Mode Active</span>
            <span className="text-slate-400 text-[11px]">· Managing timings for {doctorConfig.clinicName}</span>
          </div>
          <button
            onClick={onAdminLogout}
            className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer font-medium"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark with Pinhole Clinic branding */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-950 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-blue-900 transition-colors border border-blue-800/40">
                <span className="text-sky-300 font-mono tracking-tighter">PC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-blue-950 group-hover:text-blue-900 transition-colors whitespace-nowrap">
                  Dr. Rohit Madhurkar
                </span>
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                  The Pinhole Clinic · Bengaluru
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links with Royal Navy styling */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#instagram-videos" className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0">
              Instagram Reels
            </a>
            <a href="#treatments" className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0">
              Treatments
            </a>
            <a href="#pinhole-advantage" className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0">
              Pinhole Advantage
            </a>
            <a href="#doctor-profile" className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0">
              Dr. Rohit Profile
            </a>
            <a href="#reviews" className="hover:text-blue-950 transition-colors whitespace-nowrap shrink-0">
              Outcomes & Reviews
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA for Audience + Discrete Admin Lock icon */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Discrete Clinic Staff Lock Trigger */}
            <button
              onClick={onOpenAdminLogin}
              title="Clinic Coordinator & Doctor Schedule Login"
              className="p-2 text-slate-400 hover:text-blue-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenBooking('video')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-950 hover:bg-blue-900 rounded-xl shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
