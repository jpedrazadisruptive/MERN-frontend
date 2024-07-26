import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess, loginFailure, setLoading } from '../slices/authSlice';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const loginUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    const { token } = response.data;
    const { email } = userData;

    const decodedToken = jwtDecode(token);
    const { userId, role } = decodedToken;

    dispatch(loginSuccess({ token, email, role, userId }));
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
    toast.success('Login successful');
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'An error occurred';
    dispatch(loginFailure(errorMessage));
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.post(`${API_URL}/auth/register`, userData);
    toast.success('Registration successful');
    dispatch(setLoading(false));
    window.location.href = '/login';
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'An error occurred';
    dispatch(loginFailure(errorMessage));
    toast.error(errorMessage);
    dispatch(setLoading(false));
  }
};
