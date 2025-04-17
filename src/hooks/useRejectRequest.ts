import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useRejectRequest = () => {
  return useMutation({
    mutationFn: async (requestId: number) => {
      const res = await api.patch(`/api/chat/request/reject/${requestId}`);
      console.log(res.data);

      return res.data;
    },
  });
};
