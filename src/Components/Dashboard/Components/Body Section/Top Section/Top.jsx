import React, { useEffect, useState } from 'react';
import './top.css';

/*Importar los iconos desde React*/
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BsArrowRightShort, BsQuestionCircle } from 'react-icons/bs';
import { RiLogoutCircleLine } from 'react-icons/ri';

//Importar imágenes desde la carpeta Assets:
import foto from '../../../Assets/foto.png';
import grafica from '../../../Assets/grafica.png';
import video from '../../../Assets/video.mp4';

// Importar hook de navegación de React Router
import { useNavigate } from 'react-router-dom';

const Top = () => {
  const navigate = useNavigate();

  // Función para manejar el logout
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated'); // Eliminar autenticación
    sessionStorage.removeItem('userId'); // Eliminar userId

    navigate('/'); // Redirigir al login
  };

  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>Bienvenido a GCMax</h1>
          <p>Qué tal está... gracias por regresar!</p>
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

      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Crea y venda software de calidad</h1>
          <p>
            El mundo del desarrollo de software está en constante evolución,
            impulsado por los avances tecnológicos y la creciente demanda de
            aplicaciones de alta calidad.
          </p>
          <div className="buttons flex">
            <button className="btn">Explora mas...</button>
            <button className="btn transparent">Las mas vendidas!</button>
          </div>

          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div>
        </div>

        <div className="leftCard flex">
          <div className="main flex">
            <div className="textDiv">
              <h1>Estado</h1>
              <div className="flex">
                <span>
                  Hoy 2<br />
                  <small>procesos</small>
                </span>
                <span>
                  En Mes 20
                  <br />
                  <small>procesos</small>
                </span>
              </div>
              .
              <span className="flex link">
                Ir a los procesos <BsArrowRightShort className="icon" />
              </span>
            </div>

            <div className="imgDiv">
              <img src={grafica} alt="Nombre de imagen" />
            </div>
          </div>
          {/**Usaremos esta tarjeta mas adelante*/}
          <div className="sideBarCard">
            <BsQuestionCircle className="icon" />
            <div className="cardContent">
              <div className="circle1"></div>
              <div className="circle2"></div>
              <h3>Centro de ayuda!</h3>
              <p>Tenga los mejores software</p>
              <button className="btn">Ir a centro de ayudad.</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
