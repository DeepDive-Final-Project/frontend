import { LogOut, Shield } from 'react-feather';

interface ChatSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed z-10 top-0 inset-0 bg-black bg-opacity-70"
          onClick={onClose}
        />
      )}
      <div
        className={`absolute z-50 top-0 right-0 w-[175px] h-full text-left bg-[#141415] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <p className="pt-[16px] px-[20px] pb-[8px] text-sm text-[#A2A4AA] font-bold">
          채팅 메뉴
        </p>
        <ul>
          <li className="border-b border-[#1E1E1F]">
            <button className="flex w-full text-left p-[10px] pl-[20px] pr-[10px] items-center">
              <LogOut size={16} className="mr-2" />
              채팅방 떠나기
            </button>
          </li>
          <li className="border-b border-[#1E1E1F]">
            <button className="flex w-full text-left p-[10px] pl-[20px] pr-[10px] items-center">
              <Shield size={16} className="mr-2" />
              신고하기
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ChatSideBar;
