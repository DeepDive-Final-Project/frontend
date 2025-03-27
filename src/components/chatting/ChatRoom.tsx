import Button from '@/components/common/Button';
import ChatProfileInfo from '@/components/chatting/ChatProfileInfo';
import ChatInput from '@/components/chatting/ChatInput';
import { ChatRoomType } from '@/types/chatRoomType';
import { LogOut } from 'react-feather';

interface ChatRoomProps {
  selectedRoom: ChatRoomType;
}

const ChatRoom = ({ selectedRoom }: ChatRoomProps) => {
  return (
    <>
      <div className="relative flex flex-col flex-auto p-5 overflow-y-auto scrollbar-hide">
        <ChatProfileInfo />
        <div className="flex flex-col pt-5">
          <b className="mb-1 text-center text-sm text-[#A2A4AA]">오늘</b>
          <p className="mb-7 text-center text-sm font-medium text-[#A2A4AA]">
            <b>{selectedRoom.participants}</b>님과의 대화가 시작되었어요
          </p>
          <p className="mb-7 text-center text-sm font-medium text-[#A2A4AA]">
            <b>{selectedRoom.participants}</b>님이 채팅방을 떠났습니다
            <Button
              size="sm"
              variant="secondary"
              icon={<LogOut size={16} className="text-[#e6e6e6]" />}
              className="m-auto mt-2">
              이 채팅방 떠나기
            </Button>
          </p>

          <div className="flex justify-start mb-5">
            <div className="flex flex-col max-w-[640px]">
              <p className="p-2 px-4 leading-[1.5] break-words text-white self-start rounded-bl-none rounded-tl-lg rounded-tr-lg rounded-br-lg bg-[#141415]">
                안녕하세요 반갑습니다. 저는 김민수라고 합니다. 대화 수락해
                주셔서 감사합니다. AI에 관심이 많아 보이셔서, 함께 얘기 나누고
                싶어서 연락드렸습니다.
              </p>
              <p className="mt-1 text-[#A2A4AA] text-right text-xs">
                오후 3:30
              </p>
            </div>
          </div>
          <div className="flex justify-end mb-5">
            <div className="flex flex-col max-w-[640px]">
              <p className="p-2 px-4 leading-[1.5] break-words text-white self-end rounded-br-none rounded-tl-lg rounded-tr-lg rounded-bl-lg bg-point-blue">
                안녕하세요, 반갑습니다 민수님~! 채팅 주셔서 감사합니다. 혹시
                만나서 이야기 나눌까요? 몇 시쯤 시간 괜찮으신가요?
              </p>
              <p className="mt-1 text-[#A2A4AA] text-right text-xs">
                오후 3:30
              </p>
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </>
  );
};

export default ChatRoom;
