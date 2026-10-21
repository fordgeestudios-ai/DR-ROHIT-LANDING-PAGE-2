import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  UploadCloud,
  FileText,
  Trash2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Plus,
} from 'lucide-react';
import { BookingPatientDetails, UploadedReport } from '../../types';

interface StepPatientDetailsProps {
  details: BookingPatientDetails;
  onChangeDetails: (updated: Partial<BookingPatientDetails>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CONDITION_PRESETS = [
  'Varicose Veins (Leg swelling, heaviness, prominent veins)',
  'Uterine Fibroids (Heavy bleeding, pelvic pain, UFE)',
  'Enlarged Prostate / BPH (Frequent nighttime urination, PAE)',
  'Varicocele (Scrotal discomfort, male factor fertility)',
  'Thyroid Nodule (Benign neck nodule, RFA ablation)',
  'Deep Vein Thrombosis (DVT / Leg blood clot)',
  'Diabetic Foot / Peripheral Vascular Disease (Ulcer, gangrene)',
  'Liver Cancer / Tumor (TACE / RFA / Second Opinion)',
  'General Interventional Radiology Consultation / Other',
];

export const StepPatientDetails: React.FC<StepPatientDetailsProps> = ({
  details,
  onChangeDetails,
  onNext,
  onBack,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleFileUploadSimulation = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const newReports: UploadedReport[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      newReports.push({
        id: `file-${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
        type: f.type || 'application/pdf',
        uploadDate: 'Just now',
      });
    }
    onChangeDetails({ reports: [...details.reports, ...newReports] });
  };

  const addSampleScan = (scanType: string) => {
    const sample: UploadedReport = {
      id: `sample-${Date.now()}`,
      name: `${scanType}_Scan_DrRohitM.pdf`,
      size: 3240000,
      type: 'application/pdf',
      uploadDate: 'Sample uploaded',
    };
    onChangeDetails({ reports: [...details.reports, sample] });
  };

  const removeReport = (id: string) => {
    onChangeDetails({ reports: details.reports.filter((r) => r.id !== id) });
  };

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.bookerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!details.bookerPhone.trim() || details.bookerPhone.length < 8) {
      setErrorMsg('Please provide a valid contact phone number for meeting reminders.');
      return;
    }
    if (!details.bookerEmail.trim() || !details.bookerEmail.includes('@')) {
      setErrorMsg('Please provide a valid email address to receive the Google Meet invitation.');
      return;
    }
    if (details.isBookingForOther && !details.patientName.trim()) {
      setErrorMsg('Please specify the patient’s full name.');
      return;
    }
    if (!details.patientAge.trim()) {
      setErrorMsg('Please enter patient age.');
      return;
    }
    if (!details.conditionCategory) {
      setErrorMsg('Please select the primary medical concern/condition.');
      return;
    }

    setErrorMsg('');
    onNext();
  };

  return (
    <form onSubmit={validateAndProceed} className="space-y-6">
      <div className="text-center max-w-lg mx-auto">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Patient & Clinical Case Details
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Dr. Rohit personally reviews your symptoms and medical reports prior to the call.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Booker Contact Information */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-4 h-4 text-blue-900" />
          <span>Contact & Meeting Recipient</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={details.bookerName}
              onChange={(e) => {
                const name = e.target.value;
                onChangeDetails({
                  bookerName: name,
                  patientName: details.isBookingForOther ? details.patientName : name,
                });
              }}
              placeholder="e.g. Ramesh Kumar"
              className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-blue-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone / WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={details.bookerPhone}
              onChange={(e) => onChangeDetails({ bookerPhone: e.target.value })}
              placeholder="e.g. +91 98450 12345"
              className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-mono focus:outline-blue-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email (for Google Meet Link) <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={details.bookerEmail}
              onChange={(e) => onChangeDetails({ bookerEmail: e.target.value })}
              placeholder="e.g. ramesh@gmail.com"
              className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-blue-900"
            />
          </div>
        </div>

        {/* Booking for Self or Other toggle */}
        <div className="pt-2 flex items-center gap-4 text-xs">
          <label className="font-semibold text-slate-700">Booking consultation for:</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="isOther"
                checked={!details.isBookingForOther}
                onChange={() =>
                  onChangeDetails({
                    isBookingForOther: false,
                    patientName: details.bookerName,
                  })
                }
                className="text-blue-900"
              />
              <span className="text-slate-800">Myself</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="isOther"
                checked={details.isBookingForOther}
                onChange={() => onChangeDetails({ isBookingForOther: true })}
                className="text-blue-900"
              />
              <span className="text-slate-800">Family Member / Parent / Spouse</span>
            </label>
          </div>
        </div>

        {details.isBookingForOther && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-200/60 animate-in fade-in">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient’s Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={details.patientName}
                onChange={(e) => onChangeDetails({ patientName: e.target.value })}
                placeholder="Patient’s legal name"
                className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-blue-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Relationship to Booker
              </label>
              <select
                value={details.patientRelation || 'Mother'}
                onChange={(e) => onChangeDetails({ patientRelation: e.target.value })}
                className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-blue-900"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other Relative</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Patient Clinical Info */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-4 shadow-xs">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Patient Clinical Profile
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Patient Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="115"
              required
              value={details.patientAge}
              onChange={(e) => onChangeDetails({ patientAge: e.target.value })}
              placeholder="e.g. 52"
              className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 font-mono focus:outline-blue-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Patient Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={details.patientGender}
              onChange={(e) => onChangeDetails({ patientGender: e.target.value as any })}
              className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-blue-900"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Medical Problem <span className="text-red-500">*</span>
            </label>
            <select
              value={details.conditionCategory}
              onChange={(e) => onChangeDetails({ conditionCategory: e.target.value })}
              className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-blue-900"
            >
              <option value="">-- Choose condition --</option>
              {CONDITION_PRESETS.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Symptoms & Medical Problem Description (Brief)
          </label>
          <textarea
            rows={3}
            value={details.symptomsDescription}
            onChange={(e) => onChangeDetails({ symptomsDescription: e.target.value })}
            placeholder="Please mention symptom duration, pain level, previous diagnoses, or what questions you have for Dr. Rohit..."
            className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-blue-900"
          />
        </div>
      </div>

      {/* Reports Upload Simulation */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <UploadCloud className="w-4 h-4 text-blue-900" />
            <span>Upload Medical Reports / Scans (Optional)</span>
          </div>
          <span className="text-[11px] text-slate-500">MRI, CT, Doppler, Ultrasound, Blood</span>
        </div>

        {/* Drag and Drop Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFileUploadSimulation(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
            dragActive
              ? 'border-blue-900 bg-blue-50'
              : 'border-slate-300 bg-white hover:border-slate-400'
          }`}
          onClick={() => {
            const input = document.getElementById('report-file-input');
            if (input) input.click();
          }}
        >
          <input
            id="report-file-input"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileUploadSimulation(e.target.files)}
          />
          <UploadCloud className="w-7 h-7 text-blue-900 mx-auto mb-1.5" />
          <p className="text-xs font-semibold text-slate-800">
            Click to browse or drop previous scans here
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            PDF, JPG, PNG or DICOM archives up to 50MB
          </p>
        </div>

        {/* Quick Sample Attachment Presets for User Demo Convenience */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] text-slate-500 font-medium">Quick Test Presets:</span>
          <button
            type="button"
            onClick={() => addSampleScan('Venous_Doppler_Lower_Limb')}
            className="text-[11px] bg-white border border-slate-200 hover:border-blue-800 text-slate-700 px-2 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3 text-blue-900" />
            <span>+ Add Venous Doppler Report</span>
          </button>
          <button
            type="button"
            onClick={() => addSampleScan('Pelvis_MRI_Fibroid')}
            className="text-[11px] bg-white border border-slate-200 hover:border-blue-800 text-slate-700 px-2 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3 text-blue-900" />
            <span>+ Add Pelvic MRI Scan</span>
          </button>
        </div>

        {/* Uploaded File List */}
        {details.reports.length > 0 && (
          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-semibold text-slate-700 block">
              Attached Documents ({details.reports.length}):
            </span>
            {details.reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg text-xs"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="w-4 h-4 text-blue-900 shrink-0" />
                  <span className="font-medium text-slate-800 truncate">{report.name}</span>
                  <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                    ({(report.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeReport(report.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Timings</span>
        </button>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Proceed to Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
