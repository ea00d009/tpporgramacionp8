import React from 'react';
import './Product.css';

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.imagenes[0]?.url ?? './sinimagen.jpg'}
          alt={product.nombre}
        />
      </div>
      <hr className="product-divider" />
      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>
        <p className="product-description">{product.descripcion}</p>
      </div>
      <div className="product-footer">
        <span className="product-price">${product.precio.toFixed(2)}</span>
        <span className="product-sku">SKU: {product.sku}</span>
      </div>
    </div>
  );
};

export default Product;
