import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3003',
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
