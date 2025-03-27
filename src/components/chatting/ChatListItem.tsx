import { useChatStore } from '@/stores/useChatStore';
import { formatTime } from '@/utils/chat/formatTime';
import { ChatRoomType } from '@/types/chatRoomType';

interface ChatListItemProps {
  chat: ChatRoomType;
  onSelectRoom: (roomId: ChatRoomType) => void;
}

const currentUser = localStorage.getItem('userNickname');

const ChatListItem = ({ chat, onSelectRoom }: ChatListItemProps) => {
  const lastMessages = useChatStore((state) => state.lastMessages);
  const lastMessageData = lastMessages[chat.roomId];

  // 채팅 상대 찾기
  const otherParticipant = chat.participants.find(
    (nickname) => nickname !== currentUser,
  );

  return (
    <li
      className="relative flex items-start p-[20px] min-h-[100px] bg-[#0F0F10] hover:bg-[#262627] transition-colors duration-300"
      onClick={() => onSelectRoom(chat)}>
      <div className="flex-shrink-0 w-[50px] h-[50px] mr-4 rounded-full bg-white">
        <div className="w-full h-full overflow-hidden" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-lg">{otherParticipant}</p>
          <span className="text-xs">
            {formatTime(
              lastMessageData?.timeStamp ?? chat.lastMessageTime ?? undefined,
            )}
          </span>
        </div>
        <div className="relative pr-[66px] mt-1">
          <p className="text-[#B7B9BD] text-sm line-clamp-2 leading-relaxed">
            {lastMessageData?.content ?? chat.lastMessage}
          </p>
          {chat.unreadCount > 0 && (
            <span className="absolute top-0 right-[14.5px] flex items-center justify-center w-5 h-5 text-white text-xs bg-[#FF1313] rounded-full">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default ChatListItem;
