import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import {
  ConsultationType,
  DoctorScheduleConfig,
  BookingRecord,
  BookingPatientDetails,
  BookingPayment,
} from '../../types';
import { StepDateSlotPicker } from './StepDateSlotPicker';
import { StepPatientDetails } from './StepPatientDetails';
import { StepPayment } from './StepPayment';
import { StepConfirmation } from './StepConfirmation';
import {
  formatDateYMD,
  generateGoogleMeetLink,
  addBooking,
} from '../../utils/scheduleStorage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: ConsultationType;
  initialCondition?: string;
  config: DoctorScheduleConfig;
  bookings: BookingRecord[];
  onBookingCreated: (newBooking: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialType = 'video',
  initialCondition = '',
  config,
  bookings,
  onBookingCreated,
}) => {
  if (!isOpen) return null;

  // Starts immediately on Step 1 (Date & Time picker with seamless mode toggle - no redundant first screen!)
  const [step, setStep] = useState<number>(1);
  const [consultationType, setConsultationType] = useState<ConsultationType>(initialType);
  const [selectedDate, setSelectedDate] = useState<string>(() => formatDateYMD(new Date()));
  const [selectedTime, setSelectedTime] = useState<string>('');

  const [patientDetails, setPatientDetails] = useState<BookingPatientDetails>({
    bookerName: '',
    bookerEmail: '',
    bookerPhone: '',
    isBookingForOther: false,
    patientName: '',
    patientRelation: 'Parent',
    patientAge: '',
    patientGender: 'female',
    conditionCategory: initialCondition || '',
    symptomsDescription: '',
    hasPreviousSurgery: false,
    reports: [],
  });

  const [createdBooking, setCreatedBooking] = useState<BookingRecord | null>(null);

  const handleUpdateDetails = (updated: Partial<BookingPatientDetails>) => {
    setPatientDetails((prev) => ({ ...prev, ...updated }));
  };

  const handlePaymentSuccess = (payment: BookingPayment) => {
    const bookingId = `DRM-${Math.floor(1000 + Math.random() * 9000)}`;
    const meetLink = generateGoogleMeetLink(bookingId);

    const newRecord: BookingRecord = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      consultationType,
      date: selectedDate,
      time: selectedTime,
      doctorName: config.doctorName,
      clinicName: config.clinicName,
      clinicAddress: config.clinicAddress,
      patientDetails,
      payment,
      googleMeetLink: meetLink,
      calendarEventTitle: `${consultationType === 'video' ? 'Video' : 'The Pinhole Clinic'} Consultation with Dr. Rohit Madhurkar`,
      status: 'confirmed',
    };

    addBooking(newRecord);
    onBookingCreated(newRecord);
    setCreatedBooking(newRecord);
    setStep(4);
  };

  const resetBookingFlow = () => {
    setStep(1);
    setSelectedTime('');
    setCreatedBooking(null);
  };

  const stepsHeader = [
    { num: 1, label: 'Timings' },
    { num: 2, label: 'Patient Info' },
    { num: 3, label: 'Razorpay Payment' },
    { num: 4, label: 'Confirmed' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-950 text-sky-300 flex items-center justify-center font-bold text-sm">
              PC
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Book Consultation · Dr. Rohit Madhurkar
              </h2>
              <p className="text-xs text-slate-500">
                The Pinhole Clinic · Banashankari, Bengaluru
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        {step < 4 && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[320px]">
              {stepsHeader.map((s, idx) => {
                const isCompleted = step > s.num;
                const isCurrent = step === s.num;
                return (
                  <div key={s.num} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-blue-950 text-white'
                          : isCurrent
                          ? 'border-2 border-blue-950 text-blue-950 bg-white'
                          : 'border border-slate-300 text-slate-400 bg-slate-100'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                    </div>
                    <span
                      className={`text-xs font-medium whitespace-nowrap ${
                        isCurrent ? 'text-slate-900 font-bold' : isCompleted ? 'text-blue-950' : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                    {idx < stepsHeader.length - 2 && (
                      <div
                        className={`w-8 h-0.5 mx-1 hidden sm:block ${
                          step > s.num ? 'bg-blue-950' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <StepDateSlotPicker
              consultationType={consultationType}
              onChangeConsultationType={setConsultationType}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              config={config}
              bookings={bookings}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepPatientDetails
              details={patientDetails}
              onChangeDetails={handleUpdateDetails}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepPayment
              consultationType={consultationType}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              patientDetails={patientDetails}
              config={config}
              onPaymentSuccess={handlePaymentSuccess}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && createdBooking && (
            <StepConfirmation
              booking={createdBooking}
              onClose={onClose}
              onBookAnother={resetBookingFlow}
            />
          )}
        </div>
      </div>
    </div>
  );
};
