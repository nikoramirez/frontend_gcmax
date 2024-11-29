import React from 'react';
import Top from '../../../Top Section/Top';
import Exportacion from './Exp/Exportacion';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Exportacion />
      </div>
    </div>
  );
};

export default Body;
