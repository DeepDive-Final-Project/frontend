import { Link } from 'react-router-dom';
import Button from '@/components/Common/Button';
import { Link2, MessageCircle, Edit } from 'react-feather';

const ProfileCard = () => {
  return (
    <div className="relative mobile:p-10 p-5 rounded-[4px] text-sm border border-[#222325] bg-[#1E1E1F]">
      <button type="button" className="absolute top-[7px] right-[2px] w-8 h-8">
        <Edit size={16} />
      </button>
      <div className="w-[100px] h-[100px] mx-auto rounded-full bg-white">
        <div className="w-full h-full overflow-hidden"></div>
      </div>
      <strong className="block mt-3 mb-1 text-lg text-white text-center">
        홍길동
      </strong>
      <p className="block text-xs text-[#B7B9BD] text-center">개발자</p>
      <p className="block mt-3 mb-6 text-[#B7B9BD] text-center leading-relaxed">
        프로덕트와 기술을 좋아하는 AI러버 <br />
        최신 AI트렌드에 관심이 많아요
      </p>
      <div className="py-4 text-left">
        <p className="mb-2 text-[#B7B9BD]">관심사</p>
        <span className="inline-block px-2 py-1 mb-2 -mt-[2px] mr-2 text-xs text-[#D2D2D2] font-medium rounded-[4px] bg-[#262627]">
          모바일 앱 개발
        </span>
        <span className="inline-block px-2 py-1 mb-2 -mt-[2px] mr-2 text-xs text-[#D2D2D2] font-medium rounded-[4px] bg-[#262627]">
          인공지능 (AI)
        </span>
        <span className="inline-block px-2 py-1 mb-2 -mt-[2px] mr-2 text-xs text-[#D2D2D2] font-medium rounded-[4px] bg-[#262627]">
          DevOps & SRE
        </span>
      </div>
      <div className="mobile:mt-3 tablet:flex">
        <div className="flex-1 tablet:mr-4 py-4 border-t border-[#222325]">
          <p className="mb-2 text-[#B7B9BD]">경력</p>
          <div>
            <p>시니어</p>
          </div>
        </div>
        <div className="flex-1 py-4 border-t border-[#222325]">
          <p className="mb-2 text-[#B7B9BD]">링크</p>
          <div className="flex space-y-0.5 items-start flex-col tablet:space-y-0.5 flex-wrap">
            <Link
              to=""
              className="flex items-center text-[color:#66A1F8]
 font-medium leading-relaxed underline text-sm px-2 py-1 rounded-[4px] bg-[#0F0F10]">
              <Link2 size={16} className="mr-2 text-[#E6E6E6]" />
              깃허브 링크
            </Link>
            <Link
              to=""
              className="flex items-center text-[color:#66A1F8]
 font-medium leading-relaxed underline text-sm px-2 py-1 rounded-[4px] bg-[#0F0F10]">
              <Link2 size={16} className="mr-2 text-[#E6E6E6]" />
              인스타그램 링크
            </Link>
          </div>
        </div>
      </div>
      <Button className="mobile:mt-6 mt-1" icon={<MessageCircle size={20} />}>
        대화 요청하기
      </Button>
    </div>
  );
};

export default ProfileCard;
