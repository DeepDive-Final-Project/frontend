import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    const match = location.pathname.match(/\/profile\/(\d+)/);
    if (match) {
      const currentStep = parseInt(match[1], 10);
      if (currentStep === 1) {
        navigate('/');
      } else {
        navigate(`/profile/${currentStep - 1}`);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="h-[52px] flex px-4">
      <button onClick={goBack}>
        <ChevronLeft size={24} color="#E6E6E6" />
      </button>
    </div>
  );
};

export default TopNav;
