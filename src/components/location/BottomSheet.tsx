import React, { useCallback, useMemo, useRef, useState } from 'react';
import UserCard from './UserCard';
import Filter from './Filter';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useNavBarStore } from '@/stores/useNavBarStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUserStore } from '@/stores/useUserStore';
import { useChatMyInfo } from '@/stores/useChatMyInfoStore';
import { useChatRequest } from '@/hooks/useChatRequest';
import { toast } from 'react-toastify';
import { useChatRequestStore } from '@/stores/useChatRequestStore';
import { useChatRequestFetch } from '@/hooks/useChatRequestFetch';
import { useQueryClient } from '@tanstack/react-query';

const BottomSheet: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { nickName } = useChatMyInfo();
  const { mutate: chatRequest } = useChatRequest();
  const queryClient = useQueryClient();

  // ✅ 받은 요청 fetch & 상태 가져오기
  useChatRequestFetch(nickName ?? '');
  const { received } = useChatRequestStore();

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
  const users = useUserStore((state) => state.users);

  const handleRequest = useCallback(
    (receiverNickname: string) => {
      if (!nickName) return;

      chatRequest(
        { senderNickname: nickName, receiverNickname },
        {
          onSuccess: () => {
            toast.success(`${receiverNickname}님에게 요청을 보냈습니다.`);
            queryClient.invalidateQueries({
              queryKey: ['chatRequestList'],
            });
          },
          onError: () => {
            toast.error('요청에 실패했습니다.');
          },
        },
      );
    },
    [nickName, chatRequest, queryClient],
  );

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
  }, [users, role, career]);

  // ✅ Zustand에서 받은 요청 리스트 기반으로 받은 유저 추출
  const receivedUsers = useMemo(() => {
    return received.PENDING.map((req) =>
      users.find((u) => u.nickname === req.senderNickname),
    ).filter((u): u is NonNullable<typeof u> => !!u);
  }, [received.PENDING, users]);

  const receivedUserCards = useMemo(
    () =>
      receivedUsers.map((user, index) => (
        <div key={user.id} className={`${index % 2 === 1 ? 'mt-6' : ''}`}>
          <UserCard
            user={user}
            onSelect={handleUserSelect}
            selectedUserId={selectedUserId}
            isRequested={false}
            onRequest={() => {}}
          />
        </div>
      )),
    [receivedUsers, selectedUserId, handleUserSelect],
  );

  const memoizedUserCards = useMemo(
    () =>
      filteredUsers.map((user, index) => {
        const isRequested = false; // 이후 상태 연동 가능
        return (
          <div key={user.id} className={`${index % 2 === 1 ? 'mt-6' : ''}`}>
            <UserCard
              user={user}
              onSelect={handleUserSelect}
              selectedUserId={selectedUserId}
              isRequested={isRequested}
              onRequest={() => handleRequest(user.nickname)}
            />
          </div>
        );
      }),
    [filteredUsers, selectedUserId, handleUserSelect, handleRequest],
  );

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-[#141415] rounded-t-lg transition-all duration-100
      mobile:h-[50vh] tablet:h-[60vh] desktop:h-[70vh]"
      style={{ height: `${height}px` }}
      onClick={handleDeselectUser}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex justify-center py-2">
          <div className="w-10 h-1 rounded-full bg-gray-400" />
        </div>
        <div className="flex justify-between items-start bg-[#141415] p-3 rounded-t-lg gap-2">
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-gray-100 text-sm tablet:text-lg">
              {mode === 'chat' ? '채팅 요청' : '탐색하기'}
            </span>
            <span className="text-gray-400 text-xs tablet:text-base truncate">
              {mode === 'chat'
                ? '보낸 요청과 받은 요청을 빠르게 확인하는 공간입니다.'
                : '같은 관심사를 가진 사람과 네트워킹하세요'}
            </span>
          </div>
          <button
            className="text-white px-2 py-1 rounded-md text-sm border border-gray-500"
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
            {mode === 'chat' && chatTab === 'received'
              ? receivedUserCards
              : memoizedUserCards}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BottomSheet);
