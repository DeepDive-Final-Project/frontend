import TopNav from '@/components/profile/TopNav';
import ProgressBar from '@/components/profile/ProgressBar';
import NextButton from '@/components/profile/NextButton';
import InputFieldLabel from '@/components/profile/InputFieldLabel';
import Dropdown from '@/components/profile/DropDown';

const ProfileJobPage = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden tablet:flex flex-grow"></div>
        <div className="w-full tablet:w-[320px] desktop:w-[375px] desktop:mx-20 min-h-screen flex flex-col items-center">
          <TopNav />
          <ProgressBar currentStep={3} />
          <header className="py-[20px]">
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              About You
            </div>
            <div className="text-center mobile:text-[24px]">
              무엇을 하고 계신가요
            </div>
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              조금 더 알려주세요
            </div>
          </header>

          <main className="flex flex-col items-center px-4 w-full flex-grow gap-4">
            <InputFieldLabel textLabel="나의 직무는" />
            <Dropdown
              label="직무를 선택해주세요"
              onSelect={(role) => console.log('선택된 역할:', role)}
            />
          </main>

          <footer className="w-full tablet:w-[320px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center">
            <NextButton text={'다음으로 진행하기'} />
            <div className="h-[42px]" />
          </footer>
        </div>
      </div>
    </>
  );
};

export default ProfileJobPage;
