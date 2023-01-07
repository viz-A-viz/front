import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/User';
import { getUser } from '../actionCreators/usersActions';

interface UserState {
  user: UserType | undefined;
}

const initialState: UserState = {
  user: undefined,
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default usersSlice.reducer;
