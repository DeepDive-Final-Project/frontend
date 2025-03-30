import Desc from '@/components/Landing/Desc.tsx';
import RadarSample from '@/assets/images/radarSample.svg';
import LandingCard from '@/components/Landing/LandingCard.tsx';
import Radar from '@/assets/images/whiteradar.svg';
import { Mail, Users, Zap } from 'react-feather';

const Section2 = () => {
  return (
    <>
      <Desc
        title={
          <>
            내 주변의 참가자를 <br />한 눈에 탐색
          </>
        }
        description={
          <>
            컨퍼런스 현장에서 함께 있는 참가자를 <br />
            빠르게 탐색하고, 의미 있는 연결을 만들어 보세요
          </>
        }
      />
      <img src={RadarSample} alt="hero" className="w-full pt-10" />
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 px-4 w-full">
        <LandingCard
          icon={<img src={Radar} alt="Radar Icon" className="w-full" />}
          title="내 반경 10m 탐색"
          description="내 근처에 있는 참가자와 간편하게 네트워킹을 시작하세요"
        />
        <LandingCard
          icon={<Zap />}
          title="관심사 매칭률 기반 추천"
          description="내 관심사와 유사한 참가자들을 우선으로 추천해드려요"
        />
        <LandingCard
          icon={<Users />}
          title="참여자 유형 필터 검색"
          description="분야와 경력을 선택해서 세부적으로 참가자를 탐색하세요"
        />
        <LandingCard
          icon={<Mail />}
          title="간편한 대화 요청 관리"
          description="받은 대화 요청을 빠르게 검토하고 관리할 수 있어요"
        />
      </div>
    </>
  );
};

export default Section2;
