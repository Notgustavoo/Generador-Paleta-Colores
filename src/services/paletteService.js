import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Guardar una paleta en Firestore
export const savePalette = async (paletteData, imageName = 'Mi paleta') => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const paletteDoc = {
      userId: user.uid,
      userName: user.displayName || 'Usuario',
      name: imageName,
      colors: paletteData,
      createdAt: serverTimestamp(),
      imageCount: paletteData.length,
    };

    const docRef = await addDoc(collection(db, 'palettes'), paletteDoc);
    console.log('Paleta guardada con ID:', docRef.id);

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    console.error('Error al guardar paleta:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Obtener paletas guardadas del usuario
export const getUserPalettes = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const q = query(
      collection(db, 'palettes'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const palettes = [];

    querySnapshot.forEach((doc) => {
      palettes.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return {
      success: true,
      palettes: palettes,
    };
  } catch (error) {
    console.error('Error al obtener paletas:', error);
    return {
      success: false,
      error: error.message,
      palettes: [],
    };
  }
};

// Eliminar una paleta
export const deletePalette = async (paletteId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    await deleteDoc(doc(db, 'palettes', paletteId));

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error al eliminar paleta:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
