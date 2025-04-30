export interface ChatRoomType {
  roomId: number;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string | null;
  lastSenderId:number;
  unreadCount: number;
  exited: boolean;
  otherId: number;
}
