import axios from 'axios';

export default (host) => {

  return {
    login: (data) => axios.post(`${host}/auth/login`, data),
    register: (data) => axios.post(`${host}/auth/register`, data)
  }
}