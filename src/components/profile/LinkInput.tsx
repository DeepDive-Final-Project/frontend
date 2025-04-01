import { useRef, useState } from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  isRequired?: boolean;
  labelText?: '타이틀' | '링크주소';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LinkInput = ({
  type,
  placeholder,
  labelText,
  value,
  onChange,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = isFocused || value !== '';

  return (
    <div className="relative w-full">
      {labelText && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8D8F96] text-[14px] pointer-events-none z-10">
          {labelText} :
        </span>
      )}

      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          pl-[80px] pr-3 p-3 w-full h-[40px] rounded-sm border border-transparent 
          focus:border-[#2C7DF6] focus:outline-none caret-[#2C7DF6] text-white 
          ${isActive ? 'bg-[#1E1E1F]' : 'bg-[#0F0F10]'}
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            inputRef.current?.blur();
          }
        }}
      />
    </div>
  );
};

export default LinkInput;
