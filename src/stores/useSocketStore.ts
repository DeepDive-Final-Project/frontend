import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface StompState {
  stompClient: Client | null;
  isConnected: boolean;
  connect: (
    userId: number,
    nickName: string,
    roomId: number,
    onConnected?: () => void,
  ) => void;
  disconnect: () => void;
}

export const useSocketStore = create<StompState>((set, get) => ({
  stompClient: null,
  isConnected: false,

  connect: (userId, nickName, roomId, onConnected) => {
    console.log('웹소켓 연결 시도 중');

    const client = new Client({
      webSocketFactory: () => {
        return new SockJS(import.meta.env.VITE_WS_CHAT_URL);
      },
      connectHeaders: {
        roomId: String(roomId),
        clientId: String(userId),
        senderNickname: nickName,
      },
      debug: (str) => console.log('[STOMP DEBUG]', str),
      reconnectDelay: 5000,
      onConnect: () => {
        set({ isConnected: true });
        
        setTimeout(() => {
          client.publish({
            destination: '/app/chat.enter',
            body: JSON.stringify({
              roomId,
              clientId: userId,
              senderNickname: nickName,
            }),
          });
        
          if (onConnected) onConnected();
        }, 500);
      },
      onStompError: (frame) => {
        console.error('STOMP 오류', frame);
      },
      onWebSocketError: (e) => {
        console.error('웹소켓 오류', e);
      },
    });

    client.activate();
    set({ stompClient: client });
  },

  disconnect: () => {
    const client = get().stompClient;
    if (client) {
      client.deactivate();
      set({ stompClient: null, isConnected: false });
    }
  },
}));
