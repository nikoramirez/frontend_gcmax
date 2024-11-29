import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './proyectos.css';

const Proyectos = () => {
  // Estado para almacenar los datos de los proyectos
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener proyectos desde el backend
  useEffect(() => {
    const fetchProjects = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await Axios.get(`${apiUrl}/api/proyectos`);
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar proyectos');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="proyectos-wrapper">
      <h2 className="proyectos-titulo">Vista General de Proyectos</h2>
      <div className="proyectos-lista">
        {projects.map((project) => (
          <div key={project.id} className="proyecto-card">
            <h3 className="proyecto-nombre">{project.name}</h3>
            <p className="proyecto-descripcion">
              Descripción: <strong> {project.description}</strong>
            </p>
            <p className="proyecto-fechas">
              Inicio:{' '}
              <strong>
                {new Date(project.start_date).toLocaleDateString()}
              </strong>
            </p>
            <p className="proyecto-fechas">
              Fin:{' '}
              <strong>{new Date(project.end_date).toLocaleDateString()}</strong>
            </p>
            <p className="proyecto-estado">
              Estado: <strong> {project.status}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proyectos;
