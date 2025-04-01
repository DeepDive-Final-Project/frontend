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

const dummyProfiles = [
  {
    id: 1,
    nickName: '김코딩',
    role: 'Developer',
    imageUrl:
      'data:image/jpeg;base64,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',
  },
  {
    id: 2,
    nickName: '이디자인',
    role: 'Product Designer',
    imageUrl:
      'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/942/48f93f2be7394a48f3e97b497a43e44c_res.jpeg',
  },
  {
    id: 3,
    nickName: '박데이터',
    role: 'Frontend Developer',
    imageUrl:
      'https://www.bizhankook.com/upload/bk/article/201707/thumb/13744-24802-sampleM.jpg',
  },
];

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
    <div className="max-w-[1440px] m-auto">
      <nav className="h-[64px] flex items-center px-4 shrink-0">
        <img src={Logo} alt="Logo" className="h-[40px]" />
      </nav>

      <div className="flex flex-row px-4 tablet:px-8  mt-4">
        <div className="tablet: w-full">
          <ProfileCard
            name={profile.nickName}
            job={profile.role}
            bio={profile.introduction}
            interests={[profile.topic1, profile.topic2, profile.topic3].filter(
              Boolean,
            )}
            career={profile.career}
            links={profile.links.map(({ title, link }) => ({
              title,
              url: link,
            }))}
            profileImageUrl={profileImage || ''}
            onEdit={() => console.log('수정')}
            onChat={() => console.log('대화 요청')}
          />
        </div>

        <div className="flex-1 hidden tablet:block  rounded-lg min-h-[400px] min-w-[400px] p-4 space-y-3 overflow-y-auto">
          <p className="text-[#E6E6E6] text-[18px] font-semibold mb-2">
            대화한 사람들
          </p>

          {dummyProfiles.map((user) => (
            <div
              key={user.id}
              className="flex items-center h-[80px] gap-3 p-3 bg-[#1A1A1A] rounded-md hover:bg-[#2A2A2A] cursor-pointer transition">
              <img
                src={user.imageUrl}
                alt={user.nickName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-white font-medium">
                  {user.nickName}
                </p>
                <p className="text-xs text-[#A2A4AA]">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatProfile;
