import React, { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Axios from 'axios';
import './metricas.scss'; // Cambiamos la extensión a SCSS

Chart.register(...registerables);

const Metricas = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [coverageData, setCoverageData] = useState({
    labels: [],
    datasets: [],
  });
  const [defectsData, setDefectsData] = useState({
    labels: [],
    datasets: [],
  });
  const [resolutionTimes, setResolutionTimes] = useState({
    labels: [],
    datasets: [],
  });

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

  const fetchMetrics = async (projectId) => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/metricas/pruebas/${projectId}`
      );
      const data = response.data;

      setCoverageData({
        labels: ['Cobertura Ejecutada', 'Cobertura Pendiente'],
        datasets: [
          {
            data: [data.covered || 0, data.uncovered || 0],
            backgroundColor: ['#4CAF50', '#FF9800'],
          },
        ],
      });

      setDefectsData({
        labels: ['Encontrados', 'Corregidos'],
        datasets: [
          {
            label: 'Defectos',
            data: [data.defectsFound || 0, data.defectsResolved || 0],
            backgroundColor: ['#FF5722', '#4CAF50'],
          },
        ],
      });

      setResolutionTimes({
        labels: data.resolutionMetrics?.labels || [],
        datasets: [
          {
            label: 'Tiempos Promedio (Días)',
            data: data.resolutionMetrics?.data || [],
            backgroundColor: '#3F51B5',
          },
        ],
      });
    } catch (error) {
      console.error('Error al obtener métricas:', error);
      setMessage('Error al obtener métricas');
    }
  };

  const handleFilterChange = (e) => {
    const projectId = e.target.value;
    setSelectedProjectId(projectId);
    if (projectId) fetchMetrics(projectId);
  };

  return (
    <div className="metricas">
      <h2>Métricas de Pruebas</h2>
      {message && <p className="error-message">{message}</p>}

      {/* Filtros */}
      <div className="metricas__filtros">
        <label>Proyecto:</label>
        <select
          value={selectedProjectId}
          onChange={handleFilterChange}
          className="metricas__filtro-select"
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Gráficos */}
      <div className="metricas__graficas">
        <div className="metricas__tarjeta">
          <h3>Cobertura de Pruebas</h3>
          {coverageData.labels.length > 0 ? (
            <Doughnut data={coverageData} />
          ) : (
            <p>No hay datos disponibles</p>
          )}
        </div>

        <div className="metricas__tarjeta">
          <h3>Tasa de Defectos</h3>
          <Bar data={defectsData} />
        </div>

        <div className="metricas__tarjeta">
          <h3>Tiempos Promedio de Resolución</h3>
          <Bar data={resolutionTimes} />
        </div>
      </div>
    </div>
  );
};

export default Metricas;
