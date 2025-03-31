import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import ProgressBar from '@/components/profile/ProgressBar';
import TopNav from '@/components/profile/TopNav';
import NextButton from '@/components/profile/NextButton';
import InputFieldLabel from '@/components/profile/InputFieldLabel';
import { useProfileStore } from '@/stores/useProfileStore';
import axios from 'axios';

const ProfileIntroPage = () => {
  const navigate = useNavigate();
  const [intro, setIntro] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    name,
    email,
    role,
    career,
    links,
    interests,
    setIntro: setIntroGlobal,
  } = useProfileStore();

  const handleSubmit = async () => {
    try {
      setIntroGlobal(intro);

      const formData = new FormData();

      const imageUrl = useProfileStore.getState().profileImage;
      if (imageUrl) {
        formData.append('profileImage', imageUrl);
      }

      const userData = {
        nickName: name,
        email,
        role,
        career,
        introduction: intro,
        links: links.map((l) => ({
          title: l.title,
          link: l.url,
        })),
        topic1: interests[0]?.key || '',
        topic2: interests[1]?.key || '',
        topic3: interests[2]?.key || '',
        provider: 'kakao',
      };

      formData.append('userData', JSON.stringify(userData));

      console.log('FormData:', {
        profileImage: imageUrl,
        userData,
      });

      await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/client/profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      navigate('/home');
    } catch (error) {
      console.error('등록 실패', error);
    }
  };

  return (
    <>
      <div className="w-full max-w-full tablet:w-[360px] desktop:w-[375px] flex flex-col flex-grow justify-between">
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
            <span className="text-[#E6E6E6]">현재 {intro.length}자</span>{' '}
            <span className="text-[#66A1F8]">| 최대 200자</span>
          </div>
        </main>

        <footer className="w-full tablet:w-[360px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center desktop:pb-60">
          <NextButton text={'작성완료'} onClick={handleSubmit} />
        </footer>
      </div>
    </>
  );
};

export default ProfileIntroPage;
