import { create } from 'zustand';
import { ChatRoomType } from '@/types/chatRoomType';
import { ChatMessageType } from '@/types/chatMessageType';

interface ChatListState {
  chatList: ChatRoomType[];
  setChatList: (list: ChatRoomType[]) => void;

  selectedRoom: ChatRoomType | null;
  setSelectedRoom: (room: ChatRoomType | null) => void;
  removeChatRoom: (roomId: number) => void;

  updateLastMessage: (
    roomId: number,
    lastMessage: ChatMessageType,
    currentUser: string,
  ) => void;

  increaseUnreadCount: (roomId: number) => void;
}

export const useChatListStore = create<ChatListState>((set) => ({
  chatList: [],
  setChatList: (list) => set({ chatList: list }),

  selectedRoom: null,
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  removeChatRoom: (roomId: number) =>
    set((state) => ({
      chatList: state.chatList.filter((room) => room.roomId !== roomId),
      selectedRoom:
        state.selectedRoom?.roomId === roomId ? null : state.selectedRoom,
    })),

  updateLastMessage: (
    roomId: number,
    lastMessage: ChatMessageType,
    currentUser: string,
  ) =>
    set((state) => ({
      chatList: state.chatList.map((room) => {
        if (room.roomId === roomId) {
          const isSenderMe = lastMessage.senderNickname === currentUser;

          return {
            ...room,
            lastMessage: lastMessage.content,
            lastMessageTime: lastMessage.timeStamp ?? null,
            unreadCount: isSenderMe ? 0 : room.unreadCount,
          };
        }
        return room;
      }),
    })),

  // 안 읽은 메시지 수신되었을 때 count 증가
  increaseUnreadCount: (roomId: number) =>
    set((state) => ({
      chatList: state.chatList.map((room) =>
        room.roomId === roomId
          ? { ...room, unreadCount: (room.unreadCount ?? 0) + 1 }
          : room,
      ),
    })),
}));
