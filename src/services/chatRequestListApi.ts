import { api } from '@/utils/api';
import { ChatRequestType } from '@/types/chatRequestType';

// 보낸 요청 호출
export const fetchChatSentList = async (
  senderId: number,
  status: 'PENDING' | 'ACCEPTED',
): Promise<ChatRequestType[]> => {
  const response = await api.get(`/api/chat/request/sent`, {
    params: {
      senderId,
      status,
    },
  });

  return response.data as ChatRequestType[];
};

// 받은 요청 호출
export const fetchChatReceivedList = async (
  nickname: string,
  status: 'PENDING' | 'ACCEPTED',
): Promise<ChatRequestType[]> => {
  const response = await api.get(`/api/chat/request/received`, {
    params: {
      receiverNickname: nickname,
      status,
    },
  });
  return response.data as ChatRequestType[];
};
