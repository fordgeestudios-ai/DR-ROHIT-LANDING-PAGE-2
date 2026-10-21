import React from 'react';
import { Star, CheckCircle, Quote, ExternalLink, ShieldCheck } from 'lucide-react';

export const PatientReviews: React.FC = () => {
  const genuinePractoReviews = [
    {
      author: 'Verified Patient (Son of Patient)',
      date: 'Practo Verified Story',
      condition: 'Prostate Artery Embolization (PAE) & Liver RadioEmbolization (TARE)',
      outcome: 'Nocturia resolved, non-surgical catheter procedure succeeded with zero incisions.',
      quote: 'I am immensely grateful to Dr. Rohit Madhurkar for his patience and cooperation during complex pinhole procedures like RadioEmbolization and PAE for my father. He took the time to explain every single detail to our family with utmost clarity and empathy.',
    },
    {
      author: 'Verified Patient',
      date: 'Practo Verified Story',
      condition: 'Multiple Uterine Fibroids · Uterine Fibroid Embolization (UFE)',
      outcome: 'Preserved uterus, avoided advised open surgical myomectomy, zero large incisions.',
      quote: 'I was diagnosed with multiple fibroids and initially advised myomectomy / open surgery. I was terrified of surgery. Dr. Rohit Madhurkar explained the UFE pinhole procedure with immense empathy. The procedure was a resounding success, no cuts or stitches, and my uterus was completely saved.',
    },
    {
      author: 'Verified Patient (Daughter of Patient)',
      date: 'Practo Verified Story · The Pinhole Clinic',
      condition: 'Varicose Veins · Endovenous Laser Therapy',
      outcome: 'Mother walked comfortably the same evening, leg heaviness and visible veins cleared.',
      quote: 'Visited The Pinhole Clinic for my mother’s varicose veins laser therapy. We deeply appreciated Dr. Rohit’s clear explanations, approachable nature, and caring bedside manner. My mother walked out the same evening without needing any support.',
    },
    {
      author: 'Verified Patient',
      date: 'Practo Verified Story',
      condition: 'Deep Vein Thrombosis (DVT) · Emergency Catheter Thrombectomy',
      outcome: 'Acute clot dissolved promptly, restored full venous leg circulation.',
      quote: 'Highly recommend Dr. Rohit Madhurkar for his prompt clinical expertise and compassionate care when my mother needed emergency catheter thrombectomy for acute leg thrombosis. His timely decision prevented severe complications.',
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-blue-900 tracking-wider uppercase mb-2">
            Genuine Patient Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Real Experiences from Verified Patients
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Authentic, unedited feedback from patients treated by Dr. Rohit Madhurkar at The Pinhole Clinic, sourced directly from verified medical platforms.
          </p>

          {/* Genuine Practo Trust Badge */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 bg-blue-50 border border-blue-200/80 rounded-2xl px-4 py-2.5 text-xs text-blue-950 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-900 shrink-0" />
            <span className="font-semibold">
              85% Patient Recommendation Rate on Practo
            </span>
            <span className="text-blue-300">·</span>
            <span>13+ Verified Patient Treatment Stories</span>
            <a
              href="https://www.practo.com/bangalore/doctor/dr-rohit-madhurkar-radiologist"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 font-bold underline underline-offset-2 flex items-center gap-1 hover:text-blue-950"
            >
              <span>View on Practo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {genuinePractoReviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                {/* Condition Kicker */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-blue-950 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    {rev.condition}
                  </span>
                  <div className="flex items-center text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Outcome Callout */}
                <div className="text-xs font-bold text-slate-900 bg-white p-2.5 rounded-lg border border-slate-200/80">
                  <span className="text-blue-900">Documented Result: </span>
                  {rev.outcome}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.author}</div>
                  <div className="text-slate-500 text-[11px]">{rev.date}</div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>Verified Medical Treatment</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
