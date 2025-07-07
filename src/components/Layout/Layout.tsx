import { Outlet } from 'react-router-dom';
import { UtilityBar } from '../UtilityBar/UtilityBar';

const Layout = () => {
  return (
    <>
      <UtilityBar />
      <main>
        <Outlet /> 
      </main>
    </>
  );
};

export default Layout;
