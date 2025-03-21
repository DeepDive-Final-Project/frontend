import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from '@/pages/Chat';
import ProfileImgPage from '@/pages/profile/ProfileImgPage';
import ProfileInfoPage from '@/pages/profile/ProfileInfoPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile1" element={<ProfileImgPage />} />
        <Route path="/profile2" element={<ProfileInfoPage />} />
      </Routes>
    </Router>
  );
}
