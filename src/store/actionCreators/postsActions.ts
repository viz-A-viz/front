import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PostType } from '../../types/Post';

const API = 'https://solo-project-blog-back.onrender.com';

export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await axios.get<PostType[]>(`${API}/posts`);
  return response.data;
});

export const addPost = createAsyncThunk('posts/add', async () => {
  const response = await axios.post<PostType>(`${API}/posts`);
  return response.data;
});

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id: number) => {
    const response = await axios.delete<number>(`${API}/posts`, {
      data: { id },
    });
    return response.data;
  }
);

export const likePost = createAsyncThunk(
  'posts/like',
  async (userLike: { postId: number; userId: number }) => {
    const { postId, userId } = userLike;
    const response = await axios.post<string>(`${API}/posts/like`, {
      postId,
      userId,
    });
  }
);

export const unlikePost = createAsyncThunk(
  'posts/unlike',
  async (userLike: { postId: number; userId: number }) => {
    const { postId, userId } = userLike;
    const response = await axios.delete<string>(`${API}/posts/like`, {
      data: {
        postId,
        userId,
      },
    });
  }
);
