import React, { useState } from 'react';
import { ShieldCheck, Award, Stethoscope, Sparkles } from 'lucide-react';

interface DoctorImageProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const DoctorImage: React.FC<DoctorImageProps> = ({
  className = '',
  size = 'hero',
}) => {
  const [imageError, setImageError] = useState(false);

  // High quality doctor portrait image link with fallback
  // Unsplash medical doctor portrait URL with no-referrer
  // Real portrait photo of Dr. Rohit Madhurkar uploaded by user
  const primaryImageUrl = '/assets/aistudio/WhatsApp_Image_2026-10-21_at_23.23.02_76c6c69c.jpeg';

  if (size === 'sm') {
    return (
      <div className={`relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-blue-900/30 flex items-center justify-center text-white shrink-0 shadow-xs ${className}`}>
        {!imageError ? (
          <img
            src={primaryImageUrl}
            alt="Dr. Rohit Madhurkar"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-[center_12%]"
          />
        ) : (
          <span className="font-bold text-sm tracking-tight text-blue-900">RM</span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative mx-auto max-w-md w-full ${className}`}>
      {/* Decorative ambient background ring in authentic Royal Navy & Sapphire Blue */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-blue-900 via-sky-600 to-blue-800 rounded-3xl opacity-20 blur-xl pointer-events-none" />

      {/* Main Image Frame */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-blue-900/20 bg-slate-900 shadow-2xl">
        {!imageError ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
            <img
              src={primaryImageUrl}
              alt="Dr. Rohit Madhurkar - Consultant Head Interventional Radiologist"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-[center_12%] transform hover:scale-102 transition-transform duration-500"
            />
            {/* Measured contrast gradient scrim at the bottom per frontend-design */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>
        ) : (
          /* Styled Fallback Container */
          <div className="aspect-[4/5] w-full bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-8 text-center relative">
            <div className="w-28 h-28 rounded-full bg-blue-900/60 border-2 border-sky-400/40 flex items-center justify-center text-sky-200 mb-4 shadow-inner">
              <Stethoscope className="w-14 h-14 stroke-[1.5]" />
            </div>
            <div className="text-xl font-bold text-white tracking-tight">
              Dr. Rohit Madhurkar
            </div>
            <p className="text-xs text-sky-300 font-medium mt-1">
              MBBS · MD · FIR (Interventional Radiology)
            </p>
          </div>
        )}

        {/* Floating Top Trust Badge */}
        <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-white">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider text-sky-300 font-semibold block leading-none">
              Founder & Director
            </span>
            <span className="text-xs font-bold leading-tight">The Pinhole Clinic</span>
          </div>
        </div>

        {/* Floating Experience Badge */}
        <div className="absolute top-4 right-4 bg-blue-900/90 backdrop-blur-md border border-blue-400/30 px-3 py-1.5 rounded-xl shadow-lg text-white text-right">
          <span className="text-xs font-mono font-bold text-sky-200 block leading-none">12+ Years</span>
          <span className="text-[10px] text-blue-200">Clinical Mastery</span>
        </div>

        {/* Bottom Content Card over Scrim */}
        <div className="absolute bottom-0 inset-x-0 p-5 text-white">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Pinhole Specialist</span>
            </span>
            <span className="text-xs text-slate-300">Bengaluru, India</span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            Dr. Rohit Madhurkar
          </h3>

          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            Consultant Head Interventional Radiologist · Past President, ISVIR Karnataka · 12,250+ Pinhole Procedures
          </p>

          <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-lg text-center">
              <span className="font-mono font-bold text-sm text-sky-300 block">12,250+</span>
              <span className="text-[10px] text-slate-300">Minimally Invasive</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-2 rounded-lg text-center">
              <span className="font-bold text-sm text-sky-300 block">0 Incisions</span>
              <span className="text-[10px] text-slate-300">2mm Pinhole Entry</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
