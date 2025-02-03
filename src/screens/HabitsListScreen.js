import React, { useState, useEffect } from 'react';
import { firebase } from '../config/firebaseConfig'; // Firebase config

export default function HabitsListScreen() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const user = firebase.auth().currentUser;
      const habitSnapshot = await firebase
        .firestore()
        .collection('habits')
        .where('userId', '==', user.uid)  // Filtrer par utilisateur
        .get();

      const habitList = habitSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabits(habitList);
    };

    fetchHabits();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Liste de mes habitudes</h2>
      {habits.length === 0 ? (
        <p>Aucune habitude enregistrée.</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit.id}>{habit.habit}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
