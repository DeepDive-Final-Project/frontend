import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TopNav from '@/components/profile/TopNav';
import ProgressBar from '@/components/profile/ProgressBar';
import NextButton from '@/components/profile/NextButton';
import InputField from '@/components/profile/InputField';
import InputFieldLabel from '@/components/profile/InputFieldLabel';
import { useProfileStore } from '@/stores/useProfileStore';

const ProfileInfoPage = () => {
  const navigate = useNavigate();

  const { name, email, setName, setEmail } = useProfileStore();
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    setLocalName(name);
    setLocalEmail(email);
  }, [name, email]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === '' || emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handleSkip = () => {
    if (!canProceed) return;
    setName(localName);
    setEmail(localEmail);
    navigate('/profile/3');
  };

  const canProceed =
    localName.trim() !== '' && localEmail.trim() !== '' && isEmailValid;

  return (
    <div className="w-full max-w-full tablet:w-[360px] desktop:w-[375px] flex flex-col flex-grow justify-between">
      <TopNav />
      <ProgressBar currentStep={2} />

      <header className="py-[20px] text-center">
        <div className="text-[16px] text-[#cccccc]">About You</div>
        <div className="text-[24px]">기본 정보를 등록합니다.</div>
        <div className="text-[16px] text-[#cccccc]">
          멋진 이름과 함께 이메일을 알려주세요.
        </div>
      </header>

      <main className="flex flex-col items-center px-4 w-full flex-grow">
        <InputFieldLabel textLabel="나의 이름은" />
        <InputField
          type="text"
          placeholder="본명 혹은 닉네임을 입력하세요"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
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
          value={localEmail}
          onChange={handleEmailChange}
        />
        {!isEmailValid && (
          <p className="text-red-500 text-sm mt-1 w-full text-left">
            이메일 형식이 아닙니다
          </p>
        )}
      </main>

      <footer className="w-full tablet:w-[360px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center desktop:pb-60">
        <NextButton
          text="다음으로 진행하기"
          onClick={handleSkip}
          disabled={!canProceed}
        />
      </footer>
    </div>
  );
};

export default ProfileInfoPage;
