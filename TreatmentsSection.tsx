import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Shield,
  Zap,
  ArrowRight,
  Clock,
  CheckCircle2,
  Stethoscope,
  Sparkles,
} from 'lucide-react';
import { ConsultationType } from '../types';

interface TreatmentItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  pinholeTechnique: string;
  symptoms: string[];
  keyAdvantage: string;
  procedureDuration: string;
  recoveryTime: string;
}

const TREATMENTS_DATA: TreatmentItem[] = [
  {
    id: 'varicose-veins',
    category: 'Vascular',
    title: 'Varicose Veins Treatment',
    subtitle: 'Endovenous Laser (EVLA) & VenaSeal Medical SuperGlue',
    pinholeTechnique: 'Ultrasound-guided laser fiber or bio-adhesive closure through a 2mm puncture',
    symptoms: [
      'Twisted bulging veins on legs and calves',
      'Heavy legs, throbbing pain, and night cramps',
      'Brown skin discoloration and venous ulcers',
    ],
    keyAdvantage: 'Walk immediately post-procedure. No surgical vein stripping, no cuts, no stitches.',
    procedureDuration: '30–45 Mins',
    recoveryTime: 'Immediate walking / Back to work in 24h',
  },
  {
    id: 'uterine-fibroids',
    category: 'Women Health',
    title: 'Uterine Fibroid Embolization (UFE)',
    subtitle: 'Uterus-Sparing Non-Surgical Fibroid Treatment',
    pinholeTechnique: 'Micro-catheter delivers microspheres that starve and shrink fibroids',
    symptoms: [
      'Heavy prolonged periods and severe pelvic pain',
      'Anemia, severe fatigue, and iron deficiency',
      'Pelvic pressure, frequent urination, and bloating',
    ],
    keyAdvantage: 'Preserves the entire uterus and hormonal balance. Avoids major open hysterectomy.',
    procedureDuration: '45–60 Mins',
    recoveryTime: 'Daycare or 1-night stay / Normal routine in 3–5 days',
  },
  {
    id: 'prostate-bph',
    category: 'Men Health',
    title: 'Prostate Artery Embolization (PAE)',
    subtitle: 'Advanced Non-Surgical Relief for Enlarged Prostate (BPH)',
    pinholeTechnique: 'Wrist-puncture catheter blocks excess blood supply to the enlarged prostate',
    symptoms: [
      'Waking up multiple times at night to urinate (Nocturia)',
      'Weak urinary stream and hesitancy',
      'Sudden urgency and feeling of incomplete emptying',
    ],
    keyAdvantage: 'No painful urinary catheterization, zero risk of sexual dysfunction or incontinence.',
    procedureDuration: '60 Mins',
    recoveryTime: 'Same-day discharge / Rapid symptom reduction',
  },
  {
    id: 'varicocele',
    category: 'Men Health',
    title: 'Varicocele Embolization',
    subtitle: 'Precision Catheter Coil Closure for Scrotal Pain & Infertility',
    pinholeTechnique: 'Micro-coils and sclerosant seal faulty testicular veins from within',
    symptoms: [
      'Dull aching scrotal heaviness worsening on standing',
      'Reduced sperm motility, count, or abnormal morphology',
      'Visible "bag of worms" enlargement in scrotum',
    ],
    keyAdvantage: '95%+ success rate. Avoids painful surgical incisions in the groin.',
    procedureDuration: '40 Mins',
    recoveryTime: 'Daycare discharge in 3 hours / Resume gym in 48h',
  },
  {
    id: 'thyroid-nodules',
    category: 'Endocrine',
    title: 'Thyroid Nodule Ablation (RFA)',
    subtitle: 'Scarless Thermal Vaporization for Benign Thyroid Nodules',
    pinholeTechnique: 'Ultrasound-guided RF needle ablates and shrinks the nodule internally',
    symptoms: [
      'Visible lump in the front of the neck',
      'Cosmetic deformity or feeling of throat fullness',
      'Difficulty swallowing or mild throat discomfort',
    ],
    keyAdvantage: 'Zero neck scar, preserves natural thyroid hormone production without lifelong pills.',
    procedureDuration: '20–30 Mins',
    recoveryTime: 'Walk out in 1 hour / Local anesthesia only',
  },
  {
    id: 'dvt-clots',
    category: 'Vascular',
    title: 'Deep Vein Thrombosis (DVT) Thrombolysis',
    subtitle: 'Emergency Catheter Clot Dissolution & Venous Stenting',
    pinholeTechnique: 'Targeted ultrasound-accelerated catheter delivers clot-dissolving medication',
    symptoms: [
      'Sudden intense swelling and redness in one leg',
      'Severe calf tightness and inability to bear weight',
      'Risk of clot dislodgement to lungs (Pulmonary Embolism)',
    ],
    keyAdvantage: 'Rapidly clears heavy clot burden and prevents permanent post-thrombotic leg damage.',
    procedureDuration: '60–90 Mins',
    recoveryTime: '24–48 hours monitored care',
  },
  {
    id: 'diabetic-foot',
    category: 'Vascular',
    title: 'Diabetic Foot & Angioplasty (PAD)',
    subtitle: 'Limb-Salvage Endovascular Revascularization',
    pinholeTechnique: 'Ultra-thin balloon angioplasty and stenting opens blocked leg arteries',
    symptoms: [
      'Non-healing foot ulcers and infected toe sores',
      'Black toes or early tissue gangrene',
      'Severe burning rest pain in toes at night',
    ],
    keyAdvantage: 'Restores essential oxygenated blood flow to heal wounds and prevent leg amputation.',
    procedureDuration: '60 Mins',
    recoveryTime: 'Same-day or overnight stay',
  },
];

