import getApi from './index';

export default (host, token) => {
  const api = getApi();

  return {
    getAll: (options) => api.get('price/all', options),
  }
}