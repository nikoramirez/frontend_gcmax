import React from 'react';
import './sidebar.css';

//Importar las imágenes:
import logo from '../../Assets/logo.png';

//Importar los íconos del React:
import { GoProjectTemplate } from 'react-icons/go';
import { GiTestTubes } from 'react-icons/gi';
import { SiSpeedtest } from 'react-icons/si';
import { MdManageHistory } from 'react-icons/md';
import { TbFileReport } from 'react-icons/tb';
import { GrIntegration } from 'react-icons/gr';
import { BsQuestionCircle } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={logo} alt="Image Name" />
        <a href="/dashboard">
          <h2>GCMax</h2>{' '}
        </a>
      </div>

      <div className="menuDiv">
        {/*<h3 className="divTitle">Menú Rápido</h3>*/}
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="/dashboard/gestionproyectos" className="menuLink flex">
              .{/*<a href="/dashboard">Tablero</a>*/}
              <GoProjectTemplate className="icon" />
              <span className="smallText">Gestión de Proyectos</span>
            </a>
          </li>
          <li className="listItem">
            <a href="/dashboard/planificacion" className="menuLink flex">
              <GiTestTubes className="icon" />
              <span className="smallText">Planificación de Pruebas</span>
            </a>
          </li>
          <li className="listItem">
            <a href="/dashboard/ejecucion" className="menuLink flex">
              <SiSpeedtest className="icon" />
              <span className="smallText">Ejecución de Pruebas</span>
            </a>
          </li>
          <li className="listItem">
            <a href="/dashboard/registrodefectos" className="menuLink flex">
              <MdManageHistory className="icon" />
              <span className="smallText">Gestión de Defectos</span>
            </a>
          </li>

          <li className="listItem">
            <a href="/dashboard/informesmetricas" className="menuLink flex">
              <TbFileReport className="icon" />
              <span className="smallText">Informes y Métricas</span>
            </a>
          </li>
          <li className="listItem">
            <a href="/dashboard/integraciones" className="menuLink flex">
              <GrIntegration className="icon" />
              <span className="smallText">Integración Contínua</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sideBarCard">
        <BsQuestionCircle className="icon" />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>Centro de ayuda!</h3>
          <p>Para mayor información de gestión.</p>
          <button className="btn">Ir a...</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
