import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './automaticas.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Automaticas = () => {
  const [execution, setExecution] = useState({
    projectId: '',
    executionDate: '',
    status: '',
    details: '',
  });
  const [projects, setProjects] = useState([]);
  const [histories, setHistories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener proyectos y historial al cargar
  useEffect(() => {
    fetchProjects();
    fetchHistories();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/proyectos`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const fetchHistories = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/historial-ejecucion`);
      setHistories(response.data);
    } catch (error) {
      console.error('Error al cargar historial:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...execution,
        executionDate: execution.executionDate || new Date().toISOString(),
      };

      if (editId) {
        const response = await Axios.put(
          `${apiUrl}/api/historial-ejecucion/${editId}`,
          data
        );
        setMessage(response.data.message);
      } else {
        const response = await Axios.post(
          `${apiUrl}/api/historial-ejecucion`,
          data
        );
        setMessage(response.data.message);
      }

      setExecution({
        projectId: '',
        executionDate: '',
        status: '',
        details: '',
      });
      setEditId(null);
      fetchHistories();
    } catch (error) {
      console.error('Error al guardar historial:', error);
      setMessage('Error al guardar historial');
    }
  };

  const handleEdit = (history) => {
    setExecution({
      projectId: history.project_id,
      executionDate: history.execution_date.split('T')[0],
      status: history.status,
      details: history.details,
    });
    setEditId(history.id);
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${apiUrl}/api/historial-ejecucion/${id}`);
      setMessage('Historial eliminado con éxito');
      fetchHistories();
    } catch (error) {
      console.error('Error al eliminar historial:', error);
      setMessage('Error al eliminar historial');
    }
  };

  const handleChange = (e) => {
    setExecution({
      ...execution,
      [e.target.name]: e.target.value,
    });
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES'); // Formato dd/mm/aaaa
  };

  return (
    <div className="automaticas">
      <div className="automaticas-form">
        <h3>{editId ? 'Editar Ejecución' : 'Registrar Ejecución'}</h3>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Proyecto:</label>
          <select
            name="projectId"
            value={execution.projectId}
            onChange={handleChange}
            disabled={!!editId}
            required
          >
            <option value="">Selecciona un proyecto</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <label>Fecha de Ejecución:</label>
          <input
            type="date"
            name="executionDate"
            value={execution.executionDate}
            onChange={handleChange}
            required
          />

          <label>Estado:</label>
          <select
            name="status"
            value={execution.status}
            onChange={handleChange}
            required
          >
            <option value="Éxito">Éxito</option>
            <option value="Fallo">Fallo</option>
          </select>

          <label>Detalles:</label>
          <textarea
            name="details"
            value={execution.details}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editId ? 'Actualizar Ejecución' : 'Registrar Ejecución'}
          </button>
        </form>
      </div>

      <div className="automaticas-history">
        <h3>Historial de Ejecuciones</h3>
        <table>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Fecha de Ejecución</th>
              <th>Estado</th>
              <th>Detalles</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((history) => (
              <tr key={history.id}>
                <td>{history.project_name}</td>
                <td>{formatFecha(history.execution_date)}</td>
                {/*<td>{history.execution_date.split('T')[0]}</td>*/}
                <td>{history.status}</td>
                <td>{history.details}</td>
                <td>
                  <button
                    className="btn-edit-automatica"
                    onClick={() => handleEdit(history)}
                  >
                    <GrEdit />
                  </button>
                  <button
                    className="btn-erase-automatica"
                    onClick={() => handleDelete(history.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Automaticas;
