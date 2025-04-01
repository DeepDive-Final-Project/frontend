import { create } from 'zustand';
import { ChatMessageType } from '@/types/chatMessageType';

interface ChatMessageState {
  messagesByRoom: Record<number, ChatMessageType[]>;
  setMessages: (roomId: number, messages: ChatMessageType[]) => void;
  appendMessage: (roomId: number, message: ChatMessageType) => void;
  clearMessages: (roomId: number) => void;
}

export const useChatMessageStore = create<ChatMessageState>((set) => ({
  messagesByRoom: {},

  setMessages: (roomId, messages) =>
    set((state) => ({
      messagesByRoom: {
        ...state.messagesByRoom,
        [roomId]: messages,
      },
    })),

  appendMessage: (roomId, message) =>
    set((state) => {
      const prevMessages = state.messagesByRoom[roomId] ?? [];

      const exists = prevMessages.some(
        (m) => message.messageId && m.messageId === message.messageId,
      );

      if (exists) return state;

      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [roomId]: [...prevMessages, message],
        },
      };
    }),

  // 메시지 초기화
  clearMessages: (roomId) =>
    set((state) => {
      const newState = { ...state.messagesByRoom };
      delete newState[roomId];
      return { messagesByRoom: newState };
    }),
}));
