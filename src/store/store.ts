import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/products-slice';
import paginationReducer from './reducers/pagination-slice';
import statusReducer from './reducers/status-slice';

const rootReducer = combineReducers({
  products: productsReducer,
  pagination: paginationReducer,
  status: statusReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
