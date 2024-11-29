import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './estado.css'; // Estilos opcionales

const Estado = () => {
  const [totalTests, setTotalTests] = useState(0);
  const [successfulTests, setSuccessfulTests] = useState(0);
  const [failedTests, setFailedTests] = useState(0);
  const [successPercentage, setSuccessPercentage] = useState(0);
  const [latestTests, setLatestTests] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL; // Asumiendo que tienes configurado el URL en las variables de entorno

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener estadísticas de las pruebas ejecutadas
        const totalResponse = await Axios.get(`${apiUrl}/api/total_tests`);
        const successfulResponse = await Axios.get(
          `${apiUrl}/api/successful_tests`
        );
        const failedResponse = await Axios.get(`${apiUrl}/api/failed_tests`);
        const percentageResponse = await Axios.get(
          `${apiUrl}/api/success_percentage`
        );
        const latestResponse = await Axios.get(`${apiUrl}/api/latest_tests`);

        setTotalTests(totalResponse.data.total_tests);
        setSuccessfulTests(successfulResponse.data.successful_tests);
        setFailedTests(failedResponse.data.failed_tests);
        setSuccessPercentage(percentageResponse.data.success_percentage);
        setLatestTests(latestResponse.data.latest_tests);
      } catch (error) {
        console.error('Error al cargar las estadísticas de pruebas', error);
      }
    };

    // Llamar a la API cada 5 segundos para obtener los datos más recientes
    const intervalId = setInterval(fetchData, 5000);
    fetchData(); // Cargar los datos iniciales

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [apiUrl]);

  return (
    <div className="estado-ejecucion-pruebas">
      <h2>Estado de Ejecución de Pruebas</h2>
      <div className="estadisticas">
        <div>
          <h3>Total de Pruebas Ejecutadas</h3>
          <p>{totalTests}</p>
        </div>
        <div>
          <h3>Pruebas Aprobadas</h3>
          <p>{successfulTests}</p>
        </div>
        <div>
          <h3>Pruebas Fallidas</h3>
          <p>{failedTests}</p>
        </div>
        <div>
          <h3>Porcentaje de Éxito</h3>
          <p>{successPercentage}%</p>
        </div>
      </div>

      <div className="historial-pruebas">
        <h3>Últimas Ejecuciones</h3>
        <ul>
          {latestTests.map((test) => (
            <li key={test.test_case_id}>
              Caso de prueba: {test.test_case_id} - Resultado: {test.result} -
              Fecha: {new Date(test.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Estado;
