import React from 'react';
import Sidebar from './Components/SideBar Section/Sidebar';
import Body from './Components/Body Section/Body';

const Dashboard = () => {
  return (
    <div className="dashboard flex">
      <div className="dashboardContainer flex">
        <Sidebar />
        <Body />
      </div>
    </div>
  );
};

export default Dashboard;
