import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './definicion.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Definicion = () => {
  const [testPlans, setTestPlans] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [selectedTestPlanId, setSelectedTestPlanId] = useState('');
  const [testCase, setTestCase] = useState({
    scenario: '',
    criteria: '',
    status: '',
  });
  const [editingTestCaseId, setEditingTestCaseId] = useState(null);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    Axios.get(`${apiUrl}/api/planes_pruebas`)
      .then((response) => setTestPlans(response.data))
      .catch((error) =>
        console.error('Error al cargar planes de prueba:', error)
      );
  }, []);

  useEffect(() => {
    if (selectedTestPlanId) {
      fetchTestCases(selectedTestPlanId);
    }
  }, [selectedTestPlanId]);

  const fetchTestCases = (planId) => {
    Axios.get(`${apiUrl}/api/planes_pruebas/${planId}/casos_pruebas`)
      .then((response) => setTestCases(response.data))
      .catch((error) =>
        console.error('Error al cargar casos de prueba:', error)
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTestPlanId) {
      setMessage('Por favor selecciona un plan de prueba');
      return;
    }

    try {
      if (editingTestCaseId) {
        const response = await Axios.put(
          `${apiUrl}/api/casos_pruebas/${editingTestCaseId}`,
          testCase
        );
        setMessage(response.data.message);
      } else {
        const response = await Axios.post(
          `${apiUrl}/api/planes_pruebas/${selectedTestPlanId}/casos_pruebas`,
          testCase
        );
        setMessage(response.data.message);
      }
      setTestCase({ scenario: '', criteria: '', status: '' });
      setEditingTestCaseId(null);
      fetchTestCases(selectedTestPlanId);
    } catch (error) {
      console.error('Error al guardar el caso de prueba:', error);
      setMessage('Error al guardar el caso de prueba');
    }
  };

  const handleChange = (e) => {
    setTestCase({
      ...testCase,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (testCase) => {
    setTestCase({
      scenario: testCase.scenario,
      criteria: testCase.criteria,
      status: testCase.status,
    });
    setEditingTestCaseId(testCase.id);
  };

  const handleDelete = async (testCaseId) => {
    try {
      const response = await Axios.delete(
        `${apiUrl}/api/casos_pruebas/${testCaseId}`
      );
      setMessage(response.data.message);
      fetchTestCases(selectedTestPlanId);
    } catch (error) {
      console.error('Error al eliminar el caso de prueba:', error);
      setMessage('Error al eliminar el caso de prueba');
    }
  };

  return (
    <div className="definicion-pruebas">
      <h2 className="definicion-pruebas-title">
        Definición de Escenarios y Casos de Prueba
      </h2>
      {message && <p className="definicion-pruebas-message">{message}</p>}

      <div className="definicion-pruebas-wrapper">
        {/* Formulario */}
        <div className="definicion-pruebas-form">
          <form
            onSubmit={handleSubmit}
            className="definicion-pruebas-form-content"
          >
            <label>Plan de Prueba:</label>
            <select
              className="definicion-pruebas-select"
              value={selectedTestPlanId}
              onChange={(e) => setSelectedTestPlanId(e.target.value)}
              disabled={!!editingTestCaseId} // Deshabilitado en modo edición
              required
            >
              <option value="">Selecciona un plan de prueba</option>
              {testPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>

            <label>Escenario de Prueba:</label>
            <textarea
              className="definicion-pruebas-textarea"
              name="scenario"
              value={testCase.scenario}
              onChange={handleChange}
              required
            />

            <label>Criterios de Aceptación:</label>
            <textarea
              className="definicion-pruebas-textarea"
              name="criteria"
              value={testCase.criteria}
              onChange={handleChange}
              required
            />

            <label>Estado:</label>
            <select
              className="definicion-pruebas-select"
              name="status"
              value={testCase.status}
              onChange={handleChange}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Fallido">Fallido</option>
            </select>

            <button className="definicion-pruebas-btn" type="submit">
              {editingTestCaseId ? 'Actualizar' : 'Crear'} Caso de Prueba
            </button>
          </form>
        </div>

        {/* Tabla de Casos de Prueba */}
        <div className="definicion-pruebas-table">
          <table className="definicion-pruebas-table-content">
            <thead>
              <tr>
                <th>Escenario</th>
                <th>Criterios de Aceptación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {testCases.map((tc) => (
                <tr key={tc.id}>
                  <td>{tc.scenario}</td>
                  <td>{tc.criteria}</td>
                  <td>{tc.status}</td>
                  <td>
                    <button
                      className="definicion-pruebas-edit-btn"
                      onClick={() => handleEdit(tc)}
                    >
                      <GrEdit />
                    </button>
                    <button
                      className="definicion-pruebas-delete-btn"
                      onClick={() => handleDelete(tc.id)}
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
    </div>
  );
};

export default Definicion;
