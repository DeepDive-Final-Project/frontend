import { Link } from 'react-router-dom';
import { ChevronRight } from 'react-feather';

const ChatProfileInfo = () => {
  return (
    <div className="flex flex-col items-center pt-[20px] pb-[16px] text-sm text-[#B7B9BD] border-b border-[#1E1E1F]">
      <div className="w-[64px] h-[64px] mx-auto rounded-full bg-white">
        <div className="w-full h-full overflow-hidden"></div>
      </div>
      <b className="mt-2 text-lg">김민수</b>
      <p className="font-medium">Developer</p>
      <Link to="/" className="flex items-center mt-2 text-[#B7B9BD]">
        프로필 보기
        <ChevronRight size={16} />
      </Link>
    </div>
  );
};

export default ChatProfileInfo;
