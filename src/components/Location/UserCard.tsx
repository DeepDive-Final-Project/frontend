import React, { useCallback, useState } from 'react';
import Tag from './Tag';

interface User {
  id: number;
  name: string;
  role: string;
  tags: { color: string; text: string }[];
  message: string;
  image: string;
}
interface UserCardProps {
  user: User;
  onSelect: (userId: number) => void;
  selectedUserId: number | null;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected((prev) => !prev);
  }, []);
  const handleDeselect = useCallback(() => {
    setIsSelected(false);
  }, []);

  return (
    <div className="relative w-full" onClick={handleDeselect}>
      <div
        className={`user-card rounded-lg shadow-md flex flex-col text-white relative overflow-hidden transition-all cursor-pointer ${
          isSelected
            ? 'border-2 border-blue-500'
            : 'border-2 border-transparent'
        } mobile:w-[90%] tablet:w-[80%] desktop:w-[60%] mx-auto`}
        onClick={handleClick}>
        <div
          className="w-full h-40 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${user.image})` }}></div>
        <div className="absolute top-0 left-0 w-full bg-gray-600 bg-opacity-60 p-2">
          <p className="text-xs mobile:text-sm tablet:text-base">{user.name}</p>
          <p className="text-xs">{user.role}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {user.tags.map((tag, index) => (
              <Tag key={index} color={tag.color} text={tag.text} />
            ))}
          </div>
        </div>
        <div
          className={`p-2 mt-2 bg-black rounded-b-lg transition-all ${isSelected ? 'mb-12' : ''}`}>
          <p className="text-xs text-gray-300 mobile:text-sm tablet:text-base">
            {user.message}
          </p>
        </div>

        {isSelected && (
          <div className="absolute bottom-2 left-0 w-full flex justify-center">
            <button className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all">
              대화 요청하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserCard);
