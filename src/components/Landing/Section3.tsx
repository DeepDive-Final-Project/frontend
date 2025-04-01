import Desc from '@/components/Landing/Desc.tsx';
import ProfileSample from '@/assets/images/profileSample.svg';

const Section3 = () => {
  return (
    <>
      <Desc
        title={
          <>
            프로필 정보를 <br />한 눈에 확인
          </>
        }
        description={
          <>
            참가자의 역할, 관심 분야, 소속 등을 <br />
            간편하게 확인하고, 나와 맞는 사람을 쉽게 찾아 보세요
          </>
        }
      />
      <img src={ProfileSample} className="w-full pt-10" />
    </>
  );
};

export default Section3;
