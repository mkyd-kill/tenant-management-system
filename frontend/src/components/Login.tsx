import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { login } from '../services/api';
import { toast } from 'react-toastify';
import '../styles/TenantForm.css';

interface LoginProps {
  onLogin: () => void;
}

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      await login(data.username, data.password);
      toast.success('Logged in successfully!');
      onLogin();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form className="tenant-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Login</h3>
      <div className="form-group">
        <label>Username</label>
        <input type="text" {...register('username')} />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;