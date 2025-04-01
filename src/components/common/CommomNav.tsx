import { useNavigate } from 'react-router-dom';
import { Send, User } from 'react-feather';
import Logo from '@/assets/images/logo.svg'; // 로고 경로는 예시

const CommonNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="h-[64px] flex items-center justify-between px-4 shrink-0 border-b border-[#1f1f1f]">
      <img src={Logo} alt="Logo" className="h-[40px]" />

      <div className="flex flex-row items-center gap-4">
        <button
          onClick={() => navigate('/chat')}
          className="hidden tablet:flex h-[32px] w-[88px] bg-[#1f1f1f] rounded-full items-center justify-center gap-1 border border-[#5A5C63]">
          <Send className="h-4 text-[#E6E6E6] pl-3" />
          <p className="text-sm font-medium text-[#E6E6E6] pr-3">내 채팅</p>
        </button>
        <button
          className="w-8 h-8 bg-[#1f1f1f] rounded-full flex items-center justify-center border border-[#5A5C63]"
          onClick={() => navigate('/chatProfile')}>
          <User className="h-4 w-4 text-[#E6E6E6]" />
        </button>
      </div>
    </nav>
  );
};

export default CommonNav;
