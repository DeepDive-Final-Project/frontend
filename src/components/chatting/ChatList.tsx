import { Link, useNavigate } from 'react-router-dom';
import { useChatListStore } from '@/stores/useChatListStore';
import ChatListItem from './ChatListItem';
import Button from '@/components/common/Button';
import { ChatRoomType } from '@/types/chatRoomType';
import profileImg from '@/assets/images/explore.svg';

interface ChatListProps {
  isLoading: boolean;
  error: unknown;
  onSelectRoom: (room: ChatRoomType) => void;
}

const ChatList = ({ isLoading, error, onSelectRoom }: ChatListProps) => {
  const navigate = useNavigate();
  const { chatList, setSelectedRoom } = useChatListStore();

  const handleSelectRoom = (room: ChatRoomType) => {
    setSelectedRoom(room);
    navigate(`/chat?roomId=${room.roomId}`);
    onSelectRoom(room);
  };

  if (isLoading) {
    return (
      <p className="pt-8 text-sm text-[#A2A4AA] text-center">
        채팅 리스트를 불러오는 중입니다.
      </p>
    );
  }

  if (error) {
    return (
      <p className="pt-8 text-sm text-[#A2A4AA] text-center">
        채팅 리스트를 불러오는 데 실패했어요.
      </p>
    );
  }

  if (chatList.length === 0) {
    return (
      <div
        style={{ backgroundImage: `url(${profileImg})` }}
        className="pt-[170px] px-[20px] text-center bg-center bg-no-repeat">
        <p>
          내 주변 참가자를 탐색하고 <br />
          채팅을 시작해보세요
        </p>
        <Button as={Link} to="/home" className="mt-5">
          지금 탐색하러 가기
        </Button>
      </div>
    );
  }

  return (
    <ul className="space-y-2 overflow-y-auto py-2">
      {chatList.map((room) => (
        <ChatListItem
          key={room.roomId}
          room={room}
          onClick={handleSelectRoom}
        />
      ))}
    </ul>
  );
};

export default ChatList;
