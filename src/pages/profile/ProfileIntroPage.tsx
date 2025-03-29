import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import ProgressBar from '@/components/profile/ProgressBar';
import TopNav from '@/components/profile/TopNav';
import NextButton from '@/components/profile/NextButton';
import InputFieldLabel from '@/components/profile/InputFieldLabel';

const ProfileIntroPage = () => {
  const navigate = useNavigate();
  const [intro, setIntro] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSkip = () => {
    navigate('/home');
  };

  const handleSubmit = () => {
    console.log('작성한 자기소개:', intro);
    navigate('/home');
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden tablet:flex flex-grow"></div>
      <div className="w-full tablet:w-[320px] desktop:w-[375px] desktop:mx-20 min-h-screen flex flex-col items-center">
        <TopNav />
        <ProgressBar currentStep={6} />
        <header className="py-[20px]">
          <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
            About You
          </div>
          <div className="text-center mobile:text-[24px]">마지막이에요</div>
          <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
            자기소개를 한다면?
          </div>
        </header>

        <main className="flex flex-col items-center px-4 w-full flex-grow gap-2">
          <InputFieldLabel textLabel="한마디 한다면" />

          <textarea
            ref={textareaRef}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                textareaRef.current?.blur();
              }
            }}
            maxLength={200}
            rows={5}
            placeholder="자유롭게 작성해주세요 (최대 200자)"
            className="w-full bg-[#0F0F10] text-[#A2A4AA] text-[14px] p-3 rounded-sm border border-transparent 
              focus:border-[#2C7DF6] focus:outline-none resize-none custom-scrollbar"
          />
          <div className="text-right w-full text-xs">
            <span className="text-[#E6E6E6">현재 {intro.length}자</span>{' '}
            <span className="text-[#66A1F8]">| 최대 200자</span>
          </div>
        </main>

        <footer className="w-full tablet:w-[320px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center">
          <NextButton text={'작성완료'} onClick={handleSubmit} />
          <div
            className="mt-2 text-[#B7B9BD] cursor-pointer"
            onClick={handleSkip}>
            건너뛰기
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfileIntroPage;
