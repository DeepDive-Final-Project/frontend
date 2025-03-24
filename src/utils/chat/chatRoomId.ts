import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';
import { api } from '@/utils/api';

export const chatRoomRequestId = async (
  requestId: number,
  navigate: NavigateFunction,
) => {
  try {
    const res = await api.get(`/api/chat/request/${requestId}`);
    const roomId = res.data.roomId;

    if (roomId) {
      navigate(`/chat?roomId=${roomId}`);
    } else {
      toast.error('유효한 채팅방이 존재하지 않습니다.');
    }
  } catch (err) {
    console.log(err);
    toast.error('채팅방 이동 중 문제가 발생했습니다.');
  }
};
