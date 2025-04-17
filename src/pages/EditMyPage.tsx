import { useEffect, useState } from 'react';
import { Link2 } from 'react-feather';
import axios from 'axios';
import { Edit3 } from 'react-feather';

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

const EditMyPage = () => {
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
        console.log('✅ clientId:', clientId);

        const imageRes = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/client/profile/profile-images?clientIds=${clientId}`,
          { withCredentials: true },
        );

        const imageUrl = Array.isArray(imageRes.data)
          ? imageRes.data[0]?.profileImageUrl
          : imageRes.data?.profileImageUrl;
        console.log(imageUrl);
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
    <div className="max-w-md mx-auto p-6 text-white bg-[#0F0F10] min-h-screen">
      <div className="relative flex justify-center mb-6">
        <img
          src={profileImage || undefined}
          alt="프로필 이미지"
          className="w-[100px] h-[100px] rounded-full object-cover border border-[#2C2C2C]"
        />
        <button
          type="button"
          className="absolute bottom-0 right-[calc(50%-50px)] translate-x-[50%] translate-y-[50%] bg-[#5A5C63] w-6 h-6 flex items-center justify-center rounded-full">
          <Edit3 size={12} className="text-white" />
        </button>
      </div>

      <Section title="닉네임" value={profile.nickName} />
      <Section title="이메일" value={profile.email} />
      <Section title="분야" value={profile.role} />
      <Section title="소개글" value={profile.introduction} />
      <Section title="경력" value={profile.career} />

      <section className="my-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#A2A4AA]">관심사</span>
          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center bg-[#5A5C63] rounded-full">
            <Edit3 size={12} className="text-white" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          {[profile.topic1, profile.topic2, profile.topic3]
            .filter(Boolean)
            .map((topic, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-[4px] bg-[#262627] text-[#D2D2D2]">
                {topic}
              </span>
            ))}
        </div>
        <hr className="border-[#2C2C2C] mt-4" />
      </section>

      <section className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-[#A2A4AA]">SNS 링크</span>
          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center bg-[#5A5C63] rounded-full">
            <Edit3 size={12} className="text-white" />
          </button>
        </div>
        <div className="space-y-1">
          {profile.links.map((link, index) => (
            <div
              key={`${link.title}-${index}`}
              className="flex items-center gap-2 p-2">
              <Link2 size={16} className="mr-2" />
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E6E6E6] hover:underline text-sm block">
                {link.title}
              </a>
            </div>
          ))}
        </div>
        <hr className="border-[#2C2C2C] mt-2" />
      </section>
    </div>
  );
};
const Section = ({ title, value }: { title: string; value: string }) => (
  <section className="flex flex-col gap-2 py-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-[#A2A4AA]">{title}</span>
      <button
        type="button"
        className="w-6 h-6 flex items-center justify-center bg-[#5A5C63] rounded-full">
        <Edit3 size={12} className="text-white" />
      </button>
    </div>
    <div className="text-base font-semibold text-[#E6E6E6]">{value}</div>
    <hr className="border-[#2C2C2C]" />
  </section>
);

export default EditMyPage;
