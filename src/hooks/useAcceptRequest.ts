import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useAcceptRequest = () => {
  return useMutation({
    mutationFn: async (requestId: number) => {
      const res = await api.patch(`/api/chat/request/accept/${requestId}`);

      return res.data;
    },
  });
};
