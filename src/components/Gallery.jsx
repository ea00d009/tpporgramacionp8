// Importamos React y los hooks useState y useEffect.
// useState nos permite añadir estado a nuestros componentes funcionales.
// useEffect nos permite realizar efectos secundarios (como fetching de datos) después del renderizado.
import React, { useState, useEffect } from 'react';

// Importamos el archivo CSS para los estilos de la galería.
import './Gallery.css';

// Definimos el componente funcional Gallery.
const Gallery = () => {
  // --- ESTADO DEL COMPONENTE ---
  // 'photos': Un array para almacenar las fotos obtenidas de la API. Inicialmente vacío.
  const [photos, setPhotos] = useState([]);
  // 'loading': Un booleano para indicar si los datos se están cargando. Inicialmente true.
  const [loading, setLoading] = useState(true);
  // 'error': Un booleano para indicar si ocurrió un error al cargar los datos. Inicialmente false.
  const [error, setError] = useState(false);

  // --- EFECTO PARA CARGAR DATOS ---
  // useEffect se ejecuta después de que el componente se monta (se renderiza por primera vez).
  // El array vacío como segundo argumento ([]) significa que este efecto solo se ejecutará una vez,
  // similar a componentDidMount en componentes de clase.
  useEffect(() => {
    // Definimos una función asíncrona para realizar la petición fetch.
    const fetchPhotos = async () => {
      try {
        // Hacemos la petición a la API. 'await' pausa la ejecución hasta que la promesa se resuelva.
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        
        // Verificamos si la respuesta de la red fue exitosa (status 200-299).
        if (!response.ok) {
          // Si no fue exitosa, lanzamos un error para ser capturado por el bloque catch.
          throw new Error('La respuesta de la red no fue OK');
        }
        
        // Convertimos la respuesta a formato JSON. 'await' pausa hasta que se complete.
        const data = await response.json();
        
        // Actualizamos el estado 'photos' con los datos recibidos.
        // Usamos slice(0, 60) para tomar solo las primeras 60 fotos de la API.
        setPhotos(data.slice(0, 60));
        // Si todo fue bien, nos aseguramos de que el estado 'error' sea false.
        setError(false);
      } catch (err) {
        // Si ocurre cualquier error durante el fetch o el procesamiento de datos:
        // Actualizamos el estado 'error' a true.
        setError(true);
        // Opcional: podríamos registrar el error en la consola para depuración.
        // console.error("Error al cargar las fotos:", err);
      } finally {
        // El bloque 'finally' se ejecuta siempre, tanto si hubo éxito como si hubo error.
        // Actualizamos el estado 'loading' a false, ya que la operación de carga ha terminado.
        setLoading(false);
      }
    };

    // Llamamos a la función que acabamos de definir para iniciar la carga de datos.
    fetchPhotos();
  }, []); // Dependencias vacías: ejecutar solo una vez al montar.

  // --- RENDERIZADO CONDICIONAL ---
  // Si 'loading' es true, mostramos un mensaje de carga.
  if (loading) {
    return <h1 className="gallery-loading">Cargando galería divertida...</h1>;
  }

  // Si 'error' es true (y 'loading' ya es false), mostramos un mensaje de error.
  if (error) {
    return <h2 className="gallery-error-message">No se pudieron cargar las fotos 😢</h2>;
  }

  // --- RENDERIZADO PRINCIPAL DE LA GALERÍA ---
  // Si no estamos cargando y no hay error, mostramos la galería de fotos.
  return (
    <div className="gallery-container">
      {/* 
        Mapeamos (recorremos) el array 'photos'. 
        Para cada objeto 'photo' en el array, creamos un elemento JSX.
        'key={photo.id}' es importante para React para identificar de forma única cada elemento en una lista.
      */}
      {photos.map(photo => (
        <div className="photo-card" key={photo.id}>
          {/* Contenedor para la imagen con un fondo y altura mínima */}
          <div className="photo-img-container" style={{ background: '#ffe082', minHeight: '170px' }}>
            {/* 
              La imagen se carga desde picsum.photos, usando el 'id' de la foto como "seed"
              para obtener una imagen única pero consistente para ese ID.
              Dimensiones: 300x200.
            */}
            <img
              className="photo-img"
              src={`https://picsum.photos/seed/${photo.id}/300/200`}
              alt={photo.title} // Texto alternativo para accesibilidad y SEO.
              // Manejador de error para la imagen: si no se puede cargar la imagen de picsum,
              // se intenta cargar una imagen de gatito de placekitten.com.
              onError={e => {
                e.target.onerror = null; // Evita bucles de error si la imagen de fallback también falla.
                e.target.src = 'https://placekitten.com/300/200'; // URL de la imagen de fallback.
              }}
            />
          </div>
          {/* Mostramos el título de la foto debajo de la imagen. */}
          <div className="photo-title">{photo.title}</div>
        </div>
      ))}
    </div>
  );
};

// Exportamos el componente Gallery para que pueda ser usado en otras partes de la aplicación.
export default Gallery;
