import { useState, ChangeEvent } from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  isRequired?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  type,
  placeholder,
  isRequired = true,
  value,
  onChange,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-[480px]">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-3 w-full h-[40px] bg-[#0F0F10] rounded-sm border border-transparent 
        focus:border-[#2C7DF6] focus:outline-none caret-[#2C7DF6] pr-24 text-white"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {!isFocused && (
        <span
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-[12px] 
            ${isRequired ? 'text-[#66A1F8]' : 'text-[#8D8F96]'}`}>
          {isRequired ? '필수입력' : '선택기입'}
        </span>
      )}
      {isFocused && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#66A1F8] text-[12px]">
          입력중...
        </span>
      )}
    </div>
  );
};

export default InputField;
