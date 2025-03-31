import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';

const LocationButton: React.FC = () => {
  const setUsers = useUserStore((state) => state.setUsers);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [myImage, setMyImage] = useState<string>('');

  const fetchMyInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/auth/me`,
        {
          withCredentials: true,
        },
      );

      const id = response.data.id;
      setUserId(id);
      console.log('내 정보:', response.data);

      fetchMyProfileImage(id);
    } catch (error) {
      console.error('내 정보 요청 실패:', error);
    }
  };

  const fetchMyProfileImage = async (id: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/client/profile/profile-images`,
        {
          params: { userIds: [id] },
          withCredentials: true,
        },
      );

      const imageUrl = response.data[id];
      console.log('내 프로필 이미지 URL:', imageUrl);
      setMyImage(imageUrl);
    } catch (error) {
      console.error('프로필 이미지 요청 실패:', error);
    }
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

  const sendLocationToServer = async (lat: number, lng: number, id: number) => {
    const payload = { id, latitude: lat, longitude: lng };

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/location/save`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      await new Promise((resolve) => setTimeout(resolve, 300));

      const nearbyResponse = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/location/nearby`,
        { id },
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
          image: '',
          tags: parseInterestString(user.interest),
        }),
      );

      console.log('받은 유저 리스트:', parsedUsers);
      setUsers(parsedUsers);
    } catch (error) {
      console.error('위치 전송 실패:', error);
    }
  };

  const handleSendLocation = () => {
    const fixedLat = 37.2986736;
    const fixedLng = 126.9957758;

    setLatitude(fixedLat);
    setLongitude(fixedLng);

    if (userId) {
      sendLocationToServer(fixedLat, fixedLng, userId);
    } else {
      console.warn('유저 ID가 없습니다. /auth/me 요청을 먼저 확인해주세요.');
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return (
    <div className="flex flex-col items-start gap-2 text-white">
      <button
        onClick={handleSendLocation}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        내 위치 전송 & 주변 유저 받기
      </button>

      {latitude && longitude && (
        <div className="text-sm text-gray-300">
          현재 위치:
          <br />
          위도: <span className="text-white">{latitude}</span>
          <br />
          경도: <span className="text-white">{longitude}</span>
        </div>
      )}
      <div>
        {myImage && (
          <div>
            <img src={myImage} alt="profile" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationButton;
