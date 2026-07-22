import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createSession = async (sessionId, personName = '') => {
  try {
    const docRef = await addDoc(collection(db, 'responses'), {
      sessionId,
      personName,
      answers: {},
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creando sesión:', error);
    throw error;
  }
};

export const saveAnswer = async (sessionId, questionId, answer) => {
  try {
    const q = query(collection(db, 'responses'), where('sessionId', '==', sessionId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      const newDocRef = await addDoc(collection(db, 'responses'), {
        sessionId,
        answers: { [questionId]: answer },
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return true;
    }
    
    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, 'responses', document.id);
      const currentAnswers = document.data().answers || {};
      currentAnswers[questionId] = answer;
      
      await updateDoc(docRef, {
        answers: currentAnswers,
        updatedAt: serverTimestamp(),
        status: Object.keys(currentAnswers).length >= 7 ? 'completed' : 'pending'
      });
    });
    
    return true;
  } catch (error) {
    console.error('Error guardando respuesta:', error);
    throw error;
  }
};

export const getAllSessions = async () => {
  try {
    const q = query(collection(db, 'responses'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const sessions = [];
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() });
    });
    
    return sessions;
  } catch (error) {
    console.error('Error obteniendo sesiones:', error);
    throw error;
  }
};

export const getSessionById = async (sessionId) => {
  try {
    const q = query(collection(db, 'responses'), where('sessionId', '==', sessionId));
    const querySnapshot = await getDocs(q);
    
    let session = null;
    querySnapshot.forEach((doc) => {
      session = { id: doc.id, ...doc.data() };
    });
    
    return session;
  } catch (error) {
    console.error('Error obteniendo sesión:', error);
    throw error;
  }
};