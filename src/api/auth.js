import getApi from "./index";

export default () => {
  const api = getApi();
  
  return {
    login: (data) => api.post("auth/login", data),
    register: (data) => api.post("auth/register", data),
  };
}
