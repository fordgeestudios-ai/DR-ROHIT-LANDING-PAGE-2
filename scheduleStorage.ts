import { DoctorScheduleConfig, DaySchedule, BookingRecord, TimeSlot, ConsultationType } from '../types';

const STORAGE_KEY_CONFIG = 'dr_rohit_schedule_config_v3';
const STORAGE_KEY_BOOKINGS = 'dr_rohit_bookings_v3';

const DEFAULT_WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    dayOfWeek: 0, // Sunday
    dayName: 'Sunday',
    enabled: false,
    morningStart: '10:00',
    morningEnd: '12:00',
    eveningStart: '16:00',
    eveningEnd: '18:00',
    allowedType: 'video', // Emergency video consults only
  },
  {
    dayOfWeek: 1, // Monday
    dayName: 'Monday',
    enabled: true,
    morningStart: '09:30',
    morningEnd: '13:00',
    eveningStart: '16:30',
    eveningEnd: '19:30',
    allowedType: 'both',
  },
  {
    dayOfWeek: 2, // Tuesday
    dayName: 'Tuesday',
    enabled: true,
    morningStart: '09:30',
    morningEnd: '13:00',
    eveningStart: '16:30',
    eveningEnd: '19:30',
    allowedType: 'both',
  },
  {
    dayOfWeek: 3, // Wednesday
    dayName: 'Wednesday',
    enabled: true,
    morningStart: '09:30',
    morningEnd: '13:00',
    eveningStart: '16:30',
    eveningEnd: '19:30',
    allowedType: 'both',
  },
  {
    dayOfWeek: 4, // Thursday
    dayName: 'Thursday',
    enabled: true,
    morningStart: '09:30',
    morningEnd: '13:00',
    eveningStart: '16:30',
    eveningEnd: '19:30',
    allowedType: 'both',
  },
  {
    dayOfWeek: 5, // Friday
    dayName: 'Friday',
    enabled: true,
    morningStart: '09:30',
    morningEnd: '13:00',
    eveningStart: '16:30',
    eveningEnd: '19:30',
    allowedType: 'both',
  },
  {
    dayOfWeek: 6, // Saturday
    dayName: 'Saturday',
    enabled: true,
    morningStart: '10:00',
    morningEnd: '14:30',
    eveningStart: '16:00',
    eveningEnd: '18:30',
    allowedType: 'both',
  },
];

export const DEFAULT_DOCTOR_CONFIG: DoctorScheduleConfig = {
  doctorName: 'Dr. Rohit Madhurkar',
  title: 'Consultant Head Interventional Radiologist',
  clinicName: 'The Pinhole Clinic',
  clinicAddress: '1943, 1st Floor, 7th Main, 27th Cross, Monotype Road, Banashankari 2nd Stage, Bengaluru, Karnataka 560070',
  clinicLandmark: 'Opposite Monotype Bus Stop, Banashankari 2nd Stage',
  clinicPhone: '+91 98450 12345',
  clinicEmail: 'drrohitm@pinholeir.com',
  slotDurationMinutes: 30,
  feeVideo: 1000,
  feeInPerson: 1500,
  currency: '₹',
  upiId: 'drrohitm@okhdfcbank',
  customPaymentLink: 'https://rzp.io/l/drrohitm-consult',
  allowPayAtClinic: true,
  doctorStatus: 'available',
  statusCustomNote: 'Accepting appointments at The Pinhole Clinic (Banashankari) & Online Video Consultations.',
  adminPin: '1234',
  weeklySchedule: DEFAULT_WEEKLY_SCHEDULE,
  blockedDates: [],
  customOverrides: {},
};

export function getDoctorConfig(): DoctorScheduleConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) {
      saveDoctorConfig(DEFAULT_DOCTOR_CONFIG);
      return DEFAULT_DOCTOR_CONFIG;
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_DOCTOR_CONFIG, ...parsed };
  } catch {
    return DEFAULT_DOCTOR_CONFIG;
  }
}

export function saveDoctorConfig(config: DoctorScheduleConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save doctor config', err);
  }
}

