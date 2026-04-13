import { useSettings, useTodos } from '../lib/store';
import { useState } from 'react';

export default function SettingsPage() {
  const { settings, updateName } = useSettings();
  const { resetTodos } = useTodos();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetTodos();
    setConfirmReset(false);
  };

  return (
    <div className="page">
      <div className="hero-section" style={{ paddingBottom: 0 }}>
        <div className="hero-text">
          <h1>Settings.</h1>
          <p className="hero-sub">Configure your workspace and manage stored data.</p>
        </div>
      </div>

      <div className="section" data-section-id="operator-name">
        <div className="section-header">
          <span className="section-title">Profile</span>
        </div>
        <div className="field">
          <label className="field-label">Display name</label>
          <input
            type="text"
            value={settings.name}
            onChange={e => updateName(e.target.value)}
            className="text-input"
            autoComplete="off"
            spellCheck={false}
            placeholder="Your name"
          />
          <div className="field-hint">Auto-saved to local storage.</div>
        </div>
      </div>

      <div className="section" data-section-id="data-management">
        <div className="section-header">
          <span className="section-title">Data</span>
        </div>
        <div className="field">
          <label className="field-label">Reset all data</label>
          <p className="field-hint" style={{ marginTop: 0, marginBottom: 16 }}>
            Restores default seed tasks. This cannot be undone.
          </p>
          <div className="field-actions">
            <button
              onClick={handleReset}
              className={`btn ${confirmReset ? 'btn--danger' : 'btn--ghost'}`}
            >
              {confirmReset ? 'Confirm reset' : 'Reset data'}
            </button>
            {confirmReset && (
              <button onClick={() => setConfirmReset(false)} className="btn btn--ghost">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">System</span>
        </div>
        <div className="stat-bar" style={{ borderTop: 'none' }}>
          <div className="stat-cell">
            <div className="stat-label">Version</div>
            <div className="stat-value">1.0.0</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Storage</div>
            <div className="stat-value">localStorage</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Runtime</div>
            <div className="stat-value">Vite + React</div>
          </div>
        </div>
      </div>
    </div>
  );
}
