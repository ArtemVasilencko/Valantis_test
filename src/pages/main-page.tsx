import { Box, Button, LinearProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ProductFilter from '../components/product-filter/product-filter';
import ProductList from '../components/product-list/product-list';
import { CLASSES } from '../shared/classes';
import { useAppSelector } from '../hooks/redux';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect, useRef } from 'react';

function MainPage() {
  const isLoading = useAppSelector((state) => state.status.isLoading);
  const [isOpen, setIsOpen] = useState(false);
  const productFilterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productFilterRef.current && !productFilterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </Button>
      <Box className={CLASSES.APP.WRAPPER}>
        <div ref={productFilterRef}>
          <ProductFilter active={isOpen} />
        </div>
        <ProductList />
      </Box>
    </Box>
  );
}

export default MainPage;
