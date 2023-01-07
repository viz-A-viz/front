import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserType } from '../../types/User';

export const logIn = createAsyncThunk(
  'logIn',
  async (user: { username: string; password: string }, thunkAPI) => {
    const { username, password } = user;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post<string>('/auth/login', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await axios.get<UserType | undefined>('/auth/user');
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
      const response = await axios.post<string>('/auth/register', user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
