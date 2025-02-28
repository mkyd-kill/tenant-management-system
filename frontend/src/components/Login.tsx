import React, { useState } from 'react';
import { login } from '../services/api';
import { toast } from 'react-toastify';
import '../styles/TenantForm.css'; // Reuse form styles

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast.success('Logged in successfully!');
      onLogin();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form className="tenant-form" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;