import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'react-feather';

const CTAbtn = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center my-6">
      <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-white to-[#1A6EFF]">
        <button
          onClick={handleLogin}
          className="w-[167px] h-[36px]
             tablet:w-[254px] tablet:h-[60px]
             desktop:w-[337px] desktop:h-[72px]
             flex items-center justify-center
             rounded-full bg-black
             text-[#E6E6E6] text-[16px] leading-[24px]
             tablet:text-[24px] tablet:leading-[36px]
             desktop:text-[32px] desktop:leading-[48px]
             font-medium text-center font-pretendard
             px-3 tablet:px-6 desktop:px-8 transition">
          지금 연결되러 가기
          <ChevronRight size={20} className="pl-1" />
        </button>
      </div>
    </div>
  );
};

export default CTAbtn;
