import React from 'react';
import './App.css';
import Gallery from './components/Gallery';

function App() {
  return (
    <div>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#ffffff', 
        fontSize: '2.5rem',
        marginBottom: '2rem',
        textShadow: '2px 2px 6px rgba(0,0,0,0.5)',
        fontWeight: 'bold',
        padding: '1rem 0',
        letterSpacing: '1px'
      }}>
        Galería de Productos
      </h1>
      <Gallery />
    </div>
  );
}

export default App;
