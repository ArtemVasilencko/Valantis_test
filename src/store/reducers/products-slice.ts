import { createSlice } from '@reduxjs/toolkit';
import { IProductItem } from '../../models/product-items';

interface ProductsState {
  productsList: IProductItem[];
  idList: string[];
}

const initialState: ProductsState = {
  productsList: [],
  idList: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.productsList = action.payload;
    },
    setIdList(state, action) {
      state.idList = action.payload;
    },
  },
});

export const { setProducts, setIdList } = productsSlice.actions;
export default productsSlice.reducer;
