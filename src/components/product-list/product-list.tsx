import { Grid } from '@mui/material';
import ProductItem from './product-item/product-item';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { getIds } from '../../api/get-ids';
import { getProductItems } from '../../api/get-product-items';
import { CLASSES } from '../../shared/classes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIdList, setProducts } from '../../store/reducers/products-slice';
import { filterProducts } from '../../utils/filter-products';
import { setIsErrorIds, setIsErrorItems, setIsLoading } from '../../store/reducers/status-slice';
import { API } from '../../shared/api';
import { setPageCount } from '../../store/reducers/pagination-slice';
import './product-list.css';

function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.productsList);
  const idList = useAppSelector((state) => state.products.idList);
  const page = useAppSelector((state) => state.pagination.page);
  const { isLoading, isErrorItems, isErrorIds } = useAppSelector((state) => state.status);

  useEffect(() => {
    async function getIdsAndUpdateState() {
      try {
        const data = await getIds();
        dispatch(setIdList(data));
        dispatch(setPageCount(Math.ceil(data.length / API.PAGINATION.LIMIT)));
      } catch (error) {
        console.log(error);
        console.log(API.ERROR_ITEMS_REQUEST);
        dispatch(setIsErrorIds(!isErrorIds));
      }
    }
    getIdsAndUpdateState();
  }, [isErrorIds]);

  useEffect(() => {
    if (!idList || !idList.length) return;
    async function getProductItemsAndUpdateState() {
      try {
        dispatch(setIsLoading(true));
        const data = await getProductItems(
          idList.slice(
            page * API.PAGINATION.LIMIT - API.PAGINATION.LIMIT,
            page * API.PAGINATION.LIMIT
          )
        );
        toast.dismiss();
        dispatch(setProducts(filterProducts(data)));
      } catch (error) {
        console.log(error);
        console.log(API.ERROR_ITEMS_REQUEST);
        toast.error(API.ERROR_ITEMS_REQUEST);
        dispatch(setIsErrorItems(!isErrorItems));
      } finally {
        dispatch(setIsLoading(false));
      }
    }
    getProductItemsAndUpdateState();
  }, [page, idList, isErrorItems]);

  if (isLoading) return;

  return (
    <Grid container spacing={2} className={CLASSES.PRODUCT_LIST.WRAPPER} display="block">
      {products?.map((item) => (
        <Grid key={item.id} item xs={12}>
          <ProductItem name={item.product} price={item.price} brand={item.brand} id={item.id} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