interface TreatmentsSectionProps {
  onSelectTreatmentForBooking: (conditionName: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  onSelectTreatmentForBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'Vascular', label: 'Vascular (Veins & Arteries)' },
    { id: 'Women Health', label: 'Women’s Health (Fibroids)' },
    { id: 'Men Health', label: 'Men’s Health (Prostate & Varicocele)' },
    { id: 'Endocrine', label: 'Thyroid & Neck' },
  ];

  const filtered = activeCategory === 'all'
    ? TREATMENTS_DATA
    : TREATMENTS_DATA.filter((t) => t.category === activeCategory);

  return (
    <section id="treatments" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold text-blue-900 tracking-wider uppercase mb-2">
            Non-Surgical Interventional Radiology
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
            Specialized Treatments by Dr. Rohit Madhurkar
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Interventional radiology replaces major open surgical operations with microscopic catheter and laser therapies guided by real-time ultrasound and fluoroscopy at The Pinhole Clinic.
          </p>

          {/* Interactive Category Segmented Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid of Treatments */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-blue-900/40 hover:shadow-md transition-all group"
            >
              <div>
                {/* Quiet unboxed category metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-blue-900 uppercase tracking-wide">
                    {item.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Daycare Procedure</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  {item.subtitle}
                </p>

                {/* Technique Kicker */}
                <div className="mt-3.5 p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-950">
                  <span className="font-semibold block text-[11px] text-blue-900 uppercase tracking-wider">
                    Pinhole Method:
                  </span>
                  {item.pinholeTechnique}
                </div>

                {/* Common Symptoms Checklist */}
                <div className="mt-4 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Common Indications:
                  </div>
                  {item.symptoms.map((symp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                      <span>{symp}</span>
                    </div>
                  ))}
                </div>

                {/* Key Advantage */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <strong className="text-slate-900 font-semibold">Key Benefit: </strong>
                  {item.keyAdvantage}
                </div>
              </div>

              {/* Bottom Metrics & Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-900" />
                    <span>Duration: {item.procedureDuration}</span>
                  </span>
                  <span className="font-mono text-blue-950 text-[11px]">
                    {item.recoveryTime.split('/')[0]}
                  </span>
                </div>

                <button
                  onClick={() => onSelectTreatmentForBooking(item.title)}
                  className="w-full py-2.5 px-3 bg-slate-100 hover:bg-blue-950 hover:text-white text-slate-800 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <span>Book Consultation for this</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
