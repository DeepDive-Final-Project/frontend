import { create } from 'zustand';
import { ChatRoomType } from '@/types/chatRoomType';
import { ChatMessageType } from '@/types/chatMessageType';

interface ChatListState {
  chatList: ChatRoomType[];
  setChatList: (list: ChatRoomType[]) => void;

  selectedRoom: ChatRoomType | null;
  setSelectedRoom: (room: ChatRoomType | null) => void;
  removeChatRoom: (roomId: number) => void;

  updateLastMessage: (roomId: number, lastMessage: ChatMessageType) => void;
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

  updateLastMessage: (roomId: number, lastMessage: ChatMessageType) =>
    set((state) => ({
      chatList: state.chatList.map((room) =>
        room.roomId === roomId
          ? {
              ...room,
              lastMessage: lastMessage.content,
              lastMessageTime: lastMessage.timeStamp ?? null,
            }
          : room,
      ),
    })),
}));
