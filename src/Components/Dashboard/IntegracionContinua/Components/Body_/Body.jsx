import React from 'react';
import Top from '../Top Section/Top';
import Configuracion from '../Body_/Configuracion/Configuracion';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Configuracion />
      </div>
    </div>
  );
};

export default Body;
