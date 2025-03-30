import { useEffect, useState } from 'react';
import Img1 from '@/assets/images/on1.png';
import Img2 from '@/assets/images/on2.png';

const images = [Img1, Img2];

const OnboardingContents = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-black overflow-hidden relative">
      <div
        className="flex transition-transform duration-700 ease-in-out w-full h-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`slide-${i}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingContents;
