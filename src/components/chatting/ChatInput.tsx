import { useState } from 'react';
import { AlertCircle, CornerDownRight } from 'react-feather';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const maxLength = 1000;

  return (
    <div className="pb-[66px]">
      <div className="relative flex-shrink-0 w-full px-5 flex items-end">
        <textarea
          className={`w-full py-2 px-5 rounded-[20px] resize-none text-[#E6E6E6] text-sm placeholder-[#A2A4AA] bg-[#1E1E1F] border border-[#1E1E1F] ${
            message.length > maxLength
              ? 'border-[#FF2B2B] focus:border-[#FF2B2B]'
              : 'border-[#1E1E1F]'
          } focus:outline-none focus:ring-0 focus:border-[#8D8F96]`}
          placeholder="채팅을 입력해주세요"
          value={message}
          rows={1}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="w-[40px] h-[40px] flex-shrink-0 ml-2 rounded-full bg-[#1E1E1F] disabled:bg-[#141415] disabled:cursor-not-allowed"
          aria-label="메세지 전송 버튼"
          disabled={message.length > maxLength}>
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
