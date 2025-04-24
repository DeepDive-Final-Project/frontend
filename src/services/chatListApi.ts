import { api } from '@/utils/api';
import { ChatRoomType } from '@/types/chatRoomType';

export const fetchChatListApi = async (
  clientId: number,
  sortBy: 'latest' | 'unread',
): Promise<ChatRoomType[]> => {
  const endpoint =
    sortBy === 'latest' ? '/api/chat/latest' : '/api/chat/unread';

  const res = await api.get(endpoint, {
    params: { clientId },
  });

  const data: ChatRoomType[] = res.data;

  return data.filter((room) => !room.exited);
};
