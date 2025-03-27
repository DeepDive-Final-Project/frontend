import { useState } from 'react';
import axios from 'axios';
// import { useUserStore } from '@/stores/useUserStore';
const LocationButton: React.FC = () => {
  // const setUsers = useUserStore((state) => state.setUsers);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleSendLocation = () => {
    if (latitude && longitude) {
      sendLocationToServer(latitude, longitude);
      return;
    }

    if (!navigator.geolocation) {
      alert('위치 정보를 지원하지 않는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        sendLocationToServer(lat, lng);
      },
      (error) => {
        console.error('위치 정보를 가져올 수 없습니다:', error);
      },
    );
  };

  const sendLocationToServer = async (lat: number, lng: number) => {
    const payload = {
      id: 56,
      latitude: lat,
      longitude: lng,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/save`, payload, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 300));

      const nearbyResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/nearby`,
        { id: 56 },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('받은 유저 리스트:', nearbyResponse.data);
      // setUsers(nearbyResponse.data);
    } catch (error) {
      console.error('위치 전송 실패:', error);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 text-white">
      <button
        onClick={handleSendLocation}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        내 위치 전송 & 주변 유저 받기
      </button>

      {latitude && longitude && (
        <div className="text-sm text-gray-300">
          📍 현재 위치:
          <br />
          위도: <span className="text-white">{latitude}</span>
          <br />
          경도: <span className="text-white">{longitude}</span>
        </div>
      )}
    </div>
  );
};

export default LocationButton;
