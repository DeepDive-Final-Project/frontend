import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileImgPage from './pages/profile/ProfileImgPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/profile1" element={<ProfileImgPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
