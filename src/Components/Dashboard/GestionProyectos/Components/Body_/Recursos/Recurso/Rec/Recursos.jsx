import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './recursos.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Recursos = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]); // Lista de recursos asignados
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [role, setRole] = useState('Desarrollador');
  const [message, setMessage] = useState('');
  const [resourceId, setResourceId] = useState(null); // Estado para identificar si es edición
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener lista de usuarios y proyectos al cargar el componente
  useEffect(() => {
    fetchUsersAndProjects();
    fetchResources(); // Cargar recursos asignados
  }, []);

  // Obtener datos de usuarios y proyectos
  const fetchUsersAndProjects = async () => {
    try {
      const usersResponse = await Axios.get(`${apiUrl}/api/usuario`);
      setUsers(usersResponse.data);
      const projectsResponse = await Axios.get(`${apiUrl}/api/proyectos`);
      setProjects(projectsResponse.data);
    } catch (error) {
      console.error('Error al cargar usuarios o proyectos:', error);
    }
  };

  // Función para obtener todas las asignaciones de recursos
  const fetchResources = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/recursos`);
      setResources(response.data);
    } catch (error) {
      console.error('Error al cargar recursos:', error);
    }
  };

  // Manejar envío del formulario para crear o actualizar recurso
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (resourceId) {
        // Si hay resourceId, actualizar recurso existente
        const response = await Axios.put(
          `${apiUrl}/api/recursos/${resourceId}`,
          {
            projectId: selectedProject,
            userId: selectedUser,
            role,
          }
        );
        setMessage(response.data.message);
      } else {
        // Si no hay resourceId, crear un nuevo recurso
        const response = await Axios.post(
          `${apiUrl}/api/proyectos/${selectedProject}/recursos`,
          { userId: selectedUser, role }
        );
        setMessage(response.data.message);
      }
      setResourceId(null); // Limpiar el estado de resourceId después de guardar
      setSelectedProject('');
      setSelectedUser('');
      setRole('Desarrollador');
      fetchResources(); // Recargar lista de recursos
    } catch (error) {
      console.error('Error al asignar o actualizar recurso:', error);
      setMessage('Error al asignar o actualizar recurso');
    }
  };

  // Cargar datos del recurso en el formulario para editar
  const handleEdit = (resource) => {
    setSelectedProject(resource.projectId); // projectId ahora debería estar en los resultados de la consulta
    setSelectedUser(resource.userId); // userId también estará en los resultados de la consulta
    setRole(resource.role);
    setResourceId(resource.id); // Almacenar el ID para actualizar el recurso
  };

  // Eliminar un recurso
  const handleDelete = async (resourceId) => {
    try {
      await Axios.delete(`${apiUrl}/api/recursos/${resourceId}`);
      setMessage('Recurso eliminado con éxito');
      fetchResources(); // Recargar la lista de recursos después de eliminar
    } catch (error) {
      console.error('Error al eliminar recurso:', error);
      setMessage('Error al eliminar recurso');
    }
  };

  return (
    <div className="recursos-page">
      <h2 className="recursos-title">Asignación de Recursos</h2>

      {message && <p className="recursos-message">{message}</p>}

      <form onSubmit={handleSubmit} className="recursos-form">
        <div className="recursos-field">
          <label htmlFor="project">Proyecto:</label>
          <select
            id="project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            required
            className="recursos-select"
            disabled={resourceId !== null} // Deshabilitar el combo si estamos editando
          >
            <option value="">Seleccione un proyecto...</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="recursos-field">
          <label htmlFor="user">Usuario:</label>
          <select
            id="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
            className="recursos-select"
          >
            <option value="">Asignar un responsable...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="recursos-field">
          <label htmlFor="role">Rol:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="recursos-select"
          >
            <option value="Desarrollador">Desarrollador</option>
            <option value="Tester">Tester</option>
            <option value="Manager">Manager</option>
            <option value="Analista">Analista</option>
            <option value="Diseñador">Diseñador</option>
          </select>
        </div>

        <button
          type="submit"
          className="recursos-submit"
          disabled={!selectedProject || !selectedUser || !role}
        >
          {resourceId ? 'Actualizar Recurso' : 'Asignar Recurso'}
        </button>
      </form>

      {resources.length > 0 && (
        <div className="recursos-table-container">
          <h3 className="recursos-table-title">Recursos Asignados</h3>
          <table className="recursos-table">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td>{resource.projectName}</td>
                  <td>{resource.userName}</td>
                  <td>{resource.role}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(resource)}
                      className="recursos-edit-btn"
                    >
                      <GrEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(resource.id)}
                      className="recursos-delete-btn"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Recursos;
