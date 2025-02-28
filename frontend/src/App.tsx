import React, { useState } from 'react';
import TenantList from './components/TenantList';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <h1>Tenant Management System</h1>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout} className="btn btn-primary" style={{ marginBottom: '20px' }}>
            Logout
          </button>
          <TenantList />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;