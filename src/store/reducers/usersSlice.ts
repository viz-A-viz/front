import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/User';
import { getUser } from '../actionCreators/usersActions';

interface UserState {
  user: UserType | undefined;
  userIsLoading: boolean;
}

const initialState: UserState = {
  user: undefined,
  userIsLoading: true,
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.userIsLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userIsLoading = false;
    });
  },
});

export default usersSlice.reducer;
