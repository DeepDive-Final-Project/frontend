interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ProfileButton = ({ text, icon, onClick }: ButtonProps) => {
  return (
    <button
      className="flex h-[52px] px-4 justify-center items-center gap-2 flex-shrink-0 self-stretch bg-[#0F0F10] rounded-full"
      onClick={onClick}>
      {icon && <span className="w-6 h-6">{icon}</span>}
      {text}
    </button>
  );
};

export default ProfileButton;
