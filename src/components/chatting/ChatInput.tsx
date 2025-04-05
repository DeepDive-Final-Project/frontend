import { useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { useChatMessageStore } from '@/stores/useChatMessageStore';
import { ChatMessageType } from '@/types/chatMessageType';
import { AlertCircle, CornerDownRight } from 'react-feather';
import { useChatListStore } from '@/stores/useChatListStore';

interface ChatInputProps {
  roomId: number;
  socketRef: { current: Client | null };
  nickName: string;
}

const ChatInput = ({ roomId, socketRef, nickName }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const maxLength = 1000;

  const { appendMessage } = useChatMessageStore();
  const { updateLastMessage } = useChatListStore();

  // 입력시 자동 높이 조절
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const handleResizeHei = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (!socketRef.current || !socketRef.current.connected || !nickName) {
      return;
    }
    const trimmed = message.trim();

    if (!trimmed) return;

    const chatMessage: ChatMessageType = {
      messageId: Date.now(),
      roomId,
      senderNickname: nickName,
      content: trimmed,
      timeStamp: new Date().toISOString(),
      type: 'CHAT',
    };

    // 서버에 전송
    socketRef.current.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(chatMessage),
    });

    // 상태 반영
    appendMessage(roomId, chatMessage);
    updateLastMessage(roomId, chatMessage, nickName);

    setMessage('');

    if (textarea.current) {
      textarea.current.style.height = 'auto';
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const trimmed = message.trim();
      if (trimmed === '') return;
      handleSend();
    }
  };

  return (
    <div className="pb-[66px]">
      <div className="relative flex-shrink-0 w-full px-5 flex items-end">
        <textarea
          ref={textarea}
          className={`w-full py-2 px-5 max-h-[97.5px] rounded-[20px] resize-none scrollbar-hide text-[#E6E6E6] text-sm leading-normal placeholder-[#A2A4AA] bg-[#1E1E1F] border ${
            message.length > maxLength
              ? 'border-[#FF2B2B] focus:border-[#FF2B2B]'
              : 'border-[#1E1E1F]'
          } focus:outline-none focus:ring-0 focus:border-[#8D8F96]`}
          placeholder="채팅을 입력해주세요"
          maxLength={maxLength}
          value={message}
          rows={1}
          onChange={(e) => setMessage(e.target.value)}
          onInput={handleResizeHei}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
        <button
          className="w-[40px] h-[40px] flex-shrink-0 ml-2 rounded-full bg-[#1E1E1F] disabled:bg-[#141415] disabled:cursor-not-allowed"
          aria-label="메세지 전송 버튼"
          onClick={handleSend}
          disabled={message.length > maxLength || !message.trim()}>
          <CornerDownRight size={16} className="m-auto" />
        </button>
      </div>
      {message.length > maxLength && (
        <p className="flex px-5 mt-[5px] align-center text-sm text-[#E51111]">
          <AlertCircle size={16} className="mr-1 text-[#E51111]" />
          현재 {message.length}자 | 최대 {maxLength}자
        </p>
      )}
    </div>
  );
};

export default ChatInput;