export function getBookings(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    if (!raw) {
      const initialBookings: BookingRecord[] = [
        {
          id: 'DRM-7241',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          consultationType: 'video',
          date: getFormattedDate(1), // Tomorrow
          time: '11:00 AM',
          doctorName: 'Dr. Rohit Madhurkar',
          clinicName: 'The Pinhole Clinic',
          clinicAddress: 'Online Video Consult via Google Meet',
          patientDetails: {
            bookerName: 'Suresh Kumar',
            bookerEmail: 'suresh.kumar@example.com',
            bookerPhone: '+91 98450 12345',
            isBookingForOther: false,
            patientName: 'Suresh Kumar',
            patientAge: '48',
            patientGender: 'male',
            conditionCategory: 'Varicose Veins (Leg swelling, heaviness, prominent veins)',
            symptomsDescription: 'Severe leg heaviness and prominent dilated tortuous veins on left calf for 2 years.',
            hasPreviousSurgery: false,
            reports: [
              {
                id: 'rep-1',
                name: 'Venous_Doppler_Lower_Limb.pdf',
                size: 2450000,
                type: 'application/pdf',
                uploadDate: 'Yesterday',
              },
            ],
          },
          payment: {
            status: 'completed',
            method: 'upi',
            transactionId: 'UPI-98420174291',
            amount: 1000,
            paidAt: new Date(Date.now() - 86400000).toISOString(),
            taxAmount: 0,
          },
          googleMeetLink: 'https://meet.google.com/drm-rohit-xkp',
          calendarEventTitle: 'Video Consultation: Suresh Kumar with Dr. Rohit Madhurkar',
          status: 'confirmed',
        },
      ];
      saveBookings(initialBookings);
      return initialBookings;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveBookings(bookings: BookingRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  } catch (err) {
    console.error('Failed to save bookings', err);
  }
}

export function addBooking(booking: BookingRecord): void {
  const existing = getBookings();
  const updated = [booking, ...existing];
  saveBookings(updated);
}

export function formatDateYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getFormattedDate(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return formatDateYMD(d);
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTimeStr(totalMinutes: number): string {
  const hours24 = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${String(hours12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
}

function getPeriod(totalMinutes: number): 'morning' | 'afternoon' | 'evening' {
  if (totalMinutes < 12 * 60) return 'morning';
  if (totalMinutes < 16 * 60) return 'afternoon';
  return 'evening';
}

export function getAvailableSlotsForDate(
  dateStr: string,
  consultType: ConsultationType,
  config: DoctorScheduleConfig = getDoctorConfig(),
  bookings: BookingRecord[] = getBookings()
): { slots: TimeSlot[]; isBlocked: boolean; blockReason?: string } {
  if (config.blockedDates.includes(dateStr)) {
    return {
      slots: [],
      isBlocked: true,
      blockReason: 'Dr. Rohit is scheduled in the Angiography Suite or attending a medical symposium.',
    };
  }

  const override = config.customOverrides[dateStr];
  if (override?.isBlocked) {
    return {
      slots: [],
      isBlocked: true,
      blockReason: override.reason || 'Doctor is unavailable on this date.',
    };
  }

  if (override?.customSlots && override.customSlots.length > 0) {
    const bookedTimes = new Set(
      bookings
        .filter((b) => b.date === dateStr && b.status !== 'cancelled')
        .map((b) => b.time)
    );

    const customFiltered = override.customSlots
      .filter((s) => s.consultationType === 'both' || s.consultationType === consultType)
      .map((s) => ({
        ...s,
        isBooked: bookedTimes.has(s.time),
      }));

    return {
      slots: customFiltered,
      isBlocked: false,
    };
  }

  const dateObj = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = dateObj.getDay();
  const dayConfig = config.weeklySchedule.find((d) => d.dayOfWeek === dayOfWeek);

  if (!dayConfig || !dayConfig.enabled) {
    return {
      slots: [],
      isBlocked: true,
      blockReason: 'The Pinhole Clinic is closed on Sundays for routine sterilization. Video consultations available on emergency triage.',
    };
  }

  if (dayConfig.allowedType !== 'both' && dayConfig.allowedType !== consultType) {
    return {
      slots: [],
      isBlocked: true,
      blockReason: `Only ${dayConfig.allowedType === 'video' ? 'Video Consultations' : 'In-Person Clinic Visits'} are available on this day.`,
    };
  }

  const duration = config.slotDurationMinutes || 30;
  const bookedTimes = new Set(
    bookings
      .filter((b) => b.date === dateStr && b.status !== 'cancelled')
      .map((b) => b.time)
  );

  const slots: TimeSlot[] = [];

  // Morning Window
  if (dayConfig.morningStart && dayConfig.morningEnd) {
    let currentMin = timeToMinutes(dayConfig.morningStart);
    const endMin = timeToMinutes(dayConfig.morningEnd);
    while (currentMin + duration <= endMin) {
      const timeStr = minutesToTimeStr(currentMin);
      slots.push({
        id: `slot-m-${currentMin}`,
        time: timeStr,
        period: getPeriod(currentMin),
        consultationType: dayConfig.allowedType,
        isBooked: bookedTimes.has(timeStr),
      });
      currentMin += duration;
    }
  }

  // Evening Window
  if (dayConfig.eveningStart && dayConfig.eveningEnd) {
    let currentMin = timeToMinutes(dayConfig.eveningStart);
    const endMin = timeToMinutes(dayConfig.eveningEnd);
    while (currentMin + duration <= endMin) {
      const timeStr = minutesToTimeStr(currentMin);
      slots.push({
        id: `slot-e-${currentMin}`,
        time: timeStr,
        period: getPeriod(currentMin),
        consultationType: dayConfig.allowedType,
        isBooked: bookedTimes.has(timeStr),
      });
      currentMin += duration;
    }
  }

  return {
    slots,
    isBlocked: false,
  };
}

export function generateGoogleMeetLink(bookingId: string): string {
  const code = bookingId.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `https://meet.google.com/drm-${code.slice(0, 4)}-${Math.random().toString(36).substring(2, 6)}`;
}

export function createGoogleCalendarUrl(booking: BookingRecord): string {
  const [hoursStr, minutesStr, ampm] = booking.time.replace(/[: ]+/g, ' ').split(' ');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (ampm === 'PM' && hours < 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;

  const [year, month, day] = booking.date.split('-').map(Number);
  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + 30 * 60000);

  const formatCalTime = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const datesParam = `${formatCalTime(startDate)}/${formatCalTime(endDate)}`;
  const title = encodeURIComponent(
    booking.consultationType === 'video'
      ? `Online Video Consultation: Dr. Rohit Madhurkar & ${booking.patientDetails.patientName}`
      : `In-Person Clinic Visit: ${booking.patientDetails.patientName} at The Pinhole Clinic (Dr. Rohit Madhurkar)`
  );

  const details = encodeURIComponent(
    `Patient: ${booking.patientDetails.patientName} (${booking.patientDetails.patientAge}y, ${booking.patientDetails.patientGender})
Condition: ${booking.patientDetails.conditionCategory}
Booking ID: ${booking.id}
Doctor: Dr. Rohit Madhurkar (Interventional Radiologist)

${
  booking.consultationType === 'video'
    ? `Google Meet Link: ${booking.googleMeetLink}`
    : `Clinic Location: The Pinhole Clinic, 1943, 1st Floor, 7th Main, 27th Cross, Monotype Road, Banashankari 2nd Stage, Bengaluru`
}

Please keep your previous scans, Doppler ultrasound, MRI, or blood reports handy.`
  );

  const location = encodeURIComponent(
    booking.consultationType === 'video'
      ? booking.googleMeetLink
      : 'The Pinhole Clinic, Monotype Road, Banashankari 2nd Stage, Bengaluru'
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${datesParam}&details=${details}&location=${location}`;
}

export function downloadICSFile(booking: BookingRecord): void {
  const [hoursStr, minutesStr, ampm] = booking.time.replace(/[: ]+/g, ' ').split(' ');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (ampm === 'PM' && hours < 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;

  const [year, month, day] = booking.date.split('-').map(Number);
  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + 30 * 60000);

  const formatICSDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const summary =
    booking.consultationType === 'video'
      ? `Video Consultation with Dr. Rohit Madhurkar`
      : `In-Person Clinic Visit at The Pinhole Clinic (Dr. Rohit Madhurkar)`;

  const description = `Booking ID: ${booking.id}\\nPatient: ${booking.patientDetails.patientName}\\nCondition: ${booking.patientDetails.conditionCategory}\\n${
    booking.consultationType === 'video'
      ? `Google Meet Link: ${booking.googleMeetLink}`
      : `The Pinhole Clinic, Monotype Road, Banashankari 2nd Stage, Bengaluru`
  }`;

  const location =
    booking.consultationType === 'video'
      ? booking.googleMeetLink
      : 'The Pinhole Clinic, 1943, 1st Floor, 7th Main, 27th Cross, Monotype Road, Banashankari 2nd Stage, Bengaluru';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Pinhole Clinic - Dr Rohit Madhurkar//Appointment Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${booking.id}@drrohitm.com`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `appointment-${booking.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
