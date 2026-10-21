import React, { useState } from 'react';
import {
  X,
  Clock,
  Calendar as CalendarIcon,
  CheckCircle,
  Plus,
  Trash2,
  Shield,
  AlertTriangle,
  RotateCcw,
  Save,
  Users,
  Video,
  MapPin,
  FileText,
  ExternalLink,
  CreditCard,
  KeyRound,
  Building2,
} from 'lucide-react';
import { DoctorScheduleConfig, DaySchedule, BookingRecord } from '../types';
import { DEFAULT_DOCTOR_CONFIG, formatDateYMD } from '../utils/scheduleStorage';

interface DoctorScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DoctorScheduleConfig;
  onSaveConfig: (updated: DoctorScheduleConfig) => void;
  bookings: BookingRecord[];
  onUpdateBookingStatus: (id: string, status: 'confirmed' | 'cancelled' | 'rescheduled') => void;
}

export const DoctorScheduleModal: React.FC<DoctorScheduleModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  bookings,
  onUpdateBookingStatus,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'timings' | 'blocked_dates' | 'payment_settings' | 'bookings'>('timings');
  const [localConfig, setLocalConfig] = useState<DoctorScheduleConfig>(() => JSON.parse(JSON.stringify(config)));
  const [newBlockDate, setNewBlockDate] = useState<string>(formatDateYMD(new Date()));
  const [customSlotDate, setCustomSlotDate] = useState<string>(formatDateYMD(new Date()));
  const [customSlotTime, setCustomSlotTime] = useState<string>('08:00 PM');
  const [customSlotType, setCustomSlotType] = useState<'both' | 'video' | 'in_person'>('video');
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // Update Day Schedule
  const updateDaySchedule = (dayIndex: number, updates: Partial<DaySchedule>) => {
    const updatedWeekly = [...localConfig.weeklySchedule];
    updatedWeekly[dayIndex] = { ...updatedWeekly[dayIndex], ...updates };
    setLocalConfig({ ...localConfig, weeklySchedule: updatedWeekly });
  };

  // Add Blocked Date
  const addBlockedDate = () => {
    if (!newBlockDate || localConfig.blockedDates.includes(newBlockDate)) return;
    setLocalConfig({
      ...localConfig,
      blockedDates: [...localConfig.blockedDates, newBlockDate],
    });
  };

  const removeBlockedDate = (dateToRemove: string) => {
    setLocalConfig({
      ...localConfig,
      blockedDates: localConfig.blockedDates.filter((d) => d !== dateToRemove),
    });
  };

  // Add Custom One-Off Slot
  const addCustomSlot = () => {
    if (!customSlotDate || !customSlotTime) return;
    const existing = localConfig.customOverrides[customSlotDate]?.customSlots || [];
    const newSlot = {
      id: `custom-${Date.now()}`,
      time: customSlotTime,
      period: 'evening' as const,
      consultationType: customSlotType,
      isBooked: false,
    };
    setLocalConfig({
      ...localConfig,
      customOverrides: {
        ...localConfig.customOverrides,
        [customSlotDate]: {
          ...localConfig.customOverrides[customSlotDate],
          customSlots: [...existing, newSlot],
        },
      },
    });
  };

  const handleSave = () => {
    onSaveConfig(localConfig);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all schedule timings and clinic details to defaults?')) {
      setLocalConfig(JSON.parse(JSON.stringify(DEFAULT_DOCTOR_CONFIG)));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-blue-950 text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Clinic Admin & Doctor Timing Control Center
                </h2>
                <span className="text-[11px] font-semibold bg-sky-500/20 text-sky-200 px-2 py-0.5 rounded border border-sky-400/30">
                  The Pinhole Clinic
                </span>
              </div>
              <p className="text-xs text-sky-200/80">
                Authorized access: Modify available timings, payment gateways, surgery dates, or view bookings.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('timings')}
              className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'timings'
                  ? 'border-blue-900 text-blue-950'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Weekly Timings & Hours
            </button>
            <button
              onClick={() => setActiveTab('blocked_dates')}
              className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'blocked_dates'
                  ? 'border-blue-900 text-blue-950'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Block Surgery / OT Dates
            </button>
            <button
              onClick={() => setActiveTab('payment_settings')}
              className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'payment_settings'
                  ? 'border-blue-900 text-blue-950'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Payment Gateways & Clinic Details
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'bookings'
                  ? 'border-blue-900 text-blue-950'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Booked Appointments ({bookings.length})</span>
            </button>
          </div>

          {savedNotice && (
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 animate-in fade-in">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Settings Saved & Live!</span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: Weekly Timings */}
          {activeTab === 'timings' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Recurring Weekly Availability
                  </h3>
                  <p className="text-xs text-slate-500">
                    Control which days and hours Dr. Rohit is available for Video and In-Person consultations at The Pinhole Clinic.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs text-slate-600 font-medium">Slot Duration:</label>
                  <select
                    value={localConfig.slotDurationMinutes}
                    onChange={(e) =>
                      setLocalConfig({ ...localConfig, slotDurationMinutes: Number(e.target.value) })
                    }
                    className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={20}>20 Minutes</option>
                    <option value={30}>30 Minutes (Recommended)</option>
                    <option value={45}>45 Minutes</option>
                  </select>
                </div>
              </div>

              {/* Day-by-Day List */}
              <div className="space-y-2.5">
                {localConfig.weeklySchedule.map((day, idx) => (
                  <div
                    key={day.dayOfWeek}
                    className={`p-3.5 rounded-xl border transition-all ${
                      day.enabled
                        ? 'bg-white border-slate-200'
                        : 'bg-slate-50 border-slate-200/60 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <input
                          type="checkbox"
                          id={`day-toggle-${day.dayOfWeek}`}
                          checked={day.enabled}
                          onChange={(e) => updateDaySchedule(idx, { enabled: e.target.checked })}
                          className="w-4 h-4 text-blue-900 rounded border-slate-300 cursor-pointer"
                        />
                        <label
                          htmlFor={`day-toggle-${day.dayOfWeek}`}
                          className="text-sm font-bold text-slate-900 cursor-pointer"
                        >
                          {day.dayName}
                        </label>
                      </div>

                      {day.enabled ? (
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          {/* Morning Range */}
                          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                            <span className="text-slate-500 font-medium">Morning:</span>
                            <input
                              type="time"
                              value={day.morningStart}
                              onChange={(e) => updateDaySchedule(idx, { morningStart: e.target.value })}
                              className="font-mono bg-white border border-slate-300 rounded px-1 text-slate-800 text-xs"
                            />
                            <span>to</span>
                            <input
                              type="time"
                              value={day.morningEnd}
                              onChange={(e) => updateDaySchedule(idx, { morningEnd: e.target.value })}
                              className="font-mono bg-white border border-slate-300 rounded px-1 text-slate-800 text-xs"
                            />
                          </div>

                          {/* Evening Range */}
                          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                            <span className="text-slate-500 font-medium">Evening:</span>
                            <input
                              type="time"
                              value={day.eveningStart}
                              onChange={(e) => updateDaySchedule(idx, { eveningStart: e.target.value })}
                              className="font-mono bg-white border border-slate-300 rounded px-1 text-slate-800 text-xs"
                            />
                            <span>to</span>
                            <input
                              type="time"
                              value={day.eveningEnd}
                              onChange={(e) => updateDaySchedule(idx, { eveningEnd: e.target.value })}
                              className="font-mono bg-white border border-slate-300 rounded px-1 text-slate-800 text-xs"
                            />
                          </div>

                          {/* Allowed Type */}
                          <select
                            value={day.allowedType}
                            onChange={(e) =>
                              updateDaySchedule(idx, {
                                allowedType: e.target.value as 'both' | 'video' | 'in_person',
                              })
                            }
                            className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-700"
                          >
                            <option value="both">Both Video & Pinhole Clinic</option>
                            <option value="video">Video Consult Only</option>
                            <option value="in_person">Pinhole Clinic Only</option>
                          </select>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Closed / Off-Duty (No patient slots generated)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Block Surgery / OT Dates */}
          {activeTab === 'blocked_dates' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Block Dates for Angiography Suite (OT) Surgeries or Leave
                </h3>
                <p className="text-xs text-slate-500">
                  Blocked dates will prevent patients from selecting appointments on that day.
                </p>
              </div>

              {/* Add Block Date */}
              <div className="flex flex-wrap items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-semibold text-amber-900 mb-1">
                    Select Date to Block:
                  </label>
                  <input
                    type="date"
                    value={newBlockDate}
                    onChange={(e) => setNewBlockDate(e.target.value)}
                    className="text-xs bg-white border border-amber-300 rounded-lg px-3 py-2 text-slate-900 w-full sm:w-64"
                  />
                </div>
                <button
                  onClick={addBlockedDate}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Block This Date</span>
                </button>
              </div>

              {/* Blocked Dates List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Currently Blocked Dates ({localConfig.blockedDates.length})
                </h4>

                {localConfig.blockedDates.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    No dates are currently blocked. Dr. Rohit is accepting consultations on all configured working days.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {localConfig.blockedDates.map((dateStr) => (
                      <div
                        key={dateStr}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-red-600" />
                          <span className="font-semibold text-red-950 font-mono">{dateStr}</span>
                          <span className="text-red-700 text-[11px]">(Angio Suite / Blocked)</span>
                        </div>
                        <button
                          onClick={() => removeBlockedDate(dateStr)}
                          className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded transition-colors cursor-pointer"
                          title="Unblock date"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Custom One-Off Slot */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Add Emergency or One-Off Custom Slot
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Quickly open an emergency evening slot for an urgent patient.
                </p>

                <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">Date:</label>
                    <input
                      type="date"
                      value={customSlotDate}
                      onChange={(e) => setCustomSlotDate(e.target.value)}
                      className="bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">Time Label:</label>
                    <input
                      type="text"
                      placeholder="e.g. 08:30 PM"
                      value={customSlotTime}
                      onChange={(e) => setCustomSlotTime(e.target.value)}
                      className="bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 font-mono w-28"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-0.5">Type:</label>
                    <select
                      value={customSlotType}
                      onChange={(e) => setCustomSlotType(e.target.value as any)}
                      className="bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
                    >
                      <option value="video">Video Only</option>
                      <option value="in_person">Pinhole Clinic Only</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <button
                    onClick={addCustomSlot}
                    className="self-end px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Slot</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Payment Gateways & Clinic Details */}
          {activeTab === 'payment_settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Payment Connection & Clinic Information
                </h3>
                <p className="text-xs text-slate-500">
                  Connect your real UPI VPA, Razorpay / Payment Gateway URL, and clinic address.
                </p>
              </div>

              {/* Payment Gateways Config */}
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-4">
                <div className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-900" />
                  <span>Live Payment Connection Settings</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Clinic UPI ID (VPA) for Direct PhonePe/GPay QR:
                    </label>
                    <input
                      type="text"
                      value={localConfig.upiId}
                      onChange={(e) => setLocalConfig({ ...localConfig, upiId: e.target.value })}
                      placeholder="e.g. drrohitm@okhdfcbank"
                      className="w-full bg-white border border-blue-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Generates real UPI deep links & dynamic QR code for patients.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Razorpay / Stripe Payment Gateway URL (Optional):
                    </label>
                    <input
                      type="url"
                      value={localConfig.customPaymentLink || ''}
                      onChange={(e) => setLocalConfig({ ...localConfig, customPaymentLink: e.target.value })}
                      placeholder="https://rzp.io/l/your-link or custom URL"
                      className="w-full bg-white border border-blue-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      If provided, patients can open this link directly to pay.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-blue-200">
                  <input
                    type="checkbox"
                    id="allow-pay-at-clinic"
                    checked={localConfig.allowPayAtClinic}
                    onChange={(e) => setLocalConfig({ ...localConfig, allowPayAtClinic: e.target.checked })}
                    className="w-4 h-4 text-blue-900 rounded border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="allow-pay-at-clinic" className="text-xs font-semibold text-slate-800 cursor-pointer">
                    Allow patients to choose "Pay at The Pinhole Clinic Reception" for in-person appointments
                  </label>
                </div>
              </div>

              {/* Consultation Fees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-blue-950 font-bold text-xs uppercase tracking-wider">
                    <Video className="w-4 h-4 text-blue-900" />
                    <span>Online Video Consultation Fee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-700">{localConfig.currency}</span>
                    <input
                      type="number"
                      value={localConfig.feeVideo}
                      onChange={(e) =>
                        setLocalConfig({ ...localConfig, feeVideo: Number(e.target.value) })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold text-lg"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-blue-950 font-bold text-xs uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-blue-900" />
                    <span>In-Person Clinic Visit Fee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-700">{localConfig.currency}</span>
                    <input
                      type="number"
                      value={localConfig.feeInPerson}
                      onChange={(e) =>
                        setLocalConfig({ ...localConfig, feeInPerson: Number(e.target.value) })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Clinic Physical Details */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-900" />
                  <span>The Pinhole Clinic Information</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Clinic Name:</label>
                    <input
                      type="text"
                      value={localConfig.clinicName}
                      onChange={(e) => setLocalConfig({ ...localConfig, clinicName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Landmark:</label>
                    <input
                      type="text"
                      value={localConfig.clinicLandmark}
                      onChange={(e) => setLocalConfig({ ...localConfig, clinicLandmark: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 mb-1 font-medium">Clinic Full Address:</label>
                    <input
                      type="text"
                      value={localConfig.clinicAddress}
                      onChange={(e) => setLocalConfig({ ...localConfig, clinicAddress: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Admin Security PIN */}
              <div className="p-3.5 bg-slate-100 rounded-xl flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-slate-600" />
                  <span className="font-semibold text-slate-800">Admin Login Security PIN:</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={localConfig.adminPin}
                  onChange={(e) => setLocalConfig({ ...localConfig, adminPin: e.target.value })}
                  className="w-24 text-center font-mono font-bold bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-900"
                />
              </div>
            </div>
          )}

          {/* TAB 4: Booked Patients */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Patient Consultations at The Pinhole Clinic & Online
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review patient clinical histories, complaints, uploaded scan files, and Google Meet rooms.
                  </p>
                </div>
              </div>

              {bookings.length === 0 ? (
                <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm">No bookings recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold text-slate-900 text-xs bg-slate-100 px-2 py-0.5 rounded">
                            {booking.id}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded uppercase ${
                              booking.consultationType === 'video'
                                ? 'bg-sky-100 text-sky-900'
                                : 'bg-blue-100 text-blue-900'
                            }`}
                          >
                            {booking.consultationType === 'video' ? 'Online Video' : 'The Pinhole Clinic Visit'}
                          </span>
                          <span className="text-xs font-semibold text-slate-700">
                            {booking.date} at {booking.time}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {booking.status.toUpperCase()}
                          </span>
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => onUpdateBookingStatus(booking.id, 'cancelled')}
                              className="text-xs text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                            >
                              Cancel Slot
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Patient & Condition Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[11px]">Patient:</span>
                          <strong className="text-slate-900 font-semibold">
                            {booking.patientDetails.patientName}
                          </strong>{' '}
                          <span className="text-slate-600">
                            ({booking.patientDetails.patientAge}y, {booking.patientDetails.patientGender})
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Contact:</span>
                          <span className="text-slate-800">{booking.patientDetails.bookerPhone}</span>
                          <span className="text-slate-500 block truncate">{booking.patientDetails.bookerEmail}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Condition:</span>
                          <strong className="text-blue-900 font-semibold">
                            {booking.patientDetails.conditionCategory}
                          </strong>
                        </div>
                      </div>

                      {/* Chief Complaints */}
                      {booking.patientDetails.symptomsDescription && (
                        <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700">
                          <span className="font-semibold text-slate-800">Chief Symptoms: </span>
                          {booking.patientDetails.symptomsDescription}
                        </div>
                      )}

                      {/* Uploaded Reports & Google Meet */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-slate-600">
                            Reports:{' '}
                            <strong className="text-slate-900">
                              {booking.patientDetails.reports.length} files attached
                            </strong>
                          </span>
                          {booking.patientDetails.reports.map((r) => (
                            <span key={r.id} className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                              {r.name}
                            </span>
                          ))}
                        </div>

                        {booking.consultationType === 'video' && (
                          <a
                            href={booking.googleMeetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-900 hover:text-blue-950 font-semibold"
                          >
                            <span>Open Google Meet</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleResetDefaults}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Schedule Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Publish Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
