import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

interface BackNavProps {
  title?: string;
}

const BackNav = ({ title }: BackNavProps) => {
  const navigate = useNavigate();

  return (
    <nav className="relative flex w-full max-w-[1440px] m-auto">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-0 top-1/2 w-8 h-8 -translate-y-1/2">
        <ArrowLeft size={20} />
      </button>
      {title && <span className="text-[16px] font-bold m-auto">{title}</span>}
    </nav>
  );
};

export default BackNav;
