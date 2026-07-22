import { useState } from 'react';
import './LoginPanel.css';

const SECRET_PASSWORD = 'novia2024';

function LoginPanel({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      onLogin();
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-emoji">🔐</div>
        <h1>Panel Secreto</h1>
        <p>Ingresa la contraseña para acceder</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="login-input"
            autoFocus
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        
        <div className="login-hint">
          <p>Pista: El año de inicio de la relación + "novia"</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPanel;