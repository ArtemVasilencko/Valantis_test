import { createSlice } from '@reduxjs/toolkit';

interface PaginationState {
  page: number;
  pageCount: number;
}

const initialState: PaginationState = {
  page: 1,
  pageCount: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setActivePage(state, action) {
      state.page = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
  },
});

export const { setActivePage, setPageCount } = paginationSlice.actions;
export default paginationSlice.reducer;
