import { useEffect } from 'react';
import ChatProfileInfo from '@/components/chatting/ChatProfileInfo';
import ChatInput from '@/components/chatting/ChatInput';
import ChatMessageItem from '@/components/chatting/ChatMessageItem';
import { ChatRoomType } from '@/types/chatRoomType';
import { useChatStore } from '@/stores/useChatStore';
import { api } from '@/utils/api';

const userId = localStorage.getItem('userId');

interface ChatRoomProps {
  selectedRoom: ChatRoomType;
}

const ChatRoom = ({ selectedRoom }: ChatRoomProps) => {
  const { setMessages, messagesByRoom } = useChatStore();

  useEffect(() => {
    if (!selectedRoom?.roomId || !userId) return;

    if (messagesByRoom[selectedRoom.roomId]) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(
          `/api/messages/${selectedRoom.roomId}?clientId=${userId}`,
        );
        setMessages(selectedRoom.roomId, res.data);
      } catch (err) {
        console.error('메시지 불러오기 실패:', err);
      }
    };

    fetchMessages();
  }, [selectedRoom?.roomId]);

  return (
    <>
      <div className="relative flex flex-col flex-auto p-5 overflow-y-auto scrollbar-hide">
        <ChatProfileInfo />
        <div className="flex flex-col pt-5">
          <ChatMessageItem roomId={selectedRoom.roomId} />
        </div>
      </div>
      <ChatInput />
    </>
  );
};

export default ChatRoom;
