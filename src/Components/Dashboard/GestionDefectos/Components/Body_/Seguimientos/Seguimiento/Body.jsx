import React from 'react';
import Top from '../../../Top Section/Top';
import Seguimiento from '../Seguimiento/Seg/Seguimiento';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Seguimiento />
      </div>
    </div>
  );
};

export default Body;
