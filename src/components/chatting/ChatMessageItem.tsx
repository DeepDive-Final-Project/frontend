import { useChatStore } from '@/stores/useChatStore';
import { formatTime } from '@/utils/chat/formatTime';

interface ChatMessageItemProps {
  roomId: number;
}

const currentUser = localStorage.getItem('userNickname');

const ChatMessageItem = ({ roomId }: ChatMessageItemProps) => {
  const rawMessages = useChatStore((state) => state.messagesByRoom[roomId]);
  const messages = rawMessages ?? [];

  return (
    <>
      {messages.map((msg, index) => (
        <div key={msg.messageId ?? index} className="space-y-2">
          {msg.type === 'JOIN' || msg.type === 'LEAVE' ? (
            <div className="mb-7 text-center text-sm font-medium text-[#A2A4AA]">
              {msg.content}
            </div>
          ) : (
            <div
              className={`flex ${
                msg.senderNickname === currentUser
                  ? 'justify-end'
                  : 'justify-start'
              }`}>
              <div className="flex flex-col max-w-[640px]">
                <div
                  className={`inline-block p-2 px-4 break-words leading-relaxed ${
                    msg.senderNickname === currentUser
                      ? 'bg-point-blue text-white self-end rounded-br-none rounded-tl-lg rounded-tr-lg rounded-bl-lg'
                      : 'bg-[#141415] text-white self-start rounded-bl-none rounded-tl-lg rounded-tr-lg rounded-br-lg'
                  }`}>
                  {msg.content}
                </div>
                <p className="mt-1 text-[#A2A4AA] text-right text-xs">
                  {formatTime(msg.timeStamp)}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ChatMessageItem;
