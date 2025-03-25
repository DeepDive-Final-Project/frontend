import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

interface ChatRequestParams {
  senderNickname: string;
  receiverNickname: string;
}

export const useChatRequest = () => {
  return useMutation({
    mutationFn: async ({
      senderNickname,
      receiverNickname,
    }: ChatRequestParams) => {
      const res = await api.post('/api/chat/request', {
        senderNickname,
        receiverNickname,
      });

      return res.data;
    },
  });
};
