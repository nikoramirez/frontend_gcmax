import React from 'react';

/*Importar los iconos desde React*/
import { MdOutlineMovieCreation } from 'react-icons/md';
import { PiHighDefinitionDuotone } from 'react-icons/pi';
import { MdOutlineViewInAr } from 'react-icons/md';
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
            <a href="/dashboard/planificacion">
              <MdOutlineMovieCreation className="icon" />
              <h5>Creación de Plan de Pruebas</h5>
            </a>
          </div>
          <div className="losa">
            <a href="/dashboard/definicion">
              <PiHighDefinitionDuotone className="icon" />
              <h5>Definición de Escenarios y Casos de Prueba</h5>
            </a>
          </div>
          <div className="losa">
            <a href="/dashboard/visualizacion">
              <MdOutlineViewInAr className="icon" />
              <h5>Visualización del Calendario de Pruebas</h5>
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
