export interface ChatRequestType {
  id: number;
  senderNickname: string;
  receiverNickname: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}
