import Button from './Button';
import './Results.css';

function Results({ responses, questions, onRestart, personName }) {
  const yesCount = Object.values(responses).filter(r => r === true).length;
  const noCount = Object.values(responses).filter(r => r === false).length;
  const total = Object.keys(responses).length;
  
  const getMessage = () => {
    const name = personName || 'tú';
    const percentage = (yesCount / total) * 100;
    if (percentage >= 80) return `¡${name}, eres la mejor del mundo! 💖`;
    if (percentage >= 60) return `¡${name}, nos llevamos genial! 🌟`;
    if (percentage >= 40) return `${name}, hay cosas en las que coincidimos 💕`;
    return `${name}, ¡todavía nos queda mucho por descubrir juntos! 💝`;
  };
  
  return (
    <div className="results-container">
      <div className="results-card">
        <h1 className="results-title">¡Resultados para {personName || 'tú'}! 🎉</h1>
        
        <div className="results-emoji">
          {yesCount > noCount ? "💕" : yesCount === noCount ? "🤝" : "💝"}
        </div>
        
        <p className="results-message">{getMessage()}</p>
        
        <div className="results-stats">
          <div className="stat">
            <span className="stat-number yes">{yesCount}</span>
            <span className="stat-label">Sí 💚</span>
          </div>
          <div className="stat">
            <span className="stat-number no">{noCount}</span>
            <span className="stat-label">No ❤️</span>
          </div>
          <div className="stat">
            <span className="stat-number total">{total}</span>
            <span className="stat-label">Total 📊</span>
          </div>
        </div>
        
        <div className="results-list">
          <h3>Tus respuestas:</h3>
          {questions.map(q => (
            <div key={q.id} className="result-item">
              <span className="result-emoji">{q.emoji}</span>
              <span className="result-question">{q.question}</span>
              <span className={`result-answer ${responses[q.id] ? 'yes' : 'no'}`}>
                {responses[q.id] ? 'Sí' : 'No'}
              </span>
            </div>
          ))}
        </div>
        
        <Button type="restart" onClick={onRestart}>
          🔄 Empezar de Nuevo
        </Button>
      </div>
    </div>
  );
}

export default Results;