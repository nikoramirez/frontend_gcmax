import React from 'react';
import Top from '../../../Top Section/Top';
import Metricas from './Met/Metricas';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Metricas />
      </div>
    </div>
  );
};

export default Body;
