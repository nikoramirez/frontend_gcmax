import React from 'react';
//import './body.css';
import Top from '../../../Top Section/Top';
import Recursos from '../Recurso/Rec/Recursos';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Recursos />
      </div>
    </div>
  );
};

export default Body;
