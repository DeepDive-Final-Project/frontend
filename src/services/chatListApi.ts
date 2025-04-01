import { api } from '@/utils/api';
import { ChatRoomType } from '@/types/chatRoomType';

export const fetchChatListApi = async (
  nickname: string,
  sortBy: 'latest' | 'unread',
): Promise<ChatRoomType[]> => {
  const endpoint =
    sortBy === 'latest' ? '/api/chat/latest' : '/api/chat/unread';

  const res = await api.get(endpoint, {
    params: { nickname },
  });

  const data: ChatRoomType[] = res.data;

  return data.filter((room) => !room.exited);
};
