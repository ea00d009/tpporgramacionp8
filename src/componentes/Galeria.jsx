// Importamos React y los hooks useState, useEffect y useCallback.
// useState nos permite añadir estado a nuestros componentes funcionales.
// useEffect nos permite realizar efectos secundarios (como fetching de datos) después del renderizado.
// useCallback nos permite memorizar funciones para evitar recrearlas en cada renderizado.
import React, { useState, useEffect, useCallback } from 'react';

// Importamos el archivo CSS para los estilos de la galería.
import './Galeria.css';

// Definimos el componente funcional Galeria.
const Galeria = () => {
  // --- ESTADO DEL COMPONENTE ---
  // 'pokemons': Un array para almacenar los Pokémon obtenidos de la API. Inicialmente vacío.
  const [pokemons, setPokemons] = useState([]);
  // 'cargando': Un booleano para indicar si los datos se están cargando. Inicialmente true.
  const [cargando, setCargando] = useState(true);
  // 'errorAlCargar': Un booleano para indicar si ocurrió un error al cargar los datos. Inicialmente false.
  const [errorAlCargar, setErrorAlCargar] = useState(false);
  // 'pokemonSeleccionado': Almacena los datos detallados del Pokémon seleccionado. Inicialmente null.
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
  // 'cargandoDetalles': Indica si se están cargando los detalles de un Pokémon. Inicialmente false.
  const [cargandoDetalles, setCargandoDetalles] = useState(false);

  // --- MANEJADORES DE EVENTOS ---
  // Función para manejar el clic en un Pokémon
  const manejarClicPokemon = useCallback(async (pokemon) => {
    try {
      setCargandoDetalles(true);
      // Hacemos una petición a la API para obtener los detalles del Pokémon
      const respuesta = await fetch(pokemon.url);
      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar los detalles del Pokémon');
      }
      const datos = await respuesta.json();
      setPokemonSeleccionado(datos);
    } catch (error) {
      console.error('Error al cargar detalles del Pokémon:', error);
      alert('No se pudieron cargar los detalles del Pokémon. Por favor, inténtalo de nuevo.');
    } finally {
      setCargandoDetalles(false);
    }
  }, []);

  // Función para cerrar el modal
  const cerrarModal = useCallback(() => {
    setPokemonSeleccionado(null);
  }, []);

  // --- EFECTO PARA CARGAR DATOS ---
  // useEffect se ejecuta después de que el componente se monta (se renderiza por primera vez).
  // El array vacío como segundo argumento ([]) significa que este efecto solo se ejecutará una vez,
  // similar a componentDidMount en componentes de clase.
  useEffect(() => {
    // Definimos una función asíncrona para realizar la petición fetch.
    const obtenerPokemons = async () => {
      try {
        // Hacemos la petición a la API de Pokémon. 'await' pausa la ejecución hasta que la promesa se resuelva.
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=60');
        
        // Verificamos si la respuesta de la red fue exitosa (status 200-299).
        if (!respuesta.ok) {
          // Si no fue exitosa, lanzamos un error para ser capturado por el bloque catch.
          throw new Error('La respuesta de la red no fue OK');
        }
        
        // Convertimos la respuesta a formato JSON. 'await' pausa hasta que se complete.
        const datos = await respuesta.json();
        
        // Actualizamos el estado 'pokemons' con los datos de los Pokémon.
        // Añadimos un ID a cada Pokémon basado en su posición en la lista + 1
        const pokemonsConId = datos.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1
        }));
        setPokemons(pokemonsConId);
        // Si todo fue bien, nos aseguramos de que el estado 'errorAlCargar' sea false.
        setErrorAlCargar(false);
      } catch (errorCapturado) {
        // Si ocurre cualquier error durante el fetch o el procesamiento de datos:
        // Actualizamos el estado 'errorAlCargar' a true.
        setErrorAlCargar(true);
        // Opcional: podríamos registrar el error en la consola para depuración.
        // console.error("Error al cargar las habilidades:", errorCapturado);
      } finally {
        // El bloque 'finally' se ejecuta siempre, tanto si hubo éxito como si hubo error.
        // Actualizamos el estado 'cargando' a false, ya que la operación de carga ha terminado.
        setCargando(false);
      }
    };

    // Llamamos a la función que acabamos de definir para iniciar la carga de datos.
    obtenerPokemons();
  }, []); // Dependencias vacías: ejecutar solo una vez al montar.

  // --- RENDERIZADO CONDICIONAL ---
  // Si 'cargando' es true, mostramos un mensaje de carga.
  if (cargando) {
    return <h1 className="galeria-cargando">Cargando Pokémon...</h1>;
  }

  // Si 'errorAlCargar' es true (y 'cargando' ya es false), mostramos un mensaje de error.
  if (errorAlCargar) {
    return <h2 className="galeria-mensaje-error">No se pudieron cargar los Pokémon 😢</h2>;
  }

  // --- RENDERIZADO PRINCIPAL DE LA GALERÍA ---
  // Si llegamos aquí, es porque 'cargando' es false y 'errorAlCargar' es false.
  return (
    <div className="galeria-contenedor">
      {/* 
        Mapeamos (recorremos) el array 'pokemons'. 
        Para cada objeto 'pokemon' en el array, creamos un elemento JSX.
        'key={pokemon.id}' es importante para React para identificar de forma única cada elemento en una lista.
      */}
      {pokemons.map((pokemon) => {
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
        
        return (
          <div 
            className="foto-tarjeta" 
            key={pokemon.id}
            onClick={() => manejarClicPokemon(pokemon)}
            style={{ cursor: 'pointer' }}
          >
            {/* Contenedor para la imagen del Pokémon */}
            <div 
              className="foto-imagen-contenedor" 
              style={{ 
                background: '#F5F5F5',
                minHeight: '170px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '10px',
              }}
            >
              <img 
                src={imageUrl} 
                alt={pokemon.name} 
                style={{
                  maxWidth: '100%',
                  maxHeight: '150px',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.target.onerror = null; // Evita bucles de error
                  e.target.src = 'https://via.placeholder.com/150?text=Pokemon+no+encontrado';
                }}
              />
            </div>
            {/* Mostramos el nombre del Pokémon debajo de la imagen */}
            <div className="foto-titulo" style={{ textTransform: 'capitalize' }}>
              {pokemon.name.replace(/-/g, ' ')}
            </div>
          </div>
        );
      })}

      {/* Modal para mostrar los detalles del Pokémon */}
      {pokemonSeleccionado && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={cerrarModal}>
          <div 
            style={{
              background: '#fff',
              color: '#222',
              padding: 20,
              borderRadius: 8,
              maxWidth: 400,
              width: '90%',
              position: 'relative',
              fontFamily: 'inherit',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
            onClick={e => e.stopPropagation()} // No cerrar modal si se hace click dentro
          >
            <button 
              onClick={cerrarModal}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'none',
                border: 'none',
                fontSize: 20,
                color: '#222',
                cursor: 'pointer'
              }}
              aria-label="Cerrar"
            >✕</button>
            {cargandoDetalles ? (
              <p>Cargando detalles del Pokémon...</p>
            ) : (
              <>
                <h2 style={{ textTransform: 'capitalize', margin: '0 0 10px 0', color: '#222' }}>
                  {pokemonSeleccionado.name.replace(/-/g, ' ')}
                </h2>
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSeleccionado.id}.png`} 
                  alt={pokemonSeleccionado.name}
                  style={{ width: 150, height: 150, objectFit: 'contain', display: 'block', margin: '0 auto' }}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=No+img';
                  }}
                />
                <div style={{ marginTop: 15 }}>
                  <div><b>ID:</b> {pokemonSeleccionado.id}</div>
                  <div><b>Altura:</b> {pokemonSeleccionado.height / 10} m</div>
                  <div><b>Peso:</b> {pokemonSeleccionado.weight / 10} kg</div>
                  <div style={{ margin: '10px 0' }}><b>Tipos:</b> {pokemonSeleccionado.types.map(t => t.type.name).join(', ')}</div>
                  <div>
                    <b>Estadísticas:</b>
                    <div style={{ marginTop: 8 }}>
                      {pokemonSeleccionado.stats.map(stat => (
                        <div key={stat.stat.name} style={{ marginBottom: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textTransform: 'capitalize', fontSize: 14 }}>
                              {stat.stat.name.replace('-', ' ')}
                            </span>
                            <span style={{ fontWeight: 'bold' }}>{stat.base_stat}</span>
                          </div>
                          <div style={{
                            height: 8,
                            width: '100%',
                            backgroundColor: '#e0e0e0',
                            borderRadius: 4,
                            marginTop: 4,
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${Math.min(100, (stat.base_stat / 180) * 100)}%`,
                              backgroundColor: 
                                stat.base_stat > 80 ? '#4CAF50' : 
                                stat.base_stat > 50 ? '#FFC107' : '#F44336',
                              transition: 'width 0.3s ease-in-out'
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Exportamos el componente Galeria para que pueda ser usado en otras partes de la aplicación.
export default Galeria;
