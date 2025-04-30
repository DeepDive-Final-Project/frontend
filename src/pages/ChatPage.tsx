import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ChatList from '@/components/chatting/ChatList';
import ChatHeader from '@/components/chatting/ChatHeader';
import ChatRoom from '@/components/chatting/ChatRoom';
import ChatFilter from '@/components/chatting/ChatFilter';
import FullMessageViewer from '@/components/chatting/FullMessageViewer';
import { useChatListStore } from '@/stores/useChatListStore';
import { useChatMyInfo } from '@/stores/useChatMyInfoStore';
import { fetchChatListApi } from '@/services/chatListApi';
import { ChatFilterOption } from '@/types/chatFilterOptionType';
import { useSocketStore } from '@/stores/useSocketStore';
import { toast } from 'react-toastify';

const filterOptions: ChatFilterOption[] = [
  { label: '최신 메세지 순', value: 'latest' },
  { label: '안읽은 메세지 순', value: 'unread' },
];

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId'));
  const { userId, nickName } = useChatMyInfo();
  const { chatList, selectedRoom, setSelectedRoom } = useChatListStore();
  const { connect, isConnected } = useSocketStore();

  // 채팅 메시지 전체보기 상태
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  // 채팅방 정렬 상태 저장
  const [selectedOption, setSelectedOption] = useState<ChatFilterOption>(
    filterOptions[0],
  );

  const { isLoading, error } = useQuery({
    queryKey: ['chatList', userId, selectedOption],
    queryFn: async () => {
      const data = await fetchChatListApi(userId || 0, selectedOption.value);

      // 읽음 처리된 상태로 먼저 필터링
      const filtered = data.map((room) => {
        const isMyMessage = room.lastSenderid === userId;
        const isSelectedRoom = room.roomId === roomId;

        if (isSelectedRoom && isMyMessage) {
          return {
            ...room,
            unreadCount: 0,
          };
        }

        return room;
      });

      // 정렬 추가
      const sorted = [...filtered].sort((a, b) => {
        if (selectedOption.value === 'unread') {
          return (b.unreadCount ?? 0) - (a.unreadCount ?? 0);
        } else {
          return (
            new Date(b.lastMessageTime ?? '').getTime() -
            new Date(a.lastMessageTime ?? '').getTime()
          );
        }
      });

      useChatListStore.getState().setChatList(sorted);
      return sorted;
    },
  });

  useEffect(() => {
    return () => {
      setSelectedRoom(null);  // selectedRoom 초기화
    };
  }, []);
  
  //
  useEffect(() => {
    if (!isConnected && nickName) {
      connect(() => {
        const client = useSocketStore.getState().stompClient;
        if (client) {
          client.subscribe(
            `/queue/chat-notification/${nickName}`,
            (message) => {
              const payload = JSON.parse(message.body);
              console.log('수신한 메시지 데이터', payload);

              const sender = payload.senderNickname ?? '알 수 없음';
              const content = payload.messagePreview ?? '';
              const sentAt = payload.sentAt ?? '';

              const currentRoomId =
                useChatListStore.getState().selectedRoom?.roomId;

              if (payload.senderNickname === nickName) {
                return;
              }

              if (currentRoomId !== payload.roomId) {
                // 현재 방과 알림 메시지 온 방 id가 다른 경우

                // 알림 내용 설정
                toast.info(
                  <div>
                    <p className="text-[#E6E6E6]">{sender}</p>
                    <p className="text-[#B7B9BD] font-medium line-clamp-2 leading-normal">
                      {content}
                    </p>
                  </div>,
                );

                useChatListStore.setState((state) => ({
                  chatList: state.chatList.map((room) => {
                    if (room.roomId === payload.roomId) {
                      return {
                        ...room,
                        lastMessage: content,
                        lastMessageTime: sentAt,
                        unreadCount:
                          room.roomId !== currentRoomId
                            ? room.unreadCount + 1
                            : room.unreadCount,
                      };
                    }
                    return room;
                  }),
                }));
              }
            },
          );
        }
      });
    }
  }, [connect, isConnected, nickName]);

  useEffect(() => {
    if (chatList.length > 0 && roomId && !isLoading) {
      const room = chatList.find((room) => room.roomId === roomId);

      if (room) setSelectedRoom({ ...room, unreadCount: 0 });
    }
  }, [chatList, roomId, setSelectedRoom, isLoading]);

  const otherUser = selectedRoom?.participants.find(
    (nickname) => nickname !== nickName,
  );

  // 모바일: 뒤로가기 클릭 시
  const onBackToList = () => setSelectedRoom(null);

  if (isLoading || userId === undefined) {
    return (
      <div className="pt-10 text-center text-[#A2A4AA]">
        사용자 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <div
        className={`
    flex flex-col flex-shrink-0 h-full
    border border-[#222325] bg-[#0A0A0B]
    w-full tablet:w-[320px]
    ${expandedMessage ? 'desktop:w-1/3' : 'desktop:w-[400px]'}
    ${selectedRoom ? 'hidden tablet:flex' : 'flex'}
  `}>
        <div className="sticky top-0 z-10 bg-[#0A0A0B]">
          <ChatFilter
            filter={{
              options: filterOptions,
              selected: selectedOption,
              onChange: setSelectedOption,
            }}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <ChatList
            isLoading={isLoading}
            error={error}
            onSelectRoom={(room) => {
              setSelectedRoom(room);
            }}
          />
        </div>
      </div>
      <div
        className={`
      relative flex flex-col flex-auto
      ${selectedRoom ? 'flex' : 'hidden'} tablet:flex
    `}>
        <div>
          <ChatHeader
            otherUser={otherUser}
            roomId={selectedRoom?.roomId ?? 0}
            userId={userId}
            onBackToList={onBackToList}
          />
        </div>
        <ChatRoom
          room={selectedRoom}
          onExpandMessage={(content) => setExpandedMessage(content)}
        />
      </div>
      {/* 메세지 전체보기 */}
      {expandedMessage && (
        <FullMessageViewer
          expandedMessage={expandedMessage}
          onClose={() => setExpandedMessage(null)}
        />
      )}
    </div>
  );
};

export default ChatPage;
