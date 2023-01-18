import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../http/index';
import { UserType } from '../../types/User';

export const logIn = createAsyncThunk(
  'user/logIn',
  async (user: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await $api.post<UserType>(`/auth/login`, user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await $api.get<UserType | undefined>(`/auth/user`);
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
      const response = await $api.post<UserType>(`/auth/register`, user);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
