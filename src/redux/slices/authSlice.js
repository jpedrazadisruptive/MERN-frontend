import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
  role: null,
  userId: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.error = null;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.role = null;
      state.userId = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
