import { useState } from 'react';
import './NameInput.css';

function NameInput({ onSubmit }) {
  const [name, setName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };
  
  return (
    <div className="name-container">
      <div className="name-card">
        <div className="name-emoji">💕</div>
        <h1>¿Para quién son estas preguntas?</h1>
        <p>Escribe tu nombre</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Escribe tu nombre..."
            className="name-input"
            autoFocus
          />
          <button 
            type="submit" 
            className="name-button"
            disabled={!name.trim()}
          >
            ¡Empezar! 🎉
          </button>
        </form>
      </div>
    </div>
  );
}

export default NameInput;