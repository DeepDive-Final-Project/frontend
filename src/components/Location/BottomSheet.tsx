import React, { useCallback, useMemo, useRef, useState } from 'react';
import UserCard from './UserCard';
import Filter from './Filter';
import dummy from '../../assets/현이 (1).jpg';

const users = [
  {
    id: 1,
    name: '김아무개',
    role: '개발자 • 주니어',
    tags: [
      { color: '#ff7f50', text: 'AI 머신러닝' },
      { color: '#6a5acd', text: '인터랙티브 디자인' },
      { color: '#32cd32', text: '프로젝트 관리' },
    ],
    message: '안녕하세요 반갑습니다',
    image: dummy,
  },
  {
    id: 2,
    name: '이아무개',
    role: '개발자 • 주니어',
    tags: [
      { color: '#ff7f50', text: 'UI/UX 디자인' },
      { color: '#6a5acd', text: '프론트엔드 개발' },
      { color: '#32cd32', text: '프로젝트 관리' },
    ],
    message: '함께 프로젝트 할 사람을 찾고 있어요!',
    image: dummy,
  },
  {
    id: 3,
    name: '박아무개',
    role: '개발자 • 주니어',
    tags: [
      { color: '#ff7f50', text: 'AI 머신러닝' },
      { color: '#6a5acd', text: '인터랙티브 디자인' },
      { color: '#32cd32', text: '프로젝트 관리' },
    ],
    message: '함께 프로젝트 할 사람을 찾고 있어요!',
    image: dummy,
  },
  {
    id: 4,
    name: '안안아무개',
    role: '개발자 • 주니어',
    tags: [
      { color: '#ff7f50', text: 'AI 머신러닝' },
      { color: '#6a5acd', text: '인터랙티브 디자인' },
      { color: '#32cd32', text: '프로젝트 관리' },
    ],
    message: '함께 프로젝트 할 사람을 찾고 있어요!',
    image: dummy,
  },
  {
    id: 5,
    name: '안안아무개',
    role: '개발자 • 주니어',
    tags: [
      { color: '#ff7f50', text: 'AI 머신러닝' },
      { color: '#6a5acd', text: '인터랙티브 디자인' },
      { color: '#32cd32', text: '프로젝트 관리' },
    ],
    message: '함께 프로젝트 할 사람을 찾고 있어요!',
    image: dummy,
  },
  {
    id: 6,
    name: '안안아무개',
    role: '개발자 • 주니어',
    tags: [
      { color: '#ff7f50', text: 'AI 머신러닝' },
      { color: '#6a5acd', text: '인터랙티브 디자인' },
      { color: '#32cd32', text: '프로젝트 관리' },
    ],
    message: '함께 프로젝트 할 사람을 찾고 있어요!',
    image: dummy,
  },
];
const BottomSheet: React.FC = () => {
  const [bottomSheetHeight, setBottomSheetHeight] = useState(150);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleUserSelect = useCallback((userId: number) => {
    setSelectedUserId((prev) => (prev === userId ? null : userId));
  }, []);

  const handleDeselectUser = useCallback((e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.user-card')) {
      setSelectedUserId(null);
    }
  }, []);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touchY = e.touches[0].clientY;
    const newHeight = window.innerHeight - touchY;
    setBottomSheetHeight(
      Math.max(100, Math.min(newHeight, window.innerHeight - 50)),
    );
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (bottomSheetHeight < window.innerHeight / 3) {
      setBottomSheetHeight(150);
    } else {
      setBottomSheetHeight(window.innerHeight - 50);
    }
  };
  const handleListScroll = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const handleClose = useCallback(() => {
    setBottomSheetHeight(150);
  }, []);
  const memoizedUserCards = useMemo(
    () =>
      users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onSelect={handleUserSelect}
          selectedUserId={selectedUserId}
        />
      )),
    [selectedUserId, handleUserSelect],
  );
  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-[#111111] shadow-lg rounded-t-lg transition-all duration-200 
      mobile:h-[50vh] tablet:h-[60vh] desktop:h-[70vh]"
      style={{ height: `${bottomSheetHeight}px` }}
      onClick={handleDeselectUser}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <div className="w-full flex justify-between bg-[#222222] p-3 rounded-t-lg">
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm tablet:text-lg">
            탐색하기
          </span>
          <span className="text-gray-400 text-xs tablet:text-base">
            네트워킹을 위한 사람들을 탐색합니다
          </span>
        </div>
        <button
          className="text-white bg-[#222222] px-2 rounded-lg text-sm border border-white"
          onClick={handleClose}>
          닫기
        </button>
      </div>

      <div className="p-2">
        <Filter />
      </div>
      <div
        className="p-4 grid grid-cols-2 gap-4 overflow-y-auto max-h-[80vh] scroll-smooth"
        ref={listRef}
        onTouchMove={handleListScroll}>
        {memoizedUserCards}
      </div>

      {selectedUserId && (
        <div className="p-4 flex justify-center">
          <button
            className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all 
            mobile:w-[90%] tablet:w-[60%] desktop:w-[40%]">
            대화 요청하기
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(BottomSheet);
