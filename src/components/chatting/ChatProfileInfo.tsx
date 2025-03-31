import { Link } from 'react-router-dom';
import { ChevronRight } from 'react-feather';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ChatProfileInfoProps {
  otherId: number;
}

const ChatProfileInfo = ({ otherId }: ChatProfileInfoProps) => {
  const { profile, loading } = useUserProfile(otherId);

  if (loading || !profile) {
    return (
      <div className="text-sm text-center text-[#B7B9BD] py-4">
        프로필 불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-5 pb-5 text-sm text-[#B7B9BD] border-b border-[#1E1E1F]">
      <div className="w-[64px] h-[64px] mx-auto rounded-full bg-white">
        <div className="w-full h-full overflow-hidden">
          <img
            src={profile.profileImage}
            alt={`${profile.nickName}님의 프로필`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <b className="mt-2 text-lg">{profile.nickName}</b>
      <p className="font-medium">{profile.role}</p>
      <Link to="/" className="flex items-center mt-2 text-[#B7B9BD]">
        프로필 보기
        <ChevronRight size={16} />
      </Link>
    </div>
  );
};

export default ChatProfileInfo;
