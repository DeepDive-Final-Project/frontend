interface InputFieldLabelProps {
  textLabel: string;
  rightText?: string;
}

const InputFieldLabel = ({ textLabel, rightText }: InputFieldLabelProps) => {
  const rightTextColor =
    rightText === '선택입력' ? 'text-[#70737C]' : 'text-[#66A1F8]';

  return (
    <div className="flex justify-between items-center h-[18px] px-[10px] w-full text-[#B7B9BD] text-xs">
      <span>{textLabel}</span>
      {rightText && (
        <span className={`${rightTextColor} text-[10px]`}>{rightText}</span>
      )}
    </div>
  );
};

export default InputFieldLabel;
