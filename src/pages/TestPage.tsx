// 기능 개발을 위한 테스트 페이지입니다. (참가자에게 대화 요청 -> 수락/거절 -> 채팅방 생성)
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/common/Button';
import { useChatRequest } from '@/hooks/useChatRequest';
import { useAcceptRequest } from '@/hooks/useAcceptRequest';
import { useRejectRequest } from '@/hooks/useRejectRequest';
import { useChatRequestFetch } from '@/hooks/useChatRequestFetch';
import { useChatRequestStore } from '@/stores/useChatRequestStore';
import { useChatMyInfo } from '@/stores/useChatMyInfoStore';
import { getChatButtonState } from '@/utils/chat/getChatButtonState';
import { chatRoomRequestId } from '@/utils/chat/chatRoomRequestId';
import { ChatRequestType } from '@/types/chatRequestType';
import { UserProfileType } from '@/types/userProfileType';
import { api } from '@/utils/api';

// 사용자 정보 가져오기
const fetchUsers = async () => {
  const response = await api.get('/api/client/profile/all');
  return response.data;
};

const TestPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { nickName, isLoading } = useChatMyInfo();
  const { sent, received } = useChatRequestStore();

  useChatRequestFetch(nickName ?? '');

  // 참가자 조회
  const { data: users = [] } = useQuery<UserProfileType[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // 채팅 요청
  const { mutate: chatRequest } = useChatRequest();
  const onChatRequest = (receiverNickname: string) => {
    if (!nickName) return;

    chatRequest(
      { senderNickname: nickName, receiverNickname },
      {
        onSuccess: () => {
          toast.success(`${receiverNickname}님에게 요청을 보냈습니다.`);

          queryClient.invalidateQueries({
            queryKey: ['chatSentList', nickName, 'PENDING'],
          });
        },
      },
    );
  };

  // 채팅 요청 수락
  const { mutate: acceptRequest } = useAcceptRequest();
  const onChatAccept = (req: ChatRequestType) => {
    acceptRequest(req.id, {
      onSuccess: (data) => {
        toast.success(`${req.senderNickname}님의 요청을 수락했습니다.`, {
          autoClose: 0.5,
        });

        setTimeout(() => {
          if (data.roomId) {
            navigate(`/chat?roomId=${data.roomId}`, { replace: true });
          }
        }, 600);

        queryClient.invalidateQueries({
          queryKey: ['chatReceivedList', nickName, 'PENDING'],
        });
      },
    });
  };

  // 채팅 요청 거절
  const { mutate: rejectRequest } = useRejectRequest();
  const onChatReject = (req: ChatRequestType) => {
    rejectRequest(req.id, {
      onSuccess: () => {
        toast.success(`${req.senderNickname}님의 요청을 거절했습니다.`);

        queryClient.invalidateQueries({
          queryKey: ['chatReceivedList', nickName, 'PENDING'],
        });
      },
    });
  };

  if (isLoading || !nickName) {
    return (
      <div className="text-center py-10 text-white">
        사용자 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <>
      <p className="text-2xl">현재 로그인 : {nickName}</p>
      <hr className="my-4" />
      <section>
        <p className="mb-1">주변 참가자 리스트</p>
        <ul>
          {users.map((user) => {
            if (user.nickName === nickName) return null;

            const state = getChatButtonState(user.nickName, sent, received);

            const acceptedChat = [...sent.ACCEPTED, ...received.ACCEPTED].find(
              (req) =>
                req.senderNickname === user.nickName ||
                req.receiverNickname === user.nickName,
            );
            return (
              <li key={user.id}>
                <p>{user.nickName}</p>
                {state === 'CHATTED' && (
                  <Button size="sm" variant="secondary" disabled>
                    대화한 적 있음
                  </Button>
                )}
                {state === 'MOVE' && (
                  <Button
                    size="sm"
                    onClick={() =>
                      acceptedChat &&
                      chatRoomRequestId(acceptedChat.id, navigate)
                    }>
                    채팅방으로 이동하기
                  </Button>
                )}
                {state === 'WAITING' && (
                  <Button size="sm" variant="secondary" disabled>
                    수락 대기중...
                  </Button>
                )}
                {state === 'REQUEST' && (
                  <Button
                    size="sm"
                    onClick={() => onChatRequest(user.nickName)}>
                    대화 요청하기
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <hr className="my-4" />
      <section>
        <p>보낸 채팅 요청 {sent.PENDING.length}</p>
        {sent.PENDING.length > 0 && (
          <ul className="space-y-2">
            {sent.PENDING.map((req) => (
              <li key={req.id}>
                <p>{req.receiverNickname}</p>
                <Button size="sm" variant="secondary" disabled>
                  수락 대기중...
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <hr className="my-4" />
      <section>
        <p>받은 채팅 요청 {received.PENDING.length}</p>
        {received.PENDING.length > 0 && (
          <ul className="space-y-2">
            {received.PENDING.map((req) => (
              <li key={req.id}>
                <p>{req.senderNickname}</p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onChatReject(req)}>
                  거절
                </Button>
                <Button size="sm" onClick={() => onChatAccept(req)}>
                  수락
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default TestPage;
