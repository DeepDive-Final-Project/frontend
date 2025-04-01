import { useQuery } from '@tanstack/react-query';
import { fetchAuthApi } from '@/services/authApi';
import { fetchUserProfileApi } from '@/services/userProfileApi';

export const useChatMyInfo = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['useChatMyInfo'],
    queryFn: async () => {
      const { id } = await fetchAuthApi();
      const profile = await fetchUserProfileApi(id);
      return {
        id: profile.id,
        nickName: profile.nickName,
      };
    },
  });

  return {
    userId: data?.id,
    nickName: data?.nickName,
    isLoading,
    isError,
  };
};
