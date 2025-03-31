import TopNav from '@/components/profile/TopNav.tsx';
import LoginButton from '@/components/profile/LoginButton.tsx';
import Google from '@/assets/images/google.svg';
import Github from '@/assets/images/github.svg';
import Kakao from '@/assets/images/kakao.svg';
import OnboardingContents from '@/components/profile/OnboardingContents.tsx';

const LoginPage = () => {
  const handleKakao = () => {
    window.location.href = `${import.meta.env.VITE_KAKAO_URL}`;
  };

  const handleGoogle = () => {
    window.location.href = `${import.meta.env.VITE_GOOGLE_URL}`;
  };

  const handleGit = () => {
    window.location.href = `${import.meta.env.VITE_GITHUB_URL}`;
  };

  return (
    <>
      <div className="flex max-w-screen-[1415px]">
        <div className="hidden tablet:flex flex-grow">
          <OnboardingContents />
        </div>
        <div className="w-full tablet:w-[360px] desktop:w-[375px] desktop:mr-20 flex flex-col">
          <TopNav />
          <div className="flex flex-grow">
            <div className="w-full tablet:w-[370px] desktop:w-[375px] flex flex-col">
              <header className="pt-[120px] text-center">
                <div className="text-[24px]">Welcome</div>
                <div className="mobile:text-[16px] text-[#B7B9BD]">
                  사람들을 만나 누리고 나누세요
                </div>
              </header>
              <main className="flex flex-col items-center px-4 w-full gap-[16px] pt-[120px]">
                <LoginButton
                  text="Google로 로그인하기"
                  icon={<img src={Google} />}
                  onClick={handleGoogle}
                />
                <LoginButton
                  text="Github로 로그인하기"
                  icon={<img src={Github} />}
                  onClick={handleGit}
                />
                <LoginButton
                  text="Kakao로 로그인하기"
                  icon={<img src={Kakao} />}
                  onClick={handleKakao}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
