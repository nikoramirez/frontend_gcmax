import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './registro.css';

const Registro = () => {
  const [testCases, setTestCases] = useState([]);
  const [selectedTestCaseId, setSelectedTestCaseId] = useState('');
  const [result, setResult] = useState('Aprobado');
  const [notes, setNotes] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    Axios.get(`${apiUrl}/api/casos_pruebas`)
      .then((response) => setTestCases(response.data))
      .catch((error) =>
        console.error('Error al cargar casos de prueba:', error)
      );
  }, []);

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('test_case_id', selectedTestCaseId);
    formData.append('result', result);
    formData.append('notes', notes);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await Axios.post(
        `${apiUrl}/api/resultados_pruebas`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage(response.data.message);
      setSelectedTestCaseId('');
      setResult('Aprobado');
      setNotes('');
      setAttachment(null);
    } catch (error) {
      console.error('Error al registrar el resultado de la prueba:', error);
      setMessage('Error al registrar el resultado de la prueba');
    }
  };

  return (
    <div className="registro-pruebas">
      <h2 className="registro-pruebas__title">
        Registro de Resultados de Pruebas
      </h2>
      {message && <p className="registro-pruebas__message">{message}</p>}
      <form className="registro-pruebas__form" onSubmit={handleSubmit}>
        <div className="registro-pruebas__form-group">
          <label className="registro-pruebas__label">Caso de Prueba:</label>
          <select
            className="registro-pruebas__select"
            value={selectedTestCaseId}
            onChange={(e) => setSelectedTestCaseId(e.target.value)}
            required
          >
            <option value="">Selecciona un caso de prueba</option>
            {testCases.map((testCase) => (
              <option key={testCase.id} value={testCase.id}>
                {testCase.scenario}
              </option>
            ))}
          </select>

          <label className="registro-pruebas__label">Resultado:</label>
          <select
            className="registro-pruebas__select"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          >
            <option value="Aprobado">Aprobado</option>
            <option value="Fallido">Fallido</option>
          </select>

          <label className="registro-pruebas__label">Notas:</label>
          <textarea
            className="registro-pruebas__textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />
        </div>

        <div className="registro-pruebas__form-group">
          <label className="registro-pruebas__label">Adjuntar Evidencia:</label>
          <input
            className="registro-pruebas__file-input"
            type="file"
            onChange={handleFileChange}
          />
          <button type="submit" className="registro-pruebas__button">
            Registrar Resultado
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registro;

{
  /*
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './registro.css';

const Registro = () => {
  const [testCases, setTestCases] = useState([]);
  const [selectedTestCaseId, setSelectedTestCaseId] = useState('');
  const [result, setResult] = useState('Aprobado');
  const [notes, setNotes] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [message, setMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Obtener casos de prueba desde el backend
    Axios.get(`${apiUrl}/api/casos_pruebas`)
      .then((response) => setTestCases(response.data))
      .catch((error) =>
        console.error('Error al cargar casos de prueba:', error)
      );
  }, []);

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('test_case_id', selectedTestCaseId);
    formData.append('result', result);
    formData.append('notes', notes);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await Axios.post(
        `${apiUrl}/api/resultados_pruebas`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage(response.data.message);
      setSelectedTestCaseId('');
      setResult('Aprobado');
      setNotes('');
      setAttachment(null);
    } catch (error) {
      console.error('Error al registrar el resultado de la prueba:', error);
      setMessage('Error al registrar el resultado de la prueba');
    }
  };

  return (
    <div>
      <h2>Registro de Resultados de Pruebas</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Caso de Prueba:</label>
          <select
            value={selectedTestCaseId}
            onChange={(e) => setSelectedTestCaseId(e.target.value)}
            required
          >
            <option value="">Selecciona un caso de prueba</option>
            {testCases.map((testCase) => (
              <option key={testCase.id} value={testCase.id}>
                {testCase.scenario}
              </option>
            ))}
          </select>

          <label>Resultado:</label>
          <select value={result} onChange={(e) => setResult(e.target.value)}>
            <option value="Aprobado">Aprobado</option>
            <option value="Fallido">Fallido</option>
          </select>

          <label>Notas:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Adjuntar Evidencia:</label>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Registrar Resultado</button>
        </div>
      </form>
    </div>
  );
};

export default Registro;
*/
}
