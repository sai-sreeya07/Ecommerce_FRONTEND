import axios from 'axios';
export const API_BASE_URL="http://localhost:1010"
const jwt=localStorage.getItem("jwt");


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers:{
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json"
    }
  });
  
// const token = localStorage.getItem('jwt');

// api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// api.defaults.headers.post['Content-Type'] = 'application/json';