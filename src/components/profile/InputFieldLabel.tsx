interface InputFieldLabelProps {
  textLabel: string;
  rightText?: string;
}

const InputFieldLabel = ({ textLabel, rightText }: InputFieldLabelProps) => {
  return (
    <div className="flex justify-between items-center h-[18px] px-[10px] w-full max-w-[480px] text-[#B7B9BD] text-xs">
      <span>{textLabel}</span>
      {rightText && (
        <span className="text-[#66A1F8] text-[10px]">{rightText}</span>
      )}
    </div>
  );
};

export default InputFieldLabel;
