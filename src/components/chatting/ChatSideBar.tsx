import { LogOut, Shield } from 'react-feather';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { useSocketStore } from '@/stores/useSocketStore';
import { useChatListStore } from '@/stores/useChatListStore';
import { AxiosError } from 'axios';

interface ChatSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: number;
  userId: number;
}

const ChatSideBar = ({ isOpen, onClose, roomId, userId }: ChatSideBarProps) => {
  const queryClient = useQueryClient();
  const { disconnect } = useSocketStore.getState();
  const { removeChatRoom } = useChatListStore();

  const handleLeaveChat = async () => {
    try {
      const { data } = await api.get(`/api/chat/${roomId}/exists`);

      if (!data.exists) {
        console.log('이미 삭제된 채팅방입니다.');
        //queryClient.invalidateQueries();
        removeChatRoom(roomId);
        onClose();

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
      onClose();
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
      {isOpen && (
        <div
          className="fixed z-10 top-0 inset-0 bg-black bg-opacity-70"
          onClick={onClose}
        />
      )}
      <div
        className={`absolute z-50 top-0 right-0 w-[175px] h-full text-left bg-[#141415] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <p className="pt-[16px] px-[20px] pb-[8px] text-sm text-[#A2A4AA] font-bold">
          채팅 메뉴
        </p>
        <ul>
          <li className="border-b border-[#1E1E1F]">
            <button
              onClick={handleLeaveChat}
              className="flex w-full text-left p-[10px] pl-[20px] pr-[10px] items-center">
              <LogOut size={16} className="mr-2" />
              채팅방 떠나기
            </button>
          </li>
          <li className="border-b border-[#1E1E1F]">
            <button className="flex w-full text-left p-[10px] pl-[20px] pr-[10px] items-center">
              <Shield size={16} className="mr-2" />
              신고하기
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ChatSideBar;
