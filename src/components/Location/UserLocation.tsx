import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const UserLocation = () => {
  const { latitude, longitude, users, setUserLocation } = useUserStore();
  const [randomUsers, setRandomUsers] = useState<
    {
      id: number;
      x: number;
      y: number;
      user: any;
    }[]
  >([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position.coords.latitude, position.coords.longitude);
      },
      (error) => console.error('위치 정보를 가져올 수 없습니다.', error),
    );
  }, [setUserLocation]);

  useEffect(() => {
    if (!users.length) return;

    const size = 400;
    const radius = size / 2.5;
    const centerX = size / 2;
    const centerY = size / 2;

    const positions = Array.from({ length: 10 }).map((_, i) => {
      const degree = i * (360 / 10);
      const radian = (degree * Math.PI) / 180;
      const x = centerX + radius * Math.cos(radian);
      const y = centerY + radius * Math.sin(radian);
      return { x, y };
    });

    const assignedUsers = positions.map((pos, index) => ({
      id: index,
      x: pos.x,
      y: pos.y,
      user: users[Math.floor(Math.random() * users.length)],
    }));

    setRandomUsers(assignedUsers);
  }, [users]);

  if (!latitude || !longitude) return <p>위치를 불러오는 중...</p>;

  return (
    <div className="flex justify-center items-center w-full h-full bg-[#000000]">
      <div
        className="relative flex items-center justify-center bg-[#111111] rounded-full"
        style={{
          width: `400px`,
          height: `400px`,
          aspectRatio: '1 / 1',
        }}>
        <div
          className="absolute bg-gray-500 rounded-full"
          style={{
            width: `10px`,
            height: `10px`,
            left: `50%`,
            top: `50%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div className="absolute border border-gray-400 rounded-full w-[300px] h-[300px]" />
        <div className="absolute border border-gray-300 rounded-full w-[200px] h-[200px]" />

        {randomUsers.map(({ id, x, y, user }) => (
          <div
            key={id}
            className="absolute flex items-center bg-white shadow-md rounded-lg p-2 transition-transform duration-300"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
            }}>
            <div className="w-6 h-6 bg-gray-500 rounded-full mr-2"></div>
            <div>
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLocation;
