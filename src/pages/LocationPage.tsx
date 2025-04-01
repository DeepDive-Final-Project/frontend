import UserLocation from 'src/components/location/UserLocation';
import BottomSheet from 'src/components/location/BottomSheet';
import LocationButton from 'src/components/location/LocationButton';
import LocationNavBar from 'src/components/location/LocationNavBar';
import RightSheet from '@/components/location/RightSheet';
import Logo from '@/assets/images/logo.svg';

const LocationPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#000000] flex flex-col">
      <nav className="h-[64px] flex items-center px-4 shrink-0 border-b border-[#1f1f1f]">
        <img src={Logo} alt="Logo" className="h-[40px]" />
      </nav>

      <div className="flex flex-col tablet:flex-row px-4 gap-4 flex-1">
        <div className="w-full tablet:w-1/2 flex flex-col gap-2">
          <LocationNavBar />
          <LocationButton />
          <div className="w-full flex justify-center items-center">
            <UserLocation />
          </div>
        </div>

        <div className="w-full tablet:w-1/2">
          <div className="hidden tablet:block h-full">
            <RightSheet />
          </div>
          <div className="tablet:hidden">
            <BottomSheet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
