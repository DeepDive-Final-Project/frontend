interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="flex justify-between items-center w-full mobile:gap-[4px] px-[20px]">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={`h-[2px] w-1/6 rounded-full transition-colors duration-300 ${
            index < currentStep ? 'bg-[#E6E6E6]' : 'bg-[#70737C]'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
