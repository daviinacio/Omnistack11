import axios from 'axios';

const configuration = {
  development: 'http://localhost:3333',
  production: 'https://omnistack11-di.herokuapp.com'
};

const api = axios.create({
  baseURL: configuration[process.env.NODE_ENV || 'development']
});

export default api;
