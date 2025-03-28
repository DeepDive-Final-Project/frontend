import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TopNav from '@/components/profile/TopNav';
import ProgressBar from '@/components/profile/ProgressBar';
import NextButton from '@/components/profile/NextButton';
import InputFieldLabel from '@/components/profile/InputFieldLabel';
import LinkInput from '@/components/profile/LinkInput';
import { Plus, Minus } from 'react-feather';

const ProfileLinkPage = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([{ title: '', url: '' }]);
  const [isAdding, setIsAdding] = useState<number | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleAddLink = () => {
    if (links.length < 2) {
      setLinks([...links, { title: '', url: '' }]);
      setIsAdding(1);
      setTimeout(() => setIsAdding(null), 200);
    }
  };

  const handleRemoveLink = () => {
    if (links.length > 1) {
      setIsRemoving(true);
      setTimeout(() => {
        setLinks(links.slice(0, 1));
        setIsRemoving(false);
      }, 300);
    }
  };

  const handleSkip = () => {
    navigate('/profile3');
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden tablet:flex flex-grow"></div>
      <div className="w-full tablet:w-[375px] desktop:w-[375px] desktop:mx-20 min-h-screen flex flex-col items-center">
        <TopNav />
        <ProgressBar currentStep={5} />

        <header className="py-[20px]">
          <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
            About You
          </div>
          <div className="text-center mobile:text-[24px]">나의 링크</div>
          <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
            대표하는 링크를 추가해보세요
          </div>
        </header>

        <main className="flex flex-col items-center px-4 w-full flex-grow gap-2">
          <InputFieldLabel textLabel="나의 링크는" rightText="선택입력" />

          {links.map((_, index) => (
            <div
              key={index}
              className={`
                w-full flex flex-col items-center gap-2 transition-all duration-300 ease-out
                ${index === 1 && isAdding === 1 ? 'opacity-0 translate-y-4' : ''}

                ${index === 1 && isRemoving ? 'opacity-0 translate-y-4' : ''}
              `}>
              <LinkInput
                type="text"
                placeholder="링크 제목을 적어보세요"
                labelText="타이틀"
              />
              <LinkInput
                type="text"
                placeholder="https://example.com"
                labelText="링크주소"
              />
            </div>
          ))}

          {links.length === 1 ? (
            <button
              type="button"
              onClick={handleAddLink}
              className="text-[#E6E6E6] text-sm font-medium underline">
              <div className="w-6 h-6 flex items-center justify-center border border-[#5A5C63] bg-[#141415] rounded-full mt-4">
                <Plus size={24} />
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRemoveLink}
              className="text-[#E6E6E6] text-sm font-medium underline">
              <div className="w-6 h-6 flex items-center justify-center border border-[#5A5C63] bg-[#141415] rounded-full mt-4">
                <Minus size={24} />
              </div>
            </button>
          )}
        </main>

        <footer className="w-full tablet:w-[320px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center">
          <NextButton text={'링크등록하기'} />
          <div
            className="mt-2 text-[#B7B9BD] cursor-pointer"
            onClick={handleSkip}>
            프로필 이미지 건너뛰기
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfileLinkPage;
