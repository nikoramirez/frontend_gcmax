import React, { useEffect, useState } from 'react';
import './activity.css';
import { BsArrowRightShort } from 'react-icons/bs';

// Importando imágenes
import usuario4 from '../../../Assets/usuario4.png';
import usuario5 from '../../../Assets/usuario5.png';
import usuario6 from '../../../Assets/usuario6.png';
import usuario7 from '../../../Assets/usuario7.png';
import usuario8 from '../../../Assets/usuario8.png';

const initialCustomers = [
  {
    id: 1,
    name: 'Angélica Ramírez: ',
    img: usuario4,
    description: 'Solicitó pruebas de funcionamiento',
  },
  {
    id: 2,
    name: 'Yolanda Ramírez: ',
    img: usuario5,
    description: 'Solicitó pruebas de usabilidad',
  },
  {
    id: 3,
    name: 'Magda Ramírez: ',
    img: usuario6,
    description: 'Solicitó pruebas de fiabilidad',
  },
  {
    id: 4,
    name: 'Celeste Ramírez: ',
    img: usuario7,
    description: 'Solicitó pruebas de rendimiento',
  },
  {
    id: 5,
    name: 'Paulina Ramírez: ',
    img: usuario8,
    description: 'Solicitó pruebas para de la capacidad de soporte',
  },
];

const Activity = () => {
  const [customers, setCustomers] = useState(initialCustomers);

  useEffect(() => {
    const interval = setInterval(() => {
      setCustomers((prev) => {
        const lastCustomer = prev[prev.length - 1]; // Último elemento
        const updatedCustomers = [lastCustomer, ...prev.slice(0, -1)]; // Mover el último al inicio
        return updatedCustomers;
      });
    }, 3000); // Ciclo cada 3 segundos

    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

  const getRandomMinutes = () => Math.floor(Math.random() * 60) + 1; // Genera un número entre 1 y 60

  return (
    <div className="activitySection">
      <div className="headingflex">
        <h1>Actividad Reciente</h1>
        {/*<button className="btn flex">
          Ver todo...
          <BsArrowRightShort className="icon" />
  </button>*/}
      </div>

      <div className="secContainer">
        {customers.map((customer, index) => (
          <div key={index} className="singleCustomer flex">
            <img src={customer.img} alt={`Imagen de ${customer.name}`} />
            <div className="customerDetails">
              <span className="name">{customer.name}</span>
              <small>{customer.description}</small>
            </div>
            <div className="duration">Hace {getRandomMinutes()} minutos</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
