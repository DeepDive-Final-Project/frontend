import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import ChatProfile from '@/components/common/ChatProfile.tsx';
import Layout from '@/components/layout/Layout';
import LogoOnlyNav from '@/components/layout/headers/LogoOnlyNav';
import CommonNav from '@/components/layout/headers/CommonNav';
import BackNav from '@/components/layout/headers/BackNav';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* 랜딩 페이지 */}
          <Route path="/" element={<LandingPage />} />

          {/* logo only Nav */}
          <Route element={<Layout nav={<LogoOnlyNav />} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfileLayout />}>
              <Route path="1" element={<ProfileImgPage />} />
              <Route path="2" element={<ProfileInfoPage />} />
              <Route path="3" element={<ProfileJobPage />} />
              <Route path="4" element={<ProfileInterestPage />} />
              <Route path="5" element={<ProfileLinkPage />} />
              <Route path="6" element={<ProfileIntroPage />} />
            </Route>
          </Route>

          {/* back Nav: title */}
          <Route element={<Layout nav={<BackNav title="내 계정" />} />}>
            <Route path="/editmy" element={<EditMyPage />} />
          </Route>
          <Route element={<Layout nav={<BackNav />} />}>
            <Route
              path="/profilePreview/:otherId"
              element={<ProfilePreviewPage />}
            />
          </Route>

          {/* default Nav */}
          <Route element={<Layout nav={<CommonNav />} />}>
            <Route path="/home" element={<LocationPage />} />
            <Route path="/chatProfile" element={<ChatProfile />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
        </Routes>

        <ToastContainer
          position="top-left"
          autoClose={1500}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          icon={false}
          closeButton={false}
          toastClassName={() =>
            'mt-4 ml-4 !w-[calc(100%-2rem)] tablet:!w-[300px] tablet:!mt-0 tablet:!ml-0 desktop:!mt-0 desktop:ml-0 cursor-pointer rounded-sm border border-[#5A5C63] bg-[#262627] text-sm px-4 py-3 shadow-none'
          }
        />
      </Router>
    </>
  );
}
