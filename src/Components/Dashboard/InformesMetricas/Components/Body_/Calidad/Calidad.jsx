import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './calidad.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Calidad = () => {
  const [report, setReport] = useState({
    projectId: '',
    successRate: '',
    defectsFound: '',
    defectsResolved: '',
    avgResolutionTime: '',
    testCoverage: '',
    createdAt: '',
  });
  const [projects, setProjects] = useState([]);
  const [reports, setReports] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProjects();
    fetchReports();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/proyectos`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/informes_calidad`);
      setReports(response.data);
    } catch (error) {
      console.error('Error al cargar informes de calidad:', error);
    }
  };

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await Axios.put(
          `${apiUrl}/api/informes_calidad/${editId}`,
          report
        );
        setMessage(response.data.message);
      } else {
        const response = await Axios.post(
          `${apiUrl}/api/informes_calidad`,
          report
        );
        setMessage(response.data.message);
      }
      setReport({
        projectId: '',
        successRate: '',
        defectsFound: '',
        defectsResolved: '',
        avgResolutionTime: '',
        testCoverage: '',
        createdAt: '',
      });
      setEditId(null);
      fetchReports();
    } catch (error) {
      console.error('Error al guardar el informe de calidad:', error);
      setMessage('Error al guardar el informe de calidad');
    }
  };

  const handleEdit = (report) => {
    setReport({
      projectId: report.project_id,
      successRate: report.success_rate,
      defectsFound: report.defects_found,
      defectsResolved: report.defects_resolved,
      avgResolutionTime: report.avg_resolution_time,
      testCoverage: report.test_coverage,
      createdAt: report.created_at.split('T')[0],
    });
    setEditId(report.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(
        `${apiUrl}/api/informes_calidad/${id}`
      );
      setMessage(response.data.message);
      fetchReports();
    } catch (error) {
      console.error('Error al eliminar informe de calidad:', error);
      setMessage('Error al eliminar informe de calidad');
    }
  };

  return (
    <div className="calidad-informes">
      <div className="calidad-form-informes">
        <h3 className="calidad-form-title-informes">
          {editId
            ? 'Editar Informe de Calidad'
            : 'Registrar Informe de Calidad'}
        </h3>
        {message && <p className="calidad-form-message-informes">{message}</p>}
        <form className="calidad-form-informes" onSubmit={handleSubmit}>
          <label className="calidad-form-label-informes">Proyecto:</label>
          <select
            className="calidad-form-select-informes"
            name="projectId"
            value={report.projectId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un proyecto</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <label className="calidad-form-label-informes">
            Tasa de Éxito (%):
          </label>
          <input
            className="calidad-form-input-informes"
            type="number"
            name="successRate"
            value={report.successRate}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />

          <label className="calidad-form-label-informes">
            Defectos Encontrados:
          </label>
          <input
            className="calidad-form-input-informes"
            type="number"
            name="defectsFound"
            value={report.defectsFound}
            onChange={handleChange}
            min="0"
            required
          />

          <label className="calidad-form-label-informes">
            Defectos Resueltos:
          </label>
          <input
            className="calidad-form-input-informes"
            type="number"
            name="defectsResolved"
            value={report.defectsResolved}
            onChange={handleChange}
            min="0"
            required
          />

          <label className="calidad-form-label-informes">
            Tiempo Promedio de Resolución (días):
          </label>
          <input
            className="calidad-form-input-informes"
            type="number"
            name="avgResolutionTime"
            value={report.avgResolutionTime}
            onChange={handleChange}
            min="0"
            required
          />

          <label className="calidad-form-label-informes">
            Cobertura de Pruebas (%):
          </label>
          <input
            className="calidad-form-input-informes"
            type="number"
            name="testCoverage"
            value={report.testCoverage}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />

          <label className="calidad-form-label-informes">
            Fecha de Creación:
          </label>
          <input
            className="calidad-form-input-informes"
            type="date"
            name="createdAt"
            value={report.createdAt}
            onChange={handleChange}
            required
          />

          <button className="calidad-form-button-informes" type="submit">
            {editId ? 'Actualizar' : 'Registrar'} Informe
          </button>
        </form>
      </div>

      <div className="calidad-table-informes">
        <h3 className="calidad-table-title-informes">
          Lista de Informes de Calidad
        </h3>
        <table className="calidad-table-informes">
          <thead className="calidad-table-head-informes">
            <tr className="calidad-table-row-informes">
              <th className="calidad-table-header-informes">Proyecto</th>
              <th className="calidad-table-header-informes">Tasa de Éxito</th>
              <th className="calidad-table-header-informes">
                Defectos Encontrados
              </th>
              <th className="calidad-table-header-informes">
                Defectos Resueltos
              </th>
              <th className="calidad-table-header-informes">
                Tiempo Resolución
              </th>
              <th className="calidad-table-header-informes">Cobertura</th>
              <th className="calidad-table-header-informes">Creado</th>
              <th className="calidad-table-header-informes">Acciones</th>
            </tr>
          </thead>
          <tbody className="calidad-table-body-informes">
            {reports.map((report) => (
              <tr className="calidad-table-row-informes" key={report.id}>
                <td className="calidad-table-cell-informes">
                  {report.projectName}
                </td>
                <td className="calidad-table-cell-informes">
                  {report.success_rate}%
                </td>
                <td className="calidad-table-cell-informes">
                  {report.defects_found}
                </td>
                <td className="calidad-table-cell-informes">
                  {report.defects_resolved}
                </td>
                <td className="calidad-table-cell-informes">
                  {report.avg_resolution_time} días
                </td>
                <td className="calidad-table-cell-informes">
                  {report.test_coverage}%
                </td>
                <td className="calidad-table-cell-informes">
                  {new Date(report.created_at).toLocaleDateString('es-ES')}
                </td>
                <td className="calidad-table-cell-informes">
                  <button
                    className="calidad-table-edit-button-informes"
                    onClick={() => handleEdit(report)}
                  >
                    <GrEdit />
                  </button>
                  <button
                    className="calidad-table-delete-button-informes"
                    onClick={() => handleDelete(report.id)}
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

export default Calidad;
