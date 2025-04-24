import Filter from './Filter';
import UserCard from './UserCard';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUserStore } from '@/stores/useUserStore';
import { useChatMyInfo } from '@/stores/useChatMyInfoStore';
import { useChatRequest } from '@/hooks/useChatRequest';
import { useAcceptRequest } from '@/hooks/useAcceptRequest';
import { useRejectRequest } from '@/hooks/useRejectRequest';
import { useChatRequestStore } from '@/stores/useChatRequestStore';
import { chatRoomRequestId } from '@/utils/chat/chatRoomRequestId';
import { getChatButtonState } from '@/utils/chat/getChatButtonState';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ChatRequestType } from '@/types/chatRequestType';

const RightSheet = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { userId } = useChatMyInfo();
  const { nickName } = useChatMyInfo();
  const { sent, received } = useChatRequestStore();

  const mode = useBottomSheetStore((state) => state.mode);
  const chatTab = useBottomSheetStore((state) => state.chatTab);
  const setChatTab = useBottomSheetStore((state) => state.setChatTab);

  const role = useFilterStore((state) => state.role);
  const career = useFilterStore((state) => state.career);
  const users = useUserStore((state) => state.users);

  const filteredUsers = users
    .filter((user) => user.id !== userId)
    .filter((user) => {
      const matchRole = !role || user.role === role;
      const matchCareer = !career || user.career === career;
      return matchRole && matchCareer;
    });
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
          setChatTab('sent');
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
  const exploreCards = filteredUsers.map((user) => {
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
      if (state === 'MOVE') buttonLabel = '채팅방으로 이동';
      else if (state === 'WAITING') buttonLabel = '수락 대기중...';

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
    <div className="hidden tablet:flex flex-col w-full h-screen bg-[#141415] text-white">
      <div className="flex flex-col gap-1 mb-4">
        <span className="text-lg font-semibold">
          {mode === 'chat' ? '채팅 요청' : '탐색하기'}
        </span>
        <span className="text-sm text-gray-400">
          {mode === 'chat'
            ? '보낸 요청과 받은 요청을 빠르게 확인하는 공간입니다.'
            : '같은 관심사를 가진 사람과 네트워킹하세요'}
        </span>
      </div>

      {mode === 'explore' && (
        <div className="mb-4">
          <Filter />
        </div>
      )}

      {mode === 'chat' && (
        <div className="flex gap-4 mb-6">
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

      <div className="grid grid-cols-2 gap-x-[20px] px-[20px] overflow-y-auto flex-grow w-full">
        {visibleCards.map((card, index) => {
          let marginTop = 0;
          if (index === 0) marginTop = 40;
          else if (index === 1) marginTop = 60;
          else if (index % 2 === 0) marginTop = 40 + (index / 2) * 20;
          else marginTop = 60 + Math.floor(index / 2) * 20;

          return (
            <div key={index} style={{ marginTop: `${marginTop}px` }}>
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSheet;
