import React from 'react';
import Top from '../../../Top Section/Top';
import Registros from '../Registro/Reg/Registro';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Registros />
      </div>
    </div>
  );
};

export default Body;
