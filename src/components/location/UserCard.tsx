import React from 'react';

interface User {
  id: number;
  nickname: string;
  role: string;
  career: string;
  introduction?: string;
}

interface UserCardProps {
  user: User;
  onSelect: (id: number) => void;
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
  const isSelected = selectedUserId === user.id;

  return (
    <div
      className="user-card p-4 rounded-xl bg-[#1e1e1e] text-white cursor-pointer"
      onClick={() => onSelect(user.id)}>
      <div className="font-bold text-lg">{user.nickname}</div>
      <div className="text-sm text-gray-400">
        {user.role} · {user.career}
      </div>

      {isSelected && (
        <div className="mt-2 text-sm text-gray-300">
          {user.introduction || '소개가 없습니다.'}
        </div>
      )}

      {isSelected && (
        <div className="mt-3">
          {buttonLabel ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick?.();
              }}
              className="w-full px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
              {buttonLabel}
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRequest();
              }}
              disabled={isRequested}
              className={`w-full px-3 py-1 rounded ${
                isRequested
                  ? 'bg-gray-500 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}>
              {isRequested ? '요청 완료됨' : '대화 요청하기'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
