import { ChatMessageType } from '@/types/chatMessageType';
import { api } from '@/utils/api';

export const fetchMessagesApi = async (
  roomId: number,
  clientId: number,
): Promise<ChatMessageType[]> => {
  const res = await api.get(`api/messages/${roomId}`, {
    params: { clientId },
  });

  return res.data;
};
