import React from 'react';
import { ShieldCheck, Check, X, ArrowRight } from 'lucide-react';
import { ConsultationType } from '../types';

interface PinholeAdvantageProps {
  onBook: (type: ConsultationType) => void;
}

export const PinholeAdvantage: React.FC<PinholeAdvantageProps> = ({ onBook }) => {
  const comparisonRows = [
    {
      feature: 'Incision & Wound Size',
      pinhole: '1–2 mm tiny needle puncture (no scalpel cut)',
      openSurgery: '10–20 cm large surgical incision with scalpel',
      isBetter: true,
    },
    {
      feature: 'Anesthesia Required',
      pinhole: 'Local anesthesia / mild conscious sedation (fully awake)',
      openSurgery: 'General anesthesia with breathing intubation',
      isBetter: true,
    },
    {
      feature: 'Hospitalization & Stay',
      pinhole: 'Same-day daycare discharge (walk home in 4–6 hours)',
      openSurgery: '3–6 days mandatory hospital room admission',
      isBetter: true,
    },
    {
      feature: 'Return to Normal Work',
      pinhole: '24–48 hours (virtually immediate recovery)',
      openSurgery: '4–6 weeks painful bedrest & wound healing',
      isBetter: true,
    },
    {
      feature: 'Post-Procedure Scarring',
      pinhole: 'Zero visible surgical scars (covered with a simple band-aid)',
      openSurgery: 'Prominent, permanent lifelong surgical scars',
      isBetter: true,
    },
    {
      feature: 'Target Organ Preservation',
      pinhole: '100% Organ Preserved (e.g. Uterus, Prostate intact)',
      openSurgery: 'Often requires organ removal (e.g. Hysterectomy)',
      isBetter: true,
    },
    {
      feature: 'Blood Loss & Infection Risk',
      pinhole: 'Negligible blood loss, minimal risk of wound sepsis',
      openSurgery: 'Significant blood loss, wound infection concerns',
      isBetter: true,
    },
  ];

  return (
    <section id="pinhole-advantage" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-blue-900 tracking-wider uppercase mb-2">
            The Modern Standard of Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Why Patients Choose Pinhole Interventional Radiology over Open Surgery
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            By utilizing high-resolution fluoroscopy, ultrasound, and micron-sized microcatheters at The Pinhole Clinic, Dr. Rohit Madhurkar cures vascular and organ pathologies without the trauma of open surgery.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[680px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="grid grid-cols-12 bg-blue-950 text-white text-xs font-bold uppercase tracking-wider py-4 px-6">
              <div className="col-span-4 text-slate-300">Clinical Aspect</div>
              <div className="col-span-4 text-sky-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Dr. Rohit’s Pinhole Approach</span>
              </div>
              <div className="col-span-4 text-slate-400">Traditional Open Surgery</div>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 py-4 px-6 items-center ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                >
                  <div className="col-span-4 font-semibold text-slate-900 pr-4">
                    {row.feature}
                  </div>

                  <div className="col-span-4 pr-4">
                    <div className="flex items-start gap-2 text-blue-950 font-medium bg-blue-50/80 p-2 rounded-lg border border-blue-200/60">
                      <Check className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                      <span>{row.pinhole}</span>
                    </div>
                  </div>

                  <div className="col-span-4 text-slate-500 pl-2 flex items-start gap-2">
                    <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{row.openSurgery}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Told you need open surgery? Get a second opinion first.
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-sky-100/80 leading-relaxed">
              Many conditions diagnosed for open surgery can be cured with a 30-minute daycare pinhole procedure. Share your scans with Dr. Rohit for an honest evaluation.
            </p>
          </div>

          <button
            onClick={() => onBook('video')}
            className="px-6 py-3.5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-sm rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Book Scan Review Video Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
