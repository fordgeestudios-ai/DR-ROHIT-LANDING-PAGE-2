import React from 'react';
import { MapPin, Phone, Mail, Lock, Building2 } from 'lucide-react';
import { DoctorScheduleConfig } from '../types';

interface FooterProps {
  onOpenAdminLogin: () => void;
  onOpenBooking: () => void;
  doctorConfig: DoctorScheduleConfig;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdminLogin,
  onOpenBooking,
  doctorConfig,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Wordmark & Bio */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-sky-300 font-bold flex items-center justify-center text-sm border border-blue-700/50">
                PC
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight block">
                  Dr. Rohit Madhurkar
                </span>
                <span className="text-[11px] text-sky-400 font-medium">The Pinhole Clinic</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Founder & Director of The Pinhole Clinic, Bengaluru · Consultant Head Interventional Radiologist. Pioneering non-surgical pinhole laser and embolization therapies with zero large incisions.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-300 transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-slate-900 border border-slate-800"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Clinic Coordinator & Doctor Portal Login</span>
              </button>
            </div>
          </div>

          {/* Col 2: The Pinhole Clinic Location */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>The Pinhole Clinic (Bangalore)</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                {doctorConfig.clinicAddress}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 pl-6">
              Landmark: {doctorConfig.clinicLandmark}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{doctorConfig.clinicPhone} (Appointment Desk)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{doctorConfig.clinicEmail}</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#instagram-videos" className="hover:text-white transition-colors">
                  Educational Instagram Reels
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white transition-colors">
                  Treatments (Varicose Veins, Fibroids, Prostate)
                </a>
              </li>
              <li>
                <a href="#pinhole-advantage" className="hover:text-white transition-colors">
                  Why Pinhole over Open Surgery
                </a>
              </li>
              <li>
                <a href="#doctor-profile" className="hover:text-white transition-colors">
                  Dr. Rohit Madhurkar Credentials
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                >
                  Book Consultation Now
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Dr. Rohit Madhurkar · The Pinhole Clinic. In-person consultations take place at The Pinhole Clinic, Monotype Road, Banashankari 2nd Stage, Bengaluru. In severe medical emergencies, please visit the nearest emergency casualty immediately.
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span>drrohitm.com</span>
            <span>·</span>
            <span>pinholeir.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
