import axios from 'axios';

const BASE_URL = 'http://localhost:8800/api/';

const TOKEN =
  JSON.parse(localStorage.getItem('persist:root'))?.user &&
  JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user)
    .currentUser &&
  JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user).currentUser
    ?.token
    ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
        .currentUser.token
    : null;

console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export const userFormRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'multipart/form-data',
  },
});
