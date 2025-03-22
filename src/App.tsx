import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from '@/pages/ChatPage';
import ProfileImgPage from '@/pages/profile/ProfileImgPage';
import ProfileInfoPage from '@/pages/profile/ProfileInfoPage';
import LocationPage from './pages/LocationPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile1" element={<ProfileImgPage />} />
        <Route path="/profile2" element={<ProfileInfoPage />} />
        <Route path="/" element={<LocationPage />} />
      </Routes>
    </Router>
  );
}
