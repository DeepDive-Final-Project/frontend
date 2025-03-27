import Button from '@/components/common/Button';
import { useChatStore } from '@/stores/useChatStore';
import { formatTime } from '@/utils/chat/formatTime';
import { chatTimeGroup } from '@/utils/chat/chatTimeGroup';
import { LogOut } from 'react-feather';

interface ChatMessageItemProps {
  roomId: number;
  chatParticipants: string[];
  currentUser: string | null;
}

const ChatMessageItem = ({
  roomId,
  chatParticipants,
  currentUser,
}: ChatMessageItemProps) => {
  const rawMessages = useChatStore((state) => state.messagesByRoom[roomId]);
  const messages = rawMessages ?? [];

  const other = chatParticipants.find((name) => name !== currentUser);

  return (
    <>
      {messages.map((msg, index) => {
        const current = msg;
        const next = messages[index + 1];

        const isLastOfGroup =
          index === messages.length - 1 ||
          next?.senderNickname !== current.senderNickname ||
          !chatTimeGroup(current.timeStamp, next?.timeStamp);

        const isJoin = msg.type === 'JOIN';
        const isLeave = msg.type === 'LEAVE';
        const isMy = msg.senderNickname === currentUser;

        // JOIN / LEAVE 메시지 처리
        if (isJoin || isLeave) {
          let displayText = msg.content;

          if (isJoin && msg.senderNickname === currentUser && other) {
            // 내가 보낸 JOIN: 상대방 기준으로 출력
            displayText = `${other}님과의 대화가 시작되었어요.`;
          }
          return (
            <div
              key={msg.messageId}
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
          <div key={msg.messageId ?? index} className="space-y-2">
            <div className={`flex ${isMy ? 'justify-end' : 'justify-start'}`}>
              <div className="flex flex-col max-w-[640px]">
                <div
                  className={`inline-block p-2 px-4 my-2  break-all leading-relaxed ${
                    isMy
                      ? 'bg-point-blue text-white self-end rounded-br-none rounded-tl-lg rounded-tr-lg rounded-bl-lg'
                      : 'bg-[#141415] text-white self-start rounded-bl-none rounded-tl-lg rounded-tr-lg rounded-br-lg'
                  }`}>
                  {msg.content}
                </div>
                {isLastOfGroup && msg.timeStamp && (
                  <p className="text-[#A2A4AA] text-right text-xs">
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
