import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useNavBarStore } from '@/stores/useNavBarStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect, useState, useRef } from 'react';
import {
  Mail,
  Users,
  MoreHorizontal,
  MapPin,
  LogOut,
  RotateCw,
} from 'react-feather';
import radar from '@/assets/images/radar.svg';
import LocationImg from '@/assets/images/request_modal.png';
import axios from 'axios';
import { logout } from '@/hooks/useLogout';
import { useNavigate } from 'react-router-dom';

type RawUser = {
  id: number;
  nickName: string;
  role: string;
  career: string;
  introduction: string;
  interest: string;
};

type Tag = { text: string; color: string };
type ParsedUser = RawUser & {
  image: string;
  tags: Tag[];
};

const LocationNavBar: React.FC = () => {
  const setHeight = useBottomSheetStore((state) => state.setHeight);
  const setMode = useBottomSheetStore((state) => state.setMode);
  const resetHeight = useBottomSheetStore((state) => state.resetHeight);
  const activeIndex = useNavBarStore((state) => state.activeIndex);
  const setActiveIndex = useNavBarStore((state) => state.setActiveIndex);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const setUsers = useUserStore((state) => state.setUsers);
  const users = useUserStore((state) => state.users);
  const navigate = useNavigate();
  const [moreSetting, setMoreSetting] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const [introHint, setIntroHint] = useState(false);
  const setMyProfileImage = useUserStore((state) => state.setMyProfileImage);

  const fetchMyInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/auth/me`,
        { withCredentials: true },
      );
      const { id } = response.data;
      setUserId(id);
      const myImage = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/client/profile/${id}`,
        { withCredentials: true },
      );
      const profileImage = myImage.data.profileImage;
      setMyProfileImage(profileImage);
    } catch (error) {
      console.error('내 정보 요청 실패:', error);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  const parseInterestString = (interest: string): Tag[] => {
    const colors = ['#ff7f50', '#6a5acd', '#32cd32'];
    const tags: Tag[] = [];

    const parts = interest.split(',').map((part) => part.trim());
    parts.forEach((part, index) => {
      const [, value] = part.split(':').map((s) => s.trim());
      if (value) {
        tags.push({ text: value, color: colors[index % colors.length] });
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
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      await new Promise((resolve) => setTimeout(resolve, 300));

      const nearbyResponse = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/location/nearby`,
        { id },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const rawUsers: RawUser[] = nearbyResponse.data.data;

      const parsedUsers: ParsedUser[] = rawUsers.map((user) => ({
        ...user,
        image: '',
        tags: parseInterestString(user.interest),
      }));

      const userIds = parsedUsers.map((user) => user.id);
      const query = userIds.map((id) => `clientIds=${id}`).join('&');

      const imageResponse = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/client/profile/profile-images?${query}`,
        { withCredentials: true },
      );

      const imageArray: { clientId: number; profileImageUrl: string }[] =
        imageResponse.data;

      const imageMap = imageArray.reduce(
        (acc, curr) => {
          acc[curr.clientId] = curr.profileImageUrl;
          return acc;
        },
        {} as Record<number, string>,
      );

      const usersWithImages = parsedUsers.map((user) => ({
        ...user,
        image: imageMap[user.id] || '',
      }));

      setUsers(usersWithImages);
    } catch (error) {
      console.error('위치 전송 실패:', error);
    }
  };

  const handleLocationPermission = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (checked) {
      setTimeout(() => setShowModal(true), 500);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log('위치 허용됨', lat, lng);
          setShareLocation(true);

          if (userId) {
            await sendLocationToServer(lat, lng, userId);
          }
        },
        (error) => {
          console.error('위치 권한 거절됨:', error);
          setShareLocation(false);
        },
      );
    } else {
      setShareLocation(false);
    }
  };

  const handleRefresh = async () => {
    if (!userId) {
      console.warn('userId가 없습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log('새로고침 위치:', lat, lng);
        await sendLocationToServer(lat, lng, userId);
      },
      (error) => {
        console.error('위치 권한 오류:', error);
      },
    );
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        moreSetting &&
        moreRef.current &&
        !moreRef.current.contains(e.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(e.target as Node)
      ) {
        setMoreSetting(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreSetting]);
  const buttons = [
    {
      icon: (
        <img
          src={radar}
          alt="네비게이션"
          className={`${activeIndex === 0 ? 'brightness-0 invert' : ''}`}
        />
      ),
      label: '네비게이션',
      onClick: () => {
        resetHeight();
        resetFilters();
        setMode('explore');
        setMoreSetting(false);
        setActiveIndex(0);
      },
    },
    {
      icon: <Users />,
      label: '친구',
      onClick: () => {
        setHeight(window.innerHeight - 150);
        setMode('explore');
        resetFilters();
        setMoreSetting(false);
        setActiveIndex(1);
      },
    },
    {
      icon: <Mail />,
      label: '메시지',
      onClick: () => {
        setHeight(window.innerHeight - 150);
        setMode('chat');
        resetFilters();
        setMoreSetting(false);
        setActiveIndex(2);
      },
    },
    {
      icon: <RotateCw />,
      label: '새로고침',
      onClick: () => {
        handleRefresh();
        setMoreSetting(false);
        setActiveIndex(3);
      },
    },
    {
      icon: <MoreHorizontal />,
      label: '더보기',
      onClick: () => {
        if (!introHint) {
          setIntroHint(true);
        }
        const willClose = moreSetting && activeIndex === 4;

        if (shareLocation) {
          if (willClose) {
            setMoreSetting(false);
            setActiveIndex(-1);
          } else {
            setMoreSetting(true);
            setActiveIndex(4);
          }
        } else {
          setMoreSetting(!willClose);
          setActiveIndex(willClose ? -1 : 4);
        }
      },
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center">
        <div className="inline-flex bg-[#111111] p-1 rounded-xl shadow-lg outline outline-[0.5px] outline-offset-[-0.5px] outline-[#333333] w-fit">
          {buttons.map((btn, index) => {
            const isMoreButton = index === 4;
            const isActive = isMoreButton
              ? activeIndex === 4 && (shareLocation || moreSetting)
              : activeIndex === index;

            return (
              <div key={btn.label} className="relative">
                <button
                  ref={isMoreButton ? moreButtonRef : undefined}
                  key={btn.label}
                  onClick={btn.onClick}
                  disabled={(index === 0 || index === 1) && users.length === 0}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors
                ${
                  isMoreButton
                    ? isActive
                      ? 'bg-[#e5e5e5] text-[#1d4ed8]'
                      : users.length === 0
                        ? 'bg-[#111111] text-gray-400 border border-[#146EF5]'
                        : 'bg-[#111111] text-gray-400'
                    : index === 0 || index === 1
                      ? users.length === 0
                        ? 'bg-[#4E5157] text-[#8D8F96]'
                        : isActive
                          ? 'bg-blue-500 text-white shadow-[inset_0px_1px_8px_0px_rgba(255,255,255,0.30)]'
                          : 'bg-[#111111] text-gray-400'
                      : isActive
                        ? 'bg-blue-500 text-white shadow-[inset_0px_1px_8px_0px_rgba(255,255,255,0.30)]'
                        : 'bg-[#111111] text-gray-400'
                }
                ${index === 2 || index === 3 ? 'border-r border-[#333333]' : ''}`}>
                  {btn.icon}
                </button>
                {isMoreButton && users.length === 0 && !introHint && (
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 text-xs rounded-md bg-[#262627] text-#E6E6E6 whitespace-nowrap z-10">
                    내 위치 공개는 여기에 있어요
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {moreSetting && (
          <div
            ref={moreRef}
            className="absolute  bg-[#0A0A0B] top-[140px] border border-[#B0B2B7] rounded-lg px-4 py-4 w-[220px] shadow-lg z-50">
            <p className="text-sm font-semibold leading-tight border-b border-[#262626] ">
              설정하기
            </p>

            <div className="flex justify-between items-center py-2">
              <span className="flex text-sm">
                <label
                  htmlFor="shareLocation"
                  className="flex items-center gap-1 text-sm cursor-pointer">
                  <MapPin />내 위치 공개
                </label>
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="shareLocation"
                  type="checkbox"
                  className="sr-only peer"
                  checked={shareLocation}
                  onChange={handleLocationPermission}
                />
                <div className="w-10 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200" />
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 peer-checked:translate-x-5" />
              </label>
            </div>

            <button
              onClick={async () => {
                try {
                  await logout();
                  navigate('/login');
                } catch (err) {
                  console.error('로그아웃 실패', err);
                }
              }}
              className="flex items-center gap-1 text-sm hover:text-blue-500 mt-2">
              <LogOut />
              로그아웃
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black border bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-[#0c0a09] border border-gray-500 rounded-xl p-6 text-center shadow-lg w-[80%] max-w-xs">
            <p className="text-white text-sm text-left font-semibold leading-loose mb-4">
              잠깐! 위치권한을 허용해주세요
            </p>
            <p className="text-xs text-left text-gray-400">
              원할한 네트워킹 매칭을 위해
            </p>
            <p className="text-xs text-left text-gray-400">
              브라우저 설정에서 위치정보 권한을 허용해주세요
            </p>
            <img
              src={LocationImg}
              alt="위치 권한"
              className="w-full rounded-md mt-4 mb-4"
            />
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-1 py-1 w-full bg-blue-500 text-white text-lg rounded-3xl hover:bg-blue-600">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationNavBar;
