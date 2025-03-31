import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'react-feather';

interface ChatBubbleProps {
  content: string;
  isMyMessage: boolean;
  onExpand?: (content: string) => void;
}

const MAX_HEIGHT = 135;

const ChatBubble = ({ content, isMyMessage, onExpand }: ChatBubbleProps) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHei = contentRef.current.scrollHeight;

      if (scrollHei > MAX_HEIGHT) setIsOverflowing(true);
    }
  }, [content]);

  return (
    <div
      className={`flex flex-col ${isMyMessage ? 'ml-8 self-end' : 'mr-8 self-start'}`}>
      <div
        ref={contentRef}
        className={`
      inline-block p-2 px-4 break-all leading-normal max-h-[132px]
      overflow-hidden whitespace-pre-line break-words text-white
      ${
        isMyMessage
          ? `bg-point-blue self-end rounded-tl-lg rounded-tr-lg ${
              isOverflowing ? '' : 'rounded-bl-lg rounded-br-none'
            }`
          : `bg-[#141415] self-start rounded-tl-lg rounded-tr-lg ${
              isOverflowing ? '' : 'rounded-bl-none rounded-br-lg'
            }`
      }
    `}>
        {content}
      </div>
      {isOverflowing && (
        <button
          type="button"
          onClick={() => onExpand?.(content)}
          className={`flex items-center justify-center w-full py-[9px] text-white text-sm
        ${
          isMyMessage
            ? 'bg-point-blue self-end rounded-bl-lg rounded-br-none border-t border-t-[#2C7DF6]'
            : 'bg-[#141415] self-start rounded-bl-none rounded-br-lg border-t border-t-[#222325]'
        }
      `}>
          <span>전체보기</span>
          <ChevronRight size={14} className="ml-1" />
        </button>
      )}
    </div>
  );
};

export default ChatBubble;
