import { useEffect, useState } from 'react';
import Img1 from '@/assets/images/onContents1.svg';
import Img2 from '@/assets/images/onContents2.svg';

const slides = [
  {
    title: '주변 사람들과 연결되세요',
    subtitle:
      '컨퍼런스에 참여한 사람들에게 \n' +
      '채팅을 걸어보세요 뜻깊은 연결이 될 거예요',
    image: Img1,
  },
  {
    title: '어떤 관심을 가지고 참여하나요?',
    subtitle:
      '요즘 내 관심을 알려보세요 \n' +
      '같은 관심사를 가진 사람을 만날 수 있어요',
    image: Img2,
  },
];

const OnboardingContents = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-[#0A0A0B] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out w-full min-h-screen"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-full min-h-screen flex flex-col items-center flex-shrink-0 px-8 text-center
              tablet:pt-[70px]">
            <div className="text-white space-y-2 mt-[100px]">
              <h2 className="text-[32px] font-semibold font-pretendard text-center">
                {slide.title}
              </h2>
              <p className="text-[18px] font-pretendard text-[#B7B9BD] text-center whitespace-pre-line">
                {slide.subtitle}
              </p>
            </div>
            <img
              src={slide.image}
              alt={`slide-${i}`}
              className="w-full object-contain mt-6"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingContents;
