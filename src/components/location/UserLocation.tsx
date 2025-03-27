import React, { useMemo } from 'react';
import avatarIcon from '@/assets/images/avatarMapin.svg';

const users = [
  { id: 1, name: '김아무개', role: '디자이너' },
  { id: 2, name: '이아무개', role: '개발자' },
  { id: 3, name: '박아무개', role: 'PM' },
  { id: 4, name: '최아무개', role: '학생' },
  { id: 5, name: '정아무개', role: '기타' },
  { id: 6, name: '한아무개', role: '개발자' },
  { id: 7, name: '홍아무개', role: '디자이너' },
  { id: 8, name: '서아무개', role: '기획자' },
  { id: 9, name: '류아무개', role: 'PM' },
  { id: 10, name: '문아무개', role: '기타' },
];

const UserLocation = () => {
  const size = 80;
  const center = size / 2;

  const smallR = size * 0.2;
  const midR = size * 0.32;
  const bigR = size * 0.45;

  const getCirclePoints = (radius: number) => {
    const angleStep = 360 / 10;
    return Array.from({ length: 10 }).map((_, i) => {
      const angle = i * angleStep;
      const rad = (angle * Math.PI) / 180;
      return {
        x: center + radius * Math.cos(rad),
        y: center + radius * Math.sin(rad),
      };
    });
  };

  const getRandomFromArray = (
    arr: { x: number; y: number }[],
    count: number,
  ) => {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const userPositions = useMemo(() => {
    const total = users.length;
    const smallCount = Math.min(2, total);
    const midCount = Math.min(4, Math.max(0, total - smallCount));
    const bigCount = Math.max(0, total - smallCount - midCount);

    const smallPoints = getRandomFromArray(getCirclePoints(smallR), smallCount);
    const midPoints = getRandomFromArray(getCirclePoints(midR), midCount);
    const bigPoints = getRandomFromArray(getCirclePoints(bigR), bigCount);

    const positions = [...smallPoints, ...midPoints, ...bigPoints];

    return positions.map((pos, i) => ({
      ...pos,
      user: users[i],
    }));
  }, []);

  return (
    <div className="w-full flex justify-center items-center bg-[#000000]">
      <div
        className="relative rounded-full bg-[#111111]"
        style={{
          width: '80vw',
          maxWidth: '400px',
          aspectRatio: '1 / 1',
        }}>
        <div
          className="absolute bg-gray-500 rounded-full"
          style={{
            width: '10px',
            height: '10px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {[smallR, midR, bigR].map((r, idx) => (
          <div
            key={idx}
            className="absolute border border-gray-500 rounded-full"
            style={{
              width: `${r * 2}vw`,
              height: `${r * 2}vw`,
              left: `calc(50% - ${r}vw)`,
              top: `calc(50% - ${r}vw)`,
            }}
          />
        ))}
        {userPositions.map(({ x, y, user }, index) => (
          <div
            key={index}
            className="absolute flex flex-col items-center"
            style={{
              left: `${x}vw`,
              top: `${y}vw`,
              transform: 'translate(-50%, -50%)',
            }}>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
              <img
                src={avatarIcon}
                alt="user"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[10px] text-white whitespace-nowrap">
              {user.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(UserLocation);
