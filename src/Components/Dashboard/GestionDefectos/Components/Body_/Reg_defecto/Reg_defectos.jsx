import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './reg_defectos.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Reg_defectos = () => {
  const [defect, setDefect] = useState({
    projectId: '',
    testCaseId: '',
    title: '',
    description: '',
    priority: '',
    type: '',
    assignedTo: '',
    status: '',
    createdAt: '',
    resolvedAt: '',
  });
  const [projects, setProjects] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [users, setUsers] = useState([]);
  const [defects, setDefects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
    fetchUsers();
    fetchDefects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/proyectos`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/usuarios`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const fetchTestCases = async (projectId) => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/proyectos/${projectId}/casos_prueba`
      );
      setTestCases(response.data);
    } catch (error) {
      console.error('Error al cargar casos de prueba:', error);
    }
  };

  const fetchDefects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/defectos`);
      setDefects(response.data);
    } catch (error) {
      console.error('Error al cargar defectos:', error);
    }
  };

  const handleChange = (e) => {
    setDefect({
      ...defect,
      [e.target.name]: e.target.value,
    });
  };

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setDefect({ ...defect, projectId });
    fetchTestCases(projectId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...defect,
        createdAt: defect.createdAt || new Date().toISOString(),
        resolvedAt: defect.status === 'Resuelto' ? defect.resolvedAt : null,
      };

      if (editId) {
        const response = await Axios.put(
          `${apiUrl}/api/defectos/${editId}`,
          data
        );
        setMessage(response.data.message);
      } else {
        const response = await Axios.post(`${apiUrl}/api/defectos`, data);
        setMessage(response.data.message);
      }

      setDefect({
        projectId: '',
        testCaseId: '',
        title: '',
        description: '',
        priority: '',
        type: '',
        assignedTo: '',
        status: '',
        createdAt: '',
        resolvedAt: '',
      });
      setEditId(null);
      fetchDefects();
    } catch (error) {
      console.error('Error al guardar defecto:', error);
      setMessage('Error al guardar defecto');
    }
  };

  const handleEdit = async (defect) => {
    try {
      const response = await Axios.get(`${apiUrl}/api/defectos/${defect.id}`);
      const defectData = response.data;

      setDefect({
        projectId: defectData.project_id,
        testCaseId: defectData.test_case_id,
        title: defectData.title,
        description: defectData.description,
        priority: defectData.priority,
        type: defectData.type,
        assignedTo: defectData.assigned_to,
        status: defectData.status,
        createdAt: defectData.created_at,
        resolvedAt: defectData.resolved_at,
      });
      setEditId(defect.id);
      fetchTestCases(defectData.project_id);
    } catch (error) {
      console.error('Error al obtener el defecto para editar:', error);
      setMessage('Error al obtener el defecto para editar');
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${apiUrl}/api/defectos/${id}`);
      setMessage('Defecto eliminado con éxito');
      fetchDefects();
    } catch (error) {
      console.error('Error al eliminar defecto:', error);
      setMessage('Error al eliminar defecto');
    }
  };

  return (
    <div className="reg-defectos-main">
      <div className="reg-defectos-form">
        <h3>{editId ? 'Editar Defecto' : 'Registrar Defecto'}</h3>
        {message && <p className="reg-defectos-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Proyecto:</label>
            <select
              className="reg-defectos-select"
              name="projectId"
              value={defect.projectId}
              onChange={handleProjectChange}
              disabled={!!editId}
              required
            >
              <option value="">Seleccione proyecto...</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Escenario:</label>
            <select
              className="reg-defectos-select"
              name="testCaseId"
              value={defect.testCaseId}
              onChange={handleChange}
              disabled={!!editId}
              required
            >
              <option value="">Seleccione caso de prueba...</option>
              {testCases.map((testCase) => (
                <option key={testCase.id} value={testCase.id}>
                  {testCase.scenario}
                </option>
              ))}
            </select>
          </div>

          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Título:</label>
            <input
              className="reg-defectos-input"
              type="text"
              name="title"
              value={defect.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Descripción:</label>
            <textarea
              className="reg-defectos-textarea"
              name="description"
              value={defect.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Prioridad:</label>
            <select
              className="reg-defectos-select"
              name="priority"
              value={defect.priority}
              onChange={handleChange}
              required
            >
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>

          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Tipo:</label>
            <select
              className="reg-defectos-select"
              name="type"
              value={defect.type}
              onChange={handleChange}
              required
            >
              <option value="Interfaz de usuario">Interfaz de usuario</option>
              <option value="Funcional">Funcional</option>
              <option value="Rendimiento">Rendimiento</option>
              <option value="Seguridad">Seguridad</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Asignar a:</label>
            <select
              className="reg-defectos-select"
              name="assignedTo"
              value={defect.assignedTo}
              onChange={handleChange}
              disabled={!!editId}
              required
            >
              <option value="">Seleccione un desarrollador...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {/********************************************************/}
          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Estado:</label>
            <select
              className="reg-defectos-select"
              name="status"
              value={defect.status}
              onChange={(e) => {
                handleChange(e);
                if (
                  e.target.value === 'Resuelto' ||
                  e.target.value === 'Verificado'
                ) {
                  setDefect((prevDefect) => ({
                    ...prevDefect,
                    resolvedAt: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
                  }));
                } else {
                  setDefect((prevDefect) => ({
                    ...prevDefect,
                    resolvedAt: '', // Resetea la fecha cuando no es Resuelto o Verificado
                  }));
                }
              }}
              required
            >
              <option value="Abierto">Abierto</option>
              <option value="En curso">En curso</option>
              <option value="Resuelto">Resuelto</option>
              <option value="Verificado">Verificado</option>
            </select>
          </div>
          {/*}
          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Estado:</label>
            <select
              className="reg-defectos-select"
              name="status"
              value={defect.status}
              onChange={handleChange}
              required
            >
              <option value="Abierto">Abierto</option>
              <option value="En curso">En curso</option>
              <option value="Resuelto">Resuelto</option>
              <option value="Verificado">Verificado</option>
            </select>
          </div>
*/}
          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Fecha Creación:</label>
            <input
              className="reg-defectos-input"
              type="date"
              name="createdAt"
              value={defect.createdAt ? defect.createdAt.split('T')[0] : ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="reg-defectos-field">
            <label className="reg-defectos-label">Fecha Resolución:</label>
            <input
              className="reg-defectos-input"
              type="date"
              name="resolvedAt"
              value={defect.resolvedAt ? defect.resolvedAt.split('T')[0] : ''}
              onChange={handleChange}
              disabled={
                defect.status === 'Abierto' || defect.status === 'En curso'
              } //
              //disabled={defect.status !== 'Resuelto'}
            />
          </div>

          <div className="reg-defectos-submit">
            <button className="reg-defectos-button" type="submit">
              {editId ? 'Actualizar Defecto' : 'Registrar Defecto'}
            </button>
          </div>
        </form>
      </div>

      <div className="reg-defectos-table">
        <h3>Lista de Defectos</h3>
        <table className="reg-defectos-table-body">
          <thead>
            <tr>
              <th className="reg-defectos-table-header">Proyecto</th>
              <th className="reg-defectos-table-header">
                Escenario Caso de Prueba
              </th>
              <th className="reg-defectos-table-header">Título</th>
              <th className="reg-defectos-table-header">Prioridad</th>
              <th className="reg-defectos-table-header">Tipo</th>
              <th className="reg-defectos-table-header">Asignado a</th>
              <th className="reg-defectos-table-header">Estado</th>
              <th className="reg-defectos-table-header">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {defects.map((defect) => (
              <tr key={defect.id} className="reg-defectos-table-row">
                <td className="reg-defectos-table-cell">
                  {defect.projectName}
                </td>
                <td className="reg-defectos-table-cell">
                  {defect.testCaseScenario}
                </td>
                <td className="reg-defectos-table-cell">{defect.title}</td>
                <td className="reg-defectos-table-cell">{defect.priority}</td>
                <td className="reg-defectos-table-cell">{defect.type}</td>
                <td className="reg-defectos-table-cell">{defect.userName}</td>
                <td className="reg-defectos-table-cell">{defect.status}</td>
                <td className="reg-defectos-table-actions">
                  <button
                    className="reg-defectos-table-button"
                    onClick={() => handleEdit(defect)}
                  >
                    <GrEdit />
                  </button>
                  <button
                    className="reg-defectos-table-button-e"
                    onClick={() => handleDelete(defect.id)}
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

export default Reg_defectos;

{
  /*
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './reg_defectos.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Reg_defectos = () => {
  const [defect, setDefect] = useState({
    projectId: '',
    testCaseId: '',
    title: '',
    description: '',
    priority: '',
    type: '',
    assignedTo: '',
    status: '',
    createdAt: '',
    resolvedAt: '',
  });
  const [projects, setProjects] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [users, setUsers] = useState([]);
  const [defects, setDefects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
    fetchUsers();
    fetchDefects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/proyectos`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/usuarios`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const fetchTestCases = async (projectId) => {
    try {
      const response = await Axios.get(
        `${apiUrl}/api/proyectos/${projectId}/casos_prueba`
      );
      setTestCases(response.data);
    } catch (error) {
      console.error('Error al cargar casos de prueba:', error);
    }
  };

  const fetchDefects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/defectos`);
      setDefects(response.data);
    } catch (error) {
      console.error('Error al cargar defectos:', error);
    }
  };

  const handleChange = (e) => {
    setDefect({
      ...defect,
      [e.target.name]: e.target.value,
    });
  };

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setDefect({ ...defect, projectId });
    fetchTestCases(projectId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...defect,
        createdAt: defect.createdAt || new Date().toISOString(),
        resolvedAt: defect.status === 'Resuelto' ? defect.resolvedAt : null,
      };

      if (editId) {
        const response = await Axios.put(
          `${apiUrl}/api/defectos/${editId}`,
          data
        );
        setMessage(response.data.message);
      } else {
        const response = await Axios.post(`${apiUrl}/api/defectos`, data);
        setMessage(response.data.message);
      }

      setDefect({
        projectId: '',
        testCaseId: '',
        title: '',
        description: '',
        priority: '',
        type: '',
        assignedTo: '',
        status: '',
        createdAt: '',
        resolvedAt: '',
      });
      setEditId(null);
      fetchDefects();
    } catch (error) {
      console.error('Error al guardar defecto:', error);
      setMessage('Error al guardar defecto');
    }
  };

  const handleEdit = async (defect) => {
    try {
      const response = await Axios.get(`${apiUrl}/api/defectos/${defect.id}`);
      const defectData = response.data;

      setDefect({
        projectId: defectData.project_id,
        testCaseId: defectData.test_case_id,
        title: defectData.title,
        description: defectData.description,
        priority: defectData.priority,
        type: defectData.type,
        assignedTo: defectData.assigned_to,
        status: defectData.status,
        createdAt: defectData.created_at,
        resolvedAt: defectData.resolved_at,
      });
      setEditId(defect.id);
      fetchTestCases(defectData.project_id);
    } catch (error) {
      console.error('Error al obtener el defecto para editar:', error);
      setMessage('Error al obtener el defecto para editar');
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${apiUrl}/api/defectos/${id}`);
      setMessage('Defecto eliminado con éxito');
      fetchDefects();
    } catch (error) {
      console.error('Error al eliminar defecto:', error);
      setMessage('Error al eliminar defecto');
    }
  };

  return (
    <div>
      <div>
        <h3>{editId ? 'Editar Defecto' : 'Registrar Defecto'}</h3>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Proyecto:</label>
          <select
            name="projectId"
            value={defect.projectId}
            onChange={handleProjectChange}
            disabled={!!editId} // Deshabilitado en modo edición
            required
          >
            <option value="">proyecto...</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <label>Escenario:</label>
          <select
            name="testCaseId"
            value={defect.testCaseId}
            onChange={handleChange}
            disabled={!!editId} // Deshabilitado en modo edición
            required
          >
            <option value="">escenario cp...</option>
            {testCases.map((testCase) => (
              <option key={testCase.id} value={testCase.id}>
                {testCase.scenario}
              </option>
            ))}
          </select>

          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={defect.title}
            onChange={handleChange}
            required
          />
          <label>Descripción:</label>
          <textarea
            name="description"
            value={defect.description}
            onChange={handleChange}
            required
          />

          <label>Prioridad:</label>
          <select
            name="priority"
            value={defect.priority}
            onChange={handleChange}
            required
          >
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
          </select>

          <label>Tipo:</label>
          <select
            name="type"
            value={defect.type}
            onChange={handleChange}
            required
          >
            <option value="Interfaz de usuario">Interfaz de usuario</option>
            <option value="Funcional">Funcional</option>
            <option value="Rendimiento">Rendimiento</option>
            <option value="Seguridad">Seguridad</option>
            <option value="Otro">Otro</option>
          </select>

          <label>Asignar a:</label>
          <select
            name="assignedTo"
            value={defect.assignedTo}
            onChange={handleChange}
            disabled={!!editId} // Deshabilitado en modo edición
            required
          >
            <option value="">Selecciona un desarrollador</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <label>Estado:</label>
          <select
            name="status"
            value={defect.status}
            onChange={handleChange}
            required
          >
            <option value="Abierto">Abierto</option>
            <option value="En curso">En curso</option>
            <option value="Resuelto">Resuelto</option>
            <option value="Verificado">Verificado</option>
          </select>

          <label>Fecha Creación:</label>
          <input
            type="date"
            name="createdAt"
            value={defect.createdAt ? defect.createdAt.split('T')[0] : ''}
            onChange={handleChange}
            required
          />

          <label>Fecha Resolución:</label>
          <input
            type="date"
            name="resolvedAt"
            value={defect.resolvedAt ? defect.resolvedAt.split('T')[0] : ''}
            onChange={handleChange}
            disabled={defect.status !== 'Resuelto'}
          />

          <button type="submit">
            {editId ? 'Actualizar Defecto' : 'Registrar Defecto'}
          </button>
        </form>
      </div>

      <div>
        <h3>Lista de Defectos</h3>
        <table>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Caso de Prueba</th>
              <th>Título</th>
              <th>Prioridad</th>
              <th>Tipo</th>
              <th>Asignado a</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {defects.map((defect) => (
              <tr key={defect.id}>
                <td>{defect.projectName}</td>
                <td>{defect.testCaseScenario}</td>
                <td>{defect.title}</td>
                <td>{defect.priority}</td>
                <td>{defect.type}</td>
                <td>{defect.userName}</td>
                <td>{defect.status}</td>
                <td>
                  <button onClick={() => handleEdit(defect)}>
                    <GrEdit />
                  </button>
                  <button onClick={() => handleDelete(defect.id)}>
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

export default Reg_defectos;
*/
}
