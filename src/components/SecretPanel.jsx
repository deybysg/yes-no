import { useState, useEffect } from 'react';
import { getAllSessions } from '../utils/firestore';
import StatsCard from './StatsCard';
import ResponsesList from './ResponsesList';
import './SecretPanel.css';

function SecretPanel({ onLogout }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  
  useEffect(() => {
    loadSessions();
  }, []);
  
  const loadSessions = async () => {
    try {
      const data = await getAllSessions();
      setSessions(data);
      if (data.length > 0) {
        setSelectedSession(data[0]);
      }
    } catch (error) {
      console.error('Error cargando sesiones:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Fecha no disponible';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <div className="secret-panel">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando respuestas...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="secret-panel">
      <header className="panel-header">
        <div className="header-content">
          <h1>🔐 Panel Secreto</h1>
          <p>Respuestas de tu novia</p>
        </div>
        <button className="logout-button" onClick={onLogout}>
          🚪 Salir
        </button>
      </header>
      
      <main className="panel-main">
        <StatsCard sessions={sessions} />
        
        {sessions.length > 0 ? (
          <div className="sessions-container">
            <div className="sessions-list">
              <h3>📝 Sesiones ({sessions.length})</h3>
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`session-item ${selectedSession?.id === session.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSession(session)}
                >
                  <div className="session-info">
                    <span className="session-name">
                      {session.personName || 'Sin nombre'}
                    </span>
                    <span className={`session-status ${session.status}`}>
                      {session.status === 'completed' ? '✅' : '⏳'}
                    </span>
                  </div>
                  <div className="session-date">
                    {formatDate(session.createdAt)}
                  </div>
                  <div className="session-answers">
                    {Object.keys(session.answers || {}).length} / 7 respuestas
                  </div>
                </div>
              ))}
            </div>
            
            <div className="session-detail">
              {selectedSession ? (
                <ResponsesList session={selectedSession} />
              ) : (
                <div className="no-selection">
                  <p>Selecciona una sesión para ver las respuestas</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="no-sessions">
            <div className="no-sessions-emoji">📭</div>
            <h3>No hay respuestas aún</h3>
            <p>Comparte el link con tu novia para que responda</p>
            <div className="share-link">
              <code>tu-app.com/preguntas</code>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SecretPanel;