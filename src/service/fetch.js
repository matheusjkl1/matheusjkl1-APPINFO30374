import axios from 'axios';

export const apiUrl = 'http://localhost:3003';

export const api = axios.create({
  baseURL: apiUrl,
});
