import React from 'react';

type InfoCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const LandingCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-[10px] flex-1">
      <div
        className="absolute top-0 left-0 w-full h-full
                      bg-gradient-to-br from-[#8FA9EC] via-transparent to-transparent
                      opacity-20 z-0"
      />

      <div
        className="relative flex flex-col items-start p-10
                      border border-[#5A5C63]
                      bg-[rgba(30,30,31,0.2)] backdrop-blur-[50px] z-10 rounded-[10px]">
        <div
          className="flex items-center justify-center mb-4 px-2 py-1 w-10 h-10
                gap-1 rounded-[8px] border border-white bg-[#3784F7]
                shadow-[inset_0_1px_8px_rgba(255,255,255,0.3)]">
          {icon}
        </div>
        <h3 className="text-[#E6E6E6] text-lg font-semibold font-pretendard">
          {title}
        </h3>
        <p className="text-[#B0B0B0] text-sm font-pretendard">{description}</p>
      </div>
    </div>
  );
};

export default LandingCard;
