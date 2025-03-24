import { ChatRoomType } from '@/types/chatRoomType';
import { formatTime } from '@/utils/chat/formatTime';

interface ChatListItemProps {
  chat: ChatRoomType;
  onSelectRoom: (roomId: ChatRoomType) => void;
}

const ChatListItem = ({ chat, onSelectRoom }: ChatListItemProps) => {
  return (
    <li
      className="relative flex items-start p-[20px] min-h-[100px] bg-[#0F0F10] hover:bg-[#262627] transition-colors duration-300"
      onClick={() => onSelectRoom(chat)}>
      <div className="flex-shrink-0 w-[50px] h-[50px] mr-4 rounded-full bg-white">
        <div className="w-full h-full overflow-hidden" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-lg">{chat.participants}</p>
          <span className="text-xs">{formatTime(chat.lastMessageTime)}</span>
        </div>
        <div className="relative pr-[66px] mt-1">
          <p className="text-[#B7B9BD] text-sm line-clamp-2 leading-relaxed">
            {chat.lastMessage}
          </p>
          <span className="absolute top-0 right-[14.5px] flex items-center justify-center w-5 h-5 text-white text-xs bg-[#FF1313] rounded-full">
            5
          </span>
        </div>
      </div>
    </li>
  );
};

export default ChatListItem;
