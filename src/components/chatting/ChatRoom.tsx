import { useEffect, useRef } from 'react';
import { useSocketStore } from '@/stores/useSocketStore';
import { useChatMessageStore } from '@/stores/useChatMessageStore';
import ChatProfileInfo from '@/components/chatting/ChatProfileInfo';
import ChatInput from '@/components/chatting/ChatInput';
import ChatMessageItem from '@/components/chatting/ChatMessageItem';
import { ChatRoomType } from '@/types/chatRoomType';
import { useChatListStore } from '@/stores/useChatListStore';
import { useChatMyInfo } from '@/stores/useChatMyInfoStore';
import { fetchMessagesApi } from '@/services/chatMessageApi';

interface ChatRoomProps {
  room: ChatRoomType | null;
  onExpandMessage?: (content: string) => void;
}

const ChatRoom = ({ room, onExpandMessage }: ChatRoomProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { stompClient } = useSocketStore();
  const { userId, nickName } = useChatMyInfo();
  const { appendMessage, setMessages, clearMessages, messagesByRoom } =
    useChatMessageStore();
  const { updateLastMessage } = useChatListStore();

  const messages = room ? messagesByRoom[room.roomId] || [] : [];

  // 이전 메시지 불러오기
  useEffect(() => {
    if (!room || !userId) return;

    const fetchMessages = async () => {
      try {
        const messages = await fetchMessagesApi(room.roomId, Number(userId));
        setMessages(room.roomId, messages);
      } catch (error) {
        console.error('메시지 불러오기 실패', error);
      }
    };

    fetchMessages();
  }, [room?.roomId, userId, setMessages]);

  // 이전 메세지 불러온 뒤 하단 이동
  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
    });
  }, [messages.length]);

  useEffect(() => {
    if (!room || !stompClient || !stompClient.connected) return;

    const subscription = stompClient.subscribe(
      `/queue/${room.roomId}`,
      (message) => {
        const newMessage = JSON.parse(message.body);

        appendMessage(room.roomId, newMessage);
        updateLastMessage(room.roomId, newMessage);
      },
    );

    return () => {
      subscription.unsubscribe();
      clearMessages(room.roomId);
    };
  }, [
    room?.roomId,
    stompClient?.connected,
    appendMessage,
    updateLastMessage,
    clearMessages,
  ]);

  if (!room) {
    return (
      <div className="pt-[86px] text-[#A2A4AA] text-sm text-center font-medium">
        채팅방을 선택해주세요
      </div>
    );
  }

  const otherId = room.otherId;

  return (
    <>
      <div
        ref={scrollRef}
        className="relative flex flex-col flex-auto p-5 overflow-y-auto scrollbar-hide">
        <ChatProfileInfo otherId={otherId} />
        <div className="flex flex-col pt-5">
          <ChatMessageItem
            roomId={room.roomId}
            chatParticipants={room.participants}
            nickName={nickName ?? ''}
            onExpand={onExpandMessage}
          />
        </div>
      </div>
      <ChatInput
        roomId={room.roomId}
        nickName={nickName ?? ''}
        socketRef={{ current: stompClient }}
      />
    </>
  );
};

export default ChatRoom;
