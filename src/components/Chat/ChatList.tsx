import ChatListItem from '@/components/Chat/ChatListItem';
import { ChatRoomType } from '@/types/chatRoom';

interface ChatListProps {
  chatRooms: ChatRoomType[];
  onSelectRoom: (roomId: ChatRoomType) => void;
}

const ChatList = ({ chatRooms, onSelectRoom }: ChatListProps) => {
  return (
    <ul className="space-y-2 overflow-y-auto">
      {chatRooms.map((chat) => (
        <ChatListItem
          key={chat.roomId}
          chat={chat}
          onSelectRoom={onSelectRoom}
        />
      ))}
    </ul>
  );
};

export default ChatList;
