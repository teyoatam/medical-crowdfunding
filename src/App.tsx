import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CampaignsPage from './pages/CampaignsPage'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import StartCampaignPage from './pages/StartCampaignPage'
import DonorDashboardPage from './pages/DonorDashboardPage'
import DonorProfilePage from './pages/DonorProfilePage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminCampaignDetailPage from './pages/AdminCampaignDetailPage'
import CampaignDetailPage from './pages/CampaignDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/campaigns" element={<CampaignsPage />} />
      <Route path="/campaign/:id" element={<CampaignDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/start-campaign" element={<StartCampaignPage />} />
      <Route path="/donor/dashboard" element={<DonorDashboardPage />} />
      <Route path="/donor/profile" element={<DonorProfilePage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/campaigns/:id" element={<AdminCampaignDetailPage />} />
    </Routes>
  )
}

export default App
