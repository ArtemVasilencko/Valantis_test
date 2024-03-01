import { createSlice } from '@reduxjs/toolkit';

interface StatusState {
  isLoading: boolean;
  isErrorItems: boolean;
  isErrorIds: boolean;
}

const initialState: StatusState = {
  isLoading: true,
  isErrorItems: false,
  isErrorIds: false,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsErrorItems(state, action) {
      state.isErrorItems = action.payload;
    },
    setIsErrorIds(state, action) {
      state.isErrorIds = action.payload;
    },
  },
});

export const { setIsLoading, setIsErrorItems, setIsErrorIds } = statusSlice.actions;
export default statusSlice.reducer;
