import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { sort } from '../../lib/sortMethods';
import type { PostType } from '../../types/Post';
import {
  addPost,
  deletePost,
  fetchPosts,
} from '../actionCreators/postsActions';

interface PostsState {
  posts: PostType[];
  sortType: string;
  onlyMyPosts: boolean;
  showPost: number;
  page: number;
}

const initialState: PostsState = {
  posts: [],
  sortType: 'popularity',
  onlyMyPosts: false,
  showPost: 0,
  page: 1,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
    sortPosts: (state) => {
      state.posts = sort(state.posts, state.sortType);
    },
    toggleOnlyMyPosts: (state) => {
      state.onlyMyPosts = !state.onlyMyPosts;
    },
    showAllPosts: (state) => {
      state.onlyMyPosts = false;
      state.showPost = 0;
    },
    showOnePost: (state, action: PayloadAction<number>) => {
      state.showPost = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      _.remove(state.posts, (post) => post.id === action.payload);
    });
  },
});

export const {
  setSortType,
  toggleOnlyMyPosts,
  sortPosts,
  showAllPosts,
  showOnePost,
  setPage,
} = postsSlice.actions;

export default postsSlice.reducer;
