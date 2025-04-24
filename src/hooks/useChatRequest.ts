import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';

interface ChatRequestPayload {
  senderId: number;
  receiverId: number;
}

export const useChatRequest = () => {
  return useMutation({
    mutationFn: async (payload: ChatRequestPayload) => {
      const response = await api.post('/api/chat/request', payload);
      return response.data;
    },
  });
};
