interface NextButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const NextButton = ({ text, onClick, disabled = false }: NextButtonProps) => {
  return (
    <button
      className={`relative w-full mb-[12px] bottom-0 h-[48px] rounded-full font-semibold font-pretendard transition-colors
        ${disabled ? 'bg-[#4E5157] text-[#999] cursor-not-allowed' : 'bg-[#146EF5] text-white hover:bg-[#125ddb]'}
      `}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default NextButton;
