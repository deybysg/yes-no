import { questions } from '../data/questions';
import './ResponsesList.css';

function ResponsesList({ session }) {
  const answers = session.answers || {};
  
  const getQuestionById = (id) => {
    return questions.find(q => q.id === parseInt(id));
  };
  
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Fecha no disponible';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="responses-list">
      <div className="responses-header">
        <h3>📋 Respuestas</h3>
        <span className={`status-badge ${session.status}`}>
          {session.status === 'completed' ? '✅ Completada' : '⏳ Pendiente'}
        </span>
      </div>
      
      <div className="responses-date">
        <p>📅 {formatDate(session.createdAt)}</p>
      </div>
      
      <div className="responses-items">
        {Object.entries(answers).map(([questionId, answer]) => {
          const question = getQuestionById(questionId);
          if (!question) return null;
          
          return (
            <div key={questionId} className="response-item">
              <span className="response-emoji">{question.emoji}</span>
              <div className="response-content">
                <p className="response-question">{question.question}</p>
                <span className={`response-answer ${answer ? 'yes' : 'no'}`}>
                  {answer ? 'Sí 💚' : 'No ❤️'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {Object.keys(answers).length === 0 && (
        <div className="no-responses">
          <p>Aún no hay respuestas</p>
        </div>
      )}
    </div>
  );
}

export default ResponsesList;