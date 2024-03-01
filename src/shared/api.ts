export const API = {
  AUTH_STRING: {
    PASSWORD: 'Valantis',
    TIMESTAMP: new Date().toISOString().split('T')[0].replace(/-/g, ''),
  },
  METHODS: {
    GET_IDS: 'get_ids',
    GET_ITEMS: 'get_items',
    GET_FILTERED_ITEMS: 'filter',
  },
  PAGINATION: { DEFAULT_PAGE: 1, LIMIT: 50 },
  ERROR_MESSAGE: 'An error occurred, try again',
};
