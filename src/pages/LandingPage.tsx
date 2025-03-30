import LandingNav from '@/components/Landing/LandingNav.tsx';
import LandingTitle from '@/components/Landing/LandingTitle.tsx';
import Logo from '@/assets/images/logo.svg';
import CTAbtn from '@/components/Landing/CTAbtn.tsx';
import HeroImage from '@/assets/images/heroImage.svg';
import Section2 from '@/components/Landing/Section2.tsx';
import Section3 from '@/components/Landing/Section3.tsx';
import Section4 from '@/components/Landing/Section4.tsx';
import SectionMotion from '@/components/Landing/SectionMotion.tsx';
import FAQSection from '@/components/Landing/FAQSection.tsx';
const LandingPage = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black shadow-md">
        <LandingNav />
      </header>
      <div className="h-40" />

      <main className="pt-16 px-4 flex flex-col items-center justify-center">
        <div className="animate-slide-up">
          <LandingTitle />
          <img
            src={Logo}
            alt="logo"
            className="w-[236px] mx-auto my-6 tablet:w-[476px] desktop:w-[726px]"
          />
          <CTAbtn />
        </div>
        <img
          src={HeroImage}
          alt="hero"
          className="w-[640px] mx-auto my-6 tablet:w-[1023px] desktop:w-[1440px]
             animate-slide-up"
        />
        <SectionMotion>
          <Section2 />
        </SectionMotion>
        <div id="section3">
          <div className="h-40" />
          <SectionMotion>
            <Section3 />
          </SectionMotion>
        </div>

        <div className="h-40" />
        <SectionMotion>
          <Section4 />
        </SectionMotion>
        <div className="h-40" />

        <h3
          className="text-center font-bold text-[20px] tablet:text-[28px] desktop:text-[46px]
             leading-[30px] tablet:leading-[44px] desktop:leading-[66px]
             bg-gradient-to-l from-white via-[#ccc] to-[#999]
             bg-clip-text text-transparent font-pretendard">
          만남이 빚어내는 깊은 가치
          <br />
          컨퍼런스의 새로운 도약
        </h3>
        <img
          src={Logo}
          alt="logo"
          className="w-[236px] mx-auto my-6 tablet:w-[476px] desktop:w-[726px]"
        />
        <CTAbtn />
        <div className="h-40" />
        <div id="faq">
          <FAQSection />
        </div>
      </main>
      <footer className="w-full px-4 py-8 bg-[#141415] text-[#E6E6E6] text-sm font-pretendard">
        <div className="max-w-7xl mx-auto flex flex-col tablet:flex-row items-center tablet:items-center justify-start tablet:space-x-4 space-y-4 tablet:space-y-0">
          <img src={Logo} alt="logo" className="w-28" />

          <div className="flex items-center gap-x-3">
            <span className="transition">고객센터</span>
            <div className="w-0.5 h-4 bg-[#4E5157]" />
            <a
              href="https://horse-grin-4db.notion.site/1c07fd02709c809793cbd41ad7f41c63?pvs=4"
              target="_blank"
              rel="noopener noreferrer">
              개인정보 처리방침
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
