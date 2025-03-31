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
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [showCareerInput, setShowCareerInput] = useState(false);
  const navigate = useNavigate();

  const { setRole, setCareer } = useProfileStore();
  const canProceed = selectedRole !== null && selectedCareer !== null;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/api/client/enums/roles`,
        );
        setRoles(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching roles::', error);
      }
    };

    void fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      const fetchCareers = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/api/client/enums/careers?role=${selectedRole}`,
          );
          setCareers(Array.isArray(response.data) ? response.data : []);

          setShowCareerInput(true);
        } catch (error) {
          console.error('Error fetching careers:', error);
        }
      };

      void fetchCareers();
    }
  }, [selectedRole]);

  const handleSkip = () => {
    if (!canProceed) return;
    console.log('선택한 직무:', selectedRole);
    console.log('선택한 학력:', selectedCareer);
    navigate('/profile/4');
  };

  return (
    <div className="w-full max-w-full tablet:w-[360px] desktop:w-[375px] flex flex-col flex-grow">
      <TopNav />
      <ProgressBar currentStep={3} />

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <header className="py-[20px] text-center">
            <div className="text-[16px] text-[#cccccc]">About You</div>
            <div className="text-[24px]">무엇을 하고 계신가요</div>
            <div className="text-[16px] text-[#cccccc]">조금 더 알려주세요</div>
          </header>

          <main className="flex flex-col gap-4 w-full px-4">
            <InputFieldLabel textLabel="나의 직무는" />
            <Dropdown
              label="직무를 선택해주세요"
              options={roles}
              onSelect={(roleKey) => {
                setSelectedRole(roleKey);
                setRole(roleKey);
                setSelectedCareer(null);
              }}
            />
            {showCareerInput && (
              <>
                <InputFieldLabel
                  textLabel={
                    selectedRole === 'STUDENT' ? '현재 학력은' : '현재 경력은'
                  }
                />
                <Dropdown
                  label={
                    selectedRole === 'STUDENT'
                      ? '현재 혹은 최종 학력을 선택해주세요'
                      : '현재 혹은 최종 경력을 선택해주세요'
                  }
                  options={careers}
                  onSelect={(careerKey) => {
                    setSelectedCareer(careerKey);
                    setCareer(careerKey);
                  }}
                  resetKey={selectedRole}
                />
              </>
            )}
          </main>
        </div>

        <footer className="w-full px-4 pb-6 tablet:w-[360px] desktop:w-[375px] flex flex-col items-center desktop:pb-60">
          <NextButton
            text="다음으로 진행하기"
            onClick={handleSkip}
            disabled={!canProceed}
          />
        </footer>
      </div>
    </div>
  );
};

export default ProfileJobPage;
