import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './detalles.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Detalles = ({ projectId }) => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    status: '',
  });
  const [projects, setProjects] = useState([]); // Estado para almacenar lista de proyectos
  const [selectedProjectId, setSelectedProjectId] = useState(null); // ID del proyecto seleccionado para editar
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener todos los proyectos
  const fetchProjects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/proyectos`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  // Cargar proyectos al montar el componente
  useEffect(() => {
    fetchProjects();
  }, []);

  // Enviar el formulario para crear o actualizar el proyecto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = selectedProjectId
        ? await Axios.put(
            `${apiUrl}/api/proyectos/${selectedProjectId}`,
            project
          )
        : await Axios.post(`${apiUrl}/api/proyectos`, project);
      setMessage(response.data.message);
      setProject({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        status: '',
      });
      setSelectedProjectId(null); // Resetear ID del proyecto seleccionado
      fetchProjects(); // Actualizar la lista de proyectos
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      setMessage('Error al guardar el proyecto');
    }
  };

  // Actualizar el campo en el formulario
  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  // Formatear fecha al cargar en el formulario
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES'); // Formato dd/mm/yyyy
  };

  // Cargar datos del proyecto en el formulario para editar
  const handleEdit = (proj) => {
    const formatDateForInput = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegurar dos dígitos
      const day = String(date.getDate()).padStart(2, '0'); // Asegurar dos dígitos
      return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
    };

    setProject({
      ...proj,
      start_date: formatDateForInput(proj.start_date),
      end_date: formatDateForInput(proj.end_date),
    });
    setSelectedProjectId(proj.id); // Establecer el ID del proyecto seleccionado
  };

  // Eliminar un proyecto
  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${apiUrl}/api/proyectos/${id}`);
      setMessage('Proyecto eliminado con éxito');
      fetchProjects();
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      setMessage('Error al eliminar proyecto');
    }
  };

  return (
    <div className="detalles-layout">
      <div className="detalles-form">
        <h2 className="detalles-header">
          {selectedProjectId ? 'Modificar Proyecto' : 'Crear Proyecto'}
        </h2>
        {message && <p className="detalles-message">{message}</p>}
        <form onSubmit={handleSubmit} className="detalles-form-content">
          <div className="detalles-form-field">
            <label className="detalles-label">Nombre:</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
              className="detalles-input"
            />
          </div>
          <div className="detalles-form-field">
            <label className="detalles-label">Descripción:</label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              required
              className="detalles-textarea"
            />
          </div>
          <div className="detalles-form-field">
            <label className="detalles-label">Fecha Inicio:</label>
            <input
              type="date"
              name="start_date"
              value={project.start_date}
              onChange={handleChange}
              required
              className="detalles-input"
            />
          </div>
          <div className="detalles-form-field">
            <label className="detalles-label">Fecha Fin:</label>
            <input
              type="date"
              name="end_date"
              value={project.end_date}
              onChange={handleChange}
              required
              className="detalles-input"
            />
          </div>
          <div className="detalles-form-field">
            <label className="detalles-label">Estado:</label>
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              required
              className="detalles-select"
            >
              <option value="Activo">Activo</option>
              <option value="Completado">Completado</option>
              <option value="En espera">En espera</option>
            </select>
          </div>
          <button className="detalles-button">
            {selectedProjectId ? 'Actualizar' : 'Crear'} Proyecto
          </button>
        </form>
      </div>

      <div className="detalles-table-section">
        <h3 className="detalles-subheader">Lista de Proyectos</h3>
        <table className="detalles-table">
          <thead className="detalles-table-head">
            <tr>
              <th className="detalles-table-header">Nombre</th>
              <th className="detalles-table-header">Descripción</th>
              <th className="detalles-table-header">Fecha Inicio</th>
              <th className="detalles-table-header">Fecha Fin</th>
              <th className="detalles-table-header">Estado</th>
              <th className="detalles-table-header">Acciones</th>
            </tr>
          </thead>
          <tbody className="detalles-table-body">
            {projects.map((proj) => (
              <tr key={proj.id} className="detalles-table-row">
                <td className="detalles-table-cell">{proj.name}</td>
                <td className="detalles-table-cell">{proj.description}</td>
                <td className="detalles-table-cell">
                  {formatDate(proj.start_date)}
                </td>
                <td className="detalles-table-cell">
                  {formatDate(proj.end_date)}
                </td>
                <td className="detalles-table-cell">{proj.status}</td>
                <td className="detalles-table-cell">
                  <button
                    className="detalles-edit-button"
                    onClick={() => handleEdit(proj)}
                  >
                    <GrEdit />
                  </button>
                  <button
                    className="detalles-delete-button"
                    onClick={() => handleDelete(proj.id)}
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

export default Detalles;
