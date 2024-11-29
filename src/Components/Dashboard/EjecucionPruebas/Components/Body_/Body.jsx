import React from 'react';
import Top from '../Top Section/Top';
import Ejecucion from '../Body_/Ejecucion/Ejecucion';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Ejecucion />
      </div>
    </div>
  );
};

export default Body;
