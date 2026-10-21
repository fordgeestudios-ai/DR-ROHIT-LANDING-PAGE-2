import React from 'react';
import { Award, Building2, ShieldCheck, GraduationCap, MapPin } from 'lucide-react';
import { ConsultationType } from '../types';
import { DoctorImage } from './DoctorImage';

interface DoctorCredentialsProps {
  onBook: (type: ConsultationType) => void;
}

export const DoctorCredentials: React.FC<DoctorCredentialsProps> = ({ onBook }) => {
  return (
    <section id="doctor-profile" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Doctor Portrait Photo */}
          <div className="lg:col-span-5">
            <DoctorImage size="hero" />
          </div>

          {/* Right Column: Bio, Philosophy & Institutional Pedigree */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-bold text-blue-900 tracking-wider uppercase mb-2">
                Clinical Mastery & Academic Pedigree
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                Dr. Rohit Madhurkar
              </h2>
              <p className="text-sm font-semibold text-blue-900 mt-1">
                MBBS · MD (RadioDiagnosis) · FIR (Fellowship in Interventional Radiology)
              </p>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Dr. Rohit Madhurkar is the Founder & Director of <strong>The Pinhole Clinic</strong> in Bengaluru. He has pioneered minimally invasive image-guided catheter treatments for over a decade, completing more than 12,250 successful procedures.
              </p>
            </div>

            {/* Credential Points */}
            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <span>
                  <strong>Founder & Lead Specialist:</strong> The Pinhole Clinic, Dedicated Outpatient Center for Scarless Treatments, Banashankari 2nd Stage, Bengaluru.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-slate-200">
                <Building2 className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <span>
                  <strong>Lead Consultant:</strong> Interventional Radiology, Apollo Hospitals Bannerghatta Road, Bengaluru.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-slate-200">
                <Award className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <span>
                  <strong>Past President:</strong> Indian Society of Vascular & Interventional Radiology (ISVIR) Karnataka Chapter.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-slate-200">
                <GraduationCap className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <span>
                  <strong>International Award:</strong> Best International Paper Award at the World Cancer Congress for liver cancer transcatheter pinhole therapy.
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onBook('video')}
                className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Book Video Consultation (₹1,000)
              </button>
              <button
                onClick={() => onBook('in_person')}
                className="px-6 py-3 bg-white hover:bg-slate-50 border-2 border-blue-950 text-blue-950 font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Visit The Pinhole Clinic (₹1,500)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
