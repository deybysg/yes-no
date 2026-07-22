import { useState } from 'react';
import Button from './Button';
import AnswerEffect from './AnswerEffect';
import './QuestionCard.css';

function QuestionCard({ question, onAnswer }) {
  const [effect, setEffect] = useState(null);
  
  const handleAnswer = (answer) => {
    setEffect(answer ? 'yes' : 'no');
  };
  
  const handleEffectComplete = (answer) => {
    setEffect(null);
    onAnswer(answer);
  };
  
  return (
    <>
      {effect && (
        <AnswerEffect 
          type={effect} 
          onComplete={() => handleEffectComplete(effect === 'yes')} 
        />
      )}
      <div className="question-card">
        <div className="question-emoji">{question.emoji}</div>
        <div className="question-category">{question.category}</div>
        <h2 className="question-text">{question.question}</h2>
        
        <div className="question-buttons">
          <Button type="yes" onClick={() => handleAnswer(true)}>
            ¡Sí! 💕
          </Button>
          <Button type="no" onClick={() => handleAnswer(false)}>
            No 😢
          </Button>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;