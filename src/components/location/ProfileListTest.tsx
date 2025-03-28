import { useState } from 'react';
import axios from 'axios';

interface Profile {
  id: number;
  name: string;
  message: string;
  role: string;
  nickname: string;
  career: string;
  topic1: string;
}

const ProfileListTest = () => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Profile[]>(
        `${import.meta.env.VITE_API_BASE_URL}/api/client/profile/all`,
      );
      setProfiles(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('에러 발생');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 text-white">
      <button
        onClick={fetchProfiles}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-sm">
        보기
      </button>

      {loading && <p>로딩 중...</p>}
      {error && <p>에러 발생: {error}</p>}
      {profiles && (
        <ul className="mt-4 space-y-2">
          {profiles.map((profile) => (
            <li key={profile.id} className="border-b">
              <span className="font-bold">{profile.name}</span>({profile.id}) (
              {profile.role} / {profile.career}) ({profile.topic1})
              <span className="text-sm text-gray-400">{profile.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileListTest;
