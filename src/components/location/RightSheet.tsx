import Filter from './Filter';
import UserCard from './UserCard';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUserStore } from '@/stores/useUserStore';

const RightSheet = () => {
  const mode = useBottomSheetStore((state) => state.mode);
  const chatTab = useBottomSheetStore((state) => state.chatTab);
  const setChatTab = useBottomSheetStore((state) => state.setChatTab);

  const role = useFilterStore((state) => state.role);
  const career = useFilterStore((state) => state.career);
  const users = useUserStore((state) => state.users);

  const filteredUsers = users.filter((user) => {
    const matchRole = !role || user.role === role;
    const matchCareer = !career || user.career === career;
    return matchRole && matchCareer;
  });

  return (
    <div className="hidden tablet:flex flex-col w-full h-full bg-[#141415] rounded-lg text-white">
      <div className="flex flex-col gap-1 mb-4">
        <span className="text-lg font-semibold">
          {mode === 'chat' ? '채팅 요청' : '탐색하기'}
        </span>
        <span className="text-sm text-gray-400">
          {mode === 'chat'
            ? '보낸 요청과 받은 요청을 빠르게 확인하는 공간입니다.'
            : '같은 관심사를 가진 사람과 네트워킹하세요'}
        </span>
      </div>

      {mode === 'explore' && (
        <div className="mb-4">
          <Filter />
        </div>
      )}

      {mode === 'chat' && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setChatTab('sent')}
            className={`px-4 py-1 rounded-full text-sm border ${
              chatTab === 'sent'
                ? 'text-white border-blue-500'
                : 'bg-[#222222] text-gray-300 border-gray-500'
            }`}>
            보낸 요청
          </button>
          <button
            onClick={() => setChatTab('received')}
            className={`px-4 py-1 rounded-full text-sm border ${
              chatTab === 'received'
                ? 'text-white border-blue-500'
                : 'bg-[#222222] text-gray-300 border-gray-500'
            }`}>
            받은 요청
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[60vh]">
        {filteredUsers.map((user, index) => (
          <div key={user.id} className={`${index % 2 === 1 ? 'mt-6' : ''}`}>
            <UserCard
              user={user}
              onSelect={() => {}}
              selectedUserId={null}
              onRequest={() => {}}
              buttonState={'REQUEST'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSheet;
