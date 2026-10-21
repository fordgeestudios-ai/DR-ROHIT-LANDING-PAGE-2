/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InstagramVideosSection } from './components/InstagramVideosSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { PinholeAdvantage } from './components/PinholeAdvantage';
import { DoctorCredentials } from './components/DoctorCredentials';
import { PatientReviews } from './components/PatientReviews';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingFlow/BookingModal';
import { DoctorScheduleModal } from './components/DoctorScheduleModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import {
  DoctorScheduleConfig,
  BookingRecord,
  ConsultationType,
} from './types';
import {
  getDoctorConfig,
  saveDoctorConfig,
  getBookings,
  saveBookings,
} from './utils/scheduleStorage';

export default function App() {
  const [doctorConfig, setDoctorConfig] = useState<DoctorScheduleConfig>(() => getDoctorConfig());
  const [bookings, setBookings] = useState<BookingRecord[]>(() => getBookings());

  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedConsultType, setSelectedConsultType] = useState<ConsultationType>('video');
  const [preselectedCondition, setPreselectedCondition] = useState<string>('');

  // Admin access state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);
  const [isDoctorScheduleModalOpen, setIsDoctorScheduleModalOpen] = useState<boolean>(false);

  const handleSaveConfig = (updated: DoctorScheduleConfig) => {
    saveDoctorConfig(updated);
    setDoctorConfig(updated);
  };

  const handleBookingCreated = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (id: string, status: 'confirmed' | 'cancelled' | 'rescheduled') => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    saveBookings(updated);
    setBookings(updated);
  };

  const openBookingWithConfig = (type: ConsultationType = 'video', condition: string = '') => {
    setSelectedConsultType(type);
    setPreselectedCondition(condition);
    setIsBookingModalOpen(true);
  };

  const handleOpenAdminPortal = () => {
    if (isAdminLoggedIn) {
      setIsDoctorScheduleModalOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminLoginModalOpen(false);
    setIsDoctorScheduleModalOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsDoctorScheduleModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header with Top Bar Contract in Royal Navy */}
      <Header
        onOpenBooking={(type) => openBookingWithConfig(type || 'video')}
        onOpenAdminLogin={handleOpenAdminPortal}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogout={handleAdminLogout}
        doctorConfig={doctorConfig}
      />

      <main className="flex-1">
        {/* Hero Section with Doctor Image & Dual Consultation Selector */}
        <Hero
          doctorConfig={doctorConfig}
          onBook={(type) => openBookingWithConfig(type)}
          onOpenAdminLogin={handleOpenAdminPortal}
        />

        {/* Educational Instagram Videos & Clinical Case Reels */}
        <InstagramVideosSection
          onBookConsultation={(type) => openBookingWithConfig(type || 'video')}
        />

        {/* Treatments Section */}
        <TreatmentsSection
          onSelectTreatmentForBooking={(condition) =>
            openBookingWithConfig('video', condition)
          }
        />

        {/* Pinhole Interventional Radiology vs Open Surgery */}
        <PinholeAdvantage
          onBook={(type) => openBookingWithConfig(type)}
        />

        {/* Doctor Bio, Photo & Credentials */}
        <DoctorCredentials
          onBook={(type) => openBookingWithConfig(type)}
        />

        {/* Patient Outcomes & Verified Proof */}
        <PatientReviews />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminLogin={handleOpenAdminPortal}
        onOpenBooking={() => openBookingWithConfig('video')}
        doctorConfig={doctorConfig}
      />

      {/* 5-Step Interactive Patient Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialType={selectedConsultType}
          initialCondition={preselectedCondition}
          config={doctorConfig}
          bookings={bookings}
          onBookingCreated={handleBookingCreated}
        />
      )}

      {/* Clinic Admin & Doctor PIN Login Modal */}
      {isAdminLoginModalOpen && (
        <AdminLoginModal
          isOpen={isAdminLoginModalOpen}
          onClose={() => setIsAdminLoginModalOpen(false)}
          onSuccess={handleAdminLoginSuccess}
          correctPin={doctorConfig.adminPin || '1234'}
        />
      )}

      {/* Doctor & Clinic Timing Management Modal (Admin Authenticated) */}
      {isDoctorScheduleModalOpen && (
        <DoctorScheduleModal
          isOpen={isDoctorScheduleModalOpen}
          onClose={() => setIsDoctorScheduleModalOpen(false)}
          config={doctorConfig}
          onSaveConfig={handleSaveConfig}
          bookings={bookings}
          onUpdateBookingStatus={handleUpdateBookingStatus}
        />
      )}
    </div>
  );
}
