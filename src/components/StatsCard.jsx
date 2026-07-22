import './StatsCard.css';

function StatsCard({ sessions }) {
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  
  const totalYes = sessions.reduce((acc, session) => {
    const answers = session.answers || {};
    return acc + Object.values(answers).filter(v => v === true).length;
  }, 0);
  
  const totalNo = sessions.reduce((acc, session) => {
    const answers = session.answers || {};
    return acc + Object.values(answers).filter(v => v === false).length;
  }, 0);
  
  const getMessage = () => {
    if (totalSessions === 0) return "Esperando respuestas...";
    if (totalYes > totalNo) return "¡Le gustas mucho! 💕";
    if (totalNo > totalYes) return "Todavía hay机会 🌟";
    return "¡Interesante! 🤔";
  };
  
  return (
    <div className="stats-card">
      <h2>📊 Estadísticas</h2>
      
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{totalSessions}</span>
          <span className="stat-label">Sesiones</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedSessions}</span>
          <span className="stat-label">Completadas</span>
        </div>
        <div className="stat-item yes">
          <span className="stat-number">{totalYes}</span>
          <span className="stat-label">Sí 💚</span>
        </div>
        <div className="stat-item no">
          <span className="stat-number">{totalNo}</span>
          <span className="stat-label">No ❤️</span>
        </div>
      </div>
      
      <div className="stats-message">
        <p>{getMessage()}</p>
      </div>
    </div>
  );
}

export default StatsCard;