import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './seguimiento.css';

const Seguimiento = () => {
  const [defects, setDefects] = useState([]);
  const [filteredDefects, setFilteredDefects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener defectos desde el backend
  useEffect(() => {
    const fetchDefects = async () => {
      try {
        const response = await Axios.get(`${apiUrl}/api/defectos`);
        setDefects(response.data);
        setFilteredDefects(response.data); // Mostrar todos por defecto
      } catch (error) {
        console.error('Error al cargar defectos:', error);
      }
    };
    fetchDefects();
  }, []);

  // Filtrar defectos según el estado
  const handleFilter = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);
    if (selectedStatus) {
      setFilteredDefects(
        defects.filter((defect) => defect.status === selectedStatus)
      );
    } else {
      setFilteredDefects(defects);
    }
  };

  // Asignar clases para estilos según estado (`status`)
  const getStatusClass = (status) => {
    switch (status) {
      case 'Abierto':
        return 'status-open';
      case 'En curso':
        return 'status-in-progress';
      case 'Resuelto':
        return 'status-resolved';
      case 'Verificado':
        return 'status-verified';
      default:
        return '';
    }
  };

  // Modificar la lógica de la fecha de resolución para manejar "Abierto", "En curso", "Resuelto" y "Verificado"
  const getResolutionDate = (status, resolvedAt) => {
    if (status === 'Abierto' || status === 'En curso') {
      return ''; // No mostrar nada en "Abierto" o "En curso"
    }
    return resolvedAt ? formatFecha(resolvedAt) : 'Pendiente'; // Si está resuelto o verificado, mostrar la fecha formateada o "Pendiente"
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES'); // Formato dd/mm/aaaa
  };

  return (
    <div className="seguimiento-def">
      <div className="seguimiento-header">
        <h2>Seguimiento y Estado de Defectos</h2>
        <select value={statusFilter} onChange={handleFilter}>
          <option value="">Todos los Estados</option>
          <option value="Abierto">Abierto</option>
          <option value="En curso">En curso</option>
          <option value="Resuelto">Resuelto</option>
          <option value="Verificado">Verificado</option>
        </select>
      </div>

      <div className="seguimiento-table">
        <table>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Caso de Prueba</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Prioridad</th>
              <th>Tipo</th>
              <th>Asignado a</th>
              <th>Estado</th>
              <th>Fecha de Creación</th>
              <th>Fecha de Resolución</th>
            </tr>
          </thead>
          <tbody>
            {filteredDefects.map((defect) => (
              <tr key={defect.id}>
                <td>{defect.projectName}</td>
                <td>{defect.testCaseScenario}</td>
                <td>{defect.title}</td>
                <td>{defect.description}</td>
                <td>{defect.priority}</td>
                <td>{defect.type}</td>
                <td>{defect.userName}</td>
                <td className={getStatusClass(defect.status)}>
                  {defect.status}
                </td>
                <td>
                  {formatFecha(defect.created_at)
                    ? formatFecha(defect.created_at)
                    : ''}
                </td>
                <td className="resolution-status">
                  {getResolutionDate(defect.status, defect.resolved_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Seguimiento;
