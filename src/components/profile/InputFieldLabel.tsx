interface InputFieldLabelProps {
  textLabel: string;
}

const InputFieldLabel = ({ textLabel }: InputFieldLabelProps) => {
  return (
    <>
      <p className="flex h-[18px] px-[10px] w-full max-w-[480px] items-center gap-[4px] text-[#B7B9BD] text-xs">
        {textLabel}
      </p>
    </>
  );
};

export default InputFieldLabel;
