import React, { useCallback, useState } from 'react';
import Tag from './Tag';
import { ChevronUp, ChevronDown } from 'react-feather';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { User } from '@/stores/useUserStore';
import gradientOverlay from '@/assets/images/user_profile_radial_gradient.png';

interface UserCardProps {
  user: User;
  onSelect: (userId: number) => void;
  selectedUserId: number | null;
  isRequested: boolean;
  onRequest: () => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onSelect,
  selectedUserId,
  isRequested,
  onRequest,
  buttonLabel,
  onButtonClick,
}) => {
  const [showTags, setShowTags] = useState(false);
  const isSelected = selectedUserId === user.id;
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
        className={`user-card rounded-xl flex flex-col text-white relative overflow-hidden
        border-2 border-gray-600 mobile:w-[90%] tablet:w-[80%] desktop:w-[60%] mx-auto bg-[#0A0A0B]
        min-h-[295px]`}
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
                  {user.nickname}
                </p>
                <p className="text-xs">
                  {user.role} • {user.career}
                </p>
              </div>
              <button
                onClick={handleToggleTags}
                className="hover:opacity-80 rounded-full bg-[#18181b] p-1 transition-colors">
                {showTags ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            {showTags && (
              <div className="mt-2 p-2 bg-neutral-900/30 backdrop-blur-[5px] rounded-lg shadow-[inset_0px_2px_12px_rgba(161,173,192,0.2)] outline outline-[0.5px] outline-offset-[-0.5px] outline-neutral-200/50">
                <div className="flex flex-col gap-1">
                  {user.tags.map((tag, index) => (
                    <Tag key={index} color={tag.color} text={tag.text} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* explore 모드: 소개 or 요청하기 */}
        {mode === 'explore' &&
          (isSelected ? (
            <div className="p-2 mt-2 flex flex-col gap-2 bg-[#0A0A0B] rounded-b-lg transition-all">
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-full px-2 py-2 rounded-full text-white bg-[#0A0A0B] hover:bg-blue-500 text-xs mobile:text-sm tablet:text-base">
                상세 프로필 보기
              </button>
              <button
                disabled={isRequested}
                onClick={(e) => {
                  e.stopPropagation();
                  onRequest();
                }}
                className={`w-full px-2 py-2 rounded-3xl text-white transition-all
        text-xs mobile:text-sm tablet:text-base
        ${
          isRequested
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-[#0A0A0B] hover:bg-blue-500'
        }`}>
                {isRequested ? '요청 완료' : '대화 요청하기'}
              </button>
            </div>
          ) : (
            <div className="p-2 mt-2 bg-[#0A0A0B] rounded-b-lg transition-all">
              <p className="text-xs text-gray-300 mobile:text-sm tablet:text-base">
                {user.introduction}
              </p>
            </div>
          ))}

        {/* chat 모드: 채팅방 이동 */}
        {mode === 'chat' && (
          <div className="p-2 mt-2 flex flex-col gap-2 bg-[#0A0A0B] rounded-b-lg transition-all">
            <button className="w-full px-2 py-2 rounded-full text-white bg-[#0A0A0B] hover:bg-blue-600 text-xs mobile:text-sm tablet:text-base">
              상세 프로필 보기
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onButtonClick) onButtonClick();
              }}
              className="w-full px-2 py-2 rounded-full text-white bg-[#0A0A0B] hover:bg-blue-600 text-xs mobile:text-sm tablet:text-base">
              {buttonLabel || '채팅방으로 이동'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserCard);
