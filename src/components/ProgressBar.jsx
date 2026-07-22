import './ProgressBar.css';

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>Pregunta {current} de {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;