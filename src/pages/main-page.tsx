import { Box, Button, LinearProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ProductFilter from '../components/product-filter/product-filter';
import ProductList from '../components/product-list/product-list';
import { CLASSES } from '../shared/classes';
import { useAppSelector } from '../hooks/redux';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

function MainPage() {
  const isLoading = useAppSelector((state) => state.status.isLoading);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box className={CLASSES.MAIN_PAGE}>
      {isLoading && (
        <Box sx={{ width: '100%', position: 'absolute' }}>
          <LinearProgress />
        </Box>
      )}
      <Toaster />
      <Button
        className={CLASSES.APP.FILTER_BTN}
        variant="contained"
        size="small"
        sx={{ position: 'absolute', zIndex: '5' }}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Box className={CLASSES.APP.WRAPPER}>
        <ProductFilter
          className={
            isOpen
              ? `${CLASSES.PRODUCT_FILTER.WRAPPER_ACTIVE} ${CLASSES.PRODUCT_FILTER.WRAPPER}`
              : CLASSES.PRODUCT_FILTER.WRAPPER
          }
        />
        <ProductList />
      </Box>
    </Box>
  );
}

export default MainPage;
