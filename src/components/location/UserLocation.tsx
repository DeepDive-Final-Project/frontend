import React, { useMemo, useState } from 'react';
import avatarIcon from '@/assets/images/avatarMapin.svg';
import { useUserStore } from '@/stores/useUserStore';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import NoneRadar from '@/assets/images/404.svg';
import GradCircle from '@/assets/images/Group 6.svg';

const UserLocation = () => {
  const myProfileImage = useUserStore((state) => state.myProfileImage);
  const users = useUserStore((state) => state.users);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const setMode = useBottomSheetStore((state) => state.setMode);
  const setHeight = useBottomSheetStore((state) => state.setHeight);
  const setSelectedByMapPin = useUserStore(
    (state) => state.setSelectedByMapPin,
  );

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
  const handlePinClick = (userId: number) => {
    setSelectedUserId(userId);
    setSelectedByMapPin(userId);

    setTimeout(() => {
      setMode('explore');
      setHeight(window.innerHeight - 150);
    }, 700);
  };

  return (
    <div className="w-full flex justify-center items-center bg-[#000000] mt-15">
      {users.length === 0 && !myProfileImage ? (
        <div className="flex flex-col items-center justify-center mt-14">
          <div className="self-stretch text-center justify-start text-color-Base-white-2 text-base font-normal leading-normal">
            Opps!
          </div>
          <div className="self-stretch text-center justify-start text-color-Base-white-1 text-2xl font-medium  leading-9">
            어디에 계시나요?
          </div>
          <div className="self-stretch text-center justify-start text-color-Base-white-2 text-base font-normal leading-normal">
            내 위치를 공개 해보아요
          </div>
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
          <img
            src={GradCircle}
            alt="center-graphic"
            className="absolute z-35"
            style={{
              width: `${smallR * 2}%`,
              height: `${smallR * 2}%`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          />
          {selectedUserId !== null && (
            <div
              className="absolute inset-0 bg-black/80 z-10 rounded-full"
              onClick={() => setSelectedUserId(null)}
            />
          )}
          {myProfileImage ? (
            <img
              src={myProfileImage}
              alt="my-profile"
              className="absolute rounded-full object-cover border border-white"
              style={{
                width: '28px',
                height: '28px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ) : (
            <div
              className="absolute bg-gray-500 rounded-full z-30"
              style={{
                width: '10px',
                height: '10px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}

          <svg
            viewBox="0 0 100 100"
            className="absolute w-full h-full"
            style={{ zIndex: 0 }}>
            <circle
              cx="50"
              cy="50"
              r="20"
              stroke="#9CA3AF"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="32"
              stroke="#9CA3AF"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#9CA3AF"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
          {userPositions.map(({ x, y, user }) => {
            const isSelected = selectedUserId === user.id;

            return (
              <div
                key={user.id}
                className="absolute flex flex-col items-center cursor-pointer"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 30 : 20,
                  opacity: selectedUserId === null || isSelected ? 1 : 0.3,
                }}
                onClick={() => handlePinClick(user.id)}>
                <div className="relative w-[28px] h-[28px]">
                  <img
                    src={avatarIcon}
                    alt="avatarIcon"
                    className="absolute w-full h-full"
                  />
                  <img
                    src={user.image}
                    alt={user.nickName}
                    className="absolute left-1/2 top-1/2 w-[22px] h-[22px] rounded-full object-cover"
                    style={{ top: '46%', transform: 'translate(-50%, -50%)' }}
                  />
                </div>

                {isSelected && (
                  <div className="mt-2 bg-white text-black px-2 py-1 rounded-md text-center text-xs shadow z-30 whitespace-nowrap">
                    <p className="font-bold">{user.nickName}</p>
                    <p className="text-[11px]">{user.role}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(UserLocation);
