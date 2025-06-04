// Importamos React, que es necesario para crear componentes de React.
import React from 'react';

// Importamos el archivo CSS específico para este componente Aplicacion.
// Aquí se podrían definir estilos globales o estilos para el layout principal de la aplicación.
import './Aplicacion.css';

// Importamos el componente Galeria desde su ubicación en la carpeta 'componentes'.
// Este componente es el que mostrará la galería de imágenes/productos.
import Galeria from './componentes/Galeria';

// Definimos el componente principal de la aplicación, llamado Aplicacion.
// Los componentes en React son funciones que devuelven JSX (una sintaxis similar a HTML).
function Aplicacion() {
  // El 'return' del componente define qué se va a renderizar en la pantalla.
  return (
    // Usamos un 'div' como contenedor principal para los elementos de la aplicación.
    // En React, un componente debe devolver un único elemento raíz (o un Fragment).
    <div>
      {/* 
        Un encabezado H1 para el título de la página.
        Se aplican estilos directamente en línea usando el atributo 'style'.
        El objeto de estilo usa camelCase para las propiedades CSS (ej. textAlign en lugar de text-align).
      */}
      <h1 style={{
        textAlign: 'center',         // Centra el texto.
        color: '#ffffff',            // Color del texto: blanco.
        fontSize: '2.5rem',          // Tamaño de la fuente.
        marginBottom: '2rem',        // Margen inferior.
        textShadow: '2px 2px 6px rgba(0,0,0,0.5)', // Sombra de texto para mejor legibilidad.
        fontWeight: 'bold',          // Grosor de la fuente: negrita.
        padding: '1rem 0',           // Relleno (padding) arriba/abajo de 1rem, 0 a los lados.
        letterSpacing: '1px'         // Espaciado entre letras.
      }}>
        Galería de Productos
      </h1>
      
      {/* 
        Renderizamos el componente Galeria que importamos antes.
        Esto mostrará la galería de productos/imágenes debajo del título.
      */}
      <Galeria />
    </div>
  );
}

// Exportamos el componente Aplicacion para que pueda ser utilizado por otros archivos,
// típicamente por 'principal.jsx' (o 'index.js') que es el punto de entrada de la aplicación.
export default Aplicacion;
