import React from 'react';
import TenantList from './components/TenantList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <h1>Tenant Management System</h1>
      <TenantList />
    </div>
  );
};

export default App;