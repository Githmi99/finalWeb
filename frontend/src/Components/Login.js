import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {
        username: email,
        password,
      });
      console.log('Login successful:', response.data);
      // Save the token to localStorage or state management
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(
        'Error logging in:',
        error.response ? error.response.data : error.message
      );
      alert(
        'Login failed: ' +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='auth-input'>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='auth-input'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='auth-button' type='submit'>
            Login
          </button>
        </form>
        <div className='auth-footer'>
          <span>Don't have an account? </span>
          <a onClick={() => navigate('/register')}>Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
