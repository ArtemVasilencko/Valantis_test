import { Box, Button, Pagination, TextField, Typography } from '@mui/material';
import RadioGroupCustom from '../radio-group/radio-group';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../../shared/api';
import { CLASSES } from '../../shared/classes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setActivePage, setPageCount } from '../../store/reducers/pagination-slice';
import { getFilteredItems } from '../../api/get-filtered-items';
import { setIdList } from '../../store/reducers/products-slice';
import { getIds } from '../../api/get-ids';
import { FILTER_TYPES } from '../../shared/filter';
import './product-fitler.css';

interface ProductFilterProps {
  className: string;
}

function ProductFilter(props: ProductFilterProps) {
  const { className } = props;
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.pagination.page);
  const pageCount = useAppSelector((state) => state.pagination.pageCount);
  const [filterValue, setFilterValue] = useState('');
  const [filterType, setFilterType] = useState('product');

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setActivePage(value));
  };

  const resetFilters = async () => {
    if (!filterValue.length && page === API.PAGINATION.DEFAULT_PAGE)
      return toast.error('Фильтры не установлены');
    try {
      setFilterValue('');
      setFilterType(FILTER_TYPES.PRODUCT);
      const data = await getIds();
      dispatch(setIdList(data));
      dispatch(setActivePage(API.PAGINATION.DEFAULT_PAGE));
      dispatch(setPageCount(Math.ceil(data.length / API.PAGINATION.LIMIT)));
    } catch (error) {
      console.log(error);
      console.log('Произошла ошибка во время запроса items, пробуем еще раз');
      resetFilters();
    }
  };

  const getfilterItems = async () => {
    try {
      const data = await getFilteredItems({
        [filterType]: filterType === FILTER_TYPES.PRICE ? +filterValue : filterValue,
      });
      dispatch(setIdList(data));
      dispatch(setPageCount(Math.ceil(data.length / API.PAGINATION.LIMIT)));
      dispatch(setActivePage(API.PAGINATION.DEFAULT_PAGE));
    } catch (error) {
      console.log(error);
      console.log('Произошла ошибка во время запроса items, пробуем еще раз');
      getfilterItems();
    }
  };

  return (
    <Box className={className}>
      <Box className={CLASSES.PRODUCT_FILTER.HEADER}>
        <Typography className={CLASSES.PRODUCT_FILTER.TITLE} variant="h3">
          Фильтры
        </Typography>
        <Button variant="contained" onClick={resetFilters}>
          <CloseIcon />
        </Button>
      </Box>

      <RadioGroupCustom value={filterType} setValue={setFilterType} />

      <TextField
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        label="Введите значение"
        sx={{ mb: '25px', mt: '15px' }}
        fullWidth
      />

      <Button variant="contained" onClick={getfilterItems} sx={{ mb: '25px' }}>
        Применить фильтры
      </Button>
      <Pagination
        className={CLASSES.PRODUCT_FILTER.PAGINATION}
        onChange={handlePaginationChange}
        count={pageCount}
        page={page}
        size="small"
        color="primary"
      />
    </Box>
  );
}

export default ProductFilter;
