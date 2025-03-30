import { useQuery } from '@tanstack/react-query';
import {
  fetchChatSentList,
  fetchChatReceivedList,
} from '@/services/chatRequestListApi';
import { useChatRequestStore } from '@/stores/useChatRequestStore';

export const useChatRequestFetch = (currentUser: string) => {
  useQuery({
    queryKey: ['chatSentList', currentUser, 'PENDING'],
    queryFn: async () => {
      const data = await fetchChatSentList(currentUser, 'PENDING');
      useChatRequestStore.getState().setChatRequests('sent', 'PENDING', data);
      return data;
    },
  });

  useQuery({
    queryKey: ['chatSentList', currentUser, 'ACCEPTED'],
    queryFn: async () => {
      const data = await fetchChatSentList(currentUser, 'ACCEPTED');
      useChatRequestStore.getState().setChatRequests('sent', 'ACCEPTED', data);
      return data;
    },
  });

  useQuery({
    queryKey: ['chatReceivedList', currentUser, 'PENDING'],
    queryFn: async () => {
      const data = await fetchChatReceivedList(currentUser, 'PENDING');
      useChatRequestStore
        .getState()
        .setChatRequests('received', 'PENDING', data);
      return data;
    },
  });

  useQuery({
    queryKey: ['chatReceivedList', currentUser, 'ACCEPTED'],
    queryFn: async () => {
      const data = await fetchChatReceivedList(currentUser, 'ACCEPTED');
      useChatRequestStore
        .getState()
        .setChatRequests('received', 'ACCEPTED', data);
      return data;
    },
  });
};
