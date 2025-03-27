import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import ChatProfileInfo from '@/components/chatting/ChatProfileInfo';
import ChatInput from '@/components/chatting/ChatInput';
import ChatMessageItem from '@/components/chatting/ChatMessageItem';
import { useChatStore } from '@/stores/useChatStore';
import { ChatRoomType } from '@/types/chatRoomType';
import { ChatMessageType } from '@/types/chatMessageType';
import { api } from '@/utils/api';

interface ChatRoomProps {
  selectedRoom: ChatRoomType;
}

const ChatRoom = ({ selectedRoom }: ChatRoomProps) => {
  const currentUserId = localStorage.getItem('userId');
  const currentUser = localStorage.getItem('userNickname');

  const socketRef = useRef<Client | null>(null);
  const { setMessages, appendMessage, messagesByRoom, setLastMessage } =
    useChatStore();

  useEffect(() => {
    if (!selectedRoom?.roomId || !currentUserId) return;

    const client = socketRef.current;
    if (client?.connected) return;

    const newClient = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_CHAT_URL),
      reconnectDelay: 5000,
      debug: (str) => console.log('[debug]', str),
    });

    socketRef.current = newClient;

    const fetchMessagesAndJoin = async (client: Client) => {
      try {
        const res = await api.get(
          `/api/messages/${selectedRoom.roomId}?clientId=${currentUserId}`,
        );
        const data: ChatMessageType[] = Array.isArray(res.data) ? res.data : [];
        setMessages(selectedRoom.roomId, data);

        if (data.length === 0 && client.connected) {
          const joinMessage: ChatMessageType = {
            roomId: selectedRoom.roomId,
            senderNickname: currentUser,
            content: `${currentUser}님과의 대화가 시작되었어요.`,
            type: 'JOIN',
            timeStamp: new Date().toISOString(),
          };
          client.publish({
            destination: '/app/chat.sendMessage',
            body: JSON.stringify(joinMessage),
          });
        }
      } catch (err) {
        console.error('메시지 불러오기 실패:', err);
        setMessages(selectedRoom.roomId, []);
      }
    };

    newClient.onConnect = () => {
      console.log('웹소켓 연결 완료');

      newClient.subscribe(`/queue/${selectedRoom.roomId}`, (message) => {
        const payload: ChatMessageType = JSON.parse(message.body);
        console.log('메세지 전달 확인', payload);

        const exists = messagesByRoom[selectedRoom.roomId]?.some((m) => {
          if (payload.messageId && m.messageId) {
            return m.messageId === payload.messageId;
          }
          return (
            m.type === payload.type &&
            m.senderNickname === payload.senderNickname &&
            m.content === payload.content &&
            m.timeStamp === payload.timeStamp
          );
        });

        if (!exists) {
          appendMessage(selectedRoom.roomId, payload);
          setLastMessage(selectedRoom.roomId, payload);
        }
      });

      fetchMessagesAndJoin(newClient);
    };

    newClient.onStompError = (frame) => {
      console.error('웹소켓 오류:', frame);
    };

    newClient.activate();

    return () => {
      if (socketRef.current) {
        socketRef.current.deactivate();

        console.log('웹소켓 연결 종료');

        socketRef.current = null;
      }
    };
  }, [selectedRoom.roomId]);

  return (
    <>
      <div className="relative flex flex-col flex-auto p-5 overflow-y-auto scrollbar-hide">
        <ChatProfileInfo />
        <div className="flex flex-col pt-5">
          <ChatMessageItem
            roomId={selectedRoom.roomId}
            chatParticipants={selectedRoom.participants}
            currentUser={currentUser}
          />
        </div>
      </div>
      <ChatInput
        roomId={selectedRoom.roomId}
        socketRef={socketRef}
        currentUser={currentUser}
      />
    </>
  );
};

export default ChatRoom;
