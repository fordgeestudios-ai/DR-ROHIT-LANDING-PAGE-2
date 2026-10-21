import React from 'react';
import { Video, MapPin, Check, Clock, Building2, ArrowRight } from 'lucide-react';
import { ConsultationType, DoctorScheduleConfig } from '../../types';

interface StepTypeSelectorProps {
  selectedType: ConsultationType;
  onSelectType: (type: ConsultationType) => void;
  config: DoctorScheduleConfig;
  onNext: () => void;
}

export const StepTypeSelector: React.FC<StepTypeSelectorProps> = ({
  selectedType,
  onSelectType,
  config,
  onNext,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-lg mx-auto">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Select Consultation Mode
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Choose between an online video consultation via Google Meet or an in-person clinical visit at Dr. Rohit’s clinic, The Pinhole Clinic (Banashankari, Bengaluru).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 1: Video Consultation */}
        <div
          onClick={() => onSelectType('video')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
            selectedType === 'video'
              ? 'border-blue-900 bg-blue-50/50 shadow-sm ring-1 ring-blue-900/30'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          {selectedType === 'video' && (
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div>
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-950 flex items-center justify-center mb-3">
              <Video className="w-5 h-5" />
            </div>

            <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
              Telehealth · Online
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-0.5">
              Online Video Consultation
            </h4>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Ideal for outstation/international patients, second opinions on MRI, CT, and Doppler scans, and pre-procedure consultation.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span>Encrypted Google Meet room link with screen share</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span>Instant Google Calendar & iCal (.ics) invitation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span>Digital clinical summary & diagnostic roadmap</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Consultation Fee</span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                {config.currency}{config.feeVideo}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">30 Min Slot</span>
          </div>
        </div>

        {/* Option 2: In-Person at The Pinhole Clinic */}
        <div
          onClick={() => onSelectType('in_person')}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
            selectedType === 'in_person'
              ? 'border-blue-900 bg-blue-50/50 shadow-sm ring-1 ring-blue-900/30'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          {selectedType === 'in_person' && (
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          )}

          <div>
            <div className="w-11 h-11 rounded-xl bg-sky-100 text-blue-950 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>

            <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">
              Physical Clinic Visit
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-0.5">
              The Pinhole Clinic Visit
            </h4>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              At Dr. Rohit's own clinic: <strong>The Pinhole Clinic</strong>, Monotype Road, Banashankari 2nd Stage, Bengaluru. Physical exam & duplex review.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span>Hands-on clinical examination by Dr. Rohit</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span>Duplex ultrasound review & clinical staging</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                <span>Daycare pinhole procedure scheduling</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Consultation Fee</span>
              <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                {config.currency}{config.feeInPerson}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">In-Clinic Token</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Choose Date & Timing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
