import React, { useState } from 'react';
import { firebase } from '../config/firebaseConfig'; // Firebase config

export default function HabitsScreen() {
  const [habit, setHabit] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addHabit = async () => {
    try {
      if (habit) {
        const user = firebase.auth().currentUser;
        await firebase.firestore().collection('habits').add({
          habit: habit,
          userId: user.uid,  // Associe l'habitude à l'utilisateur connecté
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setSuccessMessage('Habitude ajoutée avec succès !');
        setHabit('');
      } else {
        setErrorMessage('Veuillez entrer une habitude');
      }
    } catch (error) {
      setErrorMessage('Erreur : ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ajouter une habitude</h2>
      <input
        type="text"
        placeholder="Nom de l'habitude"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px' }}
      />
      <br />
      <button onClick={addHabit} style={{ padding: '10px', margin: '5px' }}>
        Ajouter
      </button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
