import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCuL5azFBmpASJKP_aAwkecSfodQU6Cse8',
  authDomain: 'color-palette-generator-95cb9.firebaseapp.com',
  projectId: 'color-palette-generator-95cb9',
  storageBucket: 'color-palette-generator-95cb9.firebasestorage.app',
  messagingSenderId: '515891411497',
  appId: '1:515891411497:web:e6b7e473a922a5d4f83a38',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth con persistencia
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializar Firestore
const db = getFirestore(app);

export { auth, db };
export default app;
