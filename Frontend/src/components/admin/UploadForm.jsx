import React, { useState } from 'react';

const initialForm = {
  title: '',
  category: 'Logo',
  description: '',
  image: null,
};

function UploadForm({ onUpload, loading }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.title || !form.category || !form.description || !form.image) {
      setError('All fields are required, including image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('image', form.image);

    try {
      await onUpload(formData);
      setForm(initialForm);
      const input = document.getElementById('design-image');
      if (input) {
        input.value = '';
      }
    } catch (uploadError) {
      setError(uploadError?.response?.data?.message || uploadError.message || 'Upload failed');
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white/80 p-5">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Upload New Design</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Design title"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-cyan-500"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-cyan-500"
        >
          <option>Logo</option>
          <option>Branding</option>
          <option>Social Media</option>
          <option>Packaging</option>
          <option>Print</option>
          <option>UI/UX</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Short description"
          className="sm:col-span-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-cyan-500"
        />

        <input
          id="design-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="sm:col-span-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700"
        />

        {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
        >
          {loading ? 'Uploading...' : 'Upload Design'}
        </button>
      </form>
    </section>
  );
}

export default UploadForm;
