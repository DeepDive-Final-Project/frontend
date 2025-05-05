import { useEffect } from 'react';
import { useSocketStore } from '@/stores/useSocketStore';
import { useChatRequestStore } from '@/stores/useChatRequestStore';
import { useUserStore } from '@/stores/useUserStore';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export const useChatRequestRealtime = (
  userId: number,
  nickName: string,
) => {
  const { connect, isConnected } = useSocketStore();
  const users = useUserStore((state) => state.users);
  const location = useLocation();

  useEffect(() => {
    if (!nickName) return;
    if (!isConnected) {
      connect(userId, nickName);
    }

    const interval = setInterval(() => {
      const client = useSocketStore.getState().stompClient;
      const connected = useSocketStore.getState().isConnected;

      if (client && connected) {
        console.log('stompClient 연결됨, 구독 시작');

        client.subscribe(`/queue/chat-request/${nickName}`, (message) => {
          const payload = JSON.parse(message.body);
          const { received } = useChatRequestStore.getState();
          const alreadyExists = received.PENDING.some(
            (req) => req.id === payload.id,
          );
          if (alreadyExists) return;

          useChatRequestStore.setState((state) => ({
            ...state,
            received: {
              ...state.received,
              PENDING: [...state.received.PENDING, payload],
            },
          }));

          const matchedUser = users.find(
            (u) => u.nickName === payload.senderNickname,
          );

          if (!matchedUser) {
            console.warn(
              ' users 목록에 없는 유저입니다:',
              payload.senderNickname,
            );
          }

          if (location.pathname === '/home') {
            toast.info(`${payload.senderNickname}님이 대화 요청을 보냈습니다.`);
          }
        });

        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [nickName, connect, isConnected, users, location.pathname]);
};
