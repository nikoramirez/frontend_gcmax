import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './ejecucion.css';

import { FaFilter } from 'react-icons/fa';
import { LiaFileSolid } from 'react-icons/lia';
import { LiaHandPointRight } from 'react-icons/lia';

const Ejecucion = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [combinedData, setCombinedData] = useState([]);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await Axios.get(`${apiUrl}/api/proyectos`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
      }
    };
    fetchProjects();
  }, []);

  const fetchCombinedData = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/ejecuciones-combinadas`, {
        params: { projectId: selectedProject },
      });
      setCombinedData(response.data);
    } catch (error) {
      console.error('Error al obtener datos combinados:', error);
      setMessage('Error al obtener datos combinados');
    }
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    setCombinedData([]);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="ejecuciones-pruebas">
      <h2 className="ejecuciones-pruebas__titulo">
        Datos Combinados de Ejecuciones y Resultados
      </h2>
      {message && <p className="ejecuciones-pruebas__mensaje">{message}</p>}

      <div className="ejecuciones-pruebas__filtro">
        <label>Filtrar por Proyecto:</label>
        <select
          value={selectedProject}
          onChange={handleProjectChange}
          className="ejecuciones-pruebas__select"
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <button
          onClick={fetchCombinedData}
          className="ejecuciones-pruebas__boton"
        >
          Filtrar <FaFilter />
        </button>
      </div>

      <div className="ejecuciones-pruebas__tabla">
        {Array.isArray(combinedData) && combinedData.length > 0 ? (
          <table className="ejecuciones-pruebas__datos">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Fecha Ejecución</th>
                <th>Estado Ejecución</th>
                <th>Detalles Ejecución</th>
                <th>Escenario</th>
                <th>Resultado</th>
                <th>Notas</th>
                <th>Archivo</th>
                <th>Fecha Resultado</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.map((data, index) => (
                <tr key={index} className="ejecuciones-pruebas__fila">
                  <td>{data.proyecto}</td>
                  <td>{formatDate(data.execution_date)}</td>
                  <td>{data.estado}</td>
                  <td>{data.details}</td>
                  <td>{data.scenario}</td>
                  <td>{data.result}</td>
                  <td>{data.notes}</td>
                  <td>
                    {data.attachment ? (
                      <a
                        href={`${apiUrl}/uploads/${data.attachment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LiaHandPointRight className="icon-file" />
                        <LiaFileSolid className="icon-file" />
                      </a>
                    ) : (
                      'No disponible'
                    )}
                  </td>
                  <td>{formatDate(data.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default Ejecucion;

{
  /*
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './ejecucion.css';

const Ejecucion = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [combinedData, setCombinedData] = useState([]);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await Axios.get(`${apiUrl}/api/proyectos`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
      }
    };
    fetchProjects();
  }, []);

  // Obtener datos combinados
  const fetchCombinedData = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/ejecuciones-combinadas`, {
        params: { projectId: selectedProject },
      });
      setCombinedData(response.data);
    } catch (error) {
      console.error('Error al obtener datos combinados:', error);
      setMessage('Error al obtener datos combinados');
    }
  };

  // Manejar cambio en el combo de proyectos
  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    setCombinedData([]); // Limpiar datos combinados al cambiar proyecto
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div>
      <h2>Datos Combinados de Ejecuciones y Resultados</h2>
      {message && <p>{message}</p>}
      <div>
        <label>Filtrar por Proyecto:</label>
        <select value={selectedProject} onChange={handleProjectChange}>
          <option value="">Selecciona un proyecto</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <button onClick={fetchCombinedData}>Filtrar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Fecha Ejecución</th>
            <th>Estado Ejecución</th>
            <th>Detalles Ejecución</th>
            <th>Escenario</th>
            <th>Resultado</th>
            <th>Notas</th>
            <th>Archivo</th>
            <th>Fecha Resultado</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(combinedData) &&
            combinedData.map((data, index) => (
              <tr key={index}>
                <td>{data.proyecto}</td>
                <td>{formatDate(data.execution_date)}</td>
                <td>{data.estado}</td>
                <td>{data.details}</td>
                <td>{data.scenario}</td>
                <td>{data.result}</td>
                <td>{data.notes}</td>
                <td>
                  {data.attachment && (
                    <a
                      href={`${apiUrl}/uploads/${data.attachment}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver archivo
                    </a>
                  )}
                </td>
                <td>{formatDate(data.created_at)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ejecucion;
*/
}
