import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // your backend server URL
    withCredentials:true // 10 seconds timeout
})