import { create } from 'zustand';
import { ChatRequestType } from '@/types/chatRequestType';

type ChatStatus = 'PENDING' | 'ACCEPTED';

interface ChatRequestMap {
  PENDING: ChatRequestType[];
  ACCEPTED: ChatRequestType[];
}

interface ChatRequestStore {
  sent: ChatRequestMap;
  received: ChatRequestMap;
  setChatRequests: (
    type: 'sent' | 'received',
    status: ChatStatus,
    data: ChatRequestType[],
  ) => void;
}

export const useChatRequestStore = create<ChatRequestStore>((set) => ({
  sent: { PENDING: [], ACCEPTED: [] },
  received: { PENDING: [], ACCEPTED: [] },

  setChatRequests: (type, status, data) =>
    set((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [status]: data,
      },
    })),
}));
