import { ChevronDown, ChevronUp } from 'react-feather';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface DropdownProps {
  label: string;
  onSelect: (selected: string) => void;
}

const Dropdown = ({ label, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<
    { key: string; description: string }[]
  >([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/client/enums/roles`,
        );
        console.log('API Response Data:', response.data);
        setOptions(response.data);
      } catch (error) {
        console.error('Error Data', error);
      }
    };

    fetchOptions();
  }, []);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
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
        <div className="w-6 h-6 flex items-center justify-center border border-[#B3B3B3] rounded-[2px] p-1">
          {isOpen ? (
            <ChevronUp size={16} color="#B7B9BD" />
          ) : (
            <ChevronDown size={16} color="#B7B9BD" />
          )}
        </div>
      </button>

      {isOpen && options.length > 0 && (
        <ul className="absolute left-0 w-full mt-2 bg-[#141415] rounded-[4px] text-[#A2A4AA] text-[14px] shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.key}
              className="p-3 hover:bg-[#1E1E1F] hover:text-white cursor-pointer"
              onClick={() => handleSelect(option.description)}>
              {option.description}
            </li>
          ))}
        </ul>
      )}
      {isOpen && options.length === 0 && (
        <p className="text-[#B7B9BD] text-xs mt-2">
          데이터를 불러올 수 없습니다.
        </p>
      )}
    </div>
  );
};

export default Dropdown;
