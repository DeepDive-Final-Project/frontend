export interface ChatMessageType {
  messageId?: number;
  roomId: number;
  senderNickname: string | null;
  content: string;
  type: 'JOIN' | 'CHAT' | 'LEAVE';
  timeStamp?: string;
}
