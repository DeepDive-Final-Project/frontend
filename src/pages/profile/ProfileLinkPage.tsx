import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '@/components/profile/TopNav';
import ProgressBar from '@/components/profile/ProgressBar';
import NextButton from '@/components/profile/NextButton';
import InputFieldLabel from '@/components/profile/InputFieldLabel';
import LinkInput from '@/components/profile/LinkInput';
import { Plus, Minus } from 'react-feather';
import { useProfileStore } from '@/stores/useProfileStore';

const ProfileLinkPage = () => {
  const [localLinks, setLocalLinks] = useState([{ title: '', url: '' }]);
  const [isAdding, setIsAdding] = useState<number | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const { setLinks } = useProfileStore();
  const navigate = useNavigate();

  const handleAddLink = () => {
    if (localLinks.length < 2) {
      setLocalLinks([...localLinks, { title: '', url: '' }]);
      setIsAdding(1);
      setTimeout(() => setIsAdding(null), 200);
    }
  };

  const handleRemoveLink = () => {
    if (localLinks.length > 1) {
      setIsRemoving(true);
      setTimeout(() => {
        setLocalLinks(localLinks.slice(0, 1));
        setIsRemoving(false);
      }, 300);
    }
  };

  const handleLinkChange = (
    index: number,
    field: 'title' | 'url',
    value: string,
  ) => {
    const updatedLinks = [...localLinks];
    updatedLinks[index][field] = value;
    setLocalLinks(updatedLinks);
  };

  const handleSubmitLinks = () => {
    console.log('링크:', localLinks);
    console.log(localLinks.map((l) => typeof l));

    setLinks(localLinks);
    navigate('/profile/6');
  };
  const handleSkip = () => {
    navigate('/profile/6');
  };

  const canSubmit = localLinks.some(
    (link) => link.title.trim() && link.url.trim(),
  );

  return (
    <>
      <div className="w-full max-w-full tablet:w-[360px] desktop:w-[375px] flex flex-col flex-grow justify-between">
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

          {localLinks.map((link, index) => (
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
                value={link.title}
                onChange={(e) =>
                  handleLinkChange(index, 'title', e.target.value)
                }
              />
              <LinkInput
                type="text"
                placeholder="https://example.com"
                labelText="링크주소"
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              />
            </div>
          ))}

          {localLinks.length === 1 ? (
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

        <footer className="w-full tablet:w-[360px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center desktop:pb-60">
          <NextButton
            text={'링크등록하기'}
            onClick={handleSubmitLinks}
            disabled={!canSubmit}
          />
          <div
            className="mt-2 text-[#B7B9BD] cursor-pointer"
            onClick={handleSkip}>
            건너뛰기
          </div>
        </footer>
      </div>
    </>
  );
};

export default ProfileLinkPage;
