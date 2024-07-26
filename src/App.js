import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');

    if (token && email && role && userId) {
      dispatch(loginSuccess({ token, email, role, userId }));
    }
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
