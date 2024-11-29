import React, { useState, useEffect } from 'react';
import './Login.css';
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

const Login = () => {
  //Uso el useState para guardar nuestras entradas:
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigateTo = useNavigate();

  //Aquí se muestra o este es del mensaje al usuario, credenciales correcto o incorrecto.
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');

  // Comprobar si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigateTo('/dashboard'); // Si está autenticado, redirige al dashboard
    }
  }, [navigateTo]);

  //onClick para obtener lo que la usuario ha ingresado:
  const loginUsuario = (e) => {
    //Se evita el envío:
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL;

    //Se requiere que Axios cree una API que se conecte al servidor:
    Axios.post(`${apiUrl}/login`, {
      //Creo la variable para enviar al servidor a través de la ruta:
      LoginName: loginName,
      LoginPassword: loginPassword,
    }).then((response) => {
      //console.log();
      //Hay datos exitosos de la base de datos y con esto se detecta un error si las credenciales son incorrectas.
      if (response.data.message || loginName === '' || loginPassword === '') {
        //Si las credenciales no coinciden
        //navigateTo('/'); //Entonces navegará a la misma página de inicio de sesión.
        setLoginStatus('Las credenciales no existen en la BD');
      } else {
        // Si las credenciales son correctas, guardamos el estado de autenticación
        sessionStorage.setItem('isAuthenticated', 'true'); // Indicamos que el usuario está autenticado
        navigateTo('/dashboard'); // Redirige al dashboard
      }
    });
  };

  useEffect(() => {
    if (loginStatus !== '') {
      setStatusHolder('showMessage'); // Muestra el mensaje en rojo.
      setTimeout(() => {
        setStatusHolder('message'); //Oculta el mensaje despues de 3 segundos.
      }, 3000);
    }
  }, [loginStatus]);

  //Se limpia lo que se envía en el formulario:
  const onSubmit = () => {
    setLoginName('');
    setLoginPassword('');
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">
              Impulsando flujos de trabajo ágiles y DevOps con GCMax.
            </h2>
            <p>
              Únase a nosotros para aprender cómo el motor de reglas avanzado de
              GCMax automatiza la comunicación de herramientas dentro de todo su
              proceso de DevOps y ayuda a mejorar la orquestación y la
              automatización con facilidad.
            </p>
          </div>
          <div className="footerDiv flex">
            <span className="text">¿No tienes usuario?</span>
            <Link to={'/register'}>
              <button className="btn">Registro</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Imagen del logo" />
            <h3>Prueba de GCMax</h3>
          </div>
          <form action="" className="form grid" onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username">Usuario</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Ingresa su Usuario"
                  onChange={(event) => {
                    setLoginName(event.target.value);
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
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn flex" onClick={loginUsuario}>
              <span>Entrar</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            {/*<a href="/dashboard">Tablero</a>*/}

            <span className="forgotPassword">
              ¿Olvidó su Constraseña? <a href="">Haga click aquí!</a>
              <br />
              <br />
              <h6>Derechos de autor © 2024, GCMax</h6>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
