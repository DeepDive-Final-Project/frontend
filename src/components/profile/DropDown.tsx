import { ChevronDown } from 'react-feather';
import { useState } from 'react';

interface DropdownProps {
  label: string;
  options: { key: string; description: string }[];
  onSelect: (selectedKey: string) => void;
}

const Dropdown = ({ label, options, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (optionKey: string, optionDescription: string) => {
    setSelectedOption(optionDescription);
    onSelect(optionKey);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[48px] px-4 bg-[#0F0F10] rounded-[4px] flex justify-between items-center text-[14px]
        focus:border-[#2C7DF6] focus:ring-1 focus:ring-[#2C7DF6] outline-none transition-all duration-200 
        ${selectedOption ? 'text-white' : 'text-[#A2A4AA]'}`}>
        <span>{selectedOption || label}</span>

        <div className="flex items-center gap-2">
          <span className="text-[#66A1F8] text-xs">필수 선택</span>
          <div
            className={`w-6 h-6 flex items-center justify-center border-[0.5px] border-[#5A5C63] bg-[#1E1E1F] rounded-[2px]
            `}>
            <ChevronDown
              size={20}
              strokeWidth={2}
              color="#E6E6E6"
              className={`transform transition-transform duration-700 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </div>
      </button>

      {isOpen && options.length > 0 && (
        <ul className="absolute left-0 w-full mt-2 bg-[#141415] rounded-[4px] text-[#A2A4AA] text-[14px] shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.key}
              className="p-3 hover:bg-[#1E1E1F] hover:text-white cursor-pointer"
              onClick={() => handleSelect(option.key, option.description)}>
              {option.description}
            </li>
          ))}
        </ul>
      )}
      {isOpen && options.length === 0 && (
        <p className="text-[#B7B9BD] text-xs mt-2">직무를 먼저 선택해야해요</p>
      )}
    </div>
  );
};

export default Dropdown;
