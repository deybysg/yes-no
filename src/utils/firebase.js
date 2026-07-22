import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACkSnuFIG5nrgZkyY6e-nEntHIv1hdMFE",
  authDomain: "yes-no-bf0a9.firebaseapp.com",
  projectId: "yes-no-bf0a9",
  storageBucket: "yes-no-bf0a9.firebasestorage.app",
  messagingSenderId: "944941621849",
  appId: "1:944941621849:web:3e0a76d90fc200b1574748"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

export default app;