import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './correccion.css';

import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Correccion = () => {
  const [note, setNote] = useState({
    defectId: '',
    verifiedAt: '',
    notes: '',
    verified: false,
  });
  const [defects, setDefects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener defectos y notas de verificación
  useEffect(() => {
    fetchDefects();
    fetchNotes();
  }, []);

  const fetchDefects = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/defectos`);
      setDefects(response.data);
    } catch (error) {
      console.error('Error al cargar defectos:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await Axios.get(`${apiUrl}/api/notas_verificacion`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error al cargar notas de verificación:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNote({
      ...note,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...note,
        verifiedAt: note.verifiedAt || new Date().toISOString(),
      };

      if (editId) {
        await Axios.put(`${apiUrl}/api/notas_verificacion/${editId}`, data);
        setMessage('Nota actualizada con éxito');
      } else {
        await Axios.post(`${apiUrl}/api/notas_verificacion`, data);
        setMessage('Nota registrada con éxito');
      }

      setNote({
        defectId: '',
        verifiedAt: '',
        notes: '',
        verified: false,
      });
      setEditId(null);
      fetchNotes();
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      setMessage('Error al guardar la nota');
    }
  };

  const handleEdit = (note) => {
    setNote({
      defectId: note.defect_id,
      verifiedAt: note.verified_at.split('T')[0],
      notes: note.notes,
      verified: note.verified === 1,
    });
    setEditId(note.id);
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${apiUrl}/api/notas_verificacion/${id}`);
      setMessage('Nota eliminada con éxito');
      fetchNotes();
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
      setMessage('Error al eliminar la nota');
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES'); // Formato dd/mm/aaaa
  };

  return (
    <div className="correccion-def">
      <div className="correccion-formulario-def">
        <h2>
          {editId
            ? 'Editar Nota de Verificación'
            : 'Registrar Nota de Verificación'}
        </h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label>Defecto:</label>
          <select
            name="defectId"
            value={note.defectId}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un defecto</option>
            {defects.map((defect) => (
              <option key={defect.id} value={defect.id}>
                {defect.title}
              </option>
            ))}
          </select>

          <label>Fecha de Verificación:</label>
          <input
            type="date"
            name="verifiedAt"
            value={note.verifiedAt}
            onChange={handleChange}
          />

          <label>Notas:</label>
          <textarea
            name="notes"
            value={note.notes}
            onChange={handleChange}
            required
          ></textarea>

          <label>
            Verificado:
            <input
              type="checkbox"
              name="verified"
              checked={note.verified}
              onChange={handleChange}
            />
          </label>

          <button type="submit">
            {editId ? 'Actualizar Nota' : 'Registrar Nota'}
          </button>
        </form>
      </div>
      <div className="correccion-tabla">
        <h3>Notas de Verificación</h3>
        <table>
          <thead>
            <tr>
              <th>Defecto</th>
              <th>Fecha de Verificación</th>
              <th>Notas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.defectTitle}</td>
                <td>{formatFecha(note.verified_at)}</td>
                {/*<td>{note.verified_at.split('T')[0]}</td>*/}
                <td>{note.notes}</td>
                <td>{note.verified ? 'Sí' : 'No'}</td>
                <td>
                  <button
                    onClick={() => handleEdit(note)}
                    className="btn_edit_corr"
                  >
                    <GrEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="btn_erase_corr"
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

export default Correccion;
