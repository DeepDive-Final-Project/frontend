import React, { useMemo } from 'react';
import avatarIcon from '@/assets/images/avatarMapin.svg';
import { useUserStore } from '@/stores/useUserStore';
import NoneRadar from '@/assets/images/404.svg';

const UserLocation = () => {
  const users = useUserStore((state) => state.users);
  const smallR = 20;
  const midR = 32;
  const bigR = 45;

  const getCirclePoints = (radius: number) => {
    const angleStep = 360 / 10;
    return Array.from({ length: 10 }).map((_, i) => {
      const angle = i * angleStep;
      const rad = (angle * Math.PI) / 180;
      const cx = 50 + radius * Math.cos(rad);
      const cy = 50 + radius * Math.sin(rad);
      return { x: cx, y: cy };
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
  }, [users]);

  return (
    <div className="w-full flex justify-center items-center bg-[#000000]">
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src={NoneRadar}
            alt="위치 정보 없음"
            className="w-[240px] tablet:w-[300px] opacity-70"
          />
        </div>
      ) : (
        <div
          className="relative rounded-full bg-[#111111] aspect-square"
          style={{
            width: 'min(100vw, 320px)',
            height: 'min(100vw, 320px)',
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
                width: `${r * 2}%`,
                height: `${r * 2}%`,
                left: `${50 - r}%`,
                top: `${50 - r}%`,
              }}
            />
          ))}
          {userPositions.map(({ x, y, user }) => (
            <div
              key={user.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}>
              <img
                src={avatarIcon}
                alt="avatar"
                className={`w-[28px] h-[28px]`}
              />
              <p className="text-[10px] text-white whitespace-nowrap">
                {user.nickName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(UserLocation);
