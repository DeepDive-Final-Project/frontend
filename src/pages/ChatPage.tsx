import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ChatList from '@/components/chatting/ChatList';
import ChatHeader from '@/components/chatting/ChatHeader';
import ChatRoom from '@/components/chatting/ChatRoom';
import ChatFilter from '@/components/chatting/ChatFilter';
import { useChatListStore } from '@/stores/useChatListStore';
import { useChatMyInfo } from '@/stores/useChatMyInfoStore';
import { fetchChatListApi } from '@/services/chatListApi';
import { ChatFilterOption } from '@/types/chatFilterOptionType';
import { useSocketStore } from '@/stores/useSocketStore';

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

  // 채팅방 정렬 상태 저장
  const [selectedOption, setSelectedOption] = useState<ChatFilterOption>(
    filterOptions[0],
  );

  const { isLoading, error } = useQuery({
    queryKey: ['chatList', nickName, selectedOption],
    queryFn: async () => {
      const data = await fetchChatListApi(nickName ?? '', selectedOption.value);
      useChatListStore.getState().setChatList(data);

      // 데이터 상태 확인용
      console.log(data);
      return data;
    },
  });

  //
  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [connect, isConnected]);

  useEffect(() => {
    if (chatList.length > 0 && roomId) {
      const room = chatList.find((room) => room.roomId === roomId);

      if (room) setSelectedRoom(room);
    }
  }, [chatList, roomId, setSelectedRoom]);

  const otherUser = selectedRoom?.participants.find(
    (nickname) => nickname !== nickName,
  );

  // 모바일: 뒤로가기 클릭 시
  const onBackToList = () => setSelectedRoom(null);

  if (userId === undefined) {
    return;
  }

  if (isLoading || userId === undefined) {
    return (
      <div className="pt-10 text-center text-[#A2A4AA]">
        사용자 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] m-auto flex h-screen overflow-hidden">
      <div
        className={`flex flex-col w-full h-full desktop:max-w-[400px] tablet:max-w-[320px] flex-shrink-0 overflow-y-auto border border-l-0 border-t-0 border-b-0 border-[#222325] bg-[#0A0A0B] ${selectedRoom ? 'hidden tablet:flex' : 'flex'}`}>
        <ChatFilter
          filter={{
            options: filterOptions,
            selected: selectedOption,
            onChange: setSelectedOption,
          }}
        />
        <ChatList
          isLoading={isLoading}
          error={error}
          onSelectRoom={(room) => {
            setSelectedRoom(room);
          }}
        />
      </div>
      <div
        className={`relative flex-auto flex-col ${
          selectedRoom ? 'flex' : 'hidden tablet:flex'
        }`}>
        <ChatHeader
          otherUser={otherUser}
          roomId={selectedRoom?.roomId ?? 0}
          userId={userId}
          onBackToList={onBackToList}
        />
        <ChatRoom room={selectedRoom} />
      </div>
    </div>
  );
};

export default ChatPage;
