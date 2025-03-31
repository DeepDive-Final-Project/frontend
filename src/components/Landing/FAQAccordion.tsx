import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'react-feather';

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div className="py-4 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-[#E6E6E6]
             text-[18px] leading-[27px] desktop:text-[32px] desktop:leading-[48px]
             font-semibold font-pretendard">
        <span>{question}</span>
        <ChevronDown
          className={`ml-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          } w-8 h-8`}
        />
      </button>
      <div className="border-b border-[#444] my-3" />

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-300">
        <p className="mt-3 text-sm text-[#ccc] leading-relaxed whitespace-pre-line">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
