import React from 'react';
import Top from '../../../Top Section/Top';
import Visualizacion from '../Visualizar/Vis/Visualizacion';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Visualizacion />
      </div>
    </div>
  );
};

export default Body;
