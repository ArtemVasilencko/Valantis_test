import md5 from 'md5';
import { API } from '../shared/api';

export async function getProductItems(selectIds: string[]) {
  const authString = md5(`${API.AUTH_STRING.PASSWORD}_${API.AUTH_STRING.TIMESTAMP}`);
  const response = await fetch('http://api.valantis.store:40000/', {
    method: 'POST',
    headers: { 'X-Auth': authString, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: API.METHODS.GET_ITEMS,
      params: { ids: selectIds },
    }),
  });
  const data = await response.json();
  return data.result;
}
