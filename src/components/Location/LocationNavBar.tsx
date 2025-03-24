import { Mail, Users, MoreHorizontal } from 'react-feather';
import radar from '@/assets/images/radar.svg';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useNavBarStore } from '@/stores/useNavBarStore';
import { useFilterStore } from '@/stores/useFilterStore';

const LocationNavBar: React.FC = () => {
  const setHeight = useBottomSheetStore((state) => state.setHeight);
  const setMode = useBottomSheetStore((state) => state.setMode);
  const resetHeight = useBottomSheetStore((state) => state.resetHeight);
  const activeIndex = useNavBarStore((state) => state.activeIndex);
  const setActiveIndex = useNavBarStore((state) => state.setActiveIndex);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const buttons = [
    {
      icon: <img src={radar} alt="네비게이션" />,
      label: '네비게이션',
      onclick: () => {
        resetHeight();
        resetFilters();
        setMode('explore');
        setActiveIndex(0);
      },
    },
    {
      icon: <Users />,
      label: '친구',
      onclick: () => {
        setHeight(window.innerHeight - 100);
        setMode('explore');
        resetFilters();
        setActiveIndex(1);
      },
    },
    {
      icon: <Mail />,
      label: '메시지',
      onclick: () => {
        setHeight(window.innerHeight - 100);
        setMode('chat');
        resetFilters();
        setActiveIndex(2);
      },
    },
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
          onClick={() => {
            setActiveIndex(index);
            btn.onclick?.();
          }}>
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

export default LocationNavBar;
