import axios from 'axios';

const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && ['localhost', '127.0.0.1'].includes(window.location.hostname);

// In production, prefer explicit API URL via env. Fallback to /api for reverse-proxy setups.
const baseURL = configuredBaseUrl || (isLocalhost ? 'http://localhost:3003' : '/api');

const api = axios.create({
  baseURL,
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.message === 'Network Error') {
      error.message = `Network Error: cannot reach API at ${baseURL}. Set VITE_API_BASE_URL to your backend URL (example: https://your-backend-domain.com).`;
    }
    return Promise.reject(error);
  }
);

export async function getDesigns() {
  const response = await api.get('/design/all');
  return response.data;
}

export async function loginAdmin(payload) {
  const response = await api.post('/admin/login', payload);
  return response.data;
}

export async function setupAdmin(payload) {
  const response = await api.post('/admin/setup', payload);
  return response.data;
}

export const adminLogin = loginAdmin;

export async function uploadDesign(formData) {
  const response = await api.post('/design/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function deleteDesign(id) {
  const response = await api.delete(`/design/delete/${id}`);
  return response.data;
}

export default api;
