import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserType } from '../../types/User';

const API = '/api';
// const API = 'https://solo-project-blog-back.onrender.com';
// const API = 'http://localhost:8080';

export const logIn = createAsyncThunk(
  'user/logIn',
  async (user: { username: string; password: string }, thunkAPI) => {
    const { username, password } = user;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post<string>(`${API}/auth/login`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await axios.get<UserType | undefined>(`${API}/auth/user`, {
    withCredentials: true,
  });
  return response.data;
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (
    user: {
      username: string;
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<string>(`${API}/auth/register`, user, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
