import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      console.log(email, password);
      const response = await axios.post(
        'http://localhost:3000/api/v1/register',
        {
          email,
          password,
        }
      );
      console.log('Register Response:', response.data);
      if (response.data.message === 'Registration successful.') {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <h2>Register</h2>
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
          <div className='auth-input'>
            <input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className='auth-button' type='submit'>
            Register
          </button>
        </form>
        <div className='auth-footer'>
          <span>Already have an account? </span>
          <a onClick={() => navigate('/login')}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
