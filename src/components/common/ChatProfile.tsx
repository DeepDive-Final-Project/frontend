import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from '@/components/common/ProfileCard';
import Logo from '@/assets/images/logo.svg';

interface ProfileData {
  nickName: string;
  email: string;
  role: string;
  career: string;
  introduction: string;
  links: { title: string; link: string }[];
  topic1: string;
  topic2: string;
  topic3: string;
}

const ChatProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const meRes = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/auth/me`,
          { withCredentials: true },
        );
        const clientId = meRes.data.id;

        const imageRes = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/client/profile/profile-images?clientIds=${clientId}`,
          { withCredentials: true },
        );
        const imageUrl = Array.isArray(imageRes.data)
          ? imageRes.data[0]?.profileImageUrl
          : imageRes.data?.profileImageUrl;
        setProfileImage(imageUrl);

        const profileRes = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/client/profile/${clientId}`,
          { withCredentials: true },
        );
        setProfile(profileRes.data);
      } catch (err) {
        console.error('프로필 가져오기 실패', err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="text-white text-center mt-20">불러오는 중...</div>;
  }

  return (
    <div className="max-w-[1440px] m-auto mt-5">
      <div className="max-w-[420px] m-auto">
        <nav className="h-[64px] flex items-center px-4 shrink-0">
          <img src={Logo} alt="Logo" className="h-[40px]" />
        </nav>
        <ProfileCard
          name={profile.nickName}
          job={profile.role}
          bio={profile.introduction}
          interests={[profile.topic1, profile.topic2, profile.topic3].filter(
            Boolean,
          )}
          career={profile.career}
          links={profile.links.map(({ title, link }) => ({ title, url: link }))}
          profileImageUrl={profileImage || ''}
          onEdit={() => console.log('수정')}
          onChat={() => console.log('대화 요청')}
        />
      </div>
    </div>
  );
};

export default ChatProfile;
