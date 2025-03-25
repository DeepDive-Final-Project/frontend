import { useState } from 'react';
import { ChevronDown } from 'react-feather';
import sorting from '@/assets/images/sorting.svg';

interface ChatFilterProps {
  options: string[];
  selectedOption: string;
  onChangeOption: (value: string) => void;
}

const ChatFilter = ({
  options,
  selectedOption,
  onChangeOption,
}: ChatFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const onSelect = (option: string) => {
    onChangeOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-shrink-0 h-[52px] px-[20px] items-center border-b border-b-[#222325] bg-[#0A0A0B]">
      <div className="relative">
        <button
          aria-label="채팅 메세지 필터링 버튼"
          onClick={toggleDropdown}
          className="relative flex h-8 px-2 min-w-[140px] items-center cursor-pointer text-left rounded-[4px] border border-[#222325] bg-[#141415]">
          <img src={sorting} alt="필터 아이콘" />
          {selectedOption}
          <ChevronDown size={16} className="ml-1" />
        </button>
        {isOpen && (
          <ul
            className="absolute z-10 left-0 top-[36px] w-[215px] py-1 px-2 rounded-[4px] bg-[#141415]
shadow-[0px_0px_4px_rgba(0,0,0,0.25),0px_4px_8px_rgba(0,0,0,0.08),0px_6px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-in-out opacity-100 scale-100">
            {options.map((option) => (
              <li
                aria-selected={selectedOption === option}
                key={option}
                className="py-[5px] px-2 text-[#B3B3B3] rounded-[4px] hover:bg-[#262627] cursor-pointer"
                onClick={() => onSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatFilter;
