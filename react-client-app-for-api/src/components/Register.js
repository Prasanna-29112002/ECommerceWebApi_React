import React, { useState } from 'react';
import { registerUser } from '../services/UserService';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    role: '',
    shippingAddress: '',
    paymentDetails: '',
  });

  const navigate = useNavigate();
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif'
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '8px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '10px',
      marginTop: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    linkText: {
      marginTop: '10px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          style={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          style={styles.input}
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          style={styles.input}
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          style={styles.input}
          name="contactNumber"
          value={form.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <input
          style={styles.input}
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <input
          style={styles.input}
          name="shippingAddress"
          value={form.shippingAddress}
          onChange={handleChange}
          placeholder="Shipping Address"
          required
        />
        <input
          style={styles.input}
          name="paymentDetails"
          value={form.paymentDetails}
          onChange={handleChange}
          placeholder="Payment Details"
          required
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <p style={styles.linkText}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
