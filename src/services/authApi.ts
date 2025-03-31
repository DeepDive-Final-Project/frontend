import { api } from '@/utils/api';

export const fetchAuthApi = async () => {
  const { data } = await api.get('/auth/me');

  return data;
};
