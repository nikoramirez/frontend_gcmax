import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './exportacion.css';

import { FaRegFilePdf } from 'react-icons/fa';
import { RiFileExcel2Line } from 'react-icons/ri';

const Exportacion = () => {
  const [informes, setInformes] = useState([]);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await Axios.get(`${apiUrl}/api/informes-calidad`);
        setInformes(response.data);
      } catch (error) {
        console.error('Error al obtener informes de calidad:', error);
      }
    };

    fetchInformes();
  }, []);

  const handleExport = async (format) => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/informes-calidad/exportar/${format}`,
        {
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `informe-calidad.${format}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error al exportar informe:', error);
      setMessage('Error al exportar informe');
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES'); // Formato dd/mm/aaaa
  };

  return (
    <div className="export-section">
      <h2>Informes de Calidad</h2>
      {message && <p className="message">{message}</p>}
      <table className="export-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Tasa de Éxito</th>
            <th>Defectos Encontrados</th>
            <th>Defectos Resueltos</th>
            <th>Tiempo Promedio de Resolución</th>
            <th>Cobertura de Pruebas</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {informes.map((informe) => (
            <tr key={informe.id}>
              <td>{informe.project_name}</td>
              <td>{informe.success_rate}</td>
              <td>{informe.defects_found}</td>
              <td>{informe.defects_resolved}</td>
              <td>{informe.avg_resolution_time}</td>
              <td>{informe.test_coverage}</td>
              <td>{formatFecha(informe.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-group">
        <button onClick={() => handleExport('pdf')}>
          Exportar <FaRegFilePdf />
        </button>
        <button onClick={() => handleExport('excel')}>
          Exportar <RiFileExcel2Line />
        </button>
      </div>
    </div>
  );
};

export default Exportacion;
