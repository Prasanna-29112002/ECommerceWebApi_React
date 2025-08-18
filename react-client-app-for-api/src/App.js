// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import CategoryPage from './components/cards/Categories';
import CategoryService from './services/CategoryService';
import AuthService from './services/AuthService';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import CategoryPanel from './components/CategoryPanel';

function App() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);

  // On initial load, check token
  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      const user = AuthService.getUserFromToken(token);
      setUser(user);
    }
  }, []);

  // Fetch categories once user is logged in
  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getCategories();
      const data = response.data;
      const nonEmptyCategories = data.filter(cat => cat.items && cat.items.length > 0);
      setCategories(nonEmptyCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const token = await AuthService.login(email, password);
      const user = AuthService.getUserFromToken(token);
      setUser(user);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  const logout = () => {
    console.log("Logout called from App.js");
    AuthService.logout();
    setUser(null);
    setCategories([]);
  };

  const allItems = categories.flatMap(cat =>
    cat.items.map(item => ({
      ...item,
      categoryName: cat.name,
    }))
  );

  return (
    <Router>
      {user && allItems.length > 0 && (
        <div className="container mt-4">
          <h4 className="mb-3">All Items</h4>
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              padding: '10px',
              gap: '20px',
            }}
          >
            {allItems.map((item, index) => (
              <div
                key={index}
                style={{
                  minWidth: '200px',
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  textAlign: 'center',
                  flexShrink: 0,
                }}
              >
                <strong>{item.name}</strong>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>
                  Category: {item.categoryName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login login={login} /> : <Navigate to="/Welcome" />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Welcome" element={user ? <Welcome logout={logout} /> : <Navigate to="/login" />} />
        <Route path="/categories" element={user ? <CategoryPage /> : <Navigate to="/login" />} />
        <Route path="/adminpanel" element={<AdminPanel/>}/>
      <Route path="/categorypanel" element={<CategoryPanel/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
