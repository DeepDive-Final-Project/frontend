export interface ChatRoomType {
  roomId: number;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string | null;
  unreadCount: number;
  exited: boolean;
  otherId: number;
}
