import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsSlice from './reducers/postsSlice';
import usersSlice from './reducers/usersSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    user: usersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
