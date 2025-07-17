import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isLoggedIn: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setLoginState(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { login, logout, setLoginState } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store; 