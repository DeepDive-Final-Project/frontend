import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from '@/pages/Chat';
import ProfileImgPage from '@/pages/profile/ProfileImgPage';
import ProfileInfoPage from '@/pages/profile/ProfileInfoPage';
import Location from './pages/Location';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile1" element={<ProfileImgPage />} />
        <Route path="/profile2" element={<ProfileInfoPage />} />
        <Route path="/" element={<Location />} />
      </Routes>
    </Router>
  );
}
