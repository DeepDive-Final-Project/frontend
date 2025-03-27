interface NextButtonProps {
  text: string;
  onClick?: () => void;
}

const NextButton = ({ text, onClick }: NextButtonProps) => {
  return (
    <button
      className="relative w-full mb-[12px] bottom-0 h-[48px] bg-[#146EF5] rounded-full"
      onClick={onClick}>
      {text}
    </button>
  );
};

export default NextButton;
