export interface ChatMessageType {
  messageId?: number;
  roomId: number;
  senderId: number;
  senderNickname: string | null;
  content: string;
  type: 'JOIN' | 'CHAT' | 'LEAVE';
  timeStamp?: string;
}
