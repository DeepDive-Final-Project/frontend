import { create } from 'zustand';
import { ChatMessageType } from '@/types/chatMessageType';

interface ChatState {
  messagesByRoom: Record<number, ChatMessageType[]>;
  lastMessages: Record<number, ChatMessageType>;
  setMessages: (roomId: number, messages: ChatMessageType[]) => void;
  appendMessage: (roomId: number, message: ChatMessageType) => void;
  setLastMessage: (roomId: number, message: ChatMessageType) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  messagesByRoom: {},
  lastMessages: {},

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

      // messageId를 기준으로 중복 체크
      const exists = prevMessages.some((m) =>
        message.messageId ? m.messageId === message.messageId : false,
      );

      if (exists) return state;

      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [roomId]: [...prevMessages, message],
        },
        lastMessages: {
          ...state.lastMessages,
          [roomId]: message,
        },
      };
    }),

  setLastMessage: (roomId, message) =>
    set((state) => ({
      lastMessages: {
        ...state.lastMessages,
        [roomId]: message,
      },
    })),
}));
