import axios from 'axios';

const apiUrl = 'http://localhost:3000/';

export const axiosInstance = axios.create({
  baseURL: apiUrl,
});
