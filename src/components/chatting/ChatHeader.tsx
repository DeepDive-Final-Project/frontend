import { useState } from 'react';
import ChatSideBar from '@/components/chatting/ChatSideBar';
import { Menu, Bell, BellOff, ArrowLeft } from 'react-feather';

interface ChatHeaderProps {
  onBackToList: () => void;
}

const ChatHeader = ({ onBackToList }: ChatHeaderProps) => {
  const [isBellOff, setBellOff] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleBell = () => {
    setBellOff((prev) => !prev);
  };

  return (
    <>
      <div className="relative flex flex-shrink-0 items-center justify-between h-[52px] p-[20px] border-b border-b-[#222325] bg-[#0A0A0B]">
        <button
          aria-label="채팅 목록으로 가기"
          className="block tablet:hidden"
          onClick={onBackToList}>
          <ArrowLeft />
        </button>
        <p className="absolute left-1/2 transform -translate-x-1/2">김민수</p>
        <div className="flex space-x-4 ml-auto">
          <button
            aria-label={isBellOff ? '알림 켜기' : '알림 끄기'}
            onClick={toggleBell}>
            {isBellOff ? <Bell /> : <BellOff />}
          </button>
          <button aria-label="메뉴 열기" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
        </div>
      </div>
      <ChatSideBar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default ChatHeader;
