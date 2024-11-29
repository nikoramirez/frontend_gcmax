import React from 'react';

import Top from '../../../Top Section/Top';
import Definicion from '../Definir/Def/Definicion';

const Body = () => {
  return (
    <div className="mainContent">
      <Top />
      <div className="bottom flex">
        <Definicion />
      </div>
    </div>
  );
};

export default Body;
