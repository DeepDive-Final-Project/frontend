interface NextButtonProps {
  text: string;
}

const NextButton = ({ text }: NextButtonProps) => {
  return (
    <button className="relative w-full mb-[12px] bottom-0 h-[48px] bg-[#146EF5] rounded-full">
      {text}
    </button>
  );
};

export default NextButton;
