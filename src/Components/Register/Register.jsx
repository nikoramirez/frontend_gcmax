import React, { useState } from 'react';
import './Register.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

//Importar los Assets de la carpeta LoginAssets:
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';

//Importar los Iconos desde React Icons:
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';

const Register = () => {
  //Uso el useState para guardar nuestras entradas:
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  //onClick para obtener lo que la usuario ha ingresado:
  const crearUsuario = (e) => {
    e.preventDefault();
    //Se requiere que Axios cree una API que se conecte al servidor:
    const apiUrl = import.meta.env.VITE_API_URL;

    Axios.post(`${apiUrl}/register`, {
      //Creo la variable para enviar al servidor a través de la ruta:
      Email: email,
      Name: name,
      Password: password,
    }).then(() => {
      //Cuando ya está registrado, se redirije al login de inmediato.
      navigateTo('/');
      //Aquí se limpia los campos ingresados:
      setEmail('');
      setName('');
      setPassword('');
    });
  };

  return (
    <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Comience su prueba con GCMax</h2>
            <p>
              GCMax es la solución completa de gestión de pruebas para todas las
              metodologías de prueba. <br />
              <br />
              <br />
              ¡Pon tus pruebas a toda marcha!
            </p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Obtenga un usuario...</span>
            <Link to={'/'}>
              <button className="btn">Registro</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Imagen del logo" />
            <h3>Bienvenido a GCMax</h3>
          </div>
          <form action="" className="form grid">
            <div className="inputDiv">
              <label htmlFor="email">Correo Electrónico</label>
              <div className="input flex">
                <MdMarkEmailRead className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Ingresa su Correo Electrónico"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Ingresa su Usuario"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Ingresa su Contraseña"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn flex" onClick={crearUsuario}>
              <span>Registro</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            <span className="forgotPassword">
              ¿Olvidó su Constraseña? <a href="">Haga click aquí!</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
