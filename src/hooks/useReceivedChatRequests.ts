import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { ChatRequestType } from '@/types/chatRequestType';

export const useReceivedChatRequests = (nickname: string) => {
  return useQuery<ChatRequestType[]>({
    queryKey: ['chatReceivedList', nickname, 'PENDING'],
    queryFn: async () => {
      const res = await api.get(`/api/chat/received?nickname=${nickname}`);
      return res.data;
    },
    enabled: !!nickname,
  });
};
