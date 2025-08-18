import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/welcome');
    } catch (error) {
      console.error('Error logging in', error);
      setErrorMessage('Invalid email or password');
    }
  };

  const wrapperStyle = {
    height: '100vh',
    width: '100vw',
    backgroundImage: "url('/background.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',   // Fix background to viewport
    imageRendering: 'auto',          // Control image rendering (try 'pixelated' if needed)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    width: '400px',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // translucent white background
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '95%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  };

  const linkStyle = {
    marginTop: '15px',
    display: 'block',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={inputStyle}
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
        {errorMessage && <div style={errorStyle}>{errorMessage}</div>}
        <p style={linkStyle}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
