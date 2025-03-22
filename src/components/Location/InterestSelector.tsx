import { useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const allInterests = ['축구', '농구', '독서', '코딩', '등산', '요가'];

const InterestSelector = () => {
  const { interests, setInterests } = useUserStore();
  const [selected, setSelected] = useState(interests);

  const toggleInterest = (interest: string) => {
    const newInterests = selected.includes(interest)
      ? selected.filter((i) => i !== interest)
      : [...selected, interest];

    setSelected(newInterests);
    setInterests(newInterests);
  };

  return (
    <div className="mb-4 w-full  bg-[#111111] justify-start ">
      <h2 className="text-lg font-bold px-5">탐색하기</h2>
      <h3 className="text-lg font-medium text-left px-5 py-2 ">
        네트워킹을 누리세요
      </h3>
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {allInterests.map((interest) => (
          <button
            key={interest}
            className={`px-3 py-1 rounded-lg ${
              selected.includes(interest)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
            onClick={() => toggleInterest(interest)}>
            {interest}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;
