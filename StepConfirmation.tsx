import React, { useState } from 'react';
import {
  CheckCircle2,
  Video,
  Calendar,
  Download,
  ExternalLink,
  MapPin,
  Clock,
  Printer,
  Copy,
  Building2,
  MessageSquare,
} from 'lucide-react';
import { BookingRecord } from '../../types';
import {
  createGoogleCalendarUrl,
  downloadICSFile,
} from '../../utils/scheduleStorage';

interface StepConfirmationProps {
  booking: BookingRecord;
  onClose: () => void;
  onBookAnother: () => void;
}

export const StepConfirmation: React.FC<StepConfirmationProps> = ({
  booking,
  onClose,
  onBookAnother,
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const googleCalUrl = createGoogleCalendarUrl(booking);

  const copyMeetLink = () => {
    navigator.clipboard.writeText(booking.googleMeetLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isClinicPay = booking.payment.status === 'pending_clinic_payment';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Slot Booked & Sealed */}
      <div className="text-center max-w-lg mx-auto space-y-2">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>
        <div className="inline-block bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
          {isClinicPay ? 'Appointment Reserved (Pay at Clinic Desk)' : 'Slot Booked & Sealed'}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Appointment Confirmed!
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Your consultation with Dr. Rohit Madhurkar is locked. Official confirmation has been generated.
        </p>
      </div>

      {/* Main Confirmation Box */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
        {/* Booking Reference Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Booking ID</span>
            <span className="text-base font-bold font-mono text-slate-900 tracking-wide">
              {booking.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg uppercase ${
                booking.consultationType === 'video'
                  ? 'bg-sky-100 text-blue-950'
                  : 'bg-blue-100 text-blue-950'
              }`}
            >
              {booking.consultationType === 'video' ? 'Online Google Meet' : 'The Pinhole Clinic (Banashankari)'}
            </span>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-lg ${
                isClinicPay
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-emerald-700 bg-emerald-100'
              }`}
            >
              {isClinicPay ? 'Pay ₹1500 at Clinic' : `Paid (₹${booking.payment.amount})`}
            </span>
          </div>
        </div>

        {/* Date, Time & Doctor Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Appointment Schedule
            </span>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <Calendar className="w-4 h-4 text-blue-900" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm">
              <Clock className="w-4 h-4 text-blue-900" />
              <span>{booking.time} (30 mins)</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Specialist Physician
            </span>
            <div className="text-slate-900 font-bold text-base">
              {booking.doctorName}
            </div>
            <div className="text-xs text-slate-600 leading-snug">
              Founder & Director, The Pinhole Clinic · Interventional Radiologist
            </div>
          </div>
        </div>

        {/* GOOGLE MEET OR CLINIC ADDRESS CARD */}
        {booking.consultationType === 'video' ? (
          <div className="p-5 bg-gradient-to-br from-blue-950 to-slate-900 rounded-xl text-white space-y-3.5 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Google Meet Telehealth Room
                  </h4>
                  <p className="text-xs text-sky-200/80">
                    High definition video consultation with live scan screen-sharing
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Connected
              </span>
            </div>

            <div className="p-3 bg-white/10 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <span className="text-sky-100 truncate">{booking.googleMeetLink}</span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={copyMeetLink}
                  className="px-2.5 py-1.5 bg-white/15 hover:bg-white/25 rounded text-white flex items-center gap-1 transition-colors cursor-pointer text-xs font-sans"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
                </button>
                <a
                  href={booking.googleMeetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold rounded flex items-center gap-1 transition-colors cursor-pointer text-xs font-sans"
                >
                  <span>Join Meeting</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="text-[11px] text-sky-100/70 leading-relaxed">
              Dr. Rohit will join at your scheduled time. Please keep your previous Doppler, MRI, or CT scan films handy on your device.
            </p>
          </div>
        ) : (
          /* THE PINHOLE CLINIC PHYSICAL ADDRESS */
          <div className="p-5 bg-gradient-to-br from-blue-950 to-slate-900 rounded-xl text-white space-y-3.5 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">The Pinhole Clinic Visit Location</h4>
                <p className="text-xs text-sky-200 mt-0.5 leading-relaxed">
                  #1943, 1st Floor, 7th Main, 27th Cross, Monotype Road, Banashankari 2nd Stage, Bengaluru, Karnataka 560070
                </p>
                <span className="text-[11px] text-sky-300/80 block mt-0.5">
                  Landmark: Opposite Monotype Bus Stop, Banashankari
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://maps.google.com/?q=The+Pinhole+Clinic+Banashankari+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs rounded-lg inline-flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-950" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-blue-950" />
              </a>
              <span className="text-xs text-sky-200">
                Phone: +91 98450 12345
              </span>
            </div>
          </div>
        )}

        {/* 1-Click Calendar Buttons */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2.5">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-900" />
            <span>Synchronize with Your Calendar</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>Add to Google Calendar</span>
            </a>

            <button
              onClick={() => downloadICSFile(booking)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download iCal (.ics)</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Appointment Pass</span>
            </button>
          </div>
        </div>

        {/* Patient Details & Reports Recap */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="text-xs font-bold text-slate-800">Clinical Case Summary</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
            <div>
              <span className="text-slate-400">Patient: </span>
              <strong className="text-slate-800 font-semibold">{booking.patientDetails.patientName}</strong>{' '}
              ({booking.patientDetails.patientAge} years, {booking.patientDetails.patientGender})
            </div>
            <div>
              <span className="text-slate-400">Concern: </span>
              <strong className="text-blue-950 font-semibold">{booking.patientDetails.conditionCategory}</strong>
            </div>
            {booking.patientDetails.reports.length > 0 && (
              <div className="sm:col-span-2">
                <span className="text-slate-400">Attached Reports ({booking.patientDetails.reports.length}): </span>
                <span className="font-mono text-slate-700">
                  {booking.patientDetails.reports.map((r) => r.name).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp Notification Notice */}
        <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center gap-3 text-xs text-blue-950">
          <MessageSquare className="w-4 h-4 text-blue-900 shrink-0" />
          <span>
            Confirmation notification dispatched to <strong className="font-mono">{booking.patientDetails.bookerPhone}</strong> and email sent to <strong className="font-mono">{booking.patientDetails.bookerEmail}</strong>.
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onBookAnother}
          className="px-4 py-2.5 text-blue-900 hover:text-blue-950 text-xs font-semibold cursor-pointer"
        >
          + Book Another Patient Consultation
        </button>

        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
        >
          Done & Return to Homepage
        </button>
      </div>
    </div>
  );
};
