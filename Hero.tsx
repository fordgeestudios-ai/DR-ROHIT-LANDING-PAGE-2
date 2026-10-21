import React from 'react';
import {
  Video,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  FileCheck,
  Stethoscope,
  Building2,
} from 'lucide-react';
import { DoctorScheduleConfig, ConsultationType } from '../types';
import { DoctorImage } from './DoctorImage';

interface HeroProps {
  doctorConfig: DoctorScheduleConfig;
  onBook: (type: ConsultationType) => void;
  onOpenAdminLogin: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  doctorConfig,
  onBook,
  onOpenAdminLogin,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-950/5 via-slate-50 to-white pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-slate-200">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Editorial Trust Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-950 mb-4 tracking-wide uppercase">
          <span>The Pinhole Clinic</span>
          <span aria-hidden="true" className="text-sky-500">·</span>
          <span>Banashankari 2nd Stage, Bengaluru</span>
          <span aria-hidden="true" className="text-sky-500">·</span>
          <span>Minimally Invasive Interventional Radiology</span>
        </div>

        {/* Main Grid: Value Proposition + Doctor Photo + Dual Consultation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (7 cols): Headline, Doctor Profile, Key Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
                Pinhole Medical Treatments.{' '}
                <span className="text-blue-900">Zero Large Cuts.</span>{' '}
                Walk Home Same Day.
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Skip major open surgery. Consult directly with <strong className="font-semibold text-slate-900">Dr. Rohit Madhurkar</strong> at <strong className="font-semibold text-blue-950">The Pinhole Clinic</strong> or online via video for pinhole laser and embolization solutions for <span className="text-slate-900 font-medium">Varicose Veins</span>, <span className="text-slate-900 font-medium">Uterine Fibroids</span>, <span className="text-slate-900 font-medium">Enlarged Prostate</span>, and <span className="text-slate-900 font-medium">Varicocele</span>.
              </p>

              {/* 4 Quantitative Metrics */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-200/80 bg-white/90 backdrop-blur-xs rounded-2xl px-4 shadow-xs">
                <div>
                  <div className="text-2xl font-bold text-blue-950 font-mono tabular-nums">
                    12,250+
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Pinhole Procedures
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-950 font-mono tabular-nums">
                    12+ Years
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Specialist Experience
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-950 font-mono tabular-nums">
                    Past Pres.
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    ISVIR Karnataka
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-sky-700 font-mono tabular-nums">
                    0 Cuts
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    2mm Pinhole Entry
                  </div>
                </div>
              </div>

              {/* 3 Core Trust Signals */}
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0" />
                  <span>Direct 1-on-1 with Dr. Rohit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0" />
                  <span>The Pinhole Clinic, Banashankari</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0" />
                  <span>Google Meet & Calendar Sync</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation CTAs directly in Hero */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                onClick={() => onBook('video')}
                className="p-4 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-sky-300">
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold">Book Video Consult</div>
                    <div className="text-[11px] text-sky-200">Google Meet · {doctorConfig.currency}{doctorConfig.feeVideo}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onBook('in_person')}
                className="p-4 rounded-xl bg-white hover:bg-slate-50 border-2 border-blue-950 text-blue-950 font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-950">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold">In-Person Clinic Visit</div>
                    <div className="text-[11px] text-slate-500">The Pinhole Clinic · {doctorConfig.currency}{doctorConfig.feeInPerson}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-950" />
              </button>
            </div>

            {/* Cancellation Policy Strip */}
            <div className="p-3 bg-emerald-50/90 border border-emerald-200/90 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-950">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                <span className="font-bold">Cancellation Policy:</span>
                <span className="text-emerald-900">100% full refund on cancellation before 4 hours of scheduled slot.</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                Guaranteed
              </span>
            </div>

            {/* Live Clinic Availability Notice */}
            <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between gap-3 text-xs text-blue-950">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                <span className="font-bold">Clinic Status:</span>
                <span className="text-slate-700 line-clamp-1">{doctorConfig.statusCustomNote}</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Doctor Portrait Photo with Credentials */}
          <div className="lg:col-span-5 flex justify-center">
            <DoctorImage size="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};
