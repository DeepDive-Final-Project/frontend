import ChatProfileInfo from '@/components/chatting/ChatProfileInfo';
import ChatInput from '@/components/chatting/ChatInput';
import { ChatRoomType } from '@/types/chatRoomType';
import ChatMessageItem from './ChatMessageItem';

interface ChatRoomProps {
  selectedRoom: ChatRoomType;
}

const ChatRoom = ({ selectedRoom }: ChatRoomProps) => {
  return (
    <>
      <div className="relative flex flex-col flex-auto p-5 overflow-y-auto scrollbar-hide">
        <ChatProfileInfo />
        <div className="flex flex-col pt-5">
          {selectedRoom.roomId}
          <ChatMessageItem />
        </div>
      </div>
      <ChatInput />
    </>
  );
};

export default ChatRoom;
