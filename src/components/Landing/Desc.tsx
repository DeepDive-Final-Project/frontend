import React from 'react';

interface DescProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

function Desc({ title, description }: DescProps) {
  return (
    <>
      <h2
        className="text-[24px] leading-[36px] font-semibold text-center text-[#E6E6E6]
             tablet:text-[40px] tablet:leading-[60px] tablet:font-bold
             desktop:text-[60px] desktop:leading-[90px] font-pretendard mt-3">
        {title}
      </h2>
      <p
        className="text-[14px] leading-[21px] font-medium text-center font-pretendard
             tablet:text-[24px] tablet:leading-[36px]
             desktop:text-[32px] desktop:leading-[48px]
             bg-gradient-to-r from-[#AAC0E0] to-[#99BAEC]
             bg-clip-text text-transparent pt-4">
        {description}
      </p>
    </>
  );
}

export default Desc;
