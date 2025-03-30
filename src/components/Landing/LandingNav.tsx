import Logo from '@/assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';

const LandingNav = () => {
  const navigate = useNavigate();
  const handleLanding = () => {
    navigate('/');
  };
  const handleLogin = () => {
    navigate('/login');
  };
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="logo"
            onClick={handleLanding}
            className="cursor-pointer"
          />
        </div>
        <nav className="flex space-x-6 text-sm text-white  font-semibold">
          <span
            className="hidden tablet:inline cursor-pointer hover:text-[#66A1F8] transition-colors"
            onClick={() => scrollToSection('section3')}>
            주요기능
          </span>
          <span
            className="hidden tablet:inline cursor-pointer hover:text-[#66A1F8] transition-colors"
            onClick={() => scrollToSection('faq')}>
            FAQ
          </span>

          <span
            className="cursor-pointer hover:text-[#66A1F8] transition-colors"
            onClick={handleLogin}>
            로그인
          </span>
        </nav>
      </div>
    </>
  );
};

export default LandingNav;
