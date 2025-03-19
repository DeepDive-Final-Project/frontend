interface ChatRequestMessageProps {
  title: string;
  description: string;
  titleColor?: string;
}

const ChatRequestMessage = ({
  title,
  description,
  titleColor,
}: ChatRequestMessageProps) => {
  return (
    <>
      <p className={`${titleColor} text-sm`}>{title}</p>
      <p className="mt-[4px] text-xs text-[#B7B9BD]">{description}</p>
    </>
  );
};

export default ChatRequestMessage;
