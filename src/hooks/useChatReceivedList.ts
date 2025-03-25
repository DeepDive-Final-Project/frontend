import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useChatReceivedList = (
  receiverNickname: string,
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED',
) => {
  return useQuery({
    queryKey: ['chatReceivedList', receiverNickname, status],
    queryFn: async () => {
      const res = await api.get('/api/chat/request/received', {
        params: { receiverNickname, status },
      });

      return res.data;
    },
    enabled: !!receiverNickname,
  });
};
