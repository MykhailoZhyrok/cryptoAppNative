// src/store/userSlice.js
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

interface UserState {
  user: User | null | RegisterParams;
  loading: boolean;
  isAuth: boolean;
  error: string | null;
}

interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  user: null,
  loading: false,
  isAuth: false,
  error: null,
};

interface LoginParams {
  username: string;
  password: string;
}

export const getUser = createAsyncThunk(
  'user/getUser',
  async (token: string) => {
    try {
      const response = await axios.get('https://dummyjson.com/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`, // Correct Authorization header format
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user data'); // Handle or throw specific error
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }: RegisterParams) => {
    const response = await axios.post('https://dummyjson.com/users/add', {
      username: name,
      email,
      password,
    });
    return response.data;
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ username, password }: LoginParams) => {
    console.log('fetchUser params:', { username, password });
    const response = await axios.post('https://dummyjson.com/auth/login', {
      username,
      password,
    });
    return response.data;
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.isAuth = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch user';
        
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to register user';
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to register user';
      });

  },
});
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
