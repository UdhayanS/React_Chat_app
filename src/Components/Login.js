import React, { useState, useEffect } from 'react';
import { database, ref, get } from '../firebase';

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [storedPassword, setStoredPassword] = useState('');

  const handleLogin = () => {
    if (userId && password === storedPassword) {
      onLogin(true);
    } else {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    const fetchCredentials = async () => {
      if (!userId) return; // Prevent fetching if userId is empty
      try {
        const userRef = ref(database, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setStoredPassword(snapshot.val().password);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching credentials:", error);
      }
    };

    fetchCredentials(); // Call the function
  }, [userId]); // Fetch credentials whenever userId changes

  return (
    <div className="form-container">
  <h2>Login</h2>
  <input
    type="text"
    value={userId}
    onChange={(e) => setUserId(e.target.value)}
    placeholder="User ID"
  />
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
  />
  <button onClick={handleLogin}>Login</button>
  <p>
    Don't have an account? <a href="/register">Register here</a>
  </p>
</div>
  );
};

export default Login;
