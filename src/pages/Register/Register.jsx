import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import TextInput from '../../components/TextInput/TextInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { registerUser } from '../../redux/thunks/authThunks';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Reader');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password, role }));
  };

  return (
    <div>
      <Navbar isLoggedIn={false} isLoginPage={false} isRegisterPage={true} />
      <div className="register-container">
        <h2 className="register-header">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <TextInput
            id="username"
            label="Username:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <SelectInput
            id="role"
            label="Role:"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { value: 'Reader', label: 'Reader' },
              { value: 'Creator', label: 'Creator' },
            ]}
          />
          {error && <ErrorMessage message={error} />}
          <button type="submit" className="register-button" disabled={status === 'loading'}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
