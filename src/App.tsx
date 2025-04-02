import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from '@/pages/ChatPage';
import ChatProfile from '@/components/common/ChatProfile.tsx';

import { ToastContainer } from 'react-toastify';
import ChatPage from '@/pages/ChatPage';
import LoginPage from '@/pages/profile/LoginPage.tsx';
import ProfileImgPage from '@/pages/profile/ProfileImgPage';
import ProfileInfoPage from '@/pages/profile/ProfileInfoPage';
import ProfileJobPage from '@/pages/profile/ProfileJobPage';
import ProfileLinkPage from '@/pages/profile/ProfileLinkPage';
import ProfileInterestPage from '@/pages/profile/ProfileInterestPage';
import ProfileIntroPage from '@/pages/profile/ProfileIntroPage';
import LocationPage from '@/pages/LocationPage';
import TestPage from '@/pages/TestPage';
import ProfileLayout from '@/pages/profile/layout/ProfileLayout.tsx';
import LandingPage from '@/pages/LandingPage.tsx';
import EditMyPage from '@/pages/EditMyPage.tsx';
import ProfilePreviewPage from '@/pages/ProfilePreviewPage';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route path="1" element={<ProfileImgPage />} />
            <Route path="2" element={<ProfileInfoPage />} />
            <Route path="3" element={<ProfileJobPage />} />
            <Route path="4" element={<ProfileInterestPage />} />
            <Route path="5" element={<ProfileLinkPage />} />
            <Route path="6" element={<ProfileIntroPage />} />
          </Route>
          <Route path="/home" element={<LocationPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/editmy" element={<EditMyPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatProfile" element={<ChatProfile />} />
          <Route
            path="/profilePreview/:otherId"
            element={<ProfilePreviewPage />}
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          icon={false}
          closeButton={false}
          toastClassName={() =>
            'rounded-sm border border-[#5A5C63] bg-[#262627] text-sm px-4 py-3 shadow-none'
          }
        />
      </Router>
    </>
  );
}
