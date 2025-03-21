import InterestSelector from '@/components/Location/InterestSelector';
import UserList from '@/components/Location/UserList';
import UserLocation from '@/components/Location/UserLocation';
import BottomSheet from '@/components/Location/BottomSheet';

const Location = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 gap-4 bg=[#000000]">
      <div className="md:w-[40vw] w-full flex justify-center items-center">
        <UserLocation />
      </div>

      <div className="md:w-[60vw] w-full md:flex hidden flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
        <InterestSelector />
        <UserList />
      </div>
      <BottomSheet />
    </div>
  );
};

export default Location;
