import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminLogin() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login, setup, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'setup') {
        await setup({ email, password });
        setMessage('Owner account setup successful. Redirecting...');
      } else {
        await login({ email, password });
      }
      navigate('/admin/dashboard', { replace: true });
    } catch (loginError) {
      setError(loginError?.response?.data?.message || loginError.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white/80 p-6 sm:p-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Owner Access</h1>
      <p className="mb-6 text-slate-700">Setup first owner account once, then use login.</p>

      <div className="mb-5 grid grid-cols-2 rounded-lg border border-slate-300 bg-white p-1">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setError('');
            setMessage('');
          }}
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            mode === 'login' ? 'bg-cyan-500 text-slate-950' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('setup');
            setError('');
            setMessage('');
          }}
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            mode === 'setup' ? 'bg-cyan-500 text-slate-950' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          Setup
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Admin email"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-cyan-400"
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-cyan-400"
        />

        {message && <p className="text-sm text-emerald-700">{message}</p>}
        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (mode === 'setup' ? 'Setting up...' : 'Logging in...') : mode === 'setup' ? 'Setup Owner' : 'Login'}
        </button>
      </form>
    </section>
  );
}

export default AdminLogin;
