// 기능 개발을 위한 테스트 페이지입니다. (참가자에게 대화 요청 -> 수락/거절 -> 채팅방 생성)
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Button from '@/components/common/Button';
import { useChatSentList } from '@/hooks/useChatSentList';
import { useChatReceivedList } from '@/hooks/useChatReceivedList';
import { useChatRequest } from '@/hooks/useChatRequest';
import { useAcceptRequest } from '@/hooks/useAcceptRequest';
import { useRejectRequest } from '@/hooks/useRejectRequest';
import { ChatRequestType } from '@/types/chatRequestType';
import { chatRoomRequestId } from '@/utils/chat/chatRoomId';
import { api } from '@/utils/api';

// 임시
interface UserType {
  id: string;
  nickName: string;
}

const currentUser = localStorage.getItem('userId');

const fetchUsers = async () => {
  const response = await api.get('/api/client/profile/all');
  return response.data;
};

const TestPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 참가자 조회
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<UserType[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // 보낸 요청 "진행중" 리스트
  const { data: sentPendingList = [] } = useChatSentList(
    currentUser ?? '',
    'PENDING',
  );

  // 보낸 요청 "수락" 리스트
  const { data: sentAcceptedList = [] } = useChatSentList(
    currentUser ?? '',
    'ACCEPTED',
  );

  // 받은 요청 "진행중" 리스트
  const { data: receivedPendingList = [] } = useChatReceivedList(
    currentUser ?? '',
    'PENDING',
  );

  // 채팅 요청
  const { mutate: chatRequest } = useChatRequest();
  const onChatRequest = (senderNickname: string, receiverNickname: string) => {
    chatRequest(
      { senderNickname, receiverNickname },
      {
        onSuccess: () => {
          toast.success(
            `${receiverNickname}님께 대화 요청이 정상적으로 전송되었습니다.`,
          );

          queryClient.invalidateQueries({
            queryKey: ['chatSentList', senderNickname, 'PENDING'],
          });
        },
        onError: () => {
          toast.error(
            '요청을 처리하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
          );
        },
      },
    );
  };

  // 채팅 요청 수락
  const { mutate: acceptRequest } = useAcceptRequest();

  const onChatAccept = (requestId: number) => {
    acceptRequest(requestId, {
      onSuccess: (data) => {
        if (data.roomId) {
          navigate(`/chat?roomId=${data.roomId}`, { replace: true });
        }
        queryClient.invalidateQueries({
          queryKey: ['chatReceivedList', currentUser, 'PENDING'],
        });
      },
    });
  };

  // 채팅 요청 거절
  const { mutate: rejectRequest } = useRejectRequest();

  const onChatReject = (requestId: number) => {
    rejectRequest(requestId, {
      onSuccess: () => {
        toast.success('요청을 거절했습니다.');

        queryClient.invalidateQueries({
          queryKey: ['chatReceivedList', currentUser, 'PENDING'],
        });
      },
      onError: () => {
        toast.error('요청 거절 중 오류가 발생했습니다.');
      },
    });
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="max-w-[1440px] m-auto">
      <p>현재 로그인 : {currentUser}</p>
      <section>
        <ul className="flex flex-col space-y-7 mt-10">
          {users.map((user) => {
            const requestStatusMap = {
              acceptedChat: sentAcceptedList.find(
                (req: ChatRequestType) =>
                  req.receiverNickname === user.nickName,
              ),
              alreadySentPending: sentPendingList.find(
                (req: ChatRequestType) =>
                  req.receiverNickname === user.nickName,
              ),
              alreadyReceivedPending: receivedPendingList.find(
                (req: ChatRequestType) => req.senderNickname === user.nickName,
              ),
            };

            return (
              <div key={user.id}>
                <p>내 주변 참가자 {user.nickName}</p>
                {requestStatusMap.acceptedChat ? (
                  <Button
                    size="sm"
                    onClick={() =>
                      chatRoomRequestId(
                        requestStatusMap.acceptedChat!.id,
                        navigate,
                      )
                    }>
                    채팅방으로 이동하기
                  </Button>
                ) : requestStatusMap.alreadySentPending ||
                  requestStatusMap.alreadyReceivedPending ? (
                  <Button size="sm" variant="secondary" disabled>
                    수락 대기중...
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() =>
                      onChatRequest(currentUser ?? '', user.nickName)
                    }>
                    대화 요청하기
                  </Button>
                )}
              </div>
            );
          })}
        </ul>
      </section>
      <hr className="my-4" />
      <section>
        <p>보낸 채팅 요청 {sentPendingList.length}</p>
        {sentPendingList.length > 0 ? (
          <ul>
            {sentPendingList.map((list: ChatRequestType) => (
              <li key={list.id}>
                <p>{list.receiverNickname}</p>
                <Button size="sm" variant="secondary" disabled>
                  수락 대기중...
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>보낸 요청이 없습니다.</p>
        )}
      </section>
      <hr className="my-4" />
      <section>
        <p>받은 채팅 요청 {receivedPendingList.length}</p>
        {receivedPendingList.length > 0 ? (
          <ul>
            {receivedPendingList.map((list: ChatRequestType) => (
              <li key={list.id}>
                <p>{list.senderNickname}</p>
                <p>{list.id}</p>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onChatReject(list.id)}>
                  거절
                </Button>
                <Button size="sm" onClick={() => onChatAccept(list.id)}>
                  수락
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>받은 요청이 없습니다.</p>
        )}
      </section>
    </div>
  );
};

export default TestPage;
