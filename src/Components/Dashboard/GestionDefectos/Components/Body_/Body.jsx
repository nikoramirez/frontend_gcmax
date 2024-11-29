import React from 'react';
import Top from '../Top Section/Top';
import Reg_defectos from '../Body_/Reg_defecto/Reg_defectos';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Reg_defectos />
      </div>
    </div>
  );
};

export default Body;
