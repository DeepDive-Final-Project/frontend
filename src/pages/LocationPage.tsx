import InterestSelector from '@/components/Location/InterestSelector';
import UserList from '@/components/Location/UserList';
import UserLocation from '@/components/Location/UserLocation';
import BottomSheet from '@/components/Location/BottomSheet';
import axios from 'axios';
import LocationButton from '@/components/Location/LocationButton';
import LocationNavBar from '@/components/Location/LocationNavBar';
const fetchData = async () => {
  try {
    const response = await axios.get(
      'http://43.201.245.222:8080/api/client/profile/all',
      {},
    );
    console.log('백엔드 응답 데이터', response.data[2].career);
  } catch (error) {
    console.error('APi 요청 실패', error);
  }
};
fetchData();

const LocationPage = () => {
  return (
    <div className="flex flex-col desktop:flex-row min-h-screen p-4 gap-4 bg=[#000000]">
      <LocationNavBar />
      <LocationButton />
      <div className="desktop:w-[40vw] w-full flex justify-center items-center">
        <UserLocation />
      </div>

      <div className="desktop:w-[60vw] w-full hidden desktop:flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
        <InterestSelector />
        <UserList />
      </div>
      <div className="desktop:hidden w-full">
        <BottomSheet />
      </div>
    </div>
  );
};

export default LocationPage;
