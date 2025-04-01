import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import { Link2, MessageCircle, Edit } from 'react-feather';

interface LinkItem {
  title: string;
  url: string;
}

interface ProfileCardProps {
  name: string;
  job: string;
  bio: string;
  interests: string[];
  career: string;
  links: LinkItem[];
  profileImageUrl?: string;
  onEdit?: () => void;
  onChat?: () => void;
  userId?: number;
  profileId?: number;
}

const ProfileCard = ({
  name,
  job,
  bio,
  interests,
  career,
  links,
  onChat,
  profileImageUrl,
  userId,
  profileId,
}: ProfileCardProps) => {
  const navigate = useNavigate();
  const isOwner = userId === profileId;

  return (
    <div className="relative max-w-[375px] m-auto mobile:p-10 p-5 rounded-[4px] text-sm border border-[#222325] bg-[#1E1E1F]">
      {isOwner && (
        <button
          type="button"
          onClick={() => navigate('/editmy')}
          className="absolute top-[7px] right-[2px] w-8 h-8">
          <Edit size={16} />
        </button>
      )}

      <div className="w-[100px] h-[100px] mx-auto rounded-full bg-white overflow-hidden">
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <strong className="block mt-3 mb-1 text-lg text-white text-center">
        {name}
      </strong>
      <p className="block text-xs text-[#B7B9BD] text-center">{job}</p>
      <p className="block mt-3 mb-6 text-[#B7B9BD] text-center leading-relaxed whitespace-pre-line">
        {bio}
      </p>

      <div className="py-4 text-left">
        <p className="mb-2 text-[#B7B9BD]">관심사</p>
        {interests.map((interest, index) => (
          <span
            key={index}
            className="inline-block px-2 py-1 mb-2 -mt-[2px] mr-2 text-xs text-[#D2D2D2] font-medium rounded-[4px] bg-[#262627]">
            {interest}
          </span>
        ))}
      </div>

      <div className="mobile:mt-3 flex flex-row gap-6 border-t border-[#222325] pt-4">
        <div className="flex-1">
          <p className="mb-2 text-[#B7B9BD]">경력</p>
          <p>{career}</p>
        </div>
        <div className="flex-1 pl-6">
          <p className="mb-2 text-[#B7B9BD]">링크</p>
          <div className="flex flex-col gap-1">
            {links.map((link, idx) => (
              <Link
                key={idx}
                to={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center text-[#E6E6E6] font-medium leading-relaxed text-sm px-2 py-1 rounded-[4px] bg-[#0F0F10]">
                <Link2 size={16} className="mr-2 text-[#E6E6E6]" />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>




      {/* ✅ 소유자일 경우 대화요청 버튼 숨기기 */}
      {!isOwner && (
        <Button
          className="mobile:mt-6 mt-1"
          icon={<MessageCircle size={20} />}
          onClick={onChat}>
          대화 요청하기
        </Button>
      )}
    </div>
  );
};

export default ProfileCard;
