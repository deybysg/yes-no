import { useEffect, useState } from 'react';
import './AnswerEffect.css';

function AnswerEffect({ type, onComplete }) {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = [];
    const count = type === 'yes' ? 15 : 10;
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        emoji: type === 'yes' 
          ? ['💕', '💖', '💗', '💘', '❤️', '✨', '🌟'][Math.floor(Math.random() * 7)]
          : ['😢', '💔', '😭', '😔', '🥺'][Math.floor(Math.random() * 5)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1
      });
    }
    
    setParticles(newParticles);
    
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [type, onComplete]);
  
  return (
    <div className={`effect-container effect-${type}`}>
      <div className="effect-emoji">
        {type === 'yes' ? '💕' : '😢'}
      </div>
      <div className="effect-text">
        {type === 'yes' ? '¡Me hace tan feliz!' : 'Duele un poco...'}
      </div>
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        >
          {particle.emoji}
        </span>
      ))}
    </div>
  );
}

export default AnswerEffect;