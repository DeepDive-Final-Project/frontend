import ProgressBar from '@/components/profile/ProgressBar';
import TopNav from '@/components/profile/TopNav';
import NextButton from '../../components/profile/NextButton';

const ProfileImgPage = () => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
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

        <main>
          <div className="fixed bottom-0 left-0 w-full flex flex-col items-center pb-6">
            <NextButton text={'프로필 이미지 선택하기'} />
            <div className="mt-2 text-[#B7B9BD]">프로필 이미지 건너뛰기</div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfileImgPage;
