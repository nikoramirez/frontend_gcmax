import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es'; // Importar idioma español
import './visualizacion.css';

import { FaFilter } from 'react-icons/fa';

const Visualizacion = () => {
  const [events, setEvents] = useState([]);
  const [estado, setEstado] = useState('');
  const [proyectoId, setProyectoId] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    Axios.get(`${apiUrl}/api/proyectos`).then((response) => {
      setProyectos(response.data);
    });
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    Axios.get(`${apiUrl}/api/calendario/pruebas`).then((response) => {
      const eventos = response.data.map((evento) => ({
        id: evento.testCaseId,
        title: `${evento.testPlanName}: ${evento.testCaseScenario}`,
        start: evento.projectStartDate,
        end: evento.projectEndDate,
        color:
          evento.testCaseStatus === 'Pendiente'
            ? 'gray'
            : evento.testCaseStatus === 'Aprobado'
            ? 'green'
            : 'red',
      }));
      setEvents(eventos);
    });
  };

  const handleFilter = () => {
    Axios.get(`${apiUrl}/api/calendario/pruebas/filtrar`, {
      params: { estado, proyectoId },
    }).then((response) => {
      const eventos = response.data.map((evento) => ({
        id: evento.testCaseId,
        title: `${evento.testPlanName}: ${evento.testCaseScenario}`,
        start: evento.projectStartDate,
        end: evento.projectEndDate,
        color:
          evento.testCaseStatus === 'Pendiente'
            ? 'gray'
            : evento.testCaseStatus === 'Aprobado'
            ? 'green'
            : 'red',
      }));
      setEvents(eventos);
      setFilteredResults(response.data);
    });
  };

  return (
    <div>
      {/* Filtros de búsqueda */}
      <div className="visualizacion-pruebas-filtros">
        <h3>Filtros</h3>
        <div>
          <h4>Estado</h4>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Selecciona Estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Fallido">Fallido</option>
          </select>
        </div>

        <div>
          <h4>Proyecto</h4>
          <select
            value={proyectoId}
            onChange={(e) => setProyectoId(e.target.value)}
          >
            <option value="">Selecciona Proyecto</option>
            {proyectos.map((proyecto) => (
              <option key={proyecto.id} value={proyecto.id}>
                {proyecto.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleFilter}>
          Aplicar <FaFilter />
        </button>
      </div>

      <div className="visualizacion-pruebas-todo">
        {/* Sección con el calendario */}
        <div className="visualizacion-pruebas-calendario">
          <h3>Calendario de Pruebas Programadas</h3>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={esLocale} // Configurar el idioma en español
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek',
            }}
            events={events}
            eventClick={(info) =>
              alert(`Detalles de prueba: ${info.event.title}`)
            }
          />
        </div>

        {/* Resultados Filtrados */}
        <div className="visualizacion-pruebas-resultados">
          <h3>Resultados Filtrados</h3>
          {filteredResults.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th>Plan de Prueba</th>
                  <th>Escenario</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result) => (
                  <tr key={result.testCaseId}>
                    <td>{result.projectName}</td>
                    <td>{result.testPlanName}</td>
                    <td>{result.testCaseScenario}</td>
                    <td>{result.testCaseStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay resultados para mostrar</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualizacion;
