import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from '../components/UI/PrimaryButton';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Всі поля обов'язкові!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Паролі не співпадають!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users_db')) || [];

    const userExists = existingUsers.find(u => u.email === email);
    if (userExists) {
        alert("Користувач з таким email вже існує!");
        return;
    }
    const newUser = { email, password };
    existingUsers.push(newUser);

    localStorage.setItem('users_db', JSON.stringify(existingUsers));
    
    login(email);
    navigate('/'); 
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ padding: '10px' }}
        />
        <PrimaryButton type="submit">Sign Up</PrimaryButton>
      </form>
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default SignUpPage;