import React, { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const convertGeoToPixel = (
  userLat: number,
  userLon: number,
  centerLat: number,
  centerLon: number,
  centerX: number,
  centerY: number,
  scale: number,
) => {
  const dx = (userLon - centerLon) * scale;
  const dy = (userLat - centerLat) * scale;

  return {
    x: centerX + dx,
    y: centerY - dy,
  };
};

const UserLocation = () => {
  const { latitude, longitude, users, interests, setUserLocation } =
    useUserStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position.coords.latitude, position.coords.longitude);
      },
      (error) => console.error('위치 정보를 가져올 수 없습니다.', error),
    );
  }, [setUserLocation]);

  if (!latitude || !longitude) return <p>위치를 불러오는 중...</p>;

  const filteredUsers = users.filter((user) =>
    user.interests.some((interest) => interests.includes(interest)),
  );

  const size = 400;
  const radius = size / 2.5;
  const centerX = size / 2;
  const centerY = size / 2;
  const scale = radius / 3;

  return (
    <div className="flex justify-center items-center w-full h-full bg-[#000000]">
      <div
        className="relative flex items-center justify-center bg-[#111111] rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          aspectRatio: '1 / 1',
        }}>
        <div
          className="absolute bg-gray-500 rounded-full"
          style={{
            width: `${radius * 0.05}px`,
            height: `${radius * 0.05}px`,
            left: `${centerX}px`,
            top: `${centerY}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div
          className="absolute border border-gray-400 rounded-full"
          style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
        />
        <div
          className="absolute border border-gray-300 rounded-full"
          style={{ width: `${radius * 1.5}px`, height: `${radius * 1.5}px` }}
        />

        {filteredUsers.map((user) => {
          const { x, y } = convertGeoToPixel(
            user.latitude,
            user.longitude,
            latitude,
            longitude,
            centerX,
            centerY,
            scale,
          );

          return (
            <div
              key={user.id}
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
          );
        })}
      </div>
    </div>
  );
};

export default UserLocation;
