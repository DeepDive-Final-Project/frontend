import { useEffect, useState } from 'react';
import { fetchUserProfileApi } from '@/services/userProfileApi';
import { UserProfileType } from '@/types/userProfileType';

export const useUserProfile = (userId: number) => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchUserProfileApi(userId);
        setProfile(data);
      } catch (error) {
        console.error('프로필 정보 로딩 실패', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [userId]);

  return { profile, loading };
};
