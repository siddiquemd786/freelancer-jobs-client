// src/pages/Login.jsx
import React from 'react';
import { useState } from 'react';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === 'admin@example.com' && password === '123456') {
        alert('Login successful!');
      } else {
        setError('Invalid email or password.');
      }
    }, 1000);
  };


    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-50 to-purple-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-semibold text-slate-800 mb-1 text-center">Welcome Back 👋</h2>
        <p className="text-slate-500 text-center mb-6">Sign in to access your account</p>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-slate-700">Password</label>
              <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-white transition-all duration-300 shadow-md focus:ring-2 focus:ring-indigo-300 ${
              loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-500 hover:opacity-90'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don’t have an account?{' '}
          <a href="#" className="text-indigo-600 hover:underline font-medium">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login