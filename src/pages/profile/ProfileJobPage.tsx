import TopNav from '@/components/profile/TopNav';
import ProgressBar from '@/components/profile/ProgressBar';
import NextButton from '@/components/profile/NextButton';
import InputFieldLabel from '@/components/profile/InputFieldLabel';
import Dropdown from '@/components/profile/DropDown';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '@/stores/useProfileStore';

const ProfileJobPage = () => {
  const [roles, setRoles] = useState<{ key: string; description: string }[]>(
    [],
  );
  const [careers, setCareers] = useState<
    { key: string; description: string }[]
  >([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showCareerInput, setShowCareerInput] = useState(false);
  const navigate = useNavigate();

  const { setRole, setCareer } = useProfileStore();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/client/enums/roles`,
        );
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      const fetchCareers = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/client/enums/careers?role=${selectedRole}`,
          );
          setCareers(response.data);
          setShowCareerInput(true);
        } catch (error) {
          console.error('Error fetching careers:', error);
        }
      };

      fetchCareers();
    }
  }, [selectedRole]);

  const handleSkip = () => {
    navigate('/profile4');
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden tablet:flex flex-grow"></div>
        <div className="w-full tablet:w-[375px] desktop:w-[375px] desktop:mx-20 min-h-screen flex flex-col items-center">
          <TopNav />
          <ProgressBar currentStep={3} />
          <header className="py-[20px]">
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              About You
            </div>
            <div className="text-center mobile:text-[24px]">
              무엇을 하고 계신가요
            </div>
            <div className="text-center mobile:text-[16px] mobile:text-[#cccccc]">
              조금 더 알려주세요
            </div>
          </header>

          <main className="flex flex-col items-center px-4 w-full flex-grow gap-4">
            <InputFieldLabel textLabel="나의 직무는" />
            <Dropdown
              label="직무를 선택해주세요"
              options={roles}
              onSelect={(roleKey) => {
                setSelectedRole(roleKey);
                setRole(roleKey);
              }}
            />

            {showCareerInput && (
              <>
                <InputFieldLabel textLabel="현재 학력은" />
                <Dropdown
                  label="현재 혹은 최종 학력을 선택해주세요"
                  options={careers}
                  onSelect={(careerKey) => {
                    setCareer(careerKey);
                  }}
                />
              </>
            )}
          </main>

          <footer className="w-full tablet:w-[320px] desktop:w-[375px] px-4 pb-6 flex flex-col items-center">
            <NextButton text={'다음으로 진행하기'} onClick={handleSkip} />
            <div className="h-[42px]" />
          </footer>
        </div>
      </div>
    </>
  );
};

export default ProfileJobPage;
