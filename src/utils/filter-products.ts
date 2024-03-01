import { IProductItem } from '../models/product-items';

export function filterProducts(data: IProductItem[]) {
  const obj: Record<string, string[]> = {};
  return data?.filter((item) => {
    obj[item.id] ? obj[item.id].push(item.id) : (obj[item.id] = [item.id]);
    return obj[item.id].length > 1 ? false : true;
  });
}
