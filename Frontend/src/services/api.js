import axios from 'axios';

const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const localApiOrigin = 'http://localhost:3003';
const productionApiOrigin = 'https://mauli-graphics-3.onrender.com';

// In production, prefer an explicit backend URL to avoid proxy latency/timeouts.
const baseURL = configuredBaseUrl || (isLocalhost ? localApiOrigin : productionApiOrigin);

export function normalizeDesignImageUrl(rawUrl = '') {
  const value = String(rawUrl || '').trim();

  if (!value) return '';

  if (/^https?:\/\//i.test(value)) {
    return value.replace(/^http:\/\//i, 'https://');
  }

  const normalizedPath = value.replace(/^\/+/, '');
  if (normalizedPath.startsWith('uploads/')) {
    return `${isLocalhost ? localApiOrigin : productionApiOrigin}/${normalizedPath}`;
  }

  return value;
}

const api = axios.create({
  baseURL,
  timeout: 120000,
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
  try {
    const response = await api.get('/design/all');
    return response.data;
  } catch (error) {
    const isTimeout = error?.code === 'ECONNABORTED' || /timeout/i.test(error?.message || '');

    if (!isTimeout || error?.config?._retried) {
      throw error;
    }

    error.config._retried = true;
    const retryResponse = await api.request(error.config);
    return retryResponse.data;
  }
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
