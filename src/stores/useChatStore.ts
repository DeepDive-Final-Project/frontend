import { create } from 'zustand';
import { ChatMessageType } from '@/types/chatMessageType';

interface ChatState {
  messagesByRoom: Record<number, ChatMessageType[]>;
  setMessages: (roomId: number, messages: ChatMessageType[]) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  messagesByRoom: {},

  setMessages: (roomId, messages) =>
    set((state) => ({
      messagesByRoom: {
        ...state.messagesByRoom,
        [roomId]: messages,
      },
    })),
}));
