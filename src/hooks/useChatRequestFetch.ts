import { useQuery } from '@tanstack/react-query';
import {
  fetchChatSentList,
  fetchChatReceivedList,
} from '@/services/chatRequestListApi';
import { useChatRequestStore } from '@/stores/useChatRequestStore';

export const useChatRequestFetch = (currentUser: string) => {
  const enabled = !!currentUser;

  useQuery({
    queryKey: ['chatSentList', currentUser, 'PENDING'],
    queryFn: async () => {
      const data = await fetchChatSentList(currentUser, 'PENDING');
      useChatRequestStore
        .getState()
        .setChatRequests('sent', 'PENDING', Array.isArray(data) ? data : []);
      return data;
    },
    enabled,
  });

  useQuery({
    queryKey: ['chatSentList', currentUser, 'ACCEPTED'],
    queryFn: async () => {
      const data = await fetchChatSentList(currentUser, 'ACCEPTED');
      useChatRequestStore
        .getState()
        .setChatRequests('sent', 'ACCEPTED', Array.isArray(data) ? data : []);
      return data;
    },
    enabled,
  });

  useQuery({
    queryKey: ['chatReceivedList', currentUser, 'PENDING'],
    queryFn: async () => {
      const data = await fetchChatReceivedList(currentUser, 'PENDING');
      useChatRequestStore
        .getState()
        .setChatRequests(
          'received',
          'PENDING',
          Array.isArray(data) ? data : [],
        );
      return data;
    },
    enabled,
  });

  useQuery({
    queryKey: ['chatReceivedList', currentUser, 'ACCEPTED'],
    queryFn: async () => {
      const data = await fetchChatReceivedList(currentUser, 'ACCEPTED');
      useChatRequestStore
        .getState()
        .setChatRequests(
          'received',
          'ACCEPTED',
          Array.isArray(data) ? data : [],
        );
      return data;
    },
    enabled,
  });
};
