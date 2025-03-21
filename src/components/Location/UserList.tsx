import { useUserStore } from '@/stores/useUserStore';

const UserList = () => {
  const { users, interests } = useUserStore();

  const filteredUsers = users.filter((user) =>
    user.interests.some((interest) => interests.includes(interest)),
  );

  return (
    <div className="w-full bg-[#111111] p-4 rounded-lg text-white">
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
              <div>
                <p className="text-sm">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
                <p className="text-xs text-gray-400">
                  {user.interests.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">같은 관심사를 가진 유저가 없습니다.</p>
      )}
    </div>
  );
};

export default UserList;
