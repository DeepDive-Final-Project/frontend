import React, { useMemo, useState } from 'react';
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
import { ChatRequestType } from '@/types/chatRequestType';
import { getChatButtonState } from '@/utils/chat/getChatButtonState';
import { useChatRequestRealtime } from '@/hooks/useChatRequestRealtime';

const BottomSheet: React.FC = () => {
  const { nickName } = useChatMyInfo();
  useChatRequestRealtime(nickName ?? '');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { userId } = useChatMyInfo();

  const { sent, received } = useChatRequestStore();

  const height = useBottomSheetStore((state) => state.height);
  const setHeight = useBottomSheetStore((state) => state.setHeight);
  const resetHeight = useBottomSheetStore((state) => state.resetHeight);
  const mode = useBottomSheetStore((state) => state.mode);
  const chatTab = useBottomSheetStore((state) => state.chatTab);
  const setChatTab = useBottomSheetStore((state) => state.setChatTab);
  const selectedByMapPin = useUserStore((state) => state.selectedByMapPin);

  const setActiveIndex = useNavBarStore((state) => state.setActiveIndex);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const role = useFilterStore((state) => state.role);
  const career = useFilterStore((state) => state.career);
  const users = useUserStore((state) => state.users);

  useChatRequestFetch(nickName ?? '', userId ?? NaN);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId((prev) => (prev === userId ? null : userId));
  };

  const { mutate: chatRequest } = useChatRequest();
  const handleRequest = (receiverId: number, receiverNickname: string) => {
    if (!userId) return;
    chatRequest(
      { senderId: userId, receiverId },
      {
        onSuccess: () => {
          toast.success(`${receiverNickname}님에게 요청을 보냈습니다.`);
          queryClient.invalidateQueries({
            queryKey: ['chatSentList', userId, 'PENDING'],
          });

          useBottomSheetStore.getState().setChatTab('sent');
        },
        onError: () => {
          toast.error('요청에 실패했습니다.');
        },
      },
    );
  };

  const { mutate: acceptRequest } = useAcceptRequest();
  const handleAcceptRequest = (req: ChatRequestType) => {
    acceptRequest(req.id, {
      onSuccess: (data) => {
        toast.success(`${req.senderNickname}님의 요청을 수락했습니다.`);

        setTimeout(() => {
          if (data.roomId) {
            navigate(`/chat?roomId=${data.roomId}`, { replace: true });
          }
        }, 600);
        queryClient.invalidateQueries({
          queryKey: ['chatReceivedList', nickName, 'PENDING'],
        });
        queryClient.invalidateQueries({
          queryKey: ['chatReceivedList', nickName, 'ACCEPTED'],
        });
        queryClient.invalidateQueries({
          queryKey: ['chatSentList', nickName, 'ACCEPTED'],
        });
      },
    });
  };
  const { mutate: rejectRequest } = useRejectRequest();
  const handleRejectRequest = (req: ChatRequestType) => {
    rejectRequest(req.id, {
      onSuccess: () => {
        toast.success('요청을 거절했습니다.');
        queryClient.invalidateQueries({
          queryKey: ['chatReceivedList', nickName, 'PENDING'],
        });
      },
    });
  };

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
      setHeight(window.innerHeight - 150);
    }
  };

  const filteredUsers = users
    .filter((user) => user.id !== userId)
    .filter((user) => {
      const matchRole = !role || user.role === role;
      const matchCareer = !career || user.career === career;
      return matchRole && matchCareer;
    });
  const sortedUsers = useMemo(() => {
    if (!selectedByMapPin) return filteredUsers;
    const selected = filteredUsers.find((u) => u.id === selectedByMapPin);
    const rest = filteredUsers.filter((u) => u.id !== selectedByMapPin);
    return selected ? [selected, ...rest] : filteredUsers;
  }, [filteredUsers, selectedByMapPin]);

  const exploreCards = sortedUsers.map((user) => {
    const state = getChatButtonState(user.nickName, sent, received);
    const isRequested = state === 'WAITING';
    const isAccepted = state === 'MOVE';

    let buttonLabel: string | undefined;
    let onButtonClick: (() => void) | undefined;

    if (isAccepted) {
      buttonLabel = '채팅방으로 이동';
      const acceptedChat = [...sent.ACCEPTED, ...received.ACCEPTED].find(
        (req) =>
          req.senderNickname === user.nickName ||
          req.receiverNickname === user.nickName,
      );
      onButtonClick = () =>
        acceptedChat && chatRoomRequestId(acceptedChat.id, navigate);
    } else if (isRequested) {
      buttonLabel = '수락 대기중...';
    }

    return (
      <UserCard
        key={user.id}
        user={user}
        onSelect={handleUserSelect}
        selectedUserId={selectedUserId}
        isRequested={isRequested}
        onRequest={() => handleRequest(user.id, user.nickName)}
        buttonLabel={buttonLabel}
        onButtonClick={onButtonClick}
      />
    );
  });
  const sentCards = [...sent.PENDING, ...sent.ACCEPTED]
    .map((req) => {
      const user = users.find(
        (u) =>
          u.nickName === req.receiverNickname ||
          u.nickName === req.senderNickname,
      );
      if (!user) return null;

      const state = getChatButtonState(user.nickName, sent, received);
      let buttonLabel;
      if (state === 'MOVE') {
        buttonLabel = '채팅방으로 이동';
      } else if (state === 'WAITING') {
        buttonLabel = '수락 대기중...';
      }

      return (
        <UserCard
          key={user.id}
          user={user}
          onSelect={handleUserSelect}
          selectedUserId={selectedUserId}
          isRequested={state === 'WAITING'}
          onRequest={() => {}}
          buttonLabel={buttonLabel}
          onButtonClick={
            state === 'MOVE'
              ? () => chatRoomRequestId(req.id, navigate)
              : undefined
          }
        />
      );
    })
    .filter(Boolean);

  const getReceivedPendingCards = () => {
    return received.PENDING.map((req) => {
      const user = users.find((u) => u.nickName === req.senderNickname);
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
          onButtonClick={() => handleAcceptRequest(req)}
          onRejectClick={() => handleRejectRequest(req)}
        />
      );
    }).filter(Boolean);
  };

  const receivedAcceptedCards = received.ACCEPTED.map((req) => {
    const user = users.find((u) => u.nickName === req.senderNickname);
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
        className="
    w-[clamp(130px,45vw,286px)]
    h-[clamp(226px,75vw,497.2px)]
    tablet:w-[clamp(130px,20vw,176.5px)]
    tablet:h-[clamp(226px,34vw,306.84px)]
  "
      />
    );
  }).filter(Boolean);

  const visibleCards =
    mode === 'chat'
      ? chatTab === 'sent'
        ? sentCards
        : [...getReceivedPendingCards(), ...receivedAcceptedCards]
      : exploreCards;

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-[#141415] rounded-t-lg transition-all duration-100 z-50"
      style={{ height: `${height}px` }}>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <div
          className="flex justify-center py-2"
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div className="w-10 h-1 rounded-full bg-gray-400" />
        </div>

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
          <div className="pt-2 pb-3 px-5">
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
        <div className="grid grid-cols-2 gap-x-[20px] px-[20px] overflow-y-auto">
          {visibleCards.map((card, index) => {
            let marginTop = 0;

            if (index === 0) {
              marginTop = 40;
            } else if (index === 1) {
              marginTop = 60;
            } else if (index % 2 === 0) {
              marginTop = 40 + (index / 2) * 20;
            } else {
              marginTop = 60 + Math.floor(index / 2) * 20;
            }
            return (
              <div key={index} style={{ marginTop: `${marginTop}px` }}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
