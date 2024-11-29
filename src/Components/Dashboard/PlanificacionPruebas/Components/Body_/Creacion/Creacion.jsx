import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './creacion.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Creacion = () => {
  const [testPlan, setTestPlan] = useState({
    projectId: '',
    name: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const [testPlans, setTestPlans] = useState([]);
  const [editId, setEditId] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
    fetchTestPlans();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/proyectos`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };

  const fetchTestPlans = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/planes_prueba`);
      setTestPlans(response.data);
    } catch (error) {
      console.error('Error al obtener planes de prueba:', error);
      setMessage('Error al obtener planes de prueba');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testPlan.projectId) {
      setMessage('Por favor, selecciona un proyecto.');
      return;
    }

    try {
      if (editId) {
        const response = await Axios.put(
          `${apiUrl}/api/planes_prueba/${editId}`,
          {
            name: testPlan.name,
            description: testPlan.description,
          }
        );
        setMessage(response.data.message);
      } else {
        const response = await Axios.post(
          `${apiUrl}/api/proyectos/${testPlan.projectId}/planes_prueba`,
          {
            name: testPlan.name,
            description: testPlan.description,
          }
        );
        setMessage(response.data.message);
      }
      setTestPlan({ projectId: '', name: '', description: '' });
      setEditId(null);
      fetchTestPlans();
    } catch (error) {
      console.error('Error al crear o actualizar el plan de pruebas:', error);
      setMessage('Error al crear o actualizar el plan de pruebas');
    }
  };

  const handleChange = (e) => {
    setTestPlan({
      ...testPlan,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (plan) => {
    setTestPlan({
      projectId: plan.project_id,
      name: plan.name,
      description: plan.description,
    });
    setEditId(plan.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(`${apiUrl}/api/planes_prueba/${id}`);
      setMessage(response.data.message);
      fetchTestPlans();
    } catch (error) {
      console.error('Error al eliminar plan de pruebas:', error);
      setMessage('Error al eliminar plan de pruebas');
    }
  };

  return (
    <div className="creación-pruebas-plan">
      {message && <p className="creación-pruebas-message">{message}</p>}
      <div className="creación-pruebas-formu">
        <h3 className="creación-pruebas-title">
          {editId ? 'Editar Plan de Pruebas' : 'Crear Plan de Pruebas'}
        </h3>
        <form className="creación-pruebas-formulario" onSubmit={handleSubmit}>
          <label className="creación-pruebas-label">
            Selecciona un Proyecto:
          </label>
          <select
            className="creación-pruebas-select"
            name="projectId"
            value={testPlan.projectId}
            onChange={handleChange}
            required
            disabled={!!editId}
          >
            <option value="">proyecto...</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <label className="creación-pruebas-label">Nombre del Plan:</label>
          <input
            className="creación-pruebas-input"
            type="text"
            name="name"
            value={testPlan.name}
            onChange={handleChange}
            required
          />

          <label className="creación-pruebas-label">
            Descripción del Plan:
          </label>
          <textarea
            className="creación-pruebas-textarea-plan"
            name="description"
            value={testPlan.description}
            onChange={handleChange}
            required
          />

          <button className="creación-pruebas-button" type="submit">
            {editId ? 'Actualizar Plan' : 'Crear Plan'}
          </button>
        </form>
      </div>

      <div className="creación-pruebas-table">
        <h3 className="creación-pruebas-title">Listado de Planes de Prueba</h3>
        <table className="creación-pruebas-tabla">
          <thead className="creación-pruebas-thead">
            <tr className="creación-pruebas-tr">
              <th className="creación-pruebas-th">Proyecto</th>
              <th className="creación-pruebas-th">Nombre del Plan</th>
              <th className="creación-pruebas-th">Descripción</th>
              <th className="creación-pruebas-th">Acciones</th>
            </tr>
          </thead>
          <tbody className="creación-pruebas-tbody">
            {testPlans.map((plan) => (
              <tr className="creación-pruebas-tr" key={plan.id}>
                <td className="creación-pruebas-td">{plan.projectName}</td>
                <td className="creación-pruebas-td">{plan.name}</td>
                <td className="creación-pruebas-td">{plan.description}</td>
                <td className="creación-pruebas-td">
                  <button
                    className="creación-pruebas-button-edit"
                    onClick={() => handleEdit(plan)}
                  >
                    <GrEdit />
                  </button>
                  <button
                    className="creación-pruebas-button-delete"
                    onClick={() => handleDelete(plan.id)}
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

export default Creacion;
