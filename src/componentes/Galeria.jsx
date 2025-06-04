// Importamos React y los hooks useState y useEffect.
// useState nos permite añadir estado a nuestros componentes funcionales.
// useEffect nos permite realizar efectos secundarios (como fetching de datos) después del renderizado.
import React, { useState, useEffect } from 'react';

// Importamos el archivo CSS para los estilos de la galería.
import './Galeria.css';

// Definimos el componente funcional Galeria.
const Galeria = () => {
  // --- ESTADO DEL COMPONENTE ---
  // 'fotos': Un array para almacenar las fotos obtenidas de la API. Inicialmente vacío.
  const [fotos, setFotos] = useState([]);
  // 'cargando': Un booleano para indicar si los datos se están cargando. Inicialmente true.
  const [cargando, setCargando] = useState(true);
  // 'errorAlCargar': Un booleano para indicar si ocurrió un error al cargar los datos. Inicialmente false.
  const [errorAlCargar, setErrorAlCargar] = useState(false);

  // --- EFECTO PARA CARGAR DATOS ---
  // useEffect se ejecuta después de que el componente se monta (se renderiza por primera vez).
  // El array vacío como segundo argumento ([]) significa que este efecto solo se ejecutará una vez,
  // similar a componentDidMount en componentes de clase.
  useEffect(() => {
    // Definimos una función asíncrona para realizar la petición fetch.
    const obtenerFotos = async () => {
      try {
        // Hacemos la petición a la API. 'await' pausa la ejecución hasta que la promesa se resuelva.
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/photos');
        
        // Verificamos si la respuesta de la red fue exitosa (status 200-299).
        if (!respuesta.ok) {
          // Si no fue exitosa, lanzamos un error para ser capturado por el bloque catch.
          throw new Error('La respuesta de la red no fue OK');
        }
        
        // Convertimos la respuesta a formato JSON. 'await' pausa hasta que se complete.
        const datos = await respuesta.json();
        
        // Actualizamos el estado 'fotos' con los datos recibidos.
        // Usamos slice(0, 60) para tomar solo las primeras 60 fotos de la API.
        setFotos(datos.slice(0, 60));
        // Si todo fue bien, nos aseguramos de que el estado 'errorAlCargar' sea false.
        setErrorAlCargar(false);
      } catch (errorCapturado) {
        // Si ocurre cualquier error durante el fetch o el procesamiento de datos:
        // Actualizamos el estado 'errorAlCargar' a true.
        setErrorAlCargar(true);
        // Opcional: podríamos registrar el error en la consola para depuración.
        // console.error("Error al cargar las fotos:", errorCapturado);
      } finally {
        // El bloque 'finally' se ejecuta siempre, tanto si hubo éxito como si hubo error.
        // Actualizamos el estado 'cargando' a false, ya que la operación de carga ha terminado.
        setCargando(false);
      }
    };

    // Llamamos a la función que acabamos de definir para iniciar la carga de datos.
    obtenerFotos();
  }, []); // Dependencias vacías: ejecutar solo una vez al montar.

  // --- RENDERIZADO CONDICIONAL ---
  // Si 'cargando' es true, mostramos un mensaje de carga.
  if (cargando) {
    return <h1 className="galeria-cargando">Cargando galería divertida...</h1>;
  }

  // Si 'errorAlCargar' es true (y 'cargando' ya es false), mostramos un mensaje de error.
  if (errorAlCargar) {
    return <h2 className="galeria-mensaje-error">No se pudieron cargar las fotos 😢</h2>;
  }

  // --- RENDERIZADO PRINCIPAL DE LA GALERÍA ---
  // Si no estamos cargando y no hay error, mostramos la galería de fotos.
  return (
    <div className="galeria-contenedor">
      {/* 
        Mapeamos (recorremos) el array 'fotos'. 
        Para cada objeto 'foto' en el array, creamos un elemento JSX.
        'key={foto.id}' es importante para React para identificar de forma única cada elemento en una lista.
      */}
      {fotos.map(foto => (
        <div className="foto-tarjeta" key={foto.id}>
          {/* Contenedor para la imagen con un fondo y altura mínima */}
          <div className="foto-imagen-contenedor" style={{ background: '#ffe082', minHeight: '170px' }}>
            {/* 
              La imagen se carga desde picsum.photos, usando el 'id' de la foto como "seed"
              para obtener una imagen única pero consistente para ese ID.
              Dimensiones: 300x200.
            */}
            <img
              className="foto-imagen"
              src={`https://picsum.photos/seed/${foto.id}/300/200`}
              alt={foto.title} // Texto alternativo para accesibilidad y SEO.
              // Manejador de error para la imagen: si no se puede cargar la imagen de picsum,
              // se intenta cargar una imagen de gatito de placekitten.com.
              onError={e => {
                e.target.onerror = null; // Evita bucles de error si la imagen de fallback también falla.
                e.target.src = 'https://placekitten.com/300/200'; // URL de la imagen de fallback.
              }}
            />
          </div>
          {/* Mostramos el título de la foto debajo de la imagen. */}
          <div className="foto-titulo">{foto.title}</div>
        </div>
      ))}
    </div>
  );
};

// Exportamos el componente Galeria para que pueda ser usado en otras partes de la aplicación.
export default Galeria;
