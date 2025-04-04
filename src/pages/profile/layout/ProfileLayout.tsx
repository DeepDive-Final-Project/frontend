import { Outlet } from 'react-router-dom';
import OnboardingContents from '@/components/profile/OnboardingContents.tsx';

const ProfileLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div
        className="flex w-full overflow-hidden"
        style={{ height: 'calc(100vh - 64px)' }}>
        <div className="hidden tablet:flex flex-grow basis-0 min-w-0 overflow-hidden desktop:ml-20">
          <OnboardingContents />
        </div>

        <div
          className="
            w-full max-w-full
            tablet:w-[360px] desktop:w-[375px] mx-0 desktop:mx-20 tablet:mt-12
            flex flex-col overflow-auto
        ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
