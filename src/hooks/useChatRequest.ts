import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

interface ChatRequestPayload {
  senderNickname: string;
  receiverNickname: string;
}

export const useChatRequest = () => {
  return useMutation({
    mutationFn: async (payload: ChatRequestPayload) => {
      const response = await api.post('/api/chat/request', payload);
      return response.data;
    },
  });
};
