import { useState } from 'react';

const LocationButton = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [permission, setPermission] = useState<PermissionState>('prompt');

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation을 지원하지 않는 브라우저입니다.');
      return;
    }
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      setPermission(result.state);
      if (result.state === 'denied') {
        alert('위치 접근이 차단되었습니다. 브라우저 설정에서 허용해주세요.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('위치 가져오기 실패:', error);
          alert('위치를 가져올 수 없습니다.');
        },
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-4 rounded-lg">
      <button
        onClick={getLocation}
        className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
        내 위치 가져오기
      </button>

      {location && (
        <div className="mt-4 text-lg">
          <p>📍 위도: {location.lat}</p>
          <p>📍 경도: {location.lng}</p>
        </div>
      )}

      <p className="text-gray-400 text-sm mt-2">
        {permission === 'prompt' && '위치 정보를 요청하세요.'}
        {permission === 'granted' && '위치 정보가 활성화되었습니다!'}
        {permission === 'denied' && '위치 접근이 차단되었습니다.'}
      </p>
    </div>
  );
};

export default LocationButton;
