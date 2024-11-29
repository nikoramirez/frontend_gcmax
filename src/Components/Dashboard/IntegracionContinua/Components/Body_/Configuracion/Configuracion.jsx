import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './configuracion.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Configuracion = () => {
  const [config, setConfig] = useState({
    projectId: '',
    ciTool: 'Jenkins',
    serverUrl: '',
    apiToken: '',
    username: '',
    autoExecutionEnabled: false,
  });
  const [projects, setProjects] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
    fetchConfigs();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/proyectos`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const fetchConfigs = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/configuracion`);
      setConfigs(response.data);
    } catch (error) {
      console.error('Error al cargar configuraciones:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: name === 'autoExecutionEnabled' ? e.target.checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await Axios.put(`${apiUrl}/api/configuracion/${editId}`, config);
        setMessage('Configuración actualizada con éxito');
      } else {
        await Axios.post(`${apiUrl}/api/configuracion`, config);
        setMessage('Configuración creada con éxito');
      }
      setConfig({
        projectId: '',
        ciTool: '',
        serverUrl: '',
        apiToken: '',
        username: '',
        autoExecutionEnabled: false,
      });
      setEditId(null);
      fetchConfigs();
    } catch (error) {
      console.error('Error al guardar la configuración:', error);
      setMessage('Error al guardar la configuración');
    }
  };

  const handleEdit = (configData) => {
    setConfig({
      projectId: configData.project_id,
      ciTool: configData.ci_tool,
      serverUrl: configData.server_url,
      apiToken: configData.api_token,
      username: configData.username,
      autoExecutionEnabled: configData.auto_execution_enabled,
    });
    setEditId(configData.id);
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${apiUrl}/api/configuracion/${id}`);
      setMessage('Configuración eliminada con éxito');
      fetchConfigs();
    } catch (error) {
      console.error('Error al eliminar configuración:', error);
      setMessage('Error al eliminar configuración');
    }
  };

  return (
    <div className="config-container-integracion">
      <div className="form-container-integracion">
        <h3 className="form-title-integracion">
          {editId ? 'Editar Configuración' : 'Registrar Configuración'}
        </h3>
        {message && <p className="message-integracion">{message}</p>}
        <form onSubmit={handleSubmit} className="config-form-integracion">
          <div className="form-columns-integracion">
            <div className="form-left-integracion">
              <label className="form-label-integracion">Proyecto:</label>
              <select
                className="form-select-integracion"
                name="projectId"
                value={config.projectId}
                onChange={handleChange}
                required
                disabled={editId}
              >
                <option value="">Selecciona un proyecto</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>

              <label className="form-label-integracion">Herramienta CI:</label>
              <select
                className="form-select-integracion"
                name="ciTool"
                value={config.ciTool}
                onChange={handleChange}
                required
              >
                <option value="Jenkins">Jenkins</option>
                <option value="GitHubActions">GitHub Actions</option>
              </select>

              <label className="form-label-integracion">
                URL del Servidor:
              </label>
              <input
                className="form-input-integracion"
                type="text"
                name="serverUrl"
                value={config.serverUrl}
                onChange={handleChange}
                required
              />

              <label className="form-label-integracion">API Token:</label>
              <input
                className="form-input-integracion"
                type="text"
                name="apiToken"
                value={config.apiToken}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-right-integracion">
              <label className="form-label-integracion">
                Nombre de Usuario:
              </label>
              <input
                className="form-input-integracion"
                type="text"
                name="username"
                value={config.username}
                onChange={handleChange}
                required
              />

              <label className="form-label-integracion">
                Activar Ejecución Automática:
              </label>
              <input
                className="form-checkbox-integracion"
                type="checkbox"
                name="autoExecutionEnabled"
                checked={config.autoExecutionEnabled}
                onChange={handleChange}
              />
              <button className="form-button-integracion" type="submit">
                {editId
                  ? 'Actualizar Configuración'
                  : 'Registrar Configuración'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="config-table-container-integracion">
        <h3 className="table-title-integracion">Configuraciones Existentes</h3>
        <table className="config-table-integracion">
          <thead>
            <tr>
              <th className="table-header-integracion">Proyecto</th>
              <th className="table-header-integracion">Herramienta CI</th>
              <th className="table-header-integracion">URL del Servidor</th>
              <th className="table-header-integracion">Token API</th>
              <th className="table-header-integracion">Usuario</th>
              <th className="table-header-integracion">Ej. Automática</th>
              <th className="table-header-integracion">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {configs.map((configData) => (
              <tr key={configData.id}>
                <td>{configData.projectName}</td>
                <td>{configData.ci_tool}</td>
                <td>{configData.server_url}</td>
                <td>{configData.api_token}</td>
                <td>{configData.username}</td>
                <td>{configData.auto_execution_enabled ? 'Sí' : 'No'}</td>
                <td>
                  <button
                    className="action-button-integracion"
                    onClick={() => handleEdit(configData)}
                  >
                    <GrEdit />
                  </button>
                  <button
                    className="action-button-integracion"
                    onClick={() => handleDelete(configData.id)}
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

export default Configuracion;
