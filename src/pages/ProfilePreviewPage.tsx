import { useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileCard from '@/components/common/ProfileCard';
import { useChatRequest } from '@/hooks/useChatRequest';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useChatRequestFetch } from '@/hooks/useChatRequestFetch';
import { useChatRequestStore } from '@/stores/useChatRequestStore';
import { useChatMyInfo } from '@/stores/useChatMyInfoStore';
import { getChatButtonState } from '@/utils/chat/getChatButtonState';
import { chatRoomRequestId } from '@/utils/chat/chatRoomRequestId';
import { toast } from 'react-toastify';

const ProfilePreviewPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { otherId } = useParams<{ otherId: string }>();
  const { profile, loading } = useUserProfile(Number(otherId));

  // 버튼 상태값 가져오기
  const { sent, received } = useChatRequestStore();
  const { userId, nickName } = useChatMyInfo();

  const chatButtonState = getChatButtonState(
    profile?.nickName ?? '',
    sent,
    received,
  );

  const acceptedChat = [...sent.ACCEPTED, ...received.ACCEPTED].find(
    (req) =>
      req.senderNickname === profile?.nickName ||
      req.receiverNickname === profile?.nickName,
  );

  const handleMoveChat = () => {
    if (acceptedChat) {
      chatRoomRequestId(acceptedChat.id, navigate);
    }
  };

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

  useChatRequestFetch(nickName ?? '');

  if (!otherId)
    return (
      <div className="pt-10 text-center text-[#A2A4AA]">잘못된 접근입니다.</div>
    );

  if (loading || !profile)
    return <div className="pt-10 text-center text-[#A2A4AA]">로딩 중...</div>;

  return (
    <div className="max-w-[1440px] m-auto">
      <div className="relative max-w-[375px] m-auto mobile:p-10 p-5 rounded-[4px] text-sm border border-[#222325] bg-[#1E1E1F]">
        <ProfileCard
          name={profile.nickName}
          job={profile.role ?? ''}
          bio={profile.introduction ?? ''}
          interests={
            [profile.topic1, profile.topic2, profile.topic3].filter(
              Boolean,
            ) as string[]
          }
          career={profile.career ?? ''}
          links={(profile.links ?? []).map((link) => ({
            title: link.title,
            url: link.link,
          }))}
          profileImageUrl={profile.profileImage}
          userId={userId}
          profileId={profile.id}
          chatButtonState={chatButtonState}
          onChat={() => onChatRequest(profile.nickName)}
          onMoveChat={handleMoveChat}
        />
      </div>
    </div>
  );
};

export default ProfilePreviewPage;
