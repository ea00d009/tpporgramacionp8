// Importamos React, necesario para crear componentes.
import React from 'react';

// Importamos el archivo CSS para los estilos específicos de este componente.
import './Product.css';

// Definimos el componente funcional 'Product'.
// Este componente espera recibir un objeto 'product' como prop.
// Usamos la desestructuración de props directamente en los parámetros: ({ product }).
const Product = ({ product }) => {
  // El componente devuelve la estructura JSX que representa una tarjeta de producto.
  return (
    // 'div' principal con la clase 'product-card' para aplicar estilos a la tarjeta.
    <div className="product-card">
      {/* Contenedor para la imagen del producto. */}
      <div className="product-image-container">
        <img
          className="product-image" // Clase para estilizar la imagen.
          // src: La fuente de la imagen.
          // Intentamos acceder a la URL de la primera imagen en el array 'product.imagenes'.
          // 'product.imagenes[0]?.url': El operador de encadenamiento opcional (?.)
          //   previene un error si 'product.imagenes[0]' es undefined o null.
          //   Si es undefined/null, toda la expresión 'product.imagenes[0]?.url' devuelve undefined.
          // '?? './sinimagen.jpg'': El operador de coalescencia nula (??)
          //   proporciona un valor de respaldo. Si la expresión a la izquierda (product.imagenes[0]?.url)
          //   es null o undefined, se usará './sinimagen.jpg' como URL de la imagen.
          src={product.imagenes[0]?.url ?? './sinimagen.jpg'}
          // alt: Texto alternativo para la imagen, importante para accesibilidad y SEO.
          // Usamos el nombre del producto como texto alternativo.
          alt={product.nombre}
        />
      </div>

      {/* Un separador horizontal para dividir visualmente la imagen de la información. */}
      <hr className="product-divider" />

      {/* Contenedor para la información del producto (nombre y descripción). */}
      <div className="product-info">
        {/* Nombre del producto, renderizado como un encabezado h3. */}
        <h3 className="product-name">{product.nombre}</h3>
        {/* Descripción del producto, renderizada como un párrafo. */}
        <p className="product-description">{product.descripcion}</p>
      </div>

      {/* Pie de la tarjeta del producto, para precio y SKU. */}
      <div className="product-footer">
        {/* Precio del producto. 
            Usamos `toFixed(2)` para formatear el precio a dos decimales.
            El símbolo '$' se añade como texto. */}
        <span className="product-price">${product.precio.toFixed(2)}</span>
        {/* SKU (Stock Keeping Unit) del producto. */}
        <span className="product-sku">SKU: {product.sku}</span>
      </div>
    </div>
  );
};

// Exportamos el componente Product para que pueda ser importado y utilizado en otros lugares de la aplicación.
export default Product;
