import { useParams } from 'react-router-dom';
import ProfileCard from '@/components/common/ProfileCard';
import { useUserProfile } from '@/hooks/useUserProfile';

const ProfilePreviewPage = () => {
  const { otherId } = useParams<{ otherId: string }>();
  const { profile, loading } = useUserProfile(Number(otherId));

  if (!otherId)
    return (
      <div className="pt-10 text-center text-[#A2A4AA]">잘못된 접근입니다.</div>
    );

  if (loading || !profile)
    return <div className="pt-10 text-center text-[#A2A4AA]">로딩 중...</div>;

  return (
    <div className="max-w-[1440px] m-auto">
      <div className="relative max-w-[375px] m-auto mobile:p-10 p-5 rounded-[4px] text-sm border border-[#222325] bg-[#1E1E1F]">
        <ProfileCard
          name={profile.nickName}
          job={profile.role ?? ''}
          bio={profile.introduction ?? ''}
          interests={
            [profile.topic1, profile.topic2, profile.topic3].filter(
              Boolean,
            ) as string[]
          }
          career={profile.career ?? ''}
          links={(profile.links ?? []).map((link) => ({
            title: link.title,
            url: link.link,
          }))}
          profileImageUrl={profile.profileImage}
          profileId={profile.id}
          onChat={() => console.log('대화 요청')}
        />
      </div>
    </div>
  );
};

export default ProfilePreviewPage;
