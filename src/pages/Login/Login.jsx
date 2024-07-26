import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/thunks/authThunks';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div>
      <Navbar isLoggedIn={false} isLoginPage={true} />
      <div className="login-container">
        <h2 className="login-header">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <TextInput
            id="email"
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            id="password"
            label="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorMessage message={error} />}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
