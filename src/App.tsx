import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ChatPage from '@/pages/ChatPage';
import LoginPage from '@/pages/LoginPage';
import ProfileImgPage from '@/pages/profile/ProfileImgPage';
import ProfileInfoPage from '@/pages/profile/ProfileInfoPage';
import ProfileJobPage from '@/pages/profile/ProfileJobPage';
import LocationPage from '@/pages/LocationPage';
import TestPage from '@/pages/TestPage';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile1" element={<ProfileImgPage />} />
          <Route path="/profile2" element={<ProfileInfoPage />} />
          <Route path="/profile3" element={<ProfileJobPage />} />
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
