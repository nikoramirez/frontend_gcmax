import React from 'react';
import Top from '../../../Top Section/Top';
import Estado from '../Estado/Est/Estado';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Estado />
      </div>
    </div>
  );
};

export default Body;
