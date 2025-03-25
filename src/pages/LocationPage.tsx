// import InterestSelector from '@/components/Location/InterestSelector';
// import UserList from '@/components/Location/UserList';
// import UserLocation from '@/components/Location/UserLocation';
import BottomSheet from '@/components/Location/BottomSheet';
import LocationButton from '@/components/Location/LocationButton';
import LocationNavBar from '@/components/Location/LocationNavBar';

const LocationPage = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden overflow-y-auto bg-[#000000] flex flex-col desktop:flex-row items-start justify-between px-4 gap-4 ">
      <div className="w-full flex flex-col gap-2">
        <LocationNavBar />
        <LocationButton />
        <div className="desktop:w-[40vw] w-full flex justify-center items-center">
          {/* <UserLocation /> */}
        </div>

        <div className="desktop:w-[60vw] w-full hidden desktop:flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
          {/* <InterestSelector /> */}
          {/* <UserList /> */}
        </div>
        <div className="desktop:hidden w-full">
          <BottomSheet />
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
