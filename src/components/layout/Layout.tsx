import { Outlet } from 'react-router-dom';

const Layout = ({ nav }: { nav: React.ReactNode }) => {
  return (
    <>
      <header className="fixed z-40 top-0 left-0 w-full h-[64px] flex items-center justify-between px-4 shrink-0 border-b border-[#1f1f1f] bg-[#000]">
        {nav}
      </header>
      <div className="max-w-[1440px] m-auto pt-16">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
