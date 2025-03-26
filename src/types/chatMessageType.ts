export interface ChatMessageType {
  messageId?: number;
  roomId: number;
  senderNickname: string;
  content: string;
  type: 'JOIN' | 'CHAT' | 'LEAVE';
  timeStamp?: string;
}
