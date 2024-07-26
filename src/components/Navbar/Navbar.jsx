import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import './Navbar.css';

const Navbar = ({ isLoggedIn, isLoginPage, isRegisterPage }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="navbar bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">MyApp</Link>
      <div className="nav-links flex gap-4">
        {isLoginPage ? (
          <Link to="/register" className="block py-2 px-4 hover:bg-gray-700 rounded">Register</Link>
        ) : isRegisterPage ? (
          <Link to="/login" className="block py-2 px-4 hover:bg-gray-700 rounded">Login</Link>
        ) : isLoggedIn ? (
          <>
            <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded">Home</Link>
            <button onClick={handleLogout} className="block py-2 px-4 bg-red-500 hover:bg-red-700 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="block py-2 px-4 hover:bg-gray-700 rounded">Login</Link>
            <Link to="/register" className="block py-2 px-4 hover:bg-gray-700 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
