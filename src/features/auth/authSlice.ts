import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { Credentials, Registration } from '../../types/auth';
import { login, register } from './authAPI';
import { RootState } from '../../app/store';

export interface AuthState {
  login: {
    value: User | undefined,
    status: 'idle' | 'loading' | 'failed';
  },
  register: {
    value: User | undefined,
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
    console.log("response", response);
    const { token } = response;
    localStorage.setItem("authToken", token);
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
      })
      .addCase(authRegister.rejected, (state) => {
        state.register.status = 'failed';
      })
      .addCase(authLogin.pending, (state) => {
        state.login.status = 'loading';
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.login.status = 'idle';
        // state.login.value = action.payload;
      })
      .addCase(authLogin.rejected, (state) => {
        state.login.status = 'failed';
      });
  },
});

export const { showLoginModal, showRegisterModal } = authSlice.actions;

export const isLoginModalOpen = (state: RootState) => state.auth.loginModal.value;
export const isRegisterModalOpen = (state: RootState) => state.auth.registerModal.value;

export const authLoginStatus = (state: RootState) => state.auth.login.status;
export const authRegisterStatus = (state: RootState) => state.auth.register.status;

export default authSlice.reducer;
