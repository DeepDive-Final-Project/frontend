import { cva } from 'class-variance-authority';
import ChatRequestMessage from '@/components/Chat/ChatRequestMessage';
import Button from '@/components/common/Button';
import { LogOut } from 'react-feather';

interface ChatRequestCardProps {
  status: 'request' | 'send' | 'rejected';
}

const chatCardVariants = cva(
  'w-full max-w-[420px] mx-auto px-5 py-4 text-center border border-[#222325] rounded-[4px] bg-[#0A0A0B]',
  {
    variants: {
      status: {
        request: '',
        send: '',
        rejected: '',
      },
    },
  },
);

const ChatRequestCard = ({ status }: ChatRequestCardProps) => {
  return (
    <div className={chatCardVariants({ status })}>
      {status === 'request' && (
        <>
          <ChatRequestMessage
            title={'대화 신청을 수락할까요?'}
            description={'신청을 수락하면 바로 대화가 시작됩니다'}
            titleColor="text-[#66A1F8]"
          />
          <div className="flex space-x-4 mt-[12px] justify-center">
            <Button size="sm" variant="secondary">
              거절
            </Button>
            <Button size="sm">수락</Button>
          </div>
        </>
      )}
      {status === 'send' && (
        <>
          <ChatRequestMessage
            title={'대화 요청을 보냈어요'}
            description={'신청을 수락하면 바로 대화가 시작됩니다.'}
          />
        </>
      )}
      {status === 'rejected' && (
        <>
          <ChatRequestMessage
            title={'대화 요청이 거절되었어요'}
            description={'상대방이 대화 요청을 수락하지 않았어요'}
            titleColor="text-[#FF7171]"
          />
          <div className="flex mt-[12px] justify-center">
            <Button
              size="sm"
              variant="secondary"
              icon={<LogOut size={24} className="text-[#e6e6e6]" />}>
              이 채팅방 떠나기
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatRequestCard;
