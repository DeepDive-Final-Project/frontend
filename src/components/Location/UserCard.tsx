import React, { useCallback, useState } from 'react';
import Tag from './Tag';
import { ChevronUp, ChevronDown } from 'react-feather';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { User } from '@/stores/useUserStore';

interface UserCardProps {
  user: User;
  onSelect: (userId: number) => void;
  selectedUserId: number | null;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onSelect,
  selectedUserId,
}) => {
  const [showTags, setShowTags] = useState(false);
  const isSelected = selectedUserId === user.id;

  const mode = useBottomSheetStore((state) => state.mode);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(user.id);
  }, []);

  const handleToggleTags = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTags((prev) => !prev);
  }, []);
  return (
    <div className="relative w-full">
      <div
        className={`
        user-card rounded-xl flex flex-col text-white relative overflow-hidden
        border-2 border-white mobile:w-[90%] tablet:w-[80%] desktop:w-[60%] mx-auto bg-[#0A0A0B]
        min-h-[295px]
      `}
        onClick={handleCardClick}>
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${user.image})` }}
          />

          <div
            className="absolute inset-0 opacity-70 z-10"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0) 40%, #0A0A0B 100%)',
            }}
          />

          <div className="absolute inset-0 z-10 flex flex-col p-2 text-white">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs mobile:text-sm tablet:text-base">
                    {user.name}
                  </p>
                  <p className="text-xs">
                    {user.role} • {user.career}
                  </p>
                </div>
                <button onClick={handleToggleTags} className="hover:opacity-80">
                  {showTags ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>

              {showTags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {user.tags.map((tag, index) => (
                    <Tag key={index} color={tag.color} text={tag.text} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2 mt-2 bg-[#0A0A0B rounded-b-lg transition-all]">
          {mode === 'explore' && (
            <p className="text-xs text-gray-300 mobile:text-sm tablet:text-base">
              {user.message}
            </p>
          )}
        </div>
        {mode === 'explore' && isSelected && (
          <div className="absolute bottom-3 left-0 w-full flex justify-center">
            <button className="px-6 py-[4px] rounded-3xl text-white bg-blue-500 hover:bg-blue-600 transition-all">
              대화 요청하기
            </button>
          </div>
        )}
        {mode === 'chat' && (
          <div className="absolute bottom-3 left-0 w-full flex flex-col items-center px-4">
            <button className="px-4 py-1 rounded-full text-white hover:bg-blue-600 text-sm">
              거절하기
            </button>
            <button className="px-4 py-1 rounded-full text-white hover:bg-blue-600 text-sm">
              채팅 수락하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserCard);
