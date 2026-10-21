export type ConsultationType = 'video' | 'in_person';

export interface TimeSlot {
  id: string;
  time: string; // e.g. "10:00 AM"
  period: 'morning' | 'afternoon' | 'evening';
  consultationType: 'both' | 'video' | 'in_person';
  isBooked?: boolean;
}

export interface DaySchedule {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  dayName: string;
  enabled: boolean;
  morningStart: string; // "09:30"
  morningEnd: string; // "13:00"
  eveningStart: string; // "16:30"
  eveningEnd: string; // "20:00"
  allowedType: 'both' | 'video' | 'in_person';
}

export interface DoctorScheduleConfig {
  doctorName: string;
  title: string;
  clinicName: string;
  clinicAddress: string;
  clinicLandmark: string;
  clinicPhone: string;
  clinicEmail: string;
  slotDurationMinutes: number;
  feeVideo: number;
  feeInPerson: number;
  currency: string;
  upiId: string;
  customPaymentLink?: string; // Optional Razorpay / Payment gateway link
  allowPayAtClinic: boolean;
  doctorStatus: 'available' | 'in_surgery' | 'on_rounds' | 'on_leave';
  statusCustomNote: string;
  adminPin: string;
  weeklySchedule: DaySchedule[];
  blockedDates: string[]; // YYYY-MM-DD
  customOverrides: {
    [dateStr: string]: {
      isBlocked?: boolean;
      customSlots?: TimeSlot[];
      reason?: string;
    };
  };
}

export interface UploadedReport {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
}

export interface BookingPatientDetails {
  bookerName: string;
  bookerEmail: string;
  bookerPhone: string;
  isBookingForOther: boolean;
  patientName: string;
  patientRelation?: string;
  patientAge: string;
  patientGender: 'male' | 'female' | 'other';
  conditionCategory: string;
  symptomsDescription: string;
  hasPreviousSurgery: boolean;
  previousSurgeryDetails?: string;
  reports: UploadedReport[];
}

export interface BookingPayment {
  status: 'completed' | 'pending_clinic_payment';
  method: 'upi' | 'card' | 'netbanking' | 'pay_at_clinic' | 'gateway_link';
  transactionId: string;
  amount: number;
  paidAt: string;
  taxAmount: number;
}

export interface BookingRecord {
  id: string; // e.g. DRM-8921
  createdAt: string;
  consultationType: ConsultationType;
  date: string; // YYYY-MM-DD
  time: string; // "10:30 AM"
  doctorName: string;
  clinicName: string;
  clinicAddress: string;
  patientDetails: BookingPatientDetails;
  payment: BookingPayment;
  googleMeetLink: string;
  calendarEventTitle: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  notesByDoctor?: string;
}
