import { useNavigate } from 'react-router-dom';
import TopNav from '@/components/profile/TopNav';
import ProgressBar from '@/components/profile/ProgressBar';
import NextButton from '@/components/profile/NextButton';
import InputField from '@/components/profile/InputField';
import InputFieldLabel from '@/components/profile/InputFieldLabel';

const ProfileInfoPage = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('/profile3');
  };
  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden tablet:flex flex-grow"></div>
        <div className="w-full tablet:w-[320px] desktop:w-[375px] desktop:mx-20 min-h-screen flex flex-col items-center">
          <TopNav />
          <ProgressBar currentStep={2} />
          <header className="py-[20px]">
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              About You
            </div>
            <div className="text-center mobile:text-[24px]">
              기본 정보를 등록합니다.
            </div>
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              멋진 이름과 함께 이메일을 알려주세요.
            </div>
          </header>

          <main className="flex flex-col items-center px-4 w-full flex-grow">
            <InputFieldLabel textLabel="나의 이름은" />
            <InputField
              type="text"
              placeholder="본명 혹은 닉네임을 입력하세요"
            />
            <div className="h-6" />

            <InputFieldLabel
              textLabel="나의 이메일은"
              rightText="| 미기입시 가입하신 소셜로그인으로 등록됩니다"
            />
            <InputField
              type="email"
              placeholder="abc@kakao.com"
              isRequired={false}
            />
          </main>

          <footer className="w-full tablet:w-[320px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center">
            <NextButton text={'다음으로 진행하기'} onClick={handleSkip} />
            <div className="h-[42px]" />
          </footer>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoPage;
