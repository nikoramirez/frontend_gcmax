import React, { useState, useEffect } from 'react';
import './listing.css';

// Importar imágenes
import producto from '../../../Assets/producto.png';
import producto2 from '../../../Assets/producto2.png';
import producto3 from '../../../Assets/producto3.png';

import imagen6 from '../../../Assets/imagen6.png'; // Asegúrate de que tienes la imagen
import imagen10 from '../../../Assets/imagen10.png'; // Asegúrate de que tienes la imagen

const Listing = () => {
  const [products, setProducts] = useState([
    { id: 1, img: producto, name: 'Aplicaciones' },
    { id: 2, img: producto2, name: 'Performance' },
    { id: 3, img: producto3, name: 'Automatizado' },
  ]);

  // Movimiento automático del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      // Desplazar la imagen del primer lugar al final
      setProducts((prevProducts) => {
        const [first, ...rest] = prevProducts;
        return [...rest, first];
      });
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="listingSection">
      <div className="headingflex">
        <h1>Gestión de Calidad</h1>
      </div>

      {/* Carrusel visible con 3 imágenes al mismo tiempo */}
      <div className="carouselContainer">
        <div className="carousel">
          {products.map((product) => (
            <div className="singleItem" key={product.id}>
              <img src={product.img} alt={`Imagen de ${product.name}`} />
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Nueva sección con dos imágenes y su concepto */}
      <div className="featuredSellers">
        <div className="headingflex">
          <h1>Factores Destacados</h1>
          {/*<button className="btn flex">
            Ver todos <BsArrowRightShort className="icon" />
          </button>*/}
        </div>
        <div className="card flex">
          <div className="singleItem">
            <img src={imagen6} alt="Imágen de usuario" />
            <div className="cardText">
              <span>
                5 pruebas gestionadas <br />
                <small>
                  3 con éxito <span className="date"> en una semana</span>
                </small>
              </span>
            </div>
          </div>

          <div className="singleItem">
            <img src={imagen10} alt="Imágen de usuario" />
            <div className="cardText">
              <span>
                20 pruebas gestionadas <br />
                <small>
                  12 con éxito <span className="date"> en un mes</span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
