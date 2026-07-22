import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import Results from './components/Results';
import LoginPanel from './components/LoginPanel';
import SecretPanel from './components/SecretPanel';
import NameInput from './components/NameInput';
import { questions } from './data/questions';
import { saveResponses, loadResponses, clearResponses } from './utils/localStorage';
import { generateSessionId, createSession, saveAnswer } from './utils/firestore';
import './styles/App.css';

// Vista para que ella responda
function GirlfriendView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [personName, setPersonName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  
  useEffect(() => {
    // Cargar nombre guardado
    const savedName = localStorage.getItem('personName');
    if (savedName) {
      setPersonName(savedName);
      setShowNameInput(false);
    }
    
    // Crear o recuperar sesión
    const existingSessionId = localStorage.getItem('sessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = generateSessionId();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
      createSession(newSessionId, savedName || '');
    }
    
    // Cargar respuestas guardadas
    const savedResponses = loadResponses();
    if (Object.keys(savedResponses).length > 0) {
      setResponses(savedResponses);
    }
  }, []);
  
  useEffect(() => {
    saveResponses(responses);
  }, [responses]);
  
  const handleNameSubmit = async (name) => {
    setPersonName(name);
    localStorage.setItem('personName', name);
    setShowNameInput(false);
    
    // Crear sesión con el nombre
    const newSessionId = generateSessionId();
    localStorage.setItem('sessionId', newSessionId);
    setSessionId(newSessionId);
    await createSession(newSessionId, name);
  };
  
  const handleAnswer = async (answer) => {
    const currentQuestion = questions[currentIndex];
    const newResponses = {
      ...responses,
      [currentQuestion.id]: answer
    };
    setResponses(newResponses);
    
    // Guardar en Firestore
    if (sessionId) {
      await saveAnswer(sessionId, currentQuestion.id, answer);
    }
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleSurprise = () => {
    const unansweredQuestions = questions.filter(q => !(q.id in responses));
    if (unansweredQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
      const randomQuestion = unansweredQuestions[randomIndex];
      const questionIndex = questions.findIndex(q => q.id === randomQuestion.id);
      setCurrentIndex(questionIndex);
    }
  };
  
  const handleRestart = () => {
    clearResponses();
    setResponses({});
    setCurrentIndex(0);
    setShowResults(false);
    setPersonName('');
    setShowNameInput(true);
    localStorage.removeItem('personName');
    
    // Crear nueva sesión
    const newSessionId = generateSessionId();
    localStorage.setItem('sessionId', newSessionId);
    setSessionId(newSessionId);
    createSession(newSessionId);
  };
  
  // Mostrar input de nombre primero
  if (showNameInput) {
    return <NameInput onSubmit={handleNameSubmit} />;
  }
  
  if (showResults) {
    return (
      <Results 
        responses={responses}
        questions={questions}
        onRestart={handleRestart}
        personName={personName}
      />
    );
  }
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>💕 Preguntas para {personName} 💕</h1>
        <p>Responde con el corazón</p>
      </header>
      
      <main className="app-main">
        <ProgressBar current={currentIndex + 1} total={questions.length} />
        <QuestionCard 
          question={questions[currentIndex]}
          onAnswer={handleAnswer}
          onSurprise={handleSurprise}
        />
      </main>
      
      <footer className="app-footer">
        <p>Hecho con ❤️ para ti</p>
      </footer>
    </div>
  );
}

// Panel secreto con autenticación
function SecretPanelAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('panelAuth', 'true');
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('panelAuth');
  };
  
  useEffect(() => {
    const auth = localStorage.getItem('panelAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  if (!isAuthenticated) {
    return <LoginPanel onLogin={handleLogin} />;
  }
  
  return <SecretPanel onLogout={handleLogout} />;
}

// App principal con rutas
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/preguntas" replace />} />
        <Route path="/preguntas" element={<GirlfriendView />} />
        <Route path="/panel" element={<SecretPanelAuth />} />
      </Routes>
    </Router>
  );
}

export default App;