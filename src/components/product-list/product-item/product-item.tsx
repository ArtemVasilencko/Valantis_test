import { Paper, Typography } from '@mui/material';
import { CLASSES } from '../../../shared/classes';
import './product-item.css';

interface ProductItemProps {
  name: string;
  price: string;
  brand: string | null;
  id: string;
}

function ProductItem(props: ProductItemProps) {
  const { name, price, brand, id } = props;

  return (
    <Paper className={CLASSES.PRODUCT_ITEM.CARD}>
      <Typography variant="h6" className={CLASSES.PRODUCT_ITEM.NAME}>
        {name}
      </Typography>
      <Typography variant="body1">id: {id}</Typography>
      <Typography variant="body1">Бренд: {brand ? brand : ' Неизвестно'}</Typography>
      <Typography variant="body1" className={CLASSES.PRODUCT_ITEM.PRICE}>
        Цена: {price}₽
      </Typography>
    </Paper>
  );
}

export default ProductItem;
