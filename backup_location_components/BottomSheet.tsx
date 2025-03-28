import React, { useCallback, useMemo, useRef, useState } from 'react';
import UserCard from './UserCard';
import Filter from './Filter';
import dummy from '@/assets/hyun.jpg';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useNavBarStore } from '@/stores/useNavBarStore';
import { useFilterStore } from '@/stores/useFilterStore';

const users = [
  {
    id: 1,
    name: '김아무개',
    role: '디자이너',
    career: '주니어',
    tags: [
      { color: '#ff7f50', text: 'UI/UX' },
      { color: '#6a5acd', text: 'React' },
      { color: '#32cd32', text: 'PM' },
    ],
    message: '디자인 같이 할 분 구합니다!',
    image: dummy,
  },
  {
    id: 2,
    name: '이아무개',
    role: '개발자',
    career: '시니어',
    tags: [
      { color: '#ff7f50', text: 'UI/UX' },
      { color: '#6a5acd', text: 'React' },
      { color: '#32cd32', text: 'PM' },
    ],
    message: '프론트 전문가입니다.',
    image: dummy,
  },
  {
    id: 3,
    name: '박아무개',
    role: '프로젝트 매니저',
    career: '미들',
    tags: [
      { color: '#ff7f50', text: 'UI/UX' },
      { color: '#6a5acd', text: 'React' },
      { color: '#32cd32', text: 'PM' },
    ],
    message: 'PM 역할 맡고 있어요!',
    image: dummy,
  },
  {
    id: 4,
    name: '최아무개',
    role: '학생',
    career: '',
    tags: [
      { color: '#ff7f50', text: 'UI/UX' },
      { color: '#6a5acd', text: 'React' },
      { color: '#32cd32', text: 'PM' },
    ],
    message: '개발을 배우고 있어요!',
    image: dummy,
  },
  {
    id: 5,
    name: '정아무개',
    role: '기타',
    career: '',
    tags: [
      { color: '#ff7f50', text: 'UI/UX' },
      { color: '#6a5acd', text: 'React' },
      { color: '#32cd32', text: 'PM' },
    ],
    message: '프로젝트 열정 가득!',
    image: dummy,
  },
  {
    id: 6,
    name: '최아무개',
    role: '기타',
    career: '',
    tags: [
      { color: '#ff7f50', text: 'UI/UX' },
      { color: '#6a5acd', text: 'React' },
      { color: '#32cd32', text: 'PM' },
    ],
    message: '프로젝트 열정 가득!',
    image: dummy,
  },
];

const BottomSheet: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [requestedUserIds, setRequestedUserIds] = useState<number[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const height = useBottomSheetStore((state) => state.height);
  const setHeight = useBottomSheetStore((state) => state.setHeight);
  const resetHeight = useBottomSheetStore((state) => state.resetHeight);
  const mode = useBottomSheetStore((state) => state.mode);
  const setActiveIndex = useNavBarStore((state) => state.setActiveIndex);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const role = useFilterStore((state) => state.role);
  const career = useFilterStore((state) => state.career);
  const chatTab = useBottomSheetStore((state) => state.chatTab);
  const setChatTab = useBottomSheetStore((state) => state.setChatTab);

  const handleUserSelect = useCallback((userId: number) => {
    setSelectedUserId((prev) => (prev === userId ? null : userId));
  }, []);

  const handleRequest = useCallback((userId: number) => {
    setRequestedUserIds((prev) =>
      prev.includes(userId) ? prev : [...prev, userId],
    );
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
    setHeight(Math.max(100, Math.min(newHeight, window.innerHeight - 150)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (height < window.innerHeight / 3) {
      setHeight(100);
    } else {
      setHeight(window.innerHeight - 100);
    }
  };

  const handleListScroll = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const handleClose = useCallback(() => {
    resetHeight();
    resetFilters();
    setActiveIndex(0);
  }, [resetHeight, resetFilters, setActiveIndex]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchRole = !role || user.role === role;
      const matchCareer = !career || user.career === career;
      return matchRole && matchCareer;
    });
  }, [role, career]);

  const memoizedUserCards = useMemo(
    () =>
      filteredUsers.map((user, index) => {
        const isRequested = requestedUserIds.includes(user.id);
        return (
          <div key={user.id} className={`${index % 2 === 1 ? 'mt-6' : ''}`}>
            <UserCard
              user={user}
              onSelect={handleUserSelect}
              selectedUserId={selectedUserId}
              isRequested={isRequested}
              onRequest={() => handleRequest(user.id)}
            />
          </div>
        );
      }),
    [
      filteredUsers,
      selectedUserId,
      requestedUserIds,
      handleUserSelect,
      handleRequest,
    ],
  );

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-[#111111] rounded-t-lg transition-all duration-100
      mobile:h-[50vh] tablet:h-[60vh] desktop:h-[70vh]"
      style={{ height: `${height}px` }}
      onClick={handleDeselectUser}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <div className="w-full h-full flex flex-col  overflow-hidden">
        <div className="flex justify-between items-start bg-[#222222] p-3 rounded-t-lg gap-2">
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-white font-bold text-sm tablet:text-lg">
              {mode === 'chat' ? '채팅 요청' : '탐색하기'}
            </span>
            <span className="text-gray-400 text-xs tablet:text-base truncate">
              {mode === 'chat'
                ? '보낸 요청과 받은 요청을 빠르게 확인하는 공간입니다.'
                : '같은 관심사를 가진 사람과 네트워킹하세요'}
            </span>
          </div>
          <button
            className="text-white px-2 rounded-lg text-sm border border-white"
            onClick={handleClose}>
            닫기
          </button>
        </div>

        {mode === 'explore' && (
          <div className="pt-2 pb-3">
            <Filter />
          </div>
        )}

        {mode === 'chat' && (
          <div className="flex justify-start gap-12 mt-4 mb-6">
            <button
              onClick={() => setChatTab('sent')}
              className={`px-4 py-1 rounded-full text-sm border ${
                chatTab === 'sent'
                  ? 'text-white border-blue-500'
                  : 'bg-[#222222] text-gray-300 border-gray-500'
              }`}>
              보낸 요청
            </button>
            <button
              onClick={() => setChatTab('received')}
              className={`px-4 py-1 rounded-full text-sm border ${
                chatTab === 'received'
                  ? 'text-white border-blue-500'
                  : 'bg-[#222222] text-gray-300 border-gray-500'
              }`}>
              받은 요청
            </button>
          </div>
        )}

        <div
          className="flex-1 overflow-y-auto scroll-smooth"
          ref={listRef}
          onTouchMove={handleListScroll}>
          <div className="grid grid-cols-2 gap-4 w-full max-w-full">
            {memoizedUserCards}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BottomSheet);
