import React, { useState, useEffect } from 'react';
import './Gallery.css';

// Componente principal de la galería
const Gallery = () => {
  // Estados: fotos, carga y error
  const [photos, setPhotos] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState(false);

  // Al montar, pedir fotos a la API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { setPhotos(data.slice(0, 60)); setError(false); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Mostrar mensaje de carga
  if (loading) return <h1 className="gallery-loading">Cargando galería divertida...</h1>;
  // Mostrar error si falla
  if (error) return <h2 className="gallery-error-message">No se pudieron cargar las fotos 😢</h2>;

  // Renderizar galería de imágenes
  return (
    <div className="gallery-container">
      {photos.map(photo => (
        <div className="photo-card" key={photo.id}>
          {/* Imagen random de picsum.photos usando el id como semilla */}
          <div className="photo-img-container" style={{background:'#ffe082', minHeight:'170px'}}>
            <img
              className="photo-img"
              src={`https://picsum.photos/seed/${photo.id}/300/200`}
              alt={photo.title}
              onError={e => { e.target.onerror = null; e.target.src = 'https://placekitten.com/300/200'; }}
            />
          </div>
          {/* Título de la foto */}
          <div className="photo-title">{photo.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
