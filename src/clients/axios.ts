import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:4000/assistant',
});

export interface AxiosReponse<T> {
  data: T;
}

export default client;
