import { useQuery } from '@tanstack/react-query';
import {
  fetchChatSentList,
  fetchChatReceivedList,
} from '@/services/chatRequestListApi';
import { useChatRequestStore } from '@/stores/useChatRequestStore';

export const useChatRequestFetch = (currentUser: string, senderId: number) => {
  const senderEnabled = !isNaN(senderId);
  const receiverEnabled = !!currentUser;

  useQuery({
    queryKey: ['chatSentList', senderId, 'PENDING'],
    queryFn: async () => {
      const data = await fetchChatSentList(senderId, 'PENDING');
      useChatRequestStore
        .getState()
        .setChatRequests('sent', 'PENDING', Array.isArray(data) ? data : []);
      return data;
    },
    enabled: senderEnabled,
  });

  useQuery({
    queryKey: ['chatSentList', senderId, 'ACCEPTED'],
    queryFn: async () => {
      const data = await fetchChatSentList(senderId, 'ACCEPTED');
      useChatRequestStore
        .getState()
        .setChatRequests('sent', 'ACCEPTED', Array.isArray(data) ? data : []);
      return data;
    },
    enabled: senderEnabled,
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
    enabled: receiverEnabled,
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
    enabled: receiverEnabled,
  });
};
