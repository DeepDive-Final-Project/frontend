import { ChevronDown } from 'react-feather';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface AccordianProps {
  label: string;
  apiUrl: string;
  onSelect: (selectedKey: string, description: string) => void;
}

const Accordian = ({ label, apiUrl, onSelect }: AccordianProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<
    { key: string; description: string }[]
  >([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(apiUrl);
        setOptions(response.data);
      } catch (error) {
        console.error('옵션 불러오기 실패:', error);
      }
    };

    fetchOptions();
  }, [apiUrl]);

  const handleSelect = (optionKey: string, optionDescription: string) => {
    setSelectedOption(optionDescription);
    onSelect(optionKey, optionDescription);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[48px] px-4 bg-[#0F0F10] rounded-[4px] flex justify-between items-center text-[14px]
        focus:ring-1 outline-none transition-all duration-200 
        ${selectedOption ? 'text-white' : 'text-[#A2A4AA]'}`}>
        <span>{selectedOption || label}</span>

        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 flex items-center justify-center border-[0.5px] border-[#5A5C63] bg-[#1E1E1F] rounded-[2px]
            transform transition-transform duration-700 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDown size={20} strokeWidth={2} color="#E6E6E6" />
          </div>
        </div>
      </button>

      {isOpen && options.length > 0 && (
        <ul className="w-full mt-2 bg-[#141415] rounded-[4px] text-[#A2A4AA] text-[14px] shadow-lg">
          {options.map((option) => {
            const isChecked = selectedOption === option.description;
            return (
              <li
                key={option.key}
                className={`p-3 cursor-pointer transition-colors flex items-center gap-2 ${
                  isChecked
                    ? 'text-white'
                    : 'hover:bg-[#1E1E1F] hover:text-white'
                }`}
                onClick={() => handleSelect(option.key, option.description)}>
                <input
                  type="checkbox"
                  readOnly
                  checked={isChecked}
                  className="accent-[#2C7DF6] w-4 h-4"
                />
                {option.description}
              </li>
            );
          })}
        </ul>
      )}

      {isOpen && options.length === 0 && (
        <div className="absolute left-0 w-full mt-2 bg-[#141415] rounded-[4px] text-[#8D8F96] text-sm text-center py-3 z-[999]">
          선택 가능한 항목이 없습니다.
        </div>
      )}
    </div>
  );
};

export default Accordian;
