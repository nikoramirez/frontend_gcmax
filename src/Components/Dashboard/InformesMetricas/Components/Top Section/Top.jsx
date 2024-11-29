import React from 'react';

/*Importar los iconos desde React*/
import { MdOutlineHighQuality } from 'react-icons/md';
import { GrDocumentTest } from 'react-icons/gr';
import { TbFileReport } from 'react-icons/tb';
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BsArrowRightShort, BsQuestionCircle } from 'react-icons/bs';
import { RiLogoutCircleLine } from 'react-icons/ri';

//Importar imágenes desde la carpeta Assets:
import foto from '../../../Assets/foto.png';
import grafica from '../../../Assets/grafica.png';
import video from '../../../Assets/video.mp4';

import { useNavigate } from 'react-router-dom';

const Top = () => {
  const navigate = useNavigate();

  // Función para manejar el logout
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated'); // Eliminar autenticación
    navigate('/'); // Redirigir al login
  };

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="searchBar">
          <div className="losa">
            <a href="/dashboard/informesmetricas">
              <MdOutlineHighQuality className="icon" />
              <h5>Informes de Calidad</h5>
            </a>
          </div>
          <div className="losa">
            <a href="/dashboard/pruebasmetricas">
              <GrDocumentTest className="icon" />
              <h5>Métricas de Pruebas</h5>
            </a>
          </div>
          <div className="losa">
            <a href="/dashboard/exportaciones">
              <TbFileReport className="icon" />
              <h5> Exportación de Informes</h5>
            </a>
          </div>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder="Búsqueda?" />
          <BiSearchAlt className="icon" />
        </div>

        <div className="adminDiv flex">
          <button onClick={handleLogout} className="logoutButton">
            <RiLogoutCircleLine className="icon" />
          </button>
          <TbMessageCircle className="icon" />
          <IoNotificationsOutline className="icon" />
          <div className="adminImage">
            <img src={foto} alt="Admin Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
