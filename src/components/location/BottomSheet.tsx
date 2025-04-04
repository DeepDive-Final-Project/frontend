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
import { ChatRequestType } from '@/types/chatRequestType';
import { getChatButtonState } from '@/utils/chat/getChatButtonState';
import { User } from '@/stores/useUserStore';

const BottomSheet = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { userId } = useChatMyInfo();
  const { nickName } = useChatMyInfo();
  const { mutate: chatRequest } = useChatRequest();
  const { mutate: acceptRequest } = useAcceptRequest();
  const { mutate: rejectRequest } = useRejectRequest();

  useChatRequestFetch(nickName ?? '');

  const { sent, received } = useChatRequestStore();
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
    (req: ChatRequestType) => {
      acceptRequest(req.id, {
        onSuccess: (data) => {
          toast.success(`${req.senderNickname}님의 요청을 수락했습니다.`);
          queryClient.invalidateQueries({
            queryKey: ['chatReceivedList', nickName, 'PENDING'],
          });
          if (data.roomId) navigate(`/chat?roomId=${data.roomId}`);
        },
      });
    },
    [acceptRequest, navigate, queryClient, nickName],
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

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => user.id !== userId)
      .filter((user) => {
        const matchRole = !role || user.role === role;
        const matchCareer = !career || user.career === career;
        return matchRole && matchCareer;
      });
  }, [users, role, career, userId]);

  const getCardProps = (user: User) => {
    const buttonState = getChatButtonState(user.nickName, sent, received);
    const pendingReq = received.PENDING.find(
      (r) => r.senderNickname === user.nickName,
    );
    const acceptedReq = [...sent.ACCEPTED, ...received.ACCEPTED].find(
      (r) =>
        r.senderNickname === user.nickName ||
        r.receiverNickname === user.nickName,
    );

    return {
      buttonState,
      onRequest: () => handleRequest(user.nickName),
      onAccept: pendingReq ? () => handleAcceptRequest(pendingReq) : undefined,
      onReject: pendingReq
        ? () => handleRejectRequest(pendingReq.id)
        : undefined,
      onMoveToChat: acceptedReq
        ? () => chatRoomRequestId(acceptedReq.id, navigate)
        : undefined,
    };
  };

  const visibleCards = useMemo(() => {
    const base =
      mode === 'chat'
        ? chatTab === 'sent'
          ? sent.PENDING.concat(sent.ACCEPTED).map((req) =>
              users.find((u) => u.nickName === req.receiverNickname),
            )
          : received.PENDING.concat(received.ACCEPTED).map((req) =>
              users.find((u) => u.nickName === req.senderNickname),
            )
        : filteredUsers;

    return base
      .filter((u): u is User => !!u)
      .map((user: User) => (
        <UserCard
          key={user.id}
          user={user}
          isRequested={false}
          onSelect={handleUserSelect}
          selectedUserId={selectedUserId}
          {...getCardProps(user)}
        />
      ));
  }, [filteredUsers, users, sent, received, selectedUserId, chatTab, mode]);

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-[#141415] rounded-t-lg transition-all duration-100"
      style={{ height: `${height}px` }}>
      <div className="w-full h-full flex flex-col">
        <div
          className="flex justify-center py-2"
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={(e) => {
            if (!isDragging) return;
            const touchY = e.touches[0].clientY;
            const newHeight = window.innerHeight - touchY;
            setHeight(
              Math.max(100, Math.min(newHeight, window.innerHeight - 150)),
            );
          }}
          onTouchEnd={() => {
            setIsDragging(false);
            if (height < window.innerHeight / 3) setHeight(100);
            else setHeight(window.innerHeight - 150);
          }}>
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

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-[20px] px-[20px]">
            {visibleCards.map((card, index) => {
              const isLeftCol = index % 2 === 0;
              const isLast = index === visibleCards.length - 1;
              const isOddCount = visibleCards.length % 2 === 1;
              const shouldForceLeft = isLast && isOddCount;

              return (
                <div
                  key={index}
                  className={`mt-[${index < 2 ? (isLeftCol ? '40' : '60') : '20'}px] ${
                    isLeftCol || shouldForceLeft ? 'col-start-1' : ''
                  }`}>
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BottomSheet);
