import Desc from '@/components/Landing/Desc.tsx';
import Lottie from 'lottie-react';
import chatSample from '@/assets/chatSample.json';

const Section4 = () => {
  return (
    <>
      <Desc
        title={
          <>
            실시간 채팅으로 <br /> 바로 대화를 시작
          </>
        }
        description={
          <>
            인사하고 싶은 사람이 있다면? <br />
            채팅 신청으로 빠르게 네트워킹하고 기회를 넓혀보세요
          </>
        }
      />
      <div className="min-h-[300px] w-full">
        <Lottie animationData={chatSample} />
      </div>
    </>
  );
};

export default Section4;
