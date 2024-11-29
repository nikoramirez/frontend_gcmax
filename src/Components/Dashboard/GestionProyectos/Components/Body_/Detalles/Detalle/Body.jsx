import React from 'react';
//import './body.css';
import Top from '../../../Top Section/Top';
import Detalles from '../Detalle/Det/Detalles';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Detalles />
      </div>
    </div>
  );
};

export default Body;
