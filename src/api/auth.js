import axios from 'axios';

export default (host) => {

  return {
    register: (data) => axios.post(`${host}/auth/register`, data)
  }
}