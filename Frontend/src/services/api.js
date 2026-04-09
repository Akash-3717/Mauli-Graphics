import axios from 'axios';

const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const localApiOrigin = 'http://localhost:3003';
const productionApiOrigin = 'https://mauli-graphics-2.onrender.com';
const productionFallbackApiOrigin = 'https://mauli-graphics-3.onrender.com';

// In production, prefer an explicit backend URL to avoid proxy latency/timeouts.
const baseURL = configuredBaseUrl || (isLocalhost ? localApiOrigin : productionApiOrigin);

const getApiOrigin = () => {
  try {
    return new URL(baseURL).origin;
  } catch {
    return baseURL.replace(/\/$/, '');
  }
};

const apiOrigin = getApiOrigin();

const getUploadsOrigin = () => {
  if (configuredBaseUrl) {
    return apiOrigin;
  }

  if (isLocalhost) {
    return localApiOrigin;
  }

  return isBrowser ? window.location.origin.replace(/\/$/, '') : '';
};

export function normalizeDesignImageUrl(rawUrl = '') {
  const value = String(rawUrl || '').trim();

  if (!value) return '';

  if (/^https?:\/\//i.test(value)) {
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(value)) {
      return value;
    }

    return value.replace(/^http:\/\//i, 'https://');
  }

  const normalizedPath = value.replace(/\\/g, '/').replace(/^\/+/, '');
  if (normalizedPath.startsWith('uploads/')) {
    const uploadsOrigin = getUploadsOrigin();
    return uploadsOrigin ? `${uploadsOrigin}/${normalizedPath}` : `/${normalizedPath}`;
  }

  return normalizedPath;
}

const api = axios.create({
  baseURL,
  timeout: 120000,
});

const canFailoverToFallback = !isLocalhost && !configuredBaseUrl;
const failoverBaseUrl = productionFallbackApiOrigin;

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
  async (error) => {
    const isNetworkError = error?.message === 'Network Error';
    const alreadyRetried = Boolean(error?.config?._baseUrlFailedOver);

    if (isNetworkError && canFailoverToFallback && !alreadyRetried && api.defaults.baseURL !== failoverBaseUrl) {
      api.defaults.baseURL = failoverBaseUrl;
      error.config._baseUrlFailedOver = true;
      return api.request(error.config);
    }

    if (error?.message === 'Network Error') {
      error.message = `Network Error: cannot reach API at ${api.defaults.baseURL}. Set VITE_API_BASE_URL to your backend URL (example: https://your-backend-domain.com).`;
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
