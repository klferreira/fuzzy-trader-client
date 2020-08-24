import getApi from "./index";

export default () => {
  const api = getApi();
  
  return {
    get: (options) => api.get("user", options),
  };
}
