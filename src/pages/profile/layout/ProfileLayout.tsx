import { Outlet } from 'react-router-dom';
import OnboardingContents from '@/components/profile/OnboardingContents.tsx';

const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden tablet:flex flex-grow">
        <OnboardingContents />
      </div>
      <div className="w-full tablet:w-[320px] desktop:w-[375px] desktop:mx-20 min-h-screen flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
