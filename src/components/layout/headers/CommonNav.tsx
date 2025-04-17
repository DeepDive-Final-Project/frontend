import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send } from 'react-feather';
import axios from 'axios';
import Logo from '@/assets/images/logo.svg';
import { useUserProfile } from '@/hooks/useUserProfile';

const CommonNav = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/auth/me`,
          { withCredentials: true },
        );
        setUserId(res.data.id);
      } catch (error) {
        console.error('패치 실패', error);
      }
    };

    fetchUserId();
  }, []);

  const { profile } = useUserProfile(userId || 0);

  const profileImage = profile?.profileImage;

  return (
    <nav className="flex w-full max-w-[1440px] m-auto justify-between">
      <h1 className="inline-block">
        <Link to="/home" className="block w-full h-full">
          <img src={Logo} alt="Logo" className="h-[40px]" />
        </Link>
      </h1>

      <div className="flex flex-row items-center gap-4">
        <button
          onClick={() => navigate('/chat')}
          className="flex h-[32px] w-[32px] tablet:w-[88px] tablet:bg-[#1f1f1f] rounded-full items-center justify-center gap-1 border-0 tablet:border tablet:border-[#5A5C63]">
          <Send className="h-5 w-5 tablet:h-4 tablet:w-4 text-[#E6E6E6]" />
          <p className="hidden tablet:inline text-sm font-medium text-[#E6E6E6]">
            내 채팅
          </p>
        </button>
        <button
          className="w-8 h-8 bg-[#1f1f1f] rounded-full flex items-center justify-center overflow-hidden"
          onClick={() => navigate('/chatProfile')}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="프로필"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-[#444] rounded-full" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default CommonNav;
