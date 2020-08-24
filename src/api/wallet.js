import getApi from './index';

export default () => {
  const api = getApi();

  return {
    get: (options) => api.get("wallet", options),
    addAsset: (data, options) => api.post('wallet/add', data, options),
  }
}