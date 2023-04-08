import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/auth';
import { Credentials, Registration } from '../../types/auth';
import { login, register } from './authAPI';
import { RootState } from '../../app/store';

export interface AuthState {
  login: {
    value: LoginResponse | undefined,
    status: 'idle' | 'loading' | 'failed';
    isLogged: boolean;
  },
  register: {
    value: LoginResponse | undefined,
    status: 'idle' | 'loading' | 'failed';
  },
  loginModal: {
    value: boolean
  },
  registerModal: {
    value: boolean
  }
}

const initialState: AuthState = {
  login: {
    value: undefined,
    status: 'idle',
    isLogged: false,
  },
  register: {
    value: undefined,
    status: 'idle',
  },
  loginModal: {
    value: false,
  },
  registerModal: {
    value: false,
  }
};

export const authRegister = createAsyncThunk(
  'auth/register',
  async (body: Registration) => {
    const response = await register(body);
    return response;
  }
);

export const authLogin = createAsyncThunk(
  'auth/login',
  async (body: Credentials) => {
    const response = await login(body.username, body.password);
    return response;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showLoginModal: (state, action: PayloadAction<boolean>) => {
      state.loginModal.value = action.payload;
    },
    showRegisterModal: (state, action: PayloadAction<boolean>) => {
      state.registerModal.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state) => {
        state.register.status = 'loading';
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.register.status = 'idle';
        state.register.value = action.payload;
        // close modal if successful
        state.registerModal.value = false;
        // save token to local storage if successful
        localStorage.setItem("authToken", action.payload.token);
        state.login.isLogged = true;
      })
      .addCase(authRegister.rejected, (state) => {
        state.register.status = 'failed';
        state.login.isLogged = false;
      })
      .addCase(authLogin.pending, (state) => {
        state.login.status = 'loading';
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.login.status = 'idle';
        state.login.isLogged = true;
        // close modal if successful
        state.loginModal.value = false;
        state.login.value = action.payload;
        // save token to local storage if successful
        localStorage.setItem("authToken", action.payload.token);
      })
      .addCase(authLogin.rejected, (state) => {
        state.login.status = 'failed';
        state.login.isLogged = false;
      });
  },
});

export const { showLoginModal, showRegisterModal } = authSlice.actions;

export const isLoginModalOpen = (state: RootState) => state.auth.loginModal.value;
export const isRegisterModalOpen = (state: RootState) => state.auth.registerModal.value;

export const authLoginStatus = (state: RootState) => state.auth.login.status;
export const authLoginIsLogged = (state: RootState) => state.auth.login.isLogged;
export const authRegisterStatus = (state: RootState) => state.auth.register.status;

export default authSlice.reducer;
