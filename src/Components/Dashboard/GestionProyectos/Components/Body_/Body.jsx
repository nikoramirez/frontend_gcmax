import React from 'react';
import Top from '../Top Section/Top';
import Proyectos from '../Body_/Proyectos/Proyectos';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Proyectos />
      </div>
    </div>
  );
};

export default Body;
