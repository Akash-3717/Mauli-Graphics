import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../../components/admin/UploadForm';
import DesignTable from '../../components/admin/DesignTable';
import { deleteDesign, getDesigns, uploadDesign } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchDesigns = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getDesigns();
      const list = Array.isArray(data) ? data : data?.designs || [];
      const normalized = list.map((item, index) => ({
        id: item._id || item.id || String(index),
        title: item.title || 'Untitled',
        category: item.category || 'Other',
        imageUrl: item.imageUrl || item.image || item.url || 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=300&q=80',
      }));
      setDesigns(normalized);
    } catch (fetchError) {
      setError(fetchError?.response?.data?.message || fetchError.message || 'Could not load design list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleUpload = async (formData) => {
    setUploading(true);
    setError('');
    setMessage('');

    try {
      await uploadDesign(formData);
      setMessage('Design uploaded successfully.');
      await fetchDesigns();
    } catch (uploadError) {
      setError(uploadError?.response?.data?.message || uploadError.message || 'Upload failed');
      throw uploadError;
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setError('');
    setMessage('');

    try {
      await deleteDesign(id);
      setDesigns((prev) => prev.filter((item) => item.id !== id));
      setMessage('Design deleted successfully.');
    } catch (deleteError) {
      setError(deleteError?.response?.data?.message || deleteError.message || 'Delete failed');
    } finally {
      setDeletingId('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
        >
          Logout
        </button>
      </div>

      {message && <p className="rounded-lg border border-emerald-300/60 bg-emerald-50 p-3 text-emerald-700">{message}</p>}
      {error && <p className="rounded-lg border border-red-300/60 bg-red-50 p-3 text-red-700">{error}</p>}

      <UploadForm onUpload={handleUpload} loading={uploading} />

      {loading ? (
        <p className="rounded-lg border border-slate-200 bg-white/75 p-4 text-slate-700">Loading dashboard data...</p>
      ) : (
        <DesignTable designs={designs} onDelete={handleDelete} deletingId={deletingId} />
      )}
    </section>
  );
}

export default Dashboard;
