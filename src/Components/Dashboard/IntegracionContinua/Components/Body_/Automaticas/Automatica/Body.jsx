import React from 'react';
import Top from '../../../Top Section/Top';
import Automatizacion from './Aut/Automaticas';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Automatizacion />
      </div>
    </div>
  );
};

export default Body;
