import React from 'react';
import Top from '../../../Top Section/Top';
import Correccion from '../Correccion/Corr/Correccion';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Correccion />
      </div>
    </div>
  );
};

export default Body;
