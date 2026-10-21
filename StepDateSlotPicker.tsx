import React, { useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Sun,
  Moon,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Building2,
  Video,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { ConsultationType, DoctorScheduleConfig, BookingRecord } from '../../types';
import { getAvailableSlotsForDate, formatDateYMD } from '../../utils/scheduleStorage';

interface StepDateSlotPickerProps {
  consultationType: ConsultationType;
  onChangeConsultationType: (type: ConsultationType) => void;
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  selectedTime: string;
  onSelectTime: (timeStr: string) => void;
  config: DoctorScheduleConfig;
  bookings: BookingRecord[];
  onNext: () => void;
}

export const StepDateSlotPicker: React.FC<StepDateSlotPickerProps> = ({
  consultationType,
  onChangeConsultationType,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  config,
  bookings,
  onNext,
}) => {
  const availableDates = useMemo(() => {
    const dates: { dateStr: string; dayName: string; dayNumber: number; monthName: string; isToday: boolean }[] = [];
    const today = new Date();
    for (let i = 0; i < 28; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dateStr = formatDateYMD(d);
      dates.push({
        dateStr,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        monthName: d.toLocaleDateString('en-US', { month: 'short' }),
        isToday: i === 0,
      });
    }
    return dates;
  }, []);

  const dateSlotStatus = useMemo(() => {
    return getAvailableSlotsForDate(selectedDate, consultationType, config, bookings);
  }, [selectedDate, consultationType, config, bookings]);

  const morningSlots = dateSlotStatus.slots.filter((s) => s.period === 'morning');
  const eveningSlots = dateSlotStatus.slots.filter((s) => s.period === 'afternoon' || s.period === 'evening');

  const selectedDateObj = new Date(selectedDate + 'T00:00:00');
  const formattedSelectedDateText = selectedDateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Seamless Mode Switcher (No redundant previous screen!) */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            onChangeConsultationType('video');
            onSelectTime('');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            consultationType === 'video'
              ? 'bg-blue-950 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Video className="w-4 h-4 text-sky-400" />
          <span>Online Video Consult ({config.currency}{config.feeVideo})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onChangeConsultationType('in_person');
            onSelectTime('');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            consultationType === 'in_person'
              ? 'bg-blue-950 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4 text-sky-400" />
          <span>The Pinhole Clinic Visit ({config.currency}{config.feeInPerson})</span>
        </button>
      </div>

      {/* Cancellation Policy Banner */}
      <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-950">
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-bold">Cancellation Policy:</span>
          <span className="text-emerald-800">100% full refund if cancelled up to 4 hours before your slot.</span>
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
          Risk-Free
        </span>
      </div>

      {/* Date Carousel / Horizontal Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-blue-900" />
            <span>Select Appointment Date</span>
          </span>
          <span className="text-slate-500 font-normal">Next 4 Weeks Open</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
          {availableDates.map((d) => {
            const isSelected = d.dateStr === selectedDate;
            const isBlocked = config.blockedDates.includes(d.dateStr);

            return (
              <button
                key={d.dateStr}
                onClick={() => {
                  onSelectDate(d.dateStr);
                  onSelectTime('');
                }}
                className={`flex flex-col items-center justify-center min-w-[70px] py-2.5 px-2 rounded-xl border transition-all shrink-0 cursor-pointer text-center relative ${
                  isSelected
                    ? 'border-blue-950 bg-blue-950 text-white shadow-sm ring-2 ring-blue-950/20'
                    : isBlocked
                    ? 'border-red-200 bg-red-50/50 text-slate-400 hover:border-red-300'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[11px] font-semibold uppercase ${isSelected ? 'text-sky-300' : 'text-slate-500'}`}>
                  {d.dayName}
                </span>
                <span className="text-lg font-bold font-mono my-0.5 leading-none">
                  {d.dayNumber}
                </span>
                <span className={`text-[10px] ${isSelected ? 'text-sky-200' : 'text-slate-400'}`}>
                  {d.monthName}
                </span>
                {d.isToday && (
                  <span className={`text-[9px] font-bold mt-1 px-1 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    Today
                  </span>
                )}
                {isBlocked && (
                  <span className="text-[8px] font-bold text-red-600 absolute -top-1.5 right-1 bg-red-100 px-1 rounded">
                    OT
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Summary & Availability State */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {consultationType === 'video' ? (
            <Video className="w-4 h-4 text-blue-900" />
          ) : (
            <Building2 className="w-4 h-4 text-blue-900" />
          )}
          <span className="font-semibold text-slate-900">{formattedSelectedDateText}</span>
          <span className="text-slate-400">·</span>
          <span className="text-blue-900 font-bold">
            {consultationType === 'video' ? 'Online Google Meet' : 'The Pinhole Clinic (Banashankari)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500">Duration:</span>
          <span className="font-semibold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
            {config.slotDurationMinutes} Mins
          </span>
        </div>
      </div>

      {/* Slot Availability Area */}
      {dateSlotStatus.isBlocked ? (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h4 className="text-sm font-bold text-amber-950">
            No Standard Slots on this Date
          </h4>
          <p className="text-xs text-amber-800 max-w-md mx-auto leading-relaxed">
            {dateSlotStatus.blockReason || 'Dr. Rohit is in surgery or scheduled in the angiography suite. Please pick an alternative date.'}
          </p>
        </div>
      ) : dateSlotStatus.slots.length === 0 ? (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-slate-500">
          All slots for this date have been filled. Please choose an adjacent day.
        </div>
      ) : (
        <div className="space-y-5">
          {/* Morning Slots */}
          {morningSlots.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Morning Sessions (09:30 AM – 01:00 PM)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {morningSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.id}
                      disabled={slot.isBooked}
                      onClick={() => onSelectTime(slot.time)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        slot.isBooked
                          ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                          : isSelected
                          ? 'border-blue-950 bg-blue-950 text-white shadow-sm ring-1 ring-blue-950'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-blue-700 hover:bg-blue-50/40'
                      }`}
                    >
                      <span className="font-mono">{slot.time}</span>
                      {slot.isBooked ? (
                        <span className="text-[10px] text-slate-400 font-normal">Booked</span>
                      ) : isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Evening Slots */}
          {eveningSlots.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Moon className="w-4 h-4 text-blue-900" />
                <span>Evening Sessions (04:30 PM – 07:30 PM)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {eveningSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.id}
                      disabled={slot.isBooked}
                      onClick={() => onSelectTime(slot.time)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        slot.isBooked
                          ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                          : isSelected
                          ? 'border-blue-950 bg-blue-950 text-white shadow-sm ring-1 ring-blue-950'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-blue-700 hover:bg-blue-50/40'
                      }`}
                    >
                      <span className="font-mono">{slot.time}</span>
                      {slot.isBooked ? (
                        <span className="text-[10px] text-slate-400 font-normal">Booked</span>
                      ) : isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Selected Slot Notice */}
      {selectedTime && (
        <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-950">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-900" />
            <span>
              Chosen Slot: <strong className="font-bold">{formattedSelectedDateText} at {selectedTime}</strong>
            </span>
          </div>
          <span className="font-semibold text-sky-800">Held for You</span>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end pt-2">
        <button
          onClick={onNext}
          disabled={!selectedTime}
          className={`px-6 py-3 font-semibold text-sm rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
            selectedTime
              ? 'bg-blue-950 hover:bg-blue-900 text-white'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Patient Medical Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
