import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { expect, test, vi } from 'vitest';
import Navbar from '../Navbar';
import { logout } from '../../../redux/slices/authSlice';

vi.mock('../../../redux/slices/authSlice', () => ({
  logout: () => ({ type: 'logout' }),
}));

const mockStore = configureStore([]);
const renderWithProviders = (ui, { store }) => {
  return render(
    <Provider store={store}>
      <Router>
        {ui}
      </Router>
    </Provider>
  );
};

test('renders Navbar with correct links when not logged in', () => {
  const store = mockStore({});
  const { getByText } = renderWithProviders(<Navbar isLoggedIn={false} isLoginPage={false} isRegisterPage={false} />, { store });

  expect(getByText('Login')).toBeInTheDocument();
  expect(getByText('Register')).toBeInTheDocument();
});

test('renders Navbar with correct links when on login page', () => {
  const store = mockStore({});
  const { getByText, queryByText } = renderWithProviders(<Navbar isLoggedIn={false} isLoginPage={true} isRegisterPage={false} />, { store });

  expect(getByText('Register')).toBeInTheDocument();
  expect(queryByText('Login')).not.toBeInTheDocument();
});

test('renders Navbar with correct links when on register page', () => {
  const store = mockStore({});
  const { getByText, queryByText } = renderWithProviders(<Navbar isLoggedIn={false} isLoginPage={false} isRegisterPage={true} />, { store });

  expect(getByText('Login')).toBeInTheDocument();
  expect(queryByText('Register')).not.toBeInTheDocument();
});

test('renders Navbar with correct links when logged in', () => {
  const store = mockStore({});
  const { getByText } = renderWithProviders(<Navbar isLoggedIn={true} isLoginPage={false} isRegisterPage={false} />, { store });

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('Logout')).toBeInTheDocument();
});

test('calls logout when logout button is clicked', () => {
  const store = mockStore({});
  const { getByText } = renderWithProviders(<Navbar isLoggedIn={true} isLoginPage={false} isRegisterPage={false} />, { store });

  fireEvent.click(getByText('Logout'));
  expect(store.getActions()).toEqual([{ type: 'logout' }]);
});
