import { ChatRequestType } from '@/types/chatRequestType';

interface ChatRequestMap {
  PENDING: ChatRequestType[];
  ACCEPTED: ChatRequestType[];
}

export type ChatButtonState = 'CHATTED' | 'MOVE' | 'WAITING' | 'REQUEST';

// 각 유저에 대해 현재 관계 상태를 판별
export const getChatButtonState = (
  targetNickname: string,
  sent: ChatRequestMap,
  received: ChatRequestMap,
): ChatButtonState => {
  // 수락된 요청이 있는지 확인
  const accepted = [...sent.ACCEPTED, ...received.ACCEPTED].find(
    (req) =>
      req.senderNickname === targetNickname ||
      req.receiverNickname === targetNickname,
  );

  // 수락된 요청이 있다면 -> 상태 분기
  if (accepted) {
    return accepted.exited ? 'CHATTED' : 'MOVE';
  }

  // 대화 요청 중인 상태인가?
  const pending =
    sent.PENDING.find((req) => req.receiverNickname === targetNickname) ||
    received.PENDING.find((req) => req.senderNickname === targetNickname);

  // 나머지
  return pending ? 'WAITING' : 'REQUEST';
};
