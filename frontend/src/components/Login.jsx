import { useState } from 'react';
import { login, registerUser } from '../api/client';

export default function Login({ onSuccess }) {
  const [mode, setMode] = useState('login'); // login | register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'register') {
        await registerUser(email, password);
      }
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page auth-screen">
      <div className="modal-card auth-card">
        <p className="page-header__eyebrow">Application Ledger</p>
        <h2 className="modal-card__title">
          {mode === 'login' ? 'Log in' : 'Create an account'}
        </h2>

        <form onSubmit={handleSubmit} className="form">
          <label className="field">
            <span className="field__label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
            />
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </label>

          {error && <p className="field-error">{error}</p>}

          <button type="submit" className="btn btn--primary" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Register'}
          </button>
        </form>

        <button
          type="button"
          className="link-btn auth-card__switch"
          onClick={() => {
            setMode((m) => (m === 'login' ? 'register' : 'login'));
            setError('');
          }}
        >
          {mode === 'login' ? "Need an account? Register" : 'Already have an account? Log in'}
        </button>
      </div>
    </div>
  );
}
