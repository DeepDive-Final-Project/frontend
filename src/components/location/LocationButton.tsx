import { useState } from 'react';
import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';

const LocationButton: React.FC = () => {
  const setUsers = useUserStore((state) => state.setUsers);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleSendLocation = () => {
    const fixedLat = 37.2986736;
    const fixedLng = 126.9957758;

    setLatitude(fixedLat);
    setLongitude(fixedLng);

    sendLocationToServer(fixedLat, fixedLng);

    /*
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
    */
  };
  const parseInterestString = (interest: string) => {
    const colors = ['#ff7f50', '#6a5acd', '#32cd32'];
    const tags: { text: string; color: string }[] = [];

    const parts = interest.split(',').map((part) => part.trim());

    parts.forEach((part, index) => {
      const [, value] = part.split(':').map((s) => s.trim());
      if (value) {
        tags.push({
          text: value,
          color: colors[index % colors.length],
        });
      }
    });

    return tags;
  };

  const sendLocationToServer = async (lat: number, lng: number) => {
    const payload = {
      id: 98,
      latitude: lat,
      longitude: lng,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/location/save`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        },
      );

      await new Promise((resolve) => setTimeout(resolve, 300));

      const nearbyResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/location/nearby`,
        { id: 98 },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const parsedUsers = nearbyResponse.data.data.map(
        (user: {
          id: number;
          nickname: string;
          role: string;
          career: string;
          introduction: string;
          interest: string;
        }) => ({
          id: user.id,
          nickname: user.nickname,
          role: user.role,
          career: user.career,
          introduction: user.introduction,
          // image:'image.jpg',
          tags: parseInterestString(user.interest),
        }),
      );
      console.log('받은 유저 리스트:', nearbyResponse.data);
      setUsers(parsedUsers);
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
