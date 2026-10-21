import React from 'react';
import {
  Video,
  Check,
  Building2,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { ConsultationType, DoctorScheduleConfig } from '../types';

interface ConsultationModesSectionProps {
  config: DoctorScheduleConfig;
  onBook: (type: ConsultationType) => void;
}

export const ConsultationModesSection: React.FC<ConsultationModesSectionProps> = ({
  config,
  onBook,
}) => {
  return (
    <section id="consultation-modes" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-blue-900 tracking-wider uppercase mb-2">
            Tailored Patient Consultations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Two High-Conversion Consultation Modes
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Choose whether to consult Dr. Rohit Madhurkar online via encrypted Google Meet from any location, or visit in person at his dedicated clinic in Bengaluru.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Online Video Consultation */}
          <div className="rounded-3xl border-2 border-blue-900/30 bg-blue-50/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-950 text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-xl tracking-wider uppercase">
              Pan-India & Global
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-950 text-white flex items-center justify-center shadow-xs">
                  <Video className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Online Video Consultation
                  </h3>
                  <div className="text-xs text-blue-900 font-semibold">
                    via Secure Google Meet · Live Screen-Share Review
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Direct face-to-face consultation via high-definition Google Meet. Ideal for patients seeking a second opinion before open surgery, or discussing MRI, CT scan, and Doppler reports from home.
              </p>

              <div className="space-y-3 pt-2 border-t border-blue-100">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  What is included:
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <span><strong>Live Screen-Share Scan Analysis:</strong> Dr. Rohit reviews your Doppler ultrasound, MRI, or CT scan films directly with you on screen.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <span><strong>1-Click Google Calendar & Meet Sync:</strong> Immediate invite link sent to your email and WhatsApp with 1-click calendar reservation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <span><strong>Digital Clinical Summary:</strong> Official medical opinion, prescription, and clear non-surgical procedural roadmap.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Consultation Fee</span>
                <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  {config.currency}{config.feeVideo}
                </span>
                <span className="text-xs text-slate-500 ml-1">/ 30 min slot</span>
              </div>

              <button
                onClick={() => onBook('video')}
                className="py-3 px-6 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Video Consult</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: In-Person Consultation at The Pinhole Clinic */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                  <Building2 className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    The Pinhole Clinic Visit
                  </h3>
                  <div className="text-xs text-slate-500 font-semibold">
                    Monotype Road, Banashankari 2nd Stage, Bengaluru
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Consult Dr. Rohit Madhurkar at his dedicated outpatient clinic, <strong>The Pinhole Clinic</strong> in Banashankari. Includes hands-on clinical examination, on-site venous reflux / duplex evaluation, and daycare procedure counseling.
              </p>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  What is included:
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <span><strong>Hands-On Physical Examination:</strong> Clinical palpation and assessment by Dr. Rohit at The Pinhole Clinic.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <span><strong>On-Site Duplex Assessment:</strong> Clinical ultrasound evaluation to locate faulty vein valves or vascular pathology.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <span><strong>Direct Daycare Scheduling:</strong> Scheduling for laser EVLA, fibroid embolization, or prostate PAE.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Consultation Fee</span>
                <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  {config.currency}{config.feeInPerson}
                </span>
                <span className="text-xs text-slate-500 ml-1">/ Clinic visit</span>
              </div>

              <button
                onClick={() => onBook('in_person')}
                className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Clinic Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
