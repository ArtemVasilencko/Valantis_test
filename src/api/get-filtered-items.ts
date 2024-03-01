import md5 from 'md5';
import { API } from '../shared/api';
import { IFilterItems } from '../models/filter-items';

export async function getFilteredItems(filters: IFilterItems) {
  const authString = md5(`${API.AUTH_STRING.PASSWORD}_${API.AUTH_STRING.TIMESTAMP}`);
  const response = await fetch('http://api.valantis.store:40000/', {
    method: 'POST',
    headers: { 'X-Auth': authString, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: API.METHODS.GET_FILTERED_ITEMS,
      params: filters,
    }),
  });
  const data = await response.json();
  return data.result;
}
