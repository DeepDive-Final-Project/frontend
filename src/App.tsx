import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from '@/pages/Chat';
import ChatProfile from '@/pages/ChatProfile';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatProfile" element={<ChatProfile />} />
      </Routes>
    </Router>
  );
}
