import { useState } from 'react';
import TopNav from '@/components/profile/TopNav';
import ProgressBar from '@/components/profile/ProgressBar';
import NextButton from '@/components/profile/NextButton';
import InputFieldLabel from '@/components/profile/InputFieldLabel';
import Modal from '@/components/profile/Modal';
import ModalContent from '@/components/profile/ModalContent';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'react-feather';
import { useProfileStore } from '@/stores/useProfileStore';

const ProfileInterestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { interests, setInterests } = useProfileStore();

  const handleNext = () => {
    console.log(interests);

    if (interests.length === 0) {
      alert('관심사를 최소 1개 이상 선택해주세요.');
      return;
    }
    navigate('/profile5');
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden tablet:flex flex-grow"></div>
        <div className="w-full tablet:w-[375px] desktop:w-[375px] desktop:mx-20 min-h-screen flex flex-col items-center">
          <TopNav />
          <ProgressBar currentStep={4} />
          <header className="py-[20px]">
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              About You
            </div>
            <div className="text-center mobile:text-[24px]">
              컨퍼런스에 온 목적
            </div>
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              어떤 관심을 가지고 컨퍼런스에 참여하나요?
            </div>
          </header>

          <main className="flex flex-col items-center px-4 w-full flex-grow gap-4">
            <InputFieldLabel textLabel="요즘 내 관심은" />

            <div
              onClick={() => setIsModalOpen(true)}
              className="text-[#A2A4AA] bg-[#0F0F10] w-full px-4 py-2 rounded-md cursor-pointer min-h-[48px] flex flex-wrap gap-2 items-center">
              {interests.length > 0 ? (
                interests.map((item) => (
                  <span
                    key={item.key}
                    className="text-white text-sm px-3 py-1 rounded-full">
                    {item.description}
                  </span>
                ))
              ) : (
                <span className="text-[#A2A4AA]">관심사를 알려주세요</span>
              )}
            </div>

            {isModalOpen && (
              <Modal onClose={() => setIsModalOpen(false)}>
                <ModalContent
                  onClose={() => setIsModalOpen(false)}
                  onSave={(items) => setInterests(items)}
                />
              </Modal>
            )}

            <div className="flex items-center gap-1 left-0 w-full px-4">
              <AlertCircle size={20} color="#1263DC" />
              <div className="text-[#66A1F8] text-[12px]">필수선택 입니다</div>
            </div>
          </main>

          <footer className="w-full tablet:w-[320px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center">
            <NextButton text={'다음으로 진행하기'} onClick={handleNext} />
            <div className="h-[42px]" />
          </footer>
        </div>
      </div>
    </>
  );
};

export default ProfileInterestPage;
