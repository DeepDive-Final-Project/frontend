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
const currentUser = localStorage.getItem('userNickname');

const filterOption = [
  { label: '최신 메세지 순', value: 'latest' },
  { label: '안읽은 메세지 순', value: 'unread' },
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);

  // 채팅방 정렬 상태 저장
  const [selectedOption, setSelectedOption] = useState(filterOption[0]);

  const roomId = Number(searchParams.get('roomId'));

  // 채팅방 정렬 리스트
  const fetchChat = async () => {
    const endpoint = selectedOption.value;
    const res = await api.get(`/api/chat/${endpoint}?nickname=${currentUser}`);

    return res.data;
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
    if (isLoading) return;

    if (roomId) {
      const found = chatRooms.find(
        (room: ChatRoomType) => room.roomId === roomId,
      );
      setSelectedRoom(found ?? null);
    } else {
      setSelectedRoom(null);
    }
  }, [roomId, chatRooms, isLoading]);

  const onSelectRoom = (room: ChatRoomType) => {
    setSelectedRoom(room);
    navigate(`/chat?roomId=${room.roomId}`, { replace: true });
  };

  const onBackToList = () => {
    setSelectedRoom(null);
    navigate('/chat', { replace: true });
  };

  if (error) return <p>{error.message}</p>;

  return (
    <div className="max-w-[1440px] m-auto flex h-screen overflow-hidden">
      <div
        className={`flex flex-col w-full h-full desktop:max-w-[400px] tablet:max-w-[320px] flex-shrink-0 overflow-y-auto border border-l-0 border-t-0 border-b-0 border-[#222325] bg-[#0A0A0B] ${selectedRoom ? 'hidden tablet:flex' : 'flex'}`}>
        <ChatFilter
          filter={{
            options: filterOption,
            selected: selectedOption,
            onChange: setSelectedOption,
          }}
        />
        {isLoading ? (
          <p className="flex items-center justify-center pt-8 text-[#A2A4AA] text-sm">
            채팅 리스트를 불러오는 중입니다.
          </p>
        ) : chatRooms.length > 0 ? (
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
          <div className="text-[#A2A4AA] text-sm text-center font-medium pt-[86px]">
            채팅방을 선택해주세요
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
