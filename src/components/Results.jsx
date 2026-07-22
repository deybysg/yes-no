import { useState, useEffect } from 'react';
import Button from './Button';
import './Results.css';

function Results({ responses, questions, onRestart, personName }) {
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [hearts, setHearts] = useState([]);
  
  const yesCount = Object.values(responses).filter(r => r === true).length;
  const noCount = Object.values(responses).filter(r => r === false).length;
  const total = Object.keys(responses).length;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFinalMessage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (showFinalMessage) {
      const newHearts = [];
      for (let i = 0; i < 50; i++) {
        newHearts.push({
          id: i,
          emoji: ['\u{1F495}', '\u{1F496}', '\u{1F497}', '\u{1F498}', '\u{2764}\u{FE0F}', '\u{2728}', '\u{1F31F}', '\u{1F49D}', '\u{1F49E}', '\u{1F493}', '\u{1F970}', '\u{1F60D}'][Math.floor(Math.random() * 12)],
          left: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 2 + Math.random() * 3,
          size: 1 + Math.random() * 2
        });
      }
      setHearts(newHearts);
    }
  }, [showFinalMessage]);
  
  const getMessage = () => {
    const name = personName || 'tu';
    const percentage = (yesCount / total) * 100;
    if (percentage >= 80) return name + ', eres la mejor del mundo!';
    if (percentage >= 60) return name + ', nos llevamos genial!';
    if (percentage >= 40) return name + ', hay cosas en las que coincidimos';
    return name + ', todavia nos queda mucho por descubrir juntos!';
  };
  
  if (showFinalMessage) {
    return (
      <div className="final-message-container">
        <div className="final-hearts">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="floating-heart"
              style={{
                left: heart.left + '%',
                animationDelay: heart.delay + 's',
                animationDuration: heart.duration + 's',
                fontSize: heart.size + 'rem'
              }}
            >
              {heart.emoji}
            </span>
          ))}
        </div>
        
        <div className="final-content">
          <div className="final-emoji">{'\u{1F495}'}</div>
          
          <h1 className="final-text">
            <span className="line-1">No busco a alguien perfecto,</span>
            <span className="line-2">solo a alguien que me haga sentir</span>
            <span className="line-3">como vos lo haces</span>
          </h1>
          
          <div className="final-name">
            <span className="te-amo">TE AMO</span>
            <span className="name-text">AGUSTINA GUADALUPE VILLA</span>
          </div>
          
          <div className="final-emoji-bottom">{'\u{1F496}'}</div>
        </div>
        
        <div className="final-restart">
          <Button type="restart" onClick={onRestart}>
            Empezar de Nuevo
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="results-container">
      <div className="results-card">
        <h1 className="results-title">Resultados para {personName || 'tu'}!</h1>
        
        <div className="results-emoji">
          {yesCount > noCount ? '\u{1F495}' : yesCount === noCount ? '\u{1F91D}' : '\u{1F49D}'}
        </div>
        
        <p className="results-message">{getMessage()}</p>
        
        <div className="results-stats">
          <div className="stat">
            <span className="stat-number yes">{yesCount}</span>
            <span className="stat-label">Si</span>
          </div>
          <div className="stat">
            <span className="stat-number no">{noCount}</span>
            <span className="stat-label">No</span>
          </div>
          <div className="stat">
            <span className="stat-number total">{total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        
        <div className="results-list">
          <h3>Tus respuestas:</h3>
          {questions.map(q => (
            <div key={q.id} className="result-item">
              <span className="result-emoji">{q.emoji}</span>
              <span className="result-question">{q.question}</span>
              <span className={'result-answer ' + (responses[q.id] ? 'yes' : 'no')}>
                {responses[q.id] ? 'Si' : 'No'}
              </span>
            </div>
          ))}
        </div>
        
        <Button type="restart" onClick={onRestart}>
          Empezar de Nuevo
        </Button>
      </div>
    </div>
  );
}

export default Results;