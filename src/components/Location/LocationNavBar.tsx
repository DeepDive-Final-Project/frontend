import { useState } from 'react';
import { Mail, Users, MoreHorizontal } from 'react-feather';

const LocationNavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const buttons = [
    { icon: <Users />, label: '탐색' },
    { icon: <Users />, label: '친구' },
    { icon: <Mail />, label: '메시지' },
    { icon: <MoreHorizontal />, label: '더보기' },
  ];

  return (
    <div className="flex bg-[#000000] p-2 rounded-lg shadow-lg gap-2">
      {buttons.map((btn, index) => (
        <button
          key={btn.label}
          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors
              ${activeIndex === index ? 'bg-point-blue text-white' : 'bg-[#111111] text-gray-400'}
            `}
          onClick={() => setActiveIndex(index)}>
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

export default LocationNavBar;
