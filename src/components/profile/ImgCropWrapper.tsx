import React, { useEffect, useRef, useState } from 'react';
import ImgCrop from '@/pages/profile/ImgCrop';
import getCroppedImg from '@/hooks/getCroppedImg';

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

  const [localImageSrc, setLocalImageSrc] = useState(imageSrc);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalImageSrc(imageSrc);
  }, [imageSrc]);

  const handleCropComplete = async () => {
    if (!croppedAreaPixels) return;

    const croppedImage = await getCroppedImg(localImageSrc, croppedAreaPixels);
    if (croppedImage) {
      onComplete(croppedImage);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onCancel();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
      onClick={handleBackgroundClick}
      ref={modalRef}>
      <div className="relative bg-[#0F0F10] rounded-lg p-4 w-[375px] h-[812px] max-w-md flex flex-col">
        <button
          className="absolute top-4 right-4 text-gray-400 text-xl"
          onClick={onCancel}>
          ✕
        </button>

        <header className="pt-[32px] text-center">
          <div className="text-[16px] text-[#cccccc]">Your Profile</div>
          <div className="text-[24px] text-white mt-1">프로필 이미지 등록</div>
          <div className="text-[14px] text-[#cccccc] mt-1">
            원 안에 얼굴이 담기도록 조정해보세요
          </div>
        </header>

        <div className="flex justify-center items-center mt-6">
          <ImgCrop
            imageSrc={localImageSrc}
            setCroppedAreaPixels={setCroppedAreaPixels}
            width={1}
            height={1}
            cropShape="round"
          />
        </div>

        <div className="flex justify-between mt-auto mb-8 px-4 gap-x-3">
          <button
            onClick={triggerFileInput}
            className="bg-[#0A0A0B] border border-white text-sm px-4 py-2 rounded w-full">
            다시 선택
          </button>
          <button
            onClick={handleCropComplete}
            className="bg-[#146EF5] text-white text-sm px-4 py-2 rounded w-full">
            적용
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setLocalImageSrc(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImgCropWrapper;
