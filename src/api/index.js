import axios from "axios";
import { store } from '../store';

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://bxb-fuzzy-trader.herokuapp.com"
    : "http://localhost:4000";

const api = () => {
  const { auth: { token } } = store.getState();

  const get = (endpoint, options) => {
    return axios.get(`${apiUrl}/${endpoint}`, {
      ...options,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  const post = (endpoint, data, options) => {
    return axios.post(`${apiUrl}/${endpoint}`, data, {
      ...options,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  };

  return {
    get,
    post,
  };
};

export default api;
