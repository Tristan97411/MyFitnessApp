import React, { useState } from 'react';
import { firebase } from '../config/firebaseConfig'; // Importation de la config Firebase

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    firebase.auth().signOut();
    setUser(null);
  };

  // Suivi de l'utilisateur connecté
  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  return (
    <div style={{ padding: '20px' }}>
      {user ? (
        <div>
          <h2>Bienvenue, {user.email}</h2>
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <div>
          <h2>Connexion</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', marginBottom: '10px' }}
          />
          <br />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button onClick={handleLogin} style={{ padding: '10px', margin: '5px' }}>
            Se connecter
          </button>
          <button onClick={handleSignup} style={{ padding: '10px', margin: '5px' }}>
            S'inscrire
          </button>
        </div>
      )}
    </div>
  );
}
