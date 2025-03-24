import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ChatPage from '@/pages/ChatPage';
import ProfileImgPage from '@/pages/profile/ProfileImgPage';
import ProfileInfoPage from '@/pages/profile/ProfileInfoPage';
import LocationPage from '@/pages/LocationPage';
import TestPage from '@/pages/TestPage';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile1" element={<ProfileImgPage />} />
          <Route path="/profile2" element={<ProfileInfoPage />} />
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
