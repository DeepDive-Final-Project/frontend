import { useState } from 'react';
import ChatFilter from '@/components/Chat/ChatFilter';
import ChatList from '@/components/Chat/ChatList';
import ChatHeader from '@/components/Chat/ChatHeader';
import ChatRoom from '@/components/Chat/ChatRoom';
import Button from '@/components/common/Button';
import { ChatRoomType } from '@/types/chatRoom';

import profileImg from '@/assets/images/explore.svg';

// chat mock data
const chatRooms: ChatRoomType[] = [
  {
    roomId: 1,
    participants: ['김민수'],
    lastMessage:
      '안녕하세요, 반갑습니다 민수님~! 채팅 주셔서 감사합니다. 혹시 만나서 이야기 나눌까요? 몇 시쯤 시간 괜찮으신가요?',
    lastMessageTime: '2025-03-16T15:55:46.311Z',
  },
  {
    roomId: 2,
    participants: ['홍길동'],
    lastMessage: '홍길동님이 대화를 요청했어요',
    lastMessageTime: '2025-03-16T15:30:00.000Z',
  },
  {
    roomId: 3,
    participants: ['하민지'],
    lastMessage: '대화 요청이 거절되었어요',
    lastMessageTime: '2025-03-16T15:30:00.000Z',
  },
];

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);

  const onSelectRoom = (roomId: ChatRoomType) => {
    setSelectedRoom(roomId);
  };

  const onBackToList = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="max-w-[1440px] m-auto flex h-screen overflow-hidden">
      <div
        className={`flex flex-col w-full h-full desktop:max-w-[400px] tablet:max-w-[320px] overflow-y-auto border border-l-0 border-t-0 border-b-0 border-[#222325] bg-[#0A0A0B] ${selectedRoom ? 'hidden tablet:flex' : 'flex'}`}>
        <ChatFilter />
        {chatRooms.length > 0 ? (
          <ChatList chatRooms={chatRooms} onSelectRoom={onSelectRoom} />
        ) : (
          <div
            style={{ backgroundImage: `url(${profileImg})` }}
            className="pt-[170px] px-[20px] text-center bg-center bg-no-repeat">
            <p>
              내 주변 참가자를 탐색하고 <br />
              채팅을 시작해보세요
            </p>
            <Button className="mt-[20px]">지금 탐색하러 가기</Button>
          </div>
        )}
      </div>
      <div
        className={`relative flex-auto flex-col ${selectedRoom ? 'flex' : 'hidden tablet:flex'}`}>
        <ChatHeader onBackToList={onBackToList} />
        {selectedRoom ? (
          <ChatRoom selectedRoom={selectedRoom} />
        ) : (
          <div className="text-[#A2A4AA] text-[14px] text-center font-medium pt-[86px]">
            채팅방을 선택해주세요
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
