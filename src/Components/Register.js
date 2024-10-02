import React, { useState } from 'react';
import { database, ref, set } from '../firebase'; // Ensure 'set' is imported

const Register = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (userId && password) {
      try {
        // Save the user credentials in the database
        await set(ref(database, `users/${userId}`), {
          password: password,
        });
        alert('Registration successful');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div>
        <div className="form-container">
      <h2>Register</h2> 
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
      <button onClick={handleRegister}>Register</button>
      <p>Already Registered <a href='/'>Login</a></p>
    </div>
    
    </div>
  );
};

export default Register;
