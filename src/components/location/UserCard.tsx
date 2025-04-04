import React, { useCallback, useState } from 'react';
import { ChevronUp, ChevronDown } from 'react-feather';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { User } from '@/stores/useUserStore';
import gradientOverlay from '@/assets/images/user_profile_radial_gradient.png';
import Tag from './Tag';
import Button from '@/components/common/Button';

interface UserCardProps {
  user: User;
  onSelect: (userId: number) => void;
  selectedUserId: number | null;
  buttonState: 'REQUEST' | 'WAITING' | 'MOVE' | 'CHATTED';
  onRequest: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onMoveToChat?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onSelect,
  buttonState,
  onRequest,
  onAccept,
  onReject,
  onMoveToChat,
}) => {
  const [showTags, setShowTags] = useState(false);
  const mode = useBottomSheetStore((state) => state.mode);

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect(user.id);
    },
    [onSelect, user.id],
  );

  const handleToggleTags = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTags((prev) => !prev);
  }, []);

  return (
    <div className="relative w-full">
      <div
        className={`user-card aspect-[3/5] rounded-xl flex flex-col text-white relative overflow-hidden border-2 border-gray-600 bg-[#0A0A0B] w-[clamp(130px,45vw,286px)] h-[clamp(226px,75vw,497.2px)] tablet:w-[clamp(130px,20vw,176.5px)] tablet:h-[clamp(226px,34vw,306.84px)] desktop:w-[176.5px] desktop:h-[306.84px]`}
        onClick={handleCardClick}>
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${user.image})` }}
          />
          <img
            src={gradientOverlay}
            alt="gradient overlay"
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
          />
          <div className="absolute inset-0 z-20 flex flex-col p-2 text-white bg-gradient-to-b from-[#18181b] to-transparent via-[#18181b]/0">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs mobile:text-sm tablet:text-base">
                  {user.nickName}
                </p>
                <p className="text-xs">
                  {user.role} • {user.career}
                </p>
              </div>
              <button
                onClick={handleToggleTags}
                className="hover:opacity-80 rounded-full bg-[#18181b] px-2 py-2 tablet:px-3 tablet:py-3 transition-colors">
                {showTags ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            {showTags && (
              <div className="mt-2 p-2 mobile:p-3 tablet:p-4 text-xs mobile:text-sm tablet:text-base bg-neutral-900/30 backdrop-blur-[5px] rounded-lg shadow-[inset_0px_2px_12px_rgba(161,173,192,0.2)] outline outline-[0.5px] outline-offset-[-0.5px] outline-neutral-200/50">
                <div className="flex flex-col gap-1">
                  {user.tags.map((tag, index) => (
                    <Tag key={index} color={tag.color} text={tag.text} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-2 mt-2 flex flex-col gap-2 bg-[#0A0A0B] rounded-b-lg transition-all">
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-full px-2 py-2 rounded-full text-white bg-[#0A0A0B] hover:bg-[#146EF5] text-xs mobile:text-sm tablet:text-base">
            상세 프로필 보기
          </button>

          {buttonState === 'CHATTED' && (
            <Button size="sm" variant="secondary" disabled>
              대화한 적 있음
            </Button>
          )}
          {buttonState === 'WAITING' && (
            <Button size="sm" variant="secondary" disabled>
              수락 대기중...
            </Button>
          )}
          {buttonState === 'MOVE' && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMoveToChat?.();
              }}>
              채팅방으로 이동
            </Button>
          )}
          {buttonState === 'REQUEST' && mode === 'explore' && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRequest();
              }}>
              대화 요청하기
            </Button>
          )}
          {mode === 'chat' && onAccept && onReject && (
            <>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept();
                }}>
                수락하기
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onReject();
                }}>
                거절하기
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserCard);
