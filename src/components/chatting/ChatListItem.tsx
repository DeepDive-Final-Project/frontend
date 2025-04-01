import { useUserProfile } from '@/hooks/useUserProfile';
import { useChatMyInfo } from '@/stores/useChatMyInfoStore';
import { ChatRoomType } from '@/types/chatRoomType';
import { formatTime } from '@/utils/chat/formatTime';

interface ChatListItemProps {
  room: ChatRoomType;
  onClick: (room: ChatRoomType) => void;
}

const ChatListItem = ({ room, onClick }: ChatListItemProps) => {
  const { participants, lastMessage, lastMessageTime, unreadCount } = room;

  const { profile } = useUserProfile(room.otherId);
  const { nickName } = useChatMyInfo();

  const otherUser = participants.find(
    (userNickname) => userNickname !== nickName,
  );

  return (
    <li
      onClick={() => onClick(room)}
      className="relative flex items-start p-[20px] min-h-[100px] bg-[#0F0F10] hover:bg-[#141415] transition-colors duration-300">
      <div className="flex-shrink-0 w-[50px] h-[50px] mr-4 rounded-full bg-white">
        <div className="w-full h-full overflow-hidden">
          {profile && (
            <img
              src={profile.profileImage}
              alt={`${profile.nickName}님의 프로필`}
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-lg">{otherUser}</p>
          <span className="text-xs">{formatTime(lastMessageTime ?? '')}</span>
        </div>
        <div className="relative pr-[50px] mt-1">
          <p className="text-[#B7B9BD] text-sm line-clamp-2 leading-relaxed">
            {lastMessage}
          </p>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-[14.5px] flex items-center justify-center w-5 h-5 text-white text-xs bg-[#FF1313] rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default ChatListItem;
