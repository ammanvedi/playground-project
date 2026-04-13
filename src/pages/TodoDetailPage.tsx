import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useTodos } from '../lib/store';
import { useState } from 'react';
import type { TodoStatus } from '../lib/store';

const STATUSES: TodoStatus[] = ['todo', 'in-progress', 'completed', 'archived'];

const STATUS_COLORS: Record<TodoStatus, string> = {
  'todo': 'var(--gray-700)',
  'in-progress': 'var(--amber)',
  'completed': 'var(--green)',
  'archived': 'var(--gray-700)',
};

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
    hour12: false,
  });
}

function toDateInputValue(iso: string): string {
  return new Date(iso).toISOString().split('T')[0];
}

export default function TodoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { todos, latestTodo, updateTodo, deleteTodo, archiveTodo } = useTodos();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (id === 'latest') {
    if (!latestTodo) return <Navigate to="/" replace />;
    return <Navigate to={`/todo/${latestTodo.id}`} replace />;
  }

  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return (
      <div className="page">
        <div className="hero-section">
          <div className="hero-text">
            <h1>Not found.</h1>
            <p className="hero-sub">This task doesn't exist.</p>
            <div className="hero-actions">
              <button onClick={() => navigate('/')} className="btn">Back to tasks &rarr;</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteTodo(todo.id);
    navigate('/');
  };

  const handleArchive = () => {
    archiveTodo(todo.id);
    navigate('/archive');
  };

  return (
    <div className="page">
      <div className="detail-back">
        <button onClick={() => navigate('/')} className="btn--link">&larr; Back</button>
      </div>

      <div className="detail-heading">{todo.name}</div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">Details</span>
        </div>
        <div className="detail-grid">
          <div className="field">
            <label className="field-label">Name</label>
            <input
              type="text"
              value={todo.name}
              onChange={e => updateTodo(todo.id, { name: e.target.value })}
              className="text-input"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="field">
            <label className="field-label">Description</label>
            <textarea
              value={todo.description}
              onChange={e => updateTodo(todo.id, { description: e.target.value })}
              className="textarea-input"
              rows={4}
              spellCheck={false}
              placeholder="Add a description..."
            />
          </div>

          <div className="field">
            <label className="field-label">Status</label>
            <div className="status-row">
              <span
                className="status-dot"
                style={{ background: STATUS_COLORS[todo.status] }}
              />
              <select
                value={todo.status}
                onChange={e => updateTodo(todo.id, { status: e.target.value as TodoStatus })}
                className="select-input"
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label className="field-label">Due date</label>
            <input
              type="date"
              value={toDateInputValue(todo.dueDate)}
              onChange={e => updateTodo(todo.id, { dueDate: new Date(e.target.value).toISOString() })}
              className="text-input date-input"
            />
          </div>

          <div className="field">
            <label className="field-label">Created</label>
            <div className="readonly-value">{formatDateTime(todo.createdAt)}</div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">Actions</span>
        </div>
        <div className="field-actions">
          {todo.status === 'completed' && (
            <button onClick={handleArchive} className="btn btn--ghost">
              Archive
            </button>
          )}
          <button
            onClick={handleDelete}
            className={`btn ${confirmDelete ? 'btn--danger' : 'btn--ghost'}`}
          >
            {confirmDelete ? 'Confirm delete' : 'Delete'}
          </button>
          {confirmDelete && (
            <button onClick={() => setConfirmDelete(false)} className="btn btn--ghost">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
