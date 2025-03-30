import FAQItem from './FAQAccordion';

const FAQSection = () => {
  const faqData = [
    {
      question: '어떤 방식으로 주변 참가자를 탐색하나요?',
      answer:
        '사용자의 위치 기반 정보와 컨퍼런스 참가 정보를 활용하여, 현재 앱에 접속 중인 참가자들 중 나와 가까운 위치에 있는 사람을 실시간으로 추천해줍니다. 리스트 또는 카드 형태로 참가자를 탐색하고, 채팅 요청을 보낼 수 있습니다.',
    },
    {
      question: '내 위치 정보는 항상 공유되나요?',
      answer:
        "아니요. 이 서비스는 사용자가 앱에 접속해 있는 동안에만 위치 정보가 공유됩니다. 접속하지 않으면 주변 사람 목록에서 보이지 않으며, 내 위치도 다른 사람에게 표시되지 않습니다.\n또한, 접속 중이더라도 '위치 비공개' 옵션을 선택할 수 있습니다. 이 경우 내 위치는 공유되지 않지만, 동시에 다른 사람의 위치 정보도 확인할 수 없습니다.",
    },
    {
      question: '프로필 정보는 어디까지 공개되나요?',
      answer:
        '참가자의 이름, 직무, 경력, 관심사, 한 줄 소개 및 링크(예: 깃허브, 인스타그램) 등은 프로필 카드에 표시됩니다. 단, 사용자는 설정을 통해 일부 정보를 숨기거나 공개 범위를 조정할 수 있습니다. 실시간 위치는 표시되지 않으며, 단지 ‘근처에 있음’ 정도의 거리 정보만 반영됩니다.',
    },
  ];

  return (
    <section className="w-full mx-auto px-9 pt-16 pb-24">
      <h2
        className="text-center text-white font-pretendard
             text-[28px] leading-[42px] font-semibold
             desktop:text-[60px] desktop:leading-[90px] desktop:font-bold mb-8">
        FAQ
        <br />
        자주 하는 질문
      </h2>

      <div>
        {faqData.map((item, index) => (
          <FAQItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
