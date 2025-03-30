import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ChatPage from '@/pages/ChatPage';
import LoginPage from '@/pages/LoginPage';
import ProfileImgPage from '@/pages/profile/ProfileImgPage';
import ProfileInfoPage from '@/pages/profile/ProfileInfoPage';
import ProfileJobPage from '@/pages/profile/ProfileJobPage';
import ProfileLinkPage from '@/pages/profile/ProfileLinkPage';
import ProfileInterestPage from '@/pages/profile/ProfileInterestPage';
import ProfileIntroPage from '@/pages/profile/ProfileIntroPage';
import LocationPage from '@/pages/LocationPage';
import TestPage from '@/pages/TestPage';
import ProfileLayout from "@/pages/profile/layout/ProfileLayout.tsx";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfileLayout />} >
            <Route path="1" element={<ProfileImgPage />} />
            <Route path="2" element={<ProfileInfoPage />} />
            <Route path="3" element={<ProfileJobPage />} />
            <Route path="4" element={<ProfileInterestPage />} />
            <Route path="5" element={<ProfileLinkPage />} />
            <Route path="6" element={<ProfileIntroPage />} />
          </Route>
          <Route path="/home" element={<LocationPage />} />
          <Route path="/" element={<LocationPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          hideProgressBar={true}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </Router>
    </>
  );
}
