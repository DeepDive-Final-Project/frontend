import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import Filter from './Filter';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useNavBarStore } from '@/stores/useNavBarStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUserStore } from '@/stores/useUserStore';
import { useChatMyInfo } from '@/stores/useChatMyInfoStore';
import { useChatRequest } from '@/hooks/useChatRequest';
import { useAcceptRequest } from '@/hooks/useAcceptRequest';
import { useRejectRequest } from '@/hooks/useRejectRequest';
import { useChatRequestStore } from '@/stores/useChatRequestStore';
import { useChatRequestFetch } from '@/hooks/useChatRequestFetch';
import { chatRoomRequestId } from '@/utils/chat/chatRoomRequestId';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const BottomSheet: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { nickName } = useChatMyInfo();
  const { mutate: chatRequest } = useChatRequest();
  const { mutate: acceptRequest } = useAcceptRequest();
  const { mutate: rejectRequest } = useRejectRequest();

  useChatRequestFetch(nickName ?? '');

  const { sent, received } = useChatRequestStore();
  const sentAccepted = sent.ACCEPTED;
  const sentPending = sent.PENDING;
  const receivedAccepted = received.ACCEPTED;
  const receivedPending = received.PENDING;

  const height = useBottomSheetStore((state) => state.height);
  const setHeight = useBottomSheetStore((state) => state.setHeight);
  const resetHeight = useBottomSheetStore((state) => state.resetHeight);
  const mode = useBottomSheetStore((state) => state.mode);
  const chatTab = useBottomSheetStore((state) => state.chatTab);
  const setChatTab = useBottomSheetStore((state) => state.setChatTab);

  const setActiveIndex = useNavBarStore((state) => state.setActiveIndex);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const role = useFilterStore((state) => state.role);
  const career = useFilterStore((state) => state.career);
  const users = useUserStore((state) => state.users);

  const handleUserSelect = useCallback((userId: number) => {
    setSelectedUserId((prev) => (prev === userId ? null : userId));
  }, []);

  const handleRequest = useCallback(
    (receiverNickname: string) => {
      if (!nickName) return;
      chatRequest(
        { senderNickname: nickName, receiverNickname },
        {
          onSuccess: () => {
            toast.success(`${receiverNickname}님에게 요청을 보냈습니다.`);
            queryClient.invalidateQueries({ queryKey: ['chatRequestList'] });
          },
          onError: () => {
            toast.error('요청에 실패했습니다.');
          },
        },
      );
    },
    [nickName, chatRequest, queryClient],
  );

  const handleAcceptRequest = useCallback(
    (requestId: number) => {
      acceptRequest(requestId, {
        onSuccess: (data) => {
          if (data.roomId) {
            toast.success('요청을 수락했습니다!');
            navigate(`/chat?roomId=${data.roomId}`);
          }
          queryClient.invalidateQueries({ queryKey: ['chatRequestList'] });
        },
      });
    },
    [acceptRequest, navigate, queryClient],
  );

  const handleRejectRequest = useCallback(
    (requestId: number) => {
      rejectRequest(requestId, {
        onSuccess: () => {
          toast.success('요청을 거절했습니다.');
          queryClient.invalidateQueries({ queryKey: ['chatRequestList'] });
        },
      });
    },
    [rejectRequest, queryClient],
  );

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

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchRole = !role || user.role === role;
      const matchCareer = !career || user.career === career;
      return matchRole && matchCareer;
    });
  }, [users, role, career]);

  const exploreCards = useMemo(() => {
    return filteredUsers.map((user) => (
      <UserCard
        key={user.id}
        user={user}
        onSelect={handleUserSelect}
        selectedUserId={selectedUserId}
        isRequested={sentPending.some(
          (s) => s.receiverNickname === user.nickname,
        )}
        onRequest={() => handleRequest(user.nickname)}
      />
    ));
  }, [
    filteredUsers,
    selectedUserId,
    sentPending,
    handleUserSelect,
    handleRequest,
  ]);

  const sentCards = useMemo(() => {
    return sentAccepted
      .map((req) => {
        const user = users.find((u) => u.nickname === req.receiverNickname);
        if (!user) return null;
        return (
          <UserCard
            key={user.id}
            user={user}
            onSelect={handleUserSelect}
            selectedUserId={selectedUserId}
            isRequested={false}
            onRequest={() => {}}
            buttonLabel="채팅방으로 이동"
            onButtonClick={() => chatRoomRequestId(req.id, navigate)}
          />
        );
      })
      .filter(Boolean);
  }, [sentAccepted, users, selectedUserId, handleUserSelect, navigate]);

  const receivedPendingCards = useMemo(() => {
    return receivedPending
      .map((req) => {
        const user = users.find((u) => u.nickname === req.senderNickname);
        if (!user) return null;
        return (
          <UserCard
            key={user.id}
            user={user}
            onSelect={handleUserSelect}
            selectedUserId={selectedUserId}
            isRequested={false}
            onRequest={() => {}}
            buttonLabel="수락하기"
            onButtonClick={() => handleAcceptRequest(req.id)}
            onRejectClick={() => handleRejectRequest(req.id)}
          />
        );
      })
      .filter(Boolean);
  }, [
    receivedPending,
    users,
    selectedUserId,
    handleUserSelect,
    handleAcceptRequest,
    handleRejectRequest,
  ]);

  const receivedAcceptedCards = useMemo(() => {
    return receivedAccepted
      .map((req) => {
        const user = users.find((u) => u.nickname === req.senderNickname);
        if (!user) return null;
        return (
          <UserCard
            key={user.id}
            user={user}
            onSelect={handleUserSelect}
            selectedUserId={selectedUserId}
            isRequested={false}
            onRequest={() => {}}
            buttonLabel="채팅방으로 이동"
            onButtonClick={() => chatRoomRequestId(req.id, navigate)}
          />
        );
      })
      .filter(Boolean);
  }, [receivedAccepted, users, selectedUserId, handleUserSelect, navigate]);

  const visibleCards =
    mode === 'chat'
      ? chatTab === 'sent'
        ? sentCards
        : [...receivedPendingCards, ...receivedAcceptedCards]
      : exploreCards;

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-[#141415] rounded-t-lg transition-all duration-100"
      style={{ height: `${height}px` }}>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div
          className="flex justify-center py-2"
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div className="w-10 h-1 rounded-full bg-gray-400" />
        </div>

        {/* 헤더 */}
        <div className="flex justify-between items-start bg-[#141415] p-3 rounded-t-lg gap-2">
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-gray-100 text-sm tablet:text-lg">
              {mode === 'chat' ? '채팅 요청' : '탐색하기'}
            </span>
            <span className="text-gray-400 text-xs tablet:text-base truncate">
              {mode === 'chat'
                ? '보낸 요청과 받은 요청을 확인하세요.'
                : '같은 관심사를 가진 사람과 네트워킹하세요'}
            </span>
          </div>
          <button
            className="text-white px-2 py-1 rounded-md text-sm border border-gray-500"
            onClick={() => {
              resetHeight();
              resetFilters();
              setActiveIndex(0);
            }}>
            닫기
          </button>
        </div>

        {mode === 'explore' && (
          <div className="pt-2 pb-3">
            <Filter />
          </div>
        )}

        {mode === 'chat' && (
          <div className="flex justify-start gap-12 mt-4 mb-6 px-4">
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
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-2 gap-4 w-full max-w-full">
            {visibleCards}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BottomSheet);
