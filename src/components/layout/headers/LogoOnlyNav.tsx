import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.svg';

const LogoOnlyNav = () => {
  return (
    <nav className="flex">
      <h1 className="inline-block">
        <Link to="/login" className="block w-full h-full">
          <img src={Logo} alt="Logo" className="h-[40px]" />
        </Link>
      </h1>
    </nav>
  );
};

export default LogoOnlyNav;
