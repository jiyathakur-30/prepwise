import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import RoleSelectionPage from '../pages/RoleSelectionPage';
import InterviewInterface from '../pages/InterviewInterface';
import FeedbackDashboard from '../pages/FeedbackDashboard';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/select" element={<RoleSelectionPage />} />
      <Route path="/interview" element={<InterviewInterface />} />
      <Route path="/dashboard" element={<FeedbackDashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
