import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';
import Topbar from '../topbar/topbar';
import NavBar from '../navbar/NavBar';

const TopAndSide = ({ setAdminMode }) => {
  const location = useLocation();
  const checkAdmin = location.pathname.split('/')[1];

  return (
    <div>
      {checkAdmin === 'admin' ? (
        <div>
          <Topbar /> <Sidebar />{' '}
        </div>
      ) : (
        <NavBar setAdminMode={setAdminMode} />
      )}
    </div>
  );
};

export default TopAndSide;
