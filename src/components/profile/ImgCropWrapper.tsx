import React, { useState } from 'react';
import ImgCrop from '@/pages/profile/ImgCrop';
import getCroppedImg from '@/hooks/getCroppedImg';
import TopNav from '@/components/profile/TopNav.tsx';

interface ImgCropWrapperProps {
  imageSrc: string;
  onComplete: (croppedImg: string) => void;
  onCancel: () => void;
}

const ImgCropWrapper: React.FC<ImgCropWrapperProps> = ({
  imageSrc,
  onComplete,
  onCancel,
}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleCropComplete = async () => {
    if (!croppedAreaPixels) return;

    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (croppedImage) {
      onComplete(croppedImage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#d3d3d3] bg-opacity-10 flex items-center justify-center">
      <div className="bg-black rounded-lg p-4 w-[375px] h-[812px] max-w-md flex flex-col pt-10">
        <TopNav />
        <header className="pt-[20px] text-center">
          <div className="text-[16px] text-[#cccccc]">Your Profile</div>
          <div className="text-[24px] text-white">프로필 이미지 등록</div>
          <div className="text-[16px] text-[#cccccc]">
            원 안에 얼굴이 담기도록 조정해보세요
          </div>
        </header>

        <div className="flex justify-center items-center">
          <ImgCrop
            imageSrc={imageSrc}
            setCroppedAreaPixels={setCroppedAreaPixels}
            width={1}
            height={1}
            cropShape="round"
          />
        </div>

        <div className="flex justify-between mt-auto  mb-10 px-4 gap-x-3">
          <button
            onClick={onCancel}
            className="bg-[#0A0A0B] border border-white text-sm px-4 py-2 rounded w-full">
            다시 선택
          </button>
          <button
            onClick={handleCropComplete}
            className="bg-[#146EF5] text-white text-sm px-4 py-2 rounded w-full">
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImgCropWrapper;
