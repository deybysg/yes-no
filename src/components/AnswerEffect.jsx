import { useEffect, useState } from 'react';
import './AnswerEffect.css';

function AnswerEffect({ type, onComplete }) {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = [];
    const count = type === 'yes' ? 30 : 20;
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        emoji: type === 'yes' 
          ? ['💕', '💖', '💗', '💘', '❤️', '✨', '🌟', '💝', '💞', '💓'][Math.floor(Math.random() * 10)]
          : ['😢', '💔', '😭', '😔', '🥺', '😿', '💧', '🖤'][Math.floor(Math.random() * 8)],
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 1.5 + Math.random() * 1.5,
        size: 1.5 + Math.random() * 2
      });
    }
    
    setParticles(newParticles);
    
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [type, onComplete]);
  
  return (
    <div className={`effect-container effect-${type}`}>
      <div className="effect-bg"></div>
      <div className="effect-content">
        <div className="effect-emoji">
          {type === 'yes' ? '💕' : '😢'}
        </div>
        <div className="effect-text">
          {type === 'yes' ? '¡Me hace tan feliz!' : 'Duele un poco...'}
        </div>
        <div className="effect-subtext">
          {type === 'yes' ? '💖' : '💔'}
        </div>
      </div>
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`particle particle-${type}`}
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            fontSize: `${particle.size}rem`
          }}
        >
          {particle.emoji}
        </span>
      ))}
    </div>
  );
}

export default AnswerEffect;