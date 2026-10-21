import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the online video consultation with Dr. Rohit Madhurkar work?',
      a: 'After you select a slot and complete booking, a secure Google Meet link is automatically created and sent to your email and WhatsApp, along with an "Add to Google Calendar" button and .ics file. At the scheduled time, click the Google Meet link from your phone or laptop. Dr. Rohit will join, review your symptoms, share scans on screen, and issue an official digital clinical summary.',
    },
    {
      q: 'How should I share my previous MRI, CT scans, or Doppler ultrasound reports?',
      a: 'You can upload PDF or image reports directly in Step 3 of our booking flow. If you have DICOM files, CD scan images, or large MRI archives, Dr. Rohit will also review them live during the Google Meet call via screen share, or you can send them to the clinic coordinator on WhatsApp.',
    },
    {
      q: 'Are pinhole interventional radiology procedures covered by health insurance?',
      a: 'Yes. Major pinhole procedures—including Endovenous Laser Varicose Vein Treatment, Uterine Fibroid Embolization (UFE), Prostate Artery Embolization (PAE), and Varicocele Coil Embolization—are standard daycare medical procedures covered under most Indian health insurance plans and international medical policies with cashless processing at Apollo Hospitals.',
    },
    {
      q: 'What if Dr. Rohit gets called into an emergency surgery in the Angiography Suite?',
      a: 'If an emergency intervention requires schedule adjustment, the clinic coordinator immediately reaches out to you, and the doctor’s schedule is updated in real time. You will receive priority alternative slots or a 100% instant refund if preferred.',
    },
    {
      q: 'What is the cancellation and refund policy?',
      a: 'We offer a guaranteed 100% full refund on any cancellation made at least 4 hours prior to your scheduled slot. The full consultation amount is refunded directly to your original source account via Razorpay with zero deduction. You can also reschedule your appointment to any other open date or time with zero penalty.',
    },
    {
      q: 'I am told I need an open hysterectomy or vein stripping. Can I get an honest second opinion?',
      a: 'Absolutely. A substantial portion of Dr. Rohit’s practice involves evaluating patients who wish to preserve their organs and avoid open surgical trauma. He will clearly outline whether you are an ideal candidate for pinhole embolization or laser therapy.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold text-blue-900 tracking-wider uppercase mb-2">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Everything You Need to Know About Booking
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Clear answers on video consultation setup, visiting The Pinhole Clinic in Bengaluru, scan reviews, and treatment planning.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
