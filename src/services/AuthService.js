import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// 🔐 Fonction pour s'inscrire
export const register = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return "Compte créé avec succès !";
  } catch (error) {
    return error.message;
  }
};

// 🔑 Fonction pour se connecter
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "Connexion réussie !";
  } catch (error) {
    return error.message;
  }
};

// 🚪 Fonction pour se déconnecter
export const logout = async () => {
  try {
    await signOut(auth);
    return "Déconnexion réussie !";
  } catch (error) {
    return error.message;
  }
};
