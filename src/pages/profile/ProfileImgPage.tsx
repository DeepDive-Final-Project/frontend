import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import ProgressBar from '@/components/profile/ProgressBar';
import TopNav from '@/components/profile/TopNav';
import NextButton from '@/components/profile/NextButton';
import Profile1 from '@/assets/images/profile1.svg';
import { useProfileStore } from '@/stores/useProfileStore';

const ProfileImgPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setProfileImage } = useProfileStore();

  const handleSkip = () => {
    navigate('/profile2');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const timestamp = Date.now();
      const randomId = Math.floor(Math.random() * 10000);
      const extension = file.name.split('.').pop();
      const imgUrl = `/uploads/${timestamp}_${randomId}.${extension}`;
      setProfileImage(imgUrl);
      console.log('임시 이미지 URL:', imgUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden tablet:flex flex-grow"></div>
        <div className="w-full tablet:w-[320px] desktop:w-[375px] desktop:mx-20 min-h-screen flex flex-col items-center">
          <TopNav />
          <ProgressBar currentStep={1} />
          <header className="py-[20px]">
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              Your Profile
            </div>
            <div className="text-center mobile:text-[24px]">
              프로필 이미지를 등록합니다.
            </div>
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              회원님은 어떤 모습인가요?
            </div>
          </header>

          <main className="flex-grow flex flex-col justify-center items-center gap-4">
            <img src={Profile1} alt="profile" className="w-96 h-96" />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </main>

          <footer className="w-full tablet:w-[320px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center">
            <NextButton
              text={'프로필 이미지 선택하기'}
              onClick={triggerFileInput}
            />
            <div
              className="mt-2 text-[#B7B9BD] cursor-pointer"
              onClick={handleSkip}>
              프로필 이미지 건너뛰기
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ProfileImgPage;
