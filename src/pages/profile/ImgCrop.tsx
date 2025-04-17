import React, { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Minus, Plus } from 'react-feather';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImgCropProps {
  imageSrc: string;
  setCroppedAreaPixels: (area: CropArea) => void;
  width?: number;
  height?: number;
  cropShape?: 'rect' | 'round';
}

const ImgCrop: React.FC<ImgCropProps> = ({
  imageSrc,
  setCroppedAreaPixels,
  width = 4,
  height = 2,
  cropShape = 'rect',
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onCropComplete = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels],
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full aspect-square bg-gray-800 rounded-xl overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={width / height}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape={cropShape}
        />

        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <Minus size={32} className="mt-10" />
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-[240px] mt-10 custom-slider"
        />
        <Plus size={32} className="mt-10" />
      </div>
    </div>
  );
};

export default ImgCrop;
