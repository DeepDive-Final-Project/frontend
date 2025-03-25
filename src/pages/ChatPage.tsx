import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatFilter from '@/components/chatting/ChatFilter';
import ChatList from '@/components/chatting/ChatList';
import ChatHeader from '@/components/chatting/ChatHeader';
import ChatRoom from '@/components/chatting/ChatRoom';
import Button from '@/components/common/Button';
import { ChatRoomType } from '@/types/chatRoomType';
import { api } from '@/utils/api';
import profileImg from '@/assets/images/explore.svg';

// 현재 로그인한 사용자 (임시)
const currentUser = localStorage.getItem('userId');

const filterOption = [
  { label: '최신 메세지 순', value: 'latest' },
  { label: '안읽은 메세지 순', value: 'unread' },
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);
  const [selectedOption, setSelectedOption] = useState(filterOption[0]);
  const roomId = searchParams.get('roomId');

  // 채팅방 정렬 리스트
  const fetchChat = async () => {
    const endpoint = selectedOption.value;
    const response = await api.get(
      `/api/chat/${endpoint}?nickname=${currentUser}`,
    );
    return response.data;
  };

  const {
    data: chatRooms = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chatRooms', selectedOption],
    queryFn: fetchChat,
  });

  useEffect(() => {
    if (!roomId) return;
    setSelectedRoom(
      chatRooms.find((room: ChatRoomType) => room.roomId === Number(roomId)) ??
        null,
    );
  }, [roomId, chatRooms]);

  const onSelectRoom = (room: ChatRoomType) => {
    setSelectedRoom(room);
  };

  const onBackToList = () => {
    setSelectedRoom(null);
    navigate('/chat', { replace: true });
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="max-w-[1440px] m-auto flex h-screen overflow-hidden">
      <div
        className={`flex flex-col w-full h-full desktop:max-w-[400px] tablet:max-w-[320px] overflow-y-auto border border-l-0 border-t-0 border-b-0 border-[#222325] bg-[#0A0A0B] ${selectedRoom ? 'hidden tablet:flex' : 'flex'}`}>
        <ChatFilter
          filter={{
            options: filterOption,
            selected: selectedOption,
            onChange: setSelectedOption,
          }}
        />
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
        className={`relative flex-auto flex-col ${
          selectedRoom ? 'flex' : 'hidden tablet:flex'
        }`}>
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

export default ChatPage;
