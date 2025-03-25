import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useChatSentList = (
  senderNickname: string,
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED',
) => {
  return useQuery({
    queryKey: ['chatSentList', senderNickname, status],
    queryFn: async () => {
      const res = await api.get('/api/chat/request/sent', {
        params: { senderNickname, status },
      });

      return res.data;
    },
    enabled: !!senderNickname,
  });
};
