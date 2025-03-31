import ChatBubble from '@/components/chatting/ChatBubble';
import { useChatMessageStore } from '@/stores/useChatMessageStore';
import { formatTime } from '@/utils/chat/formatTime';
import Button from '@/components/common/Button';
import { LogOut } from 'react-feather';

interface ChatMessageItemProps {
  roomId: number;
  chatParticipants: string[];
  nickName: string;
}

const ChatMessageItem = ({
  roomId,
  chatParticipants,
  nickName,
}: ChatMessageItemProps) => {
  const rawMessages = useChatMessageStore(
    (state) => state.messagesByRoom[roomId],
  );
  const messages = rawMessages ?? [];

  const other = chatParticipants.find(
    (userNickname) => userNickname !== nickName,
  );

  return (
    <>
      {messages.map((msg, index) => {
        const isMyMessage = msg.senderNickname === nickName;

        const isJoin = msg.type === 'JOIN';
        const isLeave = msg.type === 'LEAVE';

        if (isJoin || isLeave) {
          let displayText = msg.content;

          if (isJoin && isMyMessage && other) {
            displayText = `${other}님과의 대화가 시작되었어요.`;
          }
          if (isLeave && !isMyMessage && other) {
            displayText = `${msg.senderNickname}님이 퇴장했습니다.`;
          }
          return (
            <div
              key={index}
              className="mb-7 text-center text-sm font-medium text-[#A2A4AA]">
              <p>{displayText}</p>
              {isLeave && (
                <Button
                  size="sm"
                  variant="secondary"
                  icon={<LogOut size={16} className="text-[#e6e6e6]" />}
                  className="m-auto mt-2">
                  이 채팅방 떠나기
                </Button>
              )}
            </div>
          );
        }

        // 일반 메시지
        return (
          <div key={index} className="space-y-2">
            <div
              className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
              <div className="flex flex-col max-w-[640px]">
                <ChatBubble content={msg.content} isMyMessage={isMyMessage} />
                {msg.timeStamp && (
                  <p className="my-2 text-[#A2A4AA] text-right text-xs">
                    {formatTime(msg.timeStamp)}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChatMessageItem;
