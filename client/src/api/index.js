import axios from 'axios';
import Swal from 'sweetalert2';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend API URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercept requests to add the session token if it exists
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire('خطاً', 'حدث خطأ يرجى تسجيل الدخول', 'error');
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      Swal.fire('خطاً', error?.response?.data?.message, 'error');
    }
    return Promise.reject(error);
  }
);

// Define your API functions here
export const getDaily = async () => {
  const response = await api.get('/daily');
  return response.data;
};

// export const loginUser = async (email, password) => {
//   const response = await api.post('/auth/login', { email, password });
//   const { token } = response.data;
//   sessionStorage.setItem('token', token);
//   return response.data;
// };

// export const logoutUser = () => {
//   sessionStorage.removeItem('token');
//   window.location.href = '/login';
// };

// Export the api object for use in other files
export default api;
