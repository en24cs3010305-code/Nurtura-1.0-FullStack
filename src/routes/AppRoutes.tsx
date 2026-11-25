import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { ParentLayout } from '../layouts/ParentLayout';
import { DoctorLayout } from '../layouts/DoctorLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { FeaturesPage } from '../pages/public/FeaturesPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { AiAssistantPage } from '../pages/public/AiAssistantPage';
import { ForParentsPage } from '../pages/public/ForParentsPage';
import { ForDoctorsPage } from '../pages/public/ForDoctorsPage';
import { ContactPage } from '../pages/public/ContactPage';
import { FaqPage } from '../pages/public/FaqPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage';
import { EmailVerificationPage } from '../pages/auth/EmailVerificationPage';
import { DoctorVerificationPendingPage } from '../pages/auth/DoctorVerificationPendingPage';

// Parent Portal Pages
import { ParentOverviewPage } from '../pages/parent/ParentOverviewPage';
import { MyBabiesPage } from '../pages/parent/MyBabiesPage';
import { HealthTimelinePage } from '../pages/parent/HealthTimelinePage';
import { GrowthTrackerPage } from '../pages/parent/GrowthTrackerPage';
import { FeedingTrackerPage } from '../pages/parent/FeedingTrackerPage';
import { SleepTrackerPage } from '../pages/parent/SleepTrackerPage';
import { DiaperTrackerPage } from '../pages/parent/DiaperTrackerPage';
import { VaccinationsPage } from '../pages/parent/VaccinationsPage';
import { MilestonesPage } from '../pages/parent/MilestonesPage';
import { MedicationRemindersPage } from '../pages/parent/MedicationRemindersPage';
import { ParentAppointmentsPage } from '../pages/parent/ParentAppointmentsPage';
import { ParentMessagesPage } from '../pages/parent/ParentMessagesPage';
import { ParentAiChatPage } from '../pages/parent/ParentAiChatPage';
import { MedicalReportsPage } from '../pages/parent/MedicalReportsPage';
import { FamilyAccessPage } from '../pages/parent/FamilyAccessPage';
import { ParentNotificationsPage } from '../pages/parent/ParentNotificationsPage';
import { ParentSettingsPage } from '../pages/parent/ParentSettingsPage';

// Doctor Portal Pages
import { DoctorDashboardPage } from '../pages/doctor/DoctorDashboardPage';
import { DoctorPatientsPage } from '../pages/doctor/DoctorPatientsPage';
import { DoctorAppointmentsPage } from '../pages/doctor/DoctorAppointmentsPage';
import { DoctorGrowthReportsPage } from '../pages/doctor/DoctorGrowthReportsPage';
import { DoctorClinicalNotesPage } from '../pages/doctor/DoctorClinicalNotesPage';
import { DoctorPrescriptionsPage } from '../pages/doctor/DoctorPrescriptionsPage';
import { DoctorHealthAlertsPage } from '../pages/doctor/DoctorHealthAlertsPage';
import { DoctorMessagesPage } from '../pages/doctor/DoctorMessagesPage';
import { DoctorAiSummariesPage } from '../pages/doctor/DoctorAiSummariesPage';
import { DoctorProfilePage } from '../pages/doctor/DoctorProfilePage';
import { DoctorSettingsPage } from '../pages/doctor/DoctorSettingsPage';

// Admin Portal Pages
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminVerificationsPage } from '../pages/admin/AdminVerificationsPage';
import { AdminAuditLogsPage } from '../pages/admin/AdminAuditLogsPage';
import { AdminAnalyticsPage } from '../pages/admin/AdminAnalyticsPage';
import { AdminSupportPage } from '../pages/admin/AdminSupportPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. PUBLIC WEBSITE & AUTH ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/ai-assistant" element={<AiAssistantPage />} />
        <Route path="/for-parents" element={<ForParentsPage />} />
        <Route path="/for-doctors" element={<ForDoctorsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />

        {/* Auth Screens */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="/doctor-verification-pending" element={<DoctorVerificationPendingPage />} />
      </Route>

      {/* 2. PARENT PORTAL */}
      <Route
        path="/parent"
        element={
          <ProtectedRoute allowedRoles={['parent']}>
            <ParentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ParentOverviewPage />} />
        <Route path="babies" element={<MyBabiesPage />} />
        <Route path="timeline" element={<HealthTimelinePage />} />
        <Route path="growth" element={<GrowthTrackerPage />} />
        <Route path="feeding" element={<FeedingTrackerPage />} />
        <Route path="sleep" element={<SleepTrackerPage />} />
        <Route path="diaper" element={<DiaperTrackerPage />} />
        <Route path="vaccinations" element={<VaccinationsPage />} />
        <Route path="milestones" element={<MilestonesPage />} />
        <Route path="medications" element={<MedicationRemindersPage />} />
        <Route path="appointments" element={<ParentAppointmentsPage />} />
        <Route path="messages" element={<ParentMessagesPage />} />
        <Route path="ai" element={<ParentAiChatPage />} />
        <Route path="reports" element={<MedicalReportsPage />} />
        <Route path="family" element={<FamilyAccessPage />} />
        <Route path="notifications" element={<ParentNotificationsPage />} />
        <Route path="settings" element={<ParentSettingsPage />} />
      </Route>

      {/* 3. DOCTOR PORTAL */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorDashboardPage />} />
        <Route path="patients" element={<DoctorPatientsPage />} />
        <Route path="requests" element={<DoctorAppointmentsPage />} />
        <Route path="records" element={<DoctorPatientsPage />} />
        <Route path="growth-reports" element={<DoctorGrowthReportsPage />} />
        <Route path="appointments" element={<DoctorAppointmentsPage />} />
        <Route path="clinical-notes" element={<DoctorClinicalNotesPage />} />
        <Route path="prescriptions" element={<DoctorPrescriptionsPage />} />
        <Route path="alerts" element={<DoctorHealthAlertsPage />} />
        <Route path="messages" element={<DoctorMessagesPage />} />
        <Route path="ai-summaries" element={<DoctorAiSummariesPage />} />
        <Route path="profile" element={<DoctorProfilePage />} />
        <Route path="settings" element={<DoctorSettingsPage />} />
      </Route>

      {/* 4. ADMINISTRATOR PORTAL */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="parents" element={<AdminUsersPage />} />
        <Route path="doctors" element={<AdminVerificationsPage />} />
        <Route path="verifications" element={<AdminVerificationsPage />} />
        <Route path="babies" element={<AdminDashboardPage />} />
        <Route path="appointments" element={<AdminDashboardPage />} />
        <Route path="support" element={<AdminSupportPage />} />
        <Route path="notifications" element={<AdminDashboardPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
        <Route path="security" element={<AdminSettingsPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
