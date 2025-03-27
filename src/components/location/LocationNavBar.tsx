import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useNavBarStore } from '@/stores/useNavBarStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useState } from 'react';
import {
  Mail,
  Users,
  MoreHorizontal,
  MapPin,
  LogOut,
  RotateCw,
} from 'react-feather';
import radar from '@/assets/images/radar.svg';

const LocationNavBar: React.FC = () => {
  const setHeight = useBottomSheetStore((state) => state.setHeight);
  const setMode = useBottomSheetStore((state) => state.setMode);
  const resetHeight = useBottomSheetStore((state) => state.resetHeight);
  const activeIndex = useNavBarStore((state) => state.activeIndex);
  const setActiveIndex = useNavBarStore((state) => state.setActiveIndex);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const [moreSetting, setMoreSetting] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);

  const buttons = [
    {
      icon: (
        <img
          src={radar}
          alt="네비게이션"
          className={`${activeIndex === 0 ? 'brightness-0 invert' : ''}`}
        />
      ),
      label: '네비게이션',
      onClick: () => {
        resetHeight();
        resetFilters();
        setMode('explore');
        setActiveIndex(0);
      },
    },
    {
      icon: <Users />,
      label: '친구',
      onClick: () => {
        setHeight(window.innerHeight - 100);
        setMode('explore');
        resetFilters();
        setActiveIndex(1);
      },
    },
    {
      icon: <Mail />,
      label: '메시지',
      onClick: () => {
        setHeight(window.innerHeight - 100);
        setMode('chat');
        resetFilters();
        setActiveIndex(2);
      },
    },
    {
      icon: <RotateCw />,
      label: '새로고침',
      onClick: () => {
        window.location.reload();
        setActiveIndex(3);
      },
    },
    {
      icon: <MoreHorizontal />,
      label: '더보기',
      onClick: () => {
        setMoreSetting((prev) => !prev);
        setActiveIndex(4);
      },
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center">
        <div className="inline-flex bg-[#111111] p-1 rounded-xl shadow-lg outline outline-[0.5px] outline-offset-[-0.5px] outline-[#333333] w-fit">
          {buttons.map((btn, index) => {
            const isActive = activeIndex === index;
            const isMoreButton = index === 4;

            return (
              <button
                key={btn.label}
                onClick={() => {
                  if (!isMoreButton) setMoreSetting(false);
                  btn.onClick();
                }}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors
        ${
          isMoreButton && isActive
            ? 'bg-[#e5e5e5] text-[#1d4ed8]'
            : isActive
              ? 'bg-blue-500 text-white shadow-[inset_0px_1px_8px_0px_rgba(255,255,255,0.30)]'
              : 'bg-[#111111] text-gray-400'
        }
        ${index === 2 || index === 3 ? 'border-r border-[#333333]' : ''}`}>
                {btn.icon}
              </button>
            );
          })}
        </div>
        {moreSetting && (
          <div className="mt-2 bg-[#0A0A0B] border border-[#B0B2B7] rounded-lg px-4 py-4 w-full shadow-lg z-50">
            <p className="text-sm font-semibold leading-tight border-b border-[#262626] ">
              설정하기
            </p>

            <div className="flex justify-between items-center py-2">
              <span className="flex text-sm">
                <label
                  htmlFor="shareLocation"
                  className="flex items-center gap-1 text-sm cursor-pointer">
                  <MapPin />내 위치 공개
                </label>
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="shareLocation"
                  type="checkbox"
                  className="sr-only peer"
                  checked={shareLocation}
                  onChange={() => setShareLocation((prev) => !prev)}
                />
                <div className="w-10 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200" />
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 peer-checked:translate-x-5" />
              </label>
            </div>
            <button className="flex items-center gap-1 text-sm hover:text-blue-500 mt-2">
              <LogOut />
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationNavBar;
