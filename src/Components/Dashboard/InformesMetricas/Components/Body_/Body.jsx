import React from 'react';
import Top from '../Top Section/Top';
import Calidad from '../Body_/Calidad/Calidad';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Calidad />
      </div>
    </div>
  );
};

export default Body;
