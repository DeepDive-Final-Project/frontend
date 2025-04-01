import { useState } from 'react';
import { Menu, Bell, BellOff, ArrowLeft } from 'react-feather';
import ChatSideBar from '@/components/chatting/ChatSideBar';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { useSocketStore } from '@/stores/useSocketStore';
import { useChatListStore } from '@/stores/useChatListStore';
import { AxiosError } from 'axios';

interface ChatHeaderProps {
  otherUser?: string;
  onBackToList: () => void;
  roomId: number;
  userId: number;
}

const ChatHeader = ({
  otherUser,
  onBackToList,
  roomId,
  userId,
}: ChatHeaderProps) => {
  const queryClient = useQueryClient();
  const { disconnect } = useSocketStore.getState();
  const { removeChatRoom } = useChatListStore();

  const [isBellOff, setBellOff] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleBell = () => setBellOff((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen(true);

  const handleLeaveChat = async () => {
    try {
      const { data } = await api.get(`/api/chat/${roomId}/exists`);

      if (!data.exists) {
        console.log('이미 삭제된 채팅방입니다.');
        //queryClient.invalidateQueries();
        removeChatRoom(roomId);
        setIsModalOpen(false);

        return;
      }
      // console.log('퇴장 요청 보낼 때:', roomId, currentUserId);

      // // LEAVE 메시지 전송
      // const leaveMessage: ChatMessageType = {
      //   messageId: Date.now(),
      //   roomId,
      //   senderNickname: currentUserNickname,
      //   content: `${currentUserNickname}님이 퇴장했습니다.`,
      //   type: 'LEAVE',
      //   timeStamp: new Date().toISOString(),
      // };

      // if (stompClient?.connected) {
      //   stompClient.publish({
      //     destination: '/app/chat.sendMessage',
      //     body: JSON.stringify(leaveMessage),
      //   });
      // }
      // console.log('삭제할 roomId:', Number(roomId));

      // 서버에 퇴장 요청
      await api.post('/api/chat/exit', {
        roomId,
        clientId: userId,
      });
      // console.log('API 응답:', response);
      // console.log('응답 상태 코드:', response.status);

      // 상태 정리
      removeChatRoom(roomId);

      queryClient.invalidateQueries({
        queryKey: ['chatSentList', userId ?? '', 'ACCEPTED'],
      });
      queryClient.invalidateQueries({
        queryKey: ['chatReceivedList', userId ?? '', 'ACCEPTED'],
      });

      disconnect();
      setIsModalOpen(false);
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      const errorMessage = axiosError.response?.data?.error;

      console.log(
        '퇴장 중 에러 발생:',
        errorMessage || axiosError.message || '알 수 없는 오류',
      );
    }
  };

  return (
    <>
      <div className="relative flex flex-shrink-0 items-center justify-between h-[52px] p-[20px] border-b border-b-[#222325] bg-[#0A0A0B]">
        <button
          aria-label="채팅 목록으로 가기"
          className="block tablet:hidden"
          onClick={onBackToList}>
          <ArrowLeft />
        </button>
        <p className="absolute left-1/2 transform -translate-x-1/2">
          {otherUser ?? ''}
        </p>
        <div className="flex space-x-4 ml-auto">
          <button
            aria-label={isBellOff ? '알림 켜기' : '알림 끄기'}
            onClick={toggleBell}>
            {isBellOff ? <Bell /> : <BellOff />}
          </button>
          <button aria-label="메뉴 열기" onClick={toggleSidebar}>
            <Menu />
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <ChatSideBar
          onClose={() => setSidebarOpen(false)}
          onLeaveConfirmCheck={() => {
            setSidebarOpen(false);
            setIsModalOpen(true);
          }}
        />
      )}
      {isModalOpen && (
        <ConfirmModal
          title="정말 이 대화방을 떠날까요?"
          description={
            <>
              채팅방을 떠나면{' '}
              <span className="text-[#FF7171] font-medium">
                메시지를 다시 확인하거나 복구할 수 없어요
              </span>
            </>
          }
          cancelText="이전"
          confirmText="네, 떠날래요"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleLeaveChat}
        />
      )}
    </>
  );
};

export default ChatHeader;
