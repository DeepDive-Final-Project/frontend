import { api } from '@/utils/api';
import { UserProfileType } from '@/types/userProfileType';

export const fetchUserProfileApi = async (
  userId: number,
): Promise<UserProfileType> => {
  const response = await api.get(`/api/client/profile/${userId}`);

  return response.data;
};
