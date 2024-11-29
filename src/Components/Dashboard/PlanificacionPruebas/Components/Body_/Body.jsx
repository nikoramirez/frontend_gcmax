import React from 'react';
import Top from '../Top Section/Top';
import Creacion from '../Body_/Creacion/Creacion';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Creacion />
      </div>
    </div>
  );
};

export default Body;
